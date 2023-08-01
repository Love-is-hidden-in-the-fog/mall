<template>
	<el-form ref="ruleFormRef" :model="productParam" :rules="rules" label-width="120px" class="demo-ruleForm"
		:size="formSize" status-icon>
		<el-form-item label="商品分类" prop="productCategoryId">
			<el-cascader :props="{value:'id',label:'name',children:'children'}" :options="getproductList" v-model="productParam.productCategoryId"  placeholder="请选择" clearable @change="onChange(productParam.productCategoryId)" ></el-cascader>
		</el-form-item>
		<el-form-item label="商品名称" prop="name">
			<el-input v-model="productParam.name" placeholder="请选择"/>
		</el-form-item>
		<el-form-item label="副标题" prop="subTitle">
			<el-input v-model="productParam.subTitle" placeholder="请选择" />
		</el-form-item>
		<el-form-item label="商品品牌" prop="brandId">
			<el-select v-model="productParam.brandId" placeholder="请选择品牌">
				<el-option v-for="(item,index) in getbrandList" :key="item.id" :label=item.name
					:value="item.id" @click="onClick(item.name)" />
			</el-select>
		</el-form-item>
		<el-form-item label="商品介绍" prop="description" style="width: 730px;">
			<el-input v-model="productParam.description" type="textarea" />
		</el-form-item>
		<el-form-item label="商品售价" prop="price">
			<el-input v-model="productParam.price"  />
		</el-form-item>
		<el-form-item label="市场价" prop="originalPrice">
			<el-input v-model="productParam.originalPrice"  />
		</el-form-item>
		<el-form-item label="商品库存" prop="stock">
			<el-input v-model="productParam.stock"  />
		</el-form-item>
		<el-form-item label="计量单位" prop="weight">
			<el-input v-model="productParam.weight"  />
		</el-form-item>
		<el-form-item label="商品重量" prop="unit">
			<el-input v-model="productParam.unit" style="width: 30%; margin-right: 20px;" />克
		</el-form-item>
		<el-form-item label="排序" prop="sort">
			<el-input v-model="productParam.sort"  />
		</el-form-item>
		
		<el-form-item>
			<el-button type="primary" @click="submitForm(ruleFormRef)">
				下一步，填写商品促销
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup>
	import {	reactive,	ref,defineProps,onMounted} from 'vue'
	// 页面导入新的pinia
	import {usePaddStore} from "@/store/paddStore.js"
	import {storeToRefs} from 'pinia'


	const paddStore =usePaddStore()
	const {productParam} = storeToRefs(paddStore)
	
	import {useProductStore} from '@/store/index.js'
	const productStore =useProductStore()
	const {getproductList,getbrandList}=storeToRefs(productStore)
	let {getBrandList,getProductList} =productStore
	onMounted(() => {
		getBrandList()
		getProductList()
	})

	const formSize = ref('default')
	const ruleFormRef = ref()
	const ruleForm = reactive({
		productCategoryId:'',
		name:'',
		subTitle:'',
		brandId:''
	})

	const rules = reactive({
		productCategoryId: [{
			required: true,
			message: '请选择商品分类',
			trigger: 'change',
		}, ],
		name: [{
				required: true,
				message: '请输入商品名称',
				trigger: 'blur'
			},
			{
				min: 2,
				max: 14,
				message: '长度在2到140个字符',
				trigger: 'blur'
			},
		],
		subTitle: [{
			required: true,
			message: '请输入商品副标题',
			trigger: 'blur'
		}, ],
		brandId: [{
			required: true,
			message: '请选择商品品牌',
			trigger: 'change',
		}, ],
	})

	// 定义子传父的事件
	let emit = defineEmits(["next"]);
	// let props =defineProps(["next"])
	const submitForm = async (formEl) => {
		if (!formEl) return
		await formEl.validate((valid, fields) => {
			if (valid) {
				// console.log('submit!')
				// props.next(1)
				emit("next", 1);
			} else {
				console.log('error submit!', fields)
			}
		})
	}

	const resetForm = (formEl) => {
		if (!formEl) return
		formEl.resetFields()
	}
	
	// 标签内双向绑定的是id，在操作时需要获取到具体的name 因此需要通过如下方法获取name
	// 商品分类的名字获取
	let name =ref([])
	let onChange =(val)=>{
		getproductList.value.forEach(item=>{
			if(item.id==val[0]){
				name.value=item.children.filter(item1=>{
					return item1.id==val[1]
				})
			}
		})
		productParam.value.productCategoryName=name.value[0].name
		productParam.value.productCategoryId=name.value[0].id
		// console.log(name.value[0].id)
		// console.log(productParam.value.productCategoryId)
	}
	// 商品品牌的名字获取
	let onClick =(name)=>{
		productParam.value.brandName=name
		// console.log(productParam.value.brandName)
	}
</script>