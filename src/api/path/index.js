/*
	用户模块相关接口
*/
export const route = {
	// 获取浏览量排行
	getRank: "/rank/obtain",
	// 获取单页面的文章
	getSingleArticle: "/article/obtain",
	// 搜索文章
	search: "/article/search",
	// 获取文章详情
	getArticleDetail: "/article/get",
	// 发布更新文章
	publishArticle: "/article/published",
	// 根据分类获取文章
	categoryArticle: "/article/category",
	// 获取分类
	getCategory: "/category/get",

	// 添加模块
	addModel: "/model/add",
	// 获取模块
	getModel: "/model/get",
	// 获取模块详情
	getModelList: "/model/list",
	// 模块操作
	updateModel: "/model/update/model",
	// 模块子项操作
	updateModelList: "/model/update/list",

	// 登录
	login: "/user/login",
	// 更新token
	refreshToken: "/user/time/refresh",
	// 获取博主个人信息
	getBloggerProfile: "/find/file",
	// 修改用户信息
	modifyProfile: "/modify/file",
	// 修改账号密码
	modifyPassword: "/modify/password",
	// 记录访客记录
	visitorsToRecord: "/access/record",
	// 获取访客记录（详情）
	getVisitorsRecordDetail: "/access/obtain",
	// 获取访客记录（总量）
	getVisitorsRecord: "/access/count/obtain",
}
