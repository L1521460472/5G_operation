<template>
  <div id="operationLog" >
    <div class="title">操作日志</div>
    <div class="tip">操作日志记录了您在本账号中进行的所有操作。防止异常操作的出现，便于您的核查。</div>
    <el-table
      border
      :header-cell-style="{background: '#F5F7FA',color: '#333333',lineHeight: '20px',}"
      size="small"
      :data="tableData"
      :style="{'color':'#333','min-height':tableHeight + 'px'}"
    >
      <el-table-column prop="loginIp" label="登录IP" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="content" label="操作" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" width="180" label="时间" show-overflow-tooltip></el-table-column>
    </el-table>
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
</template>
<script>
import { getOperationLog } from "../../api/account/api";
import { getCookie, removeCookie, getButtonList } from "../../public";
export default {
  name: "operationLog",
  data() {
    return {
        currentPage: 1,
        pageSize: 10,
        total:0,
        tableData: [],
        tableHeight:window.innerHeight - 282 +'',
        headers: { Authorization: getCookie("enterprisePass") },
    };
  },
  methods: {
    getDataList(){
        let params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        } 
        getOperationLog(params,this.headers).then(res=>{
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

  },
  mounted() {
      this.getDataList()
  },
};
</script>

<style lang="less" scoped>
#operationLog {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0 70px;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  .title {
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .tip{
    margin-bottom: 30px;
    color: #999999;
    font-size: 12px;
    letter-spacing: 0.75px;
  }
}
</style>