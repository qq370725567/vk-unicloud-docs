---
sidebarDepth: 0
---

# 6、单笔转账到支付宝或微信

## 接口名：`transfer`

## 支付宝

**注意**

需要申请开通支付宝支付的【转账到支付宝账户】接口，如下图所示

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/424.png)

```js
const vkPay = require("vk-uni-pay");

let transferRes = await vkPay.transfer({
  account: "对方支付宝账号",
  real_name: "对方真实姓名",
  amount: 10, // 100=1元（单位分）
  title: "提现到支付宝",
  pay_type: "alipay",
  remark: "转账备注",
  out_biz_no: "转账单号",
  payer_use_alias: true, // 是否展示付款方别名，为true将展示商家支付宝在商家中心 商户信息 > 商户基本信息 页面配置的 商户别名  
});
if (transferRes.code === 0) {
  // 转账成功后的逻辑

} else {
  // 转账失败后的逻辑

}

```

## 微信

**注意**

需要申请开通微信支付的【企业付款到零钱】接口（只有以前的老商户才有这个接口），如下图所示

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/423.png)

无框架下的云函数代码示例（该写法同时也适用于任何框架）

```js
const vkPay = require("vk-uni-pay");

let transferRes = await vkPay.transfer({
  openid: "对方的openid",
  real_name: "对方真实姓名", // 若check_name=true,则real_name必填
  check_name: false, // 是否需要检测真实姓名
  amount: 10, // 100=1元（单位分）
  title: "提现到微信零钱",
  pay_type: "wxpay",
  platform: "mp-weixin",
  remark: "转账备注",
  out_biz_no: "转账单号"
});
if (transferRes.code === 0) {
  // 转账成功后的逻辑

} else {
  // 转账失败后的逻辑

}

```

## 参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| account  |  支付宝专用 - 对方支付宝账号或支付宝的会员ID   | String  | -    | -  |
| real_name  |  对方真实姓名   | String  | -    | -  |
| amount  |  转账金额 100=1元(单位分)，金额最低0.1元，也就是 amount >= 10  | Number  | -    | -  |
| title  |  转账标题   | String  | -    | -  |
| pay_type  |  wxpay：微信支付 alipay：支付宝支付     | String  | -    | wxpay、alipay  |
| remark  |  转账备注  | String  | -    | -  |
| out_biz_no  |  转账单号  | String  | -    | -  |
| check_name  |  是否需要检测真实姓名  | Boolean  | true    | false  |
| openid  |  微信专用 - 用户的openid   | String  | -    | -  |
| platform  |  微信专用 - 平台类型：app-plus、mp-weixin，用于获取对应平台的支付配置信息     | String  | -    | app-plus、mp-weixin、h5  |
| pid  |  多商户模式下的自定义商户id（等于vk-pay-config表的_id） [查看vk-pay-config表](https://vkdoc.fsq.pub/vk-uni-pay/db/vk-pay-config.html)   | String  | -    | -  |
| payer_use_alias  |  支付宝专用 - 是否展示付款方别名，为true将展示商家支付宝在商家中心 商户信息 > 商户基本信息 页面配置的 商户别名   | Boolean  | false    | true  |

## 注意事项

* 新注册的企业支付宝账号，单笔转账接口的申请直接在支付宝官网申请可能会无法申请（申请条件以支付宝支付官网为准），此时可以联系支付宝商务人员，进行人工申请。
* 新注册的微信商户号，可能无法申请转账接口，申请条件以微信支付官网为准
* 支付宝不校验姓名时，account 参数为 支付宝的会员ID，而非支付宝账号