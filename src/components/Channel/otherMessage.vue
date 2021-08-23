<template>
  <div class="container">
    <div >
        <el-table
        border
        class="table"
        :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
        size="small"
        :data="tableData"
        :style="{'color':'#333','min-height':tableHeight + 'px'}"
        >
            <el-table-column type="selection" align="center" width="50"></el-table-column>
            <el-table-column prop="name" label="通道名称" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="number" label="通道号" width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop="supplierName" label="供应商名称" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="type" label="通道类型" width="140" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- <span v-if="scope.row.type == 1">直连</span>
                <span v-if="scope.row.type == 2">非直连</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="statusStr" label="状态" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="110" show-overflow-tooltip>
                <!-- <template slot-scope="scope">
                <el-tooltip  v-has="'channelUpdate'" effect="dark" content="变更" placement="top">
                    <img class="operation"  @click="changeAction(scope.row)" src="../../assets/images/edit_icon.svg" >
                </el-tooltip>   
                <el-tooltip v-has="'channelDisable'" v-if="scope.row.status === 0"  effect="dark" content="禁用" placement="top">
                    <img class="operation"  @click="forbidAction(2,scope.row)"  src="../../assets/images/forbidden_icon.svg" >
                </el-tooltip>
                <el-tooltip v-has="'channelEnable'" v-if="scope.row.status === 1" effect="dark" content="启用" placement="top">
                    <img class="operation"  @click="enableAction(2,scope.row)"  src="../../assets/images/enable_icon.svg" >
                </el-tooltip>
                </template> -->
            </el-table-column>
        </el-table>
    </div>
    <!-- 新建编辑Chatbot -->
    <!-- <el-drawer
      title="变更通道信息"
      :visible.sync="channelDrawer"
      :before-close="closeChannelDrawer"
      :modal-append-to-body="true"
      :wrapperClosable="false"
      size="500px"
      class="rcsMessageDrawer"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="channelForm"
        :model="channelForm"
        :rules="channelRules"
        label-width="140px"
        label-position="right"
      >
        <el-form-item prop="channelNumber" label="通道号：">
          <el-input size="small" disabled v-model="channelForm.channelNumber"></el-input>
        </el-form-item>
        <el-form-item prop="channelAccount" label="通道账号：">
          <el-input size="small" disabled v-model="channelForm.channelAccount"></el-input>
        </el-form-item>
        <el-form-item prop="channelName" label="通道名称：">
          <el-input size="small" maxlength="20" show-word-limit v-model="channelForm.channelName"></el-input>
        </el-form-item>
        <el-form-item prop="providerName" label="供应商名称：">
          <el-input size="small" maxlength="20" show-word-limit v-model="channelForm.providerName"></el-input>
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
        <el-form-item prop="numberType" label="号码类型：">
          <el-select v-model="channelForm.numberType" clearable size="small" placeholder="请选择">
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
          <el-select v-model="channelForm.sentNumberType" clearable size="small" placeholder="请选择">
            <el-option
              v-for="item in operatorList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
        <el-form-item prop="reportTypecsp" label="报备类型：">
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
        <el-form-item prop="isExted" label="端口号可扩展：">
          <el-radio-group v-model="channelForm.isExted">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="maxConcurrent" label="最大并发量：">
          <el-input size="small"  v-model.number="channelForm.maxConcurrent"></el-input>
        </el-form-item>
        <el-form-item prop="businessType" label="业务类型：">
          <el-checkbox-group v-model="channelForm.businessType" >
            <el-checkbox v-for="item in businessTypeList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="chargeMode" label="通道计费方式：">
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
        <el-form-item prop="price" label="通道计费单价：">
          <el-input size="small"  v-model="channelForm.price"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注：">
          <el-input
            type="textarea"
            placeholder="请输入"
            maxlength="60"
            :autosize="{ minRows: 4, maxRows: 6 }"
            show-word-limit
            v-model="channelForm.remark"
          ></el-input>
        </el-form-item>
        <el-form-item prop="parmentDepartment" label="">
          <el-button  type="primary" size="small" @click="editConfirm">提交</el-button>
          <el-button  size="small" @click="closeChannelDrawer">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer> -->

  </div>
</template>
<script>
// import {getVmsChannelDetail,editChannel,disableChannel,enableChannel} from '../../api/channel/api'

export default {
  name:'vmsMessage',
  props:{
    tableData: {
      type: Array | Object,
      default:[]
    },
    // businessTypeList:{
    //   type:Array
    // }

  },
  data() {
    return {
      activeNames:[],
      isDisable:true,
      channelDrawer:false,//是否显示chatbot抽屉 
      selectData:[],
      tableHeight:window.innerHeight - 369 +'',
    };
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
</style>