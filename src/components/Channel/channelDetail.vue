<template>
  <div class="channelDetail">
    <div v-if="productType == 1"> 
      <el-collapse v-model="active" class="info">
        <el-collapse-item title="基本信息" name="1"  >
          <div class="separate">
            <div class="cont"><span class="lable">状态：</span>{{detailData.baseInfo.chatbotStatusStr}}</div>
            <div class="cont"><span class="lable">更新时间：</span>{{detailData.baseInfo.updateTime}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">Chatbot名称：</span>{{detailData.baseInfo.name}}</div>
            <div class="cont"><span class="lable">服务代码：</span>{{detailData.baseInfo.serviceCode}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">客户名称：</span>{{detailData.baseInfo.customerName}}</div>
            <div class="cont"><span class="lable">EC ID：</span>{{detailData.baseInfo.agentCustomerNum}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">归属区域：</span>{{detailData.baseInfo.regionCodeStr}}-{{detailData.baseInfo.provinceCodeStr}}-{{detailData.baseInfo.cityCodeStr}}</div>
            <div class="cont"><span class="lable">代理商名称：</span>{{detailData.baseInfo.agentCustomerName}}</div>
          </div>
          <div><span class="lable">Chatbot ID：</span>{{detailData.baseInfo.number}}</div>
          <div class="haveImg"><span class="lable">Chatbot 头像：</span><img class="chatBotImg" :src="detailData.baseInfo.chatbotLogoUrl"></div>
          <div><span class="lable">短信端口号：</span>{{detailData.baseInfo.sms}}</div>
          <div><span class="lable">签名：</span>{{detailData.baseInfo.autograph}}</div>
          <div class="cont">
            <span class="lable">Chatbot提供者：</span>
            <span class="txt1" >{{detailData.baseInfo.providerSwitchCode == 1?'显示':'不显示'}}</span>
          </div>
          <div><span class="lable">行业类型：</span>{{detailData.baseInfo.categoryStr}}</div>
          <div><span class="lable">关联的CSP：</span>{{detailData.baseInfo.cspName}}</div>
          <div><span class="lable">服务描述：</span>{{detailData.baseInfo.description}}</div>
          <div><span class="lable">附件：</span><span @click="downloadAction(detailData.baseInfo.appendixUrl,detailData.baseInfo.appendixName)" class="txt2">{{detailData.baseInfo.appendixName}}</span></div>
          <div><span class="lable">Chatbot调试白名单：</span>{{detailData.baseInfo.debugWhiteAddress}}</div>
          <div class="separate">
            <div class="cont">
              <span class="lable">运营商：</span>
              <span v-if="detailData.baseInfo.operator == 0">三网</span>
              <span v-if="detailData.baseInfo.operator == 1">移动</span>
              <span v-if="detailData.baseInfo.operator == 2">电信</span>
              <span v-if="detailData.baseInfo.operator == 3">联通</span>
            </div>
            <div class="cont">
              <span class="lable">业务类型：</span>
              <div class="bussiness" >
                <div class="bussinessSpan" v-for="(item1,index2) in detailData.baseInfo.businessTypeStrList" :key="index2">{{item1}} <span v-show="index2 !== detailData.baseInfo.businessTypeStrList.length-1">|&nbsp;</span></div>
              </div>
            </div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">AI智能交互：</span>{{detailData.baseInfo.aiInteractSupport == 1 ? '支持':'不支持'}}</div>
            <div class="cont"><span class="lable">语音识别ASR：</span>{{detailData.baseInfo.voiceRecognizeSupport == 1 ? '支持':'不支持'}}</div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="配置信息" name="2" >
          <div class="headerImg">
            <span class="lable">认证状态：</span>
            <span class="active0" v-if="detailData.configInfo.isAuth == 0">未认证</span>
            <span class="active2" v-if="detailData.configInfo.isAuth == 1">已认证</span>
          </div>
          <div><span class="lable">认证主体：</span>{{detailData.configInfo.authName}}</div>
          <div><span class="lable">认证有效期：</span>{{detailData.configInfo.authExpires}}</div>
          <div><span class="lable">认证机构：</span>{{detailData.configInfo.authOrg}}</div>
          <div class="cont"> 
            <span class="lable">固定菜单：</span>
            <span class="lookMenu" v-if="detailData.configInfo.menu" @click="lookMenu(detailData.configInfo.menu,detailData.configInfo.menuReviewStatus)">查看菜单</span>
            <span v-else >暂无配置</span>
          </div>
          <div class="bussiness">
            <span class="lable">业务权限：</span>
            <div>
              <div class="bussinessItem" v-show="detailData.configInfo.state !== null"><img :src="detailData.configInfo.authority1 == 0 ? nopassIcon:passIcon"><span>支持主动消息下发</span></div>
              <div class="bussinessItem" v-show="detailData.configInfo.state !== null"><img :src="detailData.configInfo.authority2 == 0 ? nopassIcon:passIcon"><span>支持上行触发消息下发</span></div>
              <div class="bussinessItem" v-show="detailData.configInfo.state !== null"><img :src="detailData.configInfo.authority3 == 0 ? nopassIcon:passIcon"><span>容许回落</span></div>
              <div class="bussinessItem" v-show="detailData.configInfo.state !== null"><img :src="detailData.configInfo.authority4 == 0 ? nopassIcon:passIcon"><span>支持上行UP1.0消息</span></div>
              <div class="bussinessItem" v-show="detailData.configInfo.state !== null"><img :src="detailData.configInfo.authority5 == 0 ? nopassIcon:passIcon"><span>允许上行</span></div>
              <div class="bussinessItem" v-show="detailData.configInfo.state !== null"><img :src="detailData.configInfo.authority6 == 0 ? nopassIcon:passIcon"><span>允许下行</span></div>
            </div>
          </div>
          <div><span class="lable">最大发送速率：</span>{{detailData.configInfo.concurrent}}</div>
          <div class="separate">
            <div class="cont"><span class="lable">日最大发送量：</span>{{detailData.configInfo.amount === 0 ? '不限制': detailData.configInfo.amount}}</div>
            <div class="cont"><span class="lable">月最大发送量：</span>{{detailData.configInfo.mamount}}</div>
          </div>
          <div class="separate">
            <div class="cont">
              <span class="lable">接入类型：</span>
              <span v-if="detailData.configInfo.serviceRange === 0">省内</span>
              <span v-if="detailData.configInfo.serviceRange === 1">全网</span>
              <span v-if="detailData.configInfo.serviceRange === 2">其他</span>
            </div>
            <div class="cont"><span class="lable">媒体大小上限：</span>{{detailData.configInfo.filesizeLimit}}M</div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="更多信息" name="3" >
          <div><span class="lable">服务条款：</span>{{detailData.moreInfo.tcPage}}</div>
          <div><span class="lable">Chatbot邮箱：</span>{{detailData.moreInfo.chatbotEmail}}</div>
          <div><span class="lable">Chatbot主页：</span>{{detailData.moreInfo.chatbotWebsite}}</div>
          <div><span class="lable">服务电话：</span>{{detailData.moreInfo.callback}}</div>
          <div><span class="lable">办公地址：</span>{{detailData.moreInfo.address}}</div>
          <div><span class="lable">经度：</span>{{detailData.moreInfo.lon}}</div>
          <div><span class="lable">纬度：</span>{{detailData.moreInfo.lat}}</div>
          <div class="showColor"><span class="lable">主题颜色：</span ><span class="colorPick" :style="{'color':detailData.moreInfo.colour,'backgroundColor':detailData.moreInfo.colour}"></span>{{detailData.moreInfo.colour}}</div>
          <div class="haveImg"><span class="lable">背景图：</span><img class="chatBotImg" :src="detailData.moreInfo.backgroundImageUrl"></div>
        </el-collapse-item>
      </el-collapse >
      <!-- 查看菜单 -->
      <el-dialog
        class="menuToast"
        title="查看固定菜单"
        :visible.sync="menuToast"
        :close-on-click-modal="false"
        :append-to-body="true"
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
    <div v-else-if="productType == 2">
      <el-collapse v-model="active" >
        <el-collapse-item title="基本信息"  name="1" >
          <div class="separate">
            <div class="cont"><span class="lable">状态：</span>{{detailData.baseInfo.statusStr}}</div>
            <div class="cont"><span class="lable">更新时间：</span>{{detailData.baseInfo.updateTime}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">通道协议：</span>{{detailData.baseInfo.sendMethod == 1 ? 'HTTP':'CMPP' }}</div>
            <div class="cont"><span class="lable">通道名称：</span>{{detailData.baseInfo.name}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">通道账号：</span>{{detailData.baseInfo.number}}</div>
            <div class="cont"><span class="lable">服务代码：</span>{{detailData.baseInfo.serviceCode}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">供应商名称：</span>{{detailData.baseInfo.supplierName}}</div>
            <div class="cont">
              <span class="lable">通道类型：</span>
              <span v-if="detailData.baseInfo.type === 1 ">直连</span>
              <span v-if="detailData.baseInfo.type === 2 ">非直连</span>
              <span v-if="detailData.baseInfo.type === 3 ">自有</span>
            </div>
          </div>
          <div class="separate">
            <div class="cont">
              <span class="lable">运营商类型：</span>
              <span v-if="detailData.baseInfo.operator == 0">三网</span>
              <span v-if="detailData.baseInfo.operator == 1">移动</span>
              <span v-if="detailData.baseInfo.operator == 2">电信</span>
              <span v-if="detailData.baseInfo.operator == 3">联通</span>
            </div>
            <div class="cont">
              <span class="lable">发送号码类型：</span>
              <span v-if="detailData.baseInfo.sendPhoneType == 0">全网</span>
              <span v-if="detailData.baseInfo.sendPhoneType == 1">省网</span>
              <span v-if="detailData.baseInfo.sendPhoneType == 2">市网</span>
            </div>
          </div>
          <div class="separate">
            <div class="cont">
              <span class="lable">业务类型：</span>
              <div class="bussiness" >
                <div class="bussinessSpan" v-for="(item1,index2) in detailData.baseInfo.businessTypeStrList" :key="index2">{{item1}} <span v-show="index2 !== detailData.baseInfo.businessTypeStrList.length-1">|&nbsp;</span></div>
              </div>
            </div>
            <div class="cont"><span class="lable">业务代码：</span>{{detailData.baseInfo.businessCode}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">扩展码位数：</span>{{detailData.baseInfo.expandNumber===0 ? '不支持':detailData.baseInfo.expandNumber}}</div>
            <div class="cont"><span class="lable">长短信：</span>{{detailData.baseInfo.longMessageSupport===0 ? '不支持':'支持'}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">内容包含链接：</span>{{detailData.baseInfo.contentContainLinkSupport===0 ? '不支持':'支持'}}</div>
            <div class="cont"><span class="lable">虚拟运营商：</span>{{detailData.baseInfo.virtualOperatorSupport===0 ? '不支持':'支持'}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">支持上行：</span>{{detailData.baseInfo.upstreamSupport === 0 ? '不支持':'支持'}}</div>
            <div class="cont">
              <span class="lable">签名方式：</span>
              <span v-if="detailData.baseInfo.signWay === 0">不限</span>
              <span v-if="detailData.baseInfo.signWay === 1">前置</span>
              <span v-if="detailData.baseInfo.signWay === 2">后置</span>
            </div>
          </div>
          <div class="separate">
            <div class="cont">
              <span class="lable">报备类型：</span>
              <span v-if="detailData.baseInfo.reportType === 0">无需报备</span>
              <span v-if="detailData.baseInfo.reportType === 1">签名</span>
              <span v-if="detailData.baseInfo.reportType === 2">签名+内容</span>
            </div>
            <div class="cont"><span class="lable">内容最大字数：</span>{{detailData.baseInfo.contentMaxAmount==0 ? '不限':detailData.baseInfo.contentMaxAmount}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">发送速度：</span>{{detailData.baseInfo.concurrency}}</div>
            <div class="cont"><span class="lable">通道链接数：</span>{{detailData.baseInfo.linkNum}}</div>
          </div>
          <div class="separate">
            <div class="cont">
              <span class="lable">消息编码：</span>
              <span v-if="detailData.baseInfo.messageCode === 0">UTF-8</span>
              <span v-if="detailData.baseInfo.messageCode === 1">GBK</span>
              <span v-if="detailData.baseInfo.messageCode === 2">GB2312</span>
            </div>
            <div class="cont">
              <span class="lable">路由省市：</span>
              <span>{{detailData.baseInfo.routingProvinceStr}}</span>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="通道参数"  name="2" >
          <div class="separate">
            <div class="cont"><span class="lable">消息发送地址：</span>{{detailData.sendParameter.sendUrl}}</div>
            <div class="cont"><span class="lable">上行拉取地址：</span>{{detailData.sendParameter.upPullUrl}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">状态查询地址：</span>{{detailData.sendParameter.statusQueryUrl}}</div>
            <div class="cont"><span class="lable">是否支持群发：</span>{{detailData.sendParameter.groupSendSupport==0 ? '不支持':'支持'}}</div>
          </div>
          <div><span class="lable">群发组包最大数：</span> {{detailData.sendParameter.groupSendPackageMaxAmount}}</span></div>
        </el-collapse-item>
        <el-collapse-item title="计费信息"  name="3" >
          <div class="separate">
            <div class="cont">
              <span class="lable">计费方式：</span>
              <span v-if="detailData.costInfo.costUnit===0">元/条</span>
              <span v-if="detailData.costInfo.costUnit===1">元/60s</span>
              <span v-if="detailData.costInfo.costUnit===2">元/6s</span>
              <span v-if="detailData.costInfo.costUnit===3">元/会话</span>
            </div>
            <div class="cont"><span class="lable">计费规则：</span>{{detailData.costInfo.costRule == 1 ? '成功':'成功+未知'}}</div>
          </div>
          <div class="separate">
            <div class="cont">
              <span class="lable">成本价：</span>
              <span>{{detailData.costInfo.unitPrice}}</span>
            </div>
            <div class="cont">
              <span class="lable">调拨价：</span>
              <span>{{detailData.costInfo.allocationPriceStr}}</span>
            </div>
          </div>
          <div><span class="lable">备注：</span>{{detailData.costInfo.remark}}</div>
        </el-collapse-item>
      </el-collapse >
    </div>
    <div v-else>
      <el-collapse v-model="active" >
        <el-collapse-item title="基本信息"  name="1">
          <div class="separate">
            <div class="cont"><span class="lable">状态：</span>{{detailData.baseInfo.statusStr}}</div>
            <div class="cont"><span class="lable">更新时间：</span>{{detailData.baseInfo.updateTime}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">通道协议：</span>{{detailData.baseInfo.sendMethod == 1 ? 'HTTP':'CMPP' }}</div>
            <div class="cont"><span class="lable">通道名称：</span>{{detailData.baseInfo.name}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">通道账号：</span>{{detailData.baseInfo.number}}</div>
            <div class="cont"><span class="lable">服务代码：</span>{{detailData.baseInfo.serviceCode}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">供应商名称：</span>{{detailData.baseInfo.supplierName}}</div>
            <div class="cont">
              <span class="lable">通道类型：</span>
              <span v-if="detailData.baseInfo.type === 1 ">直连</span>
              <span v-if="detailData.baseInfo.type === 2 ">非直连</span>
              <span v-if="detailData.baseInfo.type === 3 ">自有</span>
            </div>
          </div>
          <div class="separate">
            <div class="cont">
              <span class="lable">运营商类型：</span>
              <span v-if="detailData.baseInfo.operator == 0">三网</span>
              <span v-if="detailData.baseInfo.operator == 1">移动</span>
              <span v-if="detailData.baseInfo.operator == 2">电信</span>
              <span v-if="detailData.baseInfo.operator == 3">联通</span>
            </div>
            <div class="cont">
              <span class="lable">发送号码类型：</span>
              <span v-if="detailData.baseInfo.sendPhoneType == 0">全网</span>
              <span v-if="detailData.baseInfo.sendPhoneType == 1">省网</span>
              <span v-if="detailData.baseInfo.sendPhoneType == 2">市网</span>
            </div>
          </div>
          <div class="separate">
            <div class="cont">
              <span class="lable">业务类型：</span>
              <div class="bussiness" >
                <div class="bussinessSpan" v-for="(item1,index2) in detailData.baseInfo.businessTypeStrList" :key="index2">{{item1}} <span v-show="index2 !== detailData.baseInfo.businessTypeStrList.length-1">|&nbsp;</span></div>
              </div>
            </div>
            <div class="cont"><span class="lable">业务代码：</span>{{detailData.baseInfo.businessCode}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">扩展码位数：</span>{{detailData.baseInfo.expandNumber===0 ? '不支持':detailData.baseInfo.expandNumber}}</div>
            <div class="cont">
              <span class="lable">签名方式：</span>
              <span v-if="detailData.baseInfo.signWay === 0">不限</span>
              <span v-if="detailData.baseInfo.signWay === 1">前置</span>
              <span v-if="detailData.baseInfo.signWay === 2">后置</span>
            </div>
          </div>
          <div class="separate">
            <div class="cont">
              <span class="lable">报备类型：</span>
              <span v-if="detailData.baseInfo.reportType === 0">无需报备</span>
              <span v-if="detailData.baseInfo.reportType === 1">签名</span>
              <span v-if="detailData.baseInfo.reportType === 2">签名+内容</span>
            </div>
            <div class="cont"><span class="lable">内容最大值(kb)：</span>{{detailData.baseInfo.contentMaxSize}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">发送速度：</span>{{detailData.baseInfo.concurrency}}</div>
            <div class="cont"><span class="lable">通道链接数：</span>{{detailData.baseInfo.linkNum}}</div>
          </div>
          <div class="separate">
            <div class="cont">
              <span class="lable">消息编码：</span>
              <span v-if="detailData.baseInfo.messageCode === 0">UTF-8</span>
              <span v-if="detailData.baseInfo.messageCode === 1">GBK</span>
              <span v-if="detailData.baseInfo.messageCode === 2">GB2312</span>
            </div>
            <div class="cont">
              <span class="lable">路由省市：</span>
              <span>{{detailData.baseInfo.routingProvinceStr}}</span>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="通道参数"  name="2" >
          <div class="separate">
            <div class="cont"><span class="lable">消息发送地址：</span>{{detailData.sendParameter.sendUrl}}</div>
            <div class="cont"><span class="lable">上行拉取地址：</span>{{detailData.sendParameter.upPullUrl}}</div>
          </div>
          <div class="separate">
            <div class="cont"><span class="lable">状态查询地址：</span>{{detailData.sendParameter.statusQueryUrl}}</div>
            <div class="cont"><span class="lable">是否支持群发：</span>{{detailData.sendParameter.groupSendSupport==0 ? '不支持':'支持'}}</div>
          </div>
          <div><span class="lable">群发组包最大数：</span>{{detailData.sendParameter.groupSendPackageMaxAmount}}</div>
        </el-collapse-item>
        <el-collapse-item title="计费信息" name="3" >
          <div class="separate">
            <div class="cont">
              <span class="lable">计费方式：</span>
            <span v-if="detailData.costInfo.costUnit===0">元/条</span>
            <span v-if="detailData.costInfo.costUnit===1">元/60s</span>
            <span v-if="detailData.costInfo.costUnit===2">元/6s</span>
            <span v-if="detailData.costInfo.costUnit===3">元/会话</span>
            </div>
            <div class="cont"><span class="lable">计费规则：</span>{{detailData.costInfo.costRule == 1 ? '成功':'成功+未知'}}</div>
          </div>
          <div class="separate">
            <div class="cont">
              <span class="lable">成本价：</span>
              <span>{{detailData.costInfo.unitPrice}}</span>
            </div>
            <div class="cont">
              <span class="lable">调拨价：</span>
              <span>{{detailData.costInfo.allocationPriceStr}}</span>
            </div>
          </div>
          <div><span class="lable">备注：</span>{{detailData.costInfo.remark}}</div>
        </el-collapse-item>
      </el-collapse >
    </div>
  </div>
</template>
<script>
import {download} from '../../public'

export default {
  name: "channelDetail",
  props:{
    productType:{
      type:Number | String
    },
    detailData:{
      type:Object
    }
  },
  data() {
    return {
      active:['1','2','3'],
      nopassIcon:require('../../assets/images/nopass_icon.svg'),
      passIcon:require('../../assets/images/pass_icon.svg'),
      menuTableData:[],
      menuReviewStatus:null,
      menuToast:false,//查看固定菜单弹窗
    };
  },
  methods: {
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
    // 下载附件
    downloadAction(url,fileName){
      download(url,fileName)
    }
  },
};
</script>

<style lang="less" scoped>
.channelDetail /deep/ .el-collapse-item__content {
  line-height: 36px;
  font-size: 14px;
  color: #333;
  .separate{
    display: flex;
  }
  .cont{
    display: flex;
    width: 50%;
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
    width: 145px !important;
    white-space: nowrap;
  }
  .haveImg{
    display: flex;
    .chatBotImg{
      width: 66px;
      height: 66px;
      display: inline-block;
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
  .active1{
    width: 70px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    border-radius: 4px;
    font-size: 12px;
    display: inline-block;
    background: #FE9636;
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
  .active3{
    width: 70px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    border-radius: 4px;
    font-size: 12px;
    display: inline-block;
    background: #FE3636;
    color: #fff;
  }
}
.lookMenu{
  cursor: pointer;
  color: #368CFE;
}
.txt2{
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
.channelDetail /deep/ .el-collapse-item__wrap{
  background: #fff !important;
  padding: 0 30px 0 67px !important;
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

</style>