<template>
  <div id="channelResources" v-loading="loading"  element-loading-text="loading">
    <div class="title">通道资源</div>
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
                <el-select v-model="status" :ref="productType + item.name"  @visible-change="isShowSelectOptions" clearable size="small" placeholder="状态">
                  <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="通道名称">
                  <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
              <div class="headerBtnRight">
                  <el-button  type="primary"  size="small" v-has="'channelAdd'"  @click="createChannel">
                    <i class="iconfont iconxinzeng"></i>
                    新建
                  </el-button>
                  <!-- <el-button v-has="'channelUpdate'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="editAction(selectData[0])">
                    <i class="iconfont iconxiugai"></i>
                    修改
                  </el-button> -->
                  <el-button v-has="'channelDisable'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"  @click="stopUse">
                    <i class="iconfont icontingyong"></i>
                    停用
                  </el-button>
                  <el-button v-has="'channelEnable'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="startUse">
                    <i class="iconfont iconzhuanweiqiyong"></i>
                    启用
                  </el-button>
                  <el-button v-has="'channelDelete'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="deleteAction(1,selectData)">
                    <i class="iconfont iconshanchu"></i>
                    删除
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
                :style="{'color':'#333','min-height':tableHeight + 'px'}"
              >
                  <el-table-column type="selection" align="center" width="50"></el-table-column>
                  <el-table-column prop="name" label="名称" width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="number" label="通道号" width="110" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="typeStr" label="通道类型" width="110" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="operatorStr" label="运营商" width="110" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="businessTypeStr" label="适用业务" width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="channelAccessStr" label="通道权限" width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column v-if="productType == 2" prop="expandStr" label="是否可扩展" width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column v-if="productType == 2" prop="expandNumber" label="可扩展位数" width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="concurrency" label="并发数" width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="costUnitStr" label="计费单位" width="75" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="unitPriceStr" label="计费单价￥" width="90" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="remark" label="备注" width="90" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="creator" label="创建人" width="90" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="statusStr" label="状态" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="createTime" label="创建时间" width="160" show-overflow-tooltip></el-table-column>
                  <el-table-column fixed="right" label="操作" min-width="110" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-tooltip v-has="'channelUpdate'"  effect="dark" content="修改" placement="top">
                          <img class="operation"  @click="editAction(scope.row)" src="../../assets/images/edit_icon.svg" >
                      </el-tooltip>
                      <el-tooltip v-has="'channelDelete'"  effect="dark" content="删除" placement="top">
                          <img class="operation"  @click="deleteAction(2,scope.row)"  src="../../assets/images/delete_icon.svg" >
                      </el-tooltip>
                    </template>
                  </el-table-column>
              </el-table>
            </div>
            <div class="footer_page">
              <el-pagination
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
    <!-- 新增/编辑通道 -->
    <el-drawer
      :title="channelDrawerTitle"
      :visible.sync="channelDrawer"
      :before-close="closeChannelDrawer"
      :modal-append-to-body="true"
      :wrapperClosable="false"
      size="500px"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="channelForm"
        :model="channelForm"
        :rules="channelRules"
        label-width="120px"
        label-position="right"
      >
        <el-form-item prop="channelName" label="名称：">
          <el-input size="small" v-model="channelForm.channelName"></el-input>
        </el-form-item>
        <el-form-item prop="port" label="通道号：">
          <el-input size="small" v-model="channelForm.port"></el-input>
        </el-form-item>
        <el-form-item prop="channelPassword" label="通道密码：">
          <el-input size="small" v-model="channelForm.channelPassword"></el-input>
        </el-form-item>
        <el-form-item prop="channelType" label="通道类型：">
          <el-select v-model="channelForm.channelType" clearable size="small" placeholder="请选择通道类型">
            <el-option
              v-for="item in channelTypeList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
        <el-form-item prop="business" label="适用业务：">
          <el-select v-model="channelForm.business" :disabled="channelForm.bindFlag" clearable size="small" placeholder="请选择适用业务">
            <el-option
              v-for="item in businessTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="channelAuthority" label="通道权限：">
          <el-select v-model="channelForm.channelAuthority" clearable size="small" placeholder="请选择通道权限">
            <el-option
              v-for="item in channelAuthorityList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="productType == 2" prop="isExtend" label="是否可扩展：">
          <el-select v-model="channelForm.isExtend" clearable size="small" placeholder="是否可扩展">
            <el-option
              v-for="item in isExtendList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="productType == 2 && channelForm.isExtend === 0" prop="extendNumber" label="可扩展位数：">
          <el-input size="small" v-model.number="channelForm.extendNumber" ></el-input>
        </el-form-item>
        <el-form-item prop="concurrency" label="并发数：">
          <el-input size="small" v-model.number="channelForm.concurrency" ></el-input>
        </el-form-item>
        <el-form-item prop="costUnit" label="计费单位：">
          <el-select v-model="channelForm.costUnit" clearable size="small" placeholder="请选择计费单位">
            <el-option
              v-for="item in costUnitList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="unitPrice" label="计费单价：">
          <el-input size="small" v-model="channelForm.unitPrice" ></el-input>
        </el-form-item>
        <el-form-item prop="radio" label="是否启用：">
          <el-radio-group v-model="channelForm.radio">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="imageUrl" label="通道logo：" v-if="channelForm.channelType === 8">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :http-request="uploadPictures"
            :before-upload="beforeAvatarUpload">
            <img v-if="channelForm.imageUrl" :src="channelForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>        
        </el-form-item>
        <el-form-item prop="remark" label="备注：">
          <el-input
            type="textarea"
            placeholder=""
            maxlength="200"
            :autosize="{ minRows: 4, maxRows: 8 }"
            show-word-limit
            v-model="channelForm.remark"
          ></el-input>
        </el-form-item>
        <el-form-item prop="parmentDepartment" label="">
            <el-button  type="primary" size="small" v-if="channelDrawerTitle === '新建通道'" @click="confirmAddChannel">提 交</el-button>
            <el-button  type="primary" size="small" v-if="channelDrawerTitle === '修改通道'" @click="confirmEditChannel">提 交</el-button>
            <el-button  size="small" @click="closeChannelDrawer">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

  </div>
</template>
<script>
import {getChannelList,addChannel,editChannel,deleteChannel,disableChannel,enableChannel,getProductTypeList,getBussinessTypeList,uploadFile} from '../../api/channel/api'
import { getCookie,getButtonList} from "../../public";

export default {
  name:'channelResources',
  props:{
    authorityBttonList:{
      type:Array
    }
  },
  data() {
    const validatePrice = (rule,value,callback) =>{
      let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{4})$/
      if(!value){
          callback(new Error('计费单价不能为空'))
        }else if(!reg.test(value)){
          callback(new Error('计费单价为数字且保留四位小数'))
        }else{
        callback();
      }
    }
    const validateConcurrency = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('并发数不能为空'));
      }
      if (!Number.isInteger(value) || value <= 0) {
        callback(new Error('并发数格式为正整数'));
      } else {
        callback();
      }
    };   
    const validateExtendNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('可扩展位数不能为空'));
      }
      if (!Number.isInteger(value) || value <= 0) {
        callback(new Error('可扩展位数格式为正整数'));
      } else {
        callback();
      }
    };   
    const validateChannelPassword = (rule, value, callback) => {
      let reg = new RegExp("[\\u4E00-\\u9FFF]+","g")
      if(!value){
          callback(new Error('通道密码不能为空'))
        }else if(reg.test(value)){
          callback(new Error('通道密码不可为中文'))
        }else if(value.length > 30){
          callback(new Error('通道密码长度不能超过30位'))
        }else{
        callback();
      }
    };   
    return {
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      productList:[],//产品列表
      productType:null,//选择的产品
      searchCont:null,//搜索内容
      tableData:[],
      status:null,
      statusList:[
        {
          id:0,
          value:'启用'
        },
        {
          id:1,
          value:'停用'
        }
      ],
      channelDrawerTitle:'',//新增修改账号抽屉标题
      channelDrawer:false,//是否显示账户抽屉
      businessTypeList: [],//业务列表
      channelTypeList:[],//通道类型列表
      operatorList:[
        {
          id:0,
          value:'全网'
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
      channelAuthorityList:[],//通道权限列表
      isExtendList:[
        {
          id:0,
          value:'是'
        },
        {
          id:1,
          value:'否'
        }
      ],//是否可扩展列表
      costUnitList:[
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
        }
      ],//计费单位列表
      channelForm:{
        id:null,
        channelName:null,//通道名称
        port:null, //通道号
        channelPassword:null,//通道密码
        channelType:null, //通道类型
        operator:null, //运营商
        business:null, //使用业务
        channelAuthority:null, //通道权限
        isExtend:null, //是否可扩展
        extendNumber:null, //扩展位数
        concurrency:null,//并发数
        costUnit: null,//计费单位
        unitPrice: null,//计费单价
        radio:0,//是否启用
        imageUrl:null,
        remark:null,//备注
        bindFlag:false
      },//套餐表单数据
      channelRules: {
        channelName:[
          { required: true, message: "名称不能为空", trigger: "blur" },
          { max: 50, message: "名称不超过50个字符", trigger: "blur" },
        ],
        port:[{ required: true, message: "通道号不能为空", trigger: "blur" }],
        channelPassword:[{ required: true, validator:validateChannelPassword, trigger: "blur" }],
        channelType:[{ required: true, message: "通道类型不能为空", trigger: "change" }],
        operator:[{ required: true, message: "运营商不能为空", trigger: "change" }],
        business:[{ required: true, message: "适用业务不能为空", trigger: "change" }],
        channelAuthority:[{ required: true, message: "通道权限不能为空", trigger: "change" }],
        isExtend:[{ required: true, message: "是否可扩展不能为空", trigger: "change" }],
        extendNumber:[{ required: true, message: "可扩展位数不能为空", trigger: "blur" }],
        extendNumber:[
          { required: true, validator:validateExtendNumber, trigger: "blur" }
          // { required: true, message: "可扩展位数不能为空", trigger: "blur" },
          // { type:'number', message: "可扩展位数格式不正确", trigger: "blur" },
        ],
        costUnit:[{ required: true, message: "计费单位不能为空", trigger: "change" }],
        unitPrice:[{ required: true, validator:validatePrice, trigger: "blur" }],
        concurrency:[
          { required: true, validator:validateConcurrency, trigger: "blur" }
          // {required: true, message: "并发数不能为空", trigger: "blur" },
          // { type:'number', message: "并发数格式不正确", trigger: "blur" }
        ],
        radio:[{ required: true, message: "请选择是否启用", trigger: "change" }],
        imageUrl:[{ required: true, message: "通道logo不能为空", trigger: "change" }]
      },//套餐表单验证规则
      selectData:[],//表格选择的数据
      isDisable:true,//是否禁用头部按钮
      selectTab:'5G消息',
      tableHeight:window.innerHeight - 369 +'',
      timer: null,
      // headers : {Authorization:getCookie('enterprisePass')},
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
    // 获取账户列表数据
    getDataList(){
      this.loading = true
      let params ={
        productType:Number(this.productType),
        name: this.searchCont,
        status: this.status,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      getChannelList(params).then(res=>{
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
    handleClick(tab){
      this.selectTab = tab.label
      this.productType = tab.name
      this.status = null
      this.searchCont= null
      this.getDataList()
    },
    // 刷新
    refresh(){
      this.getDataList()
    },
    // 重置清空
    reset(){
      this.currentPage = 1
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
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.searchAction();
      }
    },
    // 获取业务类型
    getTypeListData(){
      let params = {id:this.productType}
      getBussinessTypeList(params).then(res=>{
        if(res.status == 0){
          this.businessTypeList = res.data
          // this.industryTypeList = res.data.industryType
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
    // 新建通道
    createChannel(){
      this.getTypeListData()
      this.getFilterTypeList()
      this.channelDrawerTitle = '新建通道'
      this.channelForm.id = null,
      this.channelForm.channelName = null,//通道名称
      this.channelForm.port = null, //通道号
      this.channelForm.channelPassword = null,//通道密码
      this.channelForm.channelType = null, //通道类型
      this.channelForm.operator = null, //运营商
      this.channelForm.business = null, //使用业务
      this.channelForm.channelAuthority = null, //通道权限
      this.channelForm.isExtend = null, //是否可扩展
      this.channelForm.extendNumber = null, //扩展位数
      this.channelForm.concurrency = null,//并发数
      this.channelForm.costUnit =  null,//计费单位
      this.channelForm.unitPrice =  null,//计费单价
      this.channelForm.radio = 0,//是否启用
      this.channelForm.imageUrl = null//logo
      this.channelForm.remark = null//备注
      this.channelForm.bindFlag = false 
      this.$nextTick(()=>{
        this.$refs.channelForm.clearValidate();
      })
      this.channelDrawer = true
    },
    // 确认新建通道
    confirmAddChannel(){
      this.$refs.channelForm.validate((valid) => {
        if(valid){
          if (this.timer) {
            clearTimeout(this.timer);
          }
          let _this = this
          this.timer = setTimeout(function () {
            _this.timer = null;
            let params ={
              businessType: _this.channelForm.business,
              channelAccess: _this.channelForm.channelAuthority,
              concurrency: _this.channelForm.concurrency,
              costUnit: _this.channelForm.costUnit,
              expand: _this.channelForm.isExtend,
              expandNumber: _this.channelForm.extendNumber,
              name: _this.channelForm.channelName,
              number: _this.channelForm.port,
              operator: _this.channelForm.operator,
              productType: _this.productType,
              remark: _this.channelForm.remark,
              status: _this.channelForm.radio,
              type: _this.channelForm.channelType,
              unitPrice: _this.channelForm.unitPrice,
              password:_this.channelForm.channelPassword,
              logoUrl:_this.channelForm.imageUrl
            }
            addChannel(params).then(res=>{
              if(res.status == 0){
                _this.$message.success({
                  message:'通道新建成功',
                  center:true
                })
                _this.getDataList()
                _this.closeChannelDrawer()
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
      this.getTypeListData()
      this.getFilterTypeList()
      this.channelDrawerTitle = '修改通道'
      this.channelForm.id = row.id,
      this.channelForm.channelName = row.name,//通道名称
      this.channelForm.port = row.number, //通道号
      this.channelForm.channelPassword = row.password, //通道密码
      this.channelForm.channelType = row.type, //通道类型
      this.channelForm.operator = row.operator, //运营商
      this.channelForm.business = row.businessType, //使用业务
      this.channelForm.channelAuthority = row.channelAccess, //通道权限
      this.channelForm.isExtend = row.expand, //是否可扩展
      this.channelForm.extendNumber = row.expandNumber, //扩展位数
      this.channelForm.concurrency = row.concurrency,//并发数
      this.channelForm.costUnit =  row.costUnit,//计费单位
      this.channelForm.unitPrice =  row.unitPriceStr,//计费单价
      this.channelForm.radio = row.status,//是否启用
      this.channelForm.imageUrl = row.logoUrl //logo
      this.channelForm.remark = row.remark//备注
      this.channelForm.bindFlag = row.bindFlag
      this.channelDrawer = true
    },
    // 修改套餐确认
    confirmEditChannel(){
      this.$refs.channelForm.validate((valid) => {
        if(valid){
          let params = {
            id: this.channelForm.id,
            businessType: this.channelForm.business,
            channelAccess: this.channelForm.channelAuthority,
            concurrency: this.channelForm.concurrency,
            costUnit: this.channelForm.costUnit,
            expand: this.channelForm.isExtend,
            expandNumber: this.channelForm.extendNumber,
            name: this.channelForm.channelName,
            number: this.channelForm.port,
            operator: this.channelForm.operator,
            productType: this.productType,
            remark: this.channelForm.remark,
            status: this.channelForm.radio,
            type: this.channelForm.channelType,
            unitPrice: this.channelForm.unitPrice,
            password:this.channelForm.channelPassword,
            logoUrl:this.channelForm.imageUrl
          }
          editChannel(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'通道修改成功',
                center:true
              })
              this.getDataList()
              this.closeChannelDrawer()
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
    // 停用
    stopUse(){
      let ids = []
      for(let i =0;i<this.selectData.length;i++){
        if(this.selectData[i].status !== 0 ){
          this.$message.warning({
            message:'通道已启用状态才可停用！',
            center:true
          })
          return
        }
        ids.push(this.selectData[i].id)
      }
      this.$confirm("确定停用已选中的通道吗？", {
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
                message:'操作成功',
                center:true
              })
              this.getDataList()
            }else{
              this.$message({
                // message:res.message,
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
        })
        .catch(() => {
          console.log("取消");
        });
    },
    // 启用
    startUse(){
      let ids = []
      for(let i =0;i<this.selectData.length;i++){
        if(this.selectData[i].status !== 1 ){
          this.$message.warning({
            message:'通道停用状态才可启用！',
            center:true
          })
          return
        }
        ids.push(this.selectData[i].id)
      }
      let params = {ids:ids.toString()}
      enableChannel(params).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'操作成功',
            center:true
          })
          this.getDataList()
        }else{
          this.$message({
            // message:res.message,
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
      this.$confirm("确定删除已选中的通道吗？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          deleteChannel(params).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'操作成功',
                center:true
              })
              this.getDataList()
            }else{
              this.$message({
                // message:res.message,
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
        })
        .catch(() => {
          console.log("取消");
        });
    },
    // 根据产品获取对应的下拉列表
    getFilterTypeList(){
      if(this.productType == 1){
        this.channelTypeList =  [
          {
            id:0,
            value:'Chatbot'
          },
          {
            id:8,
            value:'web Chatbot'
          },
        ]
        this.channelAuthorityList = [
          {
            id:0,
            value:'下行'
          },
          {
            id:1,
            value:'上行下行'
          }
        ]
      }else if(this.productType == 2){
        this.channelTypeList =  [
          {
            id:1,
            value:'CMPP'
          },
        ]
        this.channelAuthorityList = [
          {
            id:0,
            value:'下行'
          },
          {
            id:1,
            value:'上行下行'
          }
        ]
      }else{
        this.channelTypeList =  [
          {
            id:2,
            value:'95通道'
          },
          {
            id:3,
            value:'96通道'
          },
          {
            id:4,
            value:'400通道'
          },
          {
            id:5,
            value:'DID通道'
          },
          {
            id:6,
            value:'强显通道'
          },
          {
            id:7,
            value:'透传通道'
          }
        ]
        this.channelAuthorityList = [
          {
            id:2,
            value:'呼入'
          },
          {
            id:3,
            value:'呼出'
          },
          {
            id:4,
            value:'呼入呼出'
          }
        ]
      }
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
    closeChannelDrawer(){
      this.$nextTick(()=>{
        this.$refs.channelForm.resetFields();
        this.channelDrawer = false
      })
    },
    // 头部搜索下拉框选中后失焦防止回车触发下拉框
    isShowSelectOptions(isShowSelectOptions){
      if(!isShowSelectOptions) this.$refs[`${this.productType}`+`${this.selectTab}`][0].blur();
    },
    // 上传logo
    uploadPictures(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      uploadFile(formData).then((res) => {
        if (res.status == 0) {
          this.channelForm.imageUrl = res.data
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
    // 上传logo前
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error('通道logo格式为JPG/PNG!');
      }
      if (!isLt2M) {
        this.$message.error('通道logo大小不能超过 5MB!');
      }
      return isJPG && isLt2M;
    }  
},
  mounted() {
    this.getProduct()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },

};
</script>

<style lang="less" scoped>
#channelResources{
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
.el-textarea{
  width: 260px;
}
.headerBtn /deep/ .el-input--suffix {
  width: 160px;
}
#channelResources /deep/ .el-dialog__footer {
  text-align: center ;
}
#channelResources /deep/ .is-active {
  background-color: transparent !important;
}
#channelResources /deep/ .el-tabs__header{
  margin-bottom: 30px;
}
.drawerContent{
  padding: 0 50px;
}
/deep/ .el-tabs__nav-wrap::after{
    height: 1px;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
/deep/ .avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
/deep/ .avatar {
  width: 60px;
  height: 60px;
  display: block;
}
</style>
