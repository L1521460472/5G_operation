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
            <el-collapse :value="activeNames" class="info">
              <el-collapse-item title="基本信息" name="1"  v-if="props.row.baseInfo">
                <div class="separate">
                  <div class="cont"><span class="lable">状态：</span>{{props.row.baseInfo.chatbotStatusStr}}</div>
                  <div class="cont"><span class="lable">更新时间：</span>{{props.row.baseInfo.updateTime}}</div>
                </div>
                <div class="separate">
                  <div class="cont"><span class="lable">Chatbot名称：</span>{{props.row.baseInfo.name}}</div>
                  <div class="cont"><span class="lable">服务代码：</span>{{props.row.baseInfo.serviceCode}}</div>
                </div>
                <div class="separate">
                  <div class="cont"><span class="lable">客户名称：</span>{{props.row.baseInfo.customerName}}</div>
                  <div class="cont"><span class="lable">EC ID：</span>{{props.row.baseInfo.agentCustomerNum}}</div>
                </div>
                <div class="separate">
                  <div class="cont"><span class="lable">归属区域：</span>{{props.row.baseInfo.regionCodeStr}}-{{props.row.baseInfo.provinceCodeStr}}-{{props.row.baseInfo.cityCodeStr}}</div>
                  <div class="cont"><span class="lable">代理商名称：</span>{{props.row.baseInfo.agentCustomerName}}</div>
                </div>
                <div><span class="lable">Chatbot ID：</span>{{props.row.baseInfo.number}}</div>
                <div class="haveImg"><span class="lable">Chatbot 头像：</span><img class="chatBotImg" :src="props.row.baseInfo.chatbotLogoUrl"></div>
                <div><span class="lable">短信端口号：</span>{{props.row.baseInfo.sms}}</div>
                <div><span class="lable">签名：</span>{{props.row.baseInfo.autograph}}</div>
                <div class="cont">
                  <span class="lable">Chatbot提供者：</span>
                  <span class="txt1" >{{props.row.baseInfo.providerSwitchCode == 1?'显示':'不显示'}}</span>
                </div>
                <div><span class="lable">行业类型：</span>{{props.row.baseInfo.categoryStr}}</div>
                <div><span class="lable">关联的CSP：</span>{{props.row.baseInfo.cspName}}</div>
                <div><span class="lable">服务描述：</span>{{props.row.baseInfo.description}}</div>
                <div><span class="lable">附件：</span><span @click="downloadAction(props.row.baseInfo.appendixUrl,props.row.baseInfo.appendixName)" class="txt2">{{props.row.baseInfo.appendixName}}</span></div>
                <div><span class="lable">Chatbot调试白名单：</span>{{props.row.baseInfo.debugWhiteAddress}}</div>
                <div class="separate">
                  <div class="cont">
                    <span class="lable">运营商：</span>
                    <span v-if="props.row.baseInfo.operator == 0">三网</span>
                    <span v-if="props.row.baseInfo.operator == 1">移动</span>
                    <span v-if="props.row.baseInfo.operator == 2">电信</span>
                    <span v-if="props.row.baseInfo.operator == 3">联通</span>
                  </div>
                  <div class="cont">
                    <span class="lable">业务类型：</span>
                    <div class="bussiness" >
                      <div class="bussinessSpan" v-for="(item1,index2) in props.row.baseInfo.businessTypeStrList" :key="index2">{{item1}} <span v-show="index2 !== props.row.baseInfo.businessTypeStrList.length-1">|&nbsp;</span></div>
                    </div>
                  </div>
                </div>
                <div class="separate">
                  <div class="cont"><span class="lable">AI智能交互：</span>{{props.row.baseInfo.aiInteractSupport == 1 ? '支持':'不支持'}}</div>
                  <div class="cont"><span class="lable">语音识别ASR：</span>{{props.row.baseInfo.voiceRecognizeSupport == 1 ? '支持':'不支持'}}</div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="配置信息" name="2" v-if="props.row.configInfo">
                <div class="headerImg">
                  <span class="lable">认证状态：</span>
                  <span class="active0" v-if="props.row.configInfo.isAuth == 0">未认证</span>
                  <span class="active2" v-if="props.row.configInfo.isAuth == 1">已认证</span>
                </div>
                <div><span class="lable">认证主体：</span>{{props.row.configInfo.authName}}</div>
                <div><span class="lable">认证有效期：</span>{{props.row.configInfo.authExpires}}</div>
                <div><span class="lable">认证机构：</span>{{props.row.configInfo.authOrg}}</div>
                <div class="cont"> 
                  <span class="lable">固定菜单：</span>
                  <span class="lookMenu" v-if="props.row.configInfo.menu" @click="lookMenu(props.row.configInfo.menu,props.row.configInfo.menuReviewStatus)">查看菜单</span>
                  <span v-else >暂无配置</span>
                </div>
                <div class="bussiness">
                  <span class="lable">业务权限：</span>
                  <div>
                    <div class="bussinessItem" v-show="props.row.configInfo.state !== null"><img :src="props.row.configInfo.authority1 == 0 ? nopassIcon:passIcon"><span>支持主动消息下发</span></div>
                    <div class="bussinessItem" v-show="props.row.configInfo.state !== null"><img :src="props.row.configInfo.authority2 == 0 ? nopassIcon:passIcon"><span>支持上行触发消息下发</span></div>
                    <div class="bussinessItem" v-show="props.row.configInfo.state !== null"><img :src="props.row.configInfo.authority3 == 0 ? nopassIcon:passIcon"><span>容许回落</span></div>
                    <div class="bussinessItem" v-show="props.row.configInfo.state !== null"><img :src="props.row.configInfo.authority4 == 0 ? nopassIcon:passIcon"><span>支持上行UP1.0消息</span></div>
                    <div class="bussinessItem" v-show="props.row.configInfo.state !== null"><img :src="props.row.configInfo.authority5 == 0 ? nopassIcon:passIcon"><span>允许上行</span></div>
                    <div class="bussinessItem" v-show="props.row.configInfo.state !== null"><img :src="props.row.configInfo.authority6 == 0 ? nopassIcon:passIcon"><span>允许下行</span></div>
                  </div>
                </div>
                <div><span class="lable">最大发送速率：</span>{{props.row.configInfo.concurrent}}</div>
                <div class="separate">
                  <div class="cont"><span class="lable">日最大发送量：</span>{{props.row.configInfo.amount === 0 ? '不限制': props.row.configInfo.amount}}</div>
                  <div class="cont"><span class="lable">月最大发送量：</span>{{props.row.configInfo.mamount}}</div>
                </div>
                <div class="separate">
                  <div class="cont">
                    <span class="lable">接入类型：</span>
                    <span v-if="props.row.configInfo.serviceRange === 0">省内</span>
                    <span v-if="props.row.configInfo.serviceRange === 1">全网</span>
                    <span v-if="props.row.configInfo.serviceRange === 2">其他</span>
                  </div>
                  <div class="cont"><span class="lable">媒体大小上限：</span>{{props.row.configInfo.filesizeLimit}}M</div>
                </div>
                <!-- <div><span class="lable">TOKEN：</span>
                  <span><span>fie*******654616516</span><span class="showToken">显示</span></span>
                </div> -->       
              </el-collapse-item>
              <el-collapse-item title="更多信息" name="3" v-if="props.row.moreInfo">
                <div><span class="lable">服务条款：</span>{{props.row.moreInfo.tcPage}}</div>
                <div><span class="lable">Chatbot邮箱：</span>{{props.row.moreInfo.chatbotEmail}}</div>
                <div><span class="lable">Chatbot主页：</span>{{props.row.moreInfo.chatbotWebsite}}</div>
                <div><span class="lable">服务电话：</span>{{props.row.moreInfo.callback}}</div>
                <div><span class="lable">办公地址：</span>{{props.row.moreInfo.address}}</div>
                <div><span class="lable">经度：</span>{{props.row.moreInfo.lon}}</div>
                <div><span class="lable">纬度：</span>{{props.row.moreInfo.lat}}</div>
                <div class="showColor"><span class="lable">主题颜色：</span ><span class="colorPick" :style="{'color':props.row.moreInfo.colour,'backgroundColor':props.row.moreInfo.colour}"></span>{{props.row.moreInfo.colour}}</div>
                <div class="haveImg"><span class="lable">背景图：</span><img class="chatBotImg" :src="props.row.moreInfo.backgroundImageUrl"></div>
              </el-collapse-item>
            </el-collapse >
          </template>
        </el-table-column>
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column prop="name" label="Chatbot名称" width="130" show-overflow-tooltip></el-table-column>
        <el-table-column prop="number" label="Chatbot ID" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customerName" label="EC名称" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="serviceCode" label="服务代码" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="chatbotStatusStr" label="状态" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column  label="操作" min-width="140" show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="operation" v-has="'channelUpdate'" @click="changeChannelAction(scope.row)">变更</span>
            <span class="operation" v-has="'chatbotChannelCancel'" @click="logoutAction(2,scope.row)">注销</span>
            <span class="operation" v-has="'chatbotChannelPutAway'" @click="putawayAction(2,scope.row)">上架</span>
            <!-- <el-tooltip v-has="'channelUpdate'"  effect="dark" content="变更" placement="top">
                <img class="operation"  @click="changeChannelAction(scope.row)" src="../../assets/images/change_icon.svg" >
            </el-tooltip>
            <el-tooltip v-has="'chatbotChannelCancel'"  effect="dark" content="注销" placement="top">
                <img class="operation"  @click="logoutAction(2,scope.row)"  src="../../assets/images/logout_icon.svg" >
            </el-tooltip>
            <el-tooltip v-has="'chatbotChannelPutAway'"  effect="dark" content="上架" placement="top">
                <img class="operation"  @click="putawayAction(2,scope.row)"  src="../../assets/images/putaway_icon.svg" >
            </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建编辑Chatbot -->
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
            <el-form-item prop="chatbotName" label="Chatbot名称：">
              <el-input class="limitWord" size="small" maxlength="20" show-word-limit v-model="channelForm.chatbotName"></el-input>
            </el-form-item>
            <el-form-item prop="customerName" label="客户名称：">
              <el-select v-model="channelForm.customerName" @change="changeCustomer" :disabled="disEdit" filterable clearable size="small" placeholder="请选择服务代码">
                <el-option
                  v-for="item in customerList"
                  :key="item.customerNum"
                  :label="item.customerName"
                  :value="item.customerNum"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="serviceCode" label="服务代码：">
              <el-select v-model="channelForm.serviceCode" @change="changeServiceCode" :disabled="disEdit" filterable clearable size="small" placeholder="请选择服务代码">
                <el-option
                  v-for="item in serviceCodeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="ecId" label="代理商名称：">
              <el-select v-model="channelForm.ecId" :disabled="disEdit" filterable clearable size="small" placeholder="请选择代理商名称">
                <el-option
                  v-for="item in agentList"
                  :key="item.belongAgentCode"
                  :label="item.belongAgentName"
                  :value="item.belongAgentCode"
                >
                </el-option>
              </el-select>
              <!-- <el-input size="small" maxlength="50" :disabled="disEdit" show-word-limit v-model="channelForm.ecId"></el-input> -->
            </el-form-item>
            <el-form-item prop="chatbotId" label="Chatbot ID：">
              <div class="chatbotId" v-if="channelForm.serviceCode !== null && channelForm.serviceCode !== '' && !disEdit ">
                <span>{{channelForm.serviceCode}}</span>
                <el-input class="limitWord" v-if="20-channelForm.serviceCode.length >0" size="small" oninput="value=value.replace(/[^\d]/g,'')" @blur="channelForm.chatbotId = $event.target.value" :maxlength="20-channelForm.serviceCode.length" show-word-limit v-model="channelForm.chatbotId"></el-input>
              </div>
              <div v-else>
                <el-input  size="small" oninput="value=value.replace(/[^\d]/g,'')" @blur="channelForm.chatbotId = $event.target.value" maxlength="10" :disabled="disEdit" show-word-limit v-model="channelForm.chatbotId"></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="chatbotLogoUrl" label="Chatbot 头像：">
              <div class="chatbotHeaderImg">
                <img v-if="channelForm.chatbotLogoUrl" :src="channelForm.chatbotLogoUrl" class="avatar">
                <img v-else src="../../assets/images/headerImg.svg" class="avatar">
                <el-upload
                  class="upload-demo"
                  action="#"
                  :show-file-list="false"
                  :http-request="uploadPictures"
                  :before-upload="beforeAvatarUpload">
                  <el-button size="small" type="primary">选择头像</el-button>
                  <div slot="tip" class="el-upload__tip">可上传png、jpg、jpeg格式，头像大小限20K。</div>
                </el-upload>        
              </div>
            </el-form-item>
            <el-form-item prop="port" label="短信端口号：">
              <div v-if="channelDrawerTitle === '新增Chatbot'">
                <el-input size="small" v-if="(channelForm.serviceCode !== null && channelForm.serviceCode !== '')&&(channelForm.chatbotId === null || channelForm.chatbotId === '')" maxlength="21" show-word-limit disabled v-model="''+channelForm.serviceCode"></el-input>
                <el-input size="small" v-else-if="(channelForm.serviceCode !== null && channelForm.serviceCode !== '')&&(channelForm.chatbotId !== null && channelForm.chatbotId !== '')" maxlength="21" show-word-limit disabled v-model="''+channelForm.serviceCode + channelForm.chatbotId"></el-input>
                <el-input size="small" v-else maxlength="21" show-word-limit disabled ></el-input>
              </div>
              <div v-if="channelDrawerTitle === '变更Chatbot'">
                <el-input size="small"  maxlength="21" show-word-limit disabled v-model="channelForm.port"></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="signature" label="签名：">
              <el-input class="limitWord" size="small" maxlength="20" :disabled="disEdit" show-word-limit v-model="channelForm.signature"></el-input>
            </el-form-item>
            <el-form-item prop="industryType" label="行业类型：">
              <el-select v-model="channelForm.industryType" clearable size="small" placeholder="请选择行业类型">
                <el-option
                  v-for="item in industryTypeList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="actualIssueIndustry" label="应用行业：">
              <el-select v-model="channelForm.actualIssueIndustry" clearable size="small" placeholder="请选择应用行业">
                <el-option
                  v-for="item in actualIssueIndustryList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="providerRadio" label="Chatbot提供者：">
              <el-radio-group v-model="channelForm.providerRadio">
                <el-radio :label="1">显示</el-radio>
                <el-radio :label="0">不显示</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="csp" label="关联的CSP：">
              <el-select v-model="channelForm.csp" :disabled="disEdit" clearable size="small" placeholder="请选择关联的CSP">
                <el-option
                  v-for="item in cspList"
                  :key="item.cspId"
                  :label="item.name"
                  :value="item.cspId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="serviceDesc" label="服务描述：">
              <el-input
                type="textarea"
                placeholder="请输入"
                maxlength="160"
                :autosize="{ minRows: 4, maxRows: 6 }"
                show-word-limit
                v-model="channelForm.serviceDesc"
              ></el-input>
            </el-form-item>        
            <el-form-item prop="fileAddressUrl" label="附件：">
              <el-upload
                class="upload-demo"
                action="#"
                :http-request="uploadPictures1"
                :before-upload="beforeAvatarUpload1"
                :limit="1"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">选择文件</el-button>
                <div slot="tip" class="el-upload__tip">支持上传的文件类型为：pdf、doc、jpg、jpeg、gif、docx、rar，单个附件大小限5M，限上传一个文件。</div>
              </el-upload>        
            </el-form-item>
            <el-form-item prop="whiteList" label="Chatbot调试白名单：">
              <el-input
                type="textarea"
                placeholder="请输入手机号码"
                maxlength="2048"
                :autosize="{ minRows: 4, maxRows: 6 }"
                show-word-limit
                v-model="channelForm.whiteList"
              ></el-input>
              <div class="tip">号码之间用逗号隔开。</div>
            </el-form-item>
            <el-form-item prop="operator" label="运营商：">
              <el-select v-model="channelForm.operator" clearable size="small" placeholder="请选择运营商">
                <el-option
                  v-for="item in operatorList"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="business" label="业务类型：">
              <el-checkbox-group v-model="channelForm.business" >
                <el-checkbox v-for="item in businessTypeList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item prop="aiRadio" label="AI智能交互：">
              <el-radio-group v-model="channelForm.aiRadio">
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="voiceRadio" label="语音识别ASR：">
              <el-radio-group v-model="channelForm.voiceRadio">
                <el-radio :label="1">支持</el-radio>
                <el-radio :label="0">不支持</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="更多信息" name="moreInfo">
            <el-form-item prop="serviceTermsUrl" label="服务条款URL：">
              <el-input class="limitWord" size="small" maxlength="150" show-word-limit v-model="channelForm.serviceTermsUrl"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="Chatbot邮箱：">
              <el-input class="limitWord" size="small" maxlength="50" show-word-limit v-model="channelForm.email"></el-input>
            </el-form-item>
            <el-form-item prop="chatbotHomeUrl" label="Chatbot主页：">
              <el-input class="limitWord" size="small" maxlength="150" show-word-limit v-model="channelForm.chatbotHomeUrl"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="服务电话：">
              <el-input class="limitWord" size="small" maxlength="21" oninput="value=value.replace(/[^\d]/g,'')" @blur="channelForm.phone = $event.target.value" show-word-limit v-model="channelForm.phone"></el-input>
            </el-form-item>
            <el-form-item prop="areaCode" label="归属区域：">
              <el-cascader
                v-model="channelForm.areaCode"
                :options="areaList"
                size="small"
                :props="defaultParams"
                :show-all-levels="true"
                clearCheckedNodes
                clearable
                ref="cascaderHandle"
                @change="closeDepartment"
              ></el-cascader>
            </el-form-item>
            <el-form-item prop="detailAddress" label="办公地址：">
              <el-input size="small" v-model="channelForm.detailAddress" placeholder="详细地址"></el-input>
            </el-form-item>
            <el-form-item prop="lon" label="经度：">
              <el-input size="small"  show-word-limit v-model="channelForm.lon"></el-input>
            </el-form-item>
            <el-form-item prop="lat" label="纬度：">
              <el-input size="small"  show-word-limit v-model="channelForm.lat"></el-input>
            </el-form-item>
            <el-form-item prop="color" label="主题颜色：">
              <el-color-picker v-model="channelForm.color"></el-color-picker>
            </el-form-item>
            <el-form-item prop="backgroundUrl" label="背景图URL：">
              <div class="chatbotHeaderImg">
                <img v-if="channelForm.backgroundImageUrl" :src="channelForm.backgroundImageUrl" class="avatar">
                <el-upload
                  class="upload-demo1"
                  action="#"
                  :show-file-list="false"
                  :http-request="uploadPictures3"
                  :before-upload="beforeAvatarUpload3">
                  <el-button size="small" type="primary">选择图片</el-button>
                  <div slot="tip" class="el-upload__tip">可上传png、jpg、jpeg格式，图片大小限20K。</div>
                </el-upload>        
              </div>
            </el-form-item>
          </el-collapse-item>
        </el-collapse >
        <el-form-item prop="parmentDepartment" label="">
          <!-- <el-button  type="primary" size="small" @click="addConfirm(0)">保存</el-button> -->
          <el-button  type="primary" size="small" v-if="channelDrawerTitle === '新增Chatbot'"  @click="addConfirm" :disabled="isSubmit">提交</el-button>
          <el-button  type="primary" size="small" v-if="channelDrawerTitle === '变更Chatbot'"  @click="editConfirm">提交</el-button>
          <el-button  size="small" @click="closeChannelDrawer">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 查看菜单 -->
    <el-dialog
      class="menuToast"
      title="查看固定菜单"
      :visible.sync="menuToast"
      :close-on-click-modal="false"
      width="800px"
    >
      <div >
        <div v-if="menuReviewStatus === 0">菜单状态：审核中</div>
        <div v-else-if="menuReviewStatus === 1">菜单状态：通过</div>
        <div v-else>菜单状态：不通过</div>
        <div class="bodyMain">
          <el-table
            border
            size="small"
            :data="menuTableData"
            style="width:760px"
          >
            <el-table-column  prop="menuName" label="主菜单" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column  prop="number" label="子菜单" width="160" show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.children.length < 1">--</div>
                <div v-else>
                  <div v-for="(subMenuItem,index) in scope.row.children" :key="index" >
                    <div>{{subMenuItem.menuName}}</div>
                  </div>                  
                </div>
              </template>  
            </el-table-column>
            <el-table-column  prop="productTypeStr" label="操作类型" width="160" show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.children.length < 1">{{scope.row.operation}}</div>
                <div v-else>
                  <div v-for="(subMenuItem,index) in scope.row.children" :key="index" >
                    <div>{{subMenuItem.operation}}</div>
                  </div>                  
                </div>
              </template>  
            </el-table-column>
            <el-table-column  prop="businessTypeStr" label="操作内容" min-width="240" show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.children.length < 1">{{scope.row.cont}}</div>
                <div v-else>
                  <div v-for="(subMenuItem,index) in scope.row.children" :key="index" >
                    <div>{{subMenuItem.cont}}</div>
                  </div>                  
                </div>
              </template>  
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getRcsChannelDetail,uploadFile,addChannel,editChannel,logoutChannel,putAwayChannel,getServiceCodeList,getCspList,getAgentList} from '../../api/channel/api'
import {download,whitePhone} from '../../public'
import {area} from '../../area'
import {industryTypeList,actualIssueIndustryList} from '../../industry'
export default {
  name:'rcsMessage',
  props:{
    tableData: {
      type: Array | Object,
    },
    businessTypeList:{
      type:Array
    },
    customerList:{
      type:Array
    }
  },
  data() {
    const validateWhiteList = (rule,value,callback) =>{
      if(value === '' || value === null){
        callback(new Error('调试白名单不能为空'))
      }else if(!whitePhone(value)){
        callback(new Error('请输入合法的手机号码'))
      }else{
        callback();
      }
    }
    const validateChatbotId = (rule,value,callback) =>{
      if(this.channelForm.serviceCode && this.channelForm.serviceCode.length>=20){
        callback();
      }else{
        if(value === '' || value === null){
          callback(new Error('ChatbotId不能为空'))
        }else{
          callback();
        }
      }
    }
    
    return {
      activeNames:["1"],
      drawerActive:['baseInfo','moreInfo'],
      isDisable:true,
      channelDrawerTitle:'',//新增修改chatbot抽屉标题
      channelDrawer:false,//是否显示chatbot抽屉
      serviceCodeList:[],//服务代码
      // customerList:[],//客户名称列表
      cspList:[], //关联的csp
      agentList:[],//代理商名称
      industryTypeList:industryTypeList,//行业列表
      actualIssueIndustryList:actualIssueIndustryList,//应用行业列表
      areaList:area,
      defaultParams: {
        label: "name",
        value: "code",
        children: "child",
        emitPath: true, //是否返回由该节点所在的各级菜单的值所组成的数组,设置 false，则只返回该节点的值
      },
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
      channelForm:{
        id:null,
        chatbotName:null,//chatbot名称
        serviceCode:null, //服务代码
        customerName:null,//客户名称
        ecId:null, //EC ID
        chatbotId:'', //chatbot ID
        chatbotLogoName:null,//头像文件名
        chatbotLogoUrl:null,//头像
        chatbotLogoCode:null,
        port:null, //短信端口号
        signature:null,//签名
        providerRadio:1, //chatbot提供者
        industryType:null, //行业类型
        actualIssueIndustry:null,//实际下发行业
        csp:null, // 关联的csp
        serviceDesc:null,//服务描述
        fileAddressUrl:null,//附件
        fileName:null,//附件名字
        fileCode:null,//附件code
        whiteList:null,//调试白名单
        operator:null, //运营商
        business:[], //业务类型
        aiRadio:0, //AI智能交互
        voiceRadio:0, //语音识别ASR
        serviceTermsUrl:null,//服务条款Url
        email:null,//chatbot邮箱
        chatbotHomeUrl:null,//chatbot主页
        phone:null,//服务电话
        areaCode:null,
        detailAddress:null,//办公地址
        lon:null,//经度
        lat:null,//纬度
        color:null,//主题颜色
        backgroundImageCode:null,//背景图code
        backgroundImageName:null,//背景图名字
        backgroundImageUrl:null//背景图地址
      },//套餐表单数据
      channelRules: {
        chatbotName:[{ required: true, message: "名称不能为空", trigger: "blur" }],
        serviceCode:[{ required: true, message: "服务代码不能为空", trigger: "change" }],
        customerName:[{ required: true, message: "客户名称不能为空", trigger: "change" }],
        ecId:[{ required: true, message: "代理商名称不能为空", trigger: "change" }],
        chatbotId:[ { required: true,validator:validateChatbotId, trigger: "blur" } ],
        chatbotLogoUrl:[{ required: true, message: "Chatbot头像不能为空", trigger: "blur" }],
        signature:[{ required: true, message: "签名不能为空", trigger: "blur" }],
        providerRadio:[{ required: true, message: "请选择是否显示提供者", trigger: "blur" }],
        industryType:[{ required: true, message: "行业类型不能为空", trigger: "change" }],
        actualIssueIndustry:[{ required: true, message: "行业类型不能为空", trigger: "change" }],
        csp:[{ required: true, message: "关联的CSP不能为空", trigger: "change" }],
        serviceDesc:[{ required: true, message: "服务描述不能为空", trigger: "blur" }],
        whiteList:[{ required: true, validator:validateWhiteList, trigger: "blur" }],
        operator:[{ required: true, message: "运营商不能为空", trigger: "change" }],
        business:[{ required: true, message: "业务类型不能为空", trigger: "change" }],
        aiRadio:[{ required: true, message: "请选择是否支持AI智能交互", trigger: "change" }],
        voiceRadio:[{ required: true, message: "请选择是否支持语音识别ASR", trigger: "change" }],
        email:[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
      },//套餐表单验证规则
      fileList:[],//附件列表
      selectData:[],
      menuTableData:[],
      menuReviewStatus:null,
      menuToast:false,//查看固定菜单弹窗
      timer: null,
      disEdit:false,
      nopassIcon:require('../../assets/images/nopass_icon.svg'),
      passIcon:require('../../assets/images/pass_icon.svg'),
      isSubmit:false,//是否禁用提交按钮
      tableHeight:window.innerHeight - 369 +'',
    };
  },
  methods: {
    // 表格展开时获取对应的账户信息
    handleExpand(row,expandedRows){
      getRcsChannelDetail({id:row.id}).then(res=>{
        if(res.status == 0){
          this.tableData.map(item=>{
            if(item.id === row.id){
              res.data.configInfo.authority1 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(0,1):null
              res.data.configInfo.authority2 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(1,2):null 
              res.data.configInfo.authority3 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(2,3):null 
              res.data.configInfo.authority4 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(3,4):null 
              res.data.configInfo.authority5 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(4,5):null 
              res.data.configInfo.authority6 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(5,6):null 
              item.baseInfo = res.data.baseInfo
              item.configInfo = res.data.configInfo
              item.moreInfo = res.data.moreInfo
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
      this.isDisable = val.length < 1 ? true : false;
      this.selectData = val
      this.$emit("handleSelectData", val,this.isDisable);
    },
    // 下载附件
    downloadAction(url,fileName){
      download(url,fileName)
    },
    // 查看菜单
    lookMenu(menu,menuReviewStatus){
      // 转换菜单数据格式
      this.menuReviewStatus = null
      this.menuTableData = []
      this.menuReviewStatus = menuReviewStatus
      let menuList = JSON.parse(menu).menu.entries
      let arr = []
      menuList.map(item=>{
        let obj = {}
        if(item.reply){
          obj.menuName = item.reply.displayText
          obj.operation = '建议回复'
          obj.cont = item.reply.postback.data
          obj.children = []
        }else if(item.action){
          if(item.action.urlAction){
            obj.menuName = item.action.displayText
            obj.operation = '打开链接'
            obj.cont = item.action.urlAction.openUrl.url
            obj.children = []
          }else{
            obj.menuName = item.action.displayText
            obj.operation = '拨打电话'
            obj.cont = item.action.dialerAction.dialPhoneNumber.phoneNumber
            obj.children = []
          }
        }else{
          obj.menuName = item.menu.displayText
          let arr2=[]
          item.menu.entries.map(item2=>{
            let obj2 ={}
            if(item2.reply){
              obj2.menuName = item2.reply.displayText
              obj2.operation = '建议回复'
              obj2.cont = item2.reply.postback.data
            }else if(item2.action){
              if(item2.action.urlAction){
                obj2.menuName = item2.action.displayText
                obj2.operation = '打开链接'
                obj2.cont = item2.action.urlAction.openUrl.url
              }else{
                obj2.menuName = item2.action.displayText
                obj2.operation = '拨打电话'
                obj2.cont = item2.action.dialerAction.dialPhoneNumber.phoneNumber
              }
            }
            arr2.push(obj2)
          })
          obj.children = arr2
        }
        arr.push(obj)
      })
      this.menuTableData = arr
      this.menuToast =true
    },
    // 注销
    logoutAction(type,row){
      let ids =[]
      if(type === 1){
        for(let i =0 ;i<this.selectData.length;i++){
          ids.push(this.selectData[i].id)
        }
      }else{
        ids.push(row.id)
      }
      this.$confirm("确定注销已选中的Chatbot账号吗？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          logoutChannel(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'注销成功',
                center:true
              })
              this.undateData()
            }else{
              this.$message({
                // message:res.message,
                message:'注销失败',
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
    // 上架
    putawayAction(type,row){
      let ids =[]
      if(type === 1){
        for(let i =0 ;i<this.selectData.length;i++){
          ids.push(this.selectData[i].id)
        }
      }else{
        ids.push(row.id)
      }
      let params = {ids:ids.toString()}
      putAwayChannel(params).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'上架成功',
            center:true
          })
          this.undateData()
        }else{
          this.$message({
            // message:res.message,
            message:'上架失败',
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
    // 新建chatbot
    createAction(row){
      this.channelDrawerTitle = '新增Chatbot'
      this.disEdit = false
      this.channelForm.id=null,
      this.channelForm.chatbotName=null,//chatbot名称
      this.channelForm.customerName = null,//客户名称
      this.channelForm.serviceCode=null, //服务代码
      this.channelForm.ecId=null, //代理商名称编码
      this.channelForm.chatbotId='', //chatbot ID
      this.channelForm.chatbotLogoName = null,//头像文件名
      this.channelForm.chatbotLogoUrl=null,//头像
      this.channelForm.chatbotLogoCode = null,//头像code
      // this.channelForm.port=null, //短信端口号
      this.channelForm.signature=null,//签名
      this.channelForm.providerRadio=1, //chatbot提供者
      this.channelForm.industryType=null, //行业类型
      this.channelForm.actualIssueIndustry = null,//应用行业
      this.channelForm.csp=null, // 关联的csp
      this.channelForm.serviceDesc=null,//服务描述
      this.channelForm.fileAddressUrl = null,//附件
      this.channelForm.fileName = null,//附件名字
      this.channelForm.fileCode = null,//附件code
      this.channelForm.whiteList=null,//调试白名单
      this.channelForm.operator=null, //运营商
      this.channelForm.business=[], //业务类型
      this.channelForm.aiRadio=0, //AI智能交互
      this.channelForm.voiceRadio=0, //语音识别ASR
      this.channelForm.serviceTermsUrl=null,//服务条款Url
      this.channelForm.email=null,//chatbot邮箱
      this.channelForm.chatbotHomeUrl=null,//chatbot主页
      this.channelForm.phone=null,//服务电话
      this.channelForm.areaCode=null,
      this.channelForm.detailAddress=null,//办公地址
      this.channelForm.lon=null,//经度
      this.channelForm.lat=null,//纬度
      this.channelForm.color=null,//主题颜色
      this.channelForm.backgroundImageCode = null,//背景图code
      this.channelForm.backgroundImageName = null,//背景图名字
      this.channelForm.backgroundImageUrl = null,//背景图地址
      this.fileList = []
      this.getCsp()
      this.getAgent()
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
              name: _this.channelForm.chatbotName,
              customerNum:_this.channelForm.customerName,
              serviceCode: _this.channelForm.serviceCode,
              agentCustomerNum:_this.channelForm.ecId, 
              number: ''+ _this.channelForm.serviceCode + _this.channelForm.chatbotId,
              chatbotLogoName:_this.channelForm.chatbotLogoName,
              chatbotLogoUrl:_this.channelForm.chatbotLogoUrl,
              chatbotLogoCode:_this.channelForm.chatbotLogoCode,
              sms:  ''+_this.channelForm.serviceCode + _this.channelForm.chatbotId,
              autograph: _this.channelForm.signature,
              category: _this.channelForm.industryType,
              actualIssueIndustry:_this.channelForm.actualIssueIndustry,
              providerSwitchCode: _this.channelForm.providerRadio,
              cspId:_this.channelForm.csp,
              description: _this.channelForm.serviceDesc,
              appendixCode:_this.channelForm.fileCode,
              appendixName:_this.channelForm.fileName,
              appendixUrl:_this.channelForm.fileAddressUrl,
              debugWhiteAddress: _this.channelForm.whiteList,
              operator: _this.channelForm.operator,
              businessTypeIdList: _this.channelForm.business,
              aiInteractSupport: _this.channelForm.aiRadio,
              voiceRecognizeSupport: _this.channelForm.voiceRadio,
              tcPage: _this.channelForm.serviceTermsUrl,
              chatbotEmail: _this.channelForm.email,
              chatbotWebsite: _this.channelForm.chatbotHomeUrl,
              callback: _this.channelForm.phone,
              regionCode:_this.channelForm.areaCode ? _this.channelForm.areaCode[0] :null,
              provinceCode:_this.channelForm.areaCode ? _this.channelForm.areaCode[1] :null,
              cityCode:_this.channelForm.areaCode ? _this.channelForm.areaCode[2] :null,
              address:_this.channelForm.detailAddress,
              lat: _this.channelForm.lat,
              lon: _this.channelForm.lon,
              colour: _this.channelForm.color,
              backgroundImageCode:_this.channelForm.backgroundImageCode,
              backgroundImageName:_this.channelForm.backgroundImageName,
              backgroundImageUrl:_this.channelForm.backgroundImageUrl,
              productType:1,
            }
            addChannel(params).then(res=>{
              _this.isSubmit = false
              if(res.status == 0){
                _this.$message.success({
                  message:'新增Chatbot成功',
                  center:true
                })
                _this.undateData()
                _this.closeChannelDrawer()
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
    // 变更chatbot
    changeChannelAction(row){
      this.channelDrawerTitle = '变更Chatbot'
      this.disEdit = true
      let arr=[]
      let arr2 =[]
      getRcsChannelDetail({id:row.id}).then(res=>{
        if(res.status == 0){
          if(res.data.baseInfo.appendixName && res.data.baseInfo.appendixUrl){
            let obj = {}
            obj.name = res.data.baseInfo.appendixName
            obj.url = res.data.baseInfo.appendixUrl
            this.fileList.push(obj);
            arr2.push(obj)
            this.fileList = arr2
          }else{
            this.fileList = []
          }
          this.channelForm.id = row.id
          this.channelForm.chatbotName=res.data.baseInfo.name,//chatbot名称
          this.channelForm.customerName = res.data.baseInfo.customerNum,//客户名称
          this.channelForm.serviceCode=res.data.baseInfo.serviceCode, //服务代码
          this.channelForm.ecId=res.data.baseInfo.agentCustomerNum, //代理商名称编码
          this.channelForm.chatbotId=res.data.baseInfo.number, //chatbot ID
          this.channelForm.chatbotLogoName = res.data.baseInfo.chatbotLogoName,//头像文件名
          this.channelForm.chatbotLogoUrl=res.data.baseInfo.chatbotLogoUrl,//头像
          this.channelForm.chatbotLogoCode = res.data.baseInfo.chatbotLogoCode,//头像code
          this.channelForm.port=res.data.baseInfo.sms, //短信端口号
          this.channelForm.signature=res.data.baseInfo.autograph,//签名
          this.channelForm.providerRadio=Number(res.data.baseInfo.providerSwitchCode), //chatbot提供者
          this.channelForm.industryType=Number(res.data.baseInfo.category), //行业类型
          this.channelForm.actualIssueIndustry=Number(res.data.baseInfo.actualIssueIndustry),//应用行业
          this.channelForm.csp=res.data.baseInfo.cspId, // 关联的csp
          this.channelForm.serviceDesc=res.data.baseInfo.description,//服务描述
          this.channelForm.fileAddressUrl = res.data.baseInfo.appendixUrl,//附件
          this.channelForm.fileName = res.data.baseInfo.appendixName,//附件名字
          this.channelForm.fileCode = res.data.baseInfo.appendixCode,//附件code
          this.channelForm.whiteList=res.data.baseInfo.debugWhiteAddress,//调试白名单
          this.channelForm.operator=Number(res.data.baseInfo.operator), //运营商
          this.channelForm.business=res.data.baseInfo.businessTypeList, //业务类型
          this.channelForm.aiRadio=res.data.baseInfo.aiInteractSupport, //AI智能交互
          this.channelForm.voiceRadio=res.data.baseInfo.voiceRecognizeSupport, //语音识别ASR
          this.channelForm.serviceTermsUrl=res.data.moreInfo.tcPage,//服务条款Url
          this.channelForm.email=res.data.moreInfo.chatbotEmail,//chatbot邮箱
          this.channelForm.chatbotHomeUrl=res.data.moreInfo.chatbotWebsite,//chatbot主页
          this.channelForm.phone=res.data.moreInfo.callback,//服务电话
          arr.push(res.data.baseInfo.regionCode)
          arr.push(res.data.baseInfo.provinceCode)
          arr.push(res.data.baseInfo.cityCode)
          this.channelForm.areaCode=arr,
          this.channelForm.detailAddress=res.data.moreInfo.address,//办公地址
          this.channelForm.lon=res.data.moreInfo.lon,//经度
          this.channelForm.lat=res.data.moreInfo.lat,//纬度
          this.channelForm.color=res.data.moreInfo.colour,//主题颜色
          this.channelForm.backgroundImageCode = res.data.moreInfo.backgroundImageCode,//背景图code
          this.channelForm.backgroundImageName = res.data.moreInfo.backgroundImageName,//背景图名字
          this.channelForm.backgroundImageUrl = res.data.moreInfo.backgroundImageUrl//背景图地址
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
      this.getCsp()
      this.getAgent()
      this.channelDrawer = true
    },
    // 变更确认
    editConfirm(){
      this.$refs.channelForm.validate((valid)=>{
        if(valid){
          let params ={  
            id:this.channelForm.id,
            name: this.channelForm.chatbotName,
            customerNum:this.channelForm.customerName,
            serviceCode: this.channelForm.serviceCode,
            agentCustomerNum:this.channelForm.ecId, 
            number: this.channelForm.chatbotId,
            chatbotLogoName:this.channelForm.chatbotLogoUrl,
            chatbotLogoUrl:this.channelForm.chatbotLogoUrl,
            chatbotLogoCode:this.channelForm.chatbotLogoCode,
            sms:this.channelForm.port,
            autograph: this.channelForm.signature,
            category: this.channelForm.industryType,
            actualIssueIndustry:this.channelForm.actualIssueIndustry,
            providerSwitchCode: this.channelForm.providerRadio,
            cspId:this.channelForm.csp,
            description: this.channelForm.serviceDesc,
            appendixCode:this.channelForm.fileCode,
            appendixName:this.channelForm.fileName,
            appendixUrl:this.channelForm.fileAddressUrl,
            debugWhiteAddress: this.channelForm.whiteList,
            operator: this.channelForm.operator,
            businessTypeIdList: this.channelForm.business,
            aiInteractSupport: this.channelForm.aiRadio,
            voiceRecognizeSupport: this.channelForm.voiceRadio,
            tcPage: this.channelForm.serviceTermsUrl,
            chatbotEmail: this.channelForm.email,
            chatbotWebsite: this.channelForm.chatbotHomeUrl,
            callback: this.channelForm.phone,
            regionCode:this.channelForm.areaCode ? this.channelForm.areaCode[0] :null,
            provinceCode:this.channelForm.areaCode ? this.channelForm.areaCode[1] :null,
            cityCode:this.channelForm.areaCode ? this.channelForm.areaCode[2] :null,
            address:this.channelForm.detailAddress,
            lat: this.channelForm.lat,
            lon: this.channelForm.lon,
            colour: this.channelForm.color,
            backgroundImageCode:this.channelForm.backgroundImageCode,
            backgroundImageName:this.channelForm.backgroundImageName,
            backgroundImageUrl:this.channelForm.backgroundImageUrl,
            productType:1
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
    // 获取服务代码
    getServiceCode(customerNum){
      getServiceCodeList({customerNum:customerNum}).then(res=>{
        if(res.status == 0){
          this.serviceCodeList = res.data
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
    // 获取csp列表
    getCsp(){
      getCspList().then(res=>{
        if(res.status == 0){
          this.cspList = res.data
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
    // 获取代理商列表
    getAgent(){
      getAgentList().then(res=>{
        if(res.status == 0){
          this.agentList = res.data
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
    // 切换客户
    changeCustomer(val){
      this.getServiceCode(val)
      this.channelForm.serviceCode = null
    },
    // 切换服务代码
    changeServiceCode(val){
      // 重置chatbotId，防止先输入值超过位数
      this.channelForm.chatbotId = ''
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
    // 关闭归属区域级联选择器
    closeDepartment(val){
      this.$refs.cascaderHandle.dropDownVisible = false
    },
    // 上传chatbot头像
    uploadPictures(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      uploadFile(formData).then((res) => {
        if (res.status == 0) {
          this.channelForm.chatbotLogoUrl = res.data.url
          this.channelForm.chatbotLogoName = res.data.fileName,
          this.channelForm.chatbotLogoCode = res.data.code
          this.$refs.channelForm.clearValidate('chatbotLogoUrl');
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
    // 上传chatbot头像前
    beforeAvatarUpload(file) {
      let fileTYpe = file.name.substring(file.name.lastIndexOf('.')+1)
      const isJPG = (fileTYpe === 'png' || fileTYpe === 'jpg'|| fileTYpe === 'jpeg')
      const isLt2M = file.size / 1024  < 20;
      if (!isJPG) {
        this.$message.error('图片格式应为png、jpg、jpeg!');
      }
      if (!isLt2M) {
        this.$message.error({
          message:'图片大小不能超过 20K!',
          center:true
        });
      }
      return isJPG && isLt2M;
    }, 
    // 上传附件
    uploadPictures1(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      uploadFile(formData).then((res) => {
        if (res.status == 0) {
          this.channelForm.fileAddressUrl = res.data.url
          this.channelForm.fileName = res.data.fileName
          this.channelForm.fileCode = res.data.code
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
    beforeAvatarUpload1(file) {
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
          message:'Chatbot 头像不能超过 5M!',
          center:true
        });
      }
      return isJPG && isLt2M;
    },
    // 限制上传附件的数量
    handleExceed(files, fileList){
      this.$message.error({
        message:'只能上传一个附件',
        center:true
      });
    },
    // 移除附件
    handleRemove(file, fileList){
      this.channelForm.fileAddressUrl = null
      this.channelForm.fileName = null
      this.channelForm.fileCode = null
    },
    // 上传背景图
    uploadPictures3(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      uploadFile(formData).then((res) => {
        if (res.status == 0) {
          this.channelForm.backgroundImageCode = res.data.code,
          this.channelForm.backgroundImageName = res.data.fileName,
          this.channelForm.backgroundImageUrl = res.data.url,
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
    // 上传背景图前
    beforeAvatarUpload3(file) {
      let fileTYpe = file.name.substring(file.name.lastIndexOf('.')+1)
      const isJPG = (fileTYpe === 'png' || fileTYpe === 'jpg'|| fileTYpe === 'jpeg')
      const isLt2M = file.size / 1024  < 20;
      if (!isJPG) {
        this.$message.error({
          message:'图片格式应为png、jpg、jpeg!',
          center:true
        });
      }
      if (!isLt2M) {
        this.$message.error({
          message:'图片不能超过 20K!',
          center:true
        });
      }
      return isJPG && isLt2M;
    },
  },
  mounted(){
  },
};
</script>

<style  scoped lang="less">
.table /deep/ .el-collapse-item__wrap{
  background-color:#F8F8FA ;
  border: 0;
}
.table /deep/ .el-collapse-item__header{
  background-color:#F8F8FA ;
}
.txt1{
  color: #FE9636;
}
.txt2{
  cursor: pointer;
  color: #368CFE;
}
.showColor{
  display: flex;
  align-items: center;
  .colorPick{
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    margin-right: 12px;
    border-radius: 4px;
    display: inline-block;
  }
}
.headerImg{
  display: flex;
  align-items: center;
}
.lookMenu{
  cursor: pointer;
  color: #368CFE;
}
.bussiness{
  display: flex;
  .bussinessItem{
    display: flex;
    align-items: center;
    img{
      width: 14px;
      height: 14px;
      margin-right: 6px;
    }
  }
}
.active0{
  width: 70px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  border-radius: 4px;
  font-size: 12px;
  display: inline-block;
  background: #368CFE;
  color: #fff;
}
.active2{
  width: 70px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  border-radius: 4px;
  font-size: 12px;
  display: inline-block;
  background:  #2BD990;
  color: #fff;
}
.showToken{
  margin-left: 20px;
  cursor: pointer;
  color: #368CFE;
}
/deep/ .el-collapse-item__wrap{
  padding: 0 24px !important;
}

.chatbotHeaderImg{
  display: flex;
  .avatar{
    margin-right: 20px;
  }
}
.el-upload__tip {
  font-size: 12px;
  color: #999;
  line-height: 20px;
}
/deep/ .distpicker-address-wrapper select{
  width: 83px;
  padding: 0;
  height: 32px;
  font-size: 14px;
}
.tip{
  color: #999;
  font-size: 12px;
  line-height: 20px !important;
  margin-top: 5px;
}
.el-checkbox{
  display: block;
}
.menuToast{
  /deep/ .el-dialog__body{
    padding: 0 20px 30px;
  }
  .bodyMain{
    margin-top: 30px;
  }
}
.limitWord /deep/ .el-input__suffix{
  top: 0 !important;
  right: 1px;
}
.limitWord /deep/ .el-input__inner{
  padding-right: 46px !important;
}

</style>