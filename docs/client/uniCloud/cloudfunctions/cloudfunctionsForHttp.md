---
sidebarDepth: 0
---

# 使用axios等工具请求云函数或云对象

___必须开启云函数的URL化，假如URL地址为：https://xxx.bspapp.com/http/router___

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

**如何获得云函数URL化的域名地址？**

进入uniCloud后台，在云函数的函数列表里找到router，点详情

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/53ab9faf-4e28-4d5c-b735-2d7cee4a991e.png)

___注意：如果你直接在浏览器中访问url化地址，会触发下载请求，需要用 `postman` 等工具进行访问测试。___

## axios请求示例

假设router的url化地址是 `https://xxx.com/http/router`

假设需要请求的云函数路由是 `template/test/pub/test`

则完整请求url是 `https://xxx.com/http/router/template/test/pub/test`

axios（不带token）

```js
axios.post('https://xxx.bspapp.com/http/router/test/pub/test', {
  a:1,
  b:"2"
})
.then((res) => {
  console.log("then", res);
})
.catch((err) => {
  console.log("catch", err);
});
```

axios（带token）

```js
axios({
  method: 'post',
  url: 'https://xxx.bspapp.com/http/router/test/pub/test',
  headers: {
    'content-type': 'application/json;charset=utf8',
    'uni-id-token': 'xxxxxxxxx', // 用户token
    'vk-appId': '__UNI__89927A9', // 你项目的dcloud_appid
    'vk-platform': 'mp-weixin', // 运行环境，如 h5、mp-weixin、app-plus 等
  },
  data: {
    a: 1,
    b: "2"
  }
})
.then((res) => {
  console.log("then", res);
})
.catch((err) => {
  console.log("catch", err);
});
```


## jquery ajax请求示例

假设router的url化地址是 `https://xxx.com/http/router`

假设需要请求的云函数路由是 `template/test/pub/test`

则完整请求url是 `https://xxx.com/http/router/template/test/pub/test`

jquery（无token示例）

```js
$.ajax({
  type: 'POST',
  url: "https://xxx.com/http/router/template/test/pub/test",
  data: JSON.stringify({
    a: 1,
    b: "2"
  }),
  success: (data) => {
    console.log("data", data);
  }
})
```

jquery（有token示例）

```js
$.ajax({
  type: 'POST',
  url: "https://xxx.com/http/router/template/test/pub/test",
  headers:{ 
    'content-type': 'application/json;charset=utf8',
    'uni-id-token': 'xxxxxxxxx', // 用户token
    'vk-appId': '__UNI__89927A9', // 你项目的dcloud_appid
    'vk-platform': 'mp-weixin', // 运行环境，如 h5、mp-weixin、app-plus 等
  },
  data: JSON.stringify({
    a:1,
    b:"2"
  }),
  success: (data) => {
    console.log("data", data);
  }
})
```

## uni.request示例

假设router的url化地址是 `https://xxx.com/http/router`

假设需要请求的云函数路由是 `template/test/pub/test`

则完整请求url是 `https://xxx.com/http/router/template/test/pub/test`

uni.request（不带token）

```js
uni.request({
  method: 'POST',
  url: "https://xxx.com/http/router/template/test/pub/test",
  data: {
    a: 1,
    b: "2"
  },
  success: (data) => {
    console.log("data", data);
  }
});
```

uni.request（带token）

```js
uni.request({
  method: 'POST',
  url: "https://xxx.com/http/router/template/test/pub/test",
  header: {
    'content-type': 'application/json;charset=utf8',
    'uni-id-token': 'xxxxxxxxx', // 用户token
    'vk-appId': '__UNI__89927A9', // 你项目的dcloud_appid
    'vk-platform': 'mp-weixin', // 运行环境，如 h5、mp-weixin、app-plus 等
  },
  data: {
    a: 1,
    b: "2"
  },
  success: (data) => {
    console.log("data", data);
  }
});
```

## 常见问题

注意：部分接口若报如下错误

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/eb418f3f-7268-433f-9ca4-79f8902752c7.png)

则需要在请求头多传2个参数 `vk-appId` 和 `vk-platform`

其中 `vk-appId` 是 `manifest.json` 内的 `dcloud_appid`
`vk-platform` 是当前环境，如：`h5` `mp-weixin` `app-plus` 等

以 axios 示例

```js
axios({
  method: 'post',
  url: 'https://xxx.bspapp.com/http/router/test/pub/test',
  headers: {
    'content-type': 'application/json;charset=utf8',
    'uni-id-token': 'xxxxxxxxx', // 用户token
    'vk-appId': '__UNI__89927A9', // 你项目的dcloud_appid
    'vk-platform': 'mp-weixin', // 运行环境，如 h5、mp-weixin、app-plus 等
    'vk-locale': 'zh-Hans', // 默认语言
  },
  data: {
    a: 1,
    b: "2"
  }
})
.then((res) => {
  console.log("then", res);
})
.catch((err) => {
  console.log("catch", err);
});

```