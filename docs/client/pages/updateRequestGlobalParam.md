---
sidebarDepth: 0
---

# 设置全局请求参数

## 什么是全局请求参数？@introduce

每次请求云函数都会额外带上这些参数

如: 多店系统中，每次请求都要带上`shop_id`，就可以将 `shop_id` 设置为全局请求参数。设置后，就不需要在每个请求中手动传 `shop_id`了。

## 方式一：setCustomClientInfo 形式@set-custom-client-info

> vk-unicloud版本 ≥ 2.19.4

_由于方式一的实现逻辑更方便新手开发者理解，因此建议使用方式一来实现全局请求参数_

### 前端设置方式@mode1-client

先在页面中通过 `vk.setCustomClientInfo` 设置自定义参数，代码如下：

```js
// 设置示例（shop_id 为自定义字段，可按需修改字段名和值）
vk.setCustomClientInfo({
  shop_id: "001" // 此处仅为示例值，请替换为实际业务值
});
```

⚠️ 重要提醒

- 重复调用时，**最后一次**设置的参数会覆盖之前的值
- 设置后所有 vk.callFunction 请求自动携带最新参数

### 云端获取方式@mode1-cloud

#### 云函数中获取@mode1-cloud-function

云函数从 originalParam 变量中获取，代码如下：

```js
// 通过 originalParam.context 获取自定义信息
const customClientInfo = originalParam.context.customInfo;
console.log('当前店铺ID:', customClientInfo.shop_id); 
```

#### 云对象中获取@mode1-cloud-object

云对象使用 this.getCustomClientInfo() 获取，代码如下：

```js
// 使用 this.getCustomClientInfo() 获取参数
const customClientInfo = this.getCustomClientInfo();
console.log('当前店铺ID:', customClientInfo.shop_id); 
```

#### 中间件中获取@mode1-cloud-middleware

在中间件（过滤器、拦截器）中使用跟云函数一样的方式获取，代码如下：

```js
// 通过 originalParam.context 获取自定义信息
const customClientInfo = originalParam.context.customInfo;
console.log('当前店铺ID:', customClientInfo.shop_id); 
```

## 方式二：updateRequestGlobalParam 形式@update-request-global-param

### 前端设置方式@mode2-client

先在页面中通过 `vk.callFunctionUtil.updateRequestGlobalParam` 设置自定义参数，代码如下：

```js
// 设置以 xxx/kh/ 开头的云函数 自动带上shop_id参数
vk.callFunctionUtil.updateRequestGlobalParam({
  "shop-manage": {
    regExp: "^xxx/kh/",
    data: {
      shop_id: shop_id
    }
  }
});
```

**上面的方法需要写在那里？**

写哪都可以，主要能执行就行


#### 参数说明@mode2-client-params

|参数			|类型					|必填	|说明																															|
|:-:			|:-:					|:-:	|:-:																															|
|配置标识	|String				|是		|自定义命名空间，用于在单个请求中引用该配置（如示例中的"shop-manage"）	|
|regExp		|RegExp、Array	|是		|匹配云函数URL的正则表达式，支持数组形式（匹配任意一个即生效）					|
|data			|Object				|是		|需要自动添加的公共参数对象																					|

**特殊场景处理**

对于不符合正则规则的云函数，在调用时添加globalParamName参数即可应用公共参数：

**示例**

```js
vk.callFunction({
  url: 'xxx/xxxxxx',
  title: '请求中...',
  globalParamName: "shop-manage", // 引用配置标识
  data: {

  },
  success: (data) => {
    
  }
});
```

#### 注意事项@mode2-client-tips

1. **执行时机**：确保updateRequestGlobalParam在云函数调用前执行
2. **参数合并**：请求中的data参数会与全局参数自动合并，同名参数以请求参数优先
3. **多配置支持**：可以同时配置多个不同的参数组，通过不同标识区分


### 云端获取方式@mode2-cloud

方式二的全局请求参数是和正常请求的data参数合并的，因此云端获取方式是一致的，均在 data 变量内获取即可。



