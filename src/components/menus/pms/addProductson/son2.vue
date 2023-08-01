<template>
  <el-form :model="productParam" label-width="120px" >
    <el-form-item label="赠送积分:" prop="giftPoint">
      <el-input v-model="productParam.giftPoint" />
    </el-form-item>
    <el-form-item label="赠送成长值:" prop="giftGrowth">
      <el-input v-model="productParam.giftGrowth" />
    </el-form-item>
    <el-form-item label="积分购买限制: " prop="usePointLimit">
      <el-input v-model="productParam.usePointLimit" />
    </el-form-item>
    <el-form-item label="预告商品:" prop="previewStatus">
      <el-switch v-model="productParam.previewStatus" :active-value="1" :inactive-value="0" />
    </el-form-item>
    <el-form-item label="商品上架:" prop="publishStatus">
      <el-switch v-model="productParam.publishStatus" :active-value="1" :inactive-value="0"  />
    </el-form-item>
    <el-form-item label="商品推荐:" prop="recommandStatus">
      <el-switch v-model="productParam.newStatus" active-text="新品" style="width: 90px; justify-content: space-between;" active-value="1" inactive-value="0"/>
      <el-switch v-model="productParam.recommandStatus" active-text="推荐" style="width: 90px; justify-content: space-between;" active-value="1" inactive-value="0"/>
    </el-form-item>
    <el-form-item label="服务保证" prop="serviceIds" @change="fw()" >
      <el-checkbox-group v-model="serList">
        <el-checkbox label="无忧退货"  />
        <el-checkbox label="快速退款"  />
        <el-checkbox label="免费包邮"  />
      </el-checkbox-group>
    </el-form-item>
	<el-form-item label="详细页标题:" prop="detailTitle">
	  <el-input v-model="productParam.detailTitle" />
	</el-form-item>
	<el-form-item label="详细页描述:" prop="detailDesc">
	  <el-input v-model="productParam.detailDesc" />
	</el-form-item>
	<el-form-item label="商品关键字:" prop="keywords">
	  <el-input v-model="productParam.keywords" />
	</el-form-item>
    <el-form-item label="商品备注:" prop="note">
      <el-input v-model="productParam.note" type="textarea" />
    </el-form-item>
	<el-form-item label="选择优惠方式" prop="no">
	    <el-radio-group v-model="labelPosition" label="label position">
	      <el-radio-button label="none">无优惠</el-radio-button>
	      <el-radio-button label="tehui">特惠促销</el-radio-button>
	      <el-radio-button label="huiyuan">会员价格</el-radio-button>
	      <el-radio-button label="jieti">阶梯价格</el-radio-button>
	      <el-radio-button label="manjian">满减价格</el-radio-button>
	    </el-radio-group>
	</el-form-item>
	<el-form-item v-if="labelPosition=='tehui'"  >
		<div style="text-align: start; margin-right: 100px;">
			<span>开始时间：</span>
			<el-col :span="11" style="display: inline-block;">
					<el-date-picker
					v-model="productParam.promotionStartTime"
					type="datetime"
					placeholder="选择开始时间"
					style="width: 220px"
					/>
			</el-col>
		</div>
		<div style="text-align: start; margin: 8px 100px 8px 0;">
			<span>结束时间：</span>
			<el-col :span="11" style="display: inline-block;">
					<el-date-picker
					v-model="productParam.promotionEndTime"
					  type="datetime"
					  placeholder="选择结束时间"
					  style="width: 220px"
					/>
			</el-col>
		</div>
		<div style="text-align: start; margin-right: 100px;" >
			<span>促销价格：</span>
			<el-input v-model="productParam.promotionPrice" placeholder="请输入促销价格" style="display: inline-block; width: 220px;"  />
		</div>
	</el-form-item>
	<el-form-item v-if="labelPosition=='huiyuan'" >
	  <div >
		  <span>黄金会员：</span>
		  <el-input style="display: inline-block; width: 220px;margin-right: 100px;" v-model="productParam.memberPriceList[0].memberPrice"  />
	  </div>
	  <div style="margin: 10px 220px 10px 0 ;">
		  <span>白金会员：</span>
		  <el-input style="display: inline-block; width: 220px; " v-model="productParam.memberPriceList[1].memberPrice"  />
	  </div>
	  <div>
		  <span>钻石会员：</span>
		  <el-input style="display: inline-block; width: 220px;margin-right: 100px;" v-model="productParam.memberPriceList[2].memberPrice"  />
	  </div>
	</el-form-item>
    <el-form-item>
      <el-button @click="onLast">上一步，填写商品信息</el-button>
      <el-button type="primary" @click="onNext">下一步，填写商品属性</el-button>
    </el-form-item>
  </el-form>
</template>

<script  setup>
import { reactive,ref } from 'vue'
	// 页面导入新的pinia
	import {usePaddStore} from "@/store/paddStore.js"
	import {storeToRefs} from 'pinia'


	const paddStore =usePaddStore()
	const {productParam} = storeToRefs(paddStore)
	let labelPosition =ref("none")
	
	let serList =ref([])
	let fw =()=>{
		productParam.serviceIds=serList.value.join(",")
	}
	// 定义子传父的事件
	let emit = defineEmits(["next"]);
	const onLast = () => {
	  // console.log('submit!')
	  emit("next", 0);
	}
	const onNext = () => {
	  // console.log('submit!')
	  emit("next", 2);
	}
</script>
<style scoped>
	.el-switch{
		flex-direction: row-reverse;
	}

	.el-switch .el-switch__label--right {
	    margin: 0 10px !important; 
	}
	.el-switch__label{
		 margin: 0 10px ; 
	}
	/* 添加样式穿透才能使得子级样式生效 */
	.el-input /deep/ .el-input__wrapper{
		width: 91%;
	}
</style>