<template>
  <div id="businessAccount" v-loading="loading"  element-loading-text="loading">
    <div class="title">企业账户</div>
    <div class="container">
      <div class="headerBtn">
        <div class="headerBtnLeft">
          <el-dropdown trigger="click" :hide-on-click="false" @visible-change="changeDropdown"> 
            <el-button  type="primary" size="small" >
              <i class="iconfont icontiaojie"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-checkbox-group v-model="checkList" @change="handleCheckedFormHeader">
                <el-checkbox  v-for="item in formHeaderList" :label="item.prop" :key="item.prop">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-button  type="primary" size="small"  @click="filterAtion">
            <i class="iconfont iconshouqi"></i>
          </el-button> -->
          <el-button   type="primary" size="small"  @click="refresh">
            <i class="iconfont iconshuaxin"></i>
          </el-button>
          <el-button  type="primary" size="small"  @click="reset">
            <i class="iconfont iconguanbi"></i>
          </el-button> 
          <el-select style="width:100px" v-model="accountStatus" clearable size="small" placeholder="账户状态">
            <el-option
              v-for="item in accountStatusList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-input class="search" style="width:114px" v-model="searchCont" size="small" maxlength="50" placeholder="企业名称">
            <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="headerBtnRight">
            <el-button  type="primary"  size="small" v-has="'enterpriseAccountAdd'"  @click="createAccount">
              <i class="iconfont iconxinzeng"></i>
              创建账户
            </el-button>
            <el-button v-has="'enterpriseAccountConfigUpdate'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="changeConfigur">
              <i class="iconfont iconbiangengneirong"></i>
              变更配置
            </el-button>
            <el-button v-has="'enterpriseAccountDisable'"  class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"  @click="stopUse">
              <i class="iconfont icontingyong"></i>
              停用
            </el-button>
            <el-button v-has="'enterpriseAccountEnable'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="startUse">
              <i class="iconfont iconzhuanweiqiyong"></i>
              启用
            </el-button>
            <el-button v-if="'enterpriseAccountUnlock'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="unlock">
              <i class="iconfont iconzu"></i>
              解锁
            </el-button>
            <el-button v-if="'enterpriseAccountDelete'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="deleteAction(1,selectData)">
              <i class="iconfont iconshanchu"></i>
              删除
            </el-button>
        </div> 
      </div>
      <div >
        <el-table
          border
          :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
          size="small"
          :data="tableData"
          @selection-change="handleSelectionChange"
          @expand-change="handleExpand"
          :style="{'color':'#333','min-height':tableHeight + 'px'}"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-tabs :value="'account' + props.$index" >
                <el-tab-pane class="accountInfo" label="基本信息" :name="'account' + props.$index" :id="props.row.id" :index="props.$index">
                  <el-form label-position="left"  class="demo-table-expand"  >
                    <el-form-item label="财务信息：" v-if="props.row.financeInfo">
                      <table class="financeInfo" bordercolor="#F5F7FA"  cellspacing="0" cellpadding="10" align="center" width="600">
                        <tr align="center" >
                          <td align="center"  height="30">账户余额：{{props.row.financeInfo.balance}}元</td>
                          <td align="center" height="30">冻结余额：{{props.row.financeInfo.freezeBalance}}元</td>
                          <td align="center" height="30">赠送余额：{{props.row.financeInfo.giveBalance}}元</td>
                        </tr>
                        <tr >
                          <td align="center" height="30">信用额度：{{props.row.financeInfo.creditBalance}}元</td>
                          <td align="center" height="30">付费方式：{{props.row.financeInfo.payTypeStr}}</td>
                          <td align="center" height="30"></td>
                        </tr>
                      </table>
                      <!-- <div class="financeInfo">
                        <span>账户余额：￥{{props.row.financeInfo.balance}}</span>
                        <span>冻结余额：￥{{props.row.financeInfo.freezeBalance}}</span>
                        <span>赠送余额：￥{{props.row.financeInfo.giveBalance}}</span>
                        <span>信用额度：￥{{props.row.financeInfo.creditBalance}}</span>
                        <span>付费方式：{{props.row.financeInfo.payTypeStr}}</span>
                      </div> -->
                    </el-form-item>
                    <el-form-item label="使用产品：" v-if="props.row.topProductTypeList">
                        <el-checkbox v-for="item in props.row.topProductTypeList" :key="item.productType" v-model="item.productTypeChecked" disabled>{{item.productTypeStr}}</el-checkbox>
                    </el-form-item>
                    <el-form-item label="基础资费：" v-if="props.row.baseCostList">
                      <el-table
                        border
                        :header-cell-style="{background:'#F5F7FA',color:'#333333',lineHeight:'20px'}"
                        size="small"
                        :data="props.row.baseCostList"
                      >
                        <el-table-column prop="baseCostTypeStr" label="类型"  show-overflow-tooltip></el-table-column>
                        <el-table-column prop="costUnitStr" label="单位"  show-overflow-tooltip></el-table-column>
                        <el-table-column prop="amount" label="单价" show-overflow-tooltip></el-table-column>
                      </el-table> 
                    </el-form-item>
                    <el-form-item label="业务配置：" class="business" v-if="props.row.bottomProductTypeSelectedList">
                      <el-tabs  :value="'business' + props.$index + 0">
                        <el-tab-pane  v-for="(item,index) in props.row.bottomProductTypeSelectedList" :key="item.productType" :label="item.productTypeStr" :name="'business' + props.$index + index">
                          <el-table
                            border
                            :header-cell-style="{background: '#F5F7FA',color: '#333333',lineHeight: '20px'}"
                            size="small"
                            :data="item.businessTypeList"
                          >
                            <el-table-column prop="businessStr" label="业务类型" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="costUnitStr" label="单位" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="unitPrice" label="单价" show-overflow-tooltip></el-table-column>
                            <!-- <el-table-column prop="amount" label="通道组" show-overflow-tooltip></el-table-column> -->
                          </el-table>
                        </el-tab-pane>
                      </el-tabs>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="认证信息" :name="'enterprise' + props.$index" :id="props.row.id" :index="props.$index">
                  <el-form label-position="left"  class="demo-table-expand">
                    <el-form-item label="公司名称：">
                      <span>{{ props.row.enterpriseInfo.enterpriseName }}</span>
                    </el-form-item>
                    <el-form-item label="统一社会信用代码：">
                      <span>{{ props.row.enterpriseInfo.enterpriseCreditCode }}</span>
                    </el-form-item>
                    <el-form-item label="注册地址：">
                      <span>{{ props.row.enterpriseInfo.registeredAddress }}</span>
                    </el-form-item>
                    <el-form-item label="营业资质文件：">
                      <el-image v-for="(item,index) in props.row.enterpriseInfo.businessLicense" :key='index' style="width: 69px; min-height: 98px" :src="item" :preview-src-list="[item]"></el-image>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </template>
          </el-table-column> 
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column v-if="item.check" v-for="item in formHeaderList" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" show-overflow-tooltip></el-table-column>    
          <!-- <el-table-column prop="account" label=" 企业账号" width="120" show-overflow-tooltip></el-table-column> 
          <el-table-column prop="enterpriseName"  label="企业名称" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="industryTypeStr" label="行业" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="provinceStr" label="地区" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterpriseContact" label="联系人" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mobile" label="手机号码" width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="email" label="邮箱" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="belongSalesName" label="所属销售" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="belongDeptName" label="所属部门" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="belongTo" label="操作人" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="typeStr" label="账号类型" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="potentialLevelStr" label="潜力等级" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="testDeadlineDate" label="测试截止日期" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="signingDate" label="签约日期" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="commercialTransferDate" label="商用日期" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="checkStatusStr" label="认证状态" width="100"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="accountStatusStr" label="账户状态" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="commercialStatusStr" label="商用状态" width="100" show-overflow-tooltip></el-table-column> --> -->
          <!-- <el-table-column prop="createTime" label="创建时间" width="150" show-overflow-tooltip></el-table-column> -->
          <el-table-column  label="操作" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip v-if="delayBtn && scope.row.commercialStatus === 1"  effect="dark" content="延期" placement="top">
                <img class="operation"  @click="delayAction(scope.row)" src="../../assets/images/delay_icon.svg" >
              </el-tooltip> 
              <el-tooltip v-if="commercialBtn && scope.row.commercialStatus === 1"  effect="dark" content="商用" placement="top">
                <img class="operation"  @click="commercialAction(scope.row)" src="../../assets/images/commercial_icon.svg" >
              </el-tooltip>
              <el-tooltip v-has="'enterpriseAccountUpdate'"  effect="dark" content="修改" placement="top">
                <img class="operation"  @click="editAction(scope.row)" src="../../assets/images/edit_icon.svg" >
              </el-tooltip>
              <el-tooltip v-has="'enterpriseAccountPasswordReset'"  effect="dark" content="密码重置" placement="top">
                <img class="operation"  @click="resetPassword(scope.row)" src="../../assets/images/resetPassword.svg" >
              </el-tooltip>
              <el-tooltip v-has="'enterpriseAccountDelete'"  effect="dark" content="删除" placement="top">
                <img class="operation"  @click="deleteAction(2,scope.row)"  src="../../assets/images/delete_icon.svg" >
              </el-tooltip>
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
    <!-- 新增/编辑账号 -->
    <el-drawer
      :title="accountDrawerTitle"
      :visible.sync="accountDrawer"
      :before-close="closeAccountDrawer"
      :modal-append-to-body="true"
      :wrapperClosable="false"
      size="460px"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="accountForm"
        :model="accountForm"
        :rules="accountRules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item prop="accountType" label="账号类型：">
          <el-select v-model="accountForm.accountType" clearable size="small" placeholder="请选择账户类型">
            <el-option
              v-for="item in accountTypeList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="account" label="企业账号：">
          <el-input size="small" v-model="accountForm.account" :disabled="disabledAccount"></el-input>
        </el-form-item>
        <el-form-item prop="enterpriseName" label="公司名称：">
          <el-input size="small" v-model="accountForm.enterpriseName"></el-input>
        </el-form-item>
        <el-form-item prop="provice" label="所属地区：">
          <el-select v-model="accountForm.provice" clearable size="small" placeholder="请选择所属地区">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.dictionaryName"
              :value="item.id"
            >
            </el-option>
          </el-select> 
        </el-form-item> 
        <el-form-item prop="industry" label="所属行业：">
          <el-select v-model="accountForm.industry" clearable size="small" placeholder="请选择行业">
            <el-option
              v-for="item in industryList"
              :key="item.id"
              :label="item.dictionaryName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item> 
        <el-form-item prop="contacts" label="联系人：">
          <el-input size="small" v-model="accountForm.contacts"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系电话：">
          <el-input size="small" v-model.number="accountForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="联系邮箱：">
          <el-input size="small" v-model="accountForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="belongSales" label="所属销售：">
          <el-input size="small" disabled v-model="accountForm.belongSales"></el-input>
          <!-- <el-select v-model="accountForm.belongSales" clearable value-key="belongSalesId"  size="small" placeholder="请选择所属销售">
            <el-option
              v-for="item in belongSalesList"
              :key="item.belongSalesId"
              :label="item.belongSalesName"
              :value="item"
            >
            </el-option>
          </el-select> -->
        </el-form-item> 
        <el-form-item prop="belongDept" label="所属部门：">
          <el-input size="small" disabled v-model="accountForm.belongDept"></el-input>
          <!-- <el-select v-model="accountForm.belongDept" clearable value-key="belongDeptId" size="small" placeholder="请选择所属部门">
            <el-option  
              v-for="item in belongDeptList"
              :key="item.belongDeptId"
              :label="item.belongDeptName"
              :value="item"
            >
            </el-option>
          </el-select> -->
        </el-form-item> 
        <el-form-item prop="commercialStatus" label="商用状态：">
          <el-select v-model="accountForm.commercialStatus" disabled clearable size="small" placeholder="请选择商用状态">
            <el-option
              v-for="item in commercialStatusList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option> 
          </el-select>
        </el-form-item> 
        <el-form-item prop="potential" label="潜力等级：">
          <el-select v-model="accountForm.potential" clearable size="small" placeholder="请选择潜力等级">
            <el-option
              v-for="item in potentialList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option> 
          </el-select>
        </el-form-item> 
        <el-form-item prop="password" label="登录密码：" v-if="accountDrawerTitle === '创建账户'">
          <el-input size="small" type="password" v-model="accountForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="password2" label="确认密码：" v-if="accountDrawerTitle === '创建账户'">
          <el-input size="small" type="password" v-model="accountForm.password2"></el-input>
        </el-form-item>
        <el-form-item prop="parmentDepartment" label="">
            <el-button  type="primary" size="small" v-if="accountDrawerTitle === '创建账户'" @click="confirmAddAccount">提 交</el-button>
            <el-button  type="primary" size="small" v-if="accountDrawerTitle === '修改账户'" @click="confirmEditAccount">提 交</el-button>
            <el-button  size="small" @click="closeAccountDrawer">取 消</el-button> 
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 变更配置 -->
    <change-configur  :changeToast="isChangeToast" @closeChangeToast="closeChange" @changeSuccess="changeSuccessRefresh" :configureData="configureData"></change-configur>
    
    <!-- 重置密码 -->
    <el-dialog
      title="重置密码"
      class="resetPassword"
      :visible.sync="resetToast"
      :close-on-click-modal="false"
      :before-close="closeResetToast"
      width="460px"
      top="200px"
    >
      <el-form
        ref="resetPasswordForm"
        :model="resetPasswordForm"
        :rules="resetPasswordRules"
        label-width="100px"
        label-position="right"
      > 
        <el-form-item prop="account" label="账号：">
          <el-input disabled size="small" v-model="resetPasswordForm.account"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码：">
          <el-input size="small" type="password" v-model="resetPasswordForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="password2" label="确认密码：">
          <el-input size="small" type="password" v-model="resetPasswordForm.password2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="confirmResetPassword" >确 认</el-button>
        <el-button @click="closeResetToast" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 商用/延期 -->
    <el-dialog
      :title="testToastTitle"
      class="resetPassword"
      :visible.sync="testToast"
      :close-on-click-modal="false"
      :before-close="closeTestoast"
      width="460px"
      top="200px"
    >
      <el-form
        ref="testForm"
        :model="testForm"
        :rules="testRules"
        label-width="100px"
        label-position="right"
      > 
        <el-form-item prop="enterpriseName" label="企业名称：">
          <span >{{testForm.enterpriseName}}</span>
          <!-- <el-input disabled size="small" v-model="resetPasswordForm.account"></el-input> -->
        </el-form-item>
        <el-form-item prop="signingTime" v-if="testToastTitle === '测试转商用'" label="签约日期：">
          <el-date-picker
            size="small"
            v-model="testForm.signingTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="dealyTime" v-if="testToastTitle === '测试延期'" label="延期时长：">
          <el-select style="width:260px" v-model="testForm.dealyTime" clearable size="small" placeholder="请选择延期时长">
            <el-option
              v-for="item in dealyTimeList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option> 
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="testToastTitle === '测试转商用' ? confirmCommercial():confirmDealy()" >提 交</el-button>
        <el-button @click="closeTestoast" size="small">取 消</el-button> 
      </span>
    </el-dialog>
  </div>
</template>
<script>
import bcryptjs from "bcryptjs";
import md5 from 'js-md5'
import {enterpriseAccountList,getIndustryTypeList,enterpriseAccountDetail,addEnterpriseAccount,editEnterpriseAccount,deleteEnterpriseAccount,disableEnterpriseAccount,enableEnterpriseAccount,unlockEnterpriseAccount,resetPassword,configEnterpriseAccount,getBelongInfo,testTransferBusiness,testDelay,saveCustomList,getCustomList} from '../../api/userName/api'
import { regexpPassword ,regexpAccount,getCookie,getButtonList} from "../../public";
import changeConfigur from './changeConfigur'

export default {
  name:'businessAccount',
  components:{changeConfigur},
  props:{
    authorityBttonList:{
      type:Array
    }
  },
  data() {
    // 账号验证规则
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空"));
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("账号长度为6-20位"));
      } else if (!regexpAccount(value)) {
        callback(new Error("账号必须有数字和小写字母组成"));
      } else {
        callback();
      }
    };
    // 密码验证规则
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value.length < 8 || value.length > 12) {
        callback(new Error("密码长度为8-12位"));
      } else if (!regexpPassword(value)) {
        callback(new Error("密码必须有数字和字母组成"));
      } else {
        callback();
      }
    };
    // 确认密码验证规则
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.accountForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    // 重置密码的确认密码校验
    var validatePassword3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.resetPasswordForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      accountStatus:null,//账户状态
      accountStatusList:[
        {
          id:0,
          value:'正常'
        },
        {
          id:1,
          value:'停用'
        },
        {
          id:2,
          value:'锁住'
        },
        {
          id:3,
          value:'冻结'
        }
      ],//审核状态列表
      checkList:[],
      formHeaderList:[
        {
          prop:'account',
          label:'企业账号',
          width:120,
          check:true,
        },
        {
          prop:'enterpriseName',
          label:'企业名称',
          width:140,
          check:true,
        },
        {
          prop:'industryTypeStr',
          label:'行业',
          width:120,
          check:true,
        },
        {
          prop:'provinceStr',
          label:'地区',
          width:120,
          check:true,
        },
        {
          prop:'enterpriseContact',
          label:'联系人',
          width:120,
          check:true,
        },
        {
          prop:'mobile',
          label:'手机号码',
          width:110,
          check:true,
        },
        {
          prop:'email',
          label:'邮箱',
          width:140,
          check:true,
        },
        {
          prop:'belongSalesName',
          label:'所属销售',
          width:140,
          check:true,
        },
        {
          prop:'belongDeptName',
          label:'所属部门',
          width:140,
          check:true,
        },
        {
          prop:'belongTo',
          label:'操作人',
          width:120,
          check:true,
        },
        {
          prop:'typeStr',
          label:'账号类型',
          width:120,
          check:true,
        },
        {
          prop:'potentialLevelStr',
          label:'潜力等级',
          width:120,
          check:true,
        },
        {
          prop:'updateTime',
          label:'更新时间',
          width:180,
          check:true,
        },
        {
          prop:'testDeadlineDate',
          label:'测试截止日期',
          width:120,
          check:true,
        },
        {
          prop:'signingDate',
          label:'签约日期',
          width:120,
          check:true,
        },
        {
          prop:'commercialTransferDate',
          label:'商用日期',
          width:120,
          check:true,
        },
        {
          prop:'checkStatusStr',
          label:'认证状态',
          width:100,
          check:true,
        },
        {
          prop:'accountStatusStr',
          label:'账户状态',
          width:100,
          check:true,
        },
        {
          prop:'commercialStatusStr',
          label:'商用状态',
          width:100,
          check:true,
        },
      ],
      searchCont:null,//搜索内容
      tableData:[],
      accountDrawerTitle:'',//新增修改账号抽屉标题
      accountDrawer:false,//是否显示账户抽屉
      // changeToast:false,//更改配置弹窗
      industryList: [],//行业列表
      provinceList:[],//省份列表
      belongSalesList:[],//所属销售列表 
      belongDeptList:[],//所属部门列表
      accountTypeList:[
        {
          id:1,
          value:'WEB'
        },
        {
          id:2,
          value:'接口'
        },
        {
          id:3,
          value:'透传'
        }
      ],//账号类型列表
      commercialStatusList:[
        {
          id:1,
          value:'测试'
        },
        {
          id:2,
          value:'商用'
        }
      ], //商用状态列表
      potentialList:[
        {
          id:1,
          value:'小微'
        },
        {
          id:2,
          value:'核心'
        },
        {
          id:3,
          value:'价值'
        },
        {
          id:4,
          value:'战略'
        }
      ],//潜力等级列表
      accountForm:{
        id:null,
        enterpriseName:'',//公司名称
        industry:'',//行业
        contacts: '',//联系人
        account:'', //账号
        phone: '',//联系电话
        email: '',//邮箱
        accountType:null, //账户类型
        provice:null,//所属地区 
        belongSales:null,//所属销售 
        belongDept:null,//所属部门 
        commercialStatus:null,//商用状态
        potential:null,//潜力等级
        password: '',//密码
        password2:'',//确认密码
      },//账号表单数据
      accountRules: {
        accountType:[{ required:true, message: '账号类型不能为空', trigger: "change"}],
        enterpriseName:[
          { required: true, message: "公司名称不能为空", trigger: "blur" },
          { max: 30, message: "名称不超过30个字", trigger: "blur" },
        ],
        provice:[{ required:true, message: '所属地区不能为空', trigger: "change"}],
        email:[
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
        ],
        contacts:[
          {required:true, message: "联系人不能为空", trigger: "blur" },
          { max: 10, message: "长度不超过10个字", trigger: "blur" }
        ],
        phone:[
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          { type: 'number', message: '联系电话格式不正确', trigger: 'blur'}
        ],
        industry:[{ required: true, message: "所属行业不能为空", trigger: "change" }],
        account:[{ required: true,validator: validateAccount, trigger: "blur" }],
        belongSales:[{ required:true, message: '所属销售不能为空', trigger: "change"}],
        belongDept:[{ required:true, message: '所属部门不能为空', trigger: "change"}],
        commercialStatus:[{ required:true, message: '商用状态不能为空', trigger: "change"}],
        password:[{ required: true,validator: validatePassword, trigger: "blur" }],
        password2:[{ required: true,validator: validatePassword2, trigger: "blur" }]
      },//账号表单验证规则
      resetPasswordForm:{
        id:null,
        account:null,
        password:'',
        password2:''
      },//重置密码表单
      resetPasswordRules:{
        password:[{ required: true,validator: validatePassword, trigger: "blur" }],
        password2:[{ required: true,validator: validatePassword3, trigger: "blur" }]
      },//重置密码表单规则验证
      testForm:{
        id:null,
        enterpriseName:null,
        signingTime:null,
        dealyTime:null
      },//商用延期表单
      testRules:{
        enterpriseName:[{ required: true }],
        signingTime:[{ required: true,message: '签约日期不能为空', trigger: "change"}],
        dealyTime:[{ required: true,message: '延期时长不能为空', trigger: "change"}],
      },
      dealyTimeList:[
        {
          id:0,
          value:'7天'
        },
        {
          id:1,
          value:'30天'
        }
      ],
      // activeName:'enterprise',
      selectData:[],//表格选择的数据
      configureData:null,//需要变更账号配置数据
      isChangeToast:false,//是否加载更改配置组件
      disabledAccount:false,//是否禁用账号输入框
      resetToast:false,//是否显示重置密码弹窗
      testToast:false,//是否显示商用/延期弹窗
      testToastTitle:null,//商用/延期弹窗标题
      isDisable:true,//是否禁用头部按钮
      addAccountBtn:false,//创建账户按钮
      delayBtn:false, //延期按钮
      commercialBtn:false,//商用按钮
      tableHeight:window.innerHeight - 310 +'',
      timer: null,
      headers : {Authorization:getCookie('enterprisePass')},
    };
  },
  methods: {
    // 获取账户列表数据
    getDataList(){
      this.loading = true
      let params ={
        name: this.searchCont,
        status: this.accountStatus,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      enterpriseAccountList(params,this.headers).then(res=>{
        this.loading = false
        if(res.status == 0){
          res.data.records.map(item=>{
            if(item.enterpriseInfo.businessLicense){
              item.enterpriseInfo.businessLicense = item.enterpriseInfo.businessLicense.split(",")
            }
            item.topProductTypeList = null
            item.financeInfo = null
            item.bottomProductTypeSelectedList = null
            item.baseCostList = null
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
    // 获取表头数据
    getTableHeader(){
      getCustomList({mouldCode:'businessAccount'},this.headers).then(res=>{
        if(res.status == 0){
          this.getDataList()
          if(res.data !== null){
            this.formHeaderList = JSON.parse(res.data)
          }
          this.checkList = []
          this.formHeaderList.map(item=>{
            if(item.check){
              this.checkList.push(item.prop)
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
          this.$message.error({
            message:err,
            center:true,
          })
      })
    },
    // 获取行业列表
    industryType(){
      let params =['industryType','province']
      getIndustryTypeList(params,this.headers).then(res=>{
        if(res.status == 0){
          this.industryList = res.data.industryType
          this.provinceList = res.data.province
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
    // 获取销售人员及关联部门
    getBelong(){
      getBelongInfo({},this.headers).then(res=>{
        if(res.status == 0){
          this.accountForm.belongDept = res.data.belongDeptName
          this.accountForm.belongSales = res.data.belongSalesName
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
    // 选择表头
    handleCheckedFormHeader(val){
      this.checkList = val
    },
    // 关闭触发下拉框
    changeDropdown(val){
      if(!val){
        this.formHeaderList.map(item=>{
          item.check = false
        })
        this.checkList.map(item=>{
          this.formHeaderList.map(item2=>{
            if(item2.prop === item){
              item2.check = true
            }
          })
        })
        let params = {
          listJson: JSON.stringify(this.formHeaderList),
          moduleCode: 'businessAccount'
        }
        saveCustomList(params,this.headers).then(res=>{
          if(res.status == 0){
            this.$message.success({
              message:'保存成功',
              center:true
            })
            this.getTableHeader()
          }else{
            this.$message.error({
              message:'保存失败',
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
    },
    // 刷新
    refresh(){
      this.getDataList()
    },
    // 重置清空
    reset(){
      this.currentPage = 1 
      this.pageSize = 10
      this.accountStatus = null
      this.searchCont= null
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
    // 表格展开时获取对应的账户信息
    handleExpand(row,expandedRows){
      enterpriseAccountDetail({id:row.id},this.headers).then(res=>{
        if(res.status == 0){
          this.tableData.map(item=>{
            if(item.id === row.id){
              item.baseCostList = res.data.baseCostList
              res.data.bottomProductTypeSelectedList = res.data.bottomProductTypeSelectedList ? res.data.bottomProductTypeSelectedList :[]
              let newbottomBusinessSelectedList= res.data.bottomProductTypeSelectedList.filter(item=>{
                return item.productTypeChecked
              }) 
              newbottomBusinessSelectedList.map(item=>{
                let newBusinessTypeList = item.businessTypeList.filter(item2=>{
                  return item2.businessTypeChecked
                })
                item.businessTypeList = newBusinessTypeList
              })

              item.bottomProductTypeSelectedList = newbottomBusinessSelectedList.length > 0 ?newbottomBusinessSelectedList:null
              item.financeInfo = res.data.financeInfo
              item.topProductTypeList = res.data.topProductTypeList
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
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    // 获取对应的账户信息
    // getAccountInfo(tab){
    //   console.log(tab.label)
    //   if(tab.label === '基本信息'){
    //     enterpriseAccountDetail({id:tab.$attrs['id']},this.headers).then(res=>{
    //       if(res.status == 0){
    //         this.tableData[tab.$attrs['index']].baseCostList = res.data.baseCostList
    //         let newbottomBusinessSelectedList= res.data.bottomBusinessSelectedList.filter(item=>{
    //           return item.productTypeChecked
    //         })
    //         this.tableData[tab.$attrs['index']].bottomBusinessSelectedList = newbottomBusinessSelectedList.length > 0 ?newbottomBusinessSelectedList:null
    //         this.tableData[tab.$attrs['index']].financeInfo = res.data.financeInfo
    //         this.tableData[tab.$attrs['index']].topBusinessList = res.data.topBusinessList
    //       }else{
    //         this.$message({
    //           message:res.message,
    //           center:true,
    //           type:res.status === 2 ? 'warning':'error'
    //         })
    //       }
    //     }).catch(err=>{
    //       this.$message.error({
    //         message:err,
    //         center:true
    //       })
    //     })
    //   }
    // },
    
    // 创建账号
    createAccount(){
      this.accountDrawerTitle = '创建账户'
      this.disabledAccount = false
      this.accountForm.id = null
      this.accountForm.enterpriseName = ''
      this.accountForm.industry = ''
      this.accountForm.contacts =  ''
      this.accountForm.account = ''
      this.accountForm.phone =  ''
      this.accountForm.email =  ''
      this.accountForm.accountType = null
      this.accountForm.provice = null
      // this.accountForm.belongSales = null
      // this.accountForm.belongDept = null
      this.accountForm.commercialStatus = 1
      this.accountForm.potential = null
      this.accountForm.password =  ''
      this.accountForm.password2 = ''
      this.industryType()
      this.getBelong()
      this.accountDrawer = true
    },
    // 新增账号确认
    confirmAddAccount(){
      this.$refs.accountForm.validate((valid) => {
        if(valid){
          let salt = bcryptjs.genSaltSync(); //定义密码加密的计算强度，默认10
          let password = bcryptjs.hashSync(md5(this.accountForm.password), salt); //进行加密
          if (this.timer) {
            clearTimeout(this.timer);
          }
          let _this = this
          this.timer = setTimeout(function () {
            _this.timer = null;
            let params ={
              account: _this.accountForm.account,
              confirmPassword: password,
              email: _this.accountForm.email,
              enterpriseContact: _this.accountForm.contacts,
              enterpriseName: _this.accountForm.enterpriseName,
              industryType: _this.accountForm.industry,
              mobile:  _this.accountForm.phone,
              password: password,
              potentialLevel: _this.accountForm.potential,
              province: _this.accountForm.provice,
              type: _this.accountForm.accountType
            }
            addEnterpriseAccount(params,_this.headers).then(res=>{
              if(res.status == 0){
                _this.$message.success({
                  message:'创建账户成功',
                  center:true
                })
                _this.getDataList()
                _this.closeAccountDrawer()
              }else{
                _this.$message({
                  message:res.message,
                  center:true,
                  type:res.status === 2 ? 'warning':'error'
                })
              }
            }).catch(err=>{
              _this.$message.error({
                message:err,
                center:true
              })
            })

          }, 500);
        }
      });
    },
    // 编辑
    editAction(row){
      this.accountDrawerTitle = '修改账户'
      this.disabledAccount = true
      this.accountForm.id = row.id
      this.accountForm.enterpriseName = row.enterpriseName
      this.accountForm.industry = row.industryType
      this.accountForm.contacts =  row.enterpriseContact
      this.accountForm.account = row.account
      this.accountForm.phone =  row.mobile
      this.accountForm.email =  row.email
      this.accountForm.accountType = row.type
      this.accountForm.provice = row.province
      this.accountForm.belongSales = row.belongSalesName
      this.accountForm.belongDept = row.belongDeptName
      this.accountForm.commercialStatus = row.commercialStatus
      this.accountForm.potential = row.potentialLevel
      // this.accountForm.password =  row.password
      // this.accountForm.password2 = row.password
      this.industryType()
      // this.getBelong()
      this.accountDrawer = true
    },
    // 修改账号确认
    confirmEditAccount(){
      this.$refs.accountForm.validate((valid) => {
        if(valid){
          let params = {
            id: this.accountForm.id,
            email: this.accountForm.email,
            enterpriseContact: this.accountForm.contacts,
            enterpriseName: this.accountForm.enterpriseName,
            industryType: this.accountForm.industry,
            mobile: this.accountForm.phone,
            potentialLevel: this.accountForm.potential,
            province: this.accountForm.provice,
            type: this.accountForm.accountType
          }
          editEnterpriseAccount(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'账号修改成功',
                center:true
              })
              this.getDataList()
              this.closeAccountDrawer()
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
    // 变更配置
    changeConfigur(){
        enterpriseAccountDetail({id:this.selectData[0].id},this.headers).then(res=>{
          if(res.status == 0){
            let newbottomBusinessSelectedList= res.data.bottomProductTypeSelectedList.filter(item=>{
              return item.productTypeChecked
            })
            this.configureData = res.data
            this.configureData.bottomProductTypeSelectedList = newbottomBusinessSelectedList
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

      this.isChangeToast = true
    },
    // 停用
    stopUse(){
      let ids = []
      for(let i =0;i<this.selectData.length;i++){
        if(this.selectData[i].accountStatus !== 0 ){
          this.$message.error({
            message:'账户正常状态才可停用！',
            center:true
          })
          return
        }
        ids.push(this.selectData[i].id)
      }
      this.$confirm("确定停用所选账号么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          disableEnterpriseAccount(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'账号停用成功',
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
        })
        .catch(() => {
          console.log("取消");
        });
    }, 
    // 启用
    startUse(){
      let ids = []
      for(let i =0;i<this.selectData.length;i++){
        if(this.selectData[i].accountStatus !== 1 ){
          this.$message.error({
            message:'账户停用状态才可启用！',
            center:true
          })
          return
        }
        ids.push(this.selectData[i].id)
      }
      this.$confirm("确定启用所选账号么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          enableEnterpriseAccount(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'账号启用成功',
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
        })
        .catch(() => {
          console.log("取消");
        });
    }, 
    // 解锁
    unlock(){
      let ids = []
      for(let i =0;i<this.selectData.length;i++){
        if(this.selectData[i].accountStatus !== 2 ){
          this.$message.error({
            message:'账户锁住状态才可解锁！',
            center:true
          })
          return
        }
        ids.push(this.selectData[i].id)
      }
      this.$confirm("确定解锁所选账号么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          unlockEnterpriseAccount(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'账号解锁成功',
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
        })
        .catch(() => {
          console.log("取消");
        });
    }, 
    // 删除
    deleteAction(type,row){
      let ids =[]
      if(type == 1 ){
        row.map(item=>{
          ids.push(item.id)
        })
      }else{
        ids.push(row.id)
      }
      this.$confirm("确定删除所选账号么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          deleteEnterpriseAccount(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'账号删除成功',
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
        })
        .catch(() => {
          console.log("取消");
        });
    },
    // 重置密码
    resetPassword(row){
      this.resetPasswordForm.id = row.id
      this.resetPasswordForm.account = row.account
      this.resetPasswordForm.password = ''
      this.resetPasswordForm.password2 = ''
      this.resetToast = true
    },
    // 重置密码确认
    confirmResetPassword(){
      this.$refs.resetPasswordForm.validate((valid)=>{
        if(valid){
          let salt = bcryptjs.genSaltSync(); //定义密码加密的计算强度，默认10
          let password = bcryptjs.hashSync(md5(this.resetPasswordForm.password), salt); //进行加密
          let params ={
            id: this.resetPasswordForm.id,
            confirmNewPassword: password,
            newPassword: password
          }
          resetPassword(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'密码重置成功',
                center:true
              })
              this.closeResetToast()
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
      })
    },
    // 延期
    delayAction(row){
      this.testToastTitle = '测试延期'
      this.testForm.enterpriseName = row.enterpriseName
      this.testForm.dealyTime = null
      this.testForm.id = row.id
      this.testToast = true
    },
    // 确认延期
    confirmDealy(){
      this.$refs.testForm.validate(valid=>{
        if(valid){
          let params = {
            delayTimeId: this.testForm.dealyTime,
            ids: this.testForm.id
          }
          testDelay(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'操作成功',
                center:true
              })
              this.closeTestoast()
              this.getDataList()
            }else{
              this.$message({
                message:'操作失败',
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
      })
    },
    // 商用
    commercialAction(row){
      this.$confirm("企业转商用会将当前企业下所有待审核、定时发送批次处理为“审核拒绝”及“取消”，确认是否转商用?", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          this.testToastTitle = '测试转商用'
          this.testForm.enterpriseName = row.enterpriseName
          this.testForm.signingTime = null
          this.testForm.id = row.id
          this.testToast = true
        })
        .catch(() => {
          // console.log("取消");
        });
    },
    // 确认商用
    confirmCommercial(){
      this.$refs.testForm.validate(valid=>{
        if(valid){
          let params = {
            ids: this.testForm.id,
            signingDate: this.testForm.signingTime
          }
          testTransferBusiness(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'操作成功',
                center:true
              })
              this.closeTestoast()
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
      })

    },
    closeChange(value){
      this.isChangeToast = !value
    },
    // 更改配置成功后刷新数据
    changeSuccessRefresh(){
      this.getDataList()
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
    // 关闭新增/编辑账号抽屉前重置表单规则
    closeAccountDrawer(){
      this.$nextTick(()=>{
        this.$refs.accountForm.resetFields();
        this.accountDrawer = false
      })  
    },
    // 关闭重置密码弹窗清除表单规则
    closeResetToast(){
      this.$nextTick(()=>{
        this.$refs.resetPasswordForm.resetFields();
        this.resetToast = false
      })  
    },
    // 清除商用延期规则
    closeTestoast(){
      this.$nextTick(()=>{
        this.$refs.testForm.resetFields();
        this.testToast = false
      })  
    },
  },
  watch: {
    authorityBttonList:{
      handler(data) {
        let btns = getButtonList(data,'/businessAccount')
        if(btns){
          btns.map(item=>{
            if(item.code == "enterpriseAccountTestDelay") this.delayBtn = true
            if(item.code == "enterpriseAccountTestTransferBusiness") this.commercialBtn = true
          })
        }
      },
      immediate: true,
      deep: true,
    }

  },
  mounted() {
    // this.getDataList()
    this.getTableHeader()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },

};
</script>

<style lang="less" scoped>
#businessAccount{
  width: 100%;
  height: 100%;
  background-color: #fff;
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
    .accountInfo{
      .el-form-item{
        .financeInfo{
          text-align: center;
          line-height: 23px;
          td{
            padding-left: 10px;
            width: 200px;
          }
          // float: left;
          // width: 600px;
          // background-color: #fff;
          // border: 1px solid #E5E5E5;
          // span{
          //   float: left;
          //   margin-left: 17px;
          //   line-height:40px ;
          //   display: block;
          // }
        }
        /deep/ .el-form-item__content{
          width: 600px;
          float: left;
        }
      }
      .business{
        /deep/ .el-tabs--top{
          .tabBox{
            display: flex;
            .tabBoxTitle{
              width: 70px;
            }
            .tabBoxCon{
              display: block;
            }
          }
        }
      }
    }
  }
}
#businessAccount /deep/ .el-dialog__footer {
  text-align: center ;
}
#businessAccount /deep/ .el-dialog__body {
  padding: 20px 40px 10px;
}
.demo-table-expand /deep/ .el-form-item{
  margin-bottom: 20px;
}
.resetPassword .el-dialog__body {
  padding: 20px 40px 10px;
  .el-input {
    width: 260px;
    margin-left: 0;
  }
}
.el-dropdown-menu{
  width: 160px;
  left: 288px !important;
  /deep/.popper__arrow{
    display: none !important;
  }
  .el-checkbox{
    display: block;
    margin-left: 20px;
    line-height: 32px;
  }
  .el-checkbox-group{
    height: 450px;
    overflow: auto;
  }
}
</style>