---
sidebarDepth: 0
---

# 8、查询商户余额

## 接口名：`queryAccountBalance`

**需要 vk-uni-pay 版本 ≥ 1.12.2**

仅支持查询支付宝余额，此接口一般用于支付宝转账前查询余额是否充足

```js
const vkPay = require("vk-uni-pay");

let queryAccountBalanceRes = await vkPay.queryAccountBalance({
  provider: "alipay",
  platform: "h5"
});
if (queryAccountBalanceRes.code === 0) {
  // 成功后的逻辑
  let {
    available_amount, // 可用余额
    freeze_amount, // 冻结余额
  } = queryAccountBalanceRes; 
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

|参数名              |类型		|说明												|
|:-:                |:-:		|:-:												|
|available_amount   |Number	|可用余额										|
|freeze_amount      |Number	|冻结余额										|