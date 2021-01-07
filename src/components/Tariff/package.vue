<template>
  <div id="package" v-loading="loading"  element-loading-text="loading">
    <div class="title">资费套餐</div>
    <div class="container">
      <div class="headerBtn">
        <div class="headerBtnLeft">
          <el-button class="addBtn" type="primary" size="small"  @click="refresh">
            <i class="iconfont iconshuaxin"></i>
          </el-button>
          <el-button class="addBtn" type="primary" size="small"  @click="reset">
            <i class="iconfont iconguanbi"></i>
          </el-button> 
          <el-select v-model="packageStatus" clearable size="small" placeholder="套餐状态">
            <el-option
              v-for="item in packageStatusList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="套餐名称">
            <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="headerBtnRight">
            <el-button  type="primary"  size="small" v-if="addAccountBtn"  @click="createPackage">
              <i class="iconfont iconxinzeng"></i>
              新建
            </el-button>
            <el-button  class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small" v-if="changeBtn"  @click="changeConfigur">
              <i class="iconfont iconbiangengneirong"></i>
              变更资费项
            </el-button>
            <el-button  class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small" v-if="disableBtn" @click="stopUse">
              <i class="iconfont icontingyong"></i>
              停用
            </el-button>
            <el-button  class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small" v-if="enableBtn"  @click="startUse">
              <i class="iconfont iconzhuanweiqiyong"></i>
              启用
            </el-button>
            <el-button  class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small" v-if="deleteBtn"  @click="deleteAction(1,selectData)">
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
          :style="{'color':'#333','min-height':tableHeight + 'px'}"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                border
                :header-cell-style="{background:'#F5F7FA',color:'#333333',lineHeight:'20px'}"
                size="small"
                :data="props.row.packageCostItemList"
              >
                <el-table-column prop="name" label="名称"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="description" label="描述"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="productTypeStr" label="适用产品"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="businessTypeStr" label="适用业务"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="industryTypeStr" label="适用行业"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="costUnitStr" label="计费单位" width="75" show-overflow-tooltip></el-table-column>
                <el-table-column prop="unitPrice" label="计费单价￥" width="90" show-overflow-tooltip></el-table-column>
                <el-table-column prop="updatedBy" label="归属"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="validStartTime" label="生效时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="validEndTimeStr" label="结束时间" show-overflow-tooltip></el-table-column>
              </el-table> 
            </template>
          </el-table-column> 
          <el-table-column type="selection" align="center" width="50"></el-table-column>     
          <el-table-column prop="name"  label="套餐名称" width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="description" label="描述" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="productTypeStr" label="产品" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="belongTo" label="归属" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column prop="statusStr" label="状态" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <div  class="status">
                <span v-if="scope.row.status === 0">待审核</span>
                <span v-if="scope.row.status === 1">正常</span>
                <span v-if="scope.row.status === 2">审核拒绝</span>
                <span v-if="scope.row.status === 3">停用</span>
                <el-tooltip v-if="scope.row.status == 2" class="item" effect="dark" :content="scope.row.checkContent" placement="top">
                    <img  src="../../assets/images/redWarning_icon.png" alt="">
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column  label="操作" min-width="110" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip v-if="editBtn"  effect="dark" content="修改" placement="top">
                <img class="operation"  @click="editAction(scope.row)" src="../../assets/images/edit_icon.svg" >
              </el-tooltip>
              <el-tooltip v-if="deleteBtn"  effect="dark" content="删除" placement="top">
                <img class="operation"  @click="deleteAction(2,scope.row)"  src="../../assets/images/delete_icon.svg" >
              </el-tooltip>
              <!-- <img class="operation" v-if="editBtn" @click="editAction(scope.row)" src="../../assets/images/edit_icon.svg" >
              <img class="operation" v-if="resetPasswordBtn" @click="resetPassword(scope.row)" src="../../assets/images/resetPassword.svg" >
              <img class="operation" v-if="deleteBtn" @click="deleteAction(2,scope.row)"  src="../../assets/images/delete_icon.svg" > -->
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
    <!-- 新增/编辑套餐 -->
    <el-drawer
      :title="packageDrawerTitle"
      :visible.sync="packageDrawer"
      :before-close="closePackageDrawer"
      :modal-append-to-body="true"
      :wrapperClosable="false"
      size="460px"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="packageForm"
        :model="packageForm"
        :rules="packageRules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item prop="packageName" label="套餐名称：">
          <el-input size="small" v-model="packageForm.packageName"></el-input>
        </el-form-item>
        <el-form-item prop="describe" label="描述">
          <el-input
            type="textarea"
            placeholder=""
            maxlength="200"
            :autosize="{ minRows: 8, maxRows: 10 }"
            show-word-limit
            v-model="packageForm.describe"
          ></el-input>
        </el-form-item>
        <el-form-item prop="product" label="适用产品：">
          <el-select v-model="packageForm.product" clearable size="small" placeholder="请选择适用产品">
            <el-option
              v-for="item in productList"
              :key="item.id"
              :label="item.dictionaryName"
              :value="item.id"
            >
            </el-option> 
          </el-select>
        </el-form-item> 
        <el-form-item prop="parmentDepartment" label="">
            <el-button  type="primary" size="small" v-if="packageDrawerTitle === '新建套餐'" @click="confirmAddPackage">确 定</el-button>
            <el-button  type="primary" size="small" v-if="packageDrawerTitle === '编辑套餐'" @click="confirmEditPackage">确 定</el-button>
            <el-button  size="small" @click="closePackageDrawer">取 消</el-button> 
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 变更资费项 -->
    <el-dialog
      title="变更资费项"
      class="changeTraiff"
      :visible.sync="changeTraiffToast"
      :close-on-click-modal="false"
      :before-close="closeTraiffToast"
      width="800px"
    >
      <div>
        <div class="bodyHeader">
          <div class="bodyHeaderLeft">
            <el-button class="addBtn" type="primary" size="small"  @click="refreshToast">
              <i class="iconfont iconshuaxin"></i>
            </el-button>
            <el-button class="addBtn" type="primary" size="small"  @click="resetToast">
              <i class="iconfont iconguanbi"></i>
            </el-button> 
          </div>
          <div class="bodyHeaderRight">
            <el-input v-model="channelName" size="small" maxlength="50" placeholder="通道组名称">
              <i @click="searchChannelName" slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input> 
          </div> 
        </div>
        <div class="bodyMain">
          <el-table
            border
            :header-cell-style="{background: '#F5F7FA',color: '#333333',lineHeight: '20px'}"
            size="small"
            @selection-change="handleSelectionChange2"
            :data="traiffData"
            height="330"
            v-loading="loading2"  
            element-loading-text="loading"
          >
            <el-table-column type="selection" align="center" width="50"></el-table-column>  
            <el-table-column prop="name" label="名称" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="description" label="描述" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productTypeStr" label="适用产品" width="110" show-overflow-tooltip></el-table-column>
            <el-table-column prop="businessTypeStr" label="适用业务" width="110" show-overflow-tooltip></el-table-column>
            <el-table-column prop="industryTypeStr" label="适用行业" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="costUnitStr" label="计费单位" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="unitPrice" label="计费单价￥" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="belongTo" label="归属" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="validStartTime" label="生效时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="validEndTimeStr" label="结束时间" width="160" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="bodyFooter">
          <span>已选择<span> {{selectData2.length}} 项</span></span>
          <el-pagination
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-size="10"
            :pager-count="5"
            layout=" prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="confirmChange" >确 认</el-button>
        <el-button @click="closeTraiffToast" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getPackageList,productypeList,addPackage,editPackage,deletePackage,disablePackage,enablePackage,changeTariffList,changeTariff} from '../../api/tariff/api'
import { getCookie,getButtonList} from "../../public";

export default {
  name:'package',
  props:{
    authorityBttonList:{
      type:Array
    }
  },
  data() {
    return {
      loading:false,
      loading2:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      packageStatus:null,//套餐状态
      packageStatusList:[
        {
          id:0,
          value:'待审核'
        },
        {
          id:1,
          value:'正常'
        },
        {
          id:2,
          value:'审核拒绝'
        },
        {
          id:3,
          value:'停用'
        }
      ],//套餐状态列表
      searchCont:null,//搜索内容
      tableData:[],
      packageDrawerTitle:'',//新增修改账号抽屉标题
      packageDrawer:false,//是否显示账户抽屉
      changeTraiffToast:false,//更改资费项弹窗
      productList: [],//产品列表
      packageForm:{
        id:null,
        packageName:null,
        describe:null,
        product:null
      },//套餐表单数据
      packageRules: {
        packageName:[
          { required: true, message: "套餐名称不能为空", trigger: "blur" },
          { max: 10, message: "名称不超过10个字", trigger: "blur" },
        ],
        product:[{ required: true, message: "适用产品不能为空", trigger: "change" }],
      },//套餐表单验证规则
      selectData:[],//表格选择的数据
      traiffData:[],//资费项数据
      channelName:null,//通道组名称
      currentPage2:1,//弹窗数据当前页
      selectData2:[],//弹窗表格选中的数据
      isDisable:true,//是否禁用头部按钮
      addAccountBtn:false,//创建账户按钮
      editBtn:false,//修改按钮
      changeBtn:false,//变更配置按钮 
      disableBtn:false,//停用按钮
      enableBtn:false,//启用按钮 
      unlockBtn:false,//解锁按钮 
      deleteBtn:false,//删除按钮 
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
        packageName: this.searchCont,
        status: this.packageStatus,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      getPackageList(params,this.headers).then(res=>{
        this.loading = false
        if(res.status == 0){
          this.tableData = res.data.records
          this.total = res.data.total
        }else{
          this.$message({
            message:err,
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
    // 刷新
    refresh(){
      this.getDataList()
    },
    // 重置清空
    reset(){
      this.currentPage = 1 
      this.pageSize = 10
      this.packageStatus = null
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
    getProductList(){
      productypeList({typeCode:'productType'},this.headers).then(res=>{
        if(res.status == 0){
          this.productList = res.data
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
    // 新建套餐
    createPackage(){
      this.getProductList()
      this.packageDrawerTitle = '新建套餐'
      this.packageForm.id = null
      this.packageForm.packageName = ''
      this.packageForm.product = ''
      this.packageForm.describe =  ''
      this.packageDrawer = true
    },
    // 确认新建套餐
    confirmAddPackage(){
      this.$refs.packageForm.validate((valid) => {
        if(valid){
          if (this.timer) {
            clearTimeout(this.timer);
          }
          let _this = this
          this.timer = setTimeout(function () {
            _this.timer = null;
            let params ={
              description: _this.packageForm.describe,
              name: _this.packageForm.packageName,
              productType: _this.packageForm.product,
            }
            addPackage(params,_this.headers).then(res=>{
              if(res.status == 0){
                _this.$message.success({
                  message:'套餐新建成功',
                  center:true
                })
                _this.getDataList()
                _this.closePackageDrawer()
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
      this.getProductList()
      this.packageDrawerTitle = '编辑套餐'
      this.packageForm.id = row.id
      this.packageForm.packageName = row.name
      this.packageForm.product = row.productType
      this.packageForm.describe =  row.description
      this.packageDrawer = true
    },
    // 修改套餐确认
    confirmEditPackage(){
      this.$refs.packageForm.validate((valid) => {
        if(valid){
          let params = {
            id: this.packageForm.id,
            description: this.packageForm.describe,
            name: this.packageForm.packageName,
            productType: this.packageForm.product,
          }
          editPackage(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'套餐修改成功',
                center:true
              })
              this.getDataList()
              this.closePackageDrawer()
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
    // 获取资费项数据
    getTariffList(){
      this.loading2 = true
      let params = {
        name:this.channelName,
        // productType: 0,
        // type: 0,
        pageSize: 10,
        currentPage: this.currentPage2
      }
      changeTariffList(params,this.headers).then(res=>{
        this.loading2 = false
        if(res.status == 0){
          this.traiffData = res.data.records
          // this.traiffData.push(...res.data.records)
        }else{
          this.$message({
            message:res.message,
            center:true,
            type:res.status === 2 ? 'warning':'error'
          })
        }
      }).catch(err=>{
        this.loading2 = false
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    // 刷新弹窗数据
    refreshToast(){
      this.getTariffList()
    }, 
    // 重置弹窗数据
    resetToast(){
      this.channelName = null
      this.currentPage2 = 1
      this.getTariffList()
    }, 
    // 弹窗条件查询
    searchChannelName(){
      this.currentPage2 = 1
      this.getTariffList()
    }, 
    // 变更配置
    changeConfigur(){
      this.getTariffList()
      this.changeTraiffToast = true
      window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
    },
    // 确认变更资费项
    confirmChange(){
      let ids =[]
      this.selectData2.map(item=>{
        ids.push(item.id)
      })
      let params= {
        costItemIds: ids.toString(),
        id: this.selectData[0].id
      }
      changeTariff(params,this.headers).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'资费项变更成功',
            center:true
          })
          this.closeTraiffToast()
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
    // 停用
    stopUse(){
      let ids = []
      for(let i =0;i<this.selectData.length;i++){
        if(this.selectData[i].status !== 1 ){
          this.$message.error({
            message:'套餐正常状态才可停用！',
            center:true
          })
          return
        }
        ids.push(this.selectData[i].id)
      }
      this.$confirm("确定停用所选套餐么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          disablePackage(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'套餐停用成功',
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
        if(this.selectData[i].status !== 3 ){
          this.$message.error({
            message:'套餐停用状态才可启用！',
            center:true
          })
          return
        }
        ids.push(this.selectData[i].id)
      }
      this.$confirm("确定启用所选套餐么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          enablePackage(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'套餐启用成功',
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
      this.$confirm("确定删除所选套餐么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          deletePackage(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'套餐删除成功',
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
    // 弹窗选择页数
    handleCurrentChange2(val){
      this.currentPage2 = val;
      this.getTariffList()
    },
    // 表格选择
    handleSelectionChange(val){
      this.selectData = val
      this.isDisable = val.length < 1 ? true : false;
    },
    // 弹窗表格选择
    handleSelectionChange2(val){
      this.selectData2 = val
    },
    // 关闭新增/编辑账号抽屉前重置表单规则
    closePackageDrawer(){
      this.$nextTick(()=>{
        this.$refs.packageForm.resetFields();
        this.packageDrawer = false
      })  
    },
    // 关闭重置密码弹窗清除表单规则
    closeTraiffToast(){
      this.changeTraiffToast = false
      window.addEventListener("keydown", this.keyDown); //绑定监听事件
      // this.$nextTick(()=>{
      //   this.$refs.resetPasswordForm.resetFields();
      //   this.resetToast = false
      // })  
    }
  },
  watch: {
    authorityBttonList:{
      handler(data) {
        let btns = getButtonList(data,'/businessAccount')
        if(btns){
          btns.map(item=>{
            if(item.code == "enterpriseAccountAdd") this.addAccountBtn = true
            if(item.code == "enterpriseAccountUpdate") this.editBtn = true
            if(item.code == "enterpriseAccountConfigUpdate") this.changeBtn = true
            if(item.code == "enterpriseAccountDisable") this.disableBtn = true
            if(item.code == "enterpriseAccountEnable") this.enableBtn = true
            if(item.code == "enterpriseAccountUnlock") this.unlockBtn = true
            if(item.code == "enterpriseAccountDelete") this.deleteBtn = true
            if(item.code == "enterpriseAccountPasswordReset") this.resetPasswordBtn = true
          })
        }
      },
      immediate: true,
      deep: true,
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
#package{
  width: 100%;
  height: 100%;
  background-color: #fff;
  // overflow: auto;
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
    .status{
      display: flex;
      align-items: center;
      img{
        margin-left: 10px;
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
#package /deep/ .el-dialog__footer {
  text-align: center ;
}
.changeTraiff /deep/ .el-dialog__header{
  padding: 20px 30px 10px;
}
.changeTraiff /deep/ .el-dialog__body {
  padding: 5px 30px 10px;
}
.bodyHeader{
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  /deep/ .el-button+.el-button{
    margin-left: -4px;
  }
  .el-input {
    width: 160px;
    margin-left: 0;
  }
}
// .bodyMain{
//   overflow: auto;
// }
.bodyFooter{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  // /deep/ .el-input{
  //   width: 46px;
  // }
  // /deep/ .el-input__inner {
  //   width: 46px;
  // }

}
</style>