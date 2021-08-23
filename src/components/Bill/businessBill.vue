<template>
  <!-- 企业账单 -->
  <div id="businessBill" v-loading="loading"  element-loading-text="loading">
    <div class="title">企业账单</div>
    <div class="container">
      <div class="headerBtn">
        <div class="headerBtnLeft">
          <el-button class="addBtn" type="primary" size="small"  @click="refresh">
            <i class="iconfont iconshuaxin"></i>
          </el-button>
          <el-button class="addBtn" type="primary" size="small"  @click="reset">
            <i class="iconfont iconguanbi"></i>
          </el-button>
          <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="企业名称">
            <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <div class="blankData">
        <el-table
        :data="tableData"
        :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
        size="small"
        :style="{'color':'#333','min-height':tableHeight + 'px'}"
        @selection-change="handleSelectionChange"
        border >
        <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="企业账号" prop="enterpriseAccount" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column label="企业名称" prop="enterpriseName" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column label="企业状态" prop="enterpriseAccountStatus" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.enterpriseAccountStatus == 0">正常</span>
              <span v-else-if="scope.row.enterpriseAccountStatus == 1">停用</span>
              <span v-else-if="scope.row.enterpriseAccountStatus == 2">锁住</span>
              <span v-else-if="scope.row.enterpriseAccountStatus == 3">冻结</span>
            </template>
          </el-table-column>
          <el-table-column label="所属销售" prop="belongSalesName" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作人员" prop="operatorAccount" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column label="付费方式" prop="payType" width="130" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.payType == 0">预付费</span>
              <span v-else-if="scope.row.payType == 1">后付费</span>
            </template>
          </el-table-column>
          <el-table-column label="账户余额" prop="accountBalance" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column label="充值总额" prop="totalRechargeAmount" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column label="赠送总额" prop="totalGiveAmount" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column label="转入总额" prop="totalRollInAmount" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column label="撤销总额" prop="totalRevokeAmount" width="130"  show-overflow-tooltip></el-table-column>
          <el-table-column label="转出总额" prop="totalRollOutAmount" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column label="到账总额" prop="totalArrivalAmount" width="130" show-overflow-tooltip></el-table-column>
          <el-table-column label="待到账总额" min-width="130" prop="totalToArrivalAmount" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div class="footer_page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          :pager-count="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { billList } from '@/api/bill/businessBill.js'
export default {
  data() {
    return {
      loading: false,
      searchCont: '',
      tableData: [],
      tableHeight:window.innerHeight - 310 +'',
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 获取表格数据
    getTableList() {
      const params = {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize,
        enterpriseName: this.searchCont
      }
      this.loading = true
      billList(params).then(res => {
        if (res.status == 0) {
          this.tableData = res.data.records
          this.page.total = res.data.total
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true
          })
        }
        this.loading = false
      }).catch(error =>{
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.loading = false
      })
    },
    // 刷新
    refresh() {
      this.getTableList()
    },
    // 重置条件
    reset() {
      this.searchCont = ''
    },
    // 搜索
    searchAction() {
      this.getTableList()
    },
    // 表格多选事件
    handleSelectionChange(val){

    },
    // 分页当前页条数
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getTableList()
    },
    // 分页当前页切换
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getTableList()
    },
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.getTableList();
      }
    },
  },
  mounted() {
    this.getTableList()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  created() {

  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  }
}
</script>
<style lang="less" scoped>
#businessBill{
  width: 100%;
  height: 100%;
  background-color: #fff;
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
  }
  .blankData /deep/ .el-table__empty-block{
    text-align: left;
  }

}
</style>
