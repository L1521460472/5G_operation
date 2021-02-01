<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body .el-table th.gutter{
display: table-cell!important;
}
// 页面头部
.headerBtn{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  .headerBtnLeft{
    display: flex;
    align-items: center;
    /deep/ .el-button+.el-button{
      margin-left: 1px !important;
    }
    .el-dropdown{
      margin-right: 1px;
    }
    .el-select{
      margin-left: 10px;
      // margin-right: 10px;
    }
    .search{
      margin-left: 10px;
    }
    .el-input--small .el-input__inner{
      height: 36px;
      line-height: 36px;
    }
    .el-input--small .el-input__icon{
      line-height: 36px;
    }
  }
  .headerBtnRight{
      display: flex;
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
}
.headerBtn .headerBtnLeft .el-button+.el-button{
      margin-left: 1px !important;
}
.headerBtnRight .el-button span{
  display: flex;
  align-items: center;
}
.headerBtnRight .el-button span .iconfont{
  margin-right: 4px
} 
// 去除固定表格列中的底边框
.table{
  /deep/ .el-table__fixed-right{
    height: calc(100% - 8px) !important;   //设置高优先，以覆盖内联样式
  }
  /deep/ .el-table__fixed-right::before, .el-table__fixed::before{
    height: 0 !important;
  }
}

/* 部分公共样式 */
/* 交换confirmz弹窗确认按钮位置 */
.btn-custom-confirm {
  float: left;
}
.el-message-box__btns {
  padding: 5px 130px 0 !important;
}
/* 兼容safari浏览器，防止表头错位 */
.el-table__body {
  width: 100%;
  table-layout: fixed !important;
}
/* 设置el-tooltip宽度 */
.el-tooltip__popper {
  max-width: 300px !important;
}
/* 去掉el-tooltip聚焦边框 */
.el-tooltip:focus {
  outline: 0 !important;
}

/* 表格展开部分样式 */
.el-table__expanded-cell {
  background-color: #f8f8fb;
}
.el-table__expanded-cell:hover {
  background-color: #f8f8fb !important;
}
.el-form-item__content {
  font-size: 14px;
  color: #333;
}
.el-form-item__label {
  font-size: 14px;
  color: #666;
}
.demo-table-expand .el-form-item__content {
  font-size: 12px;
  color: #333;
}
.demo-table-expand .el-form-item__label {
  font-size: 12px;
  color: #333;
}
.demo-table-expand .el-form-item {
  margin-bottom: 0;
}
.demo-table-expand .el-image {
  margin-right: 10px;
}
.el-tree-node__content > .el-tree-node__expand-icon {
  width: 12px;
  height: 12px;
}
/* 全局抽屉样式 */
.el-drawer__open .el-drawer.rtl {
  overflow-y: auto;
}
.el-drawer__header span:focus {
  outline: 0;
}
.el-drawer:focus {
  outline: 0;
}

.el-drawer__header {
  border-bottom: 1px solid #e5e5e5;
  padding: 10px 20px;
  margin-bottom: 40px;
}
.el-drawer__close-btn {
  font-size: 24px;
  color: #333;
}
.el-drawer__close-btn:focus {
  outline: 0;
}
.drawerContent {
  padding: 0 50px;
}
.drawerContent .el-input {
  width: 260px;
  margin-left: 0 !important;
}
.drawerContent .el-input__inner {
  width: 260px !important;
}
.drawerContent .el-input--suffix {
  width: 260px !important;
}
.drawerContent .el-textarea__inner {
  width: 260px !important;
}
/* 更改tree组件icon */
.el-tree .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
/* 有子节点 且未展开 */
.el-tree .el-icon-caret-right:before {
  background: url("./assets/images/fold_icon.svg") no-repeat 0 0;
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  font-size: 14px;
  background-size: 14px;
}
/* 有子节点 且已展开 */
.el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
  background: url("./assets/images/unfold_icon.svg") no-repeat 0 0;
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  font-size: 14px;
  background-size: 14px;
}
.el-tree .el-tree-node__expand-icon.is-leaf::before {
  background: url("./assets/images/file_icon.svg") no-repeat 0 0;
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  font-size: 14px;
  background-size: 14px;
}

/* 更改全局遮罩样式 */
.v-modal {
  top: 60px !important;
}
.el-drawer__wrapper {
  top: 60px !important;
}
// .btn-custom-cancel {
//   float: right ;
//   margin-left: 10px;
// }
/* 操作图标居中 */
.operation {
  margin-left: 10px;
  display: block;
  float: left;
  cursor: pointer;
}
/* 表格页码 */
.footer_page {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
</style>
