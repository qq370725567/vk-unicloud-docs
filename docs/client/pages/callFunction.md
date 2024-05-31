---
sidebarDepth: 0
---

# vk.callFunction（请求云函数）

`vk.callFunction` 用来请求云函数

如果该请求是点击按钮进行的表单提交请求，建议加上参数 `title:'请求中...'` 具有遮罩功能，可以有效防止同一时间重复点击。

## 回调形式 

```js
// 回调形式 success fail complete
vk.callFunction({
  url: '云函数路径',
  title: '请求中...',
  data: {
    
  },
  success: (data) => {
    
  },
  fail: (err) => {
    
  },
  complete: (res) => {
    
  }
});
```

## promise方式

```js
// promise方式
vk.callFunction({
  url: '云函数路径',
  title:'请求中...',
  data:{
    
  }
}).then((data) => {
  
}).catch((err) => {
  
});
```

## async/await方式

注意：该方式也同时支持在云函数或云对象内使用。

```js
// async/await方式
let data = await vk.callFunction({
  url: '云函数路径',
  title:'请求中...',
  data:{
    
  }
});
``` 

## 属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| name             | 符合VK框架路由规则的router大函数名，默认为app.config.js内的functionName属性的值 | String  | router | -  |
| url              | 请求路径，该路径实为router大云函数的service目录下的路径（此时的router大函数=name参数的值） | String | - | - |
| data             | 请求参数 | Object  | - | -  |
| title            | 遮罩层提示语，为空或不传则代表不显示遮罩层。 | String  | - | -  |
| loading          | 自定义loading [查看详情](#loading) | Boolean、Object  |
| isRequest        | 是否使用云函数url化地址访问云函数 | Boolean  | false | true |
| needAlert        | 为true代表请求错误时，会有alert弹窗提示 | Boolean  | true | false |
| globalParamName  | 全局请求参数的名称， 如果设置了正则规则，则不需要此参数  [查看详情](#globalparamname)  | String  | - | - |
| env              | 请求多服务空间的环境 [查看详情](https://vkdoc.fsq.pub/client/question/q9.html#%E5%89%8D%E7%AB%AF%E8%AF%B7%E6%B1%82%E5%A4%9A%E6%9C%8D%E5%8A%A1%E7%A9%BA%E9%97%B4)| String  | - | - |
| retryCount       | 系统异常重试机制（表单提交时慎用，建议只用在查询请求中，即无任何数据库修改的请求中） | Number  | 0 | - |
| success          | 请求成功时，执行的回调函数 | Function  | - | - |
| fail             | 请求失败时，执行的回调函数 | Function  | - | - |
| complete         | 无论请求成功与否，都会执行的回调函数 | Function  | - | - |

### loading

loading 参数说明

* 若 `loading` 的值为 `false`，则不显示默认遮罩层提示语

* 若 `loading` 的值为 `true` ，则不显示默认遮罩层提示语，同时在请求时，会自动设置页面变量 `this.loading=true` ，请求完成时，自动设置页面变量 `this.loading=false`

* 若 `loading` 的值类型为 `Object`，如下方代码效果是：请求时，会自动执行 `this.loading2=true` ，请求完成时，会自动执行 `this.loading2=false`

```js
loading:{ that: this, name:"loading2"}
```

* name 支持. 如下方代码效果是：请求时，会自动执行 `this.page.loading=true` ，请求完成时，会自动执行 `this.page.loading=false`

```js
loading:{ that: this, name:"page.loading"}
```

**Vue3 setup 用法示例**

因为Vue3的setup模式下没有this，但that属性的本质其实就是一个对象，因此我们直接传一个对象给Ta就可以了，代码如下

```vue
<template>
	<view class="app">
		{{ loading }}
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive } from 'vue';

	const vk = uni.vk;

	const loading = reactive({
		a: false,
		b: false
	});

	onLoad((options) => {
		vk.callFunction({
			url: 'template/pub.test.test500',
			loading: { that: loading, name: "a" },
			data: {

			},
			success: (data) => {

			}
		});
	});
</script>
```

### globalParamName

globalParamName 参数说明

```js
// 需要先设置globalParamName对应的数据
/**
 * 修改请求配置中的公共请求参数
 * 若把shop-manage改成*则代表全局
 */
vk.callFunctionUtil.updateRequestGlobalParam({
  "shop-manage":{
    regExp:"^xxx/kh/",
    data:{
      shop_id : shop_id
    }
  }
});

// 此时请求若带上 globalParamName:"shop-manage" 或满足 regExp:"^xxx/kh/" 的正则规则，则请求参数会自动带上 shop_id
vk.callFunction({
  url: 'xxx/xxxxxx',
  title: '请求中...',
  globalParamName:"shop-manage",// 如果设置了正则规则,则不需要此参数
  data: {},
  success: (data) => {
    
  }
});
```

### 请求拦截器

`uniCloud.addInterceptor` 提供了拦截器功能，[文档传送门](https://uniapp.dcloud.net.cn/uniCloud/client-sdk.html#add-interceptor)

**示例代码**

此代码写在 `App.vue` 的 `onLaunch` 中

```js
uniCloud.addInterceptor('callFunction', {
  invoke: (res) => {
    // res格式
    // {
    // 	"name": "router",
    // 	"data": {
    // 		"$url": "template/test/pub/test",
    // 		"data": {

    // 		}
    // 	}
    // }
    console.log('interceptor-invoke: ', res);
    res.data.data.a = 1; // 新增请求参数a=1（注意：此参数不会显示在vk的请求日志中，但可在HBX控制台内可看到，即最终此参数可在云函数中取到）
    // throw new Error(`请求【${res.data.$url}】已被拦截`); // 在此抛出异常可拦截后续请求
  },
  success: (res) => {
    console.log('interceptor-success ', res);
    // 请求成功后，修改a值为1
    res.result.a = 1;
  },
  fail: (err) => {
    console.log('interceptor-fail', err);
  },
  complete: (res) => {
    console.log('interceptor-complete', res);
  }
});
```