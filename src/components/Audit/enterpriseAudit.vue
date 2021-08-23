<template>
  <div id="enterpriseAudit" v-loading="loading"  element-loading-text="loading">
    <div class="title">企业审核</div>
    <div class="container">
      <div class="headerBtn">
        <div class="headerBtnLeft">
          <el-button class="addBtn" type="primary" size="small"  @click="refresh">
            <i class="iconfont iconshuaxin"></i>
          </el-button>
          <el-button class="addBtn" type="primary" size="small" @click="reset">
            <i class="iconfont iconguanbi"></i>
          </el-button> 
          <el-select v-model="auditStatus" ref="searchSelect" @change="changeStatus"  @visible-change="isShowSelectOptions" clearable size="small" placeholder="审核状态">
            <el-option
              v-for="item in auditStatusList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="企业名称">
            <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <el-table
        border
        :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
        size="small"
        :data="tableData"
        :style="{'color':'#333','min-height':tableHeight + 'px'}"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left"  class="demo-table-expand">
              <el-form-item label="注册地址：">
                <span>{{ props.row.registeredAddress }}</span>
              </el-form-item>
              <el-form-item label="营业资质文件：">
                <el-image v-for="(item,index) in props.row.fileList" :key='index' style="width: 69px; min-height: 98px" :src="item" :preview-src-list="[item]"></el-image>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>           
        <el-table-column prop="enterpriseName" width="200" label="企业名称"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="industryName" label="行业" width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="enterpriseCreditCode"  label="统一社会信用代码" width="190" show-overflow-tooltip></el-table-column>
        <el-table-column prop="belongSalesName" label="所属销售" width="110" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="createdName" label="归属"  show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="checkStatusStr" label="状态" width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="status">
              <span v-if="scope.row.checkStatus == 0">审核中</span>
              <span v-if="scope.row.checkStatus == 1">审核通过</span>
              <span v-if="scope.row.checkStatus == 2">审核不通过</span>
              <el-tooltip v-if="scope.row.checkStatus == 2" class="item" effect="dark"  placement="top">
                  <p slot="content" class="refuseReason">{{scope.row.checkContent}}</p>
                  <img  src="../../assets/images/redWarning_icon.svg" alt="">
              </el-tooltip>
            </div>
          </template> 
        </el-table-column>
        <el-table-column prop="checkTime" label="更新时间" width="160" show-overflow-tooltip></el-table-column>
        <el-table-column  label="操作" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="operation" v-has="'enterpriseInfoCheck'" @click="passAction(scope.row)">通过</span>
            <span class="operation" v-has="'enterpriseInfoCheck'" @click="refuseAction(scope.row)">不通过</span>
            <!-- <el-tooltip v-has="'enterpriseInfoCheck'" class="item" effect="dark" content="审核通过" placement="top">
              <img class="operation"  @click="passAction(scope.row)" src="../../assets/images/auditPass_icon.svg" >
            </el-tooltip>
            <el-tooltip v-has="'enterpriseInfoCheck'" class="item" effect="dark" content="审核拒绝" placement="top">
              <img class="operation" @click="refuseAction(scope.row)"  src="../../assets/images/auditRefunse_icon.svg" >
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
import {enterpriseAuditList,enterpriseAudit} from '../../api/audit/api'

export default {
  name:'enterpriseAudit',

  data() {
    return {
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      auditStatus:null,//审核状态
      auditStatusList:[
        {
          id:0,
          value:'审核中'
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
      refuseToast:false,//审核意见弹窗
      form: {
        enterpriseAuthenticationId:null,
        refuseReason:'',//审核拒绝原因
      },
      rules: {
        refuseReason: [{ required: true, message: "审核意见不能为空", trigger: "blur" }],
      },
      tableHeight:window.innerHeight - 310 +''
    };
  },
  methods: {
    // 获取企业审核信息列表
    getDataList(){
      this.loading = true
      let params = {
        checkStatus: this.auditStatus,
        enterpriseName: this.searchCont,
        currentPage:this.currentPage,
        pageSize: this.pageSize
      }
      enterpriseAuditList(params).then(res=>{
        this.loading = false
        if(res.status == 0){
          res.data.records.map(item=>{
            if(item.fileList){
              item.fileList = item.fileList.split(",")
            }
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
      if(row.checkStatus !== '0'){
        this.$message.error({
          message:'该企业已审核完成！',
          center:true
        })
        return
      }
      let params = {
        checkContent: null,
        checkStatus: 1,
        enterpriseAuthenticationId: row.enterpriseAuthenticationId
      }
      enterpriseAudit(params).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'审核通过成功',
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
      if(row.checkStatus !== '0'){
        this.$message.error({
          message:'该企业已审核完成！',
          center:true
        })
        return
      }
      this.form.refuseReason = null
      this.form.enterpriseAuthenticationId = row.enterpriseAuthenticationId
      this.refuseToast = true
    },
    // 审核拒绝确认
    confirmRefuse(){
      this.$refs.form.validate((valid) => {
        if(valid){
          let params = {
            checkContent: this.form.refuseReason,
            checkStatus: 2,
            enterpriseAuthenticationId: this.form.enterpriseAuthenticationId
          }
          enterpriseAudit(params).then(res=>{
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
      if(!isShowSelectOptions) this.$refs.searchSelect.blur();
    }

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
#enterpriseAudit{
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
#enterprriseAudit /deep/ .el-dialog__footer {
  text-align: center ;
}
#enterprriseAudit /deep/ .el-dialog__body {
  padding: 20px 40px 10px;
}
</style>