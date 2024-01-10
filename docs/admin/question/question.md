# 群友问题集

## 数据库明明有数据，但用户登录提示用户不存在？

* 1、先用admin账号登录后台，进入应用管理

因为每个人的 `DCloud Appid`是不一样的，所以你需要在应用管理中添加自己的应用（或直接修改内置的2条数据的appid即可）

`DCloud Appid` 获取方法

复制 `uniapp` 项目根目录的 `manifest.json` 文件内的 `appid`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/e717232f-0f18-4dee-8437-5dec2c224920.png)

* 2、再进入用户管理，对需要设置的用户点击编辑，设置该用户可以登录哪些端。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/18cd54d5-bedc-4d4f-bda2-7c339c865257.png)

* 3、完成，可以登录了。

## 为什么云函数URL化后，明明数据库里有该用户，登录提示用户不存在？

这是因为现在的 `uni-id` 模块强制不同端用户隔离导致的，你需要在URL化请求后多传2个参数

分别为：

* vk_appid    （你项目的manifest.json内的appid）
* vk_platform （当前环境，比如h5）

以jquery为例

```js
$.ajax({
  type: 'POST',
  url: "https://xxxxxx.com/http/router/user/pub/login",
  data: JSON.stringify({
    vk_appid: "__UNI__A8V6E8P",
    vk_platform: "h5",
    username: "test",
    password: "123456"
  }),
  success: (data) => {
    console.log("data", data);
  }
})
```

## 如何使用官方 `unicloud-admin` 的插件，如 `APP升级中心`

注意：自 `vk-admin` `1.14.0` 版本起，已内置 `APP升级中心`（功能与官方的一致，同时在此基础上进行了拓展），无需再手动集成，下面只是介绍以下如果手动集成官方的 `APP升级中心`，需要的操作步骤。

插件根目录下的 `common/unicloud-admin` 目录为官方模板的一些样式文件

* 如果你需要引入 `unicloud-admin` 官方的一些插件，如[升级中心](https://ext.dcloud.net.cn/plugin?id=4470)
* 你可能会碰到样式错乱的问题，那是因为 `vk-unicloud-admin` 并没有引入 `unicloud-admin` 的公共样式
* 但框架已经帮你整理好了公共样式的文件，就在 `common/unicloud-admin` 目录内

在 `App.vue` 中引入 `unicloud-admin` 的公共样式

```html
<style lang="scss">
  @import '@/common/unicloud-admin/css/uni.css';
  @import '@/common/unicloud-admin/css/uni-icons.css';
</style>

```


同时官方的插件一般是不通过 `云函数` 获取数据的，而是通过 `clientDB` 操作数据库（前端操作数据库）

* 因此，你需要上传一些数据库的 `schema.json` 文件

如 `升级中心` 需要上传以下两个 `schema.json` 文件

* opendb-app-list.schema.json
* opendb-app-versions.schema.json

这些 `schema.json` 文件一般在插件包里就有，直接右键点击对应的文件即可上传。

* 如升级中心的 `schema.json` 目录在 `uni_modules/uni-upgrade-center/uniCloud/database/opendb-app-list.schema.json`

* 同时一般插件还会有一个自己的 `db_init.json` 文件 如 `uni_modules/uni-upgrade-center/uniCloud/database/db_init.json` （也是右键上传）


## 如何关闭当前打开的tabs页面

```js
vk.menuTabs.closeCurrent();
```

若提示 `menuTabs is undefined` 则请在 `windows/topWindow.vue` 页面 添加如下代码

```js
// 组件挂载完毕时
mounted() {
  this.vk.menuTabs = this.$refs.menuTabs;
},
```

同时需【升级】`vk-unicloud-admin-ui` 包升级至 `1.7.2` 或以上

## 如何升级 `vk-unicloud-admin-ui` 包

步骤:

* 1、根目录的 `package.json` 文件打开，修改 `dependencies` 节点下的 `vk-unicloud-admin-ui` 的版本
* 2、项目根目录执行 `npm i`
* 3、重启项目




## 为什么 `npm i vk-unicloud-admin-ui` 提示版本不存在?

那一定是你的npm使用了别的镜像源（如淘宝镜像源）导致的。

解决方案：

* 1、先运行命令 `npm config set registry https://registry.npmjs.org`
* 2、再运行命令 `npm i vk-unicloud-admin-ui` 

小知识：

* 查看镜像源 `npm config get registry`
* 设置taobao镜像 `npm config set registry https://registry.npmmirror.com`
* 恢复成原来的镜像 `npm config set registry https://registry.npmjs.org`


## 如何美化默认滚动条?

将下方的css样式复制到全局样式文件 `common/css/app.scss` 中

```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(135, 135, 135, 0.1);
}
::-webkit-scrollbar-thumb {
  background: rgba(135, 135, 135, 0.4);
  border-radius: 6px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(135, 135, 135, 0.8);
}
```

## 如何发布admin系统到unicloud前端网页托管?

依次点击HBX的 发行 - 上传网站到服务器（注意，目前只有阿里云的云空间支持在HBX上直接上传）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/b7996a5b-6b2c-41e6-8820-a790fabfc091.png)

## 如何发布admin系统到自己的web服务器?

依次点击HBX的 发行 - 网站-PC-Web - 输入你的网站域名

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/3fd36d06-e901-4a77-8489-01dfe5cfc492.png)

打包完成 HBX控制台会提示源码文件位置，将源码上传到你自己的web服务器对应目录即可。

## 表格查询翻页的时候报错Sort exceeded memory limit of 104857600 bytes

排序字段加索引，其中表格查询默认是 `_add_time` 字段排序，故需 `_add_time` 字段需要加 非唯一索引（升序或降序都可以）

**特别说明：**

翻页其实是一个耗性能的操作，目前阿里云服务空间当翻页到第300万条数据时可能会报错（指加了索引后，如果不加索引，可能几万条数据就会报错）

因此当数据量达到300万时，应该限制下查询条件，比如限制时间范围，查询开始时间和结束时间不能大于3个月，且默认只查当月数据等等。

**那如果非要查询全部数据怎么办？**

用 `_id` 排序，同时限制只能下一页或上一页，不可以指定跳转到第几页

以 实现 _id 升序排序为例

实现下一页通过 where _id > 本页的最后一条记录，且 _id 是升序排序，这样查询到的就是下一页的数据

实现上一页通过 where id < 本页的第一条记录，且 _id 降序排序，这样查到的就是上一页数据

以 实现 _id 降序排序为例

实现下一页通过 where _id < 本页的最后一条记录，且 _id 是降序排序，这样查询到的就是下一页的数据

实现上一页通过 where id > 本页的第一条记录，且 _id 是升序排序，这样查到的就是上一页数据


## 如何使用官方的uni统计2.0

由于 `uni统计2.0` 被内置在了 `uni-admin` 项目中，同时涉及到的表较多，且 `uni-admin` 内置的云函数、公共模块也较多，如果直接集成到 `vk-admin` 中，比较复杂，那么有没有更方便的集成方式呢？

答案是有的，你只需要按下面的步骤一一进行即可。

**该集成方式的优势：**

1. 统计与业务分离，统计的并发和业务的并发量独立计算，互不影响QPS
2. 一个空间可以管理多个应用的统计，且这些应用不需要关联这个空间（可跨账号）
3. 集成非常方便，适合任何项目

**操作步骤**

1. 新建一个服务空间（需全新的，没有部署过任何应用的）
2. 前往[uni-admin插件详情页](https://ext.dcloud.net.cn/plugin?id=3268)，点击【在线体验/部署】

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/456.png)

3. 等待一键部署完成，此过程大概10-20分钟左右，慢慢等即可
![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/457.png)


4. 打开你需要使用uni统计2.0的项目的根目录的 `manifest.json` 文件，点击uni统计，全部开启

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/458.png)

5. 别急着关闭 `manifest.json` 文件，再打开Ta的源码视图，找到根节点的 `uniStatistics` 节点，增加 `uniCloud` 配置，并设置 debug 为 true（方便调试的时候也能上报统计数据）

```js
"uniStatistics" : {
    "debug" : true,
    "enable" : true,
    "version" : "2",
    "uniCloud" : {
        "provider" : "aliyun",
        "spaceId" : "空间id,
        "clientSecret" : "空间clientSecret"
    }
},
```

uniCloud内的参数说明

|    参数名			     |   类型	   | 必填	 |                                          默认值						                                          |                                说明																					                                |
|:-------------:|:-------:|:---:|:-------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------:|
|  provider		   | String	 | 是		 |                                          -							                                           |                        aliyun、tencent、alipay																		                        |
|   spaceId		   | String	 | 是		 |                                          -							                                           |                        服务空间ID，**注意是服务空间ID，不是服务空间名称**										                        |
| clientSecret	 | String	 | 是		 |                                          -							                                           |           仅阿里云支持，可以在[uniCloud控制台](https://unicloud.dcloud.net.cn)服务空间列表中查看	           |
|   accessKey   | String  |  是  |                                              -                                              |         仅支付宝小程序云支持, 可以在[uniCloud控制台](https://unicloud.dcloud.net.cn)服务空间详情中查看         |
|   secretKey   | String  |  是  |                                              -                                              |         仅支付宝小程序云支持, 可以在[uniCloud控制台](https://unicloud.dcloud.net.cn)服务空间详情中查看         |
|  spaceAppId   | String  |  是  |                                              -                                              |         仅支付宝小程序云支持, 可以在[uniCloud控制台](https://unicloud.dcloud.net.cn)服务空间详情中查看         |

6. 启动项目，随便跳转几个页面(持续20秒左右)，去查看uni统计对应的服务空间里的数据库表 `uni-stat-page-logs` 是否有数据，如果有代表成功了。
7. 前往uni统计对应的服务空间控制台页面，点击前端托管，参数配置，绑定下自定义域名（默认域名有访问限制）
8. 通过 `https://自定义域名/admin/` 即可进入uni-admin 统计后台
9. 然后需要在uni-admin添加下你的应用id，点击系统管理-应用管理，新增应用

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/459.png)

10. 操作完成后，明天就可以查看到数据了（注意：今天的数据需要明天跑批后才能看）

<style scoped>
h1{
  font-size:1.4em;
}

h2{
  font-size:1.3em;
}

h3{
  font-size:1.1em;
}
</style>