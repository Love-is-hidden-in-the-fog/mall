<template>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="route.path"
        text-color="#fff"
		:collapse="isCollapse"
		router
      >
	  <!-- 首页 -->
		  <el-menu-item index="/home">
		  	<el-icon><svg-icon iconClass="home" ></svg-icon></el-icon>
		  	 <template #title><span style="margin-left:20px">首页</span></template>
		  </el-menu-item>
		<el-sub-menu :index="item.name" v-for="(item,index) in a "  :key="index" >
		  <template #title>
			<el-icon><svg-icon :iconClass="item.meta.svg" ></svg-icon></el-icon>
			<span style="margin-left:10px">{{item.meta.name}}</span>
		  </template>
			<el-menu-item v-for="(items,index) in item.children.filter(items=>items.name!=='addProductCate') " :index="item.path+'/'+items.path" :key="index">
				<el-icon ><svg-icon :iconClass="items.meta.svg" ></svg-icon></el-icon>
				<span  style="margin-left:10px">{{items.meta.name}}</span>
			</el-menu-item>
		</el-sub-menu>
      </el-menu>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

import {onMounted, ref} from 'vue'
import {useRoute ,useRouter} from 'vue-router'

import { useUserStore } from '@/store/index.js';
import { storeToRefs } from 'pinia';
// 调用路由中meta数据
const route =new useRoute()
const router =new useRouter()
// 路由中的数据在router.options.routes中
let a =router.options.routes.filter(item=>{
	return item.name=="pms"||item.name=="oms"||item.name=="sms"
})

console.log(router) // 当前路由路径s
//面板折叠
// const isCollapse = ref(true)
const UserStore =useUserStore() 
let {isCollapse} =storeToRefs(UserStore)


</script>
<style scoped>
	.aside ul{
		height:calc(100vh);
	}
	.aside .el-row .el-col ul{
		width: 180px;
	}
	a{
		text-decoration: none;
		color: #fff;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
	  width: 180px;
	  min-height: 224px;
	}
	.el-menu-vertical-demo{
	  border-right-width:0;
	 }
	.el-sub-menu /deep/ .el-sub-menu__title:hover{
		background-color: rgb(67,74,80) !important;
	}
</style>