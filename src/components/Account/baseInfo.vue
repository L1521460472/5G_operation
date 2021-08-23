<template>     
  <div id="baseInfo"  v-loading="loading"  element-loading-text="loading">
    <div class="title">基本信息</div>
    <div class="container">
      <div class="containerTitle">账号信息</div>
      <el-form label-width="85px" label-position="left">
        <el-form-item label="注册邮箱：">
          <span>{{email ? email :'暂无'}}</span>
        </el-form-item>
        <el-form-item label="用户名称：">
          <span>{{userName ? userName :'暂无'}}</span>
        </el-form-item>
        <el-form-item label="联系电话：">
          <span>{{mobile ? mobile :'暂无'}}</span>
        </el-form-item>
        <el-form-item label="归属部门：">
          <span>{{departmentName ? departmentName :'暂无'}}</span>
        </el-form-item>
        <el-form-item label="上次登录：">
          <span>{{lastLoginTime ? lastLoginTime :'暂无'}}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {getAccountBaseInfo} from '../../api/account/api'
import { getCookie,getButtonList} from "../../public";
export default {
  name: "baseInfo",
  // props:{
  //   authorityBttonList:{
  //     type:Array
  //   }
  // },
  data() {
    return {
      loading:false,
      email:'',
      userName:'',
      mobile:'',
      departmentName:'',
      lastLoginTime:'',
      // tableHeight:window.innerHeight - 100 +'px',
    };
  },
  methods: {},
  mounted() { 
    this.loading = true
    getAccountBaseInfo().then(res=>{
      this.loading = false
      if(res.status == 0){
        this.email = res.data.email
        this.userName = res.data.userName
        this.mobile = res.data.mobile
        this.departmentName = res.data.departmentName
        this.lastLoginTime = res.data.lastLoginTime
      }else{
        this.$message({
          message:res.message,
          center:true,
          type:res.status === 2 ? 'warning':'error'
        })
      }
    }).catch(err=>{
      this.loading = false
      this.$message.error({
        message:err,
        center:true
      })
    })
  },
  // watch: {
  //   authorityBttonList:{
  //     handler(data) {
  //       // console.log(data)
  //       console.log(getButtonList(data,'/baseInfo'))
  //     },
  //     immediate: true,
  //     deep: true,
  //   }
  // },
};
</script>

<style lang="less" scoped>
#baseInfo {
  width: 100%;
  height: 100%;
  overflow: auto;
  // background-color: #fff;
  overflow: auto;
  color: #333;
  padding: 0 70px;
  box-sizing: border-box;
  .title {
    font-size: 20px;
    margin-top: 40px;
  }
  .container {
    .containerTitle{
        font-size: 16px;
        margin-top: 35px;
        margin-bottom: 15px;
        line-height: 36px;
        border-bottom: 1px solid #E5E5E5;
    }
  }
}
.el-form-item{
    margin-bottom: 5px;
}
/deep/ .el-form-item__label{
  color: #666;
}
</style>