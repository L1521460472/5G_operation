<template>
  <div id="packageAudit" v-loading="loading"  element-loading-text="loading">
    <div class="title">套餐审核</div>
    <div class="container">
      <div class="headerBtn">
        <div class="headerBtnLeft">
          <el-button class="addBtn" type="primary" size="small"  @click="refresh">
            <i class="iconfont iconshuaxin"></i>
          </el-button>
          <el-button class="addBtn" type="primary" size="small" @click="reset">
            <i class="iconfont iconguanbi"></i>
          </el-button> 
          <el-select v-model="auditStatus" clearable size="small" placeholder="审核状态">
            <el-option
              v-for="item in auditStatusList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="套餐名称">
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
            <el-table
              border
              :header-cell-style="{background:'#F5F7FA',color:'#333333',lineHeight:'20px'}"
              size="small"
              :data="props.row.packageCostItemList"
            >
              <el-table-column prop="name" label="名称"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="description" label="描述"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="productTypeStr" label="适用产品"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="businessTypeStr" label="适用业务"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="industryTypeStr" label="适用行业"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="costUnitStr" label="计费单位" width="75" show-overflow-tooltip></el-table-column>
              <el-table-column prop="costUnit" label="计费单价￥" width="90" show-overflow-tooltip></el-table-column>
              <el-table-column prop="updatedBy" label="归属"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="validStartTime" label="生效时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="validEndTimeStr" label="结束时间" show-overflow-tooltip></el-table-column>
            </el-table> 
          </template>
        </el-table-column>           
        <el-table-column prop="name"  label="套餐名称"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="description" label="描述"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="belongTo" label="归属"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="status">
              <span v-if="scope.row.status == 0">待审核</span>
              <span v-if="scope.row.status == 1">审核通过</span>
              <span v-if="scope.row.status == 2">审核拒绝</span>
              <span v-if="scope.row.status == 3">停用</span>
              <!-- <span>{{scope.row.statusStr}}</span> -->
              <el-tooltip v-if="scope.row.status == 2" class="item" effect="dark" :content="scope.row.checkContent" placement="top">
                  <img  src="../../assets/images/redWarning_icon.png" alt="">
              </el-tooltip>
            </div>
          </template> 
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160" show-overflow-tooltip></el-table-column>
        <el-table-column  label="操作" width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip  class="item" effect="dark" content="审核通过" placement="top">
              <img class="operation"  @click="passAction(scope.row)" src="../../assets/images/auditPass_icon.png" alt="">
            </el-tooltip>
            <el-tooltip  class="item" effect="dark" content="审核拒绝" placement="top">
              <img class="operation"  @click="refuseAction(scope.row)"  src="../../assets/images/auditRefunse_icon.png" alt="">
            </el-tooltip>

            <!-- <img class="operation"  @click="passAction(scope.row)" src="../../assets/images/auditPass_icon.png" alt="">
            <img class="operation"  @click="refuseAction(scope.row)"  src="../../assets/images/auditRefunse_icon.png" alt=""> -->
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
import {packageAuditList,packageAudit} from '../../api/audit/api'
import { getCookie,getButtonList} from "../../public";

export default {
  name:'packageAudit',
  props:{
    authorityBttonList:{
      type:Array
    }
  },

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
          value:'待审核'
        },
        {
          id:1,
          value:'审核通过'
        },
        {
          id:2,
          value:'审核拒绝'
        },
        {
          id:3,
          value:'停用'
        },
      ],//审核状态列表
      searchCont:null,//搜索内容
      tableData:[],
      refuseToast:false,//审核意见弹窗
      form: {
        packageAuthenticationId:null,
        refuseReason:'',//审核拒绝原因
      },
      rules: {
        refuseReason: [{ required: true, message: "审核意见不能为空", trigger: "blur" }],
      },
      auditBtn:false,//审核按钮
      tableHeight:window.innerHeight - 310 +''
    };
  },
  methods: {
    // 获取企业审核信息列表
    getDataList(){
      this.loading = true
      let params = {
        status: this.auditStatus,
        packageName: this.searchCont,
        currentPage:this.currentPage,
        pageSize: this.pageSize
      }
      packageAuditList(params).then(res=>{
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
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.searchAction();
      }
    },
    // 审核通过
    passAction(row){
      if(row.status !== 0){
        this.$message.error({
          message:'该套餐已审核完成！',
          center:true
        })
        return
      }
      let params = {
        checkContent: null,
        checkStatus: 1,
        packageAuthenticationId: row.id,
      }
      packageAudit(params).then(res=>{
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
      if(row.status !== 0){
        this.$message.error({
          message:'该套餐已审核完成！',
          center:true
        })
        return
      }
      this.form.refuseReason = null
      this.form.packageAuthenticationId = row.id
      this.refuseToast = true
    },
    // 审核拒绝确认
    confirmRefuse(){
      this.$refs.form.validate((valid) => {
        if(valid){
          let params = {
            checkContent: this.form.refuseReason,
            checkStatus: 2,
            packageAuthenticationId: this.form.packageAuthenticationId,
          }
          packageAudit(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'审核拒绝成功',
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
  },
  watch: {
    authorityBttonList:{
      handler(data) {
        let btns = getButtonList(data,'/packageAudit')
        if(btns){
          btns.map(item=>{
            if(item.code == "enterpriseInfoCheck") this.auditBtn = true
          })
        }
      },
      immediate: true,
      deep: true,
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
#packageAudit{
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
      display: flex;
      align-items: center;
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
#packageAudit /deep/ .el-dialog__footer {
  text-align: center ;
}
#packageAudit /deep/ .el-dialog__body {
  padding: 20px 40px 10px;
}
#packageAudit /deep/ .el-table__expanded-cell{
  background-color: #F8F8FB;
}
#packageAudit /deep/ .el-table__expanded-cell:hover{
  background-color: #F8F8FB !important;
}
.demo-table-expand /deep/ .el-form-item__content{
  font-size: 12px;
  color: #333;
}
.demo-table-expand /deep/ .el-form-item__label{
  font-size: 12px;
  color: #333;
}
.demo-table-expand /deep/ .el-form-item{
  margin-bottom: 0;
}
.demo-table-expand /deep/ .el-image {
  margin-right: 10px;
}
</style>