<template>
  <!-- 登录 -->
  <div id="header">
    <div class="header">
      <div class="login">
        <div class="login_left">
          <img src="../assets/images/login_02.png" alt="" />
        </div>
        <div class="login_right">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="28px"
            class="demo-ruleForm"
          >
            <el-form-item><span class="p-hyld">欢迎登陆</span></el-form-item>

            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" autocomplete="off">
                <i slot="prefix" class="el-input__icon"></i>
              </el-input>
              <img class="image01" src="../assets/images/Frame@1x.png" alt />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              >
                <i slot="prefix" class="el-input__icon"></i>
              </el-input>
              <img class="image02" src="../assets/images/Frame@1x-1.png" alt />
            </el-form-item>
            <el-form-item prop="code">
              <el-col :span="14">
                <el-input placeholder="验证码" v-model="ruleForm.code">
                </el-input>
              </el-col>
              <el-col :span="8" style="margin-left: 10px">
                <verificationCode
                  ref="mychild"
                  :changeCode.sync="identifyCode"
                ></verificationCode>
              </el-col>
            </el-form-item>
            <div class="login-btn">
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                :loading="logining"
                >登录</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
      <div class="footer">
        ©2020 深圳市航通北斗信息技术有限公司 版权所有 ​​粤ICP备15008917号
      </div>
    </div>
  </div>
</template>
<script>
import bcryptjs from "bcryptjs";
import JSEncrypt from "jsencrypt";
import md5 from 'js-md5'
import {postLogin,getAllMenuList} from '../api/homeIndex/api'
import { getCookie, setCookie, removeCookie } from "../public";
import verificationCode from "./verificationCode";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: getCookie('loginName'),
        password: "",
        code: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      identifyCode: "",
      logining: false,
    };
  },
  methods: {
    // 登录
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.ruleForm.code.toUpperCase() != this.identifyCode) {
            this.$message({
              message: "验证码错误！",
              type: "error",
              center: true,
            });
            this.ruleForm.code = "";
            this.$refs.mychild.changeCode();
          } else {
            this.logining = true;
            let salt = bcryptjs.genSaltSync(12); //定义密码加密的计算强度，默认10
            // let hash = bcryptjs.hashSync("admin", salt); //进行加密

            //RSA加密流程
            let jse = new JSEncrypt(); //新建JSEncrypt对象
            //后端传回的公钥
            let publicKey =
              "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsdyqfaCfhwUuvIUyMnKu9Btmcx1bX53a9tV0q0vSF/S4fd+DjzhX/u8FWHH61e/YpRwvs6DiC/h06hgYnswnZxEvwp/eRxnt6JQVK2y+v8ZzZ838Z6fRb82W3g5FLJfTtJPf93uKlTDQywjYvmO1qbQTFraUNMSxzBi2/unRLHwIDAQAB";
            jse.setPublicKey(publicKey); //设置公钥
            let password = jse.encrypt(md5(this.ruleForm.password))
            let params ={
              loginName: this.ruleForm.username,
              password: password,
              rememberMe: 0
            }
            postLogin(params).then(res=>{
              this.logining = false;
              if(res.status == 0){
                setCookie("enterprisePass", res.data.token, 1/3);
                setCookie("enterpriseUserName",encodeURIComponent(res.data.userName), 1/3);
                setCookie("loginName", this.ruleForm.username);
                let headers = {Authorization:res.data.token}
                getAllMenuList({},headers).then(res2=>{
                  if(res2.status == 0){   
                    // this.$router.push('/homeIndex2')
                    if(res2.data[0].show){
                      this.$router.push(res2.data[0].children[0].url);
                      }else{
                      this.$router.push(res2.data[0].url);
                    }    
                  }else{
                    this.$message.error({
                      message:res2.message,
                      center:true
                    })
                  }
                })                
              }else{
                this.$message.error({
                  message:res.message,
                  center:true
                })
              }
            }).catch(err=>{
              console.log(err)
              this.logining = false;
              this.$message.error({
                message:err,
                center:true
              })
            })
          }
        } else {
          return false;
        }
      });
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        //enter回车键 == 13
        this.submitForm();
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
    
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },
  components: {
    verificationCode,
  },
};
</script>
<style lang="less" scoped>
.bordered {
  border: 1px solid #e5e5e5;
}
#header {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../assets/images/login.png") no-repeat;
  .login {
    width: 640px;
    height: 360px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .login_left {
      float: left;
      width: 320px;
      height: 100%;
    }
    .login_right {
      padding-top: 20px;
      box-sizing: border-box;
      float: left;
      width: 320px;
      height: 100%;
      background: #fff;
      position: relative;
      /deep/ .el-input--prefix .el-input__inner {
        padding-left: 40px !important;
      }
      .image01 {
        position: absolute;
        top: 12px;
        left: 12px;
      }
      .image02 {
        position: absolute;
        top: 12px;
        left: 12px;
      }
    }
  }
  .footer {
    color: #fff;
    font-size: 12px;
    font-family: Source Han Sans CN;
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  }

  .el-form-item {
    width: 90%;
  }
  .login-btn {
    display: flex;
    justify-content: center;
    .el-button {
      width: 260px;
    }
  }
  .p-hyld {
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }
}
</style>