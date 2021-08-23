<template>
  <div id="overclock" v-loading="loading">
    <div class="title">超频管理</div>
    <div class="content">
      <div>
        <div class="item-head">
          <div class="item-top">
            <img src="../../assets/images/icon_overclock_server.svg" />
            <span class="item-title">号码超频设置</span>
          </div>
          <div v-if="!phoneEdit">
            <el-button size="small" type="primary" plain icon="el-icon-edit" @click="changeStatus(1)">编辑</el-button>
          </div>
          <div v-else>
            <el-button size="small" v-if="phoneAdd" type="primary" plain icon="el-icon-check" @click="addAction(1)">保存</el-button>
            <el-button size="small" v-if="!phoneAdd" type="primary" plain icon="el-icon-check" @click="save(1)">保存</el-button>
            <el-button size="small"  plain icon="el-icon-close" @click="cancle(1)">取消</el-button>
          </div>
        </div>
        <div class="line"></div>
        <div class="content-setting">
          <span>手机号：&nbsp;&nbsp;&nbsp;每 &nbsp;</span>
          <!-- <el-input size="mini" type="number" v-model="phoneOverlock.cycleTime" :disabled="!phoneEdit" style="width:70px"></el-input> -->
          <el-input-number size="mini" v-model="phoneOverlock.cycleTime" controls-position="right" :disabled="!phoneEdit" style="width:100px" :min="0" :max="43200"></el-input-number>
          <span>&nbsp;&nbsp; 分钟，不超过&nbsp;&nbsp;&nbsp; </span>
          <!-- <el-input size="mini" type="number" v-model="phoneOverlock.limitAmount" :disabled="!phoneEdit" style="width:70px"></el-input> &nbsp;&nbsp;条 -->
          <el-input-number size="mini" v-model="phoneOverlock.limitAmount" controls-position="right" :disabled="!phoneEdit" :min="1" :max="100" style="width:100px"></el-input-number>&nbsp;&nbsp;条
        </div>
      </div>
      <div style="margin-top:80px">
        <div class="item-head">
          <div class="item-top">
            <img src="../../assets/images/icon_overclock_phone.svg" />
            <span class="item-title">内容超频设置</span>
          </div>
          <div v-if="!serverEdit">
            <el-button size="small" type="primary" plain icon="el-icon-edit" @click="changeStatus(2)">编辑</el-button>
          </div>
          <div v-else>
            <el-button size="small" v-if="serverAdd" type="primary" plain icon="el-icon-check" @click="addAction(2)">保存</el-button>
            <el-button size="small" v-if="!serverAdd" type="primary" plain icon="el-icon-check" @click="save(2)">保存</el-button>
            <el-button size="small"  plain icon="el-icon-close" @click="cancle(2)">取消</el-button>
          </div>
        </div>
        <div class="line"></div>
        <div class="content-setting">
          <span>同内容：&nbsp;&nbsp;&nbsp;每 &nbsp;</span>
          <!-- <el-input size="mini" type="number" v-model="contentOverlock.cycleTime" :disabled="!serverEdit" style="width:70px"></el-input> -->
          <el-input-number size="mini" v-model="contentOverlock.cycleTime" controls-position="right" :disabled="!serverEdit" style="width:100px" :min="0" :max="43200"></el-input-number>
          <span>&nbsp;&nbsp; 分钟，不超过&nbsp;&nbsp;&nbsp; </span>
          <!-- <el-input size="mini" type="number" v-model="contentOverlock.limitAmount" :disabled="!serverEdit" style="width:70px"></el-input> &nbsp;&nbsp;条 -->
          <el-input-number size="mini" v-model="contentOverlock.limitAmount" controls-position="right" :disabled="!serverEdit" :min="1" :max="100" style="width:100px"></el-input-number>&nbsp;&nbsp;条
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { addLimit, limitDetail, updateLimit } from '@/api/frequencyLimit/api'
export default {
  data() {
    return {
      loading: false,
      phoneEdit: true,  // 号码超频编辑
      serverEdit: true, // 内容超频编辑
      phoneAdd: true,
      serverAdd: true,
      // 号码超频
      phoneOverlock: {
        id: '',
        cycleTime: '',
        limitAmount: '',
        limitType: '1'
      },
      // 内容超频
      contentOverlock: {
        id: '',
        cycleTime: '',
        limitAmount: '',
        limitType: '2'
      },
    }
  },
  methods: {
    changeStatus(val) {
      if (val === 1) {
        this.phoneEdit = true
      } else {
        this.serverEdit = true
      }
    },
    cancle(val){
      if(val === 1) {
        this.phoneEdit = false
      } else {
        this.serverEdit = false
      }
    },
    save(val){
      if(val == 1) {  // 号码超频
        this.phoneEdit = false
        this.editSubmit(this.phoneOverlock)
      } else {  // 内容超频
        this.serverEdit = false
        this.editSubmit(this.contentOverlock)
      }
    },
    getLimit() {
      limitDetail().then(res => {
        const data = res.data
        if (data == null) return
        data.forEach(item => {
          if(item.limitType == 1) {
            this.phoneOverlock.cycleTime = item.cycleTime
            this.phoneOverlock.limitAmount = item.limitAmount
            this.phoneOverlock.id = item.id
            this.phoneAdd = false
            this.phoneEdit = false
          } else if(item.limitType == 2) {
            this.contentOverlock.cycleTime = item.cycleTime
            this.contentOverlock.limitAmount = item.limitAmount
            this.contentOverlock.id = item.id
            this.serverAdd = false
            this.serverEdit = false
          }
        })
      })
    },
    // 编辑保存
    editSubmit(data) {
      updateLimit(data).then(res => {
        if (res.status == 0) {
          this.$message({
            type: 'success',
            message: '修改成功!',
            center: true
          })
          this.getLimit()
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true
          })
        }
      })
    },
    // 新增保存
    addSubmit(data) {
      addLimit(data).then(res => {
        if (res.status == 0) {
          this.$message({
            type: 'success',
            message: '新增成功!',
            center: true
          })
          this.getLimit()
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            center: true
          })
        }
      })
    },
    // 新增保存按钮事件
    addAction(val) {
      if (val === 1) {  //号码超频新增
        let query = this.phoneOverlock
        delete query.id
        this.addSubmit(query)
      } else { // 内容超频新增
        let query = this.contentOverlock
        delete query.id
        this.addSubmit(query)
      }
    }
  },
  mounted() {
    this.getLimit()
  }
}
</script>
<style scoped lang="less">
  #overclock{
    width: 100%;
    height: 100%;
    overflow: auto;
    overflow: auto;
    color: #333;
    padding: 0 70px;
    box-sizing: border-box;

    .title {
      font-size: 20px;
      margin: 40px 0;
    }
    .content{
      width: 100%;
      height: 300px;
      // border: 1px solid #eee;
      padding: 10px 0;
      .item-head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-top{
          display: flex;
          align-items: center;
        }
        .item-title{
          font-size: 16px;
          font-weight: 400;
          color: #333333;
          letter-spacing: 0px;
          padding-left: 8px;
        }
      }
      .line{
        height: 2px;
        border-top: 1px dashed #e5e5e5;
        margin: 20px 0;
      }
      .content-setting{
        display: flex;
        justify-content: flex-start;
      }
    }
  }
</style>
