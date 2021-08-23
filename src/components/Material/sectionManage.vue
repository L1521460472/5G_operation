<template>
  <!-- 号段管理 -->
  <div id="sectionManage">
    <div class="title">号段管理</div>
    <el-tabs class="tab" v-model="sectionType">
      <el-tab-pane name="first" label="运营商号段">
        <div class="container">
          <div class="headerBtn">
            <div class="headerBtnLeft">
              <el-button class="addBtn" type="primary" size="small"  @click="refresh">
                <i class="iconfont iconshuaxin"></i>
              </el-button>
              <el-button class="addBtn" type="primary" size="small"  @click="reset">
                <i class="iconfont iconguanbi"></i>
              </el-button>
              <el-select v-model="operatorsSection"  clearable size="small" placeholder="请选择运营商">
                <el-option
                  v-for="item in operatorsOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="号段">
                <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
            <div class="headerBtnRight">
              <el-button size="small" type="primary" @click="addAction">
                <i class="iconfont iconxinzeng"></i>
                新增
              </el-button>
            </div>
          </div>
          <el-table
            border
            class="table"
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small"
            :data="tableData"
            :style="{'color':'#333','min-height':tableHeight + 'px'}">
              <el-table-column label="运营商类型" prop="" width="150"></el-table-column>
              <el-table-column label="运营商号段" prop=""></el-table-column>
              <el-table-column label="更新时间" prop="" width="150"></el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <span class="operation">编辑</span>
                </template>
              </el-table-column>
          </el-table>
          <el-drawer
            :title="isNewAddOperators? '添加运营商号段' : '编辑运营商号段'"
            :visible.sync="operatorsDrawer"
            size="500px"
            direction="rtl">
              <el-form class="drawerContent" ref="operators" :rules="rule1" :model="operatorsForm" label-width="110px" label-position="right">
                <el-form-item label="运营商类型:" prop="type">
                  <el-select size="small" clearable v-model="operatorsForm.type">
                    <el-option
                      v-for="item in operatorsOptions2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="号段:" prop="sections">
                  <el-input
                    v-model="operatorsForm.sections"
                    type="textarea"
                    :autosize="{ minRows: 4 }"
                    placeholder="请输入号段，多个号段换行或用逗号隔开">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small" v-if="isNewAddOperators" @click="addSubmit">提 交</el-button>
                  <el-button type="primary" size="small" v-else @click="updateSubmit">提 交</el-button>
                  <el-button size="small" @click="cancle">取 消</el-button>
                </el-form-item>
              </el-form>
          </el-drawer>
        </div>
      </el-tab-pane>
      <el-tab-pane name="second" label="省市号段">
        <div class="container">
          <div class="headerBtn">
            <div class="headerBtnLeft">
              <el-button class="addBtn" type="primary" size="small"  @click="refresh2">
                <i class="iconfont iconshuaxin"></i>
              </el-button>
              <el-button class="addBtn" type="primary" size="small"  @click="reset2">
                <i class="iconfont iconguanbi"></i>
              </el-button>
              <el-input class="search" v-model="searchCont2" size="small" maxlength="50" placeholder="号段">
                <i @click="searchAction2" slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
            <div class="headerBtnRight">
              <el-button size="small" type="primary" @click="addAction2">
                <i class="iconfont iconxinzeng"></i>
                新增
              </el-button>
              <el-button size="small" plain @click="importFile">
                <i class="iconfont icondaochu"></i>
                导入
              </el-button>
            </div>
          </div>
          <el-table
            border
            class="table"
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small"
            :data="tableData2"
            :style="{'color':'#333','min-height':tableHeight + 'px'}">
            <el-table-column label="运营商号段" prop="" width="100"></el-table-column>
              <el-table-column label="运营商类型" prop="" width="100"></el-table-column>
              <el-table-column label="地市号段" prop=""></el-table-column>
              <el-table-column label="省份" prop="" width="150"></el-table-column>
              <el-table-column label="城市" prop="" width="150"></el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <span class="operation">编辑</span>
                </template>
              </el-table-column>
          </el-table>
          <el-drawer
            :title="isNewAddCitys? '添加省市号段' : '编辑省市号段'"
            :visible.sync="operatorsDrawer2"
            size="500px"
            direction="rtl">
              <el-form class="drawerContent" ref="citys"  :model="cityForm" label-width="110px" label-position="right">
                <el-form-item label="运营商类型:" prop="type">
                  <el-select size="small" clearable v-model="cityForm.type">
                    <el-option
                      v-for="item in operatorsOptions2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="运营商号段:">
                  <el-select size="small" clearable v-model="cityForm.operationSections">
                    <el-option
                      v-for="item in operatorsOptions2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="省市:" prop="sections">
                  <el-select size="small" clearable v-model="cityForm.city">
                    <el-option
                      v-for="item in operatorsOptions2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="地市号段:">
                  <el-input
                    v-model="cityForm.citySections"
                    type="textarea"
                    :autosize="{ minRows: 4 }"
                    placeholder="请输入号段，多个号段换行或用逗号隔开">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small" v-if="isNewAddOperators" @click="addSubmit2">提 交</el-button>
                  <el-button type="primary" size="small" v-else @click="updateSubmit2">提 交</el-button>
                  <el-button size="small" @click="cancle2">取 消</el-button>
                </el-form-item>
              </el-form>
          </el-drawer>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'sectionManage',
  data() {
    return {
      sectionType: 'first',
      operatorsSection: '', // 运营商
      searchCont: '', // 号段
      isNewAddOperators: true,
      operatorsDrawer: false, // 运营商添加伤处
      operatorsOptions: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '移动',
          value: '1'
        },
        {
          label: '联通',
          value: '2'
        },
        {
          label: '电信',
          value: '3'
        },
      ],
      operatorsOptions2: [
        {
          label: '移动',
          value: '1'
        },
        {
          label: '联通',
          value: '2'
        },
        {
          label: '电信',
          value: '3'
        },
      ],
      operatorsForm: {
        type: '',
        sections: ''
      },
      rule1: {
        type: [
          { required: true, message: '请选择运营商', trigger: "change"}
        ],
        sections: [
          { required: true, message: '请输入号段', trigger: "blur" }
        ]
      },
      tableData: [],
      // <--------------------省市号段------------------------>
      searchCont2: '', // 号段
      tableData2: [], // 省市号段表格数据
      operatorsDrawer2: false, // 弹框控制2
      cityForm: {}, // 添加省市号段表单
      isNewAddCitys: true, // 是否是新增省市号段
      tableHeight:window.innerHeight - 369 +'',
    }
  },
  methods: {
    // 运营商号段
    refresh() {

    },
    reset() {

    },
    searchAction() {

    },
    // 新增
    addAction() {
      this.operatorsDrawer = true
    },
    addSubmit() {
      this.$refs.operators.validate((valid) => {
        if(valid) {
          this.operatorsDrawer = false
        }
      })
    },
    updateSubmit() {
      this.$refs.operators.validate((valid) => {
        if(valid) {
          this.operatorsDrawer = false
        }
      })
    },
    cancle() {
      this.operatorsDrawer = false
    },


    //省市号段
    // 刷新列表数据
     refresh2(){

     },
    //  重置搜素条件
     reset2() {

     },
    //  搜索事件
     searchAction2() {

     },
    //  点击添加事件
     addAction2() {
       this.operatorsDrawer2 = true
     },
     importFile() {

     },
     addSubmit2() {
       this.operatorsDrawer2 = false
     },
     updateSubmit2() {
       this.operatorsDrawer2 = false
     },
     cancle2() {
       this.operatorsDrawer2 = false
     }
  },
  mounted() {

  }
}
</script>
<style scoped lang="less">
#sectionManage{
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #333;
  letter-spacing: 0.75px;
  padding: 0 70px;
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
    /deep/ .el-tabs__nav-wrap::after{
      height: 1px;
    }
    .container{
      width: 100%;
      height: calc(100% - 96px);
      box-sizing: border-box;
    }
  }
  /deep/ .el-tabs__header{
    margin-bottom: 30px;
  }
}
</style>
