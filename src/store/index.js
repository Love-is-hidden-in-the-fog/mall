import {defineStore} from 'pinia'
// 组合式API 需要从 vue 引用对应的 API
import {computed, reactive, ref} from 'vue'

// 导入封装的axios
import axios from "@/axios/index.js"

// 导入使用表格样式
	import { ElTable,ElMessage, ElMessageBox } from 'element-plus'
// 跟 vue3 的使用习惯一样
const useUserStore = defineStore('user',()=>{
    // 相当于 option store 中的 state
    let isCollapse = ref(false)
    return {isCollapse}
})

const useProductStore = defineStore("product",()=>{
	let cateList =reactive([])
	let brandList =reactive([])
	let form = ref({
		brandId:'',
		keyword:'',
		pageNum:1,
		pageSize:5,
		productCategoryId:'',
		productSn:'',
		publishStatus:'',
		verifyStatus:''
	})
	
	// 去除没有携带参数的键值得到一个新的对象
	let fun = computed(()=>{
		let newform =JSON.parse(JSON.stringify(form.value))
		for(let key in newform){
			if(newform[key]==""){
				delete newform[key]
			}
		}
		return newform
	})
	// 分页的条数
	let aa =ref({
		total:0
	})
	
	let tableData =ref([])
	// 通过自定义axios获取数据
	let add =()=>{
		axios({
			url:"/product/list",
			params:fun.value
			})
			.then(res=>{
				// 获取列表
				tableData.value=res.data.list
				// 获取总数目
				aa.value.total=res.data.total
			})
	}
	// 修改标签的状态
	let updateStatus = (id,Status,name) => {
		        axios({
					url:`/product/update/${name}`,
					method:"POST",
					params:{
						ids:id,
						[`${name}`]:Status,
					}
				}).then(res=>{
					if(res.code==200){	
		          // res.data 是服务器返回的数据
					ElMessage({message:'修改成功',type:'success'})
					console.log(name)
					}
		        }).catch(err=>{
					ElMessage.error('修改失败')
				})
	}
	
	let ids =ref([])
	// 收集勾选的ID
	let handleSelectionChange =(val)=>{
		let id=[]
		val.forEach(item=>{
			id.push(item.id)
		})
		ids.value=id.join()
	// console.log(ids.value)
	}
	// 批量操作
	// 选择器的收集容器
	let batchValue =ref()
	// 给选择器循环用的
	let batchList =ref([
		{label:"商品上架",value:1,status:'publishStatus'},
		{label:"商品下架",value:0,status:'publishStatus'},
		{label:"设为推荐",value:1,status:'recommendStatus'},
		{label:"取消推荐",value:0,status:'recommendStatus'},
		{label:"设为新品",value:1,status:'newStatus'},
		{label:"取消新品",value:0,status:'newStatus'},
	])
	let changeStatus =(bv)=>{
		if(ids.value==""){
			ElMessage({message:'请选择操作类型',type:'warning'})
		}else{
			ElMessageBox.confirm(
			'是否要进行该批量操作？',
			'提示',
			{confirmButtonText:'确定',cancelButtonText:'取消',type:'warning'})
			.then(()=>{
				// console.log(batchValue.value)
				// batchValue=JSON.parse(batchValue.value)
				// console.log(batchValue)
				updateStatus(ids.value,batchList.value[bv].value,batchList.value[bv].status)
			})
			.catch(()=>{
				// 取消执行的方法
			})
		}
	}
	
	
	// 获取全部品牌列表
	let getbrandList=ref([])
	let getBrandList =()=>{
		axios({
			url:"/brand/listAll"
		}).then(res=>{
			getbrandList.value=res.data
			// console.log(getbrandList.value)
		})
	}
	// 查询所有一级商品分类及子分类
	let getproductList =ref([])
	let getProductList =()=>{
		axios("/productCategory/list/withChildren").then(res=>{
			getproductList.value=res.data
			// 没有二级路由的添加属性disable为true让数据不可被选中
			getproductList.value.forEach(item=>{
				if(item.children.length==0){
					item.disabled=true
				}
			})
		})
	}

	// sku弹窗开关 
	const dialogVisible = ref(false)
	let skuProductSn =ref("string")
	let skuKeyWord=ref("")
	let skuId =ref()
	let showSku=(row)=>{
		dialogVisible.value=true
		skuProductSn.value=row.productSn
		skuKeyWord.value=""
		skuId.value=row.id
		getSku(skuId.value)
		console.log(row)
	}
	// sku编辑数据
	let skuList =ref([])
	let getSku =(pid,keyword)=>{
		axios({
			url:"sku/"+pid,
			params:{
				keyword
			}
		}).then(res=>{
			skuList.value=res.data
		})
	}
	// 修改sku数据
	let updateSku=(pid)=>{
		console.log(pid)
		ElMessageBox.confirm(
		 '是否进行修改？',
		 '提示',
		 {
			 confirmButtonText:"确定",
			 cancelButtonText:"取消",
			 type:'warning'
		 }
		).then(()=>{
			axios({
				url:"sku/update/"+pid,
				method:"POST",
				data:skuList.value
			}).then(res=>{
				if(res.code==200){
					ElMessage({message:"修改成功",type:'success'})
					dialogVisible = false
				}
			})
		})
	}
	
	
	return { cateList,brandList,
	form,add,tableData,
	updateStatus,handleSelectionChange,
	batchValue,batchList,changeStatus,aa,
	getBrandList,getbrandList,
	getProductList,getproductList,
	// 弹窗开关数据
	dialogVisible,skuList,getSku,showSku,updateSku,skuKeyWord,skuProductSn,skuId
	}
})
export  {useUserStore,useProductStore}

