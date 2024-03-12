---
sidebarDepth: 0
---

# 5、查询退款状态

## 接口名：`vk.vkPay.queryRefund`

```js
res = await vk.vkPay.queryRefund({
  out_trade_no: data.out_trade_no
});
```

## 请求参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| out_trade_no  |   必填项，商户支付订单号，需自行保证全局唯一    | String  | -    | -  |

## 返回值

|参数名			|类型		|说明													|
|:-:				|:-:		|:-:													|
|queryResult|Object	|第三方支付返回的结果					|
|orderInfo	|Object	|订单信息（只包含了部分信息）	|
