import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "../components/Login.vue"
import Home from "../components/Home.vue"
import Error from "../components/Error.vue"
import Content from "../components/menus/Content.vue"
// 商品
import Product from "../components/menus/pms/Product.vue"
import addProduct from "../components/menus/pms/addProduct.vue"
import ProductCate from "../components/menus/pms/productCate.vue"
import addProductCate from "../components/menus/pms/addproductCate.vue"

import ProductAttr from "../components/menus/pms/productAttr.vue"
import brands from "../components/menus/pms/brand.vue"
// 订单
import Order from "../components/menus/oms/Order.vue"
import orderSetting from "../components/menus/oms/orderSetting.vue"
import returnApply from "../components/menus/oms/returnApply.vue"
import returnReason from "../components/menus/oms/returnReason.vue"
// 营销
import advertise from "../components/menus/sms/advertise.vue"
import Brand from "../components/menus/sms/brand.vue"
import coupon from "../components/menus/sms/coupon.vue"
import flash from "../components/menus/sms/flash.vue"
import hot from "../components/menus/sms/hot.vue"
import New from "../components/menus/sms/new.vue"
import subject from "../components/menus/sms/subject.vue"
const routes = [
	{path:"/",redirect:"/login",meta:{zt:false},},
	{path: '/login',name: 'login',component: Login,meta:{zt:false},},
	// 先加载Home组件，并且在其中渲染Content组件作为Home组件的子组件。
	{path: '/',name: 'home',component: Home,meta:{zt:false},
		children:[
			{path: 'home',name: 'home',component: Content},
		]
	},
	// 商品
	{path:'/pms',name:"pms",component:Home,meta:{zt:true,name:"商品",svg:"product"},redirect:"/pms/product",
		children:[
			{path: 'product',name: 'product',component: Product,meta:{name:'商品列表',svg:"product-list"}},
			{path: 'addProduct',name: 'addProduct',component: addProduct,meta:{name:'添加商品',svg:"product-add"}},
			{path: 'productCate',name: 'productCate',component: ProductCate,meta:{name:'商品分类',svg:"product-cate"}},
			{path: 'productAttr',name: 'productAttr',component: ProductAttr,meta:{name:'商品类型',svg:"product-attr"}},
			{path: 'brands',		name: 'brands',component: brands,meta:{name:'品牌管理',svg:"product-brand"}},
			{path: 'addProductCate',name: 'addProductCate',component: addProductCate,meta:{name:'添加商品分类'}},
		]
	},
	// 订单
	{path:'/oms',name:"oms",component:Home,meta:{zt:true,name:"订单",svg:"order"},redirect:"/oms/order",
		children:[
			{path:"order",name:"order",component:Order,meta:{name:"订单列表",svg:"product-list"}},
			{path:"orderSetting",name:"orderSetting",component:orderSetting,meta:{name:"订单设置",svg:"order-setting"}},
			{path:"returnApply",name:"returnApply",component:returnApply,meta:{name:"退货申请处理",svg:"order-return"}},
			{path:"returnReason",name:"returnReason",component:returnReason,meta:{name:"退货原因设置",svg:"order-return-reason"}},
		]
	},
	// 营销
	{path:'/sms',name:"sms",component:Home,meta:{zt:true,name:"营销",svg:"sms"},redirect:"/sms/flash",
		children:[
			{path:"flash",name:"flash",component:flash,meta:{name:"秒杀活动列表",svg:"sms-flash"}},
			{path:"coupon",name:"coupon",component:coupon,meta:{name:"优惠卷列表",svg:"total-today"}},
			{path:"brand",name:"brand",component:Brand,meta:{name:"品牌推荐",svg:"product-brand"}},
			{path:"new",name:"new",component:New,meta:{name:"新品推荐",svg:"sms-new"}},
			{path:"hot",name:"hot",component:hot,meta:{name:"人气推荐",svg:"sms-hot"}},
			{path:"subject",name:"subject",component:subject,meta:{name:"专题推荐",svg:"sms-subject"}},
			{path:"advertise",name:"advertise",component:advertise,meta:{name:"广告列表",svg:"sms-ad"}},
		]
	},
	
	// 路由捕获 当跳转链接没有注册是跳转
	{path: '/:pathMath(.*)',name: 'error',component: Error},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
	// 如果需要在全局守卫中判断路由是否存在，需要使用router.hasRoute(to.name)而不是router.hasRoute(to.path) 因为to.name返回的是路径名而to.path返回的是"/路径名" 因此括号内需要填入to.name
  // console.log(router.hasRoute(to.name));
  // 如果跳转的不是登录，则需要验证是否存在token
  if (to.name!=="login") {
    const token =localStorage.getItem("token")
	// console.log(to.name)
	// 如果token存在则直接跳转，否则返回登陆页面
    if (token) {
      next()
    }else{
      next("/login")
    }
  }else{
    next(); 
  }
})



export default router
