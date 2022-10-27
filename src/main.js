import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import request from "@/api/request.js"
import reuqestPath from "@/api/path.js"
import {
	Check,
	isNull
} from "@/utils/check.js"
import navigateBack from "@/utils/navigateBack.js"

import layer from "@/components/layer/layer.vue"
import CustomButton from "@/components/customButton/index.vue"
import CustomSkeleton from "@/components/customSkeleton/customSkeleton.vue"
import CustomTabs from "@/components/customTabs/index.vue"
import CustomImageBox from "@/components/customImageBox/index.vue"

//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.use(uView);

Vue.config.productionTip = false
// 判断字符串是否非空
Vue.prototype.isNull = isNull
// 数据校验
Vue.prototype.$Check = Check

Vue.prototype.$request = request
Vue.prototype.$requestPath = reuqestPath
// 页面返回方法
Vue.prototype.$navigateBack = navigateBack

Vue.component('CustomButton', CustomButton)
Vue.component('CustomSkeleton', CustomSkeleton)
Vue.component("layer", layer)
Vue.component('CustomTabs', CustomTabs)
Vue.component('CustomImageBox', CustomImageBox)

App.mpType = 'app'
uni.$u.config.unit = 'rpx'
const app = new Vue({
	...App
})
app.$mount()
