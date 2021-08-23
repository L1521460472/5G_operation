<template>
  <div class="container">
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
                <el-collapse-item title="基本信息"  name="1" v-if="props.row.baseInfo">
                  <div class="separate">
                    <div class="cont"><span class="lable">状态：</span>{{props.row.baseInfo.statusStr}}</div>
                    <div class="cont"><span class="lable">更新时间：</span>{{props.row.baseInfo.updateTime}}</div>
                  </div>
                  <div class="separate">
                    <div class="cont"><span class="lable">通道协议：</span>{{props.row.baseInfo.sendMethod == 1 ? 'HTTP':'CMPP' }}</div>
                    <div class="cont"><span class="lable">通道名称：</span>{{props.row.baseInfo.name}}</div>
                  </div>
                  <div class="separate">
                    <div class="cont"><span class="lable">通道账号：</span>{{props.row.baseInfo.number}}</div>
                    <div class="cont"><span class="lable">服务代码：</span>{{props.row.baseInfo.serviceCode}}</div>
                  </div>
                  <div class="separate">
                    <div class="cont"><span class="lable">供应商名称：</span>{{props.row.baseInfo.supplierName}}</div>
                    <div class="cont">
                      <span class="lable">通道类型：</span>
                      <span v-if="props.row.baseInfo.type === 1 ">直连</span>
                      <span v-if="props.row.baseInfo.type === 2 ">非直连</span>
                      <span v-if="props.row.baseInfo.type === 3 ">自有</span>
                    </div>
                  </div>
                  <div class="separate">
                    <div class="cont">
                      <span class="lable">运营商类型：</span>
                      <span v-if="props.row.baseInfo.operator == 0">三网</span>
                      <span v-if="props.row.baseInfo.operator == 1">移动</span>
                      <span v-if="props.row.baseInfo.operator == 2">电信</span>
                      <span v-if="props.row.baseInfo.operator == 3">联通</span>
                    </div>
                    <div class="cont">
                      <span class="lable">发送号码类型：</span>
                      <span v-if="props.row.baseInfo.sendPhoneType == 0">全网</span>
                      <span v-if="props.row.baseInfo.sendPhoneType == 1">省网</span>
                      <span v-if="props.row.baseInfo.sendPhoneType == 2">市网</span>
                    </div>
                  </div>
                  <div class="separate">
                    <div class="cont">
                      <span class="lable">业务类型：</span>
                      <div class="bussiness" >
                        <div class="bussinessSpan" v-for="(item1,index2) in props.row.baseInfo.businessTypeStrList" :key="index2">{{item1}} <span v-show="index2 !== props.row.baseInfo.businessTypeStrList.length-1">|&nbsp;</span></div>
                      </div>
                    </div>
                    <div class="cont"><span class="lable">业务代码：</span>{{props.row.baseInfo.businessCode}}</div>
                  </div>
                  <div class="separate">
                    <div class="cont"><span class="lable">扩展码位数：</span>{{props.row.baseInfo.expandNumber===0 ? '不支持':props.row.baseInfo.expandNumber}}</div>
                    <div class="cont"><span class="lable">长短信：</span>{{props.row.baseInfo.longMessageSupport===0 ? '不支持':'支持'}}</div>
                  </div>
                  <div class="separate">
                    <div class="cont"><span class="lable">内容包含链接：</span>{{props.row.baseInfo.contentContainLinkSupport===0 ? '不支持':'支持'}}</div>
                    <div class="cont"><span class="lable">虚拟运营商：</span>{{props.row.baseInfo.virtualOperatorSupport===0 ? '不支持':'支持'}}</div>
                  </div>
                  <div class="separate">
                    <div class="cont"><span class="lable">支持上行：</span>{{props.row.baseInfo.upstreamSupport === 0 ? '不支持':'支持'}}</div>
                    <div class="cont">
                      <span class="lable">签名方式：</span>
                      <span v-if="props.row.baseInfo.signWay === 0">不限</span>
                      <span v-if="props.row.baseInfo.signWay === 1">前置</span>
                      <span v-if="props.row.baseInfo.signWay === 2">后置</span>
                    </div>
                  </div>
                  <div class="separate">
                    <div class="cont">
                      <span class="lable">报备类型：</span>
                      <span v-if="props.row.baseInfo.reportType === 0">无需报备</span>
                      <span v-if="props.row.baseInfo.reportType === 1">签名</span>
                      <span v-if="props.row.baseInfo.reportType === 2">签名+内容</span>
                    </div>
                    <div class="cont"><span class="lable">内容最大字数：</span>{{props.row.baseInfo.contentMaxAmount==0 ? '不限':'props.row.baseInfo.contentMaxAmount'}}</div>
                  </div>
                  <div class="separate">
                    <div class="cont"><span class="lable">发送速度：</span>{{props.row.baseInfo.concurrency}}</div>
                    <div class="cont"><span class="lable">通道链接数：</span>{{props.row.baseInfo.linkNum}}</div>
                  </div>
                  <div class="separate">
                    <div class="cont">
                      <span class="lable">消息编码：</span>
                      <span v-if="props.row.baseInfo.messageCode === 0">UTF-8</span>
                      <span v-if="props.row.baseInfo.messageCode === 1">GBK</span>
                      <span v-if="props.row.baseInfo.messageCode === 2">GB2312</span>
                    </div>
                    <div class="cont">
                      <span class="lable">路由省市：</span>
                      <span>{{props.row.baseInfo.routingProvinceStr}}</span>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="通道参数"  name="2" v-if="props.row.sendParameter">
                  <div class="separate">
                    <div class="cont"><span class="lable">消息发送地址：</span>{{props.row.sendParameter.sendUrl}}</div>
                    <div class="cont"><span class="lable">上行拉取地址：</span>{{props.row.sendParameter.upPullUrl}}</div>
                  </div>
                  <div class="separate">
                    <div class="cont"><span class="lable">状态查询地址：</span>{{props.row.sendParameter.statusQueryUrl}}</div>
                    <div class="cont"><span class="lable">是否支持群发：</span>{{props.row.sendParameter.groupSendSupport==0 ? '不支持':'支持'}}</div>
                  </div>
                  <div><span class="lable">群发组包最大数：</span>{{props.row.sendParameter.groupSendPackageMaxAmount}}</div>
                </el-collapse-item>
                <el-collapse-item title="计费信息"  name="3" v-if="props.row.costInfo">
                  <div class="separate">
                    <div class="cont">
                      <span class="lable">计费方式：</span>
                      <span v-if="props.row.costInfo.costUnit===0">元/条</span>
                      <span v-if="props.row.costInfo.costUnit===1">元/60s</span>
                      <span v-if="props.row.costInfo.costUnit===2">元/6s</span>
                      <span v-if="props.row.costInfo.costUnit===3">元/会话</span>
                    </div>
                    <div class="cont"><span class="lable">计费规则：</span>{{props.row.costInfo.costRule == 1 ? '成功':'成功+未知'}}</div>
                  </div>
                  <div class="separate">
                    <div class="cont">
                      <span class="lable">成本价：</span>
                      <span>{{props.row.costInfo.unitPrice}}</span>
                    </div>
                    <div class="cont">
                      <span class="lable">调拨价：</span>
                      <span>{{props.row.costInfo.allocationPriceStr}}</span>
                    </div>
                  </div>
                  <div><span class="lable">备注：</span>{{props.row.costInfo.remark}}</div>
                </el-collapse-item>
              </el-collapse >
            </template>
          </el-table-column>
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column prop="name" label="通道名称" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="serviceCode" label="服务代码" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="supplierName" label="供应商名称" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" label="通道类型" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">直连</span>
              <span v-if="scope.row.type == 2">非直连</span>
              <span v-if="scope.row.type == 3">自有</span>
            </template>
          </el-table-column>
          <el-table-column prop="statusStr" label="状态" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column  label="操作" min-width="140" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="operation" v-has="'channelUpdate'" @click="changeAction(scope.row)">变更</span>
              <span class="operation" v-has="'channelCopy'" @click="copyAction(scope.row)">复制</span>
              <span class="operation" v-has="'channelDisable'" v-if="scope.row.status === 0" @click="forbidAction(2,scope.row)">禁用</span>
              <span class="operation" v-has="'channelEnable'" v-if="scope.row.status === 1" @click="enableAction(2,scope.row)">启用</span>
              <!-- <el-tooltip v-has="'channelUpdate'"  effect="dark" content="变更" placement="top">
                  <img class="operation"  @click="changeAction(scope.row)" src="../../assets/images/edit_icon.svg" >
              </el-tooltip>
              <el-tooltip v-has="'channelUpdate'"  effect="dark" content="复制" placement="top">
                  <img class="operation"   src="../../assets/images/copy_icon.svg" >
              </el-tooltip>
              <el-tooltip v-has="'channelDisable'" v-if="scope.row.status === 0"   effect="dark" content="禁用" placement="top">
                  <img class="operation"  @click="forbidAction(2,scope.row)"  src="../../assets/images/forbidden_icon.svg" >
              </el-tooltip>
              <el-tooltip v-has="'channelEnable'" v-if="scope.row.status === 1"   effect="dark" content="启用" placement="top">
                  <img class="operation"  @click="enableAction(2,scope.row)"  src="../../assets/images/enable_icon.svg" >
              </el-tooltip>  -->
            </template>
          </el-table-column>
      </el-table>
    </div>
    <!-- 新建编辑sms -->
    <el-drawer
      :title="channelDrawerTitle"
      :visible.sync="channelDrawer"
      :before-close="closeChannelDrawer"
      :modal-append-to-body="true"
      :wrapperClosable="false"
      size="500px"
      class="collapseDrawer"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="channelForm"
        :model="channelForm"
        :rules="channelRules"
        label-width="140px"
        label-position="right"
      >
        <el-collapse v-model="drawerActive" >
          <el-collapse-item title="基本信息" name="baseInfo">
            <el-form-item prop="protocol" label="通道协议：">
              <el-select :disabled="disEdit" v-model="channelForm.protocol"  size="small" placeholder="请选择">
                <el-option
                  v-for="item in protocolList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item> 
            <el-form-item prop="channelName" label="通道名称：">
              <el-input class="limitWord" size="small" maxlength="20" show-word-limit v-model="channelForm.channelName"></el-input>
            </el-form-item>
            <el-form-item prop="channelAccount" label="通道账号：">
              <el-input size="small" maxlength="50"  v-model="channelForm.channelAccount" oninput="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"></el-input>
            </el-form-item>
            <el-form-item prop="channelPassword" label="通道密码：">
              <el-input size="small" maxlength="20" v-model="channelForm.channelPassword" oninput="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"></el-input>
            </el-form-item>
            <el-form-item prop="providerName" label="供应商名称：">
              <el-select v-model="channelForm.providerName" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in providerList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
              <!-- <el-input class="limitWord" size="small" maxlength="20" show-word-limit v-model="channelForm.providerName"></el-input> -->
            </el-form-item>  
            <el-form-item prop="serviceCode" label="服务代码：">
              <el-input class="limitWord" size="small" maxlength="20" show-word-limit v-model="channelForm.serviceCode" oninput="value=value.replace(/[^\d]/g,'')" @blur="channelForm.serviceCode = $event.target.value"></el-input>
            </el-form-item>  
            <el-form-item prop="channelType" label="通道类型：">
              <el-select v-model="channelForm.channelType" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in channelTypeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="operator" label="运营商类型">
              <el-select v-model="channelForm.operator" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in operatorList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="sentNumberType" label="发送号码类型：">
              <el-select v-model="channelForm.sentNumberType"  clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in sendPhoneTypeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="province" label="路由省市：" v-if="channelForm.sentNumberType === 1">
              <el-select v-model="channelForm.province"  clearable size="small" placeholder="请选择">
                <el-option 
                  v-for="item in provinceList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="businessType" label="业务类型：">
              <el-checkbox-group v-model="channelForm.businessType" >
                <el-checkbox v-for="item in businessTypeList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="businessCode" label="业务代码：">
              <el-input class="limitWord" size="small" maxlength="20" show-word-limit v-model="channelForm.businessCode" oninput="value=value.replace(/[\W]/g,'')"></el-input>
            </el-form-item>
            <el-form-item prop="extendCode" label="扩展码位数">
              <el-input size="small"  oninput="if(value>20){value=20}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=0}"  v-model="channelForm.extendCode" @blur="channelForm.extendCode = $event.target.value"></el-input>
              <span class="tip">0-20数字，0代表不支持扩展</span>
            </el-form-item>
            <el-form-item prop="logLetterRadio" label="长短信：">
              <el-radio-group v-model="channelForm.logLetterRadio">
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
              <span class="tip">如果支持长短信则不用拆分短信</span>
            </el-form-item>
            <el-form-item prop="containLink" label="内容包含链接：">
              <el-radio-group v-model="channelForm.containLink">
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
            </el-form-item>    
            <el-form-item prop="vno" label="虚拟运营商：">
              <el-radio-group v-model="channelForm.vno">
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="isUp" label="支持上行：">
              <el-radio-group v-model="channelForm.isUp">
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="signatureWay" label="签名方式：">
              <el-select v-model="channelForm.signatureWay" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in signatureWayList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="reportType" label="报备类型：">
              <el-select v-model="channelForm.reportType" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in reportTypeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="maxWord" label="内容最大字数：">
              <el-input size="small"  v-model.number="channelForm.maxWord" oninput="value=value.replace(/[^\d]/g,'')" @blur="channelForm.maxWord = $event.target.value"></el-input>
              <span class="tip">默认为0，0代表不限</span>
            </el-form-item>
            <el-form-item prop="speed" label="发送速度：">
              <el-input size="small"  v-model="channelForm.speed"></el-input>
            </el-form-item>
            <el-form-item prop="maxConcurrent" label="链接数：">
              <el-input size="small"  v-model="channelForm.maxConcurrent" oninput="value=value.replace(/[^\d]/g,'')"  @blur="channelForm.maxConcurrent = $event.target.value"></el-input>
              <span class="tip">默认为1</span>
            </el-form-item>
            <el-form-item prop="messageCode" label="消息编码：">
              <el-select v-model="channelForm.messageCode" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in messageCodeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="通道参数" name="channelParameters">
            <el-form-item prop="sentAddress" label="消息发送地址："> 
              <el-input size="small"  v-model="channelForm.sentAddress"></el-input>
            </el-form-item>
            <el-form-item prop="pullAddress" label="上行拉取地址：">
              <el-input size="small"  v-model="channelForm.pullAddress"></el-input>
            </el-form-item>
            <el-form-item prop="searchAddress" label="状态查询地址：">
              <el-input size="small"  v-model="channelForm.searchAddress"></el-input>
            </el-form-item>
            <el-form-item prop="isMasstexting" label="是否支持群发：">
              <el-select v-model="channelForm.isMasstexting"  clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in isMasstextingList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="maxGroup" label="群发组包最大数：">
              <el-input size="small"  v-model="channelForm.maxGroup" oninput="value=value.replace(/[^\d]/g,'')" @blur="channelForm.maxGroup = $event.target.value"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="计费信息" name="feeInfo">
            <el-form-item prop="chargeMode" label="计费方式：">
              <el-select v-model="channelForm.chargeMode" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in chargeModeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="feeRules" label="计费规则：">
              <el-select v-model="channelForm.feeRules" clearable size="small" placeholder="请选择">
                <el-option
                  v-for="item in feeRulesList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="price" label="成本价：">
              <el-input size="small"  oninput="value=value.match(/\d+\.?\d{0,4}/,'')"  v-model="channelForm.price" @blur="inputBlur1"></el-input>
            </el-form-item>
            <el-form-item prop="transferPrice" label="调拨价：">
              <el-input size="small"  oninput="value=value.match(/\d+\.?\d{0,4}/,'')"  v-model="channelForm.transferPrice" @blur="inputBlur2"></el-input>
            </el-form-item>
            <el-form-item prop="remark" label="备注：">
              <el-input
                class="limitWord"
                type="textarea"
                placeholder="请输入"
                maxlength="200"
                :autosize="{ minRows: 4, maxRows: 6 }"
                show-word-limit
                v-model="channelForm.remark"
              ></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse> 
        <el-form-item >
          <el-button  type="primary" size="small" :disabled="isSubmit" v-if="!disEdit" @click="addConfirm()">提交</el-button>
          <el-button  type="primary" size="small" v-if="disEdit" @click="editConfirm()">提交</el-button>
          <el-button  size="small" @click="closeChannelDrawer">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script> 
import {getSmsChannelDetail,addChannel,editChannel,disableChannel,enableChannel,copyChannel,getSupplierList} from '../../api/channel/api'
import province from '../../province'
import {toFixedRrice} from '../../public'
export default {
  name:'smsMessage',
  props:{
    tableData: {
      type: Array | Object,
    },
    businessTypeList:{
      type:Array
    }
  },
  data() {
    // const validatePrice = (rule,value,callback) =>{
    //   toFixedRrice(value)
    //   let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{4})$/
    //   if(value === '' || value === null){
    //     callback(new Error('内容不能为空'))
    //   }else if(!reg.test(value)){
    //     callback(new Error('格式为数字且保留四位小数'))
    //   }else{
    //       callback();
    //   }
    // }
    const validateCon = (rule, value, callback) => {
      if(value || value === 0){
        if(!Number.isInteger(Number(value)) || value <= 0){
          callback(new Error('格式为正整数'));
        }else if(value > 9999){
          callback(new Error('最大值为9999'));
        }else{
           callback();
        }
      }else{
        callback();
      }
    };   
    return {
      activeNames:["1"],
      isDisable:true,
      channelDrawer:false,//是否显示chatbot抽屉 
      channelDrawerTitle:'',
      disEdit:false,
      drawerActive:['baseInfo','channelParameters','feeInfo'],
      protocolList:[
        {
          id:1,
          value:'HTTP'
        },
        {
          id:2,
          value:'CMPP'
        }
      ],
      providerList:[],
      channelTypeList:[
        {
          id:1,
          value:'直连'
        },
        {
          id:2,
          value:'非直连'
        },
        {
          id:3,
          value:'自有'
        }
      ],//通道类型列表
      operatorList:[
        {
          id:0,
          value:'三网'
        },
        {
          id:1,
          value:'移动'
        },
        {
          id:2,
          value:'电信'
        },
        {
          id:3,
          value:'联通'
        },
      ],//运营商列表
      sendPhoneTypeList:[
        {
          id:0,
          value:'全网'
        },
        {
          id:1,
          value:'省网'
        },
        {
          id:2,
          value:'市网'
        },
      ],//发送号码类型列表
      provinceList:province,//省份列表
      signatureWayList:[
        {
          id:0,
          value:'不限'
        },
        {
          id:1,
          value:'前置'
        },
        {
          id:2,
          value:'后置'
        },
        {
          id:3,
          value:'不带签名'
        }
      ],//签名方式列表
      reportTypeList:[
        {
          id:0,
          value:'无需报备'
        },
        {
          id:1,
          value:'仅签名'
        },
        {
          id:2,
          value:'签名+内容'
        },
      ],//报备类型列表
      chargeModeList:[
        {
          id:0,
          value:'元/条'
        },
        {
          id:1,
          value:'元/60s'
        },
        {
          id:2,
          value:'元/6s'
        },
        {
          id:3,
          value:'元/会话'
        }
      ],//计费方式列表、
      messageCodeList:[
        {
          id:0,
          value:'UTF-8'
        },
        {
          id:1,
          value:' GBK'
        },
        {
          id:2,
          value:'GB2312'
        },
      ],//消息编码
      feeRulesList:[
        {
          id:1,
          value:'成功'
        },
        {
          id:2,
          value:'成功+未知'
        }
      ],//计费规则
      isMasstextingList:[
        {
          id:0,
          value:'不支持'
        },
        {
          id:1,
          value:'支持多号码单内容'
        },
        {
          id:2,
          value:'支持多号码多内容'
        },
      ],//是否支持群发
      channelForm:{
        id:null,     
        protocol:null,//通道协议
        channelAccount:null,//通道号账号
        channelName:null,//通道名称
        channelPassword:null,//通道密码
        providerName:null,//供应商名称
        serviceCode:null,//服务代码
        operator:null,//运营商类型
        channelType:null,//通道类型
        sentNumberType:null,//发送号码类型
        province:null,//路由省份
        businessType:[],//业务类型
        businessCode:null,//业务代码
        extendCode:null,//扩展码位数 
        logLetterRadio:1,//长短信
        containLink:1,//内容包含链接
        vno:1,//虚拟运营商
        isUp:1,//支持上行
        signatureWay:null,//签名方式
        reportType:null,//报备类型
        maxWord:0,//内容最大字数
        speed:null,//发送速度
        maxConcurrent:1,//链接数 
        messageCode:null,//消息编码 
        sentAddress:null,//消息发送地址
        pullAddress:null,//上行拉取地址
        searchAddress:null,//状态查询地址
        isMasstexting:null,//是否支持群发 
        maxGroup:null,//群发组包最大数 
        chargeMode:null,//计费方式
        feeRules:null,//计费规则 
        price:null,//成本价 
        transferPrice:null,//调拨价
        remark:null,//备注
      },//套餐表单数据
      channelRules: {
        protocol:[{ required: true, message: "通道协议不能为空", trigger: "change" }],
        channelName:[{ required: true, message: "通道名称不能为空", trigger: "blur" }],
        channelAccount:[{ required: true, message: "通道账号不能为空", trigger: "blur" }],
        channelPassword:[{ required: true, message: "通道密码不能为空", trigger: "blur" }],
        providerName:[{ required: true, message: "供应商名称不能为空", trigger: "blur" }],
        serviceCode:[{ required: true, message: "服务代码不能为空", trigger: "blur" }],
        channelType:[{ required: true, message: "通道类型不能为空", trigger: "change" }],
        operator:[{ required: true, message: "运营商类型不能为空", trigger: "change" }],
        sentNumberType:[{ required: true, message: "发送号码类型不能为空", trigger: "change" }],
        province:[{ required: true, message: "路由省市不能为空", trigger: "change" }],
        businessType:[{ required: true, message: "业务类型不能为空", trigger: "change" }],
        businessCode:[{ required: true, message: "业务代码不能为空", trigger: "blur" }],
        extendCode:[{ required: true, message: "扩展码位数不能为空", trigger: "blur" }],
        sentAddress:[{  required: true, message: "消息发送地址不能为空", trigger: "blur"}],
        logLetterCount:[{ validator:validateCon, trigger: "blur" }],
        maxConcurrent:[{ validator:validateCon, trigger: "blur" }],
        chargeMode:[{  required: true, message: "计费方式不能为空", trigger: "change"}],
        feeRules:[{  required: true, message: "计费规则不能为空", trigger: "change"}],
        price:[{ required: true,message: "成本价不能为空", trigger: "blur" }],
        transferPrice:[{ required: true,message: "调拨价不能为空", trigger: "blur" }],
        
      },//套餐表单验证规则
      selectData:[],
      timer: null,
      isSubmit:false,//是否禁用提交按钮
      tableHeight:window.innerHeight - 369 +'',
    };
  },
  methods: {
    // 表格展开时获取对应的账户信息
    handleExpand(row,expandedRows){
      getSmsChannelDetail({id:row.id}).then(res=>{
        if(res.status == 0){
          this.tableData.map(item=>{
            if(item.id === row.id){
              item.baseInfo = res.data.baseInfo
              item.sendParameter = res.data.sendParameter
              item.costInfo = res.data.costInfo
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
    // 表格选择
    handleSelectionChange(val){
      this.selectData = val
      this.isDisable = val.length < 1 ? true : false;
      this.$emit("handleSelectData", val,this.isDisable);
    },
    // 新增通道
    createAction(command){
      this.channelDrawerTitle = '新增通道信息'
      this.disEdit = false
      this.channelForm.protocol = Number(command)
      this.channelForm.channelAccount = null,//通道号账号
      this.channelForm.channelName = null,//通道名称
      this.channelForm.channelPassword = null,//通道密码
      this.channelForm.providerName = null,//供应商名称
      this.channelForm.serviceCode = null,//服务代码
      this.channelForm.operator = null,//运营商类型
      this.channelForm.channelType = null,//通道类型
      this.channelForm.sentNumberType = null,//发送号码类型
      this.channelForm.province = null,//路由省份
      this.channelForm.businessType = [],//业务类型
      this.channelForm.businessCode = null,//业务代码
      this.channelForm.extendCode = null,//扩展码位数 
      this.channelForm.logLetterRadio = 1,//长短信
      this.channelForm.containLink = 1,//内容包含链接
      this.channelForm.vno = 1,//虚拟运营商
      this.channelForm.isUp = 1,//支持上行
      this.channelForm.signatureWay = null,//签名方式
      this.channelForm.reportType = null,//报备类型
      this.channelForm.maxWord = 0,//内容最大字数
      this.channelForm.speed = null,//发送速度
      this.channelForm.maxConcurrent = 1,//链接数 
      this.channelForm.messageCode = null,//消息编码 
      this.channelForm.sentAddress = null,//消息发送地址
      this.channelForm.pullAddress = null,//上行拉取地址
      this.channelForm.searchAddress = null,//状态查询地址
      this.channelForm.isMasstexting = null,//是否支持群发 
      this.channelForm.maxGroup = null,//群发组包最大数 
      this.channelForm.chargeMode = null,//计费方式
      this.channelForm.feeRules = null,//计费规则 
      this.channelForm.price = null,//成本价 
      this.channelForm.transferPrice = null,//调拨价
      this.channelForm.remark = null,//备注
      this.getSupplierData()
      this.channelDrawer = true
    },
    // 新增确认
    addConfirm(){
      this.$refs.channelForm.validate((valid) => {
        if(valid){
          if (this.timer) {
            clearTimeout(this.timer);
          }
          let _this = this
          _this.isSubmit = true
          this.timer = setTimeout(function () {
            _this.timer = null;
            let params ={
              sendMethod:_this.channelForm.protocol,
              name:_this.channelForm.channelName,
              number:_this.channelForm.channelAccount,
              password:_this.channelForm.channelPassword,
              supplierName:_this.channelForm.providerName,
              serviceCode:_this.channelForm.serviceCode,
              type:_this.channelForm.channelType,
              operator:_this.channelForm.operator,
              sendPhoneType:_this.channelForm.sentNumberType,
              routingProvince:_this.channelForm.province,
              businessTypeIdList:_this.channelForm.businessType,
              businessCode:_this.channelForm.businessCode,
              expandNumber:_this.channelForm.extendCode,
              longMessageSupport:_this.channelForm.logLetterRadio,
              contentContainLinkSupport:_this.channelForm.containLink,
              virtualOperatorSupport:_this.channelForm.vno,
              upstreamSupport:_this.channelForm.isUp,
              signWay:_this.channelForm.signatureWay,
              reportType:_this.channelForm.reportType,
              contentMaxAmount:_this.channelForm.maxWord,
              concurrency:_this.channelForm.speed,
              linkNum:_this.channelForm.maxConcurrent,
              messageCode:_this.channelForm.messageCode,
              sendUrl:_this.channelForm.sentAddress,
              upPullUrl:_this.channelForm.pullAddress,
              statusQueryUrl:_this.channelForm.searchAddress,
              groupSendSupport:_this.channelForm.isMasstexting,
              groupSendPackageMaxAmount:_this.channelForm.maxGroup,
              costUnit:_this.channelForm.chargeMode,
              costRule:_this.channelForm.feeRules,
              unitPrice:toFixedRrice(_this.channelForm.price),
              allocationPrice:toFixedRrice(_this.channelForm.transferPrice),
              remark:_this.channelForm.remark,
              productType:2,
            }
            addChannel(params).then(res=>{
              _this.isSubmit = false
              if(res.status == 0){
                _this.$message.success({
                  message:'新增成功',
                  center:true
                })
                _this.closeChannelDrawer()
                _this.undateData()
              }else{
                _this.$message.error({
                  message:res.message,
                  center:true
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
      });
    },
    // 变更通道信息
    changeAction(row){
      this.getSupplierData()
      getSmsChannelDetail({id:row.id}).then(res=>{
        if(res.status == 0){
          this.channelForm.id = row.id,
          this.channelForm.protocol = res.data.baseInfo.sendMethod,
          this.channelForm.channelName = res.data.baseInfo.name,
          this.channelForm.channelAccount =res.data.baseInfo.number,
          this.channelForm.channelPassword =res.data.baseInfo.password,
          this.channelForm.providerName =res.data.baseInfo.supplierName,
          this.channelForm.serviceCode =res.data.baseInfo.serviceCode,
          this.channelForm.channelType = res.data.baseInfo.type,
          this.channelForm.operator = res.data.baseInfo.operator,
          this.channelForm.sentNumberType =res.data.baseInfo.sendPhoneType,
          this.channelForm.province = res.data.baseInfo.routingProvince,
          this.channelForm.businessType =res.data.baseInfo.businessTypeList === null ? []:res.data.baseInfo.businessTypeList,
          this.channelForm.businessCode = res.data.baseInfo.businessCode,
          this.channelForm.extendCode = res.data.baseInfo.expandNumber,
          this.channelForm.logLetterRadio = res.data.baseInfo.longMessageSupport,
          this.channelForm.containLink = res.data.baseInfo.contentContainLinkSupport,
          this.channelForm.vno = res.data.baseInfo.virtualOperatorSupport,
          this.channelForm.isUp =res.data.baseInfo.upstreamSupport,
          this.channelForm.signatureWay =res.data.baseInfo.signWay,
          this.channelForm.reportType =res.data.baseInfo.reportType,
          this.channelForm.maxWord =res.data.baseInfo.contentMaxAmount,
          this.channelForm.speed =res.data.baseInfo.concurrency,
          this.channelForm.maxConcurrent =res.data.baseInfo.linkNum,
          this.channelForm.messageCode =res.data.baseInfo.messageCode,
          this.channelForm.sentAddress = res.data.sendParameter.sendUrl,
          this.channelForm.pullAddress =res.data.sendParameter.upPullUrl,
          this.channelForm.searchAddress = res.data.sendParameter.statusQueryUrl,
          this.channelForm.isMasstexting =res.data.sendParameter.groupSendSupport,
          this.channelForm.maxGroup =res.data.sendParameter.groupSendPackageMaxAmount,
          this.channelForm.chargeMode =res.data.costInfo.costUnit,
          this.channelForm.feeRules =res.data.costInfo.costRule,
          this.channelForm.price =res.data.costInfo.unitPrice,
          this.channelForm.transferPrice = res.data.costInfo.allocationPriceStr,
          this.channelForm.remark =res.data.costInfo.remark
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
      this.channelDrawerTitle = '变更通道信息'
      this.disEdit = true
      this.channelDrawer = true
    },
    // 变更提交
    editConfirm(){
      this.$refs.channelForm.validate((valid)=>{
        if(valid){
          let params = {
            id:this.channelForm.id,
            sendMethod:this.channelForm.protocol,
            name:this.channelForm.channelName,
            number:this.channelForm.channelAccount,
            password:this.channelForm.channelPassword,
            supplierName:this.channelForm.providerName,
            serviceCode:this.channelForm.serviceCode,
            type:this.channelForm.channelType,
            operator:this.channelForm.operator,
            sendPhoneType:this.channelForm.sentNumberType,
            routingProvince:this.channelForm.province,
            businessTypeIdList:this.channelForm.businessType,
            businessCode:this.channelForm.businessCode,
            expandNumber:this.channelForm.extendCode,
            longMessageSupport:this.channelForm.logLetterRadio,
            contentContainLinkSupport:this.channelForm.containLink,
            virtualOperatorSupport:this.channelForm.vno,
            upstreamSupport:this.channelForm.isUp,
            signWay:this.channelForm.signatureWay,
            reportType:this.channelForm.reportType,
            contentMaxAmount:this.channelForm.maxWord,
            concurrency:this.channelForm.speed,
            linkNum:this.channelForm.maxConcurrent,
            messageCode:this.channelForm.messageCode,
            sendUrl:this.channelForm.sentAddress,
            upPullUrl:this.channelForm.pullAddress,
            statusQueryUrl:this.channelForm.searchAddress,
            groupSendSupport:this.channelForm.isMasstexting,
            groupSendPackageMaxAmount:this.channelForm.maxGroup,
            costUnit:this.channelForm.chargeMode,
            costRule:this.channelForm.feeRules,
            unitPrice:toFixedRrice(this.channelForm.price),
            allocationPrice:toFixedRrice(this.channelForm.transferPrice),
            remark:this.channelForm.remark,
            productType:2,
          }
          editChannel(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'变更成功',
                center:true
              })
              this.closeChannelDrawer()
              this.undateData()
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
    // 禁用
    forbidAction(type,row){
      let ids =[]
      if(type === 1){
        for(let i =0 ;i<this.selectData.length;i++){
          if(this.selectData[i].status === 1 ){
            this.$message.error({
              message:'启用状态的通道才可禁用',
              center:true
            })
            return
          }
          ids.push(this.selectData[i].id)
        }
      }else{
        ids.push(row.id)
      }
      this.$confirm("确定禁用已选中的通道吗？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          disableChannel(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'禁用成功',
                center:true
              })
              this.undateData()
            }else{
              this.$message({
                // message:res.message,
                message:'禁用失败',
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
      let ids =[]
      if(type === 1){
        for(let i =0 ;i<this.selectData.length;i++){
          if(this.selectData[i].status == 0 ){
            this.$message.error({
              message:'停用状态的通道才可启用',
              center:true
            })
            return
          }
          ids.push(this.selectData[i].id)
        }
      }else{
        ids.push(row.id)
      }
      let params = {ids:ids.toString()}
      enableChannel(params).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'启用成功',
            center:true
          })
          this.undateData()
        }else{
          this.$message({
            message:'启用失败',
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
    // 复制
    copyAction(row){
      copyChannel({id:row.id}).then(res=>{
        if(res.status == 0){
          this.undateData()
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
    // 获取供应商列表
    getSupplierData(){
      getSupplierList().then(res=>{
        if(res.status == 0){
          this.providerList = res.data
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
    // 通知父组件更新表格
    undateData(){
      this.$emit("handleUpdata");
    },
    // 关闭新增/编辑通道抽屉前重置表单规则
    closeChannelDrawer(){
      this.$nextTick(()=>{
        this.$refs.channelForm.resetFields();
        this.channelDrawer = false
      })
    },
    // 金额输入框失焦自动补全位数
    inputBlur1(event) {
      this.channelForm.price = event.target.value
      if(this.channelForm.price !== '' &&  this.channelForm.price !== null) {
        this.channelForm.price = Number(this.channelForm.price).toFixed(4)
      }
    },
    inputBlur2(event) {
      this.channelForm.transferPrice = event.target.value
      if(this.channelForm.transferPrice !== '' &&  this.channelForm.transferPrice !== null) {
        this.channelForm.transferPrice = Number(this.channelForm.transferPrice).toFixed(4)
      }
    },

  },

};
</script>

<style lang="less" scoped>
.table /deep/ .el-collapse-item__wrap{
  background-color:#F8F8FA ;
  border: 0;
}
.table /deep/ .el-collapse-item__header{
  background-color:#F8F8FA ;
}

/deep/ .el-collapse-item__wrap{
  padding: 0 20px !important;
}

/deep/ .distpicker-address-wrapper select{
  width: 83px;
  padding: 0;
  height: 32px;
  font-size: 14px;
}
.el-checkbox{
  display: block;
}
.tip{
  line-height: 20px;
  display: block;
  font-size: 12px;
  color: #f56c6c;
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
  background: transparent;
  right: 24px;
}

</style>