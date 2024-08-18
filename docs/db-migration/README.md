# 数据库一键搬家工具

:::tip 下载地址与文档
- 下载： [https://ext.dcloud.net.cn/plugin?id=6089](https://ext.dcloud.net.cn/plugin?id=6089)

- 文档： [https://vkdoc.fsq.pub/db-migration/](https://vkdoc.fsq.pub/db-migration/)

- vk框架学习Q群：[22466457](https://jq.qq.com/?_wv=1027&k=RTeqPXCZ) 

:::

## 一键搬家的优势

- 1、`官方的web控制台` 需要一个一个表导出导入，操作繁琐。而 `一键搬家` 不需要。

- 2、直接用 `官方的web控制台` 导出的json文件导入腾讯云，会出现24位id和外键搜索查不到的bug。而 `一键搬家` 自动帮你所有24位id增加1位解决此bug。

- 3、不仅支持将 `A账号` 下的 `A1空间` 搬家到 `A2空间`，还支持将 `A账号` 下的 `A1空间` 搬家到 `B账号` 下的 `B1空间`。

- 4、支持全端（阿里云、腾讯云、支付宝云）

- 5、省心、省力、解放双手！

## 一键搬家最重要的优势

**如果你用 `官方的web控制台` 从阿里云空间导出的json文件导入腾讯云空间，你会发现根据 `_id` 搜索时，有可能无法搜索到数据，那是因为腾讯云不支持阿里云生成的24位 `_id`，阿里云生成的24位 `_id` 导入到腾讯云空间后，会造成无法根据 `_id` 来查询数据，而 `一键搬家` 可以帮你完美解决这个棘手问题。**

## 效果视频

<video src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/257dab2e-eedc-48c4-aef7-d6149ea7b97b.mp4" controls="controls" style="max-width:100%;">
  您的浏览器不支持 video 标签。
</video>

## 名词定义

- 1、旧空间：就是你需要搬家的空间。

- 2、新空间：就是你需要把旧空间搬到这的空间。

## 注意事项

- 1、请确保 `旧空间` 和 `新空间` 是可以正常访问的空间。

- 2、`新空间` 数据库的数据在导入前 `会被全部清空`（需要注意空间别选错了，否则后果自负）。

- 3、`旧空间` 数据库的数据 `不会被清空`（也不会被修改）

- 4、搬家会消耗数据库查询次数、写入次数，以及云函数流量（请确保资源充足）。

- 6、目前大致耗时 = （你数据量总记录数 / 1000） 秒（即每秒搬1000条数据）（后面会继续优化这个速度）

- 7、如有问题，可以加Q群：`22466457` 进行反馈（关于插件问题必定会得到处理）。

## 插件市场地址

[点击前往](https://ext.dcloud.net.cn/plugin?id=6089)

## 一键搬家配置

配置文件为【一键搬家】项目根目录下的 `vk.db.config.js` 文件

```js
/**
 * 一键搬家配置
 */
export default {
	// 旧环境
	"oldEnv": {
		"cloud": "uniCloud", // 通用参数 固定为 uniCloud
		"platform": "aliyun", // 通用参数 阿里云：aliyun 腾讯云：tencent 支付宝云：alipay
		"spaceId": "mp-9dd9a70d-0000-6666-a520-105287d47ff4", // 通用参数 从 https://unicloud.dcloud.net.cn/home 获取 对应SpaceId参数
		"clientSecret": "阿里云专属参数", // 阿里云专属参数 从 https://unicloud.dcloud.net.cn/home 获取 对应ClientSecret参数
		"spaceAppId": "支付宝云专属参数", // 支付宝云专属参数 从 https://unicloud.dcloud.net.cn/home 获取 对应SpaceAppId参数
		"accessKey": "支付宝云专属参数", // 支付宝云专属参数 从 https://unicloud.dcloud.net.cn/home 获取 对应AK参数 
		"secretKey": "支付宝云专属参数", // 支付宝云专属参数 从 https://unicloud.dcloud.net.cn/home 获取 对应SK参数
		"actionsecret": "5d44a032652974c3e53644945a95b126", // 通用参数 请求密钥，从 uniCloud/cloudfunctions/vk-db-migration/vk.db.config.js 获取（两者保持一样即可）
	},
	// 新环境
	"newEnv": {
		"cloud": "uniCloud", // 通用参数 固定为 uniCloud
		"platform": "alipay", // 通用参数 阿里云：aliyun 腾讯云：tencent 支付宝云：alipay
		"spaceId": "env-00jx6s6j6mnt", // 通用参数 空间id 从 https://unicloud.dcloud.net.cn/home 获取 对应SpaceId参数
		"clientSecret": "阿里云专属参数", // 阿里云专属参数 从 https://unicloud.dcloud.net.cn/home 获取 对应ClientSecret参数
		"spaceAppId": "支付宝云专属参数", // 支付宝云专属参数 从 https://unicloud.dcloud.net.cn/home 获取 对应SpaceAppId参数
		"accessKey": "支付宝云专属参数", // 支付宝云专属参数 从 https://unicloud.dcloud.net.cn/home 获取 对应AK参数 
		"secretKey": "支付宝云专属参数", // 支付宝云专属参数 从 https://unicloud.dcloud.net.cn/home 获取 对应SK参数
		"actionsecret": "5d44a032652974c3e53644945a95b126", // 通用参数 请求密钥，从 uniCloud/cloudfunctions/vk-db-migration/vk.db.config.js 获取（两者保持一样即可）
	},
	// 数据库连接失败后重新连接次数，默认20次
	"errorReconnectionCount": 20,
	// 数据库单次请求获取数量，默认500，如果前端报内存超出大小限制的错误，可以尝试调小此值来解决。如设置为100或50或更小的值，最小为1，最大1000
	"maxPageSize": 500,
	"handleObjectKeyName": true, // 是否需要同时处理满足阿里云_id格式的字段名（true：同时处理字段名和字段值 false：只处理字段值，默认true）
	// 数据库集合（表）列表，目前没有接口可以直接获取表列表，故需要在此手动填写数据库中需要搬家的表信息
	// 可以自动根据 database 目录下的文件生成数据库表名列表 方法：在项目根目录执行 node vk.create-db-config.js
	"db": [
		{ "name": "uni-id-users" },
		{ "name": "uni-id-roles" },
		{ "name": "uni-id-permissions" },
		{ "name": "opendb-admin-menus" },
		{ "name": "opendb-app-list" },
	]
};
```

**如何获取空间环境参数？**

登录[unicloud-web控制台](https://unicloud.dcloud.net.cn/home)，在总览页面即可看到对应的参数。

## 操作步骤

- 1、打开【一键搬家】项目根目录 `vk.db.config.js` 配置文件，修改 `oldEnv` 、 `newEnv` 配置 

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/433.png)

- 2、生成 `database` 目录下的数据库初始化文件

### 如何生成数据库初始化文件？

在 `uniCloud控制台` 云数据库菜单下点击 `生成初始化数据` 选择只导出首条记录，生成不包含ID（包含也没事）【一键搬家】运行时，会自动清空新空间的数据。

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/451.png)

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/452.png)

**注意：如果生成失败，不要慌，过一会再试**

- 3、把生成并解压的 `database` 文件全部复制到【一键搬家】项目根目录的 `uniCloud/database目录下` 

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/453.png)

注意：如果【一键搬家】项目的 `uniCloud/database目录下` 有 `db_init.json` 文件，则需要删除Ta（这步很重要，因为上面介绍的是使用新的数据库初始化方式的，当然老的 `db_init.json` 方式目前也还是支持的）

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/455.png)

然后在项目根目录执行 `node vk.create-db-config.js`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/4ee5f06a-4665-450e-8d8f-00825a8801ea.png)

- 4、【一键搬家】项目绑定 `旧空间`，并上传云函数 `vk-db-migration`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/14fe3965-8268-4ab0-9dd4-6361451d0885.png)

- 5、【一键搬家】项目切换到 `新空间` ，在 `新空间` 也上传云函数 `vk-db-migration`

**如何切换空间?**

右键 `uniCloud` 目录，点击关联空间，选择需要切换的空间。

**如何切换阿里云、腾讯云、支付宝云空间**

右键 `uniCloud` 目录，点击重命名，腾讯云为: `uniCloud-tcb` ，阿里云为 `uniCloud-aliyun`，支付宝云为 `uniCloud-alipay`，然后再右键 `uniCloud` 目录，点击关联空间，选择需要切换的空间。

### 特别注意：如果你购买的是普通授权版（非源码授权版），你可能需为两个空间各购买1次插件。

- 6、切换到 `新空间` 后，在 `新空间` 初始化你自己数据库 （注意：如果初始化报错，不要急，再初始化一次，直到提示成功或提示没有任何表数据要上传时，则代表成功）

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/454.png)

- 7、启动 `一键搬家` 项目（请使用连接云端云函数）

___注意：运行前先确认下，旧空间和新空间没有填错，否则运行时，新空间数据会清空（旧空间数据不会变）___

- 8、启动【一键搬家】项目，访问首页，当看到页面控制台上打印 `点击上方【开始一键搬家】按钮可进行一键搬家` 时，点击此按钮即可。

- 9、点击【开始一键搬家】按钮

- 10、如不出意外，等待进度条到100%即可。如果出了意外（比如阿里云数据库不稳定导致连续20次数据库连接失败（目前会自动重试20次），则需要刷新页面并重新点击【开始一键搬家】按钮

- 11、完成后请将 `uniCloud/cloudfunctions/vk-db-migration/vk.db.config.js` 的 `runKey` 设置为false，再分别上传到 `旧空间` 和 `新空间`（这步很关键，防止后面误点导致数据被清空，也可以直接去web控制台删除云函数 `vk-db-migration`）

- 12、完成。

## 常见问题

### 如你已付费购买，缺还提示[vk-database-one-click-migration]：不能在当前云服务空间使用

如果使用数据库搬家项目的时候遇到 `data undefined` 同时提示 `[vk-database-one-click-migration]：不能在当前云服务空间使用​`
则去项目根目录下的 `package.json` 文件内查看看是否有名为 `sn` 的属性，把Ta删除后再试试。

## 特别注意

搬家完成后请将 `uniCloud/cloudfunctions/vk-db-migration/vk.db.config.js` 的 `runKey` 设置为false，再分别上传到 `旧空间` 和 `新空间`（这步很关键，防止后面误点导致数据被清空，也可以直接去web控制台删除云函数 `vk-db-migration`）



