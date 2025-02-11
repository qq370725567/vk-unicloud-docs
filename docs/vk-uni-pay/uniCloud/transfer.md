---
sidebarDepth: 0
---

# 6、商家转账到支付宝或微信（最新版）

:::warning 重要通知

此接口需要 vk-uni-pay 版本 ≥ 1.16.0，低版本请查看 [老版本文档](https://vkdoc.fsq.pub/vk-uni-pay/uniCloud/transfer-old.html)

由于微信全面升级了转账接口，新的转账接口名为商家转账，且微信在2025年03年31日将废弃老的接口，故vk-pay的转账接口在 1.16.0 版本进行了升级，升级后不兼容老版本转账接口，请使用新的转账接口进行转账。

支付宝的转账接口也进行了升级，接口名为商家转账，升级后不兼容老版本转账接口的参数，请使用新的转账接口参数进行转账。

:::

## vkPay.transfer

## 支付宝@alipay

需要申请开通支付宝支付的【转账到支付宝账户】或【商家转账】接口，如下图所示，目前支付宝这两个产品的效果是一样的。

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/424.png)

### 调用示例

无框架下的云函数代码示例（该写法同时也适用于任何框架）

```js
const vkPay = require("vk-uni-pay");

let transferRes = await vkPay.transfer({
  provider: "alipay", // 固定值alipay
  out_bill_no: "test" + Date.now(), // 商户系统内部的商家单号，要求此参数只能由数字、大小写字母组成，在商户系统内部唯一
  payee_info: {
    identity_type: "ALIPAY_LOGON_ID", // 收款方账户类型。可取值：ALIPAY_USER_ID（支付宝用户 UID）、ALIPAY_LOGON_ID（支付宝登录账号）ALIPAY_OPEN_ID（支付宝 openId）
    // 当 identity_type=ALIPAY_USER_ID 时，参数 identity 填写支付宝用户 UID。示例值：2088开头的一串数字
    // 当 identity_type=ALIPAY_LOGON_ID 时，参数 identity 填写支付宝登录账号。示例值：邮箱或手机号
    // 当 identity_type=ALIPAY_OPEN_ID 时，参数 identity 填写支付宝用户 openId。示例值：英文字母和数字组成一串字符串
    identity: "xxx@163.com",
    name: "真实姓名", // 收款方真实姓名。当 identity_type=ALIPAY_LOGON_ID 时，本参数必填
    // cert_type: "", // 参与方的证件类型。IDENTITY_CARD：身份证，PASSPORT：护照
    // cert_no: "", // 参与方的证件号，支持身份证号、护照号。当传入cert_type时，必传
  },
  transfer_amount: 10, // 转账金额 100=1元（单位分）
  order_title: "转账", // 转账标题
  transfer_remark: "转账备注", // 转账备注
  payer_use_alias: true
});
if (transferRes.code === 0) {
  // 转账成功后的逻辑

} else {
  // 转账失败后的逻辑

}
```

### 请求参数@alipay-params

| 参数						| 说明																																																									| 类型			| 默认值		| 可选值					|
|-------					|-----------																																																					|---------|-------	|-------				|
| provider				|  固定值alipay																																																				| String	| -				| 	|
| out_bill_no			|  必填，商户系统内部的商家单号，要求此参数只能由数字、大小写字母组成，在商户系统内部唯一																				| String	| -				| -							|
| payee_info			|  必填，收款方信息																																																			| Object	| true		| false					|
| transfer_amount	|  转账金额 100=1元(单位分)，金额最低0.1元，也就是 amount >= 10																														| Number	| -				| -							|
| order_title			|  必填，转账业务的标题，用于在支付宝用户的账单里显示。																																			| String	| -				| -							|
| transfer_remark	|  转账备注																																																						| String	| -				| -							|
| payer_use_alias	|  支付宝专用 - 是否展示付款方别名，为true将展示商家支付宝在商家中心 商户信息 > 商户基本信息 页面配置的 商户别名									| Boolean	| false		| true					|
| platform				|  使用哪个平台的配置，使用哪个平台的配置，如 mp-weixin、h5-weixin 等，默认是 transfer																				| String	| transfer| -							|
| pid							|  vk-pay-config表的_id（多商户模式下必填） [查看vk-pay-config表](https://vkdoc.fsq.pub/vk-uni-pay/db/vk-pay-config.html)	| String	| -				| -							|

### 返回值@alipay-return

| 参数	| 说明																																																																																							|
|-------|-----------																																																																																			|
| code	|  0 接口请求成功 其他均为接口请求失败																																																																																		|
| msg		|  请求接口失败后的失败原因																																												|
| result|  支付宝官方原始返回值 [支付宝官方文档](https://opendocs.alipay.com/open/62987723_alipay.fund.trans.uni.transfer?pathHash=66064890&ref=api&scene=ca56bca529e64125a2786703c6192d41)	|

## 微信@wxpay

需要申请开通微信支付的【商家转账】接口，如下图所示

![](https://cdn.fsq.pub/vkdoc/vk-pay/1820a4da-b42b-4152-b80f-0715fe8ac196.png)

### 调用示例

无框架下的云函数代码示例（该写法同时也适用于任何框架）

```js
const vkPay = require("vk-uni-pay");

let transferRes = await vkPay.transfer({
  provider: "wxpay", // 固定值wxpay
  out_bill_no, // 商户系统内部的转账单号
  transfer_amount: 30, // 转账金额 100=1元（单位分）
  openid: "ogtX061Da3Azw7fUZm-zNBYmbt0U", // 用户的openid
  user_name: "真实姓名", // 收款方真实姓名，转账金额 >= 2000元时必填
  transfer_remark: "转账备注", // 转账备注
  transfer_scene_id: "1000",
  user_recv_perception: "现金奖励",
  transfer_scene_report_infos: [{
      info_type: "活动名称",
      info_content: "新会员有礼"
    },
    {
      info_type: "奖励说明",
      info_content: "注册会员抽奖一等奖"
    }
  ]
});
if (transferRes.code === 0) {
  // 转账成功后的逻辑

} else {
  // 转账失败后的逻辑

}
```

### 请求参数@wxpay-params

| 参数																		| 说明																																																																																														| 类型			| 默认值		| 可选值	|
|-------																	|-----------																																																																																										|---------|-------	|-------|
| provider																|  固定值alipay																																																																																									| String	| -				|				|
| out_bill_no															|  必填，商户系统内部的商家单号，要求此参数只能由数字、大小写字母组成，在商户系统内部唯一																																																									| String	| -				| -			|
| appid																		|  appid，不填默认使用配置中的appId																																																																																| String	| -				| -			|
| openid																	|  必填，收款方信息																																																																																								| String	| -				| -			|
| user_name																|  收款方真实姓名，转账金额 >= 2000元时必填																																																																													| String	| -				| -			|
| transfer_amount													|  转账金额 100=1元(单位分)，金额最低0.1元，也就是 amount >= 10																																																																			| Number	| -				| -			|
| transfer_remark													|  转账备注																																																																																											| String	| -				| -			|
| transfer_scene_id												|  必填，该笔转账使用的转账场景，可前往“商户平台-产品中心-商家转账”中申请。如：1001-现金营销																																																						| String	| -				| -			|
| user_recv_perception										|  用户收款时感知到的收款原因将根据转账场景自动展示默认内容。如有其他展示需求，可在本字段传入。各场景展示的默认内容和支持传入的内容 详见：https://pay.weixin.qq.com/doc/v3/merchant/4012711988#3.3-发起转账			| String	| -				| -			|
| transfer_scene_report_infos							|  必填，各转账场景下需报备的内容 详见：https://pay.weixin.qq.com/doc/v3/merchant/4012711988#（3）按转账场景报备背景信息																																								| Array		| -				| -			|
| transfer_scene_report_infos.info_type		|  必填，请根据产品文档确认当前转账场景下需传入的信息类型，需按要求填入，有多个字段时需填写完整 如：转账场景为1000-现金营销，需填入活动名称、奖励说明																														| String	| -				| -			|
| transfer_scene_report_infos.info_content|  必填，请根据信息类型，描述当前这笔转账单的转账背景 如：信息类型为活动名称，请在信息内容描述用户参与活动的名称，如新会员有礼。信息类型为奖励说明，请在信息内容描述用户因为什么奖励获取这笔资金，如注册会员抽奖一等奖	| String	| -				| -			|
| platform																|  使用哪个平台的配置，使用哪个平台的配置，如 mp-weixin、h5-weixin 等，默认是 transfer																																																									| String	| transfer| -			|
| pid																			|  vk-pay-config表的_id（多商户模式下必填） [查看vk-pay-config表](https://vkdoc.fsq.pub/vk-uni-pay/db/vk-pay-config.html)																																						| String	| -				| -			|

### 返回值@wxpay-return

| 参数	| 说明																																														|
|-------|-----------																																										|
| code	|  0 接口请求成功 其他均为接口请求失败																															|
| msg		|  请求接口失败后的失败原因																																				|
| result|  微信支付官方原始返回值 [微信支付官方文档](https://pay.weixin.qq.com/doc/v3/merchant/4012716434)	|

### 开通教程@wxpay-open

前往 [微信支付后台](https://pay.weixin.qq.com/index.php/core/home/login)，扫码登录对应的商户号，必须是企业，不支持个人和个体户。

点击上方菜单【产品中心】，在页面中找到【商家转账】产品，点击Ta进行开通，如下图所示。

![](https://cdn.fsq.pub/vkdoc/vk-pay/17d70386-136c-400e-a905-5cd8ff53ea4e.png)

### 设置IP白名单@wxpay-ip-whitelist

微信转账接口需要设置IP白名单，开通后，根据下图所示设置IP白名单

![](https://cdn.fsq.pub/vkdoc/vk-pay/9ad9170a-3105-4263-ad70-60b902f6cdfb.png)

![](https://cdn.fsq.pub/vkdoc/vk-pay/c8f380db-5ac4-4e07-8afe-8fb1917cc1a3.png)

其中ip白名单的值查看：[云函数固定IP白名单](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin-h5.html#ip)

### 充值运营账户金额@wxpay-recharge

你的客户支付成功的钱在微信支付商户号的【基本账户】中，不在【运营账户】中，因此还需要充值【运营账户】，转账的金额从【运营账户】中扣除，如下图所示。建议用超级管理员的微信扫码充值。

![](https://cdn.fsq.pub/vkdoc/vk-pay/570112db-f5fe-43bb-8b4d-b22af42caaec.png)

## 注意事项

* 新注册的企业支付宝账号，转账接口的申请直接在支付宝官网申请，如果无法申请（申请条件以支付宝支付官网为准），可以联系支付宝商务人员，进行人工申请。
* 新注册的微信商户号，可能无法申请转账接口，申请条件以微信支付官网为准