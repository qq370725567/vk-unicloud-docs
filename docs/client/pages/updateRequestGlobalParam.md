# 设置全局请求参数
### 什么是全局请求参数？
#### 即每次请求云函数都会额外带上这些参数
#### 如: 多店系统中，每次请求都要带上`shop_id`，就可以将 `shop_id` 设置为全局请求参数。设置后，就不需要在每个请求中手动传 `shop_id`了。
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

#### 提示:
* 该方法需要写在那里？答：该方法写哪都可以，主要能执行就行
* `shop-manage` ：标识，可自定义
* `regExp` ：正则匹配规则，只要满足该正则表达式的请求才会带上全局请求参数（支持数组，如为数组，则满足数组内任意正则即算匹配）
* `data` ：全局请求参数，json格式

* 如果单独某一个不在此正则规则内的云函数也想自动 带上shop_id参数 
* 则在对应的callFunction中增加参数 `globalParamName:"shop-manage"`

```js
vk.callFunction({
  url: 'xxx/xxxxxx',
  title: '请求中...',
  globalParamName: "shop-manage",
  data: {

  },
  success: (data) => {
		
	}
});
```