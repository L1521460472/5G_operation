<template>
  <div id="changeConfigur">
    <el-dialog
      title="变更配置"
      :visible.sync="changeToast"
      :close-on-click-modal="false"
      :before-close="handleClose"
      width="720px"
    >
      <el-form
        label-position="right"
        label-width="90px"
        class="demo-table-expand"
        v-if="configureData"
      >
        <el-form-item label="基础资费：">
          <el-table
            border
            :header-cell-style="{background: '#F5F7FA',color: '#333333',lineHeight: '20px'}"
            size="small"
            :data="configureData.baseCostList"
          >
            <el-table-column prop="baseCostTypeStr" label="类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="costUnitStr" label="单位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="amount" label="单价" show-overflow-tooltip></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="使用产品：" class="product">
            <el-checkbox v-for="item in configureData.topProductTypeList" :key="item.productType" v-model="item.productTypeChecked" @change="changeProduct(item)">{{item.productTypeStr}}</el-checkbox>
        </el-form-item>
        <el-form-item
          label="*业务配置："
          v-if="configureData.bottomProductTypeSelectedList.length > 0"
        >
          <el-tabs v-model="selectTab">
            <el-tab-pane
              v-for="(item,index) in configureData.bottomProductTypeSelectedList"
              :key="item.productType"
              :label="item.productTypeStr"
              :name="''+index"
            >
              <el-table
                border
                :header-cell-style="{background: '#F5F7FA',color: '#333333',lineHeight: '20px'}"
                size="small"
                :data="item.businessTypeList"

              >
                <el-table-column prop="businessStr" label="业务类型" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.businessTypeChecked"></el-checkbox>
                    <span style="margin-left:10px">{{scope.row.businessStr}}</span>
                  </template>  
                </el-table-column>
                <el-table-column prop="costUnitStr" label="单位" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-select :disabled="!scope.row.businessTypeChecked"  v-model="scope.row.costUnit"  size="small">
                      <el-option
                        v-for="item in costUnitList"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </template>  
                </el-table-column>
                <el-table-column prop="unitPrice" label="单价" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="small" :disabled="!scope.row.businessTypeChecked" v-model="scope.row.unitPrice"></el-input>
                  </template>  
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="configAction">确 定</el-button>
        <el-button @click="handleClose" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {configEnterpriseAccount} from '../../api/userName/api'
import { getCookie} from "../../public";

export default {
  name: "changeConfigur",
  props: {
    changeToast: {
      type: Boolean,
      default: false,
    },
    configureData:{
      type: Object
    }
  },
  data() {
    return {
      selectTab:'0',
      costUnitList:[
        {
          id:0,
          value:'元/条'
        }
      ],//单位列表
      headers : {Authorization:getCookie('enterprisePass')},
    };
  },
  methods: {
    //   关闭弹窗
    handleClose() {
      this.$emit("closeChangeToast", this.changeToast);
    },
    refresh(){
      this.$emit("changeSuccess");
    },
    // 改变产品
    changeProduct(val){
      if(val.productTypeChecked){
        if(!this.preventRepeat(val.productType)){
          this.configureData.bottomProductTypeSelectedList.push(val)
        }
      }else{
        this.configureData.bottomProductTypeSelectedList=this.configureData.bottomProductTypeSelectedList.filter(item=>{
          return item.productType != val.productType
        })
      }
      this.selectTab = '0'
    },
    // 变更配置确认
    configAction(){
      let arr= []
      for(let i=0;i<this.configureData.bottomProductTypeSelectedList.length;i++){
        let obj ={} 
        let arr2 = []
        if(!this.configureData.bottomProductTypeSelectedList[i].businessTypeList){
          this.$message.error({
            message:'选中产品的业务类型为空',
            center:true
          })
        }       
        for(let j=0;j<this.configureData.bottomProductTypeSelectedList[i].businessTypeList.length;j++){
          if(this.configureData.bottomProductTypeSelectedList[i].businessTypeList[j].businessTypeChecked){
            let obj2 ={}
            obj2.businessId = this.configureData.bottomProductTypeSelectedList[i].businessTypeList[j].businessId
            obj2.costUnit = this.configureData.bottomProductTypeSelectedList[i].businessTypeList[j].costUnit
            obj2.unitPrice = this.configureData.bottomProductTypeSelectedList[i].businessTypeList[j].unitPrice
            arr2.push(obj2)
          }
        }
        obj.productType = this.configureData.bottomProductTypeSelectedList[i].productType
        obj.businessTypeList = arr2
        arr.push(obj)
      }
      let params ={
        accountId: this.configureData.accountId,
        bottomBusinessSelectedList: arr,
      }
      configEnterpriseAccount(params,this.headers).then(res=>{
        if(res.status == 0){
          this.$message.success({
            message:'配置变更成功',
            center:true
          })
          this.handleClose()
          this.refresh()
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
    // 判断业务配置是否重复
    preventRepeat(productType){
      for(let i =0;i<this.configureData.bottomProductTypeSelectedList.length;i++){
        if(this.configureData.bottomProductTypeSelectedList[i].productType == productType){
          return true
        }
      }
      return false
    }
  },
};
</script>

<style lang="less" scoped>
#changeConfigur {
  .demo-table-expand {
    /deep/ .el-form-item {
      float: left;
      /deep/.el-form-item__content {
        float: left;
        width: 520px;
        margin-left: 0 !important;
        /deep/ .el-tabs--top {
          background-color: #fff;
          // border: 1px solid #e5e5e5;
          // padding: 20px;
          .tabBox {
            display: flex;
            .tabBoxTitle {
              // display: block;
              width: 70px;
              // float: left;
            }
            .tabBoxCon {
              display: block;
            }
          }
        }
        /deep/ .is-active {
          background-color: #fff !important;
        }
      }
    }
  }
  .product{
    margin-top: 15px;
  }
  // .business{
  //   margin-top: 22px;
  // }
  // .business /deep/ .el-form-item__label{
  //   padding-right:7px ;
  // }
  /deep/ .el-dialog__body{
    max-height: 450px;
    overflow: auto;
  }
}
</style>