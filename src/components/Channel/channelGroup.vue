<template>
  <div id="channelGroup" v-loading="loading"  element-loading-text="loading">
    <div class="title">通道组</div>
    <!-- <div> -->
      <el-tabs v-model="productType" class="tab" @tab-click="handleClick">
        <el-tab-pane v-for="item in productList" :key="item.id" :label="item.name" :name="''+item.id">
          <div class="container">
            <div class="headerBtn">
              <div class="headerBtnLeft">
                <el-button class="addBtn" type="primary" size="small"  @click="refresh">
                  <i class="iconfont iconshuaxin"></i>
                </el-button>
                <el-button class="addBtn" type="primary" size="small"  @click="reset">
                  <i class="iconfont iconguanbi"></i>
                </el-button>
                <el-select v-model="businessType" :ref="productType + item.name" @change="changeBusinessType"  @visible-change="isShowSelectOptions" clearable size="small" placeholder="业务类型">
                  <el-option
                    v-for="item in businessTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="通道组名称">
                  <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
              <div class="headerBtnRight">
                  <el-button  type="primary"  size="small" v-has="'channelGroupAdd'"  @click="createChannel">
                    <i class="iconfont iconxinzeng"></i>
                    新建
                  </el-button>
                  <!-- <el-button v-has="'channelGroupUpdate'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="editAction(selectData[0])">
                    <i class="iconfont iconxiugai"></i>
                    修改
                  </el-button> -->
                  <!-- <el-button v-has="'channelGroupDelete'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="deleteAction(1,selectData)">
                    <i class="iconfont iconshanchu"></i>
                    删除
                  </el-button> -->
                  <el-button v-has="'channelGroupDisable'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"  @click="forbidAction(1)">
                    <i class="iconfont icontingyong"></i>
                    禁用
                  </el-button>
                  <el-button  v-has="'channelGroupEnable'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="enableAction(1)">
                    <i class="iconfont iconzhuanweiqiyong"></i> 
                    启用
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
                :style="{'color':'#333','min-height':tableHeight + 'px'}"
              >
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-collapse :value="whichSelect" >
                        <el-collapse-item title="基本信息"  name="1">
                          <div class="separate">
                            <div class="cont"><span class="lable">状态：</span>{{props.row.statusStr}}</div>
                            <div class="cont"><span class="lable">更新时间：</span>{{props.row.updateTime}}</div>
                          </div>
                          <div class="separate">
                            <div class="cont"><span class="lable">名称：</span>{{props.row.name}}</div>
                            <div class="cont"><span class="lable">所属企业：</span>{{props.row.enterpriseName}}</div>
                          </div>
                          <div class="separate">
                            <!-- <div class="cont"><span class="lable">所属应用：</span>{{props.row.appName}}</div> -->
                            <div class="cont"><span class="lable">业务类型：</span>{{props.row.businessTypeStr}}</div>
                            <div class="cont">
                              <span class="lable">通道策略：</span>
                              <span v-show="props.row.channelStrategy ==1">主备优先级</span>
                              <span v-show="props.row.channelStrategy ==2">权重优先级</span>
                              <span v-show="props.row.channelStrategy ==3">属性优先级</span>
                            </div>
                          </div>
                          <div ><span class="lable">操作账号：</span>{{props.row.account}}</div>
                          <div><span class="lable">备注：</span>{{props.row.description}}</div>
                        </el-collapse-item>
                        <el-collapse-item title="通道信息"  name="2">
                          <el-table
                            border
                            :header-cell-style="{background:'#F5F7FA',color:'#333333',lineHeight:'20px'}"
                            size="small"
                            :data="props.row.channelVoList"
                            style="width:800px"
                          > 
                            <el-table-column  prop="name" label="通道名称" width="135" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="serviceCode" label="服务代码" width="110" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="sendPhoneType" label="发送号码类型" width="110" show-overflow-tooltip>
                              <template slot-scope="scope">
                                <span v-show="productType == 1">暂无</span>
                                <span v-show="productType != 1 &&scope.row.sendPhoneType == 0">全网</span>
                                <span v-show="productType != 1 &&scope.row.sendPhoneType == 1">省网</span>
                                <span v-show="productType != 1 &&scope.row.sendPhoneType == 2">市网</span>
                              </template>
                            </el-table-column>
                            <el-table-column prop="expandNum" label="扩展码" width="110" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="rank" label="优先级" width="90" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="assignTime" label="分配时间" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column  label="操作" min-width="90" show-overflow-tooltip>
                              <template slot-scope="scope">
                                <span style="color:#368cfe;cursor: pointer;" @click="checkChannelDetail(scope.row.channelId)">查看</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-collapse-item>
                      </el-collapse>
                    </template>
                  </el-table-column>
                  <el-table-column type="selection" align="center" width="50"></el-table-column>
                  <el-table-column prop="name" label="名称" width="160" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="enterpriseName" label="所属企业" width="160" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="businessTypeStr" label="业务类型" width="150" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="statusStr" label="状态" width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="createTime" label="更新时间" width="160" show-overflow-tooltip></el-table-column>
                  <el-table-column  label="操作" min-width="110" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span class="operation" v-has="'channelGroupUpdate'" @click="editAction(scope.row)">修改</span>
                      <span class="operation" v-has="'channelGroupSelectAssignServiceCodeList'" @click="distributionChannel(scope.row)">分配通道</span>
                      <!-- <span class="operation" v-has="'groupCnhannelAdd'" @click="addChannel(scope.row)">新增通道</span>
                      <span class="operation" v-has="'groupChannelRemove'" @click="removeChannel(scope.row)">移除通道</span> -->
                      <span class="operation" v-has="'channelGroupDisable'" v-if="scope.row.status === 0" @click="forbidAction(2,scope.row)">禁用</span>
                      <span class="operation" v-has="'channelGroupEnable'" v-if="scope.row.status === 1" @click="enableAction(2,scope.row)">启用</span>
                      <!-- <el-tooltip v-has="'channelGroupUpdate'"  effect="dark" content="修改" placement="top">
                          <img class="operation"  @click="editAction(scope.row)" src="../../assets/images/edit_icon.svg" >
                      </el-tooltip>
                      <el-tooltip v-has="'groupChannelAdd'"  effect="dark" content="新增通道" placement="top">
                          <img class="operation"  @click="addChannel(scope.row)" src="../../assets/images/add_icon.svg" >
                      </el-tooltip>
                      <el-tooltip v-has="'groupChannelRemove'"  effect="dark" content="移除通道" placement="top">
                          <img class="operation"  @click="removeChannel(scope.row)" src="../../assets/images/remove_icon.svg" >
                      </el-tooltip>
                      <el-tooltip v-if="scope.row.status === 0"  effect="dark" content="禁用" placement="top">
                          <img class="operation"  @click="forbidAction(2,scope.row)"  src="../../assets/images/forbidden_icon.svg" >
                      </el-tooltip>
                      <el-tooltip v-if="scope.row.status === 1" effect="dark" content="启用" placement="top">
                          <img class="operation"  @click="enableAction(2,scope.row)"  src="../../assets/images/enable_icon.svg" >
                      </el-tooltip> -->
                      <!-- <el-tooltip v-has="'channelGroupDelete'"  effect="dark" content="删除" placement="top">
                          <img class="operation"  @click="deleteAction(2,scope.row)"  src="../../assets/images/delete_icon.svg" >
                      </el-tooltip> -->
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
        </el-tab-pane>
      </el-tabs>
    <!-- </div> -->
    <!-- 新增/编辑通道组 -->
    <el-drawer
      :title="channelGroupDrawerTitle"
      :visible.sync="channelGroupDrawer"
      :before-close="closeChannelGroupDrawer"
      :modal-append-to-body="true"
      :wrapperClosable="false"
      size="500px"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="channelGroupForm"
        :model="channelGroupForm"
        :rules="channelGroupRules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item prop="channelGroupName" label="名称：">
          <el-input size="small" v-model="channelGroupForm.channelGroupName"></el-input>
        </el-form-item>
        <el-form-item prop="enterprise" label="所属企业：">
          <el-select v-model="channelGroupForm.enterprise" filterable  clearable size="small" placeholder="请选择所属企业">
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item prop="app" label="所属应用："> 
          <el-select v-model="channelGroupForm.app"  filterable  clearable size="small" placeholder="请选择所属应用">
            <el-option
              v-for="item in appList"
              :key="item.appId"
              :label="item.name"
              :value="item.appId"
            >
            </el-option> 
          </el-select>
        </el-form-item> -->
        <el-form-item prop="business" label="业务类型：">
          <el-select v-model="channelGroupForm.business" :disabled="channelGroupDrawerTitle === '修改通道组' ? true:false" clearable size="small" placeholder="请选择业务类型">
            <el-option
              v-for="item in businessTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="channelStrategy" label="通道策略：">
          <el-select v-model="channelGroupForm.channelStrategy"  clearable size="small" placeholder="请选择通道策略">
            <el-option
              v-for="item in channelStrategyList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" label="描述：">
          <el-input
            type="textarea"
            placeholder=""
            maxlength="200"
            :autosize="{ minRows: 5, maxRows: 8 }"
            show-word-limit
            v-model="channelGroupForm.remark"
          ></el-input>
        </el-form-item>
        <el-form-item prop="parmentDepartment" label="">
            <el-button  type="primary" size="small" :disabled="isSubmit" v-if="channelGroupDrawerTitle === '新建通道组'" @click="confirmAddChannelGroup">提 交</el-button>
            <el-button  type="primary" size="small" v-if="channelGroupDrawerTitle === '修改通道组'" @click="confirmEditChannelGroup">提 交</el-button>
            <el-button  size="small" @click="closeChannelGroupDrawer">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 分配通道 -->
    <el-dialog
      title="分配通道"
      class="resetPassword"
      :visible.sync="channelToast"
      :close-on-click-modal="false"
      :before-close="closeChannelToast"
      width="850px"
    >     
      <div>
        <div class="bodyHeader">
          <div class="bodyHeaderLeft">
            <span >名称：{{selectChannelGroupName}}</span>
            <span style="margin-left:50px">所属企业：{{selectChannelGroupEnterprise}}</span>
          </div>
        </div>
        <div class="bodyMain">
          <el-table
            border
            :header-cell-style="{background: '#F5F7FA',color: '#333333',lineHeight: '20px'}"
            size="small"
            :data="channelTableData"
            style="width:770px"
            height="380"
          >     
            <el-table-column prop="serviceCode" label="通道名称" width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.disabled" >{{scope.row.name}}</span>
                <el-select v-else  value-key="channelId" v-model="scope.row.channelId" @change="((value)=>{changeChannel(value,scope.$index)})"   size="small">
                  <el-option
                    v-for="item in selectTableData"
                    :key="item.channelId"
                    :label="item.channelName"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="serviceCode" label="服务代码" width="130" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.serviceCode}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="extCode" label="扩展码" width="150" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.disabled || productType == 1">{{scope.row.expandNum}}</span>
                <el-input class="limitWord" v-else style="width:150px" size="small" show-word-limit :maxlength="20 - scope.row.serviceCode.length" v-model="scope.row.expandNum" @blur="scope.row.expandNum = $event.target.value" oninput="value=value.replace(/[^\d]/g,'')" ></el-input>
              </template> 
            </el-table-column> 
            <el-table-column prop="serviceCode" label="优先级" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.disabled">{{scope.row.rank}}</span>
                <el-input v-else style="width:70px" @blur="scope.row.rank = $event.target.value" oninput="if(value>100){value=100}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=0}" size="small"  v-model="scope.row.rank" ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="serviceCode" label="业务ID" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.disabled">{{scope.row.productId}}</span>
                <el-input v-else style="width:70px" @blur="scope.row.productId = $event.target.value" oninput="if(value>99999){value=99999}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=0}" size="small"  v-model="scope.row.productId" ></el-input>
              </template>
            </el-table-column>
            <el-table-column min-width="100" >
              <template slot="header" slot-scope="scope">
                <div style="display:flex;align-item:center">
                  <span>操作</span>
                  <img @click="addOperator" style="margin-left:5px;cursor:pointer" src="../../assets/images/increase_icon.svg"  />
                </div>
              </template>
              <template slot-scope="scope">
                <span class="operation" v-has="'groupChannelRemove'" v-if="scope.row.disabled" @click="recycleAction(scope.row)">回收</span>
                <span class="operation" v-else><span v-has="'groupChannelAdd'" @click="!isSubmit2 ? submitAction(scope.row):''">提交</span> | <span @click="cancelAction(scope.row,scope.$index)">取消</span></span> 
              </template> 
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <!-- 通道详情弹窗 -->
    <el-dialog
      title="通道详情"
      :visible.sync="channelDetailToast"
      :close-on-click-modal="false"
      width="850px"
    >
      <div class="channelDetail" v-if="channelDetail.baseInfo">
        <channelDetail :productType="productType" :detailData="channelDetail"></channelDetail>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getChannelGroupList,addChannelGroup,editChannelGroup,disableChannelGroup,enableChannelGroup,channelList,getAddChannel,increaseChannel,removeChannel,getProductTypeList,getBussinessTypeList,lookRcsChannelDetail,lookSmsChannelDetail,lookMmsChannelDetail,getEnterpriseList,chenkChannel} from '../../api/channel/api'
import channelDetail from './channelDetail'
export default {
  name:'channelGroup',
  components:{channelDetail},
  data() {
    return {
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      productList:[],//产品列表
      productType:'',
      searchCont:null,//搜索内容
      tableData:[],
      whichSelect:["1"],
      businessType:null,
      channelGroupDrawerTitle:'',//新增修改通道组抽屉标题
      channelGroupDrawer:false,//是否显示通道组抽屉
      businessTypeList: [],//业务列表
      productTypeList: [],//产品列表
      industryTypeList: [],//行业列表
      enterpriseList:[],//所属企业 
      appList:[],//所属应用 
      channelStrategyList:[
        {
          id:1,
          value:'主备优先级'
        },
        {
          id:2,
          value:'权重优先级'
        },
        {
          id:3,
          value:'属性优先级'
        }
      ],//通道策略
      channelGroupForm:{
        id:null,
        // app:null,
        enterprise:null,
        channelGroupName: null,
        business: null,
        channelStrategy:null,
        remark:null,
      },//通道组表单数据
      channelGroupRules: {
        // app:[{ required: true, message: "所属应用不能为空", trigger: "change" },],
        enterprise:[{ required: true, message: "所属企业不能为空", trigger: "change" },],
        channelGroupName:[
          { required: true, message: "名称不能为空", trigger: "blur" },
          { max: 50, message: "名称不超过50个字符", trigger: "blur" },
        ],
        business:[{ required: true, message: "业务类型不能为空", trigger: "change" }],
        channelStrategy:[{ required: true, message: "通道策略不能为空", trigger: "change" },]
      },//通道组表单验证规则
      channelToastTitle:'',//新增/移除通道标题
      channelToast:false,//新增移除通道弹窗
      channelTableData:[],//新增移除通道表格
      selectTableData:[],//新增通道下拉框
      selectChannelGroupId:null,//选中的通道组ID
      selectData:[],//表格选择的数据
      selectChannelGroupName:null,//选择添加、移除通道的通道组名
      selectChannelGroupEnterprise:null, //选择添加、移除通道的通道组归属企业
      selectTab:'RCS消息',
      isDisable:true,//是否禁用头部按钮
      channelDetailToast:false,//通道详情弹窗
      channelDetail:{},//通道详情数据
      isSubmit:false,//是否禁用提交按钮
      isSubmit2:false,//是否禁用分配通道提交按钮
      tableHeight:window.innerHeight - 369 +'',
      timer: null,
    };
  },
  methods: {
    // 获取产品列表
    getProduct(){
      getProductTypeList({code:'productType'}).then(res=>{
        if(res.status == 0){
          this.productList = res.data
          this.productType = ''+res.data[0].id
          this.getDataList()
          // this.getTypeListData()
        }else{
          this.$message({
            message:res.message,
            center:true,
            type:res.status === 2 ? 'warning':'error'
          })
        }
      }).catch(err=>{
          this.$message.error({
            message:res.message,
            center:true,
          })
      })
    },
    // 获取通道组列表数据
    getDataList(){
      this.loading = true
      let params ={
        businessType: this.businessType,
        productType:this.productType,
        name: this.searchCont,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      getChannelGroupList(params).then(res=>{
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
    // 选择tab
    handleClick(tab, event){
      this.selectTab = tab.label
      this.productType = tab.name
      this.currentPage = 1
      this.pageSize = 10
      this.businessType = null
      this.searchCont= null
      this.channelTableData =[]
      this.channelDetail ={}
      this.getDataList()
      // this.getTypeListData()
    },
    // 刷新
    refresh(){
      this.getDataList()
    },
    // 重置清空
    reset(){
      this.currentPage = 1
      this.pageSize = 10
      this.businessType = null
      this.searchCont= null
      this.getDataList()
    },
    // 查询
    searchAction(){
      this.currentPage = 1
      this.getDataList()
    },
    // 切换业务类型
    changeBusinessType(){
      this.searchAction()
    },
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.searchAction();
      }
    },
    // 获取业务类型
    getTypeListData(){
      // let params = {id:this.productType}
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
    // 获取所有企业列表
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
    // // 改变企业
    // changeEnterprise(val){
    //   this.getEnterpriseAppData(val)
    //   this.channelGroupForm.app = null
    //   this.channelGroupForm.appList = []
    // }, 
    // // 根据企业查询应用
    // getEnterpriseAppData(enterpriseId){
    //   getEnterpriseAppList({enterpriseId:enterpriseId}).then(res=>{
    //     if(res.status == 0){
    //       this.appList = res.data
    //     }else{
    //       this.$message({
    //         message:res.message,
    //         center:true,
    //         type:res.status === 2 ? 'warning':'error'
    //       })
    //     }
    //   }).catch(err=>{
    //     this.$message.error({
    //       message:err,
    //       center:true
    //     })
    //   })
    // },
    // 新建通道组
    createChannel(){
      this.channelGroupDrawerTitle = '新建通道组'
      this.channelGroupForm.id = null
      this.channelGroupForm.channelGroupName = null, //通道名字
      this.channelGroupForm.business = null, //适用业务
      // this.channelGroupForm.app = null, //所属应用
      this.channelGroupForm.enterprise = null,//所属企业
      this.channelGroupForm.channelStrategy= null,//通道策略
      this.channelGroupForm.remark = null //备注
      this.$nextTick(()=>{
        this.$refs.channelGroupForm.clearValidate();
      })
      this.getEnterpriseData()
      this.channelGroupDrawer = true
    },
    // 确认新建通道组
    confirmAddChannelGroup(){
      this.$refs.channelGroupForm.validate((valid) => {
        if(valid){
          if (this.timer) {
            clearTimeout(this.timer);
          }
          let _this = this
          _this.isSubmit = true
          this.timer = setTimeout(function () {
            _this.timer = null;
            let params ={
              // appId:_this.channelGroupForm.app,
              channelStrategy:_this.channelGroupForm.channelStrategy,
              enterpriseId:_this.channelGroupForm.enterprise,
              businessType: _this.channelGroupForm.business,
              description: _this.channelGroupForm.remark,
              name: _this.channelGroupForm.channelGroupName,
              productType: _this.productType
            }
            addChannelGroup(params).then(res=>{
              _this.isSubmit = false
              if(res.status == 0){
                _this.$message.success({
                  message:'通道组新建成功',
                  center:true
                })
                _this.getDataList()
                _this.closeChannelGroupDrawer()
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
      });
    },
    // 编辑
    editAction(row){
      // this.getTypeListData()
      this.channelGroupDrawerTitle = '修改通道组'
      this.channelGroupForm.id = row.id
      this.channelGroupForm.channelGroupName = row.name, //通道名字
      this.channelGroupForm.business = row.businessType, //适用业务
      this.channelGroupForm.remark = row.description, //备注
      // this.channelGroupForm.app =Number(row.appId) , //所属应用
      this.channelGroupForm.enterprise = row.enterpriseId,//所属企业
      this.channelGroupForm.channelStrategy= row.channelStrategy,//通道策略
      this.getEnterpriseData()
      // this.getEnterpriseAppData(row.enterpriseId)
      this.channelGroupDrawer = true
    },
    // 修改通道组确认
    confirmEditChannelGroup(){
      this.$refs.channelGroupForm.validate((valid) => {
        if(valid){
          let params = {
            id: this.channelGroupForm.id,
            // appId:this.channelGroupForm.app,
            channelStrategy:this.channelGroupForm.channelStrategy,
            enterpriseId:this.channelGroupForm.enterprise,
            name: this.channelGroupForm.channelGroupName,
            description:this.channelGroupForm.remark,
          }
          editChannelGroup(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'通道组修改成功',
                center:true
              })
              this.getDataList()
              this.closeChannelGroupDrawer()
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
    // 获取新增下拉框通道
    getAddChannelData(){
      let params = {
        id:this.selectChannelGroupId,
      }
      getAddChannel(params).then(res=>{
        if(res.status == 0){
          this.selectTableData = res.data
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
    // 获取分配的通道列表
    getChannelList(){
      channelList({id:this.selectChannelGroupId}).then(res=>{
        if(res.status == 0){
          if(res.data !== null){
            res.data.map(item=>{
              item.disabled = true
            })
          }
          this.channelTableData =res.data ? res.data :[]
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
    // 分配通道
    distributionChannel(row){
      this.selectChannelGroupId = row.id
      this.selectChannelGroupName = row.name
      this.selectChannelGroupEnterprise = row.enterpriseName
      this.getAddChannelData()
      this.getChannelList()
      this.channelToast = true
    },
    // 添加通道
    addOperator(){
      let obj = {
        channelId:null,
        serviceCode:'',
        expandNum:null,
        rank:null,
        productId:null,
        disabled:false 
      }
      this.channelTableData.push(obj)
    },
    //通道新增提交
    submitAction(row){
      if(row.channelId === '' || row.channelId===null){
        this.$message.error({
          message:'通道名称不能为空',
          center:true
        })
        return
      }
      if(row.serviceCode.length<20){
        if(row.expandNum === '' || row.expandNum===null){
          this.$message.error({
            message:'通道扩展码不能为空',
            center:true
          })
          return
        }
      }
      if(row.rank === '' || row.rank===null){
        this.$message.error({
          message:'通道优先级不能为空',
          center:true
        })
        return
      }
      if((row.serviceCode.length + row.expandNum.length >20)){
        this.$message.error({
          message:'服务代码+扩展码位数不能超过20位',
          center:true
        })
        return
      }
      let params ={
        channelGroupId: this.selectChannelGroupId,
        updateDtoList: [
          {
            channelId: row.channelId.channelId,
            expandNumber: row.expandNum,
            rank: row.rank,
            serviceCode: row.serviceCode,
            productId: row.productId,
          }
        ]      
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      let _this = this
      _this.isSubmit2 = true
      this.timer = setTimeout(function () {
        _this.timer = null;
        increaseChannel(params).then(res=>{
          _this.isSubmit2 = false
          if(res.status == 0){
            _this.$message.success({
              message:'通道添加成功',
              center:true,
            })
            _this.getChannelList()
            _this.getAddChannelData()
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
    // 取消
    cancelAction(row,index){
      this.channelTableData.splice(index,1)
    },
    // 选择通道
    changeChannel(val,index){
      this.channelTableData[index].serviceCode = val.serviceCode
      if(this.productType == 1) this.channelTableData[index].expandNum = val.expandNum
      if(val !== null && val!== ''){
        chenkChannel({channelGroupId:this.selectChannelGroupId,channelId:val.channelId}).then(res=>{
          if(res.status == 0){
            if(res.data) this.$message.warning({message:res.data,center:true})
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
    },
    // 通道回收
    recycleAction(row){
      removeChannel({id:row.channelGroupRelId}).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'通道回收成功',
            center:true
          })
          this.getChannelList()
          this.getAddChannelData()
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
    // 禁用
    forbidAction(type,row){
      let ids = []
      if(type === 1){
        for(let i =0;i<this.selectData.length;i++){
          if(this.selectData[i].status === 1){
            this.$message.error({
              message:'所选通道组存在停用状态',
              center:true
            })
            return
          }
          ids.push(this.selectData[i].id)
        }
      }else{
        if(row.status === 1){
          this.$message.error({
            message:'所选通道组存在停用状态',
            center:true
          })
          return
        }
        ids.push(row.id)
      }
      this.$confirm("禁用操作将会影响消息的发送，是否确认禁用？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          disableChannelGroup(params).then(res=>{
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
          if(this.selectData[i].status === 0){
            this.$message.error({
              message:'所选通道组存在启用状态',
              center:true
            })
            return
          }
          if(this.selectData[i].channelVoList === null || this.selectData[i].channelVoList.length<1){
            this.$message.error({
              message:'请先分配通道',
              center:true
            })
            return
          }
          ids.push(this.selectData[i].id)
        }
      }else{
        if(row.status === 0){
          this.$message.error({
            message:'所选通道组存在启用状态',
            center:true
          })
          return
        }
        if(row.channelVoList === null || row.channelVoList.length<1){
          this.$message.error({
            message:'请先分配通道',
            center:true
          })
          return
        }
        ids.push(row.id)
      }
      let params = {ids:ids.toString()}
      enableChannelGroup(params).then(res=>{
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
    // 查看通道详情
    checkChannelDetail(channelId){
      if(this.productType == 1){
        this.rcsDetailAction(channelId)
      }else if(this.productType == 2){
        this.smsDetailAction(channelId)
      }else{
        this.smsDetailAction(channelId)
      }
      this.channelDetailToast = true
    },
    // rcs通道详情
    rcsDetailAction(id){
      lookRcsChannelDetail({id:id}).then(res=>{
        if(res.status == 0){
          res.data.configInfo.authority1 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(0,1):null
          res.data.configInfo.authority2 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(1,2):null 
          res.data.configInfo.authority3 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(2,3):null 
          res.data.configInfo.authority4 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(3,4):null 
          res.data.configInfo.authority5 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(4,5):null 
          res.data.configInfo.authority6 = res.data.configInfo.state !==null ? res.data.configInfo.state.slice(5,6):null 
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
    },
    // sms通道详情
    smsDetailAction(id){
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
    },
    // mms通道详情
    mmsDetailAction(id){
      lookMmsChannelDetail({id:id}).then(res=>{
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
    closeChannelGroupDrawer(){
      this.$nextTick(()=>{
        this.$refs.channelGroupForm.resetFields();
        this.channelGroupDrawer = false
      })
    },
    // 关闭新增移除弹窗前清空数据
    closeChannelToast(){
      this.selectChannelGroupId = null,
      this.selectChannelGroupName = null,
      this.selectChannelGroupEnterprise = null
      this.channelTableData = []
      this.selectTableData = []
      this.getDataList()
      this.channelToast = false
    },
    // 头部搜索下拉框选中后失焦防止回车触发下拉框
    isShowSelectOptions(isShowSelectOptions){
      if(!isShowSelectOptions) this.$refs[`${this.productType}`+`${this.selectTab}`][0].blur();
    }

  },
  mounted() {
    this.getProduct()
    this.getTypeListData()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },

};
</script>

<style lang="less" scoped>
#channelGroup{
  width: 100%;
  height: 100%;
  background-color: #fff;
  // overflow: auto;
  color: #333;
  letter-spacing: 0.75px;
  padding: 0 70px;
  box-sizing: border-box;
  .title {
    height: 26px;
    line-height: 26px;
    padding-top: 40px;
    // margin-left: 70px;
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
      // margin-left: 70px;
    }
    /deep/ .el-tabs__nav-prev{
      font-size: 18px;
      margin-top: -1px;
    }
    .container{
      width: 100%;
      height: calc(100% - 96px);
      .status{
        display: flex;
        align-items: center;
        img{
          margin-left: 10px;
        }
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
#channelGroup /deep/ .el-dialog__body{
  padding: 30px 40px;
}
#channelGroup /deep/ .el-dialog__footer {
  text-align: center ;
  padding: 10px 40px 20px;
}
#channelGroup /deep/ .is-active {
  background-color: transparent !important;
}
#channelGroup /deep/ .el-tabs__header{
  margin-bottom: 30px;
}
.drawerContent{
  padding: 0 70px;
}
.bodyHeader{
  margin-bottom: 20px;
  display: flex;
  /deep/ .el-button+.el-button{
    margin-left: -4px;
  }
  .bodyHeaderRight{
    margin-left: 10px;
    .el-input {
      width: 160px;
      margin-left: 0;
    }
    /deep/ .el-input--small .el-input__inner{
      height: 36px !important;
      line-height: 36px !important;
    }
    /deep/ .el-input--small .el-input__icon{
      line-height: 36px !important;
      cursor: pointer;
    }
  }
}
.bodyFooter{
  float: left;
}
/deep/ .el-tabs__nav-wrap::after{
    height: 1px;
}
#channelGroup /deep/ .el-collapse{
  border: 0;
}
#channelGroup /deep/ .el-collapse-item__wrap{
  background-color:#F8F8FA ;
  border: 0;
  padding:0 67px;
}
#channelGroup /deep/ .el-collapse-item__header{
  height: 38px;
  background-color:#F8F8FA ;
  padding-left: 20px;
  position: relative;
  color: #333333;
  font-size: 14px;
}
#channelGroup /deep/ .el-collapse-item__header .el-collapse-item__arrow{
  position: absolute;
  left: 0;
  font-size: 14px;
}
#channelGroup /deep/ .el-tabs__header{
  margin-bottom: 30px;
}
#channelGroup /deep/ .el-collapse-item__content{
  margin-top: 25px;
}
#channelGroup /deep/ .el-collapse-item__content {
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
    width: 145px;
    white-space: nowrap;
  }
}
.channelDetail{
  height: 380px;
  overflow-y: auto;
}
.limitWord /deep/ .el-input__suffix{
  top: 0 !important;
  right: 1px;
}
.limitWord /deep/ .el-input__inner{
  padding-right: 46px !important;
}
</style>
