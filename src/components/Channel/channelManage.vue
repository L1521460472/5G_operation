<template>
  <div id="channelManage" v-loading="loading"  element-loading-text="loading">
    <div class="title">通道管理</div>
    <!-- <div> -->
      <el-tabs v-model="productType" class="tab" @tab-click="handleClick">
        <el-tab-pane  v-for="item in productList" :key="item.id" :label="item.name" :name="''+item.id">
          <div class="headerBtn" v-if="item.id == productType">
            <div class="headerBtnLeft">
              <el-button class="addBtn" type="primary" size="small"  @click="refresh">
                <i class="iconfont iconshuaxin"></i>
              </el-button>
              <el-button class="addBtn" type="primary" size="small"  @click="reset">
                <i class="iconfont iconguanbi"></i>
              </el-button>
              <el-select v-model="status" :ref="productType + item.name" @change="changeStatus" @visible-change="isShowSelectOptions" clearable size="small" placeholder="状态">
                <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
                >
                </el-option>
              </el-select>
              <el-input class="search" v-model="searchCont" size="small" maxlength="50" :placeholder="productType == 1? 'Chatbot名称':'通道名称'">
                <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              </div>
              <div class="headerBtnRight">
                <el-button v-has="'channelAdd'"  type="primary" v-if="productType == 1" size="small"   @click="createChannel">
                  <i class="iconfont iconxinzeng"></i>
                  新建
                </el-button>
                <el-button v-has="'chatbotChannelCancel'" v-if="productType == 1" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"  @click="logout">
                  <i class="iconfont iconzhuxiao"></i>
                  注销
                </el-button>
                <el-button v-has="'chatbotChannelPutAway'" v-if="productType == 1" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="putaway">
                  <i class="iconfont iconrenwu"></i>
                  上架
                </el-button>

                <el-dropdown  style="margin-right:10px" @command="handleCommand" trigger="click" v-has="'channelAdd'" v-if="productType == 2">
                  <el-button  v-has="'channelAdd'" type="primary"  size="small"  >
                    <i class="iconfont iconxinzeng"></i>
                    新建
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">HTTP</el-dropdown-item>
                    <el-dropdown-item command="2">CMPP</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button v-has="'channelAdd'"  type="primary"  size="small"  v-if="productType == 3" @click="creatMMs">
                  <i class="iconfont iconxinzeng"></i>
                  新建
                </el-button>
                <el-button v-has="'channelDisable'"  v-if="productType != 1" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"  @click="stopUse">
                  <i class="iconfont icontingyong"></i>
                  禁用
                </el-button>
                <el-button v-has="'channelEnable'"  v-if="productType != 1" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="startUse">
                  <i class="iconfont iconzhuanweiqiyong"></i>
                  启用
                </el-button>
              </div>
          </div>
          <rcsMessage v-if="productType == 1" :tableData="tableData" :customerList="customerList" :businessTypeList="businessTypeList" ref="rcs" @handleSelectData="selectAction" @handleUpdata="updataAction"></rcsMessage>
          <smsMessage v-else-if="productType == 2" :tableData="tableData" :businessTypeList="businessTypeList" ref="sms" @handleSelectData="selectAction" @handleUpdata="updataAction"></smsMessage>
          <mmsMessage v-else-if="productType == 3" :tableData="tableData" :businessTypeList="businessTypeList" ref="mms" @handleSelectData="selectAction" @handleUpdata="updataAction"></mmsMessage>
          <otherMessage :tableData="tableData" v-else></otherMessage>
          <div class="footer_page">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            :pager-count="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    <!-- </div> -->
  </div>
</template>
<script>
import rcsMessage from "./rcsMessage";
import smsMessage from "./smsMessage";
import mmsMessage from "./mmsMessage";
import otherMessage from './otherMessage'
import {getRcsChannelList,getSmsChannelList,getVmsChannelList,getProductTypeList,getBussinessTypeList,getCustomerList} from '../../api/channel/api'

export default {
  name:'channelManage',
  components:{rcsMessage,smsMessage,mmsMessage,otherMessage},
  data() {
    return {
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      productList:[],//产品列表
      businessTypeList:[],//业务类型
      productType:null,//选择的产品
      searchCont:null,//搜索内容
      tableData:[],
      status:null,
      statusList:[
        {
          id:11,
          value:'新增审核不通过'
        },
        {
          id:12,
          value:'变更审核不通过'
        },
        {
          id:20,
          value:'管理平台新增审核中'
        },
        {
          id:21,
          value:'管理平台变更审核中'
        },
        {
          id:24,
          value:'上架审核中'
        },
        {
          id:25,
          value:'上架审核不通过'
        },
        {
          id:26,
          value:'调试白名单审核'
        },
        {
          id:27,
          value:'调试白名单审核不通过'
        },
        {
          id:30,
          value:'在线'
        },
        {
          id:31,
          value:'已下线'
        },
        {
          id:40,
          value:'暂停'
        },
        {
          id:41,
          value:'黑名单'
        },
        {
          id:42,
          value:'下架'
        },
        {
          id:50,
          value:'调试'
        }
      ],
      customerList:[],//客户名称列表
      selectData:[],//表格选择的数据
      isDisable:true,//是否禁用头部按钮
      selectTab:'RCS消息',
      timer: null,
    };
  },
  methods: {
    // 获取产品列表
    getProduct(){
      getProductTypeList({code:'productType'}).then(res=>{
        if(res.status == 0){
          this.productList = res.data
          this.productType = ''+res.data[0].id
          this.getDataList()
        }else{
          this.$message({
            message:res.message,
            center:true,
            type:res.status === 2 ? 'warning':'error'
          })
        }
      }).catch(err=>{
          this.$message.error({
            message:res.message,
            center:true,
          })
      })
    },
    // 获取账户列表数据
    getDataList(){
      this.loading = true
      if(this.productType == 1){
        let params ={
          name: this.searchCont,
          chatbotStatus: this.status,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }
        getRcsChannelList(params).then(res=>{
          this.loading = false
          if(res.status == 0){
            res.data.records.map(item=>{
              item.baseInfo = null
              item.configInfo = null
              item.moreInfo = null
              item.customerName = null
            })
            this.tableData = res.data.records
            this.total = res.data.total
            this.getCustomer()
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
        // this.getTypeListData(1)
      }else if(this.productType == 2){
        let params ={
          name: this.searchCont,
          status: this.status,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }
        getSmsChannelList(params).then(res=>{
          this.loading = false
          if(res.status == 0){
            res.data.records.map(item=>{
              item.baseInfo = null
              item.sendParameter = null
              item.costInfo = null
            })
            this.tableData = res.data.records
            this.total = res.data.total
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
        // this.getTypeListData(2)
      }else if(this.productType == 3){
        let params ={
          name: this.searchCont,
          status: this.status,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }
        getVmsChannelList(params).then(res=>{
          this.loading = false
          if(res.status == 0){
            res.data.records.map(item=>{
              item.baseInfo = null
              item.sendParameter = null
              item.costInfo = null
            })
            this.tableData = res.data.records
            this.total = res.data.total
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
        // this.getTypeListData(3)
      }else{
        this.loading = false
        this.tableData = []
        this.total = 0
      }
    },
    // 选择tab
    handleClick(tab){
      this.selectTab = tab.label
      this.productType = tab.name
      this.currentPage =1
      this.pageSize = 10
      this.status = null
      this.searchCont= null
      this.tableData = []
      this.selectData = []
      this.total = 0
      this.isDisable = true
      if(this.productType != 1){
        this.statusList = [
          {
            id:0,
            value:'启用'
          },
          {
            id:1,
            value:'停用'
          }
        ]
      }else{
        this.statusList = [
          {
            id:11,
            value:'新增审核不通过'
          },
          {
            id:12,
            value:'变更审核不通过'
          },
          {
            id:20,
            value:'管理平台新增审核中'
          },
          {
            id:21,
            value:'管理平台变更审核中'
          },
          {
            id:24,
            value:'上架审核中'
          },
          {
            id:25,
            value:'上架审核不通过'
          },
          {
            id:26,
            value:'调试白名单审核'
          },
          {
            id:27,
            value:'调试白名单审核不通过'
          },
          {
            id:30,
            value:'在线'
          },
          {
            id:31,
            value:'已下线'
          },
          {
            id:40,
            value:'暂停'
          },
          {
            id:41,
            value:'黑名单'
          },
          {
            id:42,
            value:'下架'
          },
          {
            id:50,
            value:'调试'
          }
        ]
      }
      this.getDataList()
    },
    // 刷新
    refresh(){
      this.getDataList()
    },
    // 重置清空
    reset(){
      this.currentPage = 1
      this.pageSize = 10
      this.status = null
      this.searchCont= null
      this.getDataList()
    },
    // 查询
    searchAction(){
      this.currentPage = 1
      this.getDataList()
    },
    // 切换状态
    changeStatus(){
      this.searchAction()
    },
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.searchAction();
      }
    },
    // 获取业务类型
    getTypeListData(type){
      // let params = {id:type}
      getBussinessTypeList().then(res=>{
        if(res.status == 0){
          this.businessTypeList = res.data
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
    },
    // 新建chatbot
    createChannel(){
      this.$refs.rcs[0].createAction()
    },
    // 批量注销
    logout(){
      this.$refs.rcs[0].logoutAction(1)
    },
    // 批量上架
    putaway(){
      this.$refs.rcs[0].putawayAction(1)
    },
    // sms通道新增
    handleCommand(command){
      this.$refs.sms[1].createAction(command)
    },
    // 新建MMS
    creatMMs(){
      this.$refs.mms[2].createAction()
    },
    // Sms禁用
    stopUse(){
      if(this.productType == 2){
        this.$refs.sms[1].forbidAction(1)
      }else{
        this.$refs.mms[2].forbidAction(1)
      }
    },
    // 启用
    startUse(){
      if(this.productType == 2){
        this.$refs.sms[1].enableAction(1)
      }else{
        this.$refs.mms[2].enableAction(1)
      }
    },
    // 获取客户列表
    getCustomer(){
      getCustomerList().then(res=>{
        if(res.status == 0){
          this.customerList = res.data
          this.tableData.map(item=>{
            res.data.map(item2=>{
              if(item2.customerNum == item.customerNum) {
                item.customerName=item2.customerName
              }
            })
          })
        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch(err=>{
        this.$message.error({
          message:err,
          center:true
        })
      })
    },

    //每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDataList()
    },
    //选择页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDataList()
    },
    // 头部搜索下拉框选中后失焦防止回车触发下拉框
    isShowSelectOptions(isShowSelectOptions){
      if(!isShowSelectOptions) this.$refs[`${this.productType}`+`${this.selectTab}`][0].blur();
    },
    // 表格选择事件
    selectAction(val1,val2){
      this.selectData = val1
      this.isDisable = val2
    },
    // 子组件通知父组件更新表格数据
    updataAction(){
      this.getDataList()
    }  
},
  mounted() {
    this.getProduct()
    this.getTypeListData()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },

};
</script>

<style lang="less" scoped>
#channelManage{
  width: 100%;
  height: 100%;
  background-color: #fff;
  // overflow: auto;
  color: #333;
  letter-spacing: 0.75px;
  padding: 0 70px;
  box-sizing: border-box;
  .title {
    height: 26px;
    line-height: 26px;
    padding-top: 40px;
    // margin-left: 70px;
    font-size: 20px;
  }
  .tab{
    margin-top: 18px;
    /deep/ .el-tabs__nav-wrap.is-scrollable{
      padding: 0 30px;
    }
    /deep/ .el-tabs__nav-next{
      font-size: 18px;
      margin-top: -1px;
      // margin-left: 70px;
    }
    /deep/ .el-tabs__nav-prev{
      font-size: 18px;
      margin-top: -1px;
    }
    .container{
      width: 100%;
      height: calc(100% - 96px);
      .status{
        display: flex;
        align-items: center;
        img{
          margin-left: 10px;
        }
      }
    }
  }
}

.el-input {
  width: 160px;
}
.el-input__inner{
  width: 160px;
}
.el-textarea{
  width: 260px;
}
.headerBtn /deep/ .el-input--suffix {
  width: 160px;
}
#channelManage /deep/ .el-dialog__footer {
  text-align: center ;
}
#channelManage /deep/ .el-collapse{
  border: 0;
}
#channelManage /deep/ .el-collapse-item__wrap{
  // background-color:#F8F8FA ;
  border: 0;
  padding:0 67px;
}
#channelManage /deep/ .el-collapse-item__header{
  height: 38px;
  // background-color:#F8F8FA ;
  padding-left: 20px;
  position: relative;
  color: #333333;
  font-size: 14px;
}

#channelManage /deep/ .el-collapse-item__header .el-collapse-item__arrow{
  position: absolute;
  left: 0;
  font-size: 14px;
}
#channelManage /deep/ .el-tabs__header{
  margin-bottom: 30px;
}
#channelManage /deep/ .el-collapse-item__content{
  margin-top: 25px;
}
.drawerContent{
  padding: 0 50px;
}
/deep/ .el-tabs__nav-wrap::after{
    height: 1px;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
/deep/ .avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
/deep/ .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
#channelManage /deep/ .el-collapse-item__content {
  line-height: 36px;
  font-size: 14px;
  color: #333;
  .separate{
    display: flex;
  }
  .cont{
    display: flex;
    width: 50%;
    .bussiness{
      width: calc(100% - 160px);
      display: flex;
      flex-wrap: wrap;
      .bussinessSpan{
        display: block;
        white-space: nowrap;
      }
    }
  }
  .lable{
    color: #666;
    display: inline-block;
    width: 145px;
    white-space: nowrap;
  }
  .haveImg{
    display: flex;
    .chatBotImg{
      width: 66px;
      height: 66px;
      display: inline-block;
    }
  }
}

</style>
