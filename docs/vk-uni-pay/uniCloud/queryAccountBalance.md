---
sidebarDepth: 0
---

# 8、查询账户余额

> vk-pay的版本需 >= 1.12.2

## vkPay.queryAccountBalance

仅支持查询商家支付宝账户的余额，此接口一般用于商家支付宝转账给用户前查询商家账户余额是否充足

```js
const vkPay = require("vk-uni-pay");

let queryAccountBalanceRes = await vkPay.queryAccountBalance({
  provider: "alipay",
  platform: "h5"
});
if (queryAccountBalanceRes.code === 0) {
  // 成功后的逻辑
  console.log('余额详情: ', queryAccountBalanceRes);
} else {
  // 失败后的逻辑

}
```

## 请求参数

| 参数名     | 说明       | 类型    | 默认值  | 可选值 |
|-------    |-----------|---------|-------|-------|
| provider	|  支付供应商：alipay：支付宝支付官方 | String	| -			| alipay	|
| platform  |  平台类型：app-plus、mp-weixin，用于获取对应平台的支付配置信息     | String  | -    | app-plus、mp-weixin、h5  |
| pid       |  多商户模式下的自定义商户id（等于vk-pay-config表的_id） [查看vk-pay-config表](https://vkdoc.fsq.pub/vk-uni-pay/db/vk-pay-config.html)   | String  | -    | -  |

## 返回值

**注意：1.13.0之前的版本此处返回的是蛇形，1.13.0之后返回的是驼峰格式**

|参数名							|类型		|说明									| 兼容性						|
|:-:								|:-:		|:-:									|:-:							|
|availableAmount		|Number	|可用余额（单位：元）		| 支付宝						|
|freezeAmount				|Number	|冻结余额（单位：元）		|	支付宝、抖音支付	|
|onlineAmount				|Number	|在途余额（单位：元）		|	抖音支付					|
|withdrawableAmount	|Number	|可提现余额（单位：元）	|	抖音支付					|