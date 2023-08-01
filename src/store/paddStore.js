import {
	defineStore
} from 'pinia'
// 组合式API 需要从 vue 引用对应的 API
import {
	computed,
	reactive,
	ref
} from 'vue'

// 导入封装的axios
import axios from "@/axios/index.js"

// 导入使用表格样式
import {
	ElTable,
	ElMessage,
	ElMessageBox
} from 'element-plus'

export const usePaddStore = defineStore("padd", () => {
	let productParam = ref({
		"albumPics": "",
		"brandId": '',
		"brandName": "",
		"deleteStatus": '',
		"description": "",
		"detailDesc": "",
		"detailHtml": "",
		"detailMobileHtml": "",
		"detailTitle": "",
		"feightTemplateId": '',
		"giftGrowth": '',
		"giftPoint": '',
		"id": '',
		"keywords": "",
		"lowStock": '',
		"memberPriceList": [{
			"id": '',
			"memberLevelId": '',
			"memberLevelName": "",
			"memberPrice": '',
			"productId": ''
		}],
		"name": "",
		"newStatus": 0,
		"note": "",
		"originalPrice": '',
		"pic": "",
		"prefrenceAreaProductRelationList": [{
			"id": '',
			"prefrenceAreaId": '',
			"productId": ''
		}],
		"previewStatus": '',
		"price": '',
		"productAttributeCategoryId": '',
		"productAttributeValueList": [{
			"id": '',
			"productAttributeId": '',
			"productId": '',
			"value": ""
		}],
		"productCategoryId": '',
		"productCategoryName": "",
		"productFullReductionList": [{
			"fullPrice": '',
			"id": '',
			"productId": '',
			"reducePrice": ''
		}],
		"productLadderList": [{
			"count": '',
			"discount": '',
			"id": '',
			"price": '',
			"productId": ''
		}],
		"productSn": "",
		"promotionEndTime": "2023-05-10T07:18:12.545Z",
		"promotionPerLimit": '',
		"promotionPrice": '',
		"promotionStartTime": "2023-05-10T07:18:12.545Z",
		"promotionType": '',
		"publishStatus": '',
		"recommandStatus": 0,
		"sale": '',
		"serviceIds": "",
		"skuStockList": [{
			"id": '',
			"lockStock": '',
			"lowStock": '',
			"pic": "",
			"price": '',
			"productId": '',
			"promotionPrice": '',
			"sale": '',
			"skuCode": "",
			"spData": "",
			"stock": ''
		}],
		"sort": '',
		"stock": '',
		"subTitle": "",
		"subjectProductRelationList": [{
			"id": '',
			"productId": '',
			"subjectId": ''
		}],
		"unit": "",
		"usePointLimit": '',
		"verifyStatus": '',
		"weight": ''
	})
	
	return{
		productParam
	}
})