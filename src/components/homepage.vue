<template>
  <div id="homeIndex" v-loading="loading"  element-loading-text="loading">
    <div class="dataStatistics">
      <div class="title">业务情况</div>
      <div class="content">
        <div class="dataDetail">
          <div class="sent">今日发送</div>
          <div class="count">{{todaySend}}<span class="countUnit">条</span></div>
          <div class="count2">
            <span>收{{todayReceive}}</span
            ><span style="margin-left: 16px"
              >{{pertcentage}}<i
                :class="arrow == 'up' ? 'el-icon-top' : 'el-icon-bottom'"
              ></i
            ></span>
          </div>
        </div>
        <div class="dataDetail">
          <div class="sent">昨日此时发</div>
          <div class="count">{{yesterdayThisTimeSend}}<span class="countUnit">条</span></div>
          <div class="count2"><span>收{{yesterdayThisTimeReceive}}</span></div>
        </div>
        <div class="dataDetail">
          <div class="sent">昨日发</div>
          <div class="count">{{yesterdaySend}}<span class="countUnit">条</span></div>
          <div class="count2"><span>收{{yesterdayReceive}}</span></div>
        </div>
      </div>
    </div>
    <div class="balnk"></div>
    <div class="dataStatistics ">
      <div class="title">待办事项</div>
      <div class="content backlogContent ">
        <div class="backlog" @click="gotoAuditAccount">
          <div class="left">
            <img src="../assets/images/audit_account.png" />
          </div>
          <div class="right">
            <span class="backlogTitle">待审核企业</span>
            <span class="backlogCount">{{accountsToBeApprove}}</span>
          </div>
        </div>
        <div class="backlog" @click="gotoAuditTemplete">
          <div class="left">
            <img src="../assets/images/audit_templete.png"  />
          </div>
          <div class="right">
            <span class="backlogTitle">待审核模板</span>
            <span class="backlogCount">{{mouldsToBeApprove}}</span>
          </div>
        </div>
        <!-- <div class="backlog" @click="gotoAuditPackage">
          <div class="left">
            <img src="../assets/images/audit_combo.png" >
          </div>
          <div class="right">
            <span class="backlogTitle">待审核套餐</span>
            <span class="backlogCount">{{packagesToBeApprove}}</span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import {getHomeIndexData} from '../api/homeIndex/api'
import { getCookie, setCookie, removeCookie ,permissionMenuList} from "../public";
export default {
  name: "homepage",
    props:{
    authorityBttonList:{
      type:Array
    }
  },

  data() {
    return {
      loading:false,
      arrow: "down",
      todaySend:null,//今日发送次数
      todayReceive:null,//今日接收次数
      yesterdayThisTimeSend:null,//昨日此时发送次数
      yesterdayThisTimeReceive:null,//昨日此时接收次数
      yesterdaySend:null,//昨日发送次数
      yesterdayReceive:null,//昨日接收次数
      accountsToBeApprove:null,//待审核账户
      mouldsToBeApprove:null,//待审核模板
      packagesToBeApprove :null,//待审核套餐
      pertcentage:null,
      // headers : {Authorization:getCookie('enterprisePass')}
    };
  },
  methods: {
    // 请求页面数据
    getListData(){
      this.loading = true
      getHomeIndexData().then(res=>{
        this.loading = false
        if(res.status == 0){
          this.accountsToBeApprove = res.data.accountsToBeApprove,//待审核账户
          this.mouldsToBeApprove = res.data.mouldsToBeApprove,//待审核模板
          // this.packagesToBeApprove = res.data.packagesToBeApprove,//待审核套餐
          this.packagesToBeApprove = 0,//待审核套餐
          this.todayReceive = res.data.todayReceive,//今日接收次数
          this.todaySend = res.data.todaySend,//今日发送次数
          this.yesterdayReceive = res.data.yesterdayReceive,//昨日接收次数
          this.yesterdaySend = res.data.yesterdaySend,//昨日发送次数
          this.yesterdayThisTimeReceive = res.data.yesterdayThisTimeReceive,//昨日此时接收次数
          this.yesterdayThisTimeSend = res.data.yesterdayThisTimeSend //昨日此时发送次数
          this.arrow = (res.data.todayReceive + res.data.todaySend) -(res.data.yesterdayThisTimeReceive+res.data.yesterdayThisTimeSend) >= 0? 'up':'down'
          if(res.data.yesterdayThisTimeReceive+res.data.yesterdayThisTimeSend === 0){
            this.pertcentage = (res.data.todayReceive + res.data.todaySend) === 0 ? 0:'100%'
          }else{
            this.pertcentage = Math.round((Math.abs((res.data.todayReceive + res.data.todaySend) - (res.data.yesterdayThisTimeReceive+res.data.yesterdayThisTimeSend))/(res.data.yesterdayThisTimeReceive+res.data.yesterdayThisTimeSend)) * 10000) / 100.00 + "%"
          }
        }else{
          this.loading = false
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
    },
    // 待审核账户
    gotoAuditAccount(){
      let menuList = JSON.parse(sessionStorage.getItem('menuList'))
      if(!permissionMenuList(menuList,'/enterpriseAudit')){
        this.$message.warning({
          message:'暂无访问权限',
          center:true
        })
        return
      }
      this.$router.push('/enterpriseAudit')
    },
    // 待审核模板
    gotoAuditTemplete(){
      let menuList = JSON.parse(sessionStorage.getItem('menuList'))
      if(!permissionMenuList(menuList,'/templateAudit')){
        this.$message.warning({
          message:'暂无访问权限',
          center:true
        })
        return
      }
      this.$router.push('/templateAudit')
    },
    // 待审核套餐
    gotoAuditPackage(){
      this.$message.warning({
        message:'功能正在加紧开发中',
        center:true
      })
    }
  },
  mounted() {
    this.getListData()
  },
};
</script>
<style lang="less" scoped>
#homeIndex {
  width: 100%;
  height: 100%;
  .dataStatistics {
    width: 100%;
    background-color: #fff;
    padding:0 70px 47px;
    box-sizing: border-box;
    overflow: hidden;
    .title {
      margin: 40px 0 43px 0;
      color: #333333;
      font-family: Microsoft YaHei;
      font-size: 20px;
    }
    .content {
      display: flex;
      justify-content: space-around;
      .dataDetail {
        width: 33.33%;
        text-align: center;
        .sent {
          color: #666;
          font-family: Microsoft YaHei;
          font-size: 14px;
        }
        .count {
          color: #222;
          font-family: Microsoft YaHei;
          font-weight: regular;
          line-height: 50px;
          font-size: 32px;
          .countUnit {
            color: #666;
            font-size: 20px;
          }
        }
        .count2 {
          color: #666666;
          font-size: 14px;
          .el-icon-bottom {
            color: #2bd990;
          }
          .el-icon-top {
            color: #fe3636;
          }
        }
      }
      .backlog {
        width: 31%;
        border: 1px solid #f8f8fb;
        cursor: pointer;
        // width: 330px;
        // min-width: 330px;
        height: 194px;
        background: #f8f8fb;
        display: flex;
        align-items: center;
        .left {
        margin-left: 12%;
          img {
            width: 76px;
            height: 76px;
            display: block;
          }
        }
        .right {
            margin-left: 20%;
          font-family: Microsoft YaHei;
          .backlogTitle {
            color: #999999;
            font-size: 16px;
            display: block;
          }
          .backlogCount {
            color: #333333;
            font-size: 50px;
            display: block;
          }
        }
      }
      .backlog:hover{
        border: 1px solid #368CFE;
      }
      .backlog:nth-of-type(2){
        margin-left: 40px;
      }
    }
    .backlogContent{
      justify-content: flex-start;
        // justify-content: space-between;
    }
  }
  //   .shortcut {
  //     width: 100%;
  //     height: 300px;
  //     background-color: #fff;
  //     .title {
  //       margin: 40px 0 43px 70px;
  //       color: #333333;
  //       font-family: Microsoft YaHei;
  //       font-size: 20px;
  //     }
  //     .content{
  //         display: flex;
  //       justify-content: space-around;

  //     }
  //   }
  .balnk {
    background-color: #f8f8fb;
    height: 20px;
    padding: 0 70px;
    box-sizing: border-box;
  }
}
</style>