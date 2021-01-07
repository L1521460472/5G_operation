<template>
  <div id="tariff" v-loading="loading"  element-loading-text="loading">
    <div class="title">资费项</div>
    <div class="container">
      <div class="headerBtn">
        <div class="headerBtnLeft">
          <el-button class="addBtn" type="primary" size="small"  @click="refresh">
            <i class="iconfont iconshuaxin"></i>
          </el-button>
          <el-button class="addBtn" type="primary" size="small"  @click="reset">
            <i class="iconfont iconguanbi"></i>
          </el-button> 
          <el-select v-model="productType" clearable size="small" placeholder="适用产品">
            <el-option
              v-for="item in productTypeList"
              :key="item.id"
              :label="item.dictionaryName"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="资费项名称">
            <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="headerBtnRight">
            <el-button  type="primary"  size="small" v-if="addAccountBtn"  @click="createTariff">
              <i class="iconfont iconxinzeng"></i>
              新建
            </el-button>
            <el-button  class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small" v-if="changeBtn"  @click="editAction(selectData[0])">
              <i class="iconfont iconxiugai"></i>
              修改
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
            <el-table-column type="selection" align="center" width="50"></el-table-column>     
            <el-table-column prop="name" label="名称" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="description" label="描述" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productTypeStr" label="适用产品" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="businessTypeStr" label="适用业务" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="industryTypeStr" label="适用行业" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="costUnitStr" label="计费单位" width="75" show-overflow-tooltip></el-table-column>
            <el-table-column prop="unitPrice" label="计费单价￥" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="belongTo" label="归属" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="statusStr" label="状态" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.status === 0">正常</span>
                <span v-if="scope.row.status === 1">停用</span>
              </template>  
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="validStartTime" label="生效时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="validEndTimeStr" label="结束时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column  label="操作" min-width="110" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip v-if="editBtn"  effect="dark" content="修改" placement="top">
                    <img class="operation"  @click="editAction(scope.row)" src="../../assets/images/edit_icon.svg" >
                </el-tooltip>
                <el-tooltip v-if="deleteBtn"  effect="dark" content="删除" placement="top">
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
    <!-- 新增/编辑资费项 -->
    <el-drawer
      :title="tariffDrawerTitle"
      :visible.sync="tariffDrawer"
      :before-close="closeTariffDrawer"
      :modal-append-to-body="true"
      :wrapperClosable="false"
      size="470px"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="tariffForm"
        :model="tariffForm"
        :rules="tariffRules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item prop="tariffName" label="名称：">
          <el-input size="small" v-model="tariffForm.tariffName"></el-input>
        </el-form-item>
        <el-form-item prop="describe" label="描述：">
          <el-input
            type="textarea"
            placeholder=""
            maxlength="100"
            :autosize="{ minRows: 4, maxRows: 8 }"
            show-word-limit
            v-model="tariffForm.describe"
          ></el-input>      
        </el-form-item>
        <el-form-item prop="product" label="适用产品：">
          <el-select v-model="tariffForm.product" clearable size="small" placeholder="请选择适用产品">
            <el-option
              v-for="item in productTypeList"
              :key="item.id"
              :label="item.dictionaryName"
              :value="item.id"
            >
            </el-option> 
          </el-select>
        </el-form-item> 
        <el-form-item prop="business" label="适用业务：">
          <el-select v-model="tariffForm.business" clearable size="small" placeholder="请选择适用业务">
            <el-option
              v-for="item in businessTypeList"
              :key="item.id"
              :label="item.dictionaryName"
              :value="item.id"
            >
            </el-option> 
          </el-select>
        </el-form-item> 
        <el-form-item prop="industry" label="适用行业：">
          <el-select v-model="tariffForm.industry" clearable size="small" placeholder="请选择适用行业">
            <el-option
              v-for="item in industryTypeList"
              :key="item.id"
              :label="item.dictionaryName"
              :value="item.id"
            >
            </el-option> 
          </el-select>
        </el-form-item> 
        <el-form-item prop="costUnit" label="计费单位：">
          <el-select v-model="tariffForm.costUnit" clearable size="small" placeholder="请选择计费单位">
            <el-option
              v-for="item in costUnitList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option> 
          </el-select>
        </el-form-item> 
        <el-form-item prop="price" label="计费单价：">
          <el-input size="small" v-model="tariffForm.price" ></el-input>
        </el-form-item>
        <el-form-item prop="validStartTime"  label="生效时间：">
          <el-date-picker
            size="small"
            v-model="tariffForm.validStartTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:ss:mm"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endTimeType" label="结束时间：">
          <el-select v-model="tariffForm.endTimeType" @change="changeEndTime" clearable size="small" placeholder="请选择结束时间">
            <el-option
              v-for="item in endTimeTypeList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            > 
            </el-option> 
          </el-select>
        </el-form-item>
        <el-form-item prop="validEndTimeStr" label="" v-if="showSelectEndTime">
          <el-date-picker
            size="small"
            v-model="tariffForm.validEndTimeStr"
            type="datetime"
            value-format="yyyy-MM-dd HH:ss:mm"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="parmentDepartment" label="">
            <el-button  type="primary" size="small" v-if="tariffDrawerTitle === '新建资费项'" @click="confirmAddTariff">提 交</el-button>
            <el-button  type="primary" size="small" v-if="tariffDrawerTitle === '编辑资费项'" @click="confirmEditTariff">提 交</el-button>
            <el-button  size="small" @click="closeTariffDrawer">取 消</el-button> 
        </el-form-item>
      </el-form>
    </el-drawer>

  </div>
</template>
<script>
import {getTariffData,addTariff,editTariff,deleteTariff,disableTariff,enableTariff,getTypeList} from '../../api/tariff/api'
import { getCookie,getButtonList} from "../../public";

export default {
  name:'tariff',
  props:{
    authorityBttonList:{
      type:Array
    }
  },
  data() {
    return {
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      productType:null,//资费项状态
      endTimeTypeList:[
        {
          id:0,
          value:'永久有效'
        },
        {
          id:1,
          value:'指定日期'
        }
      ],//资费项状态列表
      searchCont:null,//搜索内容
      tableData:[],
      tariffDrawerTitle:'',//新增修改账号抽屉标题
      tariffDrawer:false,//是否显示账户抽屉
      businessTypeList: [],//业务列表
      productTypeList: [],//产品列表
      industryTypeList: [],//行业列表
      costUnitList:[
        {
          id:0,
          value:'条'
        },
        {
          id:1,
          value:'分钟'
        },
        {
          id:2,
          value:'每秒'
        },
      ],//计费单位列表
      tariffForm:{
        id:null,
        tariffName:null, //资费项名字
        describe:null, //描述
        product:null, //适用产品
        business:null, //适用业务
        industry:null, //适用行业
        costUnit:null, //计费单位
        price:null, //计费单价
        endTimeType:null, // 结束时间类型
        validStartTime:null, // 生效时间
        validEndTimeStr:null, //结束时间
      },//资费项表单数据
      tariffRules: {
        tariffName:[
          { required: true, message: "名称不能为空", trigger: "blur" },
          // { max: 10, message: "名称不超过10个字", trigger: "blur" },
        ],
        describe:[{ required: true, message: "描述不能为空", trigger: "blur" }],
        product:[{ required: true, message: "适用产品不能为空", trigger: "change" }],
        business:[{ required: true, message: "适用业务不能为空", trigger: "change" }],
        industry:[{ required: true, message: "适用行业不能为空", trigger: "change" }],
        costUnit:[{ required: true, message: "计费单位不能为空", trigger: "change" }],
        price:[{ required: true, message: "计费单价不能为空", trigger: "blur" }],
        endTimeType:[{ required: true, message: "请选择结束时间", trigger: "change" }],
        validStartTime:[{ required: true, message: "生效时间不能为空", trigger: "change" }],
        validEndTimeStr:[{ required: true, message: "结束时间不能为空", trigger: "change" }],
      },//资费项表单验证规则
      showSelectEndTime:false,//是否显示结束时间选择器
      selectData:[],//表格选择的数据
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
        name: this.searchCont,
        productType: this.productType,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      getTariffData(params,this.headers).then(res=>{
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
    // 刷新
    refresh(){
      this.getDataList()
    },
    // 重置清空
    reset(){
      this.currentPage = 1 
      this.pageSize = 10
      this.productType = null
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
      let params = ['productType','businessType','industryType']
      getTypeList(params,this.headers).then(res=>{
        if(res.status == 0){
          this.productList = res.data
          this.businessTypeList = res.data.businessType,
          this.productTypeList = res.data.productType,
          this.industryTypeList = res.data.industryType
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
    // 新建资费项
    createTariff(){
      // this.getTypeListData()
      this.tariffDrawerTitle = '新建资费项'
      this.tariffForm.tariffName = null, //资费项名字
      this.tariffForm.describe = null, //描述
      this.tariffForm.product = null, //适用产品
      this.tariffForm.business = null, //适用业务
      this.tariffForm.industry = null, //适用行业
      this.tariffForm.costUnit = null, //计费单位
      this.tariffForm.price = null, //计费单价
      this.tariffForm.endTimeType = null, // 结束时间类型
      this.tariffForm.validStartTime = null, // 生效时间
      this.tariffForm.validEndTimeStr = null, //结束时间
      this.showSelectEndTime = false
      this.tariffDrawer = true
    },
    // 改变结束时间类型
    changeEndTime(val){
      this.showSelectEndTime = val === 0 ? false:true
      if(val === 0){
        this.tariffForm.validEndTimeStr = null
      }
    },
    // 确认新建资费项
    confirmAddTariff(){
      this.$refs.tariffForm.validate((valid) => {
        if(valid){
          if(this.tariffForm.endTimeType === 1 && Date.parse(this.tariffForm.validStartTime) > Date.parse(this.tariffForm.validEndTimeStr)){
            this.$message.error({
              message:'结束时间不能大于生效时间',
              center:true
            })
            return
          }
          if (this.timer) {
            clearTimeout(this.timer);
          }
          let _this = this
          this.timer = setTimeout(function () {
            _this.timer = null;
            let params ={      
              businessType: _this.tariffForm.business,
              costUnit: _this.tariffForm.costUnit,
              description: _this.tariffForm.describe,
              industryType: _this.tariffForm.industry,
              name: _this.tariffForm.tariffName,
              productType: _this.tariffForm.product,
              timeValidType: _this.tariffForm.endTimeType,
              unitPrice: _this.tariffForm.price,
              validEndTime: _this.tariffForm.validEndTimeStr,
              validStartTime: _this.tariffForm.validStartTime
            }
            addTariff(params,_this.headers).then(res=>{
              if(res.status == 0){
                _this.$message.success({
                  message:'资费项新建成功',
                  center:true
                })
                _this.getDataList()
                _this.closeTariffDrawer()
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
      this.tariffDrawerTitle = '编辑资费项'
      this.tariffForm.id = row.id
      this.tariffForm.tariffName = row.name, //资费项名字
      this.tariffForm.describe = row.description, //描述
      this.tariffForm.product = row.productType, //适用产品
      this.tariffForm.business = row.businessType, //适用业务
      this.tariffForm.industry = row.industryType, //适用行业
      this.tariffForm.costUnit = row.costUnit, //计费单位
      this.tariffForm.price = row.unitPrice, //计费单价
      this.tariffForm.endTimeType = row.timeValidType, // 结束时间类型
      this.tariffForm.validStartTime = row.validStartTime, // 生效时间
      this.tariffForm.validEndTimeStr = row.timeValidType === 0 ?  null: row.validEndTimeStr, //结束时间
      this.showSelectEndTime = row.timeValidType === 0 ? false:true
      this.tariffDrawer = true
    },
    // 修改资费项确认
    confirmEditTariff(){
      this.$refs.tariffForm.validate((valid) => {
        if(valid){
          if(this.tariffForm.endTimeType === 1 && Date.parse(this.tariffForm.validStartTime) > Date.parse(this.tariffForm.validEndTimeStr)){
            this.$message.error({
              message:'结束时间不能大于生效时间',
              center:true
            })
            return
          }
          let params = {
            id: this.tariffForm.id,
            businessType: this.tariffForm.business,
            costUnit: this.tariffForm.costUnit,
            description: this.tariffForm.describe,
            industryType: this.tariffForm.industry,
            name: this.tariffForm.tariffName,
            productType: this.tariffForm.product,
            timeValidType: this.tariffForm.endTimeType,
            unitPrice: this.tariffForm.price,
            validEndTime: this.tariffForm.validEndTimeStr,
            validStartTime: this.tariffForm.validStartTime
          }
          editTariff(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'资费项修改成功',
                center:true
              })
              this.getDataList()
              this.closeTariffDrawer()
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
          this.$message.error({
            message:'资费项正常状态才可停用！',
            center:true
          })
          return
        }
        ids.push(this.selectData[i].id)
      }
      this.$confirm("确定停用所选资费项么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          disableTariff(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'资费项停用成功',
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
        if(this.selectData[i].status !== 1 ){
          this.$message.error({
            message:'资费项停用状态才可启用！',
            center:true
          })
          return
        }
        ids.push(this.selectData[i].id)
      }
      this.$confirm("确定启用所选资费项么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          enableTariff(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'资费项启用成功',
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
      this.$confirm("确定删除所选资费项么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          deleteTariff(params,this.headers).then(res=>{
            if(res.status == 0){
              this.$message.success({
                message:'资费项删除成功',
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
    // 表格选择
    handleSelectionChange(val){
      this.selectData = val
      this.isDisable = val.length < 1 ? true : false;
    },
    // 关闭新增/编辑账号抽屉前重置表单规则
    closeTariffDrawer(){
      this.$nextTick(()=>{
        this.$refs.tariffForm.resetFields();
        this.tariffDrawer = false
      })  
    },
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
    this.getTypeListData()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },

};
</script>

<style lang="less" scoped>
#tariff{
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
#tariff /deep/ .el-dialog__footer {
  text-align: center ;
}
</style>