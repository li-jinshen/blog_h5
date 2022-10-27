# uniapp_framework
> uni-app项目模板
> uview2.0 +  tailwind.css

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 安装 TailwindCSS

```bash
yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 postcss-class-rename@^1 postcss-remove-selectors@^2 postcss-scss@^3
npx tailwindcss init -p
```
#### 引入taiwindcss、
>在src 目录新建 style 文件夹并创建tailwind.css
>在tailwind.css 中写入

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
#### 在app.vue里引入taiwindcss 
```css
@import "@/style/tailwind.css";
```
#### 关于postccs.config.js 和tailwind.config.js的配置请查看本项目中的代码

### 安装uview-ui 2.0
#### NPM安装方式配置  
[NPM安装方式配置 ](https://www.uviewui.com/components/npmSetting.html#_5-cli)
####  出现SassError: Undefined variable
>在项目根目录的uni.scss中引入此文件时。

>先引用一下颜色文件

>@import "uview-ui/theme.scss";

>@import "uview-ui/index.scss";

### node版本
> node/16.16.0

### 富文本编辑器
> 如果项目中没有使用富文本编辑器的需求，可以移除

> 组件 components/coustomEditor

> 页面 pages/editor/editorPage.vue

> 图片 static/edit_icon

> 使用方式：查看组件下的README.md 文件

> 使用/pages/editor/editorPage中图片上传请先配置好 store/common.js中获取七牛云accessToken的方法（修改请求路径）

### 聊天页模板 
> 如果项目中没有聊天的需求，可以移除

> 页面目录 pages/chat

> 图片 static/chatting

> 图片引入 common/images.js  chattingImage

> pages/chat/uploadFile.vue 该页面用于文件上传 webview链接的文件（解决小程序只能从微信中选取文件，解决uni-app只能选择特定文件的问题） ： [c0504文件上传案例](https://git.huizhouyiren.com/lijinshen/com.huizhouyiren.c0504.uploadfile)

> 如果项目还需要下载文件（使用webview解决app中下载导致找不到下载路径的问题）请参考： [c0701文件上传下载](https://git.huizhouyiren.com/lijinshen/com.huizhouyiren.b0701.uploadFile)

> 插件 uni_modules/mescroll-uni   (如果该插件不能正常使用，请重新安装该插件)
[mescroll-uni文档地址](http://www.mescroll.com/uni.html)

### components 组件库
> customButon  自定义按钮
 
> customEditor 自定义富文本编辑器

> customImageBox 自定义图片加载框

> customList  自定义list列表

> customLoading 自定义loading

> customSkeleton 自定义骨架屏

> customTabs 自定义tabs

> layer 页面容器

### minxins 混入文件
> 该文件封装了图片上传的功能
``` javascript
<script>
	import minxinsData from "@/minxins/minxins.js"
	export default {
		mixins: [minxinsData],
		data() {
			return {
			}
		},
		methods: {
			// 上传图片
			chooseImageFunc(type) {
				this.chooseImage("", 1, ['original', 'compressed'], ['camera'], {},
					url => {
						this.formData[type] = url
					})
			}
		}
	}
</script>

```