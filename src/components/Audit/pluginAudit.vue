<template>
  <div id="pluginAudit" v-loading="loading"  element-loading-text="loading">
    <div class="title">插件审核</div>
    <el-tabs v-model="productType" class="tab" @tab-click="handleClick">
      <el-tab-pane v-for="item in productList" :key="item.id" :label="item.name" :name="''+item.id">
        <div class="headerBtn" v-if="item.id == productType">
          <div class="headerBtnLeft">
            <el-button class="addBtn" type="primary" size="small"  @click="refresh">
              <i class="iconfont iconshuaxin"></i>
            </el-button>
            <el-button class="addBtn" type="primary" size="small"  @click="reset">
              <i class="iconfont iconguanbi"></i>
            </el-button>
            <el-select v-model="status" :ref="productType + item.name" @change="changeStatus"  @visible-change="isShowSelectOptions" clearable size="small" placeholder="状态">
              <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
              >
              </el-option>
            </el-select>
            <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="客户名称">
              <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
            </div>
            <div class="headerBtnRight">
              <el-button v-has="'pluginAuditPlugOpen'"  type="primary" v-if="productType == 1" size="small"   @click="openAction">
                <i class="iconfont iconxinzeng"></i>
                开通
              </el-button>
            </div>
        </div>
        <el-table
          border
          class="table"
          :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
          size="small"
          :data="tableData"
          @expand-change="handleExpand"
          :style="{'color':'#333','min-height':tableHeight + 'px'}"
        >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-collapse :value="activeNames" >
                  <el-collapse-item title="客户信息"  name="1" v-if="props.row.customerInfo">
                    <div class="separate">
                      <div class="cont">
                        <span class="lable">状态：</span>
                        <span v-show="props.row.customerInfo.plugStatus===0">审核中</span>
                        <span v-show="props.row.customerInfo.plugStatus===1">审核通过</span>
                        <span v-show="props.row.customerInfo.plugStatus===2">审核不通过</span>
                        <span v-show="props.row.customerInfo.plugStatus===22">运营商审核中</span>
                        <span v-show="props.row.customerInfo.plugStatus===11">运营商新增审核不通过</span>
                        <span v-show="props.row.customerInfo.plugStatus===12">运营商变更审核不通过</span>
                        <span v-show="props.row.customerInfo.plugStatus===30">正常</span>
                        <span v-show="props.row.customerInfo.plugStatus===40">停用</span>
                      </div>
                      <div class="cont"><span class="lable">更新时间：</span>{{props.row.customerInfo.updateTime}}</div>
                    </div>
                    <div class="separate">
                      <div class="cont"><span class="lable">客户账号：</span>{{props.row.customerInfo.customerAccount}}</div>
                      <div class="cont"><span class="lable">客户名称：</span>{{props.row.customerInfo.customerName}}</div>
                    </div>
                    <div v-if="productType == 1"><span class="lable">EC ID:</span>{{props.row.customerInfo.belongAgentCode}}</div>
                    <div class="separate">
                      <div class="cont"><span class="lable">客户联系人：</span>{{props.row.customerInfo.customerContactPerson}}</div>
                      <div class="cont"><span class="lable">联系人手机：</span>{{props.row.customerInfo.contactPersonPhone}}</div>
                    </div>
                    <div class="separate">
                      <div class="cont"><span class="lable">联系人邮箱：</span>{{props.row.customerInfo.contactPersonEmail}}</div>
                      <div class="cont"><span class="lable">归属区域：</span>{{props.row.customerInfo.provinceStr}}-{{props.row.customerInfo.cityStr}}</div>
                    </div>
                    <div>
                      <div class="cont" v-if="productType == 1"><span class="lable">归属代理商：</span>{{props.row.customerInfo.belongAgentName}}</div>
                      <!-- <div class="cont" v-if="productType == 1 ||productType == 2 || productType == 3">
                        <span class="lable"></span>
                        <span>{{props.row.customerInfo.customerFileName}}</span>
                        <span class="download" @click="downloadAction(props.row.customerInfo.customerFileUrl,props.row.customerInfo.customerFileName)" v-show="props.row.customerInfo.customerFileName">下载</span>
                      </div> -->
                    </div>
                    <div style="display:flex" v-if="productType == 1 ||productType == 2 || productType == 3">
                      <span class="lable">附件：</span>
                      <span>{{props.row.customerInfo.customerFileName}}</span>
                      <span class="download" @click="downloadAction(props.row.customerInfo.customerFileUrl,props.row.customerInfo.customerFileName)" v-if="props.row.customerInfo.customerFileName">下载</span>
                    </div>
                    <div><span class="lable">行业类型：</span>{{props.row.customerInfo.industryTypeStr}}</div>
                    <div><span class="lable">备注：</span>{{props.row.customerInfo.remarkText}}</div>
                  </el-collapse-item>
                  <el-collapse-item title="合同信息"  name="2" v-if="props.row.contactInfo">
                    <div class="separate">
                      <div class="cont"><span class="lable">合同编号：</span>{{props.row.contactInfo.contractCode}}</div>
                      <div class="cont"><span class="lable">合同名称：</span>{{props.row.contactInfo.contractName}}</div>
                    </div>
                    <div class="separate">
                      <div class="cont"><span class="lable">合同生效日期：</span>{{props.row.contactInfo.contractValidDate}}</div>
                      <div class="cont"><span class="lable">合同失效日期：</span>{{props.row.contactInfo.contractInvalidDate}}</div>
                    </div>
                    <div class="separate">
                      <div class="cont">
                        <span class="lable">合同是否自动续签：</span>
                        <span v-show="props.row.contactInfo.isRenewed == 1">是</span>
                        <span v-show="props.row.contactInfo.isRenewed == 0">否</span>
                      </div>
                      <div class="cont"><span class="lable">合同续签日期：</span>{{props.row.contactInfo.contractRenewDate}}</div>
                    </div>
                    <div style="display:flex">
                      <span class="lable">合同电子扫描件：</span>
                      <span>{{props.row.contactInfo.contactFileName}}</span>
                      <span class="download" @click="downloadAction(props.row.contactInfo.contractFileUrl,props.row.contactInfo.contactFileName)" v-if="props.row.contactInfo.contactFileName">下载</span>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="操作详情"  name="3" v-if="props.row.reviewInfoList">
                    <el-table
                      border
                      :header-cell-style="{background:'#F5F7FA',color:'#333333',lineHeight:'20px'}"
                      size="small"
                      :data="props.row.reviewInfoList"
                    >
                      <el-table-column prop="createTime" label="操作时间" width="160" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="operator" label="操作人" width="160" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="operatorType" label="操作类型" width="160" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="operatorResult" label="操作结果" width="160" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="suggestion" label="意见" min-width="140" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </el-collapse-item>
                </el-collapse>
              </template>
            </el-table-column>
            <el-table-column type="selection" align="center" width="50"></el-table-column>
            <el-table-column prop="customerAccount" label="客户账号" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerName" label="客户名称" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerContactPerson" label="客户联系人" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="开通时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="状态" width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-show="scope.row.plugStatus===0">审核中</span>
                <span v-show="scope.row.plugStatus===1">审核通过</span>
                <span v-show="scope.row.plugStatus===2">审核不通过</span>
                <span v-show="scope.row.plugStatus===22">运营商审核中</span>
                <span v-show="scope.row.plugStatus===11">运营商新增审核不通过</span>
                <span v-show="scope.row.plugStatus===12">运营商变更审核不通过</span>
                <span v-show="scope.row.plugStatus===30">正常</span>
                <span v-show="scope.row.plugStatus===40">停用</span>
              </template>
            </el-table-column>
            <el-table-column  label="操作" min-width="110" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="operation" v-has="'pluginAuditAgreeOrDisAgree'" v-show="scope.row.plugStatus === 0" @click="auditAction(scope.row,1)">通过</span>
                <span class="operation" v-has="'pluginAuditAgreeOrDisAgree'" v-show="scope.row.plugStatus === 0" @click="refuseAction(scope.row)">不通过</span>
                <span class="operation" v-has="'pluginAuditServiceCodeList'" v-show="scope.row.plugStatus === 30 && productType == 1" @click="serviceCodeAction(scope.row)">分配服务代码</span>
                <span class="operation" v-has="'pluginAuditStop'" v-show="scope.row.plugStatus === 30" @click="stopUse(scope.row)">停用</span>
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
      </el-tab-pane>
    </el-tabs>
    <!-- 插件开通 -->
    <el-drawer
    title="开通RCS消息"
    :visible.sync="pluginDrawer"
    :before-close="closePluginDrawer"
    :modal-append-to-body="true"
    :wrapperClosable="false"
    size="500px"
    class="collapseDrawer"
    direction="rtl">
      <el-form
        class="drawerContent"
        ref="rcsPluginForm"
        :model="rcsPluginForm"
        :rules="rcsPluginRules"
        label-width="155px"
        label-position="right"
        :validate-on-rule-change="false"
      >
        <el-collapse v-model="drawerActive" >
          <el-collapse-item title="基本信息" name="baseInfo">
            <el-form-item prop="customerName" label="客户名称：">
              <el-select v-model="rcsPluginForm.customerName" @change="changeCustomer" filterable clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in customerList"
                  :key="item.id"
                  :label="item.value"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="customerContact" label="客户联系人：">
              <el-input size="small" maxlength="50" v-model="rcsPluginForm.customerContact"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="联系人手机：">
              <el-input size="small"  v-model="rcsPluginForm.mobile"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="联系人邮箱：">
              <el-input size="small" show-word-limit v-model="rcsPluginForm.email"></el-input>
            </el-form-item>
            <el-form-item prop="belongArea" label="归属区域：">
                <el-cascader
                  v-model="rcsPluginForm.belongArea"
                  :options="belongAreaList"
                  size="small"
                  :props="defaultParams"
                  :show-all-levels="true"
                  clearCheckedNodes
                  clearable
                  ref="cascaderHandle"
                  @change="closeDepartment"
                ></el-cascader>
            </el-form-item>
            <el-form-item prop="belongAgent" label="归属代理商：">
              <el-select v-model="rcsPluginForm.belongAgent" value-key="belongAgentCode" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in belongAgentList"
                  :key="item.belongAgentCode"
                  :label="item.belongAgentName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="industry" label="行业类型：">
              <el-select v-model="rcsPluginForm.industry" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="(item,index) in industryList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="fileAddress" label="附件：">
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="uploadPictures"
                :before-upload="beforeAvatarUpload"
                :limit="1"
                :file-list="fileList"
                :on-remove="handleRemove"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">您可上传的文件类型：pdf、doc、docx、xls、xlsx、ppt、pptx、jpg、jpeg、gif、rar、7z、zip,单个附件大小限100K,限上传1个文件</div>
              </el-upload>
            </el-form-item>
            <el-form-item prop="remark" label="备注：">
              <el-input
                class="limitWord"
                type="textarea"
                placeholder="请输入"
                maxlength="200"
                :autosize="{ minRows: 4, maxRows: 6 }"
                show-word-limit
                v-model="rcsPluginForm.remark"
              ></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="合同信息" name="contractInfo">
            <el-form-item prop="contractCode" label="合同编码：">
              <el-input class="limitWord" size="small" maxlength="20" show-word-limit v-model="rcsPluginForm.contractCode"></el-input>
            </el-form-item>
            <el-form-item prop="contractName" label="合同名称：">
              <el-input class="limitWord" size="small" maxlength="20" show-word-limit v-model="rcsPluginForm.contractName"></el-input>
            </el-form-item>
            <el-form-item prop="effectiveDate" label="合同生效日期：">
              <el-date-picker
                v-model="rcsPluginForm.effectiveDate"
                value-format="yyyy-MM-dd"
                size="small"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="expiryDate" label="合同失效日期：">
              <el-date-picker
                v-model="rcsPluginForm.expiryDate"
                value-format="yyyy-MM-dd"
                size="small"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="isRenewal" label="合同是否自动续约：">
              <el-radio-group v-model="rcsPluginForm.isRenewal">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="rcsPluginForm.isRenewal !==0 " prop="renewalDate" label="合同续签日期：">
              <el-date-picker
                v-model="rcsPluginForm.renewalDate"
                value-format="yyyy-MM-dd"
                size="small"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="contractFileAddress" label="合同电子扫描件：">
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="uploadPictures2"
                :before-upload="beforeAvatarUpload2"
                :limit="1"
                :file-list="fileList"
                :on-remove="handleRemove2"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">可上传的文件类型：pdf、doc、jpg、jpeg、gif、docx、rar,单个附件大小限10M,限上传1个文件</div>
              </el-upload>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
        <el-form-item >
          <el-button  type="primary" size="small" @click="submitAction" :disabled="isSubmit">提交</el-button>
          <el-button  size="small" @click="closePluginDrawer">取消</el-button>
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
        ref="refuseForm"
        :model="refuseForm"
        :rules="refuseFormRules">
        <el-form-item prop="refuseReason">
          <el-input
            type="textarea"
            placeholder="在此输入审核拒绝的原因"
            maxlength="200"
            :autosize="{ minRows: 8, maxRows: 10 }"
            show-word-limit
            v-model="refuseForm.refuseReason"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="confirmRefuse">发 送</el-button>
        <el-button @click="refuseToast = false" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 分配服务代码弹窗 -->
    <el-dialog
      title="分配服务代码"
      class="serviceCode"
      :visible.sync="serviceCodeToast"
      :close-on-click-modal="false"
      width="800px"
    >
      <div>
        <div class="bodyHeaderLeft" style="margin-bottom:20px">
          <span >客户名称：{{seletCustomer}}</span>
        </div>
        <el-table
          border
          :header-cell-style="{background: '#F5F7FA',color: '#333333',lineHeight: '20px'}"
          size="small"
          :data="serviceCodeData"
          style="width:770px"
          height="380"
        >
          <el-table-column prop="serviceCode" label="服务代码" width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select clearable v-model="scope.row.serviceCode" :disabled="scope.row.disabled" size="small">
                <el-option
                  v-for="item in belongAgentList"
                  :key="item.serviceCode"
                  :label="item.serviceCode"
                  :value="item.serviceCode"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="extCode" label="扩展码" width="170" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input class="limitWord" size="small" show-word-limit :maxlength="20 - scope.row.serviceCode.length" v-model="scope.row.extCode" :disabled="scope.row.disabled || !(scope.row.serviceCode)" oninput="value=value.replace(/[^\d]/g,'')"  @blur="scope.row.extCode = $event.target.value"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="分配时间" width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bindChatbotNum" label="关联Chatbot" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column min-width="100" >
            <template slot="header" slot-scope="scope">
              <div style="display:flex;align-item:center">
                <span>操作</span>
                <img @click="addserviceCode" style="margin-left:5px;cursor:pointer" src="../../assets/images/increase_icon.svg"  />
              </div>
            </template>
            <template slot-scope="scope">
              <span class="operation" v-if="scope.row.disabled" @click="recycleService(scope.row)">回收</span>
              <span class="operation" v-else><span @click="!isSubmit2 ? submitService(scope.row) :'' ">提交</span> | <span @click="cancelService(scope.row,scope.$index)">取消</span></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import {getPluginList,addPulgin,pluginDetail,stopPulgin,auditPlugin,getCustomerList,getAgentList,getCustomerDetail,uploadFile,getServiceCodeList,distributeServiceCode,recycleServiceCode} from '../../api/audit/api'
import {download,comparisonTime,regexpMobile} from '../../public'
import {industryTypeList} from '../../industry'
import {area2} from '../../area'

export default {
  name: "pluginAudit",
  data() {
    // 联系电话验证规则
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("联系人手机不能为空"));
      } else if (!regexpMobile(value)) {
        callback(new Error("联系人手机格式不正确"));
      } else {
        callback();
      }
    };
    return {
      loading:false,
      productType:'1',
      productList:[
        {
          id:1,
          name:'RCS消息'
        },
        {
          id:2,
          name:'SMS短信'
        },
        {
          id:3,
          name:'MMS短信'
        },
        {
          id:4,
          name:'自动回复'
        },
        {
          id:5,
          name:'自定义菜单'
        },
        {
          id:6,
          name:'聊天机器人'
        },
      ],//产品列表
      status:null,
      searchCont:null,
      statusList:[
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
        },
        {
          id:22,
          value:'运营商审核中'
        },
        {
          id:11,
          value:'运营商新增审核不通过'
        },
        {
          id:12,
          value:'运营商变更审核不通过'
        },
        {
          id:30,
          value:'正常'
        },
        {
          id:40,
          value:'停用'
        },
      ],//状态列表
      tableData:[],
      activeNames:["1"],
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      selectTab:'RCS消息',
      pluginDrawer:false,//开通rcs消息抽屉
      rcsPluginForm:{
        customerName:null, //客户名称
        customerContact:null,//客户联系人
        mobile:null,//联系人手机
        email:null, //联系人邮箱
        belongArea:null,//归属区域
        belongAgent:null,//归属代理商
        industry:null, //行业类型
        fileAddress:null,//附件地址
        fileName:null,//附件名字
        fileCode:null,//附件code
        remark:null,//备注
        contractCode:null,//合同编码
        contractName:null,//合同名称
        effectiveDate:null,//合同生效日期
        expiryDate:null,//合同失效日期
        isRenewal:1,//合同是否自动续约
        renewalDate:null,//合同续约日期
        contractFileAddress:null,//合同电子扫描件地址
        contractFileCode:null,//合同电子扫描件code
        contractFileName:null//合同电子扫描件名字
      },//rcs插件表单
      rcsPluginRules:{
        customerName:[{ required: true, message: "客户名称不能为空", trigger: "change" }],
        customerContact:[{ required: true, message: "客户联系人不能为空", trigger: "blur" }],
        mobile:[{ required: true, validator: validatePhone, trigger: "blur" }],
        email:[{type:'email',  message: "邮箱格式不正确", trigger: "blur" }],
        belongArea:[{ required: true, message: "归属区域不能为空", trigger: "change" }],
        belongAgent:[{ required: true, message: "归属代理商不能为空", trigger: "change" }],
        industry:[{ required: true, message: "行业类型不能为空", trigger: "change" }],
        fileAddress:[{ required: true, message: "附件不能为空", trigger: "change" }],
        contractCode:[{ required: true, message: "合同编码不能为空", trigger: "blur" }],
        contractName:[{ required: true, message: "合同名称不能为空", trigger: "blur" }],
        effectiveDate:[{ required: true, message: "合同生效日期不能为空", trigger: "change" }],
        expiryDate:[{ required: true, message: "合同失效日期不能为空", trigger: "change" }],
        isRenewal:[{ required: true, message: "合同是否续签不能为空", trigger: "change" }],
        renewalDate:[{ required: true, message: "合同续约日期不能为空", trigger: "change" }],
        contractFileAddress:[{ required: true, message: "合同电子扫描件不能为空", trigger: "change" }]
      },//rcs插件表单规则
      drawerActive:['baseInfo','contractInfo'],
      customerList:[],
      belongAreaList:area2,
      belongAgentList:[],
      industryList:industryTypeList,
      defaultParams: {
        label: "name",
        value: "code",
        children: "child",
        emitPath: true, //是否返回由该节点所在的各级菜单的值所组成的数组,设置 false，则只返回该节点的值
      },
      refuseToast:false,
      refuseForm: {
        id:null,
        refuseReason:'',//审核拒绝原因
      },
      refuseFormRules: {
        refuseReason: [{ required: true, message: "审核意见不能为空", trigger: "blur" }],
      },
      serviceCodeToast:false,//分配服务代码弹窗
      serviceCodeData:[],//分配服务代码表格数据
      seletCustomer:null,//要分配服务代码的客户名称
      seletCustomerNum:null,//要分配服务代码的客户编号
      serviceCodeList:[],//服务代码列表
      fileList:[],
      isSubmit:false,//是否禁用提交按钮
      isSubmit2:false,//是否禁用分配服务代码提交按钮
      timer: null,
      tableHeight:window.innerHeight - 369 +'',
    };
  },
  methods: {
    // 获取表格数据
    getDataList(){
      this.loading =true
      let params = {
        currentPage: this.currentPage,
        customerName: this.searchCont,
        plugStatus:this.status,
        pageSize: this.pageSize,
        type: parseInt(this.productType)
      }
      getPluginList(params).then(res=>{
        this.loading = false
        if(res.status == 0){
          res.data.records.map((item,index)=>{
            item.contactInfo = null
            item.customerInfo = null,
            item.reviewInfoList = null
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
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    // 选择tab
    handleClick(tab, event){
      this.selectTab = tab.label
      this.productType = tab.name
      this.currentPage =1
      this.pageSize = 10
      this.status = null
      this.searchCont= null
      this.tableData = []
      this.getDataList()
    },
    // 刷新
    refresh(){
      this.getDataList()
    },
    // 重置
    reset(){
      this.currentPage =1
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
    // 展开详情
    handleExpand(row,expandedRows){
      pluginDetail({id:row.id}).then(res=>{
        if(res.status == 0){
          this.tableData.map(item=>{
            if(item.id === row.id){
              item.contactInfo = res.data.contactInfo
              item.customerInfo = res.data.customerInfo,
              item.reviewInfoList = res.data.reviewInfoList
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
    // 开通
    openAction(){
      this.rcsPluginForm.customerName = null, //客户名称
      this.rcsPluginForm.customerContact = null,//客户联系人
      this.rcsPluginForm.mobile = null,//联系人手机
      this.rcsPluginForm.email = null, //联系人邮箱
      this.rcsPluginForm.belongArea = null,//归属区域
      this.rcsPluginForm.belongAgent = null,//归属代理商
      this.rcsPluginForm.industry = null, //行业类型
      this.rcsPluginForm.fileAddress = null,//附件地址
      this.rcsPluginForm.fileName = null,//附件名字
      this.rcsPluginForm.fileCode = null,//附件code
      this.rcsPluginForm.remark = null,//备注
      this.rcsPluginForm.contractCode = null,//合同编码
      this.rcsPluginForm.contractName = null,//合同名称
      this.rcsPluginForm.effectiveDate = null,//合同生效日期
      this.rcsPluginForm.expiryDate = null,//合同失效日期
      this.rcsPluginForm.isRenewal = 1,//合同是否自动续约
      this.rcsPluginForm.renewalDate = null,//合同续约日期
      this.rcsPluginForm.contractFileAddress = null,//合同电子扫描件地址
      this.rcsPluginForm.contractFileCode = null,//合同电子扫描件code
      this.rcsPluginForm.contractFileName = null//合同电子扫描件名字
      this.fileList =[]
      this.getCustomerData()
      this.getAgentData()
      this.pluginDrawer = true
    },
    // 获取客户列表
    getCustomerData(){
      getCustomerList().then(res=>{
        if(res.status == 0){
          this.customerList = res.data
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
    // 获取代理商列表
    getAgentData(){
      getAgentList().then(res=>{
        if(res.status == 0){
          this.belongAgentList = res.data
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
    // 审核插件
    auditAction(row,type){
      let params ={
        id:row.id,
        status:type,
        auditOpinion:row.refuseReason
      }
      auditPlugin(params).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'插件审核成功',
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
      this.refuseForm.refuseReason = null
      this.refuseForm.id = row.id
      this.refuseToast = true
    },
    // 审核拒绝确认
    confirmRefuse(){
      this.$refs.refuseForm.validate(valid=>{
        if(valid){
          this.auditAction(this.refuseForm,2)
          this.refuseToast = false
        }
      })

    },
    // 停用
    stopUse(row){
      let params ={
        id: row.id
      }
      this.$confirm("确定停用所选插件吗？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          stopPulgin(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'停用成功',
                center:true,
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
    // 开通rcs消息提交
    submitAction(){
      this.$refs.rcsPluginForm.validate(valid=>{
        if(valid){
          if(comparisonTime(this.rcsPluginForm.expiryDate,this.rcsPluginForm.effectiveDate)){
            this.$message.error({
              message:'合同失效日期应大于合同生效日期',
              center:true
            })
            return
          }
          if(this.rcsPluginForm.isRenewal === 1 && comparisonTime(this.rcsPluginForm.renewalDate,this.rcsPluginForm.expiryDate)){
            this.$message.error({
              message:'合同续约日期应大于合同失效日期',
              center:true
            })
            return
          }
          if (this.timer) {
            clearTimeout(this.timer);
          }
          let _this = this
          _this.isSubmit = true
          this.timer = setTimeout(function () {
            let params ={
              belongAgentCode: _this.rcsPluginForm.belongAgent.belongAgentCode,
              belongAgentName: _this.rcsPluginForm.belongAgent.belongAgentName,
              cityCode: _this.rcsPluginForm.belongArea[2],
              contactFileCode: _this.rcsPluginForm.contractFileCode,
              contactFileName: _this.rcsPluginForm.contractFileName,
              contractFileUrl: _this.rcsPluginForm.contractFileAddress,
              contactPersonEmail: _this.rcsPluginForm.email,
              contactPersonPhone: _this.rcsPluginForm.mobile,
              contractCode: _this.rcsPluginForm.contractCode,
              contractInvalidDate: _this.rcsPluginForm.expiryDate,
              contractName: _this.rcsPluginForm.contractName,
              contractRenewDate: _this.rcsPluginForm.renewalDate,
              contractValidDate: _this.rcsPluginForm.effectiveDate,
              customerContactPerson: _this.rcsPluginForm.customerContact,
              customerFileCode: _this.rcsPluginForm.fileCode,
              customerFileName: _this.rcsPluginForm.fileName,
              customerFileUrl: _this.rcsPluginForm.fileAddress ,
              customerName: _this.rcsPluginForm.customerName.value,
              enterpriseId: _this.rcsPluginForm.customerName.id,
              industryTypeCode: _this.rcsPluginForm.industry,
              isRenewed: _this.rcsPluginForm.isRenewal,
              provinceCode: _this.rcsPluginForm.belongArea[1],
              regionCode: _this.rcsPluginForm.belongArea[0],
              remarkText: _this.rcsPluginForm.remark,
              type:1
            }
            addPulgin(params).then(res=>{
              _this.isSubmit = false
              if(res.status == 0){
                _this.$message.success({
                  message:'插件开通成功',
                  center:true
                })
                _this.getDataList()
                _this.closePluginDrawer()
              }else{
                _this.isSubmit = false
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
      })
    },
    // 分配服务代码弹窗
    serviceCodeAction(row){
      this.serviceCodeToast = true
      this.seletCustomer= row.customerName
      this.seletCustomerNum= row.customerNum
      this.getServiceData(row.customerNum)
      this.getAgentData() //获取服务代码列表
    },
    // 获取服务代码表格数据
    getServiceData(customerNum){
      getServiceCodeList({customerNum:customerNum}).then(res=>{
        if(res.status == 0){
          if(res.data !== null){
            res.data.map(item=>{
              item.disabled = true
            })
          }
          this.serviceCodeData =res.data ? res.data :[]
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
    // 增加服务代码分配
    addserviceCode(){
      let obj = {
        serviceCode:'',
        extCode:null,
        disabled:false
      }
      this.serviceCodeData.push(obj)
    },
    // 分配服务代码提交
    submitService(row){
      if(row.extCode=== '' || row.extCode=== null || row.serviceCode === null || row.serviceCode ==='' ){
        this.$message.error({
          message:'服务代码或扩展码不能为空',
          center:true
        })
        return
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      let _this = this
      _this.isSubmit2 = true
      this.timer = setTimeout(function () {
        let params ={
          customerNum: _this.seletCustomerNum,
          extCode: row.extCode,
          serviceCode: row.serviceCode,
          type:1
        }
        distributeServiceCode(params).then(res=>{
          _this.isSubmit2 = false
          if(res.status == 0){
            _this.$message.success({
              message:'提交成功',
              center:true
            })
            _this.getServiceData(_this.seletCustomerNum)
          }else{
            _this.$message({
              message:res.message,
              center:true,
              type:res.status === 2 ? 'warning':'error'
            })
          }
        }).catch(err=>{
          _this.isSubmit2 = false
          _this.$message.error({
            message:err,
            center:true
          })
        })
      }, 500);
    },
    // 取消分配服务代码
    cancelService(row,index){
      this.serviceCodeData.splice(index,1)
    },
    // 回收服务代码
    recycleService(row){
      this.$confirm("确定回收该服务代码吗？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          recycleServiceCode({id:row.id}).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'回收成功',
                center:true,
              })
              this.getServiceData(this.seletCustomerNum)
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
        });
    },
    // 更改客户名称
    changeCustomer(val){
      if(val !== ''){
        let arr = []
        getCustomerDetail({id:val.id}).then(res=>{
          if(res.status == 0){
            this.rcsPluginForm.customerContact = res.data.customerContactPerson,//客户联系人
            this.rcsPluginForm.mobile = res.data.contactPersonPhone,//联系人手机
            this.rcsPluginForm.email = res.data.contactPersonEmail, //联系人邮箱
            arr.push(res.data.regionCode,res.data.provinceCode,res.data.cityCode)
            this.rcsPluginForm.belongArea = arr//归属区域
            this.rcsPluginForm.industry = parseInt(res.data.industryType) //行业类型
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
      }else{
        this.rcsPluginForm.customerContact = null,//客户联系人
        this.rcsPluginForm.mobile = null,//联系人手机
        this.rcsPluginForm.email = null, //联系人邮箱
        this.rcsPluginForm.belongArea = null//归属区域
        this.rcsPluginForm.industry = null //行业类型
      }
    },
    // 上传附件
    uploadPictures(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      uploadFile(formData).then((res) => {
        if (res.status == 0) {
          this.rcsPluginForm.fileAddress = res.data.url,//附件地址
          this.rcsPluginForm.fileName = res.data.fileName,//附件名字
          this.rcsPluginForm.fileCode = res.data.code,//附件code
          this.$refs.rcsPluginForm.clearValidate('fileAddress');
          this.$message({
            type: 'success',
            message: '上传成功!',
            center: true,
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true,
          })
        }
      })
    },
    // 上传附件
    beforeAvatarUpload(file) {
      let fileTYpe = file.name.substring(file.name.lastIndexOf('.')+1)
      const isJPG = (fileTYpe === 'pdf' || fileTYpe === 'doc' || fileTYpe === 'docx' || fileTYpe === 'xls' || fileTYpe === 'xlsx' || fileTYpe === 'ppt'  || fileTYpe === 'pptx' || fileTYpe === 'jpg'|| fileTYpe === 'jpeg'|| fileTYpe === 'gif' || fileTYpe === 'rar' || fileTYpe === '7z' || fileTYpe === 'zip')
      const isLt2M = file.size / 1024  < 100;
      if (!isJPG) {
        this.$message.error({
          message:'附件类型应为pdf、doc、docx、xls、xlsx、ppt、pptx、jpg、jpeg、gif、rar、7z、zip',
          center:true
        });
      }
      if (!isLt2M) {
        this.$message.error({
          message:'附件大小不能超过100K!',
          center:true
        });
      }
      return isJPG && isLt2M;
    },
    // 移除附件
    handleRemove(){
      this.rcsPluginForm.fileAddress = null,//附件地址
      this.rcsPluginForm.fileName = null,//附件名字
      this.rcsPluginForm.fileCode = null//附件code
      this.rcsPluginRules.fileAddress = [{ required: true, message: '附件不能为空', trigger: 'change'}]
    },
    // 限制上传附件的数量
    handleExceed(files, fileList){
      this.$message.error({
        message:'只能上传一个文件',
        center:true
      });
    },
    // 上传合同扫描件
    uploadPictures2(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      uploadFile(formData).then((res) => {
        if (res.status == 0) {
          this.rcsPluginForm.contractFileAddress = res.data.url,//合同电子扫描件地址
          this.rcsPluginForm.contractFileCode = res.data.code,//合同电子扫描件code
          this.rcsPluginForm.contractFileName = res.data.fileName//合同电子扫描件名字
          this.$refs.rcsPluginForm.clearValidate('contractFileAddress');
          this.$message({
            type: 'success',
            message: '上传成功!',
            center: true,
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true,
          })
        }
      })
    },
    // 上传附件
    beforeAvatarUpload2(file) {
      let fileTYpe = file.name.substring(file.name.lastIndexOf('.')+1)
      const isJPG = (fileTYpe === 'pdf' || fileTYpe === 'doc'|| fileTYpe === 'jpg'|| fileTYpe === 'jpeg'|| fileTYpe === 'gif'|| fileTYpe === 'docx'|| fileTYpe === 'rar')
      const isLt2M = file.size / 1024 /1024 < 5;
      if (!isJPG) {
        this.$message.error({
          message:'附件类型应为pdf、doc、jpg、jpeg、gif、docx、rar',
          center:true
        });
      }
      if (!isLt2M) {
        this.$message.error({
          message:'文件不能超过 10M!',
          center:true
        });
      }
      return isJPG && isLt2M;
    },
    // 移除合同扫描件
    handleRemove2(file, fileList){
      this.rcsPluginForm.contractFileAddress = null,//合同电子扫描件地址
      this.rcsPluginForm.contractFileCode = null,//合同电子扫描件code
      this.rcsPluginForm.contractFileName = null//合同电子扫描件名字
      this.rcsPluginRules.contractFileAddress = [{ required: true, message: '合同电子扫描件不能为空', trigger: 'change'}]
    },
    // 下载附件
    downloadAction(url,fileName){
      download(url,fileName)
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
    // 关闭归属区域级联选择器
    closeDepartment(val){
      this.$refs.cascaderHandle.dropDownVisible = false
    },
    // 头部搜索下拉框选中后失焦防止回车触发下拉框
    isShowSelectOptions(isShowSelectOptions){
      if(!isShowSelectOptions) this.$refs[`${this.productType}`+`${this.selectTab}`][0].blur();
    },
    // 关闭抽屉前清除表单规则
    closePluginDrawer(){
      this.$nextTick(()=>{
        this.$refs.rcsPluginForm.resetFields();
        this.pluginDrawer = false
      })
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
#pluginAudit{
  width: 100%;
  height: 100%;
  color: #333;
  overflow: auto;
  letter-spacing: 0.75px;
  padding: 0 70px;
  .title {
    height: 26px;
    line-height: 26px;
    padding-top: 40px;
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
    }
    /deep/ .el-tabs__nav-prev{
      font-size: 18px;
      margin-top: -1px;
    }
    .headerBtn{
      margin-bottom: 30px;
      .el-input {
        width: 160px;
      }
      .el-input__inner{
        width: 160px;
      }
      /deep/ .el-input--suffix {
        width: 160px;
      }
    }
    .status{
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
#pluginAudit /deep/ .el-dialog__footer {
  text-align: center ;
}
#pluginAudit /deep/ .el-dialog__body {
  padding: 20px 40px 10px;
}
#pluginAudit /deep/ .el-tabs__header{
  margin-bottom: 30px;
}
#pluginAudit /deep/ .el-collapse-item__wrap{
  padding: 0 15px !important;
  .el-upload__tip {
    font-size: 12px;
    color: #999;
    line-height: 20px;
  }
}
#pluginAudit /deep/ .el-collapse{
  border: 0;
}

#pluginAudit /deep/ .el-collapse-item__wrap{
  border: 0;
  padding:0 67px;
}
#pluginAudit /deep/ .el-collapse-item__header{
  height: 38px;
  padding-left: 20px;
  position: relative;
  color: #333333;
  font-size: 14px;
}
.table /deep/ .el-collapse-item__wrap{
  background-color: #F8F8FA !important;
}
.table /deep/ .el-collapse-item__header{
  background-color: #F8F8FA !important;
}

#pluginAudit /deep/ .el-collapse-item__header .el-collapse-item__arrow{
  position: absolute;
  left: 0;
  font-size: 14px;
}
#pluginAudit /deep/ .el-collapse-item__content{
  margin-top: 25px;
}
#pluginAudit /deep/ .el-collapse-item__content {
  line-height: 36px;
  font-size: 14px;
  color: #333;
  .separate{
    display: flex;
  }
  .cont{
    display: flex;
    width: 50%;
    word-break: break-all
  }
  .lable{
    color: #666;
    display: inline-block;
    width: 145px;
    white-space: nowrap;
  }
  .download{
    white-space: nowrap;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    margin-left: 10px;
    color: #6767ff;
    cursor: pointer;
  }
}
#pluginAudit .serviceCode /deep/ .el-dialog__body {
  padding: 0 20px 10px !important;
}
.limitWord /deep/ .el-input__suffix{
  top: 0 !important;
  right: 1px;
}
.limitWord /deep/ .el-input__inner{
  padding-right: 46px !important;
}
.limitWord /deep/ .el-input__count{
  bottom: -20px;
  background-color: transparent;
}

</style>
