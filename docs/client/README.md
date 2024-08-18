---
sidebarDepth: 0
---

# 对开发者的价值

如果你热爱编程，想快速入门云开发，欢迎使用 `vk-unicloud` 系列开发框架

无需转变开发习惯，0成本上手云开发。

框架内置了众多API、工具包，为你的业务扫平障碍。使你的项目刚起步进度就是50%（微信登录、短信、验证码、缓存、生成小程序码等等）

从此你又get一个新技能，只需用js，轻松搞定前后台整体业务。

:::tip 下载地址与文档
- client端框架下载： [https://ext.dcloud.net.cn/plugin?id=2204](https://ext.dcloud.net.cn/plugin?id=2204)

- admin端框架下载： [https://ext.dcloud.net.cn/plugin?id=5043](https://ext.dcloud.net.cn/plugin?id=5043)

- client端框架文档： [https://vkdoc.fsq.pub/client/](https://vkdoc.fsq.pub/client/)

- admin端框架文档： [https://vkdoc.fsq.pub/admin/](https://vkdoc.fsq.pub/admin/)

- vk框架学习Q群：[22466457](https://jq.qq.com/?_wv=1027&k=RTeqPXCZ) 

:::

:::tip AI助手
简单的问题可以试试问这两个AI，如果是VK框架文档上就有的，可以问第一个AI，通用前端问题问第二个AI 
- VK云开发AI：[https://chatglm.cn/main/gdetail/65ddd9d832f609421a9c719c ](https://chatglm.cn/main/gdetail/65ddd9d832f609421a9c719c ) 
- 通用前端开发AI：[https://chatglm.cn/main/gdetail/65fd3f408da5f6f0bb6c739a](https://chatglm.cn/main/gdetail/65fd3f408da5f6f0bb6c739a) 
:::

### `vk-unicloud-router` 是一个云函数路由模式开发框架，它提供以下主要功能：

- 1、实现云函数路由模式（同时支持对云对象的路由）
  - 1.1、使用纯原生代码实现路由模式（不使用任何第三方包），兼容性强，运行稳定。
  - 1.2、减少云函数数量，避免云函数数量限制的问题，一个云函数可以实现多个云函数的效果。
  - 1.3、公共区执行部分通用代码块，实现公共函数效果，增加代码复用率，便于维护。
  - 1.4、美化云函数请求过程中的日志排版，使请求日志一目了然。（再也不用为日志分散，难找而头疼）
  - 1.5、可以强制关闭云端服务（适用于需要临时关闭后端服务的情况，如腾讯云迁移数据到阿里云时需要先关闭服务，否则迁移过程中会有新数据产生）

- 2、实现 `全局过滤器`，过滤非法请求。无需关注用户角色权限问题。

- 3、提供丰富的 `JS API`，避免重复开发。（API 持续增加中）

- 4、提供丰富的 `云函数 API`，为您的业务扫平障碍，让您可以专注于自身业务开发。（例如微信登录、短信、验证码、缓存、生成小程序码等等）（持续增加中）

- 5、全面支持 `url化` 的云函数请求，您无需关心url化后参数的获取问题

- 6、已集成 `uni-id` 当前版本: `3.3.26`，它是一种用户系统，有了统一的账户规范，并且围绕这套账户规范，有各种各样的插件，开发者可以随意整合这些插件，让数据连同。同时方便其他用户使用 unicloud 插件发布者发布的前后端一体插件，只需要导入一个云函数即可，打通账号体系。

- 7、在 `uni-id` 基础上升级为 `vk.userCenter` 用户中心API 通过 `vk.userCenter` 即可调用 [传送门](https://vkdoc.fsq.pub/client/vk.userCenter.html)
 
- 8、封装 `uni.callFunction` 和 `uni.request` 使之合二为一 通过 `vk.callFunction` 调用

- 9、提供 `vk.baseDao` 数据库API，使小白也能轻松上手对数据库的调用。 [传送门](https://vkdoc.fsq.pub/client/uniCloud/db/api.html)

- 10、提供 `vk.baseDao.selects` 数据库万能连表查询API [传送门](https://vkdoc.fsq.pub/client/uniCloud/db/selects.html)

- 11、提供 `商品SKU选择器组件`（打造uni插件市场功能最全的SKU选择器组件）[传送门](https://ext.dcloud.net.cn/plugin?id=2848)

- 12、对 `Vuex` 进行了深度封装（支持持久化），现在可以很方便的使用Vuex进行读取和储存。[传送门](https://vkdoc.fsq.pub/client/pages/vuex.html)

- 13、提供自定义过滤器，可以在业务云函数执行之前或之后，统一拦截，进行过滤后再放行，支持设置多个过滤器，并按指定顺序执行。[传送门](https://vkdoc.fsq.pub/client/uniCloud/middleware/filter.html)

- 14、支持设置需要登录的页面列表或不需要登录的页面列表，通过本地 token 检测，无网络请求，支持通配符写法。[传送门](https://vkdoc.fsq.pub/client/pages/config.html)

- 15、支持设置可以被分享的页面列表或禁止分享的页面列表（支持通配符写法）[传送门](https://vkdoc.fsq.pub/client/pages/config.html)

- 16、`vk.localStorage` 封装本地缓存的curd，同时具有监听缓存被更新和被删除的功能。[传送门](https://vkdoc.fsq.pub/client/pages/localStorage.html)

- 17、美化云函数请求过程中的日志排版，使请求日志一目了然。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/4a44fbf8-6b5e-43a6-b443-51a108dec125.png)

- 18、可以 `强制关闭` 云端服务（适用于需要临时关闭后端服务的情况，如腾讯云迁移数据到阿里云时需要先关闭服务，否则迁移过程中会有新数据产生）

- 19、全局数据缓存API，现在可以很方便的在云函数中使用缓存。 [传送门](https://vkdoc.fsq.pub/client/uniCloud/cache/cache.html)

- 20【全网首家】云函数URL化之URL重写 [传送门](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/urlrewrite.html)

- 21、千人群交流开发心得，助你避坑，作者亲自在群内解答框架使用问题，让你轻松上手 `uniCloud云开发`。

- 22、其他好处…

### 服务端 API

VK 框架已经集成了多种服务端 API，包括微信小程序、微信公众号、百度开放平台等，可以轻松地进行接口开发

- 1、微信小程序服务端API [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin.html)

- 2、微信公众号服务端API [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin-h5.html)

- 3、百度开放平台服务端API [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/baidu.html)

- 4、短信发送 [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/sms.html)

- 5、邮箱发送 [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/mail.html)

- 6、Redis [传送门](https://vkdoc.fsq.pub/vk-redis/)


### 开发辅助工具

VK 框架提供了一些实用的开发辅助工具，可以大大提高开发效率。

- 1、VK框架快速开发辅助工具（VK框架必备工具） [传送门](https://vkdoc.fsq.pub/client/codeAssist.html)