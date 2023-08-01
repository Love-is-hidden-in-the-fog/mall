<template>
	<!-- 此处使用ref获取dom元素必须放在div中使用才能获取到style样式 否则无法修改 -->
	<el-icon @click="toggle ">
		<div ref="xx"><svg-icon iconClass="menu"></svg-icon></div>
	</el-icon>
	<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<!-- 如果跳转路径为/home此dom元素不渲染 -->
			<el-breadcrumb-item v-if="route.path!=='/home'" v-for="(item,index) in list " :to="{path:item.path}"
				:key="index">{{item.meta.name}}</el-breadcrumb-item>
	</el-breadcrumb>
	<el-dropdown trigger="click" >
	     <div class="icon">
	     	<img src="http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/timg.jpg" width="40" style="border-radius: 10px;" >
	     </div>
	      <template #dropdown>
	        <el-dropdown-menu >
	          <el-dropdown-item ><router-link to="/home">首页</router-link> </el-dropdown-item>
	          <el-dropdown-item ><router-link to="/login" @click="loginout">退出</router-link></el-dropdown-item>
	        </el-dropdown-menu>
	      </template>
	</el-dropdown>
</template>

<script setup>
	import {ArrowRight,ArrowDown} from '@element-plus/icons-vue'
	import {useUserStore} from '@/store/index.js';
	import {storeToRefs} from 'pinia';
	import {onMounted,reactive,ref,watch} from 'vue'
	import {useRouter,useRoute} from 'vue-router'

	let xx = ref(null)
	const UserStore = useUserStore()
	let {isCollapse} = storeToRefs(UserStore)
	// 控制侧边栏变化
	let toggle = () => {
		isCollapse.value = !isCollapse.value
		xx.value.style.transform = isCollapse.value ? 'rotate(-90deg)' : 'rotate(0deg)'
	}
	// 调用路由中路径信息
	const router = new useRouter()
	const route = new useRoute()
	const list = ref(router.currentRoute.value.matched)
	watch(() => router.currentRoute.value.matched, (newVal, oldVal) => {
		// 返回一个包含当前路由匹配的所有路由记录的数组
		// console.log(router.currentRoute.value.matched)
		// 更新渲染列表的值
		list.value = newVal
	})
	
	// 退出登录并且清除token
	let loginout=()=>{
		// console.log(1)
		localStorage.removeItem('token')
	}
</script>

<style scoped>
	a{
		text-decoration: none;
		color: #606266;
	}
	.nav {
		position: relative;
		cursor: pointer;
	}

	.el-icon {
		float: left;
		font-size: 30px;
		margin: 10px;
		transition: rotate 2s linear;
		cursor: pointer;
		/* transform: rotate(90deg); */
	}

	.el-breadcrumb {
		float: left;
		height: 50px;
		line-height: 50px;
		margin-left: 20px;
		cursor: pointer;
	}
	/* 左侧下拉菜单 */
	.example-showcase .el-dropdown + .el-dropdown {
	  margin-left: 15px;
	}
	.example-showcase .el-dropdown-link {
	  cursor: pointer;
	  color: var(--el-color-primary);
	  display: flex;
	  align-items: center;
	}
	.el-dropdown {
		position:absolute;
		right: 35px;
		top: 5px;
	}
	.el-dropdown .icon{
		width: 73px;
	}
	.el-dropdown .icon::before{
		content: "";
		position: absolute;
		top: 35px;
		left:60px;
		border: 5px solid #999;
		border-bottom: 5px solid transparent;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		pointer-events: none; /* 让伪元素继承其父级元素的pointer-events属性值 */
	}
</style>