<template>
  <div id="message">
    <div class="header">
      <div class="title">收发记录</div>
    </div>
    <div class="container">
      <el-tabs v-model="currentTab" @tab-click="handleClick">
        <!-- 发送记录 -->
        <el-tab-pane label="发送记录" name="first">
          <div class="headerBtn">
            <!-- 左侧菜单 -->
            <div class="headerBtnLeft">
              <el-button-group class="content-first">
                <el-button type="primary" size="small" @click="refresh" class="btn-height">
                  <i class="iconfont iconshuaxin"></i>
                </el-button>
                <el-button type="primary" @click="clearSend" size="small" class="btn-height">
                  <i class="iconfont iconguanbi"></i>
                </el-button>
              </el-button-group>
              <el-select v-model="enterpriseAccountAppId" placeholder="应用" size="small" ref="appSelect" @visible-change="appChange" clearable @change="getSendBatchList">
                <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="sendStatus" placeholder="状态" size="small" ref="statusSelect" @visible-change="statusChange" clearable @change="getSendBatchList" style="margin-right:10px">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-input size="small" placeholder="批次名称或企业账号" v-model="searchContent" style="margin-right:10px">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="getSendBatchList"></i>
              </el-input>
              <el-date-picker
                size="small"
                v-model="time"
                type="daterange"
                :clearable="false"
                range-separator="~"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                @change="getSendBatchList"
                end-placeholder="结束日期"
                style="height:36px;margin-right:10px">
              </el-date-picker>
            </div>
            <!-- 右侧菜单 -->
            <div class="headerBtnRight">
              <el-button size="small" class=" iconBtn active" style="margin-right:3px" v-has="'vmsMessageAllBatchMessageExport'" @click="exportRepeat">
                <i class="iconfont icondaochu"></i>
                导出
              </el-button>
            </div>
          </div>
          <div class="detail-contetn blankData">
            <el-table border size="small" tooltip-effect="dark" v-loading="loading1" :data="sendData" :style="{'color':'#333','min-height': (minHeight || '') + 'px'}"
              :header-cell-style="{ background: '#F4F4F4', color: '#333333','line-height': '22px' }">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <div class="text" v-if="props.row.messageContent && props.row.messageContent.messageType == 'TEXT'">
                    <div class="textTop" style="max-width:600px">{{ props.row.messageContent.content }}</div>
                    <div class="textBottom" v-if="
                        props.row.messageContent.suggestions && props.row.messageContent.suggestions.length > 0
                      ">
                      <span v-for="(item, index) in props.row.messageContent.suggestions" :key="index">
                        <span class="btn" v-if="item.action">{{item.action.displayText}}</span>
                        <span class="btn" v-if="item.reply">{{item.reply.displayText}}</span>
                      </span>
                    </div>
                  </div>
                  <!-- <span v-if="props.row.messageContent.messageType == 'TEXT'">{{ props.row.messageContent.content }}</span> -->
                  <div v-else-if=" props.row.messageContent && props.row.messageContent.messageType == 'FILE'">
                    <fileList :fileData="props.row.messageContent"></fileList>
                    <el-button @click.native.prevent="downLoad(props.row.messageContent.fileGroupDetail.fileName, props.row.messageContent.fileGroupDetail.fileUrl)" type="text" size="small"
                      class="dowImage">
                      <img src="../../assets/images/icon-download.png" alt="" />
                    </el-button>
                  </div>
                  <div v-else-if="props.row.messageContent && props.row.messageContent.messageType == 'CARD'">
                    <cardList :cardData="props.row.messageContent"></cardList>
                  </div>
                  <div v-else-if="props.row.messageContent && props.row.messageContent.messageType == 'VMS'" class="vms">
                    <div v-for="(item, index) in props.row.messageContent.vmsMessageContentList" :key="index">
                      <div v-if="item.type == 0" class="textTop">{{item.content}}</div>
                      <div v-else-if="item.type == 1">
                        <img class="img-class" :src="item.fileDetailUrl">
                      </div>
                      <div v-else-if="item.type == 2">
                        <audio controls="controls" class="audio-class">
                          <source :src="item.fileDetailUrl" type="audio/mpeg" />
                        </audio>
                      </div>
                      <div v-else-if="item.type == 3">
                        <video :src="item.fileDetailUrl" controls="controls" class="video-class"></video>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="批次名称" prop="batchName" show-overflow-tooltip></el-table-column>
              <el-table-column label="应用名称" prop="appName" min-width="150" show-overflow-tooltip></el-table-column>
              <el-table-column label="业务类型" prop="businessTypeName" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column label="消息模板" prop="messageMouldName" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column label="提交时间" prop="createTime" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column label="定时时间" prop="timingTime" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column label="完成时间" prop="finishTime" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column label="发送企业" prop="enterpriseAccountName" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column label="发送用户" prop="createAccountName" show-overflow-tooltip></el-table-column>
              <el-table-column label="批次状态" prop="batchStatus"  show-overflow-tooltip></el-table-column>
              <el-table-column label="提交号码数" prop="submitPhones" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column label="被过滤号码数" prop="filterPhones" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column label="已发送号码数" prop="successPhones" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column label="失败号码数" prop="failPhones" width="90" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                  <!-- <el-tooltip class="item" effect="dark" content="取消发送" placement="top">
                    <img class="operation" src="../../assets/images/icon_24px_not_pass.svg" @click="cancaleSend(scope)">
                  </el-tooltip> -->
                  <span class="operation" v-has="'vmsMessageAllSendRecordPageList'" @click="toDetail(scope)">发送详情</span>
                  <!-- <el-tooltip class="item" effect="dark" content="发送详情" placement="top">
                    <img class="operation" src="../../assets/images/icon_24px_more.svg" v-has="'vmsMessageAllSendRecordPageList'" @click="toDetail(scope)">
                  </el-tooltip> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-footer">
            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page.sync="page1.currentPage" :size-change.sync="page1.currentSize"
              layout="total, sizes, prev, pager, next, jumper" :total="page1.total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 发送详情 -->
        <el-tab-pane label="发送详情" name="second">
          <div class="headerBtn">
            <!-- 左侧菜单 -->
            <div class="headerBtnLeft">
              <el-button-group class="content-first">
                <el-button type="primary" size="small" @click="refreshSendDetail" class="btn-height">
                  <i class="iconfont iconshuaxin"></i>
                </el-button>
                <el-button type="primary" @click="clearSendDetail" size="small" class="btn-height">
                  <i class="iconfont iconguanbi"></i>
                </el-button>
              </el-button-group>
              <!-- <el-select v-model="enterpriseAccountAppId2" placeholder="应用" size="small" ref="appSelect" @visible-change="statusSelect2" clearable>
                <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select> -->
              <el-select v-model="status2" placeholder="状态" size="small" ref="statusSelect2" @visible-change="statusSelect2" clearable @change="getSendDetail" style="margin-right:10px">
                <el-option v-for="item in optionsList3" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-input size="small" placeholder="批次名称或企业账号" v-model="batchName2" style="margin-right:10px">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="getSendDetail"></i>
              </el-input>
            </div>
          </div>
          <div class="detail-contetn blankData">
             <el-table border size="small" tooltip-effect="dark" v-loading="loading2" :data="detailData" :style="{'color':'#333','min-height': (minHeight || '') + 'px','line-height': '27px'}"
              :header-cell-style="{ background: '#F4F4F4', color: '#333333','line-height': '22px' }">
              <el-table-column label="批次名称" prop="batchName" show-overflow-tooltip></el-table-column>
              <el-table-column label="应用名称" prop="appName" show-overflow-tooltip></el-table-column>
              <el-table-column label="业务类型" prop="businessTypeName" show-overflow-tooltip></el-table-column>
              <el-table-column label="手机号码" prop="phoneNumber" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column label="消息模板" prop="messageMouldName" show-overflow-tooltip></el-table-column>
              <el-table-column label="发送结果" prop="sendOfResult" show-overflow-tooltip></el-table-column>
              <el-table-column label="失败原因" prop="failCause" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.failCause || '--'}}</span>
                </template>
              </el-table-column>
              <el-table-column label="提交时间" prop="createTime" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="定时时间" prop="timingTime" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="发送时间" prop="sendTime" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="送达时间" prop="deliverTime" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="发送通道" prop="channelId" show-overflow-tooltip></el-table-column>
              <el-table-column label="发送账号" prop="createAccountName" show-overflow-tooltip></el-table-column>
              <el-table-column label="提交报告" prop="submitReport" show-overflow-tooltip></el-table-column>
              <el-table-column label="状态报告" prop="statusOfReport" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div class="page-footer">
            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page.sync="page2.currentPage" :size-change.sync="page2.currentSize"
              layout="total, sizes, prev, pager, next, jumper" :total="page2.total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 接收记录 -->
        <!-- <el-tab-pane label="接收记录" name="third">
          <div class="headerBtn">
            <div class="headerBtnLeft">
              <el-button-group class="content-first">
                <el-button type="primary" size="small" @click="refreshReceive" class="btn-height">
                  <i class="iconfont iconshuaxin"></i>
                </el-button>
                <el-button type="primary" @click="clearReceive" size="small" class="btn-height">
                  <i class="iconfont iconguanbi"></i>
                </el-button>
              </el-button-group>
              <el-select v-model="enterpriseAccountAppId3" placeholder="应用" size="small" ref="appSelect" @visible-change="appChange" clearable>
                <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="status3" placeholder="状态" size="small" ref="statusSelect" @visible-change="statusChange" clearable style="margin-right:10px">
                <el-option v-for="item in submitStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-input size="small" placeholder="手机号码" v-model="batchName3" style="margin-right:10px">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="getReceiveList"></i>
              </el-input>
            </div>
          </div>
          <div class="detail-content">
            <div class="detail-contetn">
              <el-table border size="small" v-loading="loading3" tooltip-effect="dark" :data="receiveData" :style="{'color':'#333','min-height': (minHeight || '') + 'px'}"
                :header-cell-style="{ background: '#F4F4F4', color: '#333333', 'line-height': '22px' }">
                <el-table-column label="应用" prop="appName" show-overflow-tooltip></el-table-column>
                <el-table-column label="手机号码" prop="phoneNumber"></el-table-column>
                <el-table-column label="接收内容" prop="receiveContent" show-overflow-tooltip></el-table-column>
                <el-table-column label="接收账号" prop="createAccountName"></el-table-column>
                <el-table-column label="接收部门" prop="departmentName"></el-table-column>
                <el-table-column label="接收通道" prop="receiveChannle" show-overflow-tooltip></el-table-column>
                <el-table-column label="送达时间" prop="deliverTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="状态" prop="status"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <span class="operation" v-has="'vmsMessageRecordAllView'" @click="handleDetails(scope.$index, scope.row)">查看记录</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="page-footer">
            <el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :current-page.sync="page3.currentPage" :size-change.sync="page3.currentSize"
              layout="total, sizes, prev, pager, next, jumper" :total="page3.total">
            </el-pagination>
          </div>
          <el-drawer title="收发记录" :visible.sync="drawer" :direction="'rtl'">
            <div ref="chattingContent" id="chattingContent" class="chatting-content" v-loading="chatLoading" @scroll="chatScroll">
              <div v-if="msgs.length == 0">
                <span class="none-message">暂无记录</span>
              </div>
              <div v-else>
                <div v-for="(item, index) of msgs" :key="index">
                  <div v-if="item.direction == 'RECEIVE'" class="chatting-item self clearfix">
                    <div class="msg-date">
                      {{ item.sendTime }}
                    </div>
                    <div class="msg-from">
                      <span class="msg-author">{{ item.messageContent.phoneList}}</span>
                      <img src="../../assets/images/Frame-350@1x.png" alt="">
                    </div>
                    <div class="msg-content" v-if="item.messageContent.messageType == 'TEXT' ">
                      {{ item.messageContent.content }}
                    </div>
                    <div class="msg-content" v-else-if="item.messageContent.messageType == 'FILE'">
                      <fileList :fileData="item.messageContent"></fileList>
                    </div>
                    <div class="msg-content" v-else-if="item.messageContent && item.messageContent.messageType == 'CARD'">
                      <cardList :cardData="item.messageContent"></cardList>
                    </div>
                  </div>
                  <div v-else class="chatting-item other clearfix">
                    <div class="msg-date">
                      {{ item.sendTime }}
                    </div>
                    <div class="msg-from">
                      <img src="../../assets/images/Frame-343@1x.png" alt="">
                      <span class="msg-author">{{ item.appName }}</span>
                    </div>
                    <div class="msg-content" v-if="item.messageContent.messageType == 'TEXT' ">
                      {{ item.messageContent.content }}
                    </div>
                    <div class="msg-content" v-else-if="item.messageContent.messageType == 'FILE'">
                      <fileList :fileData="item.messageContent"></fileList>
                    </div>
                    <div class="msg-content" v-else-if="item.messageContent.messageType = 'CARD'">
                      <cardList :cardData="item.messageContent"></cardList>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-drawer>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>
<script>
import cardList from '../Audit/cardList'
import fileList from '../Audit/fileList'
import { sendBatch, sendDetailList, receiveList, recoedDetail, exportExcel } from '../../api/message/vmsMessage'
import { selectAppList } from '../../api/userName/api'
import { templeteAuditList } from '../../api/audit/api'
import { getBusinessTypeList } from '../../api/material/api'
import  { getChannelList } from '../../api/channel/api'
import dayjs from 'dayjs'
export default {
  components: {
    cardList, fileList
  },
  data() {
    return {
      currentTab: 'first', // 当前是第几个tab页
      minHeight: window.innerHeight - 350 + '',
      messageModule: [], //  消息模板列表
      channelList: [],
      businessTypeList: [],
      /**
       * 发送记录
       *
       * */
      loading1: false, // loading状态
      enterpriseAccountAppId: '',  // 应用id
      sendStatus: '', // 发送状态
      statusOptions: [   // 状态可选列表
        {
          value: 'TO_SEND',
          label: '待发送',
        },
        {
          value: 'SENDING',
          label: '发送中',
        },
        {
          value: 'FINISH',
          label: '发送完成',
        },
        {
          value: 'CANCEL',
          label: '取消',
        },
        {
          value: 'TO_CHECK',
          label: '待审核',
        },
      ],
      searchContent: '', // 批次名称
      time: [], // 时间
      appOptions: [], // 应用列表
      sendData: [],
      page1: {
        currentPage: 1,
        currentSize: 10,
        total: 0
      },
      /**
       * 发送详情
       *
       * */
      enterpriseAccountAppId2: '',  // 应用2的列表
      status2: '', // 状态
      batchName2: '', // 批次名称
      loading2: false, // 发送详情表格loading状态
      detailData: [], // 发送详情表格数据
      batchId: '', // 批次ID
      page2: {
        currentPage: 1,
        currentSize: 10,
        total: 0
      },
      optionsList2: [
        {
          label: '提交成功',
          value: 'SUBMIT',
        },
        {
          label: '提交失败',
          value: 'SUBMIT_FAIL',
        },
      ],
      optionsList3: [
        // 发送详情发送状态列表
        {
          label: '发送中',
          value: 'SENDING',
        },
        {
          label: '发送失败',
          value: 'SEND_FAILED',
        },
        {
          label: '发送成功',
          value: 'SEND_SUCCESS',
        },
      ],
      optionsList04: [
        {
          value: 'TO_SUBMIT',
          label: '待提交',
        },
        {
          value: 'SUBMIT',
          label: '已提交',
        },
        {
          value: 'SUBMIT_FAILED',
          label: '提交失败',
        },
        {
          value: 'SENT',
          label: '已发出',
        },
        {
          value: 'DELIVERED',
          label: '已送达',
        },
        {
          value: 'DISPLAYED',
          label: '已读',
        },
        {
          value: 'FAILED',
          label: '发送失败',
        },
        {
          value: 'SMS',
          label: '转短信',
        },
        {
          value: 'ABNORMAL',
          label: '系统异常',
        },
        {
          value: 'REVOKED',
          label: '已撤销',
        },
        {
          value: 'REVOKED_FAILED',
          label: '撤销失败',
        },
        {
          value: 'TO_REPLY',
          label: '待回复',
        },
        {
          label: '已回复',
          value: 'REPLIED',
        },
      ],
      /**
       * 接收记录
       *
       * */
      loading3: false,
      receiveData: [],
      enterpriseAccountAppId3: '',
      status3: '',
      batchName3: '',
      submitStatusOptions: [
        {
          value: 'TO_REPLY',
          label: '未回复',
        },
        {
          label: '已回复',
          value: 'REPLIED',
        },
      ],
      page3: {
        currentPage: 1,
        currentSize: 10,
        total: 0
      },
      chatLoading: false, // 聊天记录loading
      drawer:false,  // 查看聊天记录抽屉
      tempData: '',
      detailSizeDown: 5,
      detailSizeUp: 5,
      msgs: [],
      channelId: '',
    }
  },
  methods: {
    // 点击切换tab页
    handleClick() {
      if (this.currentTab == 'first') {
        this.page1.currentPage = 1
        this.getSendBatchList()
      } else if (this.currentTab == 'second') {
        this.page2.currentPage = 1
        this.batchId = ''
        this.getSendDetail()
      } else if (this.currentTab == 'third') {
        this.page3.currentPage = 1
        this.getReceiveList()
      }
    },
    // 获取应用列表(废弃)
    getDataList() {
      selectAppList({}).then(res => {
        if (res.status == 0) {
          this.appOptions = res.data
        } else {
          this.$message.error({
            message: res.message,
            center: true,
          })
        }
      }).catch((error) => {
        this.$message.error({
          message: error,
          center: true,
        })
      })
    },
    async getAppList() {
      return await selectAppList({}).then(res => res.data)
    },
    // 获取消息模板列表
    getMessageLists() {
      const query = {
        checkStatus: 1,
        currentPage: 1,
        pageSize: 100
      }
      templeteAuditList(query)
        .then((res) => {
          if (res.status == 0) {
            this.messageModule = res.data.records
            // console.log('this.messageModule: ', this.messageModule)
            // console.log(data)
            //   data.forEach(item => {
            //     const val = {
            //       label: item.name,
            //       value: item.id,
            //     }
            //     this.messageModule.push(val)
            //   })
          } else {
            this.$message({
              type: res.status === 2 ? 'warning' : 'error',
              message: res.message,
              center: true,
            })
          }
        })
        .catch((error) => {
          this.$message.error({
            message: error,
            center: true,
          })
        })
    },
    // 根据应用ID, 模板ID匹配应用、模板
    findAppByid(val, options) {
      let temp = ''
      options.forEach((item) => {
        if (val == item.value) {
          temp =  item.label
        }
      })
      return temp
    },
    // 获取业务类型
    getMessageTypeList() {
      getBusinessTypeList({id:3}).then(res => {
        if (res.status == 0) {
          this.businessTypeList = res.data
          // const data = res.data
          // this.businessTypeList = []
          // res.data.forEach(item => {
          //   const val = {
          //     id: item.id,
          //     name: item.businessName
          //   }
          //   this.businessTypeList.push(val)
          // })
        }
      })
    },
    // 获取业务类型
    async getBusinessType() {
      return await getBusinessTypeList().then(res => res.data)
    },
    // 获取通道列表
    getChannelList() {
      const query ={
        currentPage: 1,
        pageSize: 100,
      }
      getChannelList(query).then(res => {
        if (res.status == 0) {
          this.channelList = res.data.records
        } else {
          this.$message({
            message:res.message,
            center:true,
            type:res.status === 2 ? 'warning':'error'
          })
        }
      }).catch(error => {
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    /**
     * 发送记录
     *
     * */
    // 发送批次记录列表
    getSendBatchList() {
      const that = this
      this.loading1 = true
      const query = {
        currentPage: this.page1.currentPage,
        enterpriseAccountAppId: this.enterpriseAccountAppId,
        pageSize: this.page1.currentSize,
        searchContent: this.searchContent,
        status: this.sendStatus,
        beginTime: this.time[0],
        endTime: this.time[1],
        productTypeId: 3,
      }
      if (this.sendStatus == '') {
        delete query.status
      }
      sendBatch(query)
        .then((res) => {
          if (res.status == 0) {
            const data = res.data.records
            this.page1.total = res.data.total
            // this.data = data.records
            data.map((item) => {
              that.appOptions.map((item1) => {
                if (item.enterpriseAccountAppId == item1.id) {
                  item.appName = item1.name
                }
              })
              // that.messageModule.map((item2) => {
              //   if (item.messageMouldId == item2.id) {
              //     item.messageModuleName = item2.name
              //   }
              // })
              that.businessTypeList.map((item4) => {
                if (item.businessType == item4.id) {
                  item.businessTypeName = item4.name
                }
              })
              item.batchStatus = that.findAppByid(item.status, that.statusOptions)
              if (item.messageContent != null) {
                if (item.messageContent.messageType == 'CARD') {
                  item.messageContent.messageMouldCards = item.messageContent.cardList
                }
              }
            })
            this.$nextTick(() => {
              this.sendData = data
            })
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              center: true,
            })
          }
          this.loading1 = false
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.loading1 = false
        })
    },
    // 刷新
    refresh() {
      this.getSendBatchList()
    },
    // 清空发送记录搜索条件
    clearSend() {
      this.searchContent = ''
      this.sendStatus = ''
      this.enterpriseAccountAppId = ''
      this.page1.currentPage = 1
    },
    // 状态选择触发
    statusChange(isShow) {
      if (!isShow) {
        this.$refs.statusSelect.blur()
      }
    },
    // 导出重发
    exportRepeat() {
      const query = {
        beginTime: this.time[0],
        currentPage: this.page1.currentPage,
        endTime: this.time[1],
        enterpriseAccountAppId: this.enterpriseAccountAppId,
        pageSize: this.page1.currentSize,
        searchContent: this.searchContent,
        status: this.sendStatus,
        productTypeId: 3,
      }
      if (this.sendStatus == '') {
        delete query.status
      }
      exportExcel(query)
        .then((res) => {
          // console.log(res)
          const link = document.createElement('a')
          let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.download = '批次记录' + new Date().getTime() + '.xls'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
        })
    },
    // 应用选择触发
    appChange(isShow) {
      if (!isShow) {
        this.$refs.appSelect.blur()
      }
    },
    // 状态选择触发
    statusChange(isShow) {
      if (!isShow) {
        this.$refs.statusSelect.blur()
      }
    },
    // 改变页面尺寸
    handleSizeChange1(val) {
      this.page1.currentSize = val
      this.getSendBatchList()
    },
    // 翻页
    handleCurrentChange1(val) {
      this.page1.currentPage = val
      this.getSendBatchList()
    },
    cancaleSend() {

    },
    toDetail(scope) {
      this.batchId = scope.row.id
      this.currentTab = 'second'
      this.getSendDetail()
    },
    /**
     * 发送详情
     *
     * */
    // 获取发送详情数据列表
    getSendDetail() {
      const that = this
      this.loading2 = true
      const query = {
        batchId: this.batchId,
        currentPage: this.page2.currentPage,
        enterpriseAccountAppId: this.enterpriseAccountAppId2,
        pageSize: this.page2.currentSize,
        searchContent: this.batchName2,
        status: this.status2,
        productTypeId: 3,
      }
      if (this.status2 == '') {
        delete query.status
      }
      sendDetailList(query)
        .then((res) => {
          if (res.status == 0) {
            const data = res.data.records
            this.page2.total = res.data.total
            data.forEach((item) => {
              that.appOptions.map((item1) => {
                if (item.enterpriseAccountAppId == item1.id) {
                  item.appName = item1.name
                }
              })
              // that.messageModule.map((item2) => {
              //   if (item.messageMouldId == item2.id) {
              //     item.messageModules = item2.name
              //   }
              // })
              // that.channelList.map((item3) => {
              //   if (item.channelId == item3.id) {
              //     item.sendChaanle = item3.name
              //   }
              // })
              that.businessTypeList.map((item4) => {
                if (item.businessType == item4.id) {
                  item.businessTypeName = item4.name
                }
              })


              // item.appName = that.findAppByid(
              //   item.enterpriseAccountAppId,
              //   that.appOptions
              // )
              // item.messageModules = that.findAppByid(
              //   item.messageMouldId,
              //   that.messageModule
              // )
              // item.sendChaanle = that.findAppByid(
              //   item.channelId,
              //   that.channelList
              // )
              // item.statusOfSubmit = that.findAppByid(
              //   item.submitStatus,
              //   that.optionsList2
              // )
              item.statusOfReport = that.findAppByid(
                item.messageStatus,
                that.optionsList04
              )
              item.sendOfResult = that.findAppByid(
                item.sendResult,
                that.optionsList3
              )
              // item.businessType = that.findAppByid(
              //   item.businessType,
              //   that.businessTypeList
              // )
            })
            this.$nextTick(() => {
              this.detailData = data
            })
          } else {
            this.$message({
              type: 'error',
              // message: res.data.message,
              message: '网络错误，请重新加载！',
              center: true,
            })
          }
          this.loading2 = false
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.loading2 = false
        })
    },
    // 刷新发送详情
    refreshSendDetail() {
      this.getSendDetail()
    },
    // 清空搜索列表
    clearSendDetail() {
      this.enterpriseAccountAppId2 = ''
      this.status2 = ''
      this.batchName2 = ''
      this.page2.currentPage = 1
    },
    statusSelect2(isShow) {
      if (!isShow) {
        this.$refs.statusSelect2.blur()
      }
    },
    statusSelect2(isShow) {
      if (!isShow) {
        this.$refs.statusSelect2.blur()
      }
    },
    handleSizeChange2(val) {
      this.page2.currentSize = val
      this.getSendDetail()
    },
    handleCurrentChange2(val) {
      this.page2.currentPage = val
      this.getSendDetail()
    },
    /**
     * 接收记录
     *
     * */
    // 接收记录列表
    getReceiveList() {
      const that = this
      this.loading3 = true
      const query = {
        currentPage: this.page3.currentPage,
        enterpriseAccountAppId: this.enterpriseAccountAppId3,
        pageSize: this.page3.currentSize,
        searchContent: this.batchName3,
        status: this.status3,
        productTypeId: 3,
      }
      if (this.status3 == '') {
        delete query.status
      }
      receiveList(query)
        .then((res) => {
          if (res.status == 0) {
            const result = res.data.records
            this.page3.total = res.data.total
            result.forEach((item) => {
              // item.appName = that.findAppByid(
              //   item.enterpriseAccountAppId,
              //   that.appOptions
              // )
              that.appOptions.map((item1) => {
                if (item.enterpriseAccountAppId == item1.id) {
                  item.appName = item1.name
                }
              })
              that.channelList.map((item3) => {
                if (item.channelId == item3.id) {
                  item.receiveChannle = item3.name
                }
              })
              // item.receiveChannle = that.findAppByid(
              //   item.channelId,
              //   that.channelList
              // )
              item.status = that.findAppByid(
                item.messageStatus,
                that.submitStatusOptions
              )
              item.receiveContent = item.messageContent.content
            })
            this.$nextTick(() => {
              this.receiveData = result
            })
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              center: true,
            })
          }
          this.loading3 = false
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.loading3 = false
        })
    },
    refreshReceive() {
      this.getReceiveList()
    },
    // 清空接收记录搜索条件
    clearReceive() {
      this.enterpriseAccountAppId3 = ''
      this.status3 = ''
      this.page3.currentPage = 1
      this.batchName3 = ''
    },
    handleSizeChange3(val) {
      this.page3.currentSize = val
      this.getReceiveList()
    },
    handleCurrentChange3(val) {
      this.page3.currentPage = val
      this.getReceiveList()
    },


    // 监听页面滚动
    chatScroll() {
      const scrollEvent = this.$refs.chattingContent
      if (
        scrollEvent.scrollTop + scrollEvent.clientHeight ==
        scrollEvent.scrollHeight
      ) {
        this.detailSizeDown += 5
        const query = {
          channelId: this.channelId,
          phoneNumber: this.tempData.phoneNumber,
          scrollType: 'DOWN',
          sendTime: this.tempData.sendTime
            ? this.tempData.sendTime
            : this.tempData.createTime,
          size: this.detailSizeDown,
          productTypeId: 3,
        }
        this.chatLoading = true
        this.getRecordMemory(query)
      } else if (scrollEvent.scrollTop == 0) {
        // console.log('向上获取聊天记录')
        this.detailSizeUp += 5
        const query = {
          channelId: this.channelId,
          phoneNumber: this.tempData.phoneNumber,
          scrollType: 'UP',
          sendTime: this.tempData.sendTime
            ? this.tempData.sendTime
            : this.tempData.createTime,
          size: this.detailSizeUp,
          productTypeId: 3,
        }
        this.getRecordMemory(query)
      }
      this.chatLoading = false
    },

    handleDetails(val1, val2) {
      //查看记录
      this.drawer = true
      // console.log(val2)
      this.channelId = val2.channelId
      this.tempData = val2
      const query = {
        channelId: this.channelId,
        phoneNumber: this.tempData.phoneNumber,
        scrollType: 'DOWN',
        sendTime: this.tempData.sendTime
          ? this.tempData.sendTime
          : this.tempData.createTime,
        size: this.detailSizeDown,
      }
      // console.log(query)
      this.chatLoading = true
      this.getRecordDetail(query)
    },
    //获取聊天记录
    getRecordDetail(val) {
      const that = this
      recoedDetail(val)
        .then((res) => {
          console.log(res)
          if (res.status == 0) {
            const data = res.data
            data.unshift(this.tempData)
            data.forEach((item) => {
              that.appOptions.forEach(ele => {
                if (item.enterpriseAccountAppId == ele.id) {
                  item.appName = ele.name
                }
              })
              item.messageContent.messageMouldCards =
                item.messageContent.cardList
            })
            for (let i = 0; i < data.length; i++) {
              this.$set(this.msgs, i, data[i])
            }
            this.$nextTick(() => {
              const scrollEvent = this.$refs.chattingContent
              scrollEvent.scrollTo(0, 10)
            })
          } else {
            this.$message({
              type: 'error',
              message: '获取收发记录失败',
              center: true,
            })
          }
          this.chatLoading = false
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.chatLoading = false
        })
    },
    // 获取记录
    getRecordMemory(val) {
      const that = this
      this.chatLoading = true
      recoedDetail(val)
        .then((res) => {
          // console.log(res.data.data)
          if (res.status == 0) {
            const data = res.data
            if (val.scrollType == 'DOWN') {
              const temp = data.slice(this.msgs.length)
              // console.log(data)
              temp.forEach((item) => {
                that.appOptions.forEach(ele => {
                  if (item.enterpriseAccountAppId == ele.id) {
                    item.appName = ele.name
                  }
                })
                this.msgs.push(item)
              })
            } else if (val.scrollType == 'UP') {
              const temp = data.slice(this.msgs.length)
              // console.log(temp.length)   //此次添加的数组的长度
              temp.forEach((item) => {
                that.appOptions.forEach(ele => {
                  if (item.enterpriseAccountAppId == ele.id) {
                    item.appName = ele.name
                  }
                })
                this.msgs.unshift(item)
              })
              this.$nextTick(() => {
                if (this.msgs.length - 1 > temp.length && temp != 0) {
                  const scrollHeight = document.getElementsByClassName(
                    'msg-from'
                  )[temp.length - 1].offsetTop
                  const scrollEvent = this.$refs.chattingContent
                  scrollEvent.scrollTop = scrollHeight
                }
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: '获取收发记录失败',
              center: true,
            })
          }
          this.chatLoading = false
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.chatLoading = false
        })
    },
    // 回车事件
    keyDown(e) {
      if (e.keyCode == 13) {
        if (this.currentTab == 'first') {
          this.getSendBatchList()
        } else if (this.currentTab == 'second') {
          this.getSendDetail()
        } else if (this.currentTab == 'third') {
          this.getReceiveList()
        }
      }
    },
    async initData() {
      this.appOptions = await this.getAppList()
      this.businessTypeList = await this.getBusinessType()
      this.getSendBatchList()
    }
  },
  created() {
    this.time = [
      dayjs(new Date()).format('YYYY-MM-DD'),
      dayjs(new Date()).format('YYYY-MM-DD'),
    ]
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown)
    this.initData()
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  }
}
</script>
<style lang="less" scoped>
#message{
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  color: #333;
  .header {
    padding: 0 70px;
    box-sizing: border-box;
  }
  .title {
    height: 80px;
    font-size: 20px;
    line-height: 80px;
    box-sizing: border-box;
    padding-top: 10px;
  }
  .container {
    padding: 0 70px;
    .detail-contetn {
      margin-top: 12px;
      .text{
        .textTop{
          width: 266px;
        }
      }
      .vms{
          display: inline-block;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 20px;
          background: #eee;
          .textTop{
            width: 266px;
            padding: 0 0 10px 0;
            display: inline-block;
            color: #333;
            border-radius: 5px;
          }
          .textBottom{
            padding-top: 10px;
            border-top: 1px solid #fff;
            .btn{
              padding:3px 6px;
              margin-right: 10px;
              border: 1px solid #fff;
              border-radius: 4px;
              background: #fff;
            }
            .btn:hover{
              border: 1px solid #409eff;
            }
          }
        }
        .audio-class{
          width: 200px;
          height: 100px;
        }
        .video-class{
          // width: 100%;
          height: 150px;
        }
        .img-class{
          width:266px;
          max-height: 300px;
        }
      }
    .tips {
      padding-top: 10px;
    }
    .page-footer {
      text-align: center;
      margin: 20px 0;
    }
    .dowImage {
      float: right;
      padding: 0;
    }
    .chatting-content {
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: auto;
    .chatting-item {
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
      .msg-date {
        text-align: center;
        color: gray;
        font-size: 80%;
      }
      .msg-from {
        display: flex;
        align-items: center;
        user-select: none;
        span.loc {
          color: gray;
          font-size: 60%;
          margin-right: 5px;
        }
        .msg-author {
          font-size: 12px;
          color: #666;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }
      }
      .msg-content {
        margin-top: 10px;
        max-width: 340px;
        background-color: #f6f6f6;
        width: fit-content;
        padding: 16px 22px;
        font-size: 14px;
        color: #333;
        //   /deep/ .expandCardList .cardList{
        //       margin: 0 !important;
        //   }
      }
    }
    .none-message {
      display: flex;
      justify-content: center;
      color: grey;
    }
    .chatting-item + .chatting-item {
      margin-top: 10px;
    }
    .self {
      .msg-from {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img {
          margin-left: 12px;
        }
      }
      .msg-content {
        float: right;
        word-wrap: break-word;
        word-break: break-all;
        margin-left: 60px;
        margin-right: 60px;
      }
    }
    .other {
      .msg-from {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          margin-right: 12px;
        }
      }
      .msg-content {
        float: left;
        margin-left: 60px;
        margin-right: 60px;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
    .online {
      width: 200px;
      // max-width: 100%;
      margin: 3px auto;
      border-radius: 4px;
      text-align: center;
      background-color: #fffde7;
    }
    .clearfix {
      *zoom: 1;
    }
    .clearfix:after {
      content: '';
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
  /deep/ .el-drawer {
    width: 500px !important;
    height: 100%;
    .el-drawer__body {
      height: calc(100% - 80px);
      padding: 0;
    }
  }
  /deep/ .el-drawer__header {
    padding: 15 10px !important;
  }
  /deep/ .el-drawer__wrapper .el-drawer__header {
    margin-bottom: 20px;
  }
  /deep/ .el-drawer:focus {
    outline: initial;
  }
  /deep/ .el-drawer__header > :first-child {
    color: #333;
    font-size: 14px;
    font-weight: 400;
    margin-left: 30px;
  }
  /deep/ .el-drawer__header > :first-child:focus {
    outline: initial;
  }
  /deep/ .el-drawer__header {
    border: 1px solid #e5e5e5;
    padding: 10px;
  }
  /deep/ .el-drawer__close-btn:focus {
    outline: initial;
  }
  /deep/ .el-dialog__close:focus {
    outline: initial;
  }
  /deep/ .el-drawer__open .el-drawer.rtl {
    overflow-y: hidden;
  }
  /deep/ .el-tabs__item{
    user-select: none;
  }
    /deep/ .el-date-editor--daterange.el-input__inner {
      max-width: 220px;
    }
    /deep/ .el-button-group > .el-button img {
      width: 12px;
      height: 12px;
      margin-right: 2px;
    }
    /deep/ .el-select > .el-input {
      max-width: 150px;
    }
    /deep/ .el-input--small {
      width: 160px;
    }
    /deep/ .el-dialog__header {
      border-bottom: 1px solid #eee;
    }
    /deep/ .el-dialog__body {
      padding: 10px 20px 30px;
    }
    /deep/ .el-dialog__footer {
      text-align: center;
    }
    /deep/ .cell .el-button--small {
      padding: 1px 5px;
    }
    /deep/ .el-tabs__nav-wrap::after {
      height: 1px;
    }
    /deep/ .el-button + .el-button {
      margin-left: 2px;
    }
  }
  /deep/ .el-tabs__nav-wrap::after {
      height: 1px;
    }
    /deep/ .el-tabs__item:focus.is-active.is-focus:not(:active) {
         -webkit-box-shadow: none;
          box-shadow: none;
  }
  .blankData /deep/ .el-table__empty-block{
    text-align: left;
  }

}
</style>
