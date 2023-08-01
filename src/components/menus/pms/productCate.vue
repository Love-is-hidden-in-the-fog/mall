<template>
	<el-row>
		<el-col :span="24">
			<div class="grid-content ">
				<div class="el_col_right">
					<el-button @click="router.push('/pms/addProductCate');"> 添加</el-button>
					<!-- <el-button > <router-link to="/pms/addProduct">添加</router-link></el-button> -->
				</div>
				<div class="el_col_left">
					<el-icon style="margin-right: 3px; vertical-align: middle;">
						<Tickets />
					</el-icon>
					<span style="padding-top: 3px;">数据列表</span>
				</div>
			</div>
		</el-col>
		<el-col :span="24">
		  <el-table :data="tableData" border style="width: 100%" :header-cell-style="{'text-align':'center'}" :cell-style="{textAlign:'center'}" >
			<el-table-column prop="id" label="编号" width="100" />
			<el-table-column prop="name" label="分类名称" width="387" />
			<el-table-column prop="level" label="级别" width="100" />
			<el-table-column prop="productUnit" label="数量单位" width="100" />
			<el-table-column prop="navStatus" label="导航栏" width="120">
				<template #default="scope">
					<el-switch v-model="scope.row.navStatus" :active-value="1" :inactive-value="0" @change="updateStatus(scope.row.id,scope.row.navStatus,'navStatus')" />
				</template>
			</el-table-column>
			<el-table-column prop="showStatus" label="是否显示" width="120">
				<template #default="scope">
					<el-switch v-model="scope.row.showStatus" :active-value="1" :inactive-value="0" @change="updateStatus(scope.row.id,scope.row.showStatus,'showStatus')" />
				</template>
			</el-table-column>
			<el-table-column prop="sort" label="排序" width="120" />
			<el-table-column  label="设置" width="200" >
				<template #default="scope">
					<el-button size="small" @click="check(scope.row.id)" :disabled="zt" >查看下级</el-button>
					<el-button size="small">转移商品</el-button>
				</template>
			</el-table-column>
			<el-table-column  label="操作"  >
				<el-button size="small">编辑</el-button>
				<el-button type="danger" size="small">删除</el-button>
			</el-table-column>
		  </el-table>
		</el-col>
		<el-col :span="24">
				<el-pagination
				style="float: right; margin-right: 50px;" 
				 v-model:current-page="form.pageNum" v-model:page-size="form.pageSize"
					:page-sizes="[5, 10, 15]" 
					layout="total, sizes, prev, pager, next, jumper" :total="a.total" @size-change="list()"
					@current-change="list()" />
		</el-col>
	</el-row>
</template>

<script setup>
	import{ref,onMounted } from 'vue'
	import {useRouter} from 'vue-router'
	const router =new useRouter()
	import axios from '@/axios/index.js'
	let form = ref({
		pageNum:1,
		pageSize:5,
	})
	let tableData=ref([])
	// 控制查看下级是否被禁用
	let zt =ref(false)
	let list = ()=>{
		zt.value=false
		axios({
			url:"/productCategory/list/0",
			params:form.value
		}).then(res=>{
			// console.log(res.data.total)
			tableData.value=res.data.list
			// 获取页数
			a.value.total=res.data.total
			
		})
	}
	// 更新显示状态
	let updateStatus =(id,newStatus,status)=>{
		axios({
			url:`productCategory/update/${status}`,
			method:"POST",
			params:{
				ids:id,
				[`${status}`]:newStatus,
			}
		}).then(res=>{
			console.log(res.data)
		})
	}
	// 查看下级
	let check =(id)=>{
		// console.log(id)
		router.push({path:"/pms/productCate",query:{parentId:id}})
		zt.value=true
		axios({
			url:`/productCategory/list/${id}`,
			params:form.value
		}).then(res=>{
			tableData.value=res.data.list
			// console.log(res.data)
		})
	}
	// 分页器
	let currentPage4 =ref(4)
	let a =ref({
		total:0
	})
	onMounted(()=>{
		list()
	})
</script>

<style scoped>
	.el-row{
		padding: 20px;
	}
	.el-col{
		margin: 20px 0;
	}
	.el-col  .grid-content {
		border: 1px solid #ccc;
		height: 23px;
		padding: 20px;
	}
	
	.el_col_right {
		float: right;
	}
	
	.el_col_left {
		float: left;
	}
</style>