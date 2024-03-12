---
sidebarDepth: 0
---

# 0、框架简介

## 不使用此框架的请忽视

[点击查看](https://vkdoc.fsq.pub/client/)

## 同时需要在 `uniCloud/cloudfunctions/common/uni-config-center/vk-unicloud/index.js` 添加 `uniPayConfig` 配置

代码如下

```js
const uniPayConfig = require('../uni-pay/config.js');
module.exports = {
	"uni-pay": uniPayConfig,
	"vk": {
		。。。 之前的配置
	}
};
```

## 还需要右键 `router` 云函数，管理云函数依赖，添加 `vk-uni-pay` 依赖。

如下图所示。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/fb09f525-ea94-46a3-9dd5-527c8ff04612.png)