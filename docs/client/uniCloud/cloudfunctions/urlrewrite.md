---
sidebarDepth: 0
---

# URL 化之 URL 重写

**什么是 URL 化?**

云函数 URL 化 是 uniCloud 为开发者提供的 HTTP 访问服务，让开发者可以通过 HTTP URL 方式访问到云函数。

场景 1：比如 App 端微信支付，需要配服务器回调地址，此时需要一个 HTTP URL。

场景 2：非 uni-app 开发的系统，想要连接 uniCloud，读取数据，也需要通过 HTTP URL 方式访问。

用户通过 `https://xxx.bspapp.com/http/router` 的形式访问云函数

## 什么是 URL 重写

URL 重写就是将 URL 按一定规则书写一个更容易阅读的 URL

**好处**

1. 美化 URL
2. 隐藏真实 URL
3. 伪静态（可将 url 后缀改成.html）（不过目前 unicloud 还不支持服务端渲染）
4. 等等

如：`https://xxx.bspapp.com/http/router/client/user/pub/findGoodsList` 这一个 URL。

用户请求后，在路由框架的规则下，最终执行的是`client/user/pub/findGoodsList`这个云函数

**而重写可以达到这样的效果**

可以将 `https://xxx.bspapp.com/http/router/client/user/pub/findGoodsList`
重写成 `https://xxx.bspapp.com/http/router/findGoodsList`

它可以让你的 URL 更简短易懂，通常用于公开开放 API 时使用（也达到了一个隐藏真实 URL 的目的）

它还可以将 `https://xxx.bspapp.com/http/router/client/user/pub/findGoodsInfo?id=1`
重写成 `https://xxx.bspapp.com/http/router/findGoodsInfo/1`

甚至可以将 `https://xxx.bspapp.com/http/router/template/db_api/pub/findById?id=1`
重写成 `https://xxx.bspapp.com/http/router/findById/1.html`

具体如何书写都由你自己来定义。

**你的 URL 由你做主！**

## 重写教程

1. 编写 `router/util/urlrewrite.js`（如果没有则新建）

```js
module.exports = {
  rule: {
    '^findById/(.+)': 'template/db_api/pub/findById?_id=$1',
    '^aaa$': 'template/db_api/pub/select',
  },
  config: {
    // 当设置为true时，只有符合url重写规则内的云函数才可以被url化访问。
    accessOnlyInRule: false,
  },
};
```

**注意：当 `config.accessOnlyInRule=true` 时，只有符合 url 重写规则内的云函数才可以被 url 化访问。（可以做到只暴露指定的 API 接口）**

2. 上传云函数（完成）
