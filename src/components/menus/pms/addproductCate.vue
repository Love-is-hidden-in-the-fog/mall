<template>
	<div class="biaodan">
		<el-form :model="data" label-width="130px" :rules="rules" ref="checkForm">
			<el-form-item label="分类名称:" prop="name">
				<el-input v-model="data.name" />
			</el-form-item>
			<el-form-item label="上级分类:" prop="ss">
				<el-select v-model="parentId"  placeholder="无上级分类" @change="parentIdChange(parentId)">
					<el-option label="无上级分类" value="无上级分类" ></el-option>
					<el-option v-for="item in form " :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
			</el-form-item>
			<el-form-item label="数量单位:" prop="productUnit">
				<el-input v-model="data.productUnit" />
			</el-form-item>
			<el-form-item label="排序:" prop="sort">
				<el-input v-model="data.sort" />
			</el-form-item>
			<el-form-item label="是否显示:" prop="showStatus">
				<el-radio-group v-model="showStatus" @change="statusvalue(0)">
					<el-radio  label="1" >是</el-radio>
					<el-radio  label="0" >否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="是否显示在导航栏:"  prop="navStatus" >
				<el-radio-group v-model="navStatus"  @change="statusvalue(1)" >
					<el-radio  label="1" >是</el-radio>
					<el-radio  label="0" >否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="分类图标:">
				  <el-upload
					class="upload-demo"
					action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
					:auto-upload="false"
				  >
					<template #trigger>
					  <el-button type="primary">点击上传</el-button>
					</template>
					<template #tip>
					  <div class="el-upload__tip">
						只能上传jpg/png文件，且不超过10MB
					  </div>
					</template>
				  </el-upload>
			</el-form-item>
			<el-form-item label="筛选属性:">
				<div v-for="item in num" :key ="item"  style="margin-bottom: 10px;">
					<el-cascader  v-model="cc[item]" :props="{value:'id',label:'name',children:'productAttributeList'}" :options="shaixuan" placeholder="请选择" clearable ></el-cascader>
					<el-button @click="reduce(item)" style="margin: 0 230px 0 10px;">删除</el-button>
				</div>
				<el-button type="primary" @click ="addnum()">新增</el-button>
			</el-form-item>
			<el-form-item label="关键词:" prop="keywords">
				<el-input v-model="data.keywords" />
			</el-form-item>
			<el-form-item label="分类描述:" prop="description">
				<el-input v-model="data.description" type="textarea" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">提交</el-button>
				<el-button @click="reset(checkForm)">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
	import {
		ref,onMounted,reactive,computed
	} from 'vue'
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'
import axios from '@/axios/index.js'

	const rules = reactive({
		name: [{
				required: true,
				message: '请输入品牌名字',
				trigger: 'blur'
			},
			{
				min: 2,
				max: 140,
				message: '长度在2到140个字符',
				trigger: 'blur'
			},
		]
	})
	
	// 保存全部数据
	let data = ref({
		description: '',
		icon:"",
		keywords:"",
		name:"",
		navStatus:0,
		parentId:0,
		productAttributeIdList:[],
		productUnit:"",
		showStatus:0, 
		sort:0,
	})
	let showStatus=ref('1') 
	let navStatus=ref('1') 
	let parentId =ref('')
	let parentIdChange=(val)=>{
		if(val=="无上级分类"){
			data.value.parentId=0
		// console.log(data.value.parentId)
		}else{
			data.value.parentId=val
			// console.log(data.value.parentId)
		}
	}
	let statusvalue=(val)=>{
		if(val==1){
			data.value.navStatus= parseInt(navStatus.value)
			// console.log(data.value.navStatus)
		}else{
			data.value.showStatus= parseInt(showStatus.value)
			// console.log(data.value.showStatus)
		}
		// ty
	}
	// 保存上级分类的数据
	let form=ref([])
	// 筛选属性数据
	let shaixuan=ref([])
	let list = ()=>{
		axios({
			url:"/productCategory/list/0",
			params:{
					pageNum:1,
					pageSize:100,
					}
		}).then(res=>{
			form.value=res.data.list
			// console.log(form.value) 
		})
		axios({
			url:"/productAttribute/category/list/withAttr",
			
		}).then(res=>{
			shaixuan.value=res.data
			shaixuan.value.forEach(item=>{
				if(item.productAttributeList.length==0){
					item.disabled=true
				}
			})
		})
	}
	onMounted(()=>{
		list()
	})
	
	// 筛选属性的选择框个数
	let num = ref(1)
	let cc = ref([])
	let addnum =()=>{
		// console.log(num.value)
		if(num.value>=3){
			  ElMessage({
			    showClose: true,
			    message: '最多添加三个',
			    type: 'warning',
			  })
		}else{
			num.value++
		}
	}
	let reduce=(index)=>{
		if(num.value==1){
			ElMessage({
			  showClose: true,
			  message: '最少有一个',
			  type: 'warning',
			})
		}else{
			cc.value.splice(index,1)
			num.value--	
		}
	}
/* 	let onchange =(val)=>{
		data.value.productAttributeIdList=[]
		cc.value.forEach((item,index)=>{
			if(index!==0){
				// console.log(item[1])
				// 将值赋给data的productAttributeIdList
				data.value.productAttributeIdList.push(item[1])
			}
		})
	} */
	let onSubmit =()=>{
		// 页面提交时再将筛选属性获取，不需要每次改变都要发送一次请求获取
		data.value.productAttributeIdList=[]
		cc.value.forEach((item,index)=>{
			if(index!==0){
				// console.log(item[1])
				// 将值赋给data的productAttributeIdList
				data.value.productAttributeIdList.push(item[1])
			}
		})
		ElMessageBox.confirm(
				'是否要提交数据?',
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				axios({
					url:"/productCategory/create",
					method:"POST",
					data:data.value
				}).then(res=>{
					console.log('submit')
				})	
			})
	}
	let checkForm =ref()
	let reset = (formEl)=>{
		if(!formEl) return
		formEl.resetFields()
		num.value=1
		cc.value =[]
		parentId.value=""
		
	}
</script>
<style scoped>
	.biaodan{
		width: 800px;
		margin: 20px auto;
		padding: 35px 55px 15px;
		box-sizing: border-box;
		border: 1px solid #ebeef5;
	}
	.el-input{
		height: 45px;
	}
	.el-form-item__label{
		line-height: 45px;
	}
	/deep/.el-upload {
		margin-right: 113px;
	}
</style>