<template>
  <div id="enterpriseApp" v-loading="loading"  element-loading-text="loading">
    <div class="title">企业应用</div>
    <div class="container">
      <div class="headerBtn">
        <div class="headerBtnLeft">
          <el-button class="addBtn" type="primary" size="small"  @click="refresh">
            <i class="iconfont iconshuaxin"></i>
          </el-button>
          <el-button class="addBtn" type="primary" size="small"  @click="reset">
            <i class="iconfont iconguanbi"></i>
          </el-button> 
          <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="企业或应用名称">
            <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="headerBtnRight">
          <el-button v-has="'enterpriseAccountAppConfigUpdate'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="settingAction(selectData[0])">
            <i class="iconfont iconpeizhi"></i>
            配置
          </el-button>
        </div> 
      </div>
      <div >
        <el-table
          border
          class="table"
          :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
          size="small"
          :data="tableData"
          @selection-change="handleSelectionChange"
          @expand-change="handleExpand"
          :style="{'color':'#333','min-height':tableHeight + 'px'}"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="right" label-width="180px" class="demo-table-expand"> 
                <el-form-item label="App ID：">{{props.row.appId}}</el-form-item>
                <el-form-item label="App Secrect：">{{props.row.appSecrect}}</el-form-item>
                <el-form-item label="业务权限：">
                  <el-tree
                    :data="props.row.bottomSelectedList"
                    show-checkbox
                    node-key="id"
                    :default-expand-all="false"
                    :props="defaultProps"
                    :expand-on-click-node="false"
                    :default-checked-keys="props.row.checkedList"
                    ref="tree"
                    getCheckedNodes
                  >
                  </el-tree>
                </el-form-item>
                <el-form-item label="业务回调通知URL：">{{props.row.enterpriseCallbackUrl}}</el-form-item>
                <el-form-item label="消息上行推送URL：">{{props.row.enterpriseReceiveUpMessageUrl}}</el-form-item>
              </el-form>
            </template>
          </el-table-column> 
          <el-table-column type="selection" align="center" width="50"></el-table-column>     
          <el-table-column prop="appId"  label="应用ID" width="260" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="应用名称" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="description" label="应用描述" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterpriseAccount" label="企业账号" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterpriseName" label="企业名称" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="belongSalesName" label="所属销售" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="操作" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip v-has="'enterpriseAccountAppConfigUpdate'"  effect="dark" content="配置" placement="top">
                <img class="operation"  @click="settingAction(scope.row)" src="../../assets/images/app_icon.svg" >
              </el-tooltip>
            </template>  
          </el-table-column> 
        </el-table>
      </div>
      <div class="footer_page">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          :pager-count="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 配置应用 -->
    <el-dialog
      title="应用配置"
      class="changeTraiff"
      :visible.sync="changeAppToast"
      :close-on-click-modal="false"
      width="720px"
    >
      <el-form
        label-position="right"
        label-width="90px"
        class="demo-table-expand"
        v-if="appSeetingDetail"
      >
        <el-form-item label="使用产品：" class="product">
            <el-checkbox disabled v-for="item in appSeetingDetail.topList" :key="item.productType" v-model="item.productTypeChecked">{{item.productTypeStr}}</el-checkbox>
        </el-form-item>
        <el-form-item
          label="通道配置："
          v-if="appSeetingDetail.bottomSelectedList.length > 0"
        >
          <el-tabs>
            <el-tab-pane
              v-for="(item,index) in appSeetingDetail.bottomSelectedList"
              :key="item.productType"
              :label="item.productTypeStr"
              :name="''+index"
            >
              <el-table
                border
                :header-cell-style="{background: '#F5F7FA',color: '#333333',lineHeight: '20px'}"
                size="small"
                :data="item.businessTypeList"

              >
                <el-table-column prop="businessStr" label="业务类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-checkbox disabled v-model="scope.row.businessTypeChecked"></el-checkbox>
                    <span style="margin-left:10px">{{scope.row.businessStr}}</span>
                  </template>  
                </el-table-column>
                <el-table-column prop="costUnitStr" label="通道组" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-select filterable v-model="scope.row.channelGroupId"  size="small">
                      <el-option
                        v-for="item in scope.row.channelGroupList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </template>  
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="confirmChange" >确 定</el-button>
        <el-button @click="changeAppToast = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getAppList,getAppSettigDetail,changeaAppSettig} from '../../api/userName/api'
import { getCookie,getButtonList} from "../../public";

export default {
  name:'enterpriseApp',
  data() {
    return {
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      searchCont:null,//搜索内容
      tableData:[],
      defaultProps: {
        children: "businessTypeList",
        label: "name",
      },
      changeAppToast:false,//配置弹窗
      selectData:[],//表格选择的数据
      selectId:null,//选中的应用对应的id
      appSeetingDetail:null,//配置信息
      isDisable:true,//是否禁用头部按钮
      tableHeight:window.innerHeight - 310 +'',
      // headers : {Authorization:getCookie('enterprisePass')},
    };
  },
  methods: {
    // 获取应用列表
    getDataList(){
      this.loading = true
      let params ={
        name: this.searchCont,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      getAppList(params).then(res=>{
        this.loading = false
        if(res.status == 0){
          res.data.records.map(item=>{
            item.bottomSelectedList = null
            item.checkedList = []
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
    },
    // 刷新
    refresh(){
      this.getDataList()
    },
    // 重置清空
    reset(){
      this.currentPage = 1 
      this.pageSize = 10
      this.searchCont = null
      this.getDataList()
    },
    // 查询
    searchAction(){
      this.currentPage = 1
      this.getDataList()
    },
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.searchAction();
      }
    },
    // 配置
    settingAction(row){
      getAppSettigDetail({id:row.id}).then(res=>{
        if(res.status == 0){
          this.appSeetingDetail = res.data
          this.selectId = row.id
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
      this.changeAppToast = true
    },
    // 确认变更配置
    confirmChange(){
      let arr = []
      for(let i =0;i<this.appSeetingDetail.bottomSelectedList.length;i++){
        if(this.appSeetingDetail.bottomSelectedList[i].productTypeChecked){
          let obj ={} 
          let arr2 = []
          for(let j=0;j<this.appSeetingDetail.bottomSelectedList[i].businessTypeList.length;j++){
            if(this.appSeetingDetail.bottomSelectedList[i].businessTypeList[j].businessTypeChecked){
              let obj2 ={}
              obj2.businessId = this.appSeetingDetail.bottomSelectedList[i].businessTypeList[j].businessId
              obj2.channelGroupId = this.appSeetingDetail.bottomSelectedList[i].businessTypeList[j].channelGroupId
              arr2.push(obj2)
              if(this.appSeetingDetail.bottomSelectedList[i].productType === 1 && obj2.channelGroupId == null){
                this.$message.warning({
                  message:'5G短信中业务类型对应的通道组不能为空',
                  center:true
                })
                return
              }
            }
          }
          obj.productType = this.appSeetingDetail.bottomSelectedList[i].productType
          obj.businessTypeList = arr2
          arr.push(obj)
        }
      }
      let params ={
        bottomSelectedList: arr,
        id:this.selectId
      }
      changeaAppSettig(params).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'配置成功',
            center:true
          })
          this.changeAppToast = false
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
          message:err,
          center:true
        })
      })
    },
    // 展开表格请求详情数据
    handleExpand(row,expandedRows){
      getAppSettigDetail({id:row.id}).then(res=>{
        if(res.status == 0){
          let checkedList = []
          res.data.bottomSelectedList.map(item=>{
            item.id = item.productType
            item.name = item.productTypeStr
            item.disabled = true
            if(item.productTypeChecked){
              checkedList.push(item.productType)
            }
            if(item.businessTypeList){
              item.businessTypeList.map(item2=>{
                item2.id = item2.businessId
                item2.name = item2.businessStr
                item2.disabled = true
                if(item2.businessTypeChecked){
                  checkedList.push(item2.businessId)
                }
              })
            }
          })
          this.tableData.map(item=>{
            if(item.id == row.id){
              item.bottomSelectedList = res.data.bottomSelectedList
              item.checkedList = checkedList
            }
          })
        }else{
          this.$message({
            message:res.message,
            center:true,
            type:res.status === 2 ? 'warning':'error'
          })
        }
      }).catch(err=>{
        console.log(err)
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
    // 表格选择
    handleSelectionChange(val){
      this.selectData = val
      this.isDisable = val.length < 1 ? true : false;
    },
  },
  mounted() {
    this.getDataList()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },

};
</script>

<style lang="less" scoped>
#enterpriseApp{
  width: 100%;
  height: 100%;
  background-color: #fff;
  // overflow: auto;
  color: #333;
  letter-spacing: 0.75px;
  .title {
    height: 96px;
    line-height: 96px;
    margin-left: 70px;
    font-size: 20px;
  }
  .container{
    width: 100%;
    height: calc(100% - 96px);
    padding: 0 70px;
    box-sizing: border-box;
  }
}

.el-input {
  width: 160px;
}
.el-input__inner{
  width: 160px;
}
.headerBtn /deep/ .el-input--suffix {
  width: 160px;
}
#enterpriseApp /deep/ .el-dialog__footer {
  text-align: center ;
}
#enterpriseApp /deep/ .el-dialog__body{
  padding:30px
}
#enterpriseApp .demo-table-expand{
  /deep/ .is-active {
    background-color: #fff !important;
  }
}
.el-tree /deep/.el-tree-node__expand-icon.is-leaf::before{
    display: none;
}
.el-tree{
  background-color: transparent;
  padding-top: 6px;
}
/deep/ .el-tabs__nav-wrap::after{
  height: 1px;
}
/deep/ .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
  background-color: #368cfe
}
/deep/ .el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner{
  background-color: #368cfe
}
</style>