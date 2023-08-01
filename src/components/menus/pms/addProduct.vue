<template>
	<div class="addProduct_con">
		<el-steps :active="active" align-center finish-status="success">
		  <el-step title="填写商品信息" />
		  <el-step title="填写商品促销" />
		  <el-step title="填写商品属性" />
		  <el-step title="选择商品关联" />
		</el-steps>
		<div style="margin-top: 50px;">
			<component :is="arr[active]" @next ="next"></component>
		</div>
	</div>
</template>

<script setup>
	import son1 from "./addProductson/son1.vue"
	import son2 from "./addProductson/son2.vue"
	import son3 from "./addProductson/son3.vue"
	import son4 from "./addProductson/son4.vue"
	
	import { ref} from 'vue'
	let active = ref(0)
	let arr= [son1,son2,son3,son4]
	let next = (val) => {
	  active.value=val
	}
</script>

<style scoped>
	.addProduct_con{
		width: 800px;
		border: 1px solid #ebeef5;
		padding: 55px 55px 35px;
		margin: 20px auto;
	}
</style>