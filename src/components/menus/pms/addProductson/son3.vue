<template>
	<el-form style="padding-left: 55px;">
		<el-form-item label="属性类型:">
			<el-select v-model="cid" class="m-2" placeholder="Select">
				<el-option v-for="item in attrList" :key="item.id" :label="item.name" :value="item.id"
					@click="getAttribute(cid)"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="商品规格:" >
			<div class="attr_box" style="width: 600px;text-align: start;background-color: rgb(248,249,252);">
				<div v-for="cate in cateList" :key="cate.id">
					<p>{{cate.name}}</p>
					<template v-if="cate.inputType==0">
						<div>
							<el-checkbox-group v-model="form[cate.name]">
								<span v-for="(item,index) in form[cate.name+'list']" :key='item'>
									<el-checkbox :label="item">
										{{item}}
										<el-text class="mx-1" type="primary" @click="out(cate.name,index)">删除</el-text>
									</el-checkbox>
								</span>
							</el-checkbox-group>
						</div>
						<el-input v-model="form[cate.name+'input']"></el-input>
						<el-button @click="add(cate.name)">增加</el-button>
					</template>
					<template v-else>
						<el-checkbox-group v-model="form[cate.name]">
							<el-checkbox v-for="item in cate.inputList.split(',')" :key="item"
								:label="item">{{item}}</el-checkbox>
						</el-checkbox-group>
					</template>
				</div>
			</div>
			<el-table :data="skuList" border style="width: 100%;">
				<el-table-column v-for="item in cateList" :property="item.name" :label="item.name" align="center" />
					<el-table-column label="SKU编号" width="100" align="center">
						<template #default="scope">
							<el-input v-model="scope.row.skuCode"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="销售价格" width="100" align="center">
						<template #default="scope">
							<el-input v-model="scope.row.price"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="商品库存" width="100" align="center">
						<template #default="scope">
							<el-input v-model="scope.row.stock"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="库存预警值" width="100" align="center">
						<template #default="scope">
							<el-input v-model="scope.row.lowStock"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="删除" width="100" align="center">
						<template #default="scope">
							<el-text
							class="mx-1"
							type="primary"
							style="margin: 3px 15px;"
							@click="skuList.splice(scope.$index,1)">删除</el-text>
						</template>
					</el-table-column>
				
			</el-table>
			<el-button type="primary" @click="shuaxin">刷新列表</el-button>
		</el-form-item>
		<!-- 相册 -->
		<el-form-item label="商品相册">
		    <el-upload
		    v-model:file-list="fileList"
		    action="上传地址"
		    list-type="picture-card"
		    :on-preview="handlePictureCardPreview"
		    :on-remove="handleRemove"
		    >
		    	<el-icon><Plus /></el-icon>
		    </el-upload>
		
		    <el-dialog v-model="dialogVisible">
		    	<img w-full :src="dialogImageUrl" alt="Preview Image" />
		    </el-dialog>
		</el-form-item>
		<el-form-item label="商品参数:" >
			<div class="attr_box" style="width: 600px;text-align: start;background-color: rgb(248,249,252);">
				<div v-for="param in paramList" :key="param.id">
					<span style="width: 50px; display: inline-block; text-align: right;"></span>
					<template v-if="param.inputType==0">
						<el-input v-model="form[param.name]" style="width: 250px;"></el-input>
					</template>
					<template v-else>
						<el-select v-model="form[param.name]" class="m-2" placeholder="11">
							<el-option v-for="item in param.inputList.split(',')" :key="item" :label="item"
								:value="item"></el-option>
						</el-select>
					</template>
				</div>
			</div>
		</el-form-item>
		<div style="border: 1px solid #ccc;width:600px;margin: 20px auto;">
			<!-- 工具栏 -->
			<Toolbar
			  style="border-bottom: 1px solid #ccc"
			  :editor="editorRef"
			  :defaultConfig="toolbarConfig"
			  :mode="mode"
			/>
			<!-- 编辑器 -->
			<Editor
			  style="height: 300px; overflow-y: hidden;"
			  v-model="valueHtml"
			  :defaultConfig="editorConfig"
			  :mode="mode"
			  @onCreated="handleCreated"       
	
			/>
		</div>
		<el-form-item>
			<el-button @click="onLast">上一步，填写商品信息</el-button>
			<el-button type="primary" @click="onNext">下一步，填写商品属性</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup>
	import '@wangeditor/editor/dist/css/style.css' // 引入 css
	import { onBeforeUnmount, ref, shallowRef,onMounted} from 'vue'
	import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
	// 导入封装的axios
	import axios from "@/axios/index.js"
	import {ElMessage} from "element-plus";
	// 存储属性类型的ID
	let cid = ref('')
	// 存储属性类型的数据，用来渲染
	let attrList = ref([])
	let getAttrList = () => {
		axios({
			url: "/productAttribute/category/list",
			params: {
				pageNum: 1,
				pageSize: 100
			}
		}).then(res => {
			attrList.value = res.data.list
			// console.log(attrList.value)
		})
	}

	onMounted(() => {
		getAttrList()
	})
	// 定义专门用来存储临时键值的对象
	let form = ref({})
	// 添加
	let add = (a) => {
		if (form.value[a + 'input']) {
			if (form.value[a + 'list'].includes(form.value[a + 'input'])) {
				ElMessage({
					message: '值不能重复',
					type: 'waring'
				})
			} else {
				form.value[a + 'list'].push(form.value[a + 'input'])
				form.value[a + 'input'] = ""
			}
		} else {
			ElMessage({
				message: '值不能为空',
				type: "waring"
			})
		}
	}
	// 删除
	let out = (a, xb) => {
		form.value[a].forEach((item, index) => {
			if (form.value[a + 'list'][xb] == form.value[a][xb]) {
				form.value[a].splice(xb, 1)
			}
		})
		form.value[a + 'list'].splice(xb, 1)
	}
	// 存储商品规格
	let cateList = ref([])
	// 存储商品参数
	let paramList = ref([])
	let getAttribute = (cid) => {
		axios({
			url: `productAttribute/list/${cid}`,
			params: {
				pageNum: 1,
				pageSize: 100,
				type: 0
			}
		}).then(res => {
			cateList.value = res.data.list
			// console.log(cateList.value)
			// 通过数据的名字来定义键值
			cateList.value.forEach(item => {
				// console.log(form.value)
				if (item.inputType == 0) {
					form.value[item.name + 'list'] = []
					form.value[item.name + 'input'] = ""
					form.value[item.name] = []
				} else {
					form.value[item.name] = []
				}
			})
		})
		// 商品参数
		axios({
			url: `productAttribute/list/${cid}`,
			params: {
				pageNum: 1,
				pageSize: 100,
				type: 1
			}
		}).then(res => {
			paramList.value = res.data.list
			// console.log(paramList.value)
		})
	}
	
	let skuList = ref([])
	let shuaxin = () => {
		console.log(11)
		// 加键值的    
		let option = []
		// 合并键值    
		let list = []
		// 遍历属性类型    
		cateList.value.forEach(item => {
			// console.log(form.value[item.name])
			// 当前遍历到的属性有勾选内容才把list清空
			if (form.value[item.name].length) {
				list = []
			}
			// 遍历每个属性所勾选的内容数组
			form.value[item.name].forEach(item2 => {
				// console.log(item.name,item2,option)
				// 遍历每个属性所勾选的内容数组   
				if (option.length == 0) {
					list.push({
						[item.name]: item2
					})
				} else {
					// 两个对象的合并           
					// {容量:16,颜色:hong}  <---{颜色:hong}                
					option.forEach(item3 => {
						console.log(item3)
						list.push(Object.assign(JSON.parse(JSON.stringify(item3)), {
							[item.name]: item2
						}))
					})
				}
			})
			option=list
		})
		option.forEach(item => {
			// Object.assign(a,b) 把对象b的元素合并到对象a中      
			// 合并sku的原有属性与option中新的属性对象     
			Object.assign(item, {
				skuCode: "",
				price: "",
				stock: "",
				lowStock: ""
			})
		})
		console.log('最后的option-------', option)
		skuList.value = option
	}

	// 图片上传
	const fileList = ref([])
	const dialogImageUrl = ref('')
	const dialogVisible = ref(false)
	
	const handleRemove = (uploadFile, uploadFiles) => {
	  console.log('////////////////',uploadFile, uploadFiles)
	}
	//图片回显
	const handlePictureCardPreview = (uploadFile) => {
	  dialogImageUrl.value = uploadFile.url
	  dialogVisible.value = true
	}
	 // 编辑器实例，必须用 shallowRef
	 const editorRef = shallowRef()
	
	 const mode = ref('default')
	
	// 内容 HTML
	const valueHtml = ref('<p>hello</p>')
	
	// 配置工具栏
	const toolbarConfig = {}
	
	// 配置编辑器
	const editorConfig = { placeholder: '请输入内容...' }
	
	// 组件销毁时，也及时销毁编辑器
	onBeforeUnmount(() => {
	    const editor = editorRef.value
	    if (editor == null) return
	    editor.destroy()
	})
	
	// 编辑器创建钩子
	// 获取富文本编辑器实例
	const handleCreated = (editor) => {
	  editorRef.value = editor // 记录 editor 实例，重要！
	}
	// 定义子传父的事件
	let emit = defineEmits(["next"]);
	const onLast = () => {
		emit("next", 1);
	}
	const onNext = () => {
		emit("next", 3);
	}
</script>

<style>
</style>