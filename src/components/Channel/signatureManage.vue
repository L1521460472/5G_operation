<template>
  <div id="signatureManage" v-loading="loading"  element-loading-text="loading">
    <div class="title">签名管理</div>
    <div class="container">
      <div class="headerBtn">
        <div class="headerBtnLeft">
          <el-button class="addBtn" type="primary" size="small"  @click="refresh">
            <i class="iconfont iconshuaxin"></i>
          </el-button>
          <el-button class="addBtn" type="primary" size="small"  @click="reset">
            <i class="iconfont iconguanbi"></i>
          </el-button>
          <!-- <el-select v-model="application" ref="searchSelect" @change="changeApplication" clearable size="small" placeholder="请输入应用场景">
            <el-option
              v-for="item in applicationList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select> -->
          <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="签名或企业账号">
            <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="headerBtnRight">
          <el-button  type="primary"  size="small"   @click="addSignature">
            <i class="iconfont iconxinzeng"></i>
            添加签名
          </el-button>
        </div>
      </div>
      <div >
        <el-table
          border
          :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
          size="small"
          :data="tableData"
          :style="{'color':'#333','min-height':tableHeight + 'px'}"
        >
          <el-table-column prop="signName" label="签名" width="160" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="applySceneStr" label="应用场景" width="120" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop="account" label="企业账号" width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creator" label="操作账号" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="checkStatusStr" label="状态" width="140" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="status">
                <span>{{scope.row.checkStatusStr}}</span>
                <el-tooltip v-if="scope.row.checkStatus == 2" class="item" effect="dark" :content="scope.row.reason" placement="top">
                    <img  src="../../assets/images/redWarning_icon.svg" alt="">
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column  label="操作" min-width="110" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="operation" v-show="scope.row.checkStatus === 0" @click="passAction(scope.row)">通过</span>
              <span class="operation" v-show="scope.row.checkStatus === 0"  @click="refuseAction(scope.row)">不通过</span>
              <span class="operation" v-show="scope.row.checkStatus === 1 || scope.row.checkStatus === 2"  @click="deleteAction(scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <!-- 报备 -->
    <!-- <el-dialog
      title="添加报备通道"
      :visible.sync="signatureToast"
      :close-on-click-modal="false"
      :before-close="closeSignatureToast"
      width="850px"
    >
      <div>
        <div class="bodyHeader">
          <div class="bodyHeaderLeft">报备的签名：<span class="signatureLabel">{{signName}}</span></div>
          <div class="bodyHeaderRight">
            <el-select v-model="productType" @change="changeProductType"  clearable size="small" placeholder="产品类型">
              <el-option
                v-for="item in productTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select> 
            <el-select v-model="buinessType"  @change="changeBussinessType" clearable size="small" placeholder="业务类型">
              <el-option
                v-for="item in buinessTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-input v-model="channelName" size="small" maxlength="50" placeholder="通道名称">
              <i @click="searchChannelName" slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
        <div class="bodyMain">
          <el-table
            border
            :header-cell-style="{background: '#F5F7FA',color: '#333333',lineHeight: '20px'}"
            size="small"
            @selection-change="handleSelectionChange2"
            :data="channelTableData"
            style="width:770px"
            height="320"
            v-loading="loading2"
            element-loading-text="loading"
          >
            <el-table-column type="selection" align="center" width="50"></el-table-column>
            <el-table-column  prop="channelName" label="通道名称" width="130" show-overflow-tooltip></el-table-column>
            <el-table-column  prop="number" label="通道号" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column  prop="productTypeStr" label="产品类型" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column  prop="businessTypeStr" label="业务类型" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column  prop="reportTypeStr" label="报备类型" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column  prop="remark" label="备注" width="108" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <span class="bodyFooter">
          <span>已选择<span> {{selectChannelData.length}} 项</span></span>
        </span>
        <el-button type="primary" size="small" @click="confirmAddChannel()" >提 交</el-button>
        <el-button @click="closeSignatureToast" size="small">取 消</el-button>
      </span>
    </el-dialog> -->
    <!-- 新增签名 -->
    <el-drawer
      title="添加签名"
      :visible.sync="signatureDrawer"
      :before-close="closeSignatureDrawer"
      :modal-append-to-body="true"
      :wrapperClosable="false"
      size="500px"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="signatureForm"
        :model="signatureForm"
        :rules="signatureRules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item prop="signatureName" label="签名名称：">
          <el-input size="small" v-model="signatureForm.signatureName"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="application" label="应用场景：">
          <el-radio-group v-model="signatureForm.application">
            <el-radio :label="1">验证码</el-radio>
            <el-radio :label="2">通用</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item prop="enterprise" label="签名企业：">
          <el-select v-model="signatureForm.enterprise" filterable  clearable size="small" placeholder="请选择签名企业">
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="parmentDepartment" >
            <el-button  type="primary" size="small" :disabled="isSubmit" @click="confirmAddSignature">提 交</el-button>
            <el-button  size="small" @click="closeSignatureDrawer">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
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
            placeholder="在此输入不通过的原因"
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
import {getSignPageList,addSign,deleteSign,getSignChannelList,channelReport,getProductTypeList,getBussinessTypeList,getEnterpriseList,checkSign} from '../../api/channel/api'

export default {
  name:'signatureManage',
  data() {
    return {
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      searchCont:null,//搜索内容
      tableData:[],
      // application:null,
      // applicationList: [
      //   {
      //     id:1,
      //     value:'验证码'
      //   },
      //   {
      //     id:2,
      //     value:'通用'
      //   },
      // ],//应用场景
      // productType:null,//产品类型
      // buinessType:null,//业务类型
      // productTypeList:[],//产品类型列表
      // buinessTypeList:[],//业务类型列表
      // channelName:null,//弹窗搜索内容
      // signatureToast:false,//新增移除通道弹窗
      // channelTableData:[],//新增移除通道表格
      enterpriseList:[],
      // signId:null,//选中的签名ID
      // signName:null,//选中的签名
      signatureDrawer:false,//添加签名抽屉
      signatureForm:{
        signatureName:null,
        application:0,
        enterprise:null,
      },
      signatureRules:{
        signatureName:[
          { required: true, message: "签名名称不能为空", trigger: "blur" },
          { min: 2, max: 12, message: '长度限2-12个字符', trigger: 'blur' }
        ],
        enterprise:[{ required: true, message: "签名企业不能为空", trigger: "change" }],
      },
      isSubmit:false,//是否禁用提交按钮
      // selectChannelData:[],// 新增移除表格选中数据
      // loading2:false,//弹窗loading
      // selectData:[],//表格选择的数据
      refuseToast:false,//审核意见弹窗
      form: {
        id:null,
        refuseReason:'',//审核拒绝原因
      },
      rules: {
        refuseReason: [{ required: true, message: "审核意见不能为空", trigger: "blur" }],
      },
      tableHeight:window.innerHeight - 310 +'',
      timer: null,
    };
  },
  methods: {
    // 获取签名管理列表
    getDataList(){
      this.loading = true
      let params ={
        applyScene: this.application,
        name: this.searchCont,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      getSignPageList(params).then(res=>{
        this.loading = false
        if(res.status == 0){
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
      this.searchCont= null
      this.application = null
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
    // // 切换应用场景
    // changeApplication(val){
    //   this.searchAction()
    // },
    // // 获取产品类型
    // getProductList(){
    //   getProductTypeList({code:'productType'}).then(res=>{
    //     if(res.status == 0){
    //       this.productTypeList = res.data
    //     }else{
    //       this.$message.error({
    //         message:res.message,
    //         center:true
    //       })
    //     }
    //   }).catch(err=>{
    //       this.$message.error({
    //         message:err,
    //         center:true
    //       })
    //   })
    // },
    // //获取业务类型列表
    // getBussinessTypeData(){
    //   getBussinessTypeList().then(res=>{
    //     if(res.status == 0){
    //       this.buinessTypeList = res.data
    //     }else{
    //       this.$message({
    //         message:res.message,
    //         center:true,
    //         type:res.status === 2 ? 'warning':'error'
    //       })
    //     }
    //   })
    // },
    // // 更改产品类型,触发搜索列表
    // changeProductType(){
    //   this.searchChannelName()
    // },
    // // 更改业务类型触发搜索
    // changeBussinessType(){
    //   this.searchChannelName()
    // },
    // // 获取新增通道列表
    // getAddChannelData(){
    //   this.loading2 = true
    //   let params = {
    //     businessType: this.buinessType,
    //     currentPage: 1,
    //     name: this.channelName,
    //     pageSize: 10000,
    //     productType: this.productType      
    //   }
    //   getSignChannelList(params).then(res=>{
    //     this.loading2 =false
    //     if(res.status == 0){
    //       this.channelTableData = res.data.records.filter(item=>{return item.reportType!==0})

    //     }else{
    //       this.$message({
    //         message:res.message,
    //         center:true,
    //         type:res.status === 2 ? 'warning':'error'
    //       })
    //     }
    //   }).catch(err=>{
    //     this.$message.error({
    //       message:err,
    //       center:true
    //     })
    //   })
    // },
    // // 弹窗搜索
    // searchChannelName(){
    //   this.getAddChannelData()
    // },
    // // 弹窗回车查询
    // keyDown2(e) {
    //   if (e.keyCode == 13) {
    //     this.searchChannelName();
    //   }
    // },
    // 获取企业列表
    getEnterpriseData(){
      getEnterpriseList().then(res=>{
        console.log(res)
        if(res.status == 0){
          this.enterpriseList = res.data
        }else{
          this.$message.error({
            message:res.message,
            center:true
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
    // 添加签名
    addSignature(){
      this.signatureForm.signatureName = null
      this.signatureForm.application = 1
      this.signatureForm.enterprise = null
      this.enterpriseList = []
      this.getEnterpriseData()
      this.signatureDrawer = true
    },
    // 确认新增签名
    confirmAddSignature(){
      this.$refs.signatureForm.validate(valid=>{
        if(valid){
          this.isSubmit = true
          let params ={
            applyScene: this.signatureForm.application,
            enterpriseId: this.signatureForm.enterprise,
            signName: this.signatureForm.signatureName
          }
          addSign(params).then(res=>{
            this.isSubmit = false
            if(res.status == 0){
              this.$message.success({
                message:'签名新增成功',
                center:true
              })
              this.getDataList()
              this.closeSignatureDrawer()
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
        }
      })
    },
    // 审核
    passAction(row){
      let params ={
        checkStatus: 1,
        id: row.id
      }
      checkSign(params).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'审核成功',
            center:true
          })
          this.getDataList()
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
    // 不通过
    refuseAction(row){
      this.form.id = row.id
      this.form.refuseReason = null
      this.refuseToast = true
    },
    // 审核不通过确认
    confirmRefuse(){
      this.$refs.form.validate(valid=>{
        if(valid){
          let params = {
            id:this.form.id,
            checkStatus:2,
            reason:this.form.refuseReason
          }
          checkSign(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'审核成功',
                center:true
              })
              this.refuseToast = false
              this.getDataList()
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
        }
      })
    },
    // 删除签名
    deleteAction(row){
      this.$confirm("确认删除该条签名？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          deleteSign({id:row.id}).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'签名删除成功',
                center:true
              })
              this.getDataList()
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
        })
        .catch(() => {
          console.log("取消");
        });

    },
    // 添加报备通道
    // addChannel(row){
    //   this.buinessTypeList =[]
    //   this.productTypeList = []
    //   this.signId = row.id
    //   this.signName = row.signName
    //   this.getAddChannelData()
    //   this.getProductList()
    //   this.getBussinessTypeData()
    //   this.signatureToast = true
    //   window.removeEventListener("keydown", this.keyDown, false);
    //   window.addEventListener("keydown", this.keyDown2);
    // },
    // // 确认报备
    // confirmAddChannel(){
    //   if(this.selectChannelData.length<1){
    //     this.$message.error({
    //       message:'未勾选报备通道',
    //       center:true
    //     })
    //     return
    //   }
    //   let ids = []
    //   this.selectChannelData.map(item=>{
    //     ids.push(item.channelId)
    //   })
    //   let params ={
    //     signId: this.signId,
    //     channelIdSet: ids
    //   }
    //   if (this.timer) {
    //     clearTimeout(this.timer);
    //   }
    //   let _this = this
    //   this.timer = setTimeout(function () {
    //     _this.timer = null;
    //     channelReport(params).then(res=>{
    //       if(res.status == 0){
    //         _this.$message.success({
    //           message:'报备成功',
    //           center:true
    //         })
    //         _this.getDataList()
    //         _this.closeSignatureToast()
    //       }else{
    //         _this.$message({
    //           message:'报备失败',
    //           center:true,
    //           type:res.status === 2 ? 'warning':'error'
    //         })
    //       }
    //     }).catch(err=>{
    //       _this.$message.error({
    //         message:err,
    //         center:true
    //       })
    //     })
    //   }, 500);
    // },
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
    // 新增移除通道的表格选择
    // handleSelectionChange2(val){
    //   this.selectChannelData = val
    // },
    // // 关闭新增移除弹窗前清空数据
    // closeSignatureToast(){
    //   this.signId = null,
    //   this.productType = null
    //   this.buinessType = null
    //   this.channelName = null
    //   this.sign = null
    //   this.channelTableData = []
    //   this.signatureToast = false
    //   window.addEventListener("keydown", this.keyDown)
    //   window.removeEventListener("keydown", this.keyDown2, false);
    // },
    // 关闭添加签名抽屉
    closeSignatureDrawer(){
      this.$nextTick(()=>{
        this.$refs.signatureForm.resetFields();
        this.signatureDrawer = false
      })
    },
    // 头部搜索下拉框选中后失焦防止回车触发下拉框
    // isShowSelectOptions(isShowSelectOptions){
    //   if(!isShowSelectOptions) this.$refs.searchSelect.blur();
    // }
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
#signatureManage{
  width: 100%;
  height: 100%;
  color: #333;
  overflow: auto;
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
    .headerBtn{
      margin-bottom: 30px;
    }
    .status{
      // width: 200px;
      display: flex;
      align-items: center;
      .refuseReason{
        max-width: 200px !important;
        white-space: normal !important;
      }
      img{
        margin-left: 10px;
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
#signatureManage /deep/ .el-dialog__body{
  padding: 30px 40px;
}
#signatureManage /deep/ .el-dialog__footer {
  text-align: center ;
  padding: 10px 40px 20px;
}
.bodyHeader{
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .bodyHeaderLeft{
    line-height: 36px;
    font-size: 16px;
    .signatureLabel{
      color: #409eff;
    }
  }
  .bodyHeaderRight{
    margin-left: 10px;
    /deep/.el-input {
    width: 120px;
    }
    /deep/ .el-input--small .el-input__inner{
      height: 36px !important;
      line-height: 36px !important;
    }
    /deep/ .el-input--small .el-input__icon{
      line-height: 36px !important;
      cursor: pointer;
    }
  }
}
.bodyFooter{
  float: left;
}
.status{
  display: flex;
  align-items: center;
  img{
    margin-left: 10px;
  }
}

</style>
