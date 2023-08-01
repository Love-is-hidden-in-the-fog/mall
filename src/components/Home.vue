<template>
	<!-- 侧边栏 -->
	<div class="aside" ref="xx" :style="{width:isCollapse?'64px' :'180px' }">
		<Aside ></Aside>
	</div>
	<div class="right" :style="{width:isCollapse?'calc(100% - 64px)': 'calc(100% - 180px)' ,marginLeft:isCollapse?'64px':'180px'}" >
		<!-- 上方导航栏 -->
		<div class="nav"   >
	
			<Nav ></Nav>
		</div>
		<!-- 内容 -->
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup>
	import Aside from "./menus/Aside.vue"
	import Content from "./menus/Content.vue"
	import Nav from "./menus/Nav.vue"
	import { useUserStore } from '@/store/index.js';
	import { storeToRefs } from 'pinia';
	const UserStore =useUserStore()
	let {isCollapse} =storeToRefs(UserStore)
	// console.log(isCollapse)
	components:{
		Aside,Content,Nav
	}
</script>

<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.aside{
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgb(84,92,100);
		height:calc(100vh);
		/* transition: width 0s linear; */
	}
	.right{
		width: 100%;
	}
	.content{
/* 		padding: 50px 100px;
		margin-bottom: 30px; */
	}
	.nav{
		border-bottom:  1px solid #dcdfe6;
		height: 50px;
	}
</style>