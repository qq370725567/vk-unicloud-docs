---
sidebarDepth: 0
---

# 前端以url化方式调用云函数

开启URL化方法为：打开 `router/package.json` 文件，在 `path` 里填写 `/http/router`，最后重新上传云函数。

```js
cloudfunction-config": {
  "concurrency": 1,
  "memorySize": 512,
  "path": "/http/router",
  "timeout": 60,
  "triggers": [],
  "runtime": "Nodejs12"
}
```

isRequest:true 代表使用url访问云函数，一般用于PC后台管理页面使用

```js
uni.vk.callFunction({
  url: 'user/kh/setAvatar',
  title:'请求中...',
  isRequest:true,
  data:{
    avatar: "https://xxxxxxx.jpg"
  },
  success: (data) => {
    // 修改成功
  }
});
```

**注意：云函数url化方式调用需要配置你的云函数url路径地址**

___如果 `云函数url化` 是给外部访问（不在uniapp内访问），则不需要以下配置。___

**以下配置是让你的项目默认使用URL化方式调用云函数（正常不需要这么做，除非你知道这么做带来的意义）**

在根目录的全局配置文件 `app.config.js` 的 `functionName: "router",` 下方新增以下配置

```js
// 云函数对应的url化地址
functionNameToUrl:{
  "router":"https://fa72b138-15f6-47c4-994e-8bdc2353fc98.bspapp.com/http/router",
},
// vk.callFunction的isRequest的默认值，
isRequestDefault: true,
```

使用axios、jquery等工具访问云函数方式 [点击查看云函数url化外部访问](https://vkdoc.fsq.pub/client/question/q2.html)