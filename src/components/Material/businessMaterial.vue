<template>
  <div id="businessMaterial">
      <div class="title">业务资料</div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="产品类型" name="first">
            <div class="content">
              <div class="btn-group headerBtnRight">
                <el-button type="primary" size="small" style="color:#fff" @click="productionAdd" v-has="'productTypeConfigAdd'">
                  <i class="iconfont iconxinzeng"></i>添加
                </el-button>
                <!-- <el-button size="small" style="color: #368CFE" @click="batchEdit">
                  <i class="iconfont iconxiugai"></i>修改
                </el-button> -->
                <el-button size="small" class="iconBtn" :class="{ 'active': !batchDeleteSign1 }" :disabled="batchDeleteSign1" @click="batchDelete" v-has="'productTypeConfigDelete'">
                  <i class="iconfont iconshanchu"></i>删除
                </el-button>
              </div>
              <div class="content-table">
                <el-table
                  v-loading="loading1"
                  :data="productData"
                  border
                  size="small"
                  :header-cell-style="{background: '#F5F7FA',color: '#333333'}"
                  :style="{'color':'#333'}"
                  @select-all="selectAll1"
                  @selection-change="handleSelectionChange">
                  <el-table-column type="selection" align="center" width="50"></el-table-column>
                  <el-table-column label="产品名称" prop="name" show-overflow-tooltip></el-table-column>
                  <el-table-column label="描述" prop="description" show-overflow-tooltip></el-table-column>
                  <el-table-column label="操作人" prop="createdByStr"></el-table-column>
                  <el-table-column label="创建时间" prop="createTime"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-tooltip  class="item" effect="dark" content="修改" placement="top">
                        <img class="operation" src="../../assets/images/edit_icon.svg" @click="productionEdit(scope)" v-has="'productTypeConfigUpdate'" />
                      </el-tooltip>
                      <el-tooltip  class="item" effect="dark" content="删除" placement="top">
                        <img class="operation" src="../../assets/images/delete_icon.svg" @click="peoductionDelete(scope)" v-has="'productTypeConfigDelete'" />
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <el-drawer
              :title="status1== true? '新增产品类型': '修改产品类型'"
              :visible.sync="drawer1"
              size="500px"
              :wrapperClosable="false"
              direction="rtl">
              <el-form label-width="90px" :model="productionFormData">
                <el-form-item label="产品名称:" required>
                  <el-input v-model="productionFormData.name" maxlength="25" size="small"></el-input>
                </el-form-item>
                <el-form-item label="描述:">
                  <el-input type="textarea" :rows="6" maxlength="200" v-model="productionFormData.description"></el-input>
                </el-form-item>
                <el-form-item class="center">
                  <el-button size="small" type="primary" @click="submitForm1" v-if="status1">确定</el-button>
                  <el-button size="small" type="primary" @click="updateForm" v-else>确定</el-button>
                  <el-button size="small" @click="closeDrawer1">取消</el-button>
                </el-form-item>
              </el-form>
            </el-drawer>
          </el-tab-pane>
          <el-tab-pane label="业务类型" name="second">
            <div class="content">
              <div class="btn-group headerBtnRight">
                <el-button type="primary" size="small" style="color:#fff" @click="businenessAdd" v-has="'businessTypeConfigAdd'">
                  <i class="iconfont iconxinzeng"></i>添加
                </el-button>
                <!-- <el-button size="small" style="color: #368CFE">
                  <i class="iconfont iconxiugai"></i>修改
                </el-button> -->
                <el-button size="small" class="iconBtn" :class="{ 'active': !batchDeleteSign2 }" :disabled="batchDeleteSign2" @click="batchDeleteBusiness" v-has="'businessTypeConfigDelete'">
                  <i class="iconfont iconshanchu"></i>删除
                </el-button>
              </div>
              <div class="content-table">
                <el-table
                  v-loading="loading2"
                  :data="businessData"
                  border
                  size="small"
                  :header-cell-style="{background: '#F5F7FA',color: '#333333'}"
                  :style="{'color':'#333'}"
                  @select-all="selectAll2"
                  @selection-change="handleSelectionChange2">
                  <el-table-column type="selection" align="center" width="50"></el-table-column>
                  <el-table-column label="业务名称" align="center" prop="businessName" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column label="所属产品" prop="productTypeName" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column label="发送时间段" width="140" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <span>{{scope.row.sendStartTime + '-' + scope.row.sendEndTime}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="发送优先级" prop="levelStr" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column label="发送速度" prop="sendSpeed" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column label="计费单位" prop="costUnitStr" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column label="计费单价" prop="unitPrice" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column label="发送通道" prop="channelName" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column label="描述" prop="description" width="140" show-overflow-tooltip></el-table-column>
                  <el-table-column label="操作人" prop="operator" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column label="创建时间" prop="createTime" width="140" show-overflow-tooltip></el-table-column>
                  <el-table-column label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                      <el-tooltip  class="item" effect="dark" content="修改" placement="top">
                        <img class="operation" src="../../assets/images/edit_icon.svg" @click="businessEdit(scope.row)" v-has="'businessTypeConfigUpdate'" />
                      </el-tooltip>
                      <el-tooltip  class="item" effect="dark" content="删除" placement="top">
                        <img class="operation" src="../../assets/images/delete_icon.svg" @click="deleteBusiness(scope)" v-has="'businessTypeConfigDelete'" />
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <el-drawer
              :title="status2== true? '新增业务类型': '修改业务类型'"
              :visible.sync="drawer2"
              size="500px"
              :wrapperClosable="false"
              direction="rtl">
              <el-form label-width="100px" :model="businessFormData" ref="businessForm" :rules="rules">
                <el-form-item label="业务名称" prop="businessName">
                  <el-input v-model="businessFormData.businessName" size="small" maxlength="12"></el-input>
                </el-form-item>
                <el-form-item label="业务编码" prop="code">
                  <el-input v-model="businessFormData.code" maxlength="30" size="small"></el-input>
                </el-form-item>
                <el-form-item label="所属产品" prop="productTypeId">
                  <el-select v-model="businessFormData.productTypeId" placeholder="请选择所属产品" size="small" clearable style="width:100%">
                    <el-option
                      v-for="item in productionOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="发送时间段" required>
                  <!-- <el-time-picker
                    style="width:100%"
                    size="small"
                    is-range
                    arrow-control
                    clearable
                    value-format="HH:mm:ss"
                    v-model="businessFormData.sendTime"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="请选择时间范围">
                  </el-time-picker> -->
                  <div class="row-center">
                    <el-time-picker
                      size="small"
                      v-model="businessFormData.sendStartTime"
                      value-format="HH:mm:ss"
                      format="HH:mm:ss"
                      for
                      placeholder="开始时间">
                    </el-time-picker> <span>-</span>
                    <el-time-picker
                      size="small"
                      v-model="businessFormData.sendEndTime"
                      value-format="HH:mm:ss"
                      format="HH:mm:ss"
                      placeholder="结束时间">
                    </el-time-picker>
                  </div>
                </el-form-item>
                <el-form-item label="优先级" prop="level">
                  <el-select v-model="businessFormData.level" size="small" clearable style="width:100%">
                    <el-option
                      v-for="item in priorityOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="发送速度" required>
                  <div class="row-center">
                    <el-input size="small" v-model="businessFormData.sendSpeed"></el-input>
                    <el-select size="small" v-model="businessFormData.sendSpeedUnit" clearable>
                      <el-option
                        v-for="item in speedUnitOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <span class="tips">
                    当业务类型限速大于通道处理速度时，则按通道的处理速度为准。
                  </span>
                </el-form-item>
                <el-form-item label="计费类型" prop="costUnit">
                  <el-select size="small" v-model="businessFormData.costUnit" style="width:100%" clearable>
                    <el-option
                      v-for="item in costUnitOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="计费单价" prop="unitPrice">
                  <el-input size="small" v-model="businessFormData.unitPrice"></el-input>
                </el-form-item>
                <!-- <el-form-item label="选择通道" prop="channelId">
                  <el-select size="small" v-model="businessFormData.channelId" style="width:100%">
                    <el-option
                      v-for="item in channelOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item label="描述">
                  <el-input type="textarea" :rows="6" v-model="businessFormData.description"></el-input>
                </el-form-item>
                <el-form-item class="center">
                  <el-button size="small" type="primary" @click="submitForm2" v-if="status2">确定</el-button>
                  <el-button size="small" type="primary" @click="editBusinessSubmit" v-else>确定</el-button>
                  <el-button size="small" @click="closeDrawer2">取消</el-button>
                </el-form-item>
              </el-form>
            </el-drawer>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>
<script>
import { getProductList, addProduction, editProduct, deleteProduct, businessList, addBusiness, deleteBusiness, editBusiness, businessChannel, postage } from '../../api/material/api'
import { getCookie,regexpName,getButtonList} from "../../public";
import templateAudit from '../Audit/templateAudit.vue';
export default {
  components: { templateAudit },
  name:'businessMaterial',
  props:{
    authorityBttonList:{
      type:Array
    }
  },
  data() {
    return {
      activeName: 'first',
      productData: [],  //产品列表数据
      status1: true,  // true  为新增  false 为编辑
      drawer1: false,
      productionFormData: {
        name: '',
        description: ''
      },  // 产品表单数据
      batchDeleteSign1: true,  // 批量删除按钮是否禁用
      multipleSelection1: [], // 产品是否多选
      loading1: false,

      // 业务数据
      businessData: [
        {
          businessName: '',
          belongTo: '',
          sendTime: '',
          sendLevel: '',
          sendSpeed: '',
          bulllingUnit: '',
          bulllingPrice: '',
          sendChannel: '',
          businessDesc: '',
          createdByStr: '',
          createTime: ''
        }
      ],
      drawer2: false,  // 业务抽屉
      status2: true,  // true  为新增  false 为编辑
      businessFormData: {
        businessName: '',
        code: '',
        productTypeId: '',
        // sendTime: [],
        sendStartTime: '',
        sendEndTime: '',
        level: '',
        sendSpeed: '',
        sendSpeedUnit: '',
        costUnit: '',
        unitPrice: '',
        // channelId: '',
        description: ''
      }, // 业务表单新增编辑数据
      batchDeleteSign2: true,  // 批量删除按钮是否禁用
      multipleSelection2: [], // 产品是否多选
      productionOptions: [],    // 产品下拉列表
      priorityOptions: [   // 优先级下拉列表
        {
          label: '高',
          value: 1
        },
        {
          label: '中',
          value: 2
        },
        {
          label: '低',
          value: 3
        }
      ],
      speedUnitOptions: [
        {
          label: '条/秒',
          value: 1
        },
        {
          label: '条/分',
          value: 2
        }
      ],
      costUnitOptions: [
        {
          label: '元/条',
          value: 0
        },
        {
          label: '元/60s',
          value: 1
        },
        {
          label: '元/s',
          value: 2
        }
      ],
      // channelOptions: [
      // ],
      rules: {
        businessName: [
          { required: true, message: '请输入业务名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入业务编码', trigger: 'blur' }
        ],
        productTypeId: [
          { required: true, message: '请选择所属产品', trigger: 'change' }
        ],
        // sendTime: [
        //   { required: true, message: '请选择发送时间段', trigger: 'change' }
        // ],
        level: [
          { required: true, message: '请选择优先级', trigger: 'change' }
        ],
        costUnit: [
          { required: true, message: '请选择计费类型', trigger: 'change' }
        ],
        unitPrice: [
          { required: true, message: '请输入计费单价', trigger: 'blur' }
        ],
        // channelId: [
        //   { required: true, message: '请选择通道', trigger: 'change' }
        // ]
      },
      loading2: false,
    };
  },
  watch: {
    // authorityBttonList:{
    //   handler(data) {
    //     let btns = getButtonList(data,'/roleManagement')
    //     if(btns){
    //       btns.map(item=>{
    //         if(item.code == "roleAdd") this.roleAddBtn = true
    //         if(item.code == "roleUpdate") this.roleEditBtn = true
    //         if(item.code == "roleDelete") this.roleDeleteBtn = true
    //         if(item.code == "authorityCopyAndAdd") this.copyBtn = true
    //         if(item.code == "authorityRevert") this.revertBtn = true
    //         if(item.code == "authorityUpdate") this.authorityEditBtn = true
    //       })
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // }
    multipleSelection1() {
      if (this.multipleSelection1.length > 0) {
        this.batchDeleteSign1 = false
      } else {
        this.batchDeleteSign1 = true
      }
    },
    multipleSelection2() {
      if (this.multipleSelection2.length > 0) {
        this.batchDeleteSign2 = false
      } else {
        this.batchDeleteSign2 = true
      }
    },
    // 'businessFormData.productTypeId' () {
    //   if (this.businessFormData.productTypeId != '' && this.businessFormData.productTypeId != undefined) {
    //     this.selectProduct(this.businessFormData.productTypeId)
    //   }
    // }
  },
  mounted() {
    this.getProductLists()
  },
  methods: {
    handleClick() {
      if (this.activeName == 'first') {
        this.getProductLists()
      } else if (this.activeName == 'second') {
        this.getBusinessList()
      }
    },
    /**
     * 产品类型
     */

    //  获取产品类型列表
    getProductLists() {
      this.loading1 = true
      getProductList({}).then(res => {
        if (res.status == 0) {
          this.productData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true
          })
        }
        this.loading1 = false
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.loading1 = false
      })
    },
    productionAdd() {  // 产品新增
      this.status1 = true
      this.drawer1 =  true
      this.productionFormData = {}
    },
    productionEdit(val) {   // 产品编辑
      this.drawer1 =  true
      this.status1 = false
      this.productionFormData.name = val.row.name
      this.productionFormData.description = val.row.description
      this.productionFormData.id = val.row.id
    },
    peoductionDelete(val) {  // 产品删除
      this.$confirm('确定要删除该条数据吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass:'btn-custom-confirm',
        center:true
      }).then(() => {
        const query = {
          ids: val.row.id
        }
        deleteProduct(query).then(res => {
          if (res.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true
            })
            this.getProductLists()
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              center: true
            })
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
      }).catch(() => {})
    },
    closeDrawer1(){
      this.drawer1 =  false
    },
    // 产品新增提交
    submitForm1() {
      if (this.productionFormData.name == '' || this.productionFormData.name == undefined) {
        this.$message({
          type: 'success',
          message: '请先填写产品名称',
          center: true
        })
        return
      }
      addProduction(this.productionFormData).then(res => {
        if (res.status == 0) {
          this.$message({
            type: 'success',
            message: '新增成功！',
            center: true
          })
          this.getProductLists()
          this.drawer1 =  false
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true
          })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 产品编辑提交
    updateForm() {
      editProduct(this.productionFormData).then(res => {
        if (res.status == 0) {
          this.$message({
            type: 'success',
            message: '更新成功！',
            center: true
          })
          this.getProductLists()
          this.drawer1 = false
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true
          })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    selectAll1(val){
      this.multipleSelection1 = val
    },
    handleSelectionChange(val) {
      this.multipleSelection1 = val
      if (this.multipleSelection1.length > 0) {
        this.batchDeleteSign1 = false
      } else {
        this.batchDeleteSign1 = true
      }
    },
    // 批量删除
    batchDelete() {
      this.$confirm('确定要删除选中的数据吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass:'btn-custom-confirm',
        center:true
      }).then(() => {
        const temp = this.multipleSelection1.map(item => item.id)
        const query = {
          ids: temp.join(',')
        }
        deleteProduct(query).then(res => {
          if (res.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true
            })
            this.getProductLists()
            this.multipleSelection1 = []
            this.batchDeleteSign1 = true
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              center: true
            })
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
      }).catch(()=>{})
    },
    /**
     * 业务类型
     */
    //  获取业务类型列表
    getBusinessList() {
      this.loading2 = true
      businessList({}).then(res => {
        if (res.status == 0) {
          this.businessData = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true
          })
        }
        this.loading2 = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.loading2 = false
      })
    },
    // 处理
    getProductOptions() {
      this.productionOptions = this.productData.map(item => {
        const val = {
          label: item.name,
          value: item.id
        }
        return val
      })
    },
    businenessAdd() {  // 业务新增
      this.businessFormData = this.$options.data().businessFormData
      // this.$nextTick(() => {
        if (this.$refs.businessForm) {
          this.$refs.businessForm.resetFields()
          // this.$refs.businessForm.clearValidate();
        }
      // })
      this.status2 = true
      this.drawer2 = true
      this.getProductOptions()
    },
    selectAll2(val){  // 表格全选事件
      // console.log(val)
      this.multipleSelection2 = val
    },
    handleSelectionChange2(val) {  //表格选择
      this.multipleSelection2 = val
      if(this.multipleSelection2.length > 0) {
        this.batchDeleteSign2 = false
      } else {
        this.batchDeleteSign2 = true
      }
    },
    batchDeleteBusiness() {  // 批量删除业务资料
      this.$confirm('确定要删除选中的数据吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass:'btn-custom-confirm',
        center:true
      }).then(() => {
        const tempids = this.multipleSelection2.map(element => {
          return element.id
        })
        const query = {
          ids: tempids.join(',')
        }
        deleteBusiness(query).then(res => {
        if(res.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功！',
              center: true
            })
            this.getBusinessList()
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              center: true
            })
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
      }).catch(() => {})
    },
    businessEdit(val) {
      this.drawer2 = true
      this.status2 = false
      this.businessFormData.businessName = val.businessName
      this.businessFormData.code = val.code
      this.businessFormData.productTypeId = val.productTypeId
      this.businessFormData.sendStartTime = val.sendStartTime
      this.businessFormData.sendEndTime = val.sendEndTime
      this.businessFormData.level = val.level
      this.businessFormData.sendSpeed = val.sendSpeed
      this.businessFormData.sendSpeedUnit = val.sendSpeedUnit
      this.businessFormData.costUnit = val.costUnit
      this.businessFormData.unitPrice = val.unitPrice
      // this.businessFormData.channelId = val.channelId
      this.businessFormData.description = val.description
      this.businessFormData.id = val.id
      this.getProductOptions()
    },
    // 删除业务类型
    deleteBusiness(val) {
      this.$confirm('确定要删除此条的数据吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass:'btn-custom-confirm',
        center:true
      }).then(() => {
        const query = {
          ids: val.row.id
        }
        deleteBusiness(query).then(res => {
        if(res.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功！',
              center: true
            })
            this.getBusinessList()
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              center: true
            })
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
      }).catch(() => {})
    },
    // 确定新增提交
    submitForm2() {
      this.$refs.businessForm.validate((valid) => {
        if (valid) {
          const regu = /^\d+(\.\d+)?$/
          if (!regu.test(this.businessFormData.sendSpeed)) {
            this.$message({
              type: 'warning',
              message: '请输入合法的发送速度',
              center: true
            })
            return
          }
          if (!regu.test(this.businessFormData.unitPrice)) {
            this.$message({
              type: 'warning',
              message: '请输入合法的计费单价',
              center: true
            })
            return
          }
          if (this.businessFormData.sendStartTime > this.businessFormData.sendEndTime) {
            this.$message({
              type: 'warning',
              message: '开始时间不能大于结束时间',
              center: true
            })
            return
          }
          const query = {
            "businessName": this.businessFormData.businessName,
            "code": this.businessFormData.code,
            // "channelId": this.businessFormData.channelId,
            "costUnit": this.businessFormData.costUnit,
            "description": this.businessFormData.description,
            "level": this.businessFormData.level,
            "productTypeId": this.businessFormData.productTypeId,
            "sendEndTime": this.businessFormData.sendEndTime,
            "sendSpeed": this.businessFormData.sendSpeed,
            "sendSpeedUnit": this.businessFormData.sendSpeedUnit,
            "sendStartTime": this.businessFormData.sendStartTime,
            "unitPrice": this.businessFormData.unitPrice
          }
          addBusiness(query).then(res => {
            if(res.status == 0) {
              this.$message({
                type: 'success',
                message: '新增成功！',
                center: true
              })
              this.getBusinessList()
              this.drawer2 = false
              // this.$nextTick(()=>{
              //   this.$refs.businessForm.resetFields();
              // })
            } else {
              this.$message({
                type: 'error',
                message: res.message,
                center: true
              })
            }
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
          })
        } else {
          console.log('error')
        }
      })
    },
    // 确定编辑提交
    editBusinessSubmit() {
      this.$refs.businessForm.validate((valid) => {
        if (valid) {
          const regu = /^\d+(\.\d+)?$/
          if (!regu.test(this.businessFormData.sendSpeed)) {
            this.$message({
              type: 'warning',
              message: '请输入合法的发送速度',
              center: true
            })
            return
          }
          if (!regu.test(this.businessFormData.unitPrice)) {
            this.$message({
              type: 'warning',
              message: '请输入合法的计费单价',
              center: true
            })
            return
          }
          editBusiness(this.businessFormData).then(res => {
            if (res.status == 0) {
              this.$message({
                type: 'success',
                message: '更新成功！',
                center: true
              })
              this.getBusinessList()
              this.drawer2 = false
            } else {
              this.$message({
                type: 'error',
                message: res.message,
                center: true
              })
            }
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请填写必填项！',
            center: true
          })
        }
      })
    },
    // 关闭抽屉
    closeDrawer2() {
      this.$nextTick(()=>{
        // this.$refs.businessForm.clearValidate();
        this.$refs.businessForm.resetFields();
      })
      this.drawer2 = false
    },
    // 获取产品类类型时获取通道
    // selectProduct(val) {
    //   const query = {
    //     productTypeId: val
    //   }
    //   businessChannel(query).then(res => {
    //     if (res.status == 0) {
    //       this.channelOptions = res.data.map(element => {
    //         return {
    //           label: element.name,
    //           value: element.id
    //         }
    //       })
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: res.message,
    //         center: true
    //       })
    //     }
    //   }).catch(error => {
    //     this.$message({
    //       type: 'error',
    //       message: error,
    //       center: true
    //     })
    //   })
    // },

  }
};
</script>

<style lang="less"  scoped>
#businessMaterial{
  width: 100%;
  height: 100%;
  padding: 0 70px;
  box-sizing: border-box;
  color: #333;
  letter-spacing: 0.75px;
  overflow: hidden;
  .title{
    height: 26px;
    line-height: 26px;
    padding-top: 40px;
    // padding-left: 70px;
    font-size: 20px;
    margin-bottom: 18px;
  }
  .content{
    width: 100%;
    // padding: 0 70px;
    // box-sizing: border-box;
    .btn-group{
      .iconBtn.active{
        color: #368CFE !important;
        border-radius: 4px;
        border: 1px solid rgba(54,140,254,0.5);
      }
      .iconBtn.active:hover{
        color: #368CFE !important;
        border-radius: 4px;
        border: 1px solid rgba(54,140,254,0.5);
        background-color:  #ecf5ff !important;
      }
      .iconBtn.el-button:focus{
        background-color:#fff;
      }
    }
    .content-table{
      width: 100%;
      margin-top: 20px;
      color: rgb(51, 51, 51);
    }
    .center{
      text-align: center;
    }
  }
  .row-center{
      display: flex;
      align-items: center;
      // justify-content: space-around;
    }
    .tips{
      font-size:12px;
      color:#f56c6c
    }
  // /deep/ .el-table__row td:nth-child(1) div {
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  // }
  // /deep/ .el-table__header > thead > tr > th:nth-child(1) div {
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  // }
  /deep/.is-active{
    background-color: none;
  }
  /deep/ .el-drawer__body{
    // padding: 0 35px 0 20px;
    padding: 0 72px;
  }
  /deep/ .el-form-item__content{
    line-height: 25px;
  }
  /deep/ .el-form-item{
    margin-bottom: 22px;
  }
  /deep/ .el-tabs__nav-wrap::after{
    height: 1px;
  }
  /deep/ .iconfont{
    padding-right: 3px;
  }
  // /deep/ .el-table .cell{
  //   display: flex;
  //   align-items: center;
  // }
  // /deep/ .el-tabs__nav{
  //   margin-left: 70px;
  // }
  /deep/ .el-message-box__message{
    text-align: center;
    padding: 10px 0;
  }
  /deep/ .el-button+.el-button{
    margin-left: 3px;
  }
}
</style>
