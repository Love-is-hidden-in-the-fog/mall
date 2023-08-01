<template>
	<div class="pms_product">
		<el-row>
			<!-- 查询 -->
			<el-col :span="24">
				<div class="grid-content ">
					<el-row style="justify-content: space-between;">
						<div class="el_col_left">
							<Search style="width: 16px; height:16px; font-size: 16px; margin-right: 3px;" />
							<span>筛选搜索</span>
						</div>
						<div class="el_col_right">
							<el-button @click="resetForm(checkForm)">重置</el-button>
							<el-button type="primary" @click="check()" >查询结果</el-button>
						</div>
					</el-row>
					<el-row>
						<div class="el_col_con">
							<!-- ref="checkForm"是为了绑定整个表单结构能够进行重置操作
							 :model="form" 是为了将数据绑定到表单中-->
							<el-form ref="checkForm" :inline="true" :model="form" class="demo-form-inline">
								<!-- 添加prop="keyword"是为了让重置操作生效 不添加则不生效 -->
								<el-form-item label="输入搜索："  prop="keyword">
									<el-input v-model="form.keyword" placeholder="商品名称" />
								</el-form-item>
								<el-form-item label="商品货号" prop="productSn">
									<el-input v-model="form.productSn" placeholder="商品货号"  />
								</el-form-item>
								<el-form-item label="商品分类：" prop="productCategoryId">
									<el-cascader  v-model="form.productCategoryId" :props="props" :options="getproductList" placeholder="请选择" clearable @change="onChange(form.productCategoryId)" ></el-cascader>
								</el-form-item>
								<el-form-item label="商品品牌：" prop="brandId">
									<el-select v-model="form.brandId" placeholder="请选择品牌">
										<el-option v-for="(item,index) in getbrandList" :key="item.id" :label=item.name
											:value="item.id" />
									</el-select>
								</el-form-item>
								<el-form-item label="上架状态：" prop="publishStatus">
									<el-select v-model="form.publishStatus" placeholder="全部">
										<el-option label="上架" value="1" />
										<el-option label="下架" value="0" />
									</el-select>
								</el-form-item>
								<el-form-item label="审核状态:" prop="verifyStatus">
									<el-select v-model="form.verifyStatus" placeholder="全部">
										<el-option label="审核通过" value="1"  />
										<el-option label="未审核"   value="0" />
									</el-select>
								</el-form-item>
							</el-form>
						</div>
					</el-row>
				</div>
			</el-col>
			<el-col :span="24">
				<div class="grid-content ">
					<div class="el_col_right">
						<el-button @click="router.push('/pms/addProduct');"> 添加</el-button>
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
			<!-- 表单内容 -->
			<el-col :span="24">
				<div class="grid-content ">
					<el-table ref="multipleTableRef" :data="tableData" style="width: 100%" border
						:header-cell-style="{'text-align':'center'}" :cell-style="{textAlign:'center'}"
						@selection-change="handleSelectionChange">
						<el-table-column type="selection" width="40" />
						<el-table-column property="id" label="编号" width="60"></el-table-column>
						<!-- show-overflow-tooltip属性。 默认情况下，如果单元格内容过长，会占用多行显示。 若需要单行显示可以使用 show-overflow-tooltip 属性，它接受一个 Boolean， 为 true 时多余的内容会在 hover 时以 tooltip 的形式显示出来。 -->
						<el-table-column label="商品图片" width="120">
							<img src="@/assets/logo.png" width="80" height="80">
						</el-table-column>
						<el-table-column label="商品名称" width="429">
							<template #default="scope">
								<p>{{scope.row.name}}</p>
								<p>品牌：{{scope.row.brandName}}</p>
							</template>
						</el-table-column>
						<el-table-column property="name" label="价格/货号" width="120">
							<template #default="scope">
								<p>价格：{{scope.row.price}}</p>
								<p>货号：{{scope.row.productSn}}</p>
							</template>
						</el-table-column>
						<el-table-column label="标签" width="140">
							<template #default="scope">
								<!-- :active-value="1" :inactive-value="0" 这个的作用是能够通过获取的publishStatus控制开关切换 -->
								<el-switch @change="updateStatus(scope.row.id,scope.row.publishStatus,'publishStatus')"
									:active-value="1" :inactive-value="0" v-model="scope.row.publishStatus"
									inactive-text="上架:" />
								<el-switch @change="updateStatus(scope.row.id,scope.row.newStatus,'newStatus')"
									:active-value="1" :inactive-value="0" v-model="scope.row.newStatus"
									inactive-text="新品:" />
								<!-- 数据里面是保存状态的是：recommandStatus 使用scope.row.recommendStatus会导致每次刷新页面自动调用五次beforeChange函数 -->
								<el-switch
									@change="updateStatus(scope.row.id,scope.row.recommandStatus,'recommendStatus')"
									:active-value="1" :inactive-value="0" v-model="scope.row.recommandStatus"
									inactive-text="推荐:" />
							</template>
						</el-table-column>
						<el-table-column property="sort" label="排序" width="60">
						</el-table-column>
						<el-table-column label="SKU库存" width="100">
							<template #default="scope">
								<el-button style="border-radius: 50%;
										padding: 12px;
										color: #fff;
										background-color: #409eff;
										border-color: #409eff;
										border: 1px solid #dcdfe6;
										cursor: pointer;"
										@click="showSku(scope.row)">
									<el-icon style="font-size: 20px;">
										<EditPen />
									</el-icon>
								</el-button>
							</template>
						</el-table-column>
						<el-table-column property="sale" label="销量" width="100">
						</el-table-column>
						<el-table-column label="审核状态" width="100">
							<p>未审核</p>
							<p style="color: #409eff;">审核详情</p>
						</el-table-column>
						<el-table-column label="操作" width="160">
							<template #default="scope">
								<p><el-button size="small">查看</el-button>
									<el-button size="small" @click="update(scope.row)">编辑</el-button>
								</p>
								<p><el-button size="small">日志</el-button>
									<el-button size="small" type="danger">删除</el-button>
								</p>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</el-col>
			<!-- 批量操作 -->
			<div class="selections">
				<!--通过v-model="batchValue"获取批量操作执行的功能  -->
				<!-- 下拉选择框只能绑定基本类型的值，因此需要将非基本类型的值转化为字符串进行绑定。 -->
				<el-select v-model="batchValue" class="m-2" placeholder="批量操作">
					<el-option v-for="(item,index) in batchList" :key="item.label" :label="item.label" :value="index" />
				</el-select>
				<el-button style="margin-left: 20px;" type="primary" @click="changeStatus(batchValue)">确定</el-button>
			</div>
			<!-- 分页器 -->
			<div class="pager" style="margin-left: 630px;">
				<el-pagination v-model:current-page="form.pageNum" v-model:page-size="form.pageSize"
					:page-sizes="[5, 10, 15]" :small="small" :disabled="disabled" :background="background"
					layout="total, sizes, prev, pager, next, jumper" :total="aa.total" @size-change="add()"
					@current-change="add()" />
			</div>
		</el-row>
		<!-- 消息弹出框 -->
		  <el-dialog
			v-model="dialogVisible"
			title="编辑货品信息"
			width="40%"
			style="text-align: start;"
		  >
			<div >				
				<span>商品货号：{{skuProductSn}}</span>
				<el-input v-model="skuKeyWord"  placeholder="按SKU编号搜索" style=" margin-left: 25px; width: 60%;">
				<template #append><el-button @click="getSku(skuId,skuKeyWord)"><el-icon><Search /></el-icon></el-button></template>
				</el-input>
				<el-table :data="skuList"  border style="width: 100%; margin-top: 20px;" >
				  <el-table-column label="SKU编号" 	width="280"   >
					  <template #default="scope">
						  <el-input v-model="scope.row.skuCode" ></el-input>
					  </template>
				  </el-table-column>
				  <el-table-column label="销售价格"  width="120"   >
					  <template #default="scope">
						  <el-input v-model="scope.row.price" ></el-input>
					  </template>
				  </el-table-column>
				  <el-table-column label="商品库存"  width="120"   >
					  <template #default="scope">
						  <el-input v-model="scope.row.stock" ></el-input>
					  </template>
				  </el-table-column>
				  <el-table-column label="库存预警值" width="120"  >
					  <template #default="scope">
						  <el-input v-model="scope.row.lowStock" ></el-input>
					  </template>
				  </el-table-column>
				</el-table>
			</div>
			<template #footer>
			  <span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="updateSku(skuId)">确定</el-button>
			  </span>
			</template>
		  </el-dialog>
	</div>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue'
	import {useRouter} from 'vue-router'
	const router =new useRouter()
	// 导入使用表格样式
	import {
		ElTable,
		ElMessage,
		ElMessageBox
	} from 'element-plus'
	// 导入pinia中表格数据
	import {
		useProductStore
	} from "@/store/index.js"
	import {
		storeToRefs
	} from 'pinia'

	import axios from "@/axios/index.js";
	const productStore = useProductStore()
	const {
		form,
		aa,
		cateList,
		brandList,
		tableData,
		batchValue,
		batchList,
		getbrandList,
		getproductList,
		dialogVisible,skuList,skuProductSn,skuKeyWord,skuId
	} = storeToRefs(productStore)
	let {
		add,
		updateStatus,
		changeStatus,
		handleSelectionChange,
		getBrandList,
		getProductList,
		getSku,
		showSku,
		updateSku
	} = productStore
	// 调用pinia中axios方法
	onMounted(() => {
		add()
		getBrandList()
		getProductList()
	})

console.log(getproductList.value)
	const formInline = reactive({
		user: '',
		region: '',
	})

	const multipleTableRef = ref()
	// 级联选择器
	const props ={
		value:'id',
		label:'name',
		children:'children'
	}

	// 定义一个kid存储form.value.productCategoryId
	let kid = ref()
	let onChange=()=>{
		kid.value=form.value.productCategoryId
	}
    // 表单搜索
	let check=()=>{
		// console.log("ss",form.value.productCategoryId)
		form.value.productCategoryId=kid.value
		// console.log(kid.value)
		form.value.productCategoryId = form.value.productCategoryId&&form.value.productCategoryId[form.value.productCategoryId.length-1]
		add()
	}
	
	// 创建查询表单的实例
	let checkForm =ref()
	let resetForm = (formEl)=>{
		if(!formEl) return
		formEl.resetFields()
	}

	const getProductAttribute = (id) => {
		console.log(id)
	}
	
	const  update=(row)=>{
		console.log(row)
	}




	const currentPage4 = ref(4)
	const pageSize4 = ref(100)
	const small = ref(false)
	const background = ref(false)
	const disabled = ref(false)
</script>

<style scoped>
	.el-col {
		border: 1px solid #ccc;
		padding: 20px;
		margin: 20px 0;
	}

	.pms_product {
		padding: 20px;
	}

	.el_col_right {
		float: right;
	}

	.el_col_left {
		float: left;
	}

	.el_col_con {
		float: left;
	}

	.el-form {
		display: flex;
		flex-wrap: wrap;
	}

	.dialog-footer button:first-child {
		margin-right: 10px;
	}
	.el-table .cell{
		text-align: center;
	}
</style>