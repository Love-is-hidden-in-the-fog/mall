import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

// 引用 pinia
import { createPinia } from 'pinia'
// 引入echart文件
import echarts from "../echarts.js"

const app =createApp(App)
app.config.globalProperties.$echarts = echarts


// 配置svg
import './icons/index.js'
import SvgIcon from './components/SvgIcon/index.vue'



// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' 

// 从 @element-plus/icons-vue 中导入所有图标并进行全局注册。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 创建 pinia 实例
const pinia = createPinia()
app.use(router).use(pinia).use(ElementPlus).component('svg-icon', SvgIcon).mount('#app')

