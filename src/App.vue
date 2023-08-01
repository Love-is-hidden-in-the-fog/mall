<template>
	<el-config-provider :locale="locale">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup>
	//在APP。vue中引入echarts
	import * as echarts from "echarts";
	import { provide } from "vue";
	provide("echarts", echarts);
	
	import zhCn from 'element-plus/lib/locale/lang/zh-cn'
	let locale = zhCn
	
	 const debounce = (fn, delay) => {
	     let timer = null;
	     return function () {
	       let context = this;
	       let args = arguments;
	       clearTimeout(timer);
	       timer = setTimeout(function () {
	         fn.apply(context, args);
	       }, delay);
	     }
	   }
	   
	   const _ResizeObserver = window.ResizeObserver;
	   window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
	     constructor(callback) {
	       callback = debounce(callback, 16);
	       super(callback);
	     }
	   }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* 使用弹性布局让右边宽度和侧边栏的宽度始终占满屏幕 */
  width: 100%;
  /* display: flex; */
  position: absolute;
  top: 0;
  left: 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
