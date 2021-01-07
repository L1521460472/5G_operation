<template>
  <div id="home">
    <div class="header">
      <el-container>
        <el-header>
          <div class="left">
            <img src="../assets/images/logo.svg" alt="" />
            运营管理平台
          </div>
          <div class="right">
            <el-button-group>
              <span>{{userName}}</span>
              <span class="label">|</span>
              <span @click="logout">退出</span>
            </el-button-group>
            <!-- <el-button type="text">账号管理</el-button> |
            <el-button type="text" style="margin:0">退出</el-button> -->
          </div>
        </el-header>
        <el-container style="height: calc(100% - 60px);">
          <el-aside width="200px">
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              :default-openeds="openeds_value"
              :collapse="isCollapse"
              background-color="#F8F8FB"
              text-color="#222222"
              active-text-color="#368CFE"
              router
            >
              <!-- 一级菜单 -->
              <template v-for="item in menuItems">
                <el-submenu
                  v-if="item.children && item.children.length && item.show"
                  :index="item.url"
                  :key="item.id"
                >
                  <template slot="title" >
                    <img class="icon" :src="`/static/images/${item.icon}.svg`" alt="" srcset="" />
                    <!-- <img :src="item.icon" alt=""> -->
                    <!-- <i :class="'iconfont ' + item.icon"></i> -->
                    <span>{{ item.name }}</span>
                  </template>
                  <!-- 二级菜单 -->
                  <template v-for="subItem in item.children">
                    <el-submenu
                     class="secondMenu"
                      v-if="subItem.children && subItem.children.length && subItem.show"
                      :index="subItem.url"
                      :key="subItem.id"
                    >
                      <template slot="title">
                        <!-- <img src="`/static/images/${subItem.icon}.png`" alt="" srcset=""> -->
                        <!-- <i :class="'iconfont ' + subItem.icon"></i> -->
                        <span>{{ subItem.name }}</span>
                      </template>

                      <!-- 三级菜单 -->
                      <el-menu-item
                        class="threeMenu"
                        v-for="threeItem in subItem.children"
                        :index="threeItem.url"
                        :key="threeItem.id"
                      >
                        <!-- <i :class="'iconfont ' + threeItem.icon"></i> -->
                        <span slot="title">{{
                          threeItem.name
                        }}</span></el-menu-item
                      >
                    </el-submenu>

                    <el-menu-item v-else :index="subItem.url" :key="subItem.id">
                      <!-- <img src="../assets/images/home_icon.png" alt="" srcset=""> -->
                      <!-- <i :class="'iconfont ' + subItem.icon"></i> -->
                      <span slot="title">{{ subItem.name }}</span></el-menu-item
                    >
                  </template>
                </el-submenu>

                <el-menu-item v-else :index="item.url" :key="item.id">
                  <!-- <img :src="item.icon" alt="" srcset="" /> -->
                  <img class="icon" :src="`/static/images/${item.icon}.svg`" v-if="$route.path == '/homepage'" />
                  <img class="icon" :src="`/static/images/${item.icon}2.svg`" v-else />
                  <!-- <i :class="'iconfont ' + item.icon"></i> -->
                  <span slot="title">{{ item.name }}</span></el-menu-item
                >
              </template>
            </el-menu>
          </el-aside>
          <el-main>
            <div class="main">
              <router-view :authorityBttonList='menuItems' />
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import {getAllMenuList,loginOut} from '../api/homeIndex/api'
import { getCookie, setCookie, removeCookie } from "../public";

export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
      openeds_value: [
        "/homeIndex",
        "/userName",
        "/audit",
        "/account",
        "/channel",
        "/seeting",
        "/material",
        "/baseSeeting"
      ], //一进入就打开的菜单
      menuItems: [],
      userName:getCookie('enterpriseUserName'),
      btnList: [],
      headers : {Authorization:getCookie('enterprisePass')}
    };
  },
  methods: {
    // 退出
    logout() {
      loginOut({},this.headers).then(res=>{
        if(res.status == 0){
          removeCookie('enterprisePass')
          removeCookie('enterpriseUserName')
          sessionStorage.removeItem('btnList')
          this.$router.push("/");
        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch(err=>{
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    getMenuList(){
      getAllMenuList({},this.headers).then(res=>{
        if(res.status == 0){
          this.menuItems = res.data
          const result = this.getTreeData(res.data)
          sessionStorage.setItem('btnList', JSON.stringify(result))
          sessionStorage.setItem('menuList',JSON.stringify(res.data))
        }else{
          this.$message.error({
            message:res.message,
            center:true
          })
        }
      }).catch(err=>{})
    },
    getTreeData(data) {
      for(var i in data) {
        if (data[i].type == 2) {
          this.btnList.push(data[i].code)
        }
        if (data[i].children != 0) {
          this.getTreeData(data[i].children)
        }
      }
      return this.btnList
    }
  },
  mounted() {
    this.getMenuList()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  min-width: 1440px;
  min-height: 700px;
  // overflow: auto;
  // overflow: hidden;
  .header {
    width: 100%;
    height: 100%;
  }
  .el-header,
  .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    .left {
      // width: 250px;
      height: 42px;
      margin-top: 9px;
      margin-left: 10px;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #000000;
      font-family: Microsoft YaHei;
      font-size: 20px;
      font-weight: 600;
      img {
        width: 42px;
        height: 42px;
        margin-right: 10px;
      }
    }
    .right {
      // width: 180px;
      height: 100%;
      float: right;
      // margin-right: 10px;
      color: #000000;
      font-family: Microsoft YaHei;
      font-size: 16px;
      span {
        cursor: pointer;
      }
      .label {
        color: #e5e5e5;
        margin: 0 15px;
        cursor: default;
      }
    }
  }
  .el-header{
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
  .el-aside {
    height: 100%;
    padding-top: 20px;
    background-color: #f8f8fb !important;
    overflow: hidden;
    padding-right: 8px;
    box-sizing: border-box;
    .el-menu {
      border-right: none;
      width: 200px;
      .el-menu-item {
        font-size: 18px;
      }
      .el-submenu__title {
        span {
          font-size: 18px;
        }
      }
    }
    .el-submenu {
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        color: #333;
        padding-left: 53px!important;
        font-size: 14px;
      }
    }
    .el-submenu .el-menu--inline .el-menu-item span{
      color: #333;
    }
    .el-menu-item.is-active span{
      color: #368cfe !important;
    }

  }
  .el-aside:hover{
    overflow-y: auto;
  }
  /deep/ .el-menu .is-active{
    background-color: #f8f8fb !important;
    color: #368cfe !important;
  }
  /deep/ .el-submenu__title:hover {
    background-color: #ededf2 !important;
  }
  .el-menu-item:hover {
    background-color: #ededf2 !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    background: #f8f8fb !important;
  }
  .el-menu-vertical-demo {
    height: 100%;
  }

  .el-main {
    // height: 100%;
    background: #f8f8fb !important;
    .main {
      min-height: 100%;
      display: flex;
      box-sizing: border-box;
      background: #fff !important;
    }
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .header > .el-container {
    height: calc(100%);
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .icon{
    margin-right: 5px;
  }
}
</style>
