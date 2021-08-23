<template>
  <div id="materialAudit">
    <div class="title">素材审核</div>
    <el-tabs v-model="productType" class="tab" @tab-click="handleClick" >
      <el-tab-pane  label="RCS消息" name="rcs">
        <div v-loading="loading"  element-loading-text="loading">
          <div class="container">
            <div class="headerBtn">
              <div class="headerBtnLeft">
                <span class="materialType" @click="changeMaterialType(1)" :class="materialType ==1 ?'active':''">图片</span>
                <span class="materialType" @click="changeMaterialType(2)" :class="materialType ==2 ?'active':''">音频</span>
                <span class="materialType" @click="changeMaterialType(3)" :class="materialType ==3 ?'active':''">视频</span>
              </div>
              <div class="headerBtnLeft">
                <el-select v-model="auditStatus" ref="rcs"  @visible-change="isShowSelectOptions" clearable size="small" placeholder="审核状态">
                  <el-option
                    v-for="item in auditStatusList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="素材名称">
                  <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
            </div>
            <el-table
              border
              :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
              size="small"
              :data="tableData"
              :style="{'color':'#333','min-height':tableHeight + 'px'}"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <div class="file">
                    <div v-if="materialType === 1">
                      <img class="picture" src="http://172.18.11.24:8888/group1/M00/00/2C/rBILGGCZ32qAVo2bAABFM_nMCU0507.jpg" />
                    </div>
                    <div v-else-if="materialType === 2">
                      <audio :ref="'audio' + props.$index" @ended="handleEnded(props.$index)" @loadedmetadata="handleDuration(props.$index)" @timeupdate="handlePlaying(props.$index)" preload readyState>
                        <source src="http://47.112.226.188:8888/group1/M00/00/00/rB85_F-_JFiACWesAABolST5iTc996.mp3" type="audio/mpeg" />
                      </audio>
                      <div class="audioCon">
                        <img class="iamgeLeft" :src="props.row.flag ? props.row.imgLeft2: props.row.imgLeft1"  />
                        {{ duration }}
                        <img class="imageRight" @click="handlePlay(props.$index)" :src="props.row.flag ? props.row.imgRight2: props.row.imgRight1"/>
                      </div>
                    </div>
                    <div v-else>
                      <video class="video" preload controls="controls" src="http://172.18.11.24:8888/group1/M00/00/26/rBILGF_JqEGASOXIAJiC1CZoynQ953.mp4"></video>
                    </div>
                  </div>
                </template>
              </el-table-column>           
              <el-table-column prop="name" width="120" label="文件ID"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="description" width="120" label="文件名"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="belongTo" width="120" label="文件类型"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="belongTo" width="120" label="文件大小"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="belongTo" width="120" label="应用"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="belongTo" width="140" label="创建时间"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="status" width="120" label="状态" show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="status">
                    <span v-if="scope.row.status == 0">待审核</span>
                    <span v-if="scope.row.status == 1">审核通过</span>
                    <span v-if="scope.row.status == 2">审核拒绝</span>
                    <span v-if="scope.row.status == 3">停用</span>
                    <el-tooltip v-if="scope.row.status == 2" class="item" effect="dark" :content="scope.row.checkContent" placement="top">
                        <img  src="../../assets/images/redWarning_icon.png" alt="">
                    </el-tooltip>
                  </div>
                </template> 
              </el-table-column>
              <el-table-column  label="操作" min-width="110" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="operation" @click="passAction(scope.row)">通过</span>
                  <span class="operation" @click="refuseAction(scope.row)">不通过</span>
                  <!-- <el-tooltip  class="item" effect="dark" content="审核通过" placement="top">
                    <img class="operation"  @click="passAction(scope.row)" src="../../assets/images/auditPass_icon.png" alt="">
                  </el-tooltip> 
                  <el-tooltip  class="item" effect="dark" content="审核拒绝" placement="top">
                    <img class="operation"  @click="refuseAction(scope.row)"  src="../../assets/images/auditRefunse_icon.png" alt="">
                  </el-tooltip> -->
                </template> 
              </el-table-column> 
            </el-table>
          </div>
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
      </el-tab-pane>
      <el-tab-pane  label="MMS短信" name="mms">
        <div v-loading="loading"  element-loading-text="loading">
          <div class="container">
            <div class="headerBtn">
              <div class="headerBtnLeft">
                <span class="materialType" @click="changeMaterialType(1)" :class="materialType ==1 ?'active':''">图片</span>
                <span class="materialType" @click="changeMaterialType(2)" :class="materialType ==2 ?'active':''">音频</span>
                <span class="materialType" @click="changeMaterialType(3)" :class="materialType ==3 ?'active':''">视频</span>
              </div>
              <div class="headerBtnLeft">
                <el-select v-model="auditStatus" ref="mms"  @visible-change="isShowSelectOptions" clearable size="small" placeholder="审核状态">
                  <el-option
                    v-for="item in auditStatusList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="素材名称">
                  <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
            </div>
            <el-table
              border
              :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
              size="small"
              :data="tableData"
              :style="{'color':'#333','min-height':tableHeight + 'px'}"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <div class="file">
                    <div v-if="materialType === 1">
                      <img class="picture" src="http://172.18.11.24:8888/group1/M00/00/2C/rBILGGCZ32qAVo2bAABFM_nMCU0507.jpg" />
                    </div>
                    <div v-else-if="materialType === 2">
                      <audio :ref="'audio' + props.$index" @ended="handleEnded(props.$index)" @loadedmetadata="handleDuration(props.$index)" @timeupdate="handlePlaying(props.$index)" preload readyState>
                        <source src="http://47.112.226.188:8888/group1/M00/00/00/rB85_F-_JFiACWesAABolST5iTc996.mp3" type="audio/mpeg" />
                      </audio>
                      <div class="audioCon">
                        <img class="iamgeLeft" :src="props.row.flag ? props.row.imgLeft2: props.row.imgLeft1"  />
                        {{ duration }}
                        <img class="imageRight" @click="handlePlay(props.$index)" :src="props.row.flag ? props.row.imgRight2: props.row.imgRight1"/>
                      </div>
                    </div>
                    <div v-else>
                      <video class="video" preload controls="controls" src="http://172.18.11.24:8888/group1/M00/00/26/rBILGF_JqEGASOXIAJiC1CZoynQ953.mp4"></video>
                    </div>
                  </div>
                </template>
              </el-table-column>           
              <el-table-column prop="name" width="160" label="文件ID"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="description" width="160" label="文件名"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="belongTo" width="130" label="文件类型"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="belongTo" width="130" label="文件大小"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="belongTo" width="150" label="应用"  show-overflow-tooltip></el-table-column>
              <el-table-column prop="belongTo" min-width="160" label="创建时间"  show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
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
      </el-tab-pane>
    </el-tabs>
    <!-- 审核意见弹窗 -->
    <el-dialog
      title="审核意见"
      :visible.sync="refuseToast"
      :close-on-click-modal="false"
      width="450px"
    >
      <el-form
        ref="refuseForm"
        :model="refuseForm"
        :rules="refuseRules">
        <el-form-item prop="refuseReason">
          <el-input
            type="textarea"
            placeholder="在此输入审核拒绝的原因"
            maxlength="200"
            :autosize="{ minRows: 8, maxRows: 10 }"
            show-word-limit
            v-model="refuseForm.refuseReason"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="confirmRefuse">发 送</el-button>
        <el-button @click="refuseToast = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "materialAudit",
  data() {
    return {
      loading:false,
      productType:'rcs',
      tableData:[],
      currentPage:1,
      pageSize:1,
      total:1,
      auditStatusList:[
        {
          id:1,
          value:'审核中'
        },
        {
          id:2,
          value:'运营商审核中'
        },
        {
          id:3,
          value:'审核通过'
        },
        {
          id:4,
          value:'审核不通过'
        },
      ],
      auditStatus:null,
      searchCont:null,
      materialType:1,//1.图片 2.音频 3.视频
      duration: "1", //音频时长
      refuseToast:false,//审核拒绝弹窗
      refuseForm:{
        refuseReason:'',//审核拒绝原因
      },
      refuseRules: {
        refuseReason: [{ required: true, message: "审核意见不能为空", trigger: "blur" }],
      },
      tableHeight:window.innerHeight - 369 +'',
    };
  },
  methods: {
    // 获取素材列表数据
    getDataList(){
      // this.loading = true
      // let params = {
      //   checkStatus: this.auditStatus,
      //   messageMouldName: this.searchCont,
      //   productType:parseInt(this.productType),
      //   materialType:materialType,
      //   currentPage: this.currentPage,
      //   pageSize: this.pageSize
      // }
      // templeteAuditList(params).then(res=>{
      //   this.loading = false
      //   if(res.status == 0){
      //     if(materialType === 2){
      //       res.data.records.map(item=>{
      //         item2.flag = false
      //         item2.imgLeft1 = require('../../assets/images/pause2_icon.svg')
      //         item2.imgRight1 = require('../../assets/images/play_icon.svg')
      //         item2.imgLeft2 = require('../../assets/images/paly2_icon.gif')
      //         item2.imgRight2 = require('../../assets/images/pause_icon.svg')
      //       })
      //     }
      //     this.total = res.data.total
      //     this.tableData = res.data.records
      //    }else{
      //     this.$message({
      //       message:res.message,
      //       center:true,
      //       type:res.status === 2 ? 'warning':'error'
      //     })
      //   }
      // }).catch(err=>{
      //   this.loading = false
      //   this.$message.error({
      //     message:err,
      //     center:true
      //   })
      // })
    },
    // 选择tab
    handleClick(tab, event) {
      this.productType = tab.name;
      this.currentPage = 1;
      this.pageSize = 10;
      this.status = null;
      this.searchCont = null;
      this.materialType = 1
      this.tableData = [];
    },
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.searchAction();
      }
    },
    // 查询
    searchAction(){
      this.currentPage = 1
      this.getDataList()
    },
    // 切换素材类型
    changeMaterialType(materialType){
      if(materialType !== this.materialType) {
        this.materialType = materialType
        this.tableData = []
        this.getDataList()
      }
    },
    // 审核通过
    passAction(){

    },
    // 审核拒绝
    refuseAction(){
      this.refuseForm.refuseReason = null
      this.refuseToast = true
    },
    // 审核拒绝确认
    confirmRefuse(){
      this.$refs.refuseForm.validate((valid) => {
        if(valid){
        //   let params = {
        //     checkContent: this.form.refuseReason,
        //     checkStatus: 2,
        //   }
        //   templeteAudit(params).then(res=>{
        //     if(res.status == 0){
        //       this.$message.success({
        //         message:'审核拒绝成功',
        //         center:true
        //       })
        //       this.refuseToast =false
        //       this.getDataList()
        //     }else{
        //       this.$message({
        //         message:res.message,
        //         center:true,
        //         type:res.status === 2 ? 'warning':'error'
        //       })
        //     }
        //   }).catch(err=>{
        //     this.$message.error({
        //       message:err,
        //       center:true
        //     })
        //   })
        }
      });
    },
    // 审核拒绝确认
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
    // 头部搜索下拉框选中后失焦防止回车触发下拉框
    isShowSelectOptions(isShowSelectOptions){
      if(!isShowSelectOptions) {
        this.$refs.rcs.blur()
        this.$refs.mms.blur()
      };
    },
    // 音频播放
    handlePlay(index) {
      this.tableData[index].flag = !this.tableData[index].flag
      if (this.tableData[index].flag) {
        this.$refs[`audio${index}`][0].play()
      } else {
        this.$refs[`audio${index}`][0].pause()
      }
    },
    handleEnded(index) {
      this.tableData[index].flag = !this.tableData[index].flag
    },
    handleDuration(index) {
      var h = Math.floor(this.$refs[`audio${index}`][0].duration / 360);
      var m =Math.floor(this.$refs[`audio${index}`][0].duration / 60) < 10
          ? "0" + Math.floor(this.$refs[`audio${index}`][0].duration / 60)
          : Math.floor(this.$refs[`audio${index}`][0].duration / 60);
      var s = Math.floor(this.$refs[`audio${index}`][0].duration % 60);
      var str = h > 0 ? h + ":" + m + ":" + s : m + ":" + s;
      this.duration = str;
    },
    handlePlaying(e) {
      var h = Math.floor(e.target.currentTime / 360);
      var m =Math.floor(e.target.currentTime / 60) < 10
          ? "0" + Math.floor(e.target.currentTime / 60)
          : Math.floor(e.target.currentTime / 60);
      var s =Math.floor(e.target.currentTime % 60) < 10
          ? "0" + Math.floor(e.target.currentTime % 60)
          : Math.floor(e.target.currentTime % 60);
      var str = h > 0 ? h + ":" + m + ":" + s : m + ":" + s;
      this.currentTime = str;
    },
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
#materialAudit{
  width: 100%;
  height: 100%;
  color: #333;
  overflow: auto;
  letter-spacing: 0.75px;
  padding: 0 70px;
  .title {
    height: 26px;
    line-height: 26px;
    padding-top: 40px;
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
    }
    /deep/ .el-tabs__nav-prev{
      font-size: 18px;
      margin-top: -1px;
    }
    .headerBtn{
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .el-input {
        width: 160px;
      }
      .el-input__inner{
        width: 160px;
      }
      /deep/ .el-input--suffix {
        width: 160px;
      }
      .materialType{
        width: 60px;
        height: 24px;
        border-radius: 40px;
        text-align: center;
        line-height: 24px;
        border: 1px solid #dcdfe6;
        cursor: pointer;
        margin-right: 10px;
        font-size: 14px;
      }
      .active{
        border-color: #409eff;
        color: #409eff;
      }
    }
    .status{
      display: flex;
      align-items: center;
      .refuseReason{
        max-width: 200px !important;
        white-space: normal !important;
      }
      img{
        margin-left: 10px;
      }
    }
    .file{
      background: #fff;
      width: 330px;
      padding: 15px 30px;
      border: 1px solid #e5e5e5;
      box-sizing: border-box;
      border-radius: 4px;
      .picture{
        width: 270px;
        display: block;
      }
      .audioCon {
        width: 270px;
        height: 72px;
        border: 1px solid #e5e5e5;
        background: #ffffff;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .iamgeLeft {
          margin-left: 5px;
          cursor: pointer;
        }
        .imageRight {
          margin-right: 5px;
          cursor: pointer;
        }
      }
      .video {
        width: 270px;
        height: 152px;
      }
      .video:focus {
        outline: none;
      }
    }
  }
}
#materialAudit /deep/ .el-tabs__header{
  margin-bottom: 30px;
}

</style>