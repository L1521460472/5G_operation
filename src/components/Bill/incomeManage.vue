<template>
  <!-- 收支管理 -->
  <div id="incomeManage">
    <div class="title">收支管理</div>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 收支明细 -->
        <el-tab-pane label="收支明细" name="first">
          <div class="headerBtn">
            <div class="headerBtnLeft">
              <el-button class="addBtn" type="primary" size="small"  @click="refresh">
                <i class="iconfont iconshuaxin"></i>
              </el-button>
              <el-button class="addBtn" type="primary" size="small"  @click="reset">
                <i class="iconfont iconguanbi"></i>
              </el-button>
              <el-input class="search" style="width: 215px" v-model="searchCont1" size="small" maxlength="20" placeholder="企业名称">
                <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-select size="small" clearable class="search" v-model="searchType" placeholder="收支类别">
                <el-option
                 v-for="(item, index) in typeList" :key="index"
                 :label="item.label"
                 :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="headerBtnRight">
              <el-button  type="primary"  size="small"  @click="addIncome" v-has="'incomeAndExpenseDetailAdd'">
                <i class="iconfont iconxinzeng"></i>
                添加收入
              </el-button>
            </div>
          </div>
          <div class="blankData">
            <el-table
            :data="tableData"
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small"
            :style="{'color':'#333','min-height':tableHeight + 'px'}"
            v-loading="loading1"
            border>
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-collapse :value="whichSelect">
                    <el-collapse-item title="收支详情" name="1">
                      <el-form label-width="120px" label-position="left">
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="收支编号：">
                              <span>{{scope.row.incomeAndExpenseCode}}</span>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="企业账号：">
                              <span>{{scope.row.enterpriseAccount}}</span>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="企业名称：">
                              <span>{{scope.row.enterpriseName}}</span>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="潜力等级：">
                              <span>{{scope.row.potentialLevel == 1 ? '小微' : (scope.row.potentialLevel == 2 ? '核心' : (scope.row.potentialLevel == 3 ? '价值' : '战略')) }}</span>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="所属销售：">
                              <span>{{scope.row.belongSalesName}}</span>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="企业当前余额：">
                              <span>{{scope.row.balanceWhenAdd}}</span>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="收支类别：">
                              <span>{{scope.row.incomeAndExpenseType}}</span>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="收支金额：">
                              <span>{{scope.row.amount}}</span>
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
                        <el-form-item label="备注：">
                          <span>{{scope.row.remark}}</span>
                        </el-form-item>
                      </el-form>
                    </el-collapse-item>
                    <el-collapse-item title="审核详情" name="2">
                      <el-form label-width="90px" label-position="left">
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="审核人：">
                              <span>{{scope.row.auditAccount}}</span>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="审核时间：">
                              <span>{{scope.row.auditTime}}</span>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="审核结果：">
                              <span>{{scope.row.auditStatus == 0 ? '不通过' : (scope.row.auditStatus == 1 ? '审核通过' : '未审核')}}</span>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="审核意见：">
                              <span>{{scope.row.auditOpinion}}</span>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-form>
                    </el-collapse-item>
                  </el-collapse>
                </template>
              </el-table-column>
              <el-table-column align="center" type="selection"></el-table-column>
              <el-table-column label="企业账号" prop="enterpriseAccount" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column label="企业名称" prop="enterpriseName" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column label="潜力等级" prop="potentialLevel" width="100" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.potentialLevel == 1">小微</span>
                  <span v-else-if="scope.row.potentialLevel == 2">核心</span>
                  <span v-else-if="scope.row.potentialLevel == 3">价值</span>
                  <span v-else-if="scope.row.potentialLevel == 4">战略</span>
                </template>
              </el-table-column>
              <el-table-column label="收支类别" prop="incomeAndExpenseType" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column label="产品类型" prop="productType" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column label="业务类型" prop="businessType" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column label="付费方式" prop="payType" width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.payType == 0">预付费</span>
                  <span v-else-if="scope.row.payType == 1">后付费</span>
                </template>
              </el-table-column>
              <el-table-column label="收支时间" prop="auditTime" width="160" show-overflow-tooltip></el-table-column>
              <el-table-column label="预计到账时间" width="160" prop="estimateArrivalTime" show-overflow-tooltip></el-table-column>
              <el-table-column label="金额" prop="amount" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column label="所属销售" prop="belongSalesName" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作人" prop="operatorAccount" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column label="审核结果" prop="auditStatus" width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.auditStatus == 0">审核不通过</span>
                  <span v-if="scope.row.auditStatus == 1">审核通过</span>
                  <span v-else-if="scope.row.auditStatus == 2">未审核</span>
                </template>
              </el-table-column>
              <el-table-column label="对账状态" prop="reconciliationStatus" width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.reconciliationStatus == 0">未到账</span>
                  <span v-else>已对账</span>
                </template>
              </el-table-column>
              <el-table-column label="已对账金额" width="120" prop="reconciliationAmount" show-overflow-tooltip></el-table-column>
              <el-table-column label="备注" min-width="100" prop="remark" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div class="footer_page">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="page1.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="page1.pageSize"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page1.total"
            ></el-pagination>
          </div>
          <el-drawer
          title="添加收入"
          :visible.sync="incomeDrawer"
          :wrapperClosable="false"
          @close="cancle"
          size="460px"
          direction="rtl">
            <el-form :model="incomeFormData" ref="incomeForm" :rules="rules" class="drawerContent" label-width="130px">
              <el-form-item label="企业账号：" prop="enterpriseAccount">
                <!-- <el-input size="small" v-model="incomeFormData.enterpriseAccount" @change="getDetail"></el-input> -->
                <el-select
                  size="small"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入企业账号"
                  :remote-method="remoteMethod"
                  @change="selectEnterprise"
                  v-model="incomeFormData.enterpriseAccount">
                    <el-option
                      v-for="(item, index) in companyOptions"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="企业名称：">
                <el-input size="small" :disabled="true" v-model="incomeFormData.enterpriseAccountName"></el-input>
              </el-form-item>
              <el-form-item label="潜力等级：">
                <el-input size="small" :disabled="true" v-model="incomeFormData.potentialLevel"></el-input>
              </el-form-item>
              <el-form-item label="企业当前余额：">
                <el-input size="small" :disabled="true" v-model="Number(incomeFormData.enterpriseBalance).toFixed(4)"></el-input>
              </el-form-item>
              <el-form-item label="收入类别：" prop="incomeAndExpenseType">
                <el-radio-group v-model="incomeFormData.incomeAndExpenseType">
                  <el-radio v-for="(item, index) in incomeType2" :key="index" :label="item.key">{{item.value}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="操作金额：" prop="amount">
                <el-input size="small" v-model="incomeFormData.amount" oninput="value=value.replace(/[^\d.]/g,'')" @blur="inputBlur"></el-input>
              </el-form-item>
              <el-form-item label="预计到款时间：" prop="estimateArrivalTime">
                <el-date-picker type="datetime" v-model="incomeFormData.estimateArrivalTime" size="small" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
              <el-form-item label="转出企业账号：" v-if="incomeFormData.incomeAndExpenseType == 'ROLL_IN'" required>
                <el-input v-model="incomeFormData.rollOutEnterpriseAccount" size="small" @change="getRollOut"></el-input>
              </el-form-item>
              <el-form-item label="企业名称：" v-if="incomeFormData.incomeAndExpenseType == 'ROLL_IN'">
                <el-input v-model="incomeFormData.rollOutEnterpriseAccountName" disabled size="small"></el-input>
              </el-form-item>
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" :rows="4" v-model="incomeFormData.remark" maxlength="200" show-word-limit></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="submit" :disabled="isSubmit">提交</el-button>
                <el-button size="small" @click="cancle">取消</el-button>
              </el-form-item>
            </el-form>
          </el-drawer>
        </el-tab-pane>

        <!-- 待收支审查 -->
        <el-tab-pane label="待审核收支" name="second">
          <div class="headerBtn">
            <div class="headerBtnLeft">
              <el-button class="addBtn" type="primary" size="small"  @click="refreshCheck">
                <i class="iconfont iconshuaxin"></i>
              </el-button>
              <el-button class="addBtn" type="primary" size="small"  @click="resetCheck">
                <i class="iconfont iconguanbi"></i>
              </el-button>
              <el-input class="search" style="width: 215px" v-model="searchCont2" size="small" maxlength="20" placeholder="企业名称">
                <i @click="searchCheck" slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-select size="small" clearable class="search" v-model="searchType2" placeholder="收支类别">
                <el-option
                 v-for="(item, index) in typeList" :key="index"
                 :label="item.label"
                 :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <el-table
            :data="tableData2"
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small"
            v-loading="loading2"
            :style="{'color':'#333','min-height':tableHeight + 'px'}"
            border>
              <el-table-column align="center" type="selection"></el-table-column>
              <el-table-column label="企业账号" width="120" prop="enterpriseAccount" show-overflow-tooltip></el-table-column>
              <el-table-column label="企业名称" width="120" prop="enterpriseName" show-overflow-tooltip></el-table-column>
              <el-table-column label="所属销售" width="120" prop="belongSalesName" show-overflow-tooltip></el-table-column>
              <el-table-column label="潜力等级" width="120" prop="potentialLevel" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.potentialLevel == 1">小微</span>
                  <span v-else-if="scope.row.potentialLevel == 2">核心</span>
                  <span v-else-if="scope.row.potentialLevel == 3">价值</span>
                  <span v-else-if="scope.row.potentialLevel == 4">战略</span>
                </template>
              </el-table-column>
              <el-table-column label="收支类别" width="120" prop="incomeAndExpenseType" show-overflow-tooltip></el-table-column>
              <el-table-column label="金额" width="120" prop="amount" show-overflow-tooltip></el-table-column>
              <el-table-column label="提交时间" width="160" prop="createTime" show-overflow-tooltip></el-table-column>
              <el-table-column label="提交人" width="120" prop="createdAccount" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" fixed="right" min-width="100">
                <template slot-scope="scope">
                  <!-- <el-tooltip  effect="dark" content="审核" placement="top">
                    <img class="operation" src="../../assets/images/delay_icon.svg" >
                  </el-tooltip> -->
                  <!-- <el-tooltip  class="item" effect="dark" content="审核" placement="top">
                    <img class="operation"  @click="doCheck(scope.row)" src="../../assets/images/check.svg" v-has="'incomeAndExpenseDetailAudit'">
                  </el-tooltip> -->
                  <span class="operation" v-has="'incomeAndExpenseDetailAudit'" @click="doCheck(scope.row)">审核</span>
                  <!-- <el-button type="text" size="mini" icon="el-icon-check" @click="doCheck(scope.row)">审核</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="footer_page">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="page2.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="page2.pageSize"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page2.total"
            ></el-pagination>
          </div>
          <el-dialog title="收支审核" :visible.sync="checkVisible" width="30%" :close-on-click-modal="false">
            <el-radio-group style="margin-bottom:20px" v-model="auditForm.auditStatus">
              <el-radio :label="0">审核不通过</el-radio>
              <el-radio :label="1">审核通过</el-radio>
            </el-radio-group>
            <el-input type="textarea" placeholder="请在此输入审核意见(选填)" :rows="4" maxlength="200" v-model="auditForm.auditOpinion" show-word-limit></el-input>
            <div class="dialog-footer">
              <el-button size="small" type="primary" @click="checkSubmit">提交</el-button>
              <el-button size="small" @click="checkVisible = false">取消</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getIncomes, addIncome, getEnterPriseInfo, redayList, checkIncome } from '@/api/bill/incomeManage.js'
import { getDetailByAccount } from '@/api/bill/arriveManage.js'
import { getProductList, businessList } from '@/api/material/api.js'
export default {
  data() {
    return {
      // 收支管理
      activeName: 'first',
      whichSelect: ['1'],
      loading1: false,
      tableHeight:window.innerHeight - 368 +'', // 表格高度
      tableData: [], // 表格数据
      searchCont1: '', // 搜索条件
      searchType: '',// 收支类别
      incomeDrawer: false, // 添加收入抽屉控制
      incomeFormData: { // 添加收入表单
        remark: '', // 备注
        amount: '',  // 金额
        enterpriseAccountId: '', // 企业ID
        enterpriseAccountName: '', // 企业名称
        estimateArrivalTime: '',  // 预计到款时间
        rollOutEnterpriseAccountId: '', //转出企业账号id，收入类型为转入时必填
        rollOutEnterpriseAccountName: '', // 转出企业名称
        rollOutEnterpriseAccount: '', // 转出企业账号
        incomeAndExpenseType: '', // 转出类别
        enterpriseAccount: '', // 企业账号
        potentialLevel: '', // 潜力等级
        enterpriseBalance: '', // 企业当前余额
      },
      typeList: [
        {
          label: '充值',
          value: 0
        },
        {
          label: '赠送',
          value: 1
        },
        {
          label: '转入',
          value: 2
        },
        {
          label: '撤销',
          value: 3
        },
        {
          label: '转出',
          value: 4
        },
        {
          label: '月消耗扣费',
          value: 5
        },
        {
          label: '人工返还',
          value: 6
        },
        {
          label: '未知自动返还',
          value: 7
        },
        {
          label: '失败自动返还',
          value: 8
        }
      ],
      rules: {
        enterpriseAccount: [
          {
            required: true, message: '请输入企业账号', trigger: 'blur'
          }
        ],
        incomeAndExpenseType: [
          {
            required: true, message: '请选择转出类别', trigger: 'blur'
          }
        ],
        amount: [
          {
            required: true, message: '请输入操作金额', trigger: 'blur'
          }
        ],
        estimateArrivalTime: [
          {
            required: true, message: '请选择预计到款时间', trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true, message: '请输入操作备注', trigger: 'blur'
          }
        ]
      },
      page1: {
        currentPage: 1,
        pageSize: 10,
        total: 0
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
      incomeType2: [
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
          key: 'MANUAL_RETURN',
          value: '人工返还'
        }
      ],
      companyOptions: [],
      productList: [],  // 产品类型列表
      channelList: [],  // 通道列表
      // 待收支审查
      loading2: false,
      searchCont2: '', // 待收支审查条件
      tableData2: [], // 待收支审查表格数据
      searchType2: '',
      page2: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      checkVisible: false,
      auditForm: {
        auditOpinion: '', //审核意见
        auditStatus: '',
        incomeAndExpenseDetailId: '',
      },
      isSubmit:false,//是否禁用提交按钮
    }
  },
  watch: {
    searchType(){
      this.getTableList()
    },
    searchType2() {
      this.getRedayList()
    }
  },
  methods: {
    // 获取分页列表
    getTableList() {
      const params = {
        currentPage: this.page1.currentPage,
        pageSize: this.page1.pageSize,
        enterpriseName: this.searchCont1,
        type: this.searchType
      }
      this.loading1 = true
      getIncomes(params).then((res) => {
        if(res.status == 0) {
          this.page1.total = res.data.total
          const data = res.data.records
          data.forEach(ele => {
           this.incomeType.forEach(item => {
              if (item.key == ele.incomeAndExpenseType) {
                ele.incomeAndExpenseType = item.value
              }
            })
            this.productList.forEach(item => {
              if (item.id == ele.productType) {
                ele.productType = item.name
              }
            })
            this.channelList.forEach(item => {
              if (item.id == ele.businessType) {
                ele.businessType = item.businessName
              }
            })
          })
          this.tableData = res.data.records
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true
          })
        }
        this.loading1 = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.loading1 = false
      })
    },
    // tab切换事件
    handleClick() {
      if (this.activeName == 'first') {
        this.getTableList()
      } else {
        this.getRedayList()
      }
    },
    // 刷新事件
    refresh() {
      this.getTableList()
    },
    // 重置搜索条件事件
    reset() {
      this.searchCont1 = ''
    },
    // 搜索事件
    searchAction() {
      this.getTableList()
    },
    // 点击增加收入事件
    addIncome() {
      this.incomeDrawer = true
    },
    // 根据选择框
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
    selectEnterprise(value) {
      // console.log(value)
      const query = {
        enterpriseAccountId: value
      }
      this.incomeFormData.enterpriseAccountId = value
      getEnterPriseInfo(query).then(ele => {
        if (ele.status == 0) {
          const data = ele.data
          this.incomeFormData.enterpriseAccountName = data.enterpriseName
          this.incomeFormData.potentialLevel = data.potentialLevel == 1 ? '小微' : (data.potentialLevel == 2 ? '核心': (data.potentialLevel == 3 ? '价值' : '战略'))
          this.incomeFormData.enterpriseBalance = data.availableBalance
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 切换当前页码数目
    handleSizeChange1(val) {
      this.page1.pageSize = val
      this.getTableList()
    },
    // 切换当前页码
    handleCurrentChange1(val) {
      this.page1.currentPage = val
      this.getTableList()
    },
    // 输入企业id后获取详细信息
    getDetail() {
      const params = {
        enterpriseAccountName: this.incomeFormData.enterpriseAccount
      }
      getDetailByAccount(params).then(res => {
        if (res.status == 0) {
          if (res.data.length == 0) {
            this.$message({
              type: 'error',
              message: '请输入正确的企业账号！',
              center: true
            })
            return
          }
          const data = res.data[0]
          this.incomeFormData.enterpriseAccountId = data.id
          const query = {
            enterpriseAccountId: data.id
          }
          getEnterPriseInfo(query).then(ele => {
            if (ele.status == 0) {
              const data = ele.data
              // console.log(data)
              this.incomeFormData.enterpriseAccountName = data.enterpriseName
              this.incomeFormData.potentialLevel = data.potentialLevel == 1 ? '小微' : (data.potentialLevel == 2 ? '核心': (data.potentialLevel == 3 ? '价值' : '战略'))
              this.incomeFormData.enterpriseBalance = data.availableBalance
            }
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
          })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 提交
    submit() {
      this.$refs.incomeForm.validate(valid => {
        if(valid){
          if(this.incomeFormData.enterpriseAccountId == '') {
            this.$message({
              type: 'warning',
              message: '请输入正确的企业账号',
              center: true
            })
            return
          }
          if (this.incomeFormData.incomeAndExpenseType == 'ROLL_IN') {
            if (this.incomeFormData.rollOutEnterpriseAccountName == ''){
              this.$message({
                type: 'warning',
                message: '请输入转出企业账号',
                center: true
              })
              return
            }
          }
          this.isSubmit=true,
          addIncome(this.incomeFormData).then(res => {
            this.isSubmit=false
            if(res.status == 0) {
              this.$message({
                type: 'success',
                message: '新增成功！',
                center: true
              })
              this.cancle()
              this.getTableList()
            } else {
              this.$message({
                type: 'error',
                message: res.message,
                center: true
              })
            }
          }).catch(error => {
            this.isSubmit=false
            this.$message({
                type: 'error',
                message: error,
                center: true
              })
          })
        }
      })
    },
    cancle() {
      this.incomeFormData = this.$options.data().incomeFormData
      this.$refs.incomeForm.resetFields()
      this.$refs.incomeForm.clearValidate()
      this.incomeDrawer = false
    },
    // 获取转出企业名称
    getRollOut() {
      const params = {
        enterpriseAccountName: this.incomeFormData.rollOutEnterpriseAccount
      }
      getDetailByAccount(params).then(res => {
        if (res.status == 0) {
          if (res.data.length == 0) {
            this.$message({
              type: 'error',
              message: '请输入正确的转出企业账号',
              center: true
            })
            this.incomeFormData.rollOutEnterpriseAccount = ''
            return
          }
          const data = res.data[0]
          this.incomeFormData.rollOutEnterpriseAccountId = data.id
          const query = {
            enterpriseAccountId: data.id
          }
          getEnterPriseInfo(query).then(ele => {
            if (ele.status == 0) {
              const data = ele.data
              // this.incomeFormData.enterpriseAccountName = data.enterpriseName
              this.incomeFormData.rollOutEnterpriseAccountName = data.enterpriseName
            }
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
          })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    inputBlur(event) {
      this.incomeFormData.amount = event.target.value
      if(this.incomeFormData.amount != '') {
        this.incomeFormData.amount = Number(this.incomeFormData.amount).toFixed(4)
      }
    },
    /**
     * 待收支审查
     */
    // 获取待收支列表
    getRedayList() {
      const params = {
        currentPage: this.page2.currentPage,
        pageSize: this.page2.pageSize,
        enterpriseName: this.searchCont2,
        type: this.searchType2
      }
      this.loading2 = true
      redayList(params).then(res => {
        if(res.status == 0) {
          // this.tableData2 = res.data.records
          res.data.records.forEach(ele => {
           this.incomeType.forEach(item => {
              if (item.key == ele.incomeAndExpenseType) {
                ele.incomeAndExpenseType = item.value
              }
            })
          })
          this.tableData2 = res.data.records
          this.page2.total = res.data.total
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true
          })
        }
        this.loading2 = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.loading2 = false
      })
    },
    // 刷新待收支审查
    refreshCheck() {
      this.getRedayList()
    },
    // 重置待收支审查
    resetCheck() {
      this.searchCont2 = ''
    },
    // 搜索
    searchCheck() {
      this.getRedayList()
    },
    // 点击审核按钮
    doCheck(val) {
      this.auditForm.incomeAndExpenseDetailId = val.id
      this.auditForm.auditOpinion = ''
      this.auditForm.auditStatus = ''
      this.checkVisible = true
    },
    // 审核提交
    checkSubmit() {
      if (this.auditForm.auditStatus === ''){
        this.$message({
          type: 'warning',
          message: '请选择是否通过审核',
          center: true
        })
        return
      }
      checkIncome(this.auditForm).then(res => {
        if (res.status == 0) {
          this.$message({
            type: 'success',
            message: '审核成功!',
            center: true
          })
          this.checkVisible = false
          this.getRedayList()
        } else {
          this.$message({
            type: 'error',
            message: '审核失败或网络错误！',
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
    },
    // 切换当前页码数目
    handleSizeChange2(val) {
      this.page2.pageSize = val
      this.getRedayList()
    },
    // 切换当前页码
    handleCurrentChange2(val) {
      this.page2.currentPage = val
      this.getRedayList()
    },
    // 获取产品类型列表
    getProductLists() {
      getProductList({}).then(res => {
        if (res.status == 0) {
          this.productList = res.data
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
    },

    // 获取产品类型
    async getProducts() {
      return await getProductList({}).then(res => res.data)
    },
    // 获取业务类型列表
    getBusinessList() {
      const params = {
        currentPage: 1,
        pageSize: 100
      }
      businessList(params).then(res => {
        if (res.status == 0) {
          this.channelList = res.data.records
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
    },
    // 获取业务类型
    async getBusiness() {
      const params = {
        currentPage: 1,
        pageSize: 100
      }
      return await businessList(params).then(res => res.data.records)
    },
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        if(this.activeName == 'first') {
          this.getTableList()
        } else if(this.activeName == 'second') {
          this.getRedayList()
        }
      }
    },
    async initData() {
      this.productList = await this.getProducts()
      this.channelList = await this.getBusiness()
      this.getTableList()
    }
  },
  mounted(){
    this.initData()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  created(){

  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },
}
</script>
<style lang="less" scoped>
#incomeManage{
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #333;
  letter-spacing: 0.75px;
  .title{
    height: 26px;
    line-height: 26px;
    padding-top: 40px;
    font-size: 20px;
    margin-bottom: 18px;
    padding-left: 70px;
  }
  .container{
    padding: 0 70px;
  }

  .drawerContent{
    padding: 0 30px;
  }
  .dialog-footer{
    text-align: center;
    padding: 20px 0 0;
  }
  /deep/ .el-radio{
    margin-right: 20px;
    padding: 8px 0;
  }
  /deep/ .el-tabs__nav-wrap::after{
    height: 1px;
  }
  // /deep/ .el-collapse-item__content{
  //   padding: 20px 30px;
  // }
  // /deep/ .el-collapse-item__header{
  //   padding: 0 30px;
  // }
  // /deep/ .el-dialog__body{
  //   padding: 0 20px 30px;
  // }
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
  /deep/ .el-collapse-item__content{
    margin-top: 25px;
  }
  /deep/ .el-tabs__item:focus.is-active.is-focus:not(:active) {
         -webkit-box-shadow: none;
          box-shadow: none;
  }
  /deep/ [class*=el-col-] {
    height: 40px;
    line-height: 40px;
  }
  .el-col-12{
    width: 520px;
  }
  /deep/ .el-tabs__header{
    margin: 0 0 30px;
  }
  .blankData /deep/ .el-table__empty-block{
    text-align: left;
  }

}
</style>
