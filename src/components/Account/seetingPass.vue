<template>
  <div id="seetingPass" >
    <div class="title">密码设置</div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="125px"
      label-position="right"
    >
      <el-form-item prop="oldPassWord" label="原密码：">
        <el-input type="password" v-model="form.oldPassWord"></el-input>
      </el-form-item>
      <el-form-item prop="newPassWord" label="新密码：">
        <el-input type="password" v-model="form.newPassWord"></el-input>
      </el-form-item>
      <el-form-item prop="newPassWord2" label="再次输入密码：">
        <el-input type="password" v-model="form.newPassWord2"></el-input>
      </el-form-item>
    </el-form>
    <div class="footerButton">
      <el-button type="primary"  @click="submitAction"
        >提交</el-button
      >
    </div>
  </div>
</template>
<script>
import bcryptjs from "bcryptjs"
import JSEncrypt from "jsencrypt"
import md5 from 'js-md5'
import {changePassword} from '../../api/account/api'
import { regexpPassword ,getCookie,removeCookie,getButtonList} from "../../public";
export default {
  name: "seetingPass",
  // props:{
  //   authorityBttonList:{
  //     type:Array
  //   }
  // },
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入现在使用的密码"));
      } else if (value.length < 8 || value.length > 12) {
        callback(new Error("密码长度为8-12位"));
      } else {
        callback();
      }
    };
    var validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码由大小写字母和数字组成，长度为8-12位"));
      } else if (value.length < 8 || value.length > 12) {
        callback(new Error("密码长度为8-12位"));
      } else if (!regexpPassword(value)) {
        callback(new Error("密码必须有数字和字母组成"));
      } else {
        callback();
      }
    };
    var validateNewPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.form.newPassWord) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPassWord: "", //原密码
        newPassWord: "", //新密码
        newPassWord2: "", //再次输入密码
      },
      rules: {
        oldPassWord: [{ validator: validateOldPass, trigger: "blur" }],
        newPassWord: [{ validator: validateNewPass, trigger: "blur" }],
        newPassWord2: [{ validator: validateNewPass2, trigger: "blur" }],
      },
      // tableHeight:window.innerHeight - 100 +'px',
      // headers : {Authorization:getCookie('enterprisePass')}
    };
  },
  methods: {
    submitAction() {
      this.$refs.form.validate((valid) => {
        if(valid){
          let jse = new JSEncrypt(); //新建JSEncrypt对象
          let publicKey ="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsdyqfaCfhwUuvIUyMnKu9Btmcx1bX53a9tV0q0vSF/S4fd+DjzhX/u8FWHH61e/YpRwvs6DiC/h06hgYnswnZxEvwp/eRxnt6JQVK2y+v8ZzZ838Z6fRb82W3g5FLJfTtJPf93uKlTDQywjYvmO1qbQTFraUNMSxzBi2/unRLHwIDAQAB";
          jse.setPublicKey(publicKey); //设置公钥
          let password = jse.encrypt(md5(this.form.newPassWord))
          let oldPassword = jse.encrypt(md5(this.form.oldPassWord))
          let params = {
            oldPassword: oldPassword,
            newPassword: password,
            confirmNewPassword: password
          }
          changePassword(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'密码设置成功',
                center:true
              })
              removeCookie('enterprisePass')
              removeCookie('enterpriseUserName')
              this.$router.push("/");
            }else{
              this.$message({
                message:res.message,
                center:true,
                type:res.status === 2 ? 'warning':'error'
              })
            }
          }).catch(err=>{
            this.$message.error({
              message:err,
              center:true
            })
          })
        }
      });
    },
  },
  // watch: {
  //   authorityBttonList:{
  //     handler(data) {
  //       // console.log(data)
  //       console.log(getButtonList(data,'/seetingPass'))
  //     },
  //     immediate: true,
  //     deep: true,
  //   }
  // },
};
</script>

<style lang="less" scoped>
#seetingPass {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0 70px;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  .title {
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 70px;
  }
  .el-input {
    width: 260px;
  }
  .footerButton{
    margin-left: 124px;
  }
}
/deep/ .el-form-item__label{
  color: #666;
}
.el-form-item{
  margin-bottom: 36px;
}
</style>