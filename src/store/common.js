/*
	公共模块
*/
import request from "@/api/request.js";
import requestPath from "@/api/path.js";
import {
	showToast
} from "@/utils/tools.js";


export default {
	namespaced: true,
	state: {
		qiniuData: {}
	},
	mutations: {
		// 更新七牛云数据
		updateQIniuData(state, data) {
			state.qiniuData = data
		}
	},
	actions: {
		// 获取七牛授权token
		getAccessToken({
			commit
		}) {
			request(requestPath.getAccessToken, 'GET', {}).then(res => {
				if (res.code == 0) {
					commit('updateQIniuData', res.data)
				} else {
					showToast(res.msg)
				}
			})
		}
	},
};
