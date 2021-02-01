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
                <el-select v-model="businessType" :ref="productType + item.name"  @visible-change="isShowSelectOptions" clearable size="small" placeholder="业务类型">
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
                  <el-button v-has="'channelGroupDelete'" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small"   @click="deleteAction(1,selectData)">
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
                        :data="props.row.channelVoList"
                        style="width:770px"
                      >
                        <el-table-column prop="name" label="名称" width="153" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="number" label="通道号" width="123" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="businessTypeStr" label="适用业务" width="123" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="costUnitStr" label="计费单位" width="123" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="unitPrice" label="计费单价￥" width="123" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="remark" label="备注" width="123" show-overflow-tooltip></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
                  <el-table-column type="selection" align="center" width="50"></el-table-column>
                  <el-table-column prop="name" label="名称" width="140" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="description" label="描述" width="120" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="businessTypeStr" label="业务类型" width="130" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="channelAmount" label="通道数" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="operator" label="创建人" width="110" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="createTime" label="创建时间" width="160" show-overflow-tooltip></el-table-column>
                  <el-table-column  label="操作" min-width="110" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-tooltip v-has="'groupChannelAdd'"  effect="dark" content="新增通道" placement="top">
                          <img class="operation"  @click="addChannel(scope.row)" src="../../assets/images/add_icon.svg" >
                      </el-tooltip>
                      <el-tooltip v-has="'groupChannelRemove'"  effect="dark" content="移除通道" placement="top">
                          <img class="operation"  @click="removeChannel(scope.row)" src="../../assets/images/remove_icon.svg" >
                      </el-tooltip>
                      <el-tooltip v-has="'channelGroupUpdate'"  effect="dark" content="修改" placement="top">
                          <img class="operation"  @click="editAction(scope.row)" src="../../assets/images/edit_icon.svg" >
                      </el-tooltip>
                      <el-tooltip v-has="'channelGroupDelete'"  effect="dark" content="删除" placement="top">
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
            <el-button  type="primary" size="small" v-if="channelGroupDrawerTitle === '新建通道组'" @click="confirmAddChannelGroup">提 交</el-button>
            <el-button  type="primary" size="small" v-if="channelGroupDrawerTitle === '修改通道组'" @click="confirmEditChannelGroup">提 交</el-button>
            <el-button  size="small" @click="closeChannelGroupDrawer">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 新增/移除通道 -->
    <el-dialog
      :title="channelToastTitle"
      class="resetPassword"
      :visible.sync="channelToast"
      :close-on-click-modal="false"
      :before-close="closeChannelToast"
      width="850px"
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
            <el-input v-model="channelName" size="small" maxlength="50" placeholder="通道名称">
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
            :data="channelTableData"
            style="width:770px"
            height="320"
            v-loading="loading2"
            element-loading-text="loading"
          >
            <el-table-column type="selection" align="center" width="50"></el-table-column>
            <el-table-column prop="name" label="名称" width="153" show-overflow-tooltip></el-table-column>
            <el-table-column prop="number" label="通道号" width="123" show-overflow-tooltip></el-table-column>
            <el-table-column prop="businessTypeStr" label="适用业务" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="costUnitStr" label="计费单位" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="unitPrice" label="计费单价￥" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="remark" label="备注" width="123" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <span class="bodyFooter">
          <span>已选择<span> {{selectChannelData.length}} 项</span></span>
        </span>
        <el-button type="primary" size="small" @click="channelToastTitle === '添加通道' ? confirmAddChannel():confirmRemoveChannel()" >提 交</el-button>
        <el-button @click="closeChannelToast" size="small">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import {getChannelGroupList,addChannelGroup,editChannelGroup,deleteChannelGroup,getAddChannel,getRemoveChannel,increaseChannel,removeChannel,getProductTypeList,getBussinessTypeList} from '../../api/channel/api'
import { getCookie,getButtonList} from "../../public";

export default {
  name:'channelGroup',
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
      businessType:null,
      channelGroupDrawerTitle:'',//新增修改通道组抽屉标题
      channelGroupDrawer:false,//是否显示通道组抽屉
      businessTypeList: [],//业务列表
      productTypeList: [],//产品列表
      industryTypeList: [],//行业列表
      channelGroupForm:{
        id:null,
        channelGroupName: null,
        business: null,
        remark:null,
      },//通道组表单数据
      channelGroupRules: {
        channelGroupName:[
          { required: true, message: "名称不能为空", trigger: "blur" },
          { max: 50, message: "名称不超过50个字符", trigger: "blur" },
        ],
        business:[{ required: true, message: "业务类型不能为空", trigger: "change" }],
      },//通道组表单验证规则
      channelName:null,//弹窗搜索内容
      channelToastTitle:'',//新增/移除通道标题
      channelToast:false,//新增移除通道弹窗
      channelTableData:[],//新增移除通道表格
      selectChannelGroupId:null,//选中的通道组ID
      selectChannelData:[],// 新增移除表格选中数据
      loading2:false,//弹窗loading
      selectData:[],//表格选择的数据
      selectTab:'5G消息',
      isDisable:true,//是否禁用头部按钮
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
          this.getTypeListData()
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
      this.businessType = null
      this.searchCont= null
      this.getDataList()
      this.getTypeListData()
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
    // 新建通道组
    createChannel(){
      this.channelGroupDrawerTitle = '新建通道组'
      this.channelGroupForm.id = null
      this.channelGroupForm.channelGroupName = null, //通道名字
      this.channelGroupForm.business = null, //适用业务
      this.channelGroupForm.remark = null //备注
      this.$nextTick(()=>{
        this.$refs.channelGroupForm.clearValidate();
      })
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
          this.timer = setTimeout(function () {
            _this.timer = null;
            let params ={
              businessType: _this.channelGroupForm.business,
              description: _this.channelGroupForm.remark,
              name: _this.channelGroupForm.channelGroupName,
              productType: _this.productType
            }
            addChannelGroup(params).then(res=>{
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
      this.channelGroupDrawerTitle = '修改通道组'
      this.channelGroupForm.id = row.id
      this.channelGroupForm.channelGroupName = row.name, //通道名字
      this.channelGroupForm.business = row.businessType, //适用业务
      this.channelGroupForm.remark = row.description, //备注
      this.channelGroupDrawer = true
    },
    // 修改套餐确认
    confirmEditChannelGroup(){
      this.$refs.channelGroupForm.validate((valid) => {
        if(valid){
          let params = {
            id: this.channelGroupForm.id,
            // businessType: this.channelGroupForm.business,
            name: this.channelGroupForm.channelGroupName,
            // productType: this.productType,
            description:this.channelGroupForm.remark
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
      this.$confirm("确定删除该通道组吗？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          deleteChannelGroup(params).then(res=>{
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
    // 获取新增通道列表
    getAddChannelData(type){
      this.loading2 = true
      let params = {
        id:this.selectChannelGroupId,
        name:this.channelName
      }
      if(type == 1){
        getAddChannel(params).then(res=>{
          this.loading2 =false
          if(res.status == 0){
            this.channelTableData = res.data
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
      }else if(type == 2){
        getRemoveChannel(params).then(res=>{
          this.loading2 =false
          if(res.status == 0){
            this.channelTableData = res.data
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
    },
    // 弹窗数据刷新
    refreshToast(){
      if(this.channelToastTitle === '添加通道'){
        this.getAddChannelData(1)
      }else if(this.channelToastTitle === '移除通道'){
        this.getAddChannelData(2)
      }
    },
    // 弹窗数据重置
    resetToast(){
      this.channelName = null
      if(this.channelToastTitle === '添加通道'){
        this.getAddChannelData(1)
      }else if(this.channelToastTitle === '移除通道'){
        this.getAddChannelData(2)
      }

    },
    // 弹窗搜索
    searchChannelName(){
      if(this.channelToastTitle === '添加通道'){
        this.getAddChannelData(1)
      }else if(this.channelToastTitle === '移除通道'){
        this.getAddChannelData(2)
      }
    },
    // 弹窗回车查询
    keyDown2(e) {
      if (e.keyCode == 13) {
        this.searchChannelName();
      }
    },
    // 添加通道
    addChannel(row){
      this.selectChannelGroupId = row.id
      this.channelToastTitle = '添加通道'
      this.getAddChannelData(1)
      this.channelToast = true
      window.removeEventListener("keydown", this.keyDown, false);
      window.addEventListener("keydown", this.keyDown2);
    },
    // 移除通道
    removeChannel(row){
      this.selectChannelGroupId = row.id
      this.channelToastTitle = '移除通道'
      this.getAddChannelData(2)
      this.channelToast = true
      window.removeEventListener("keydown", this.keyDown, false);
      window.addEventListener("keydown", this.keyDown2);
    },
    // 确认新增通道
    confirmAddChannel(){
      let ids = []
      this.selectChannelData.map(item=>{
        ids.push(item.id)
      })
      let params ={
        channelGroupId: this.selectChannelGroupId,
        channelIds: ids.toString()
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      let _this = this
      this.timer = setTimeout(function () {
        _this.timer = null;
        increaseChannel(params).then(res=>{
          if(res.status == 0){
            _this.$message.success({
              message:'通道添加成功',
              center:true
            })
            _this.getDataList()
            _this.closeChannelToast()
          }else{
            _this.$message({
              message:'操作失败',
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
    },
    // 确认移除通道
    confirmRemoveChannel(){
      let ids = []
      this.selectChannelData.map(item=>{
        ids.push(item.id)
      })
      let params ={
        channelGroupId: this.selectChannelGroupId,
        channelIds: ids.toString()
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      let _this = this
      this.timer = setTimeout(function () {
        _this.timer = null;
        removeChannel(params).then(res=>{
          if(res.status == 0){
            _this.$message.success({
              message:'通道移除成功',
              center:true
            })
            _this.getDataList()
            _this.closeChannelToast()
          }else{
            _this.$message({
              // message:res.message,
              message:'操作失败',
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
    // 新增移除通道的表格选择
    handleSelectionChange2(val){
      this.selectChannelData = val
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
      this.channelTableData = []
      this.channelToast = false
      window.addEventListener("keydown", this.keyDown)
      window.removeEventListener("keydown", this.keyDown2, false);
    },
    // 头部搜索下拉框选中后失焦防止回车触发下拉框
    isShowSelectOptions(isShowSelectOptions){
      if(!isShowSelectOptions) this.$refs[`${this.productType}`+`${this.selectTab}`][0].blur();
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
</style>
