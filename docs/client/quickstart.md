# 快速上手 - 安装步骤

下载地址：[https://ext.dcloud.net.cn/plugin?id=2204](https://ext.dcloud.net.cn/plugin?id=2204)

## 后端（云函数端）安装步骤
打开 `uniCloud/cloudfunctions` 目录

#### 前置工作：修改云函数全局配置文件（用到微信登录的必须要配置）[微信小程序配置详细教程](https://vkdoc.fsq.pub/client/question/q12.html)
#### 注意：
* 1、开发微信小程序和APP微信登录需要额外配置 manifest.json 以及 uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json 这2个配置文件，且改动配置后需要重新上传 公共模块 和 router 函数。
* 2、若你的电脑没有安装 Node.js，则无法使用 npm 命令。
* 3、Node.js 安装包及源码下载地址为：[https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* 4、Node.js 安装教程：[https://www.runoob.com/nodejs/nodejs-install-setup.html](https://www.runoob.com/nodejs/nodejs-install-setup.html)

查看 `uni-id/config.json` 代码格式 [点击查看](https://vkdoc.fsq.pub/client/uniCloud/config/uni-id.html)


#### 正式安装

直接右键`uniCloud`目录 点击 `运行云服务空间初始化向导` 即可

## 前端（页面端）安装步骤

### Vue2.0版本

`main.js` 引入 `vk-unicloud-page` 库

```js
// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud';
Vue.use(vk);
```

完整 `main.js` 示例

```js
import Vue from 'vue'
import App from './App'
import store from './store'
import config from '@/app.config.js'

// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud';
Vue.use(vk);

// 初始化 vk框架
Vue.prototype.vk.init({
  Vue,               // Vue实例
  config,	     // 全局配置
});

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
});
app.$mount();

```

### Vue3.0版本

`main.js` 引入 `vk-unicloud-page` 库

完整 `main.js` 示例

```js
import App from './App'
import store from './store'
import config from '@/app.config.js'

// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud';

import { createSSRApp } from 'vue'

export function createApp() {
  const app  = createSSRApp(App)
  
  // 使用 vuex
  app.use(store)
  
  // 使用 vk框架前端
  app.use(vk);
  
  // 初始化 vk框架
  app.config.globalProperties.vk.init({
    Vue: app,          // Vue实例
    config,	           // 配置
  });
  
  return { app }
}
```

### 自 client端框架 2.6.0 起，不再内置任何 UI 框架，你可以选择自己喜欢的 UI 组件库进行开发。

### 集成 `vk-uview-ui`（vue2.0版）

___若不想集成 `vk-uview-ui` 可跳过此处___

适合开发：H5、App(vue版本)、微信小程序、支付宝小程序（其他小程序未验证）

> 插件市场导入 `vk-uview-ui` 框架：[点击前往](https://ext.dcloud.net.cn/plugin?id=6692)

* 1、main.js 引入 vk-uview-ui 

```js
import uView from './uni_modules/vk-uview-ui';
Vue.use(uView);
```

* 2、App.vue 引入基础样式（注意style标签需声明scss属性支持）

```html
<style lang="scss">
  @import "./uni_modules/vk-uview-ui/index.scss";
</style>
```

* 3、uni.scss 引入全局 scss 变量文件

```css
@import "@/uni_modules/vk-uview-ui/theme.scss";
```


### 集成 `vk-uview-ui`（vue3.0版）

___若不想集成 `vk-uview-ui` 可跳过此处___

适合开发：H5、App(vue版本)、微信小程序（其他小程序未验证）

> 插件市场导入 `vk-uview-ui` 框架：[传送门](https://ext.dcloud.net.cn/plugin?id=6692)

> 插件市场导入 `vue3的scss编译` 插件：[传送门](https://ext.dcloud.net.cn/plugin?id=5701)

不建议把老项目 升级到 Vue3.0 (升级非常麻烦，建议新项目才考虑是否使用Vue3.0)

___注意：目前（2020-11-18） `uniapp` 的 `Vue3.0` 版本只兼容：H5、App、微信小程序___

* 1、前置步骤：修改 `manifest.json` 内的 `vue` 版本为 `vue3`
* 2、项目根目录新增 `index.html` 文件，文件代码为
```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <title></title>
    <!--preload-links-->
    <!--app-context-->
    <!-- 配置H5的 web图标static/logo.png -->
    <link rel="icon" href="./static/logo.png" />
  </head>
  <body>
    <div id="app">
      <!--app-html-->
    </div>
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

* 3、main.js 引入 vk-uview-ui 

```js
// 引入 uView UI
import uView from './uni_modules/vk-uview-ui';

import { createSSRApp } from 'vue'

export function createApp() {
  const app  = createSSRApp(App)
  
  // 使用 uView UI
  app.use(uView)
  
  return { app }
}

```

* 4、App.vue 引入基础样式（注意style标签需声明scss属性支持）

```html
<style lang="scss">
  @import "./uni_modules/vk-uview-ui/index.scss";
</style>
```

* 5、uni.scss 引入全局 scss 变量文件

```css
@import "@/uni_modules/vk-uview-ui/theme.scss";
```


### 集成 `uview-ui`（nvue2.0版）

___若不想集成 `uview-ui` 可跳过此处___

适合开发：App(nvue版本)，如果你只开发App的vue2版本，推荐用这个UI

**安装步骤**

> 插件市场导入 `uview-ui` 框架：[点击前往](https://ext.dcloud.net.cn/plugin?id=1593)

* 1、main.js 引入 uview-ui 

```js
import uView from './uni_modules/uview-ui';
Vue.use(uView);
```

* 2、App.vue 引入基础样式（注意style标签需声明scss属性支持）

```html
<style lang="scss">
  @import "./uni_modules/uview-ui/index.scss";
</style>
```

* 3、uni.scss 引入全局 scss 变量文件

```css
@import "@/uni_modules/uview-ui/theme.scss";
```

### 集成 `uview-ui`（nvue3.0版）

别想了，还没出生。


### 集成 `tmui`（vue2.0版）

___若不想集成 `tmui` 可跳过此处___

适合开发：App(非nvue版本)、H5、微信小程序、支付宝小程序、头条小程序等


**安装步骤**

* 1、前往插件市场下载，记得直接点【下载插件ZIP】 [传送门](https://ext.dcloud.net.cn/plugin?id=5949)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/3e303b10-b5a2-447a-b734-c2dbfcada792.png)

* 2、解压刚下载的ZIP文件，可以看到里面还有1个 `tm-vuetify.zip`，你没看错，继续解压里面这个 `tm-vuetify.zip`（点解压到 `tm-vuetify\`） 得到 `tm-vuetify` 目录（这个目录才是插件真正代码）

* 3、将上一步解压得到的 `tm-vuetify` 目录复制到你的VK框架项目（client端）根目录（与App.vue同级目录）

* 4、配置 `main.js`

```js
// 引入tmui组件库
import tmVuetify from "./tm-vuetify";
Vue.use(tmVuetify)
```

完整 `main.js` 代码

```js
import Vue from 'vue'
import App from './App'
import store from './store'
import config from '@/app.config.js'

// 引入tmui组件库
import tmVuetify from "./tm-vuetify";
Vue.use(tmVuetify)

// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud';
Vue.use(vk);

// 初始化 vk框架
Vue.prototype.vk.init({
  Vue,               // Vue实例
  config,	           // 配置
});

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
});

app.$mount();
```

* 5、`App.vue` 配置样式

```html
<style lang="scss">
  /*每个页面公共css */
  @import "./tm-vuetify/mian.min.css";
  @import "./tm-vuetify/scss/theme.css";
  @import "./common/css/app.scss";
</style>
```

* 6、配置 `pages.json` 内的 `easycom` 规则

```js
{
  "easycom":{
    "autoscan": true,
    "custom":{
      "^tm-(.*)": "@/tm-vuetify/components/tm-$1/tm-$1.vue"
    }
  },
  "pages": [
    ...
}
```

* 7、完成，启动项目。

注意：如果启动项目报错 `Uncaught Error: [vuex] getters should be function but "getters.$user/getUserInfo" in module "index"`

则删除项目根目录下的 `store/modules/$user.js` 内 `getters` 内的所有方法，如删除getUserInfo方法

或者

修改 `tm-vuetify/tool/store/tm-vuetify.js` 文件内

```js
const modulesList = require.context('@/store', true, /\.js$/);
```
改成
```js
const modulesList = require.context('@/store/modules', true, /\.js$/);
```

### 集成 `tmui`（nvue3.0版）

___若不想集成 `tmui` 可跳过此处___

适合开发：App(nvue版本)，目前为数不多的 `nvue3.0` 组件库。H5、微信小程序、支付宝小程序等

> 插件市场导入 `vue3的scss编译` 插件：[传送门](https://ext.dcloud.net.cn/plugin?id=5701)

**安装步骤**

* 1、前往插件市场下载，记得直接点【下载插件ZIP】 [传送门](https://ext.dcloud.net.cn/plugin?id=8372)

* 2、解压刚下载的ZIP文件，可以看到里面还有1个 `tmui.zip`，你没看错，继续解压里面这个 `tmui.zip`（点解压到当前文件夹） 得到 `tmui` 目录（这个目录才是插件真正代码）

* 3、将上一步解压得到的 `tmui` 目录复制到你的VK框架项目（client端）根目录（与App.vue同级目录）

* 4、在根目录新建 `theme` 目录，并在 `theme` 目录新建 `index.ts` 文件，注意是 `ts` 文件，文件内容为
```js
export const theme = {
  // 这里输入你定义的主题主色
  //比如："primary": "#FF0000"
  //名称如果与自带主题相同，将会覆盖。
  
}
```
* 5、在根目录新建 `router` 目录，并在 `router` 目录新建 `index.ts` 文件，注意是 `ts` 文件，文件内容为
```js
import { ComponentPublicInstance, nextTick } from "vue"
//如果想要使用框架的自带工具函数请输入uni.$tm.u.?你的方法
//网络请示为uni.$tm.fetch.?你的方法
interface beforeRouterOpts {
	path:string|null,//当前页面路径，不含前缀 /
	opts?:any,//页面参数
	openType?:string,//当前页面打开的类型
	context:ComponentPublicInstance|null,
}

/**
 * 路由访问前执行的函数
 * @param path 页面路径，不带前缀/
 */
export const useTmRouterBefore = (arg:beforeRouterOpts):void=>{
    // 每一个页面在初化前都会执行
	//返回事件，只有在h5端可以被拦截。
	if(arg.path){
		
	}
}
/**
 * 路由访问后执行的函数
 * @param path 页面路径，不带前缀/
 * @param opts 页面加载完成后返回的参数
 */
export const useTmRouterAfter = (arg:beforeRouterOpts):void=>{
    //每一个页面初始后都会执行
   
}
```
* 6、在项目根目录执行npm命令 `npm i pinia`

该组件库依赖这个库

* 7、配置 `main.js`

```js
// 引入tmui组件库
import * as Pinia from 'pinia';
import tmui from "./tmui/index.ts"

import { createSSRApp } from 'vue'

export function createApp() {
  const app  = createSSRApp(App)
  
  // 在 vue3的 createApp 内引入 tmui 组件库
  app.use(Pinia.createPinia());
  app.use(tmui);
  
  return { app }
}


```

完整 `main.js` 代码

```js
import App from './App'
import store from './store'
import config from '@/app.config.js'

// 引入tmui组件库
import * as Pinia from 'pinia';
import tmui from "./tmui/index.ts"

// 引入 vk框架前端
import vk from './uni_modules/vk-unicloud';

import { createSSRApp } from 'vue'

export function createApp() {
  const app  = createSSRApp(App)
  
  // 引入vuex
  app.use(store)
  
  // 引入 tmui 组件库
  app.use(Pinia.createPinia());
  app.use(tmui);
  
  // 引入 vk框架前端
  app.use(vk);
  
  // 初始化 vk框架
  app.config.globalProperties.vk.init({
    Vue: app,          // Vue实例
    config,	           // 配置
  });
  
  return { app }
}
```

* 7、`App.vue` 配置样式

```html
<style lang="scss">
  /* #ifdef APP-NVUE */
  @import './tmui/scss/nvue.css';
  /* #endif */
  /* #ifndef APP-NVUE */
  @import './tmui/scss/noNvue.css';
  /* #endif */
  @import "./common/css/app.scss";
</style>
```

* 8、配置 `pages.json` 内的 `easycom` 规则

```js
{
  "easycom":{
    "autoscan": true,
    "custom":{
      "^tm-(.*)": "@/tmui/components/tm-$1/tm-$1.vue"
    }
  },
  "pages": [
    ...
}
```

* 9、完成，启动项目。

### 组件库并不限制只能从以上选择，理论上支持任何uniapp的UI组件库进行开发。

### 卸载 `uView1` 的步骤

* 1、main.js 删除 uView1

```js
import uView from 'uview-ui'
Vue.use(uView);
```

* 2、App.vue 删除基础样式

```html
<style lang="scss">
  @import "uview-ui/index.scss";
</style>
```

* 3、uni.scss 删除全局 scss 变量文件

```css
@import "uview-ui/theme.scss";
```

* 4、pages.json 删除 easycom 规则

```js
"easycom": {
  "^u-(.*)": "uview-ui/components/u-$1/u-$1.vue",
},
```

* 5、package.json 删除 uview-ui 依赖

```js
"dependencies": {
  "uview-ui": "^1.8.3"
},
```

* 6、package-lock.json 删除 uview-ui 依赖

```js
"dependencies": {
  "uview-ui": {
    "version": "1.8.3",
    "resolved": "https://registry.npmjs.org/uview-ui/-/uview-ui-1.8.3.tgz",
    "integrity": "sha512-DqKc+qRrOZLPcyfWv4b0HspSS9n1Cd6BbgKiYEv9rjTAnWoqJV7rXsvWqZdr5iKGP5EMNbNS741GLNw4sIHbpw=="
  }
}
```


### 卸载 `vk-uview-ui` 的步骤

* 1、main.js 删除vk-uview-ui

```js
import uView from './uni_modules/vk-uview-ui';
Vue.use(uView);
```

* 2、App.vue 删除基础样式

```html
<style lang="scss">
  @import "./uni_modules/vk-uview-ui/index.scss";
</style>
```

* 3、uni.scss 删除全局 scss 变量文件

```css
@import "@/uni_modules/vk-uview-ui/theme.scss";
```

* 4、删除 uni_modules/vk-uview-ui 整个目录

