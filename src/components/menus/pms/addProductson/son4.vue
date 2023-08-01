<template>
	<div style="text-align: center">
		<el-form-item label="关联专题:">
			<el-transfer v-model="leftValue" style="text-align: left; display: inline-block ;margin-bottom: 20px;"
				filterable :titles="['待选择', '已选择']" :data="data1">
			</el-transfer>
		</el-form-item>
		<el-form-item label="关联优选">
			<el-transfer v-model="leftValue" style="text-align: left; display: inline-block" filterable
				:titles="['待选择', '已选择']" :data="data2">
			</el-transfer>
		</el-form-item>
	</div>
	<el-form-item>
		<el-button @click="onLast">上一步，填写商品信息</el-button>
		<el-button type="primary" @click="submit">完成，提交商品</el-button>
	</el-form-item>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'
	// 导入封装的axios
	import axios from "@/axios/index.js"
	import {usePaddStore} from '@/store/paddStore.js'
	import {storeToRefs} from 'pinia'
	const paddStore = usePaddStore()
	const {productParam} =storeToRefs(paddStore)
	
	let getListAll = () => {
		axios({
			url: "/subject/listAll",

		}).then(res => {
			// console.log(res.data)
			data1.value = generateData(res.data)
			// console.log(data1.value)
		})
		axios({
			url: "/prefrenceArea/listAll",

		}).then(res => {
			// console.log(res.data)
			data2.value = generateData(res.data)
			// console.log(data2.value)
		})

	}
	onMounted(() => {
		getListAll()
	})
	// 定义 Option 接口
	const Option = {
		key: Number,
		label: String,
		disabled: Boolean
	}

	// 创建 ref 对象
	const data1 = ref([])
	const data2 = ref([])
	const rightValue = ref([1])
	const leftValue = ref([1])
	// 生成数据的函数
	const generateData = (d) => {
		const datalist = []
		d.forEach(item => {
			if (item.name) {
				datalist.push({
					key: item.id,
					label: item.name
				})
			} else {
				datalist.push({
					key: item.id,
					label: item.title
				})
			}
		})
		return datalist
	}


	const submit = () => {
		ElMessageBox.confirm(
				'是否要提交该产品?',
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				console.log(productParam.value)
				axios({
					url: "/product/create",
					method:'POST',
					data:productParam.value
					
				}).then(res => {
					console.log(res.data)
				})
				ElMessage({
					type: 'success',
					message: '提交成功',
				})
			})
			.catch(() => {
				ElMessage({
					type: 'info',
					message: '提交失败',
				})
			})
	}

	// 定义子传父的事件
	let emit = defineEmits(["next"]);
	const onLast = () => {
		emit("next", 2);
	}
</script>

<style>
	.transfer-footer {
		margin-left: 15px;
		padding: 6px 5px;
	}
</style>