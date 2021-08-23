<template>
  <div id="templateAudit" v-loading="loading"  element-loading-text="loading">
    <div class="title">模板审核</div>
    <el-tabs v-model="productType" class="tab" @tab-click="handleClick">
      <el-tab-pane v-for="item in productList" :key="item.id" :label="item.name" :name="''+item.id">
        <div class="container">
          <div class="headerBtn">
            <div class="headerBtnLeft">
              <el-button class="addBtn" type="primary" size="small"  @click="refresh">
                <i class="iconfont iconshuaxin"></i>
              </el-button>
              <el-button class="addBtn" type="primary" size="small"  @click="reset">
                <i class="iconfont iconguanbi"></i>
              </el-button> 
              <el-select v-model="auditStatus" :ref="productType + item.name" @change="changeStatus" @visible-change="isShowSelectOptions" clearable size="small" placeholder="审核状态">
                <el-option
                  v-for="item in auditStatusList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="模板名称">
                <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
          </div>
          <el-table
            border
            class="table"
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small"
            :data="tableData"
            :style="{'color':'#333','min-height':tableHeight + 'px'}"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <div v-if="props.row.productType == 3">
                  <vmsList :vmsData="props.row.vmsMessageContentList"></vmsList>
                </div>
                <div v-else>
                  <div class="text" v-if="props.row.messageType == 0 || props.row.messageType == 3 || props.row.messageType == 4 || props.row.messageType == 5">
                    <div class="textTop">{{props.row.content}}</div>
                    <div class="textBottom" v-if="props.row.suggestions && props.row.suggestions.length>0">
                      <span v-for="(item, index) in props.row.suggestions" :key="index">
                        <span class="btn" v-if="item.action">{{item.action.displayText}}</span>
                        <span  class="btn" v-if="item.reply">{{item.reply.displayText}}</span>
                      </span>
                      <!-- <span v-for="(item,index) in props.row.suggestions" :key="index">{{item.action.displayText}}</span> -->
                    </div>
                  </div>
                  <div  v-else-if="props.row.messageType == 1">
                    <fileList :fileData="props.row"></fileList>
                  </div>
                  <div v-else>
                    <cardList :cardData="props.row"></cardList>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mouldCode" label="模板ID"  width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mouldName" label="模板名称"  width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseAccountAppName" label="应用"  width="140"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="businessTypeStr" label="业务类型"  width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mouldType" label="模板类型"  width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.messageType === 0 ">文本模板</span>
                <span v-else-if="scope.row.messageType === 1 ">文件模板</span>
                <span v-else-if="scope.row.messageType === 2 ">卡片模板</span>
                <span v-else-if="scope.row.messageType === 3 ">变量模板</span>
                <span v-else-if="scope.row.messageType === 4 ">SMS普通模板</span>
                <span v-else-if="scope.row.messageType === 5 ">SMS变量模板</span>
                <span v-else-if="scope.row.messageType === 6 ">MMS普通模板</span>
                <span v-else="scope.row.messageType === 7 ">MMS变量模板</span>
              </template> 
            </el-table-column>
            <el-table-column prop="status" label="状态" width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="status">
                  <span v-if="scope.row.checkStatus === 0">审核中</span>
                  <span v-if="scope.row.checkStatus === 1">审核通过</span>
                  <span v-if="scope.row.checkStatus === 2">审核不通过</span>
                  <span v-if="scope.row.checkStatus === 3">运营商审核中</span>
                  <el-tooltip v-if="scope.row.checkStatus == 2" class="item" effect="dark" :content="scope.row.checkContent" placement="top">
                      <img  src="../../assets/images/redWarning_icon.svg" alt="">
                  </el-tooltip>
                </div>
              </template> 
            </el-table-column>
            <!-- <el-table-column prop="updateTime" label="更新时间" width="180" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="checkCreateTime" label="提交时间" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="110" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="operation" v-has="'templateCheck'" @click="passAction(scope.row)">通过</span>
                <span class="operation" v-has="'templateCheck'" @click="refuseAction(scope.row)">不通过</span>
                <!-- <el-tooltip v-has="'templateCheck'"  effect="dark" content="审核通过" placement="top">
                  <img class="operation"  @click="passAction(scope.row)" src="../../assets/images/auditPass_icon.svg" >
                </el-tooltip>
                <el-tooltip v-has="'templateCheck'"  effect="dark" content="审核拒绝" placement="top">
                  <img class="operation"  @click="refuseAction(scope.row)"  src="../../assets/images/auditRefunse_icon.svg" >
                </el-tooltip> -->
              </template> 
            </el-table-column> 
          </el-table>
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
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 审核意见弹窗 -->
    <el-dialog
      title="审核意见"
      :visible.sync="refuseToast"
      :close-on-click-modal="false"
      width="450px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules">
        <el-form-item prop="refuseReason">
          <el-input
            type="textarea"
            placeholder="在此输入审核拒绝的原因"
            maxlength="200"
            :autosize="{ minRows: 8, maxRows: 10 }"
            show-word-limit
            v-model="form.refuseReason"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="confirmRefuse">发 送</el-button>
        <el-button @click="refuseToast = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {templeteAuditList,templeteAudit,getProductTypeList} from '../../api/audit/api'
import cardList from "./cardList";
import fileList from "./fileList"
import vmsList from "./vmsList"
export default {
  name:'templateAudit',
  components:{cardList,fileList,vmsList},

  data() {
    return {
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      productList:[],//产品列表
      productType:'',
      selectTab:'RCS消息',
      auditStatus:null,//审核状态
      auditStatusList:[
        {
          id:0,
          value:'审核中'
        },
        {
          id:3,
          value:'运营商审核中'
        },
        {
          id:1,
          value:'审核通过'
        },
        {
          id:2,
          value:'审核不通过'
        }
      ],//审核状态列表
      searchCont:null,//搜索内容
      tableData:[],
      // iamgeLeftUrl: require("../../assets/images/pause2_icon.png"),
      // imageRightUrl: require("../../assets/images/play_icon.png"),
      duration: "1", //音频时长
      refuseToast:false,//审核意见弹窗
      form: {
        mouldAuthenticationId:null,
        refuseReason:'',//审核拒绝原因
      },
      rules: {
        refuseReason: [{ required: true, message: "审核意见不能为空", trigger: "blur" }],
      },
      tableHeight:window.innerHeight - 369 +'',
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
    // 获取模板数据
    getDataList(){
      this.loading = true
      let params = {
        checkStatus: this.auditStatus,
        messageMouldName: this.searchCont,
        currentPage: this.currentPage,
        productType:parseInt(this.productType),
        pageSize: this.pageSize
      }
      templeteAuditList(params).then(res=>{
        this.loading = false
        if(res.status == 0){
          res.data.records.map(item=>{
            if(item.vmsMessageContentList){
              item.vmsMessageContentList.map(item2=>{
                item2.flag = false
                item2.imgLeft1 = require('../../assets/images/pause2_icon.svg')
                item2.imgRight1 = require('../../assets/images/play_icon.svg')
                item2.imgLeft2 = require('../../assets/images/paly2_icon.gif')
                item2.imgRight2 = require('../../assets/images/pause_icon.svg')
              })
            }
          })
          this.total = res.data.total
          this.tableData = res.data.records
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
      this.auditStatus = null
      this.searchCont= null
      this.currentPage = 1
      this.pageSize = 10
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
    // 审核通过
    passAction(row){
      if(row.checkStatus !== 0){
        this.$message.error({
          message:'该模板已审核完成！',
          center:true
        })
        return
      }
      let params = {
        checkContent: null,
        checkStatus: 1,
        mouldAuthenticationId: row.mouldAuthenticationId
      }
      templeteAudit(params).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'模板审核成功',
            center:true
          })
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
    // 审核拒绝
    refuseAction(row){
      if(row.checkStatus !== 0){
        this.$message.error({
          message:'该模板已审核完成！',
          center:true
        })
        return
      }
      this.form.refuseReason = null
      this.form.mouldAuthenticationId = row.mouldAuthenticationId
      this.refuseToast = true
    },
    // 审核拒绝确认
    confirmRefuse(){
      this.$refs.form.validate((valid) => {
        if(valid){
          let params = {
            checkContent: this.form.refuseReason,
            checkStatus: 2,
            mouldAuthenticationId: this.form.mouldAuthenticationId
          }
          templeteAudit(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'审核成功',
                center:true
              })
              this.refuseToast =false
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

        }
      });
    },
    // 选择tab
    handleClick(tab, event){
      this.selectTab = tab.label
      this.productType = tab.name
      this.currentPage = 1
      this.pageSize = 10
      this.auditStatus = null
      this.searchCont= null
      this.tableData =[]
      this.getDataList()
      // this.getTypeListData()
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
  },

  mounted() {
    this.getProduct()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },

};
</script>

<style lang="less" scoped>
#templateAudit{
  width: 100%;
  height: 100%;
  overflow: auto;
  color: #333;
  letter-spacing: 0.75px;
  padding: 0 70px;
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
      // padding: 0 70px;
      box-sizing: border-box;
      // .headerBtn{
      //   margin-bottom: 30px;
      // }
      .el-table{
        .text{
          width: 330px;
          background-color: #fff;
          border: 1px solid #E5E5E5;
          border-radius: 4px;
          padding: 0 30px;
          box-sizing: border-box;
          .textTop{
            margin: 15px 0px;
            word-break: break-all;
          }
          .textBottom {
            width: 268px;
            padding: 20px 0;
            border-top: 1px solid #e5e5e5;
            white-space: nowrap;
            overflow-x: auto;
            .btn {
              width: fit-content;
              height: 34px;
              display: inline-block;
              line-height: 34px;
              text-align: center;
              border: 1px solid #e5e5e5;
              border-radius: 34px;
              margin-right: 16px;
              padding: 0 10px;
              box-sizing: border-box;
              cursor: pointer;
            }
            .btn:hover {
              color: #409eff;
              border-color: #409eff;
            }
            .btn:nth-of-type(3n) {
              margin-right: 0;
            }
          }
        }
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
#templateAudit /deep/ .el-dialog__footer {
  text-align: center ;
}
#templateAudit /deep/ .el-dialog__body {
  padding: 20px 40px 10px;
}
#templateAudit /deep/ .el-tabs__header{
  margin-bottom: 30px;
}

</style>