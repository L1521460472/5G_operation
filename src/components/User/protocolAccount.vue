<template>
  <div id="protocolAccount" v-loading="loading"  element-loading-text="loading">
    <div class="container">
      <div class="headerBtn">
        <div class="headerBtnLeft">
          <el-button   type="primary" size="small"  @click="refresh">
            <i class="iconfont iconshuaxin"></i>
          </el-button>
          <el-button  type="primary" size="small"  @click="reset">
            <i class="iconfont iconguanbi"></i>
          </el-button> 
          <el-select style="width:160px" ref="searchSelect" @change="changeProtocolType" v-model="protocolType" @visible-change="isShowSelectOptions" clearable size="small" placeholder="协议类型">
            <el-option
              v-for="item in protocolTypeList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-input class="search" style="width:160px" v-model="searchCont" size="small" maxlength="50" placeholder="企业名称">
            <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="headerBtnRight">
            <el-button  v-has="'protocolAccountAdd'" type="primary"  size="small"   @click="createAccount">
              <i class="iconfont iconxinzeng"></i>
              创建账户
            </el-button>
            <el-button  v-has="'protocolAccountEnabledOrDisable'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"  @click="forbidAction(1)">
              <i class="iconfont icontingyong"></i>
              禁用
            </el-button>
            <el-button v-has="'protocolAccountEnabledOrDisable'"  class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="enableAction(1)">
              <i class="iconfont iconzhuanweiqiyong"></i>
              启用
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
                <el-collapse :value="activeNames" >
                  <el-collapse-item title="基本信息"  name="1" >
                    <div class="separate">
                      <div class="cont"><span class="lable">状态：</span>{{props.row.status === 0 ? '禁用':'正常'}}</div>
                      <div class="cont"><span class="lable">更新时间：</span>{{props.row.updateTime}}</div>
                    </div>
                    <div class="separate">
                      <div class="cont"><span class="lable">名称：</span>{{props.row.name}}</div>
                      <div class="cont"><span class="lable">所属企业：</span>{{props.row.enterpriseName}}</div>
                    </div>
                    <div class="separate">
                      <div class="cont"><span class="lable">账号：</span>{{props.row.account}}</div>
                      <div class="cont"><span class="lable">密码：</span>{{props.row.password}}</div>
                    </div>
                    <div class="separate">
                      <div class="cont"><span class="lable">协议类型：</span>{{props.row.protocolTypeStr}}</div>
                      <div class="cont"><span class="lable">业务类型：</span>{{props.row.businessTypeStr}}</div>
                    </div>
                    <div class="separate">
                      <div class="cont"><span class="lable">链接数：</span>{{props.row.linkNumber}}</div>
                      <div class="cont"><span class="lable">发送速度：</span>{{props.row.sendSpeed}}</div>
                    </div>
                    <div class="separate">
                      <div class="cont"><span class="lable">网关IP：</span>{{props.row.gatewayIp}}</div>
                      <div class="cont"><span class="lable">网关端口号：</span>{{props.row.gatewayPort}}</div>
                    </div>
                    <div class="separate">
                      <div class="cont"><span class="lable">通道组：</span>{{props.row.channelGroupName}}</div>
                      <div class="cont"><span class="lable">接入号：</span>{{props.row.accessNumber}}</div>
                    </div>
                    <div><span class="lable">操作账号：</span>{{props.row.operator}}</div>
                    <div><span class="lable">备注：</span>{{props.row.remark}}</div>
                  </el-collapse-item>
                  <el-collapse-item title="通道信息"  name="2" >
                    <el-table
                      border
                      :header-cell-style="{background:'#F5F7FA',color:'#333333',lineHeight:'20px'}"
                      size="small"
                      :data="props.row.channelList"
                      style="width:800px"
                    > 
                      <el-table-column prop="serviceCode" label="服务代码" width="160" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="sendPhoneTypeStr" label="发送号码类型" width="100" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="expandNum" label="扩展码" width="110" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="rank" label="优先级" width="90" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="unitPriceStr" label="单价" width="170" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <span v-if="!scope.row.isEdit">{{scope.row.unitPriceStr}}</span>
                          <el-input v-else size="small" oninput="value=value.match(/\d+\.?\d{0,4}/,'')" v-model="scope.row.unitPriceStr" @blur="scope.row.unitPriceStr = $event.target.value;if(scope.row.unitPriceStr!==null &&scope.row.unitPriceStr!==''){scope.row.unitPriceStr=Number(scope.row.unitPriceStr).toFixed(4)}"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column  label="操作" min-width="90" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <span class="operation" style="color:#368cfe;cursor: pointer;" @click="checkChannelDetail(scope.row.channelId)">查看</span>
                          <span class="operation" v-show="!scope.row.isEdit" style="color:#368cfe;cursor: pointer;" @click="editPrice(scope.row)">编辑</span>
                          <span class="operation" v-show="scope.row.isEdit" style="color:#368cfe;cursor: pointer;" @click="savePrice(scope.row)">保存</span>
                          <span class="operation" v-show="scope.row.isEdit" style="color:#368cfe;cursor: pointer;" @click="cancelPrice(scope.row)">取消</span>
                        </template>
                      </el-table-column> 
                    </el-table>
                  </el-collapse-item>
                </el-collapse >
              </template>
          </el-table-column> 
          <el-table-column  type="selection" align="center" width="50"></el-table-column>
          <el-table-column prop="name" label="名称" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="account" label="账号" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="protocolTypeStr" label="协议类型" width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="businessTypeStr" label="业务类型" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enterpriseName" label="所属企业" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="channelGroupName" label="通道组" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="accessNumber" label="接入号" width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sendSpeed" label="发送速度" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="linkNumber" label="链接数" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="operator" label="操作账号" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remark" label="备注" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="status" label="账号状态" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-show="scope.row.status ===0">停用</span>
              <span v-show="scope.row.status ===1">正常</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="operation" v-has="'protocolAccountUpdate'"  @click="editAction(scope.row)">修改</span>
              <span class="operation" v-has="'protocolAccountEnabledOrDisable'" v-show="scope.row.status===1"  @click="forbidAction(2,scope.row)">禁用</span>
              <span class="operation" v-has="'protocolAccountEnabledOrDisable'" v-show="scope.row.status===0"   @click="enableAction(2,scope.row)">启用</span>
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
      <!-- 新建编辑协议账号 -->
      <el-drawer
        :title="protocolDrawerTitle"
        :visible.sync="protocolDrawer"
        :before-close="closeProtocolDrawer"
        :modal-append-to-body="true"
        :wrapperClosable="false"
        size="500px"
        direction="rtl">
        <el-form
          class="drawerContent"
          ref="prorocolForm"
          :model="prorocolForm"
          :rules="prorocolRules"
          label-width="128px"
          label-position="right"
        >
          <el-form-item prop="protocolType" label="协议类型：">
            <el-select v-model="prorocolForm.protocolType" :disabled="protocolDrawerTitle==='创建账号' ? false:true" clearable size="small" placeholder="请选择协议类型">
              <el-option
                v-for="item in protocolTypeList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="protocolName" label="名称：">
            <el-input class="limitWord" size="small" maxlength="20" show-word-limit v-model="prorocolForm.protocolName"></el-input>
          </el-form-item>
          <el-form-item prop="protocolAccount" label="账号：">
            <el-input size="small" v-model="prorocolForm.protocolAccount"></el-input>
          </el-form-item>
          <el-form-item prop="enterprise" label="所属企业："> 
            <el-select v-model="prorocolForm.enterprise"  filterable  clearable @change="changeEnterprise" size="small" placeholder="请选择所属企业">
              <el-option
                v-for="item in enterpriseList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option> 
            </el-select>
          </el-form-item>
          <el-form-item prop="business" label="业务类型：">
            <el-select v-model="prorocolForm.business"  @change="changeBussinessType" clearable size="small" :disabled="protocolDrawerTitle==='创建账号' ? false:true" placeholder="请选择业务类型">
              <el-option
                v-for="item in businessTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="channelGroup" label="通道组：">
            <el-select v-model="prorocolForm.channelGroup" @change="changrChannelGroup" clearable size="small" placeholder="请选择通道组">
              <el-option
                v-for="item in channelGroupList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="accessNumber" label="接入号：">
            <el-input size="small" v-model="prorocolForm.accessNumber" oninput="value=value.replace(/[^\d]/g,'')" @blur="prorocolForm.accessNumber = $event.target.value"></el-input>
          </el-form-item>
          <el-form-item prop="sendSpeed" label="发送速度：">
            <el-input size="small" v-model="prorocolForm.sendSpeed" oninput="if(value>10000){value=10000}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=0}"   @blur="prorocolForm.sendSpeed = $event.target.value"></el-input>
          </el-form-item>
          <el-form-item prop="linkCount" label="链接数：">
            <el-input size="small" v-model="prorocolForm.linkCount" oninput="if(value>10000){value=10000}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=0}"   @blur="prorocolForm.linkCount = $event.target.value"></el-input>
          </el-form-item>
          <el-form-item prop="ip" label="网关IP">
            <el-input size="small" v-model="prorocolForm.ip"></el-input>
          </el-form-item>
          <el-form-item prop="port" label="网关端口：">
            <el-input size="small" v-model="prorocolForm.port" oninput="if(value>65535){value=65535}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=0}"   @blur="prorocolForm.port = $event.target.value"></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="描述：">
            <el-input
              class="limitWord"
              type="textarea"
              placeholder=""
              maxlength="200"
              :autosize="{ minRows: 5, maxRows: 8 }"
              show-word-limit
              v-model="prorocolForm.remark"
            ></el-input>
          </el-form-item>
          <el-form-item prop="parmentDepartment" label="">
              <el-button  type="primary" size="small" v-if="protocolDrawerTitle === '创建账号'" @click="confirmAddProtocol" :disabled="isSubmit">提 交</el-button>
              <el-button  type="primary" size="small" v-if="protocolDrawerTitle === '修改账号'" @click="confirmEditProtocol">提 交</el-button>
              <el-button  size="small" @click="closeProtocolDrawer">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
      <!-- 通道详情弹窗 -->
      <el-dialog
        title="通道详情"
        :visible.sync="channelDetailToast"
        :close-on-click-modal="false"
        width="850px"
      >
        <div class="channelDetail" v-if="channelDetail.baseInfo">
          <channelDetail :productType="2" :detailData="channelDetail"></channelDetail>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
import{protocolAccountList,addProtocolAccount,editProtocolAccount,updateProtocolAccountStatus,getEnterpriseList,getBussinessTypeList,getChannelGroup,getAccessNumber,getChannelList,updatePrice,lookSmsChannelDetail} from '../../api/userName/api'
import {regexpAccount,toFixedRrice} from "../../public";
import channelDetail from '../Channel/channelDetail'

export default {
  name: "protocolAccount",
  components:{channelDetail},
  data() {
    // 账号验证规则
    var validateAccount = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("账号不能为空"));
      } else if (!regexpAccount(value)) {
        callback(new Error("账号不能为中文"));
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error("账号长度为6-12位"));
      } else {
        callback();
      }
    };
    // 网关ip验证规则
    var validateIp = (rule, value, callback) => {
      let reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
      if (value === "" || value === null) {
        callback(new Error("网关ip不能为空"));
      }  else if (!reg.test(value)) {
        callback(new Error("网关ip格式不正确"));
      } else {
        callback();
      }
    };
    return {
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      protocolType:null,//协议类型
      searchCont:null,//名称
      protocolTypeList:[{id:1,value:'cmpp2.0'},{id:2,value:'cmpp3.0'},{id:3,value:'sgip1.2'},{id:4,value:'smgp3.0'},],//协议类型列表
      tableData:[],
      isDisable:true,//是否禁用头部按钮
      prorocolForm:{
        id:null,
        protocolType:null,//协议类型
        protocolName:null,//名称
        protocolAccount:null,//账号
        enterprise:null,//所属企业
        business:null,//业务类型
        channelGroup:null,//通道组
        accessNumber:null,//接入号
        sendSpeed:null,//发送速度
        linkCount:null,//链接数
        ip:null,//网关ip
        port:null,//网关端口号
        remark:null,//备注
      },//协议账号表单
      prorocolRules:{
        protocolType:[{ required: true, message: "协议类型不能为空", trigger: "change" }],
        protocolName:[{ required: true, message: "名称不能为空", trigger: "blur" }],
        protocolAccount:[{ required: true, validator: validateAccount, trigger: "blur" }],
        enterprise:[{ required: true, message: "所属企业不能为空", trigger: "change" }],
        business:[{ required: true, message: "所属业务类型不能为空", trigger: "change" }],
        channelGroup:[{ required: true, message: "通道组不能为空", trigger: "change" }],
        accessNumber:[{ required: true, message: "接入号不能为空", trigger: "blur" }],
        sendSpeed:[{ required: true, message: "发送速度不能为空", trigger: "blur" }],
        linkCount:[{ required: true, message: "链接数不能为空", trigger: "blur" }],
        ip:[{ required: true, validator: validateIp, trigger: "blur" }],
        port:[{ required: true, message: "网关端口不能为空", trigger: "blur" }],
      },
      activeNames:["1","2"],
      enterpriseList:[],//企业列表
      businessTypeList:[],//业务类型
      channelGroupList:[],//通道组列表
      protocolDrawerTitle:'',
      protocolDrawer:false,//协议账号抽屉
      channelDetailToast:false,//查看通道详情弹窗
      channelDetail:{},//通道详情数据
      selectData:[],//表格选择的数据
      // price:null,//编辑的价格
      isSubmit:false,//是否禁用提交按钮
      tableHeight:window.innerHeight - 369 +'',
      timer: null,
    };
  },
  methods: {
    // 获取协议账号列表数据
    getDataList(){
      this.loading = true
      let params ={
        enterpriseName: this.searchCont,
        protocolType: this.protocolType,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      protocolAccountList(params).then(res=>{
        this.loading = false
        if(res.status == 0){
          res.data.records.map(item=>{
            item.channelList = null
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
          message:er,
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
      this.protocolType =null,
      this.searchCont= null
      this.getDataList()
    },
    // 查询
    searchAction(){
      this.currentPage = 1
      this.getDataList()
    },
    // 选择协议账号状态
    changeProtocolType(){
      this.getDataList()
    },
    // 表格展开时获取对应的账户信息
    handleExpand(row,expandedRows){
      getChannelList({id:row.id}).then(res=>{
        if(res.status == 0){
          this.tableData.map(item=>{
            if(item.id === row.id){
              res.data.map(item=>{
                item.isEdit = false
              })
              item.channelList = res.data
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

    // 创建账号
    createAccount(){
      this.protocolDrawerTitle = '创建账号'
      this.prorocolForm.id = null,
      this.prorocolForm.protocolType = null,//协议类型
      this.prorocolForm.protocolName = null,//名称
      this.prorocolForm.protocolAccount = null,//账号
      this.prorocolForm.enterprise = null,//所属企业
      this.prorocolForm.business = null,//业务类型
      this.prorocolForm.channelGroup = null,//通道组
      this.prorocolForm.accessNumber = null,//接入号
      this.prorocolForm.sendSpeed = null,//发送速度
      this.prorocolForm.linkCount = null,//链接数
      this.prorocolForm.ip = null,//网关ip
      this.prorocolForm.port = null,//网关端口号
      this.prorocolForm.remark = null,//备注
      this.channelGroupList = []
      this.getEnterpriseData()
      this.getTypeListData()
      this.$nextTick(()=>{
        this.$refs.prorocolForm.clearValidate();
      })  
      this.protocolDrawer = true
    },
    // 确认新建账号
    confirmAddProtocol(){
      this.$refs.prorocolForm.validate(valid=>{
        if(valid){
          if (this.timer) {
            clearTimeout(this.timer);
          }
          let _this = this
          _this.isSubmit = true
          this.timer = setTimeout(function () {
            _this.timer = null;
            let params ={
              protocolType: _this.prorocolForm.protocolType,
              accessNumber: _this.prorocolForm.accessNumber,
              account: _this.prorocolForm.protocolAccount,
              businessType: _this.prorocolForm.business,
              channelGroupId: _this.prorocolForm.channelGroup,
              enterpriseId: _this.prorocolForm.enterprise,
              gatewayIp: _this.prorocolForm.ip,
              gatewayPort: _this.prorocolForm.port,
              linkNumber: _this.prorocolForm.linkCount,
              name: _this.prorocolForm.protocolName,
              remark: _this.prorocolForm.remark,
              sendSpeed: _this.prorocolForm.sendSpeed,
            }
            addProtocolAccount(params).then(res=>{
              _this.isSubmit = false
              if(res.status == 0){
                _this.$message.success({
                  message:'创建账号成功',
                  center:true
                })
                _this.getDataList()
                _this.closeProtocolDrawer()
              }else{
                _this.$message({
                  message:res.message,
                  center:true,
                  type:res.status === 2 ? 'warning':'error'
                })
              }
            }).catch(err=>{
              _this.isSubmit = false
              _this.$message.error({
                message:err,
                center:true
              })
            })
          }, 500);
        }
      })
    },
    // 修改
    editAction(row){
      this.protocolDrawerTitle = '修改账号'
      this.prorocolForm.id = row.id,
      this.prorocolForm.protocolType = row.protocolType,//协议类型
      this.prorocolForm.protocolName = row.name,//名称
      this.prorocolForm.protocolAccount = row.account,//账号
      this.prorocolForm.enterprise = row.enterpriseId,//所属企业
      this.prorocolForm.business = row.businessType,//业务类型
      this.prorocolForm.channelGroup = row.channelGroupId,//通道组
      this.prorocolForm.accessNumber = row.accessNumber,//接入号
      this.prorocolForm.sendSpeed = row.sendSpeed,//发送速度
      this.prorocolForm.linkCount = row.linkNumber,//链接数
      this.prorocolForm.ip = row.gatewayIp,//网关ip
      this.prorocolForm.port = row.gatewayPort,//网关端口号
      this.prorocolForm.remark = row.remark,//备注
      this.getEnterpriseData()
      this.getTypeListData()
      this.getChannelGroupList(row.enterpriseId,row.businessType)
      this.protocolDrawer = true
    },
    // 确认修改账号
    confirmEditProtocol(){
      this.$refs.prorocolForm.validate(valid=>{
        if(valid){
          let params = {
            accessNumber: this.prorocolForm.accessNumber,
            account: this.prorocolForm.protocolAccount,
            businessType: this.prorocolForm.business,
            channelGroupId: this.prorocolForm.channelGroup,
            enterpriseId: this.prorocolForm.enterprise,
            gatewayIp: this.prorocolForm.ip,
            gatewayPort: this.prorocolForm.port,
            id: this.prorocolForm.id,
            linkNumber: this.prorocolForm.linkCount,
            name: this.prorocolForm.protocolName,
            protocolType: this.prorocolForm.protocolType,
            remark: this.prorocolForm.remark,
            sendSpeed: this.prorocolForm.sendSpeed,
          }
          editProtocolAccount(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'账号修改成功',
                center:true
              })
              this.getDataList()
              this.closeProtocolDrawer()
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
    // 禁用
    forbidAction(type,row){
      let ids = []
      if(type === 1){
        for(let i =0;i<this.selectData.length;i++){
          if(this.selectData[i].status === 0){
            this.$message.error({
              message:'所选账号存在停用状态',
              center:true
            })
            return
          }
          ids.push(this.selectData[i].id)
        }
      }else{
        if(row.status === 0){
          this.$message.error({
            message:'所选账号存在停用状态',
            center:true
          })
          return
        }
        ids.push(row.id)
      }
      this.$confirm("禁用后该账号不可用，是否确认禁用？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString(),status:0}
          updateProtocolAccountStatus(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'禁用成功',
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
    enableAction(type,row){
      let ids = []
      if(type === 1){
        for(let i =0;i<this.selectData.length;i++){
          if(this.selectData[i].status === 1){
            this.$message.error({
              message:'所选账号存在启用状态',
              center:true
            })
            return
          }
          ids.push(this.selectData[i].id)
        }
      }else{
        if(row.status === 1){
          this.$message.error({
            message:'所选账号存在启用状态',
            center:true
          })
          return
        }
        ids.push(row.id)
      }
      let params = {ids:ids.toString(),status:1}
      updateProtocolAccountStatus(params).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'启用成功',
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
    // 获取所属企业列表
    getEnterpriseData(){
      getEnterpriseList().then(res=>{
        if(res.status == 0){
          this.enterpriseList = res.data
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
    // 获取业务类型
    getTypeListData(){
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
    // 获取对应通道组
    getChannelGroupList(enterpriseId,businessType){
      getChannelGroup({enterpriseId:enterpriseId,productType:2,businessType:businessType}).then(res=>{
        if(res.status == 0){
          this.channelGroupList = res.data
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
    // 切换所属企业
    changeEnterprise(val){
      if(val !== null && val!=='' && this.prorocolForm.business !==null && this.prorocolForm.business !==''){
        this.getChannelGroupList(val,this.prorocolForm.business)
      }else{
        this.channelGroupList = []
      }
      this.prorocolForm.channelGroup = null
      this.prorocolForm.accessNumber = null
    },
    // 切换业务类型
    changeBussinessType(val){
      if(val !== null && val!=='' && this.prorocolForm.business !==null && this.prorocolForm.business !==''){
        this.getChannelGroupList(this.prorocolForm.enterprise,val)
      }else{
        this.channelGroupList = []
      }
      this.prorocolForm.channelGroup = null
      this.prorocolForm.accessNumber = null
    },
    // 切换通道组
    changrChannelGroup(val){
      // this.prorocolForm.accessNumber = val
      if(val === null || val === ''){
        this.prorocolForm.accessNumber = null
      }else{
        this.getAccessNumberData(val)
      }
    },
    // 获取接入号
    getAccessNumberData(id){
      getAccessNumber({channelGroupId:id}).then(res=>{
        if(res.status == 0){
          this.prorocolForm.accessNumber = res.data
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
    // 查看通道详情
    checkChannelDetail(id){
      this.channelDetail ={}
      lookSmsChannelDetail({id:id}).then(res=>{
        if(res.status == 0){
          this.channelDetail = Object.assign({},res.data)
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
      this.channelDetailToast = true
    },
    // 编辑价格
    editPrice(row){
      // this.price = row.unitPriceStr
      row.price2 = row.unitPriceStr
      row.isEdit = true
    },
    // 保存价格
    savePrice(row){
      // let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{4})$/
      // if(!reg.test(row.unitPriceStr)){
      //   this.$message.error({
      //     message:'价格保留四位小数',
      //     center:true
      //   })
      //   return
      // }
      let params ={   
        channelGroupRelId: row.id,
        protocolAccountId: row.protocolAccountId,
        unitPrice: toFixedRrice(row.unitPriceStr) 
      }
      updatePrice(params).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'价格修改成功',
            center:true
          })
          row.unitPriceStr = toFixedRrice(row.unitPriceStr)
          // this.unitPriceStr = null
          row.isEdit = false
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
    // 取消编辑价格
    cancelPrice(row){
      row.unitPriceStr = row.price2
      row.isEdit = false
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
    // 关闭新增/编辑通道抽屉前重置表单规则
    closeProtocolDrawer(){
      this.$nextTick(()=>{
        this.$refs.prorocolForm.resetFields();
        this.protocolDrawer = false
      })
    },
    // 头部搜索下拉框选中后失焦防止回车触发下拉框
    isShowSelectOptions(isShowSelectOptions){
      if(!isShowSelectOptions) this.$refs.searchSelect.blur();
    },
  },
  mounted() {
    // this.getDataList()
  },
};
</script>

<style  lang="less" scoped>
#protocolAccount{
  .table /deep/ .el-collapse-item__wrap{
    background-color:#F8F8FA ;
    border: 0;
    padding:0 30px;
  }
  .table /deep/ .el-collapse-item__header{
    background-color:#F8F8FA ;
  }
  /deep/ .el-collapse-item__content {
    margin-top: 25px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    .separate{
      display: flex;
    }
    .cont{
      display: flex;
      width: 450px;
      // width: 50%;
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
      width: 100px;
      white-space: nowrap;
    }
  }
}
.channelDetail{
  height: 400px;
  overflow-y: auto;
}
.limitWord /deep/ .el-input__suffix{
  top: 0 !important;
  right: 1px;
}
.limitWord /deep/ .el-input__inner{
  padding-right: 46px !important;
}
.limitWord /deep/ .el-input__count{
  // right: 0;
  bottom: -20px;
  background-color: transparent;
}
/deep/ .el-table__empty-block{
  text-align: left;
}

</style>