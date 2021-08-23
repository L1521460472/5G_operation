<template>
  <!-- 到账管理 -->
  <div id="accountManage">
    <div class="title">到账管理</div>
    <div class="container">
      <div class="headerBtn">
        <div class="headerBtnLeft">
          <el-button class="addBtn" type="primary" size="small"  @click="refresh">
            <i class="iconfont iconshuaxin"></i>
          </el-button>
          <el-button class="addBtn" type="primary" size="small"  @click="reset">
            <i class="iconfont iconguanbi"></i>
          </el-button>
          <el-input class="search" v-model="searchCont" size="small" maxlength="20" placeholder="企业名称">
            <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="headerBtnRight">
          <el-button  type="primary"  size="small"  @click="addIncome" v-has="'amountArrivalRecordAdd'">
            <i class="iconfont iconxinzeng"></i>
            添加到账
          </el-button>
        </div>
      </div>
      <div>
        <el-table :data="tableData"
          :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
          :loading="loading"
          size="small"
          :style="{'color':'#333','min-height':tableHeight + 'px'}"
          border>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-collapse :value="whichSelect">
                <el-collapse-item title="到账详情" name="1">
                  <el-form label-width="90px" label-position="left">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="到账编号：">
                          <span>{{scope.row.arrivalCode}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="对账状态：">
                          <span>{{scope.row.reconciliationStatus == 0 ? '未对账' : '已对账'}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="企业账号：">
                          <span>{{scope.row.enterpriseAccount}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="企业名称：">
                          <span>{{scope.row.enterpriseName}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="潜力等级：">
                          <span>{{scope.row.potentialLevel == 1 ? '小微' : (scope.row.potentialLevel == 2 ? '核心' : (scope.row.potentialLevel == 3 ? '价值' : '战略')) }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="所属销售：">
                          <span>{{scope.row.belongSalesName}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="到账金额：">
                          <span>{{scope.row.arrivalAmount}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="到账时间：">
                          <span>{{scope.row.arrivalTime}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="提交人：">
                          <span>{{scope.row.createdAccount}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="提交时间：">
                          <span>{{scope.row.createTime}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="到账备注：">
                      <span>{{scope.row.remark}}</span>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
                <el-collapse-item title="对账详情" name="2">
                  <el-form label-width="90px">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="对账人：">
                          <span>{{scope.row.checkAccount}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="对账时间：">
                          <span>{{scope.row.reconciliationTime}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="对账金额：">
                          <span>{{scope.row.reconciliationAmount}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="收支关联：">
                          <span>{{scope.row.incomeAndExpenseDetailCode}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="备注：">
                      <span>{{scope.row.reconciliationRemark}}</span>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
              </el-collapse>
            </template>
          </el-table-column>
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="企业账号" width="140" prop="enterpriseAccount" show-overflow-tooltip></el-table-column>
          <el-table-column label="企业名称" width="130" prop="enterpriseName" show-overflow-tooltip></el-table-column>
          <el-table-column label="所属销售" width="120" prop="belongSalesName" show-overflow-tooltip></el-table-column>
          <el-table-column label="到账金额" width="120" prop="arrivalAmount" show-overflow-tooltip></el-table-column>
          <el-table-column label="到账时间" width="160" prop="arrivalTime" show-overflow-tooltip></el-table-column>
          <el-table-column label="对账状态" width="120" prop="reconciliationStatus" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.reconciliationStatus == 0">未对账</span>
              <span v-else-if="scope.row.reconciliationStatus == 1">已对账</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="120" prop="remark" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <!-- <el-button type="text" size="mini" icon="el-icon-view" @click="check(scope.row)" v-has="'amountArrivalRecordCheck'">对账</el-button> -->
              <span class="operation" v-has="'amountArrivalRecordCheck'"  @click="check(scope.row)">对账</span>
              <!-- <el-tooltip class="item" effect="dark" content="对账" placement="top">
                <img class="operation" src="../../assets/images/reconciliation.svg" v-has="'amountArrivalRecordCheck'"  @click="check(scope.row)">
              </el-tooltip> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer_page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          :pager-count="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
    <el-drawer title="添加到账"
      :wrapperClosable="false"
      :visible.sync="accountVisible"
      direction="rtl"
      size="460px">
        <el-form label-width="100px" ref="addIncome" :rules="incomeRules" class="drawerContent" :model="formData">
          <el-form-item label="企业账号：" prop="enterpriseAccount">
            <!-- <el-input size="small" v-model="formData.enterpriseAccount" @change="getEnterprise"></el-input> -->
            <el-select
              size="small"
              filterable
              remote
              reserve-keyword
              placeholder="请输入企业账号"
              :remote-method="remoteMethod"
              @change="getEnterprise"
              v-model="formData.enterpriseAccount">
                <el-option
                  v-for="(item, index) in companyOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称：">
            <el-input size="small" disabled v-model="formData.enterpriseName"></el-input>
          </el-form-item>
          <el-form-item label="到账金额：" prop="arrivalAmount">
            <el-input size="small" v-model="formData.arrivalAmount" oninput="value=value.replace(/[^\d.]/g,'')" @blur="inputBlur"></el-input>
          </el-form-item>
          <el-form-item label="到账时间：" prop="arrivalTime">
            <el-date-picker size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="formData.arrivalTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input size="small" type="textarea" v-model="formData.remark" :rows="4" maxlength="200" show-word-limit></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submit" :disabled="isSubmit">确定</el-button>
            <el-button size="small" @click="cancle">取消</el-button>
          </el-form-item>
        </el-form>
    </el-drawer>
    <el-drawer
      title="收支对账"
      :wrapperClosable="false"
      :visible.sync="incomeVisible"
      direction="rtl"
      size="460px">
      <el-form label-width="100px" ref="checkForm" :rules="checkRules" :model="checkData" class="drawerContent">
        <el-form-item label="企业账号：">
          <span>{{checkData.enterpriseAccount}}</span>
        </el-form-item>
        <el-form-item label="企业名称：">
          <!-- <span>{{checkData.enterpriseName}}</span> -->
          <el-input size="small" v-model="checkData.enterpriseName" disabled></el-input>
        </el-form-item>
        <el-form-item label="到账金额：">
          <!-- {{checkData.arrivalAmount}} -->
          <el-input size="small" v-model="checkData.arrivalAmount" disabled></el-input>
        </el-form-item>
        <el-form-item label="关联收支：" prop="incomeAndExpenseDetail">
          <el-input size="small" v-model="checkData.incomeAndExpenseDetail" @change="getDetail"></el-input>
        </el-form-item>
        <el-form-item label="收支类别：">
          <el-input size="small" v-model="checkData.incomeAndExpenseType" disabled></el-input>
          <!-- <span>{{checkData.incomeAndExpenseType}}</span> -->
        </el-form-item>
        <el-form-item label="收支金额：">
            <el-input size="small" v-model="checkData.incomeAndExpenseAmount" disabled></el-input>
          <!-- <span>{{checkData.incomeAndExpenseAmount}}</span> -->
        </el-form-item>
        <el-form-item label="备注：">
          <el-input size="small" v-model="checkData.remark" type="textarea" :rows="4" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="checkSubmit" >提交</el-button>
          <el-button size="small" @click="checkCancle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { getEnterPriseInfo } from '@/api/bill/incomeManage.js'
import { arriveList, getDetailByAccount, addArrive, check, getDetailByCode } from '@/api/bill/arriveManage.js'
export default {
  data() {
    return{
      searchCont: '',
      whichSelect: ['1'],
      loading: false,
      // 表格数据
      tableData: [],
      // 表单数据
      formData: {
        enterpriseAccount: '', // 企业账号
        enterpriseName: '', // 企业名称
        arrivalAmount: '', // 到账金额
        arrivalTime: '', // 到账时间
        enterpriseAccountId: '', // 企业id
        remark: '', // 备注
      },
      incomeRules: {
        enterpriseAccount: [
          {
            required: true, message: '请输入企业账号', trigger: 'blur'
          }
        ],
        arrivalAmount: [
          {
            required: true, message: '请输入到账金额', trigger: 'blur'
          }
        ],
        arrivalTime: [
          {
            required: true, message: '请输入到账时间', trigger: 'blur'
          }
        ]
      },
      checkRules: {
        incomeAndExpenseDetail: [
          {
            required: true, message: '请输入收支编码', trigger: 'blur'
          }
        ]
      },
      incomeType: [
        {
          key: 'RECHARGE',
          value: '充值'
        },
        {
          key: 'GIVE',
          value: '赠送',
        },
        {
          key: 'ROLL_IN',
          value: '转入'
        },
        {
          key: 'REVOKE',
          value: '撤销'
        },
        {
          key: 'ROLL_OUT',
          value: '转出'
        },
        {
          key: 'MONTH_CONSUME',
          value: '月消耗扣费'
        },
        {
          key: 'MANUAL_RETURN',
          value: '人工返还'
        },
        {
          key: 'UNKNOWN_MESSAGE_RETURN',
          value: '未知自动返还'
        },
        {
          key: 'FAIL_MESSAGE_RETURN',
          value: '失败自动返还'
        }
      ],
      // 对账表单参数
      checkData: {
        id: '', // 到账记录id
        enterpriseAccount: '', // 企业账号
        enterpriseName: '', // 企业名称
        arrivalAmount: '', // 到账金额
        incomeAndExpenseDetailId: '', // 关联收支id
        incomeAndExpenseDetail: '', // 关联收支
        incomeAndExpenseType: '', // 收支类别
        incomeAndExpenseAmount: '', // 收支金额
        remark: '', // 备注
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      accountVisible: false, // 添加收入弹窗控制
      incomeVisible: false,  // 对账收入控制
      isSubmit:false,//是否禁用提交按钮
      tableHeight:window.innerHeight - 310 +'', // 表格高度
      companyOptions: [], // 公司列表
    }
  },
  methods: {
    getTableList() {
      const params = {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize,
        enterpriseName: this.searchCont
      }
      this.loading = true
      arriveList(params).then(res => {
        if(res.status == 0) {
          const data = res.data.records
          this.tableData = data
          this.page.total = res.data.total
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true
          })
        }
        this.loading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.loading = false
      })
    },
    // 刷新表格数据
    refresh() {
      this.getTableList()
    },
    // 重置搜索数据
    reset() {
      this.searchCont = ''
    },
    // 搜索事件
    searchAction() {
      this.getTableList()
    },
    // 添加收入
    addIncome() {
      if(this.$refs.addIncome) {
        this.formData = this.$options.data().formData
        this.$refs.addIncome.resetFields()
        this.$refs.addIncome.clearValidate()
      }
      this.accountVisible = true
    },
    // 对账
    check(val) {
      this.checkData.id = val.id
      this.checkData.enterpriseAccount = val.enterpriseAccount
      this.checkData.enterpriseName = val.enterpriseName
      this.checkData.arrivalAmount = val.arrivalAmount
      this.checkData.incomeAndExpenseAmount = ''
      this.checkData.incomeAndExpenseType = ''
      if (this.$refs.checkForm) {
        this.$refs.checkForm.resetFields()
        this.$refs.checkForm.clearValidate()
      }
      this.incomeVisible = true
    },
    // 获取关联内容
    getDetail(){
      // console.log(this.checkData.incomeAndExpenseDetailId)
      if (this.checkData.incomeAndExpenseDetail != ''){
        const params = {
          incomeAndExpenseCode: this.checkData.incomeAndExpenseDetail
        }
        getDetailByCode(params).then(res => {
          if (res.status == 0) {
            if (res.data == null) {
              this.$message({
                type: 'warning',
                message: '请输入正确的收支编码',
                center: true
              })
              this.checkData.incomeAndExpenseDetail = ''
              return
            }
            this.incomeType.forEach(item => {
              if(item.key == res.data.incomeAndExpenseType){
                this.checkData.incomeAndExpenseType = item.value
              }
            })
            // this.checkData.incomeAndExpenseType = res.data.incomeAndExpenseType
            this.checkData.incomeAndExpenseAmount = res.data.amount
            this.checkData.incomeAndExpenseDetailId = res.data.id
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              center: true
            })
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
      }
    },
    // 页码切换
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getTableList()
    },
    // 切换当前页码数
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getTableList()
    },
    // 根据企业账号获取企业名称和id
    getEnterprise(value) {
      const query = {
        enterpriseAccountId: value
      }
      getEnterPriseInfo(query).then(ele => {
        if (ele.status == 0) {
          this.formData.enterpriseName = ele.data.enterpriseName
          this.formData.enterpriseAccountId = ele.data.enterpriseAccountId
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        const params = {
          enterpriseAccountName: query
        }
        getDetailByAccount(params).then(res => {
          if (res.status == 0) {
            this.companyOptions = res.data
          }
        })
      }
    },
    submit() {
      this.$refs.addIncome.validate(valid => {
        if(valid) {
          this.isSubmit=true
          addArrive(this.formData).then(res => {
            this.isSubmit=false
            if (res.status == 0) {
              this.$message({
                type: "success",
                message: '新增成功!',
                center: true
              })
              this.cancle()
              this.getTableList()
            } else {
              this.$message({
                type: "error",
                message: res.message,
                center: true
              })
            }
          }).catch(error => {
            this.isSubmit=false
            this.$message({
              type: "error",
              message: error,
              center: true
            })
          })
        }
      })
    },
    cancle(){
      this.formData = this.$options.data().formData
      this.$refs.addIncome.resetFields()
      this.$refs.addIncome.clearValidate()
      this.accountVisible = false
    },
    checkSubmit(){
      this.$refs.checkForm.validate(valid => {
        if (valid) {
          const params = {
            arrivalRecordId: this.checkData.id,
            incomeAndExpenseDetailId: this.checkData.incomeAndExpenseDetailId,
            remark: this.checkData.remark
          }
          check(params).then(res => {
            if(res.status == 0) {
              this.$message({
                type: 'success',
                message: '操作成功!',
                center: true
              })
              this.checkCancle()
              this.getTableList()
            } else {
              this.$message({
                type: 'error',
                message: res.message,
                center: true
              })
            }
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
          })
        }
      })
    },
    checkCancle() {
      this.checkData = this.$options.data().checkData
      this.$refs.checkForm.resetFields()
      this.$refs.checkForm.clearValidate()
      this.incomeVisible = false
    },
    inputBlur(event){
      this.formData.arrivalAmount = event.target.value
      if(this.formData.arrivalAmount !== '') {
        this.formData.arrivalAmount = Number(this.formData.arrivalAmount).toFixed(4)
      }
    },
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.getTableList();
      }
    },
  },
  created() {
  },
  mounted() {
    this.getTableList()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  }
}
</script>
<style lang="less" scoped>
  #accountManage{
    width: 100%;
    height: 100%;
    background-color: #fff;
    color: #333;
    letter-spacing: 0.75px;
    .title{
      height: 96px;
      line-height: 96px;
      margin-left: 70px;
      font-size: 20px;
    }
    .container{
      padding: 0 70px;
    }
    /deep/ .el-collapse{
    border: 0;
  }
  /deep/ .el-collapse-item__wrap{
    background-color:#F8F8FA ;
    border: 0;
    padding:0 67px;
  }
  /deep/ .el-collapse-item__header{
    height: 38px;
    background-color:#F8F8FA ;
    // border-bottom: 1px dashed  #c6c6c6;
    padding-left: 20px;
    position: relative;
    color: #333333;
    font-size: 14px;
  }
  /deep/ .el-collapse-item__header .el-collapse-item__arrow{
    position: absolute;
    left: 0;
    font-size: 14px;
  }
  /deep/ .el-collapse-item__content{
    margin-top: 25px;
  }
  /deep/ [class*=el-col-] {
    height: 40px;
    line-height: 40px;
  }
  }
</style>
