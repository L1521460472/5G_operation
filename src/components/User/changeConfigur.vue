<template>
  <div id="changeConfigur">
    <el-dialog
      title="账户配置"
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
        <!-- <el-form-item label="基础资费：">
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
        </el-form-item> -->
        <el-form-item label="使用产品：" class="product">
            <el-checkbox v-for="item in configureData.topProductTypeList" :key="item.productType" disabled v-model="item.productTypeChecked" @change="changeProduct(item)">{{item.productTypeStr}}</el-checkbox>
        </el-form-item>
        <el-form-item
          label="*资费配置："
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
                <el-table-column width="170" prop="businessStr" label="消息类型" >
                  <template slot-scope="scope">
                    <div class="tableSplit" v-for="messageItem in scope.row.messageTypeList" :key="messageItem.messageTypeId" >
                      <el-checkbox :disabled="!scope.row.businessTypeChecked"  v-model="messageItem.messageTypeChecked">{{messageItem.messageTypeStr}}</el-checkbox>
                    </div>                  
                  </template>  
                </el-table-column>
                <el-table-column prop="costUnitStr" label="单位" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div class="tableSplit" v-for="costUnitItem in scope.row.messageTypeList" :key="costUnitItem.messageTypeId">
                      <el-select clearable  :disabled="!costUnitItem.messageTypeChecked"  v-model="costUnitItem.costUnit"  size="small">
                        <el-option
                          v-for="item in costUnitList"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </template>  
                </el-table-column>
                <el-table-column prop="unitPrice" label="单价" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div class="tableSplit" v-for="priceItem in scope.row.messageTypeList" :key="priceItem.messageTypeId">
                      <el-input size="small"  oninput="value=value.match(/\d+\.?\d{0,4}/,'')" :disabled="!priceItem.messageTypeChecked" v-model="priceItem.unitPriceStr" @blur="priceItem.unitPriceStr = $event.target.value;if(priceItem.unitPriceStr!==null &&priceItem.unitPriceStr!==''){priceItem.unitPriceStr=Number(priceItem.unitPriceStr).toFixed(4)}"></el-input>
                    </div>
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
import {toFixedRrice} from '../../public'
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
        },
        {
          id:1,
          value:'元/60s'
        },
        {
          id:2,
          value:'元/6s'
        }
      ],//单位列表
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
      let slectDataArr = this.configureData.bottomProductTypeSelectedList
      let arr= []
      for(let item1 of slectDataArr){
        let obj ={} 
        let arr2 = []
        for(let item2 of item1.businessTypeList){
          if(item2.businessTypeChecked){
            let obj2 ={}
            obj2.businessId = item2.businessId
            let arr3 =[]
            for(let item3 of item2.messageTypeList){
              if(item3.messageTypeChecked){
                let obj3 ={}
                obj3.messageTypeId = item3.messageTypeId
                obj3.costUnit = item3.costUnit
                obj3.unitPrice = toFixedRrice(item3.unitPriceStr) 
                if(obj3.costUnit ===null || obj3.costUnit ==='' || obj3.unitPrice === null || obj3.unitPrice === ''){
                  this.$message.error({
                    message:'选中的配置单位或者单价不能为空',
                    center:true
                  })
                  return
                }
                // let flag =  /^\d+(\.{0,1}\d+){0,1}$/.test(obj3.unitPrice)
                // if(obj3.unitPrice !==null && obj3.unitPrice !=='' && !flag){
                //   this.$message.error({
                //     message:'单价格式不正确',
                //     center:true
                //   })
                //   return
                // }
                arr3.push(obj3)

              }
            }
            if(arr3.length <1){
              this.$message.error({
                message:'选中业务类型中的消息类型不能为空',
                center:true
              })
              return
            }
            obj2.messageTypeList = arr3
            arr2.push(obj2)
          }
        }
        obj.productType = item1.productType
        obj.businessTypeList = arr2
        arr.push(obj)
      }
      for(let k = 0;k<arr.length;k++){
        if(arr[k].businessTypeList.length < 1){
          this.$message.error({
            message:'选中产品的业务类型为空',
            center:true
          })
          return
        }
      }
      let params ={
        accountId: this.configureData.accountId,
        bottomBusinessSelectedList: arr,
      }
      configEnterpriseAccount(params).then(res=>{
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
      width: 100%;
      /deep/.el-form-item__content {
        float: left;
        width: calc(100% - 90px);
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
  /deep/ .el-dialog__body{
    max-height: 450px;
    overflow: auto;
  }
  .tableSplit{
    height: 32px;
    line-height: 32px;
    margin-bottom: 10px;
  }
  .tableSplit:last-child{
    margin-bottom: 0;
  }
}
</style>