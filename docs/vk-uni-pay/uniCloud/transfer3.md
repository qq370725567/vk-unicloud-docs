---
sidebarDepth: 0
---

# 7、微信商家转账到零钱V3接口

## vkPay.transfer

> vk-pay的版本需 >= 1.14.1

**注意**

需要申请开通微信支付的【商家转账到零钱】接口，如下图所示

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/422.png)

无框架下的云函数代码示例（该写法同时也适用于任何框架）

## 单笔模式

```js
const vkPay = require("vk-uni-pay");

let transferRes = await vkPay.transfer({
  //real_name: "真实姓名", // 真实姓名 大于2000元的转账需要填写真实姓名
  amount: 1, // 100=1元(单位分)
  title: "转账",
  pay_type: "wxpay",
  openid: "oJEy94iPPehudfKiHmdmaJqNOVD8",
  remark: "转账备注",
  out_biz_no: "test" + new Date().getTime(), // 转账单号（请自己控制全局唯一）
  version: 3, // 固定3，代表使用v3版本
});
if (transferRes.code === 0) {
  // 转账成功后的逻辑

} else {
  // 转账失败后的逻辑

}

```

### 请求参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| real_name  | 【特殊选填】对方真实姓名（转账大于2000元时必填）   | String  | -    | -  |
| amount  |  【必填】转账金额 100=1元(单位分)，金额最低0.1元，也就是 amount >= 10  | Number  | -    | -  |
| title  |  【必填】转账标题   | String  | -    | -  |
| pay_type  |  【必填】固定 wxpay  | String  | -  | wxpay  |
| remark  |  【必填】转账备注  | String  | -    | -  |
| out_biz_no  |  【必填】转账单号  | String  | -    | -  |
| openid  |  【必填】微信专用 - 用户的openid，需要与配置中的appid对应或与appid参数对应   | String  | -    | -  |
| appid  | 【选填】手动传appid，不填则自动从配置中获取   | String  | -    | -  |
| platform  | 【选填】若传了platform，且没传appid，则appid从指定的platform中获取   | String  | -    | -  |
| pid  |  【选填】多商户模式下的自定义商户id（等于vk-pay-config表的_id） [查看vk-pay-config表](https://vkdoc.fsq.pub/vk-uni-pay/db/vk-pay-config.html)   | String  | -			| -			|

## 批量模式

```js
const vkPay = require("vk-uni-pay");
let out_biz_no = "test" + new Date().getTime();
let transfer_detail_list = [{
    out_detail_no: out_biz_no + "1", // 该用户的转账子单号
    transfer_amount: 50, // 该用户的转账金额 单位为分 100 = 1元
    transfer_remark: "关羽的报销单", // 该用户的转账备注
    openid: "xxxxxxxx", // 该用户的openid
    //user_name: "关羽",
  },
  {
    out_detail_no: out_biz_no + "2",  // 该用户的转账子单号
    transfer_amount: 50, // 该用户的转账金额 单位为分 100 = 1元
    transfer_remark: "张飞的报销单", // 该用户的转账备注
    openid: "xxxxxxxx", // 该用户的openid
    //user_name: "张飞",
  }
]
let transferRes = await vkPay.transfer({
  out_biz_no, // 转账单号（请自己控制全局唯一）
  batch_name: "2022年8月员工报销单", // 本次批量转账的名称
  batch_remark: "2022年8月员工报销单", // 本次批量转账的备注
  total_amount: 100, // 本次批量转账共转金额 单位为分 100 = 1元
  total_num: transfer_detail_list.length, // 本次批量转账共几笔
  transfer_detail_list, // 本次批量转账详情
  pay_type: "wxpay", // 固定 wxpay
  version: 3, // 固定3，代表使用v3版本
});

if (transferRes.code === 0) {
  // 转账成功后的逻辑

} else {
  // 转账失败后的逻辑

}

```

### 请求参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| appid  |  手动传appid，不填则自动从配置中获取   | String  | -    | -  |
| out_biz_no  |  转账单号   | String  | -    | -  |
| batch_name  |  本次批量转账的名称  | String  | -    | -  |
| batch_remark  |  本次批量转账的备注   | String  | -    | -  |
| total_amount  |  本次批量转账共转金额 单位为分 100 = 1元     | Number  | -    | -  |
| total_num  |  本次批量转账共几笔  | Number  | -    | -  |
| transfer_detail_list  |  本次批量转账详情  | Array  | -    | -  |
| pay_type  |  固定wxpay  | String  | -    | -  |
| version  |  固定3，代表使用v3版本  | Number  | -    | -  |
| pid  |  多商户模式下的自定义商户id（等于vk-pay-config表的_id） [查看vk-pay-config表](https://vkdoc.fsq.pub/vk-uni-pay/db/vk-pay-config.html)   | String  | -    | -  |


## 注意事项

* 新注册的微信商户号，转账接口的申请需要入驻满90天，且连续正常交易30天（刷单不算）

特别注意

微信转账接口配置

```js
{
  "wxpay":{
    ...其他配置
    // 微信 - 转账到零钱 v3版本
    "transfer": {
      "appId": "",
      "mchId": "",
      "v3Key": "", // api v3密钥
      "appCertPath": path.join(__dirname, 'wxpay/apiclient_cert.pem'), // 商家应用证书
      "appPrivateKeyPath": path.join(__dirname, 'wxpay/apiclient_key.pem'), // 商家私钥证书
    },
  }
}
```

## 参数的获取方式

* 1、appId 微信appId：去微信后台查看。

* 2、mchId 微信支付商户id：去微信支付后台查看。

* 3、v3Key api v3的密钥：去微信支付后台查看。

* 4、appCertPath 商家应用证书（apiclient_cert.pem）的路径

* 5、appPrivateKeyPath 商家私钥证书（apiclient_key.pem）的路径

## 设置IP白名单

微信转账需要设置IP白名单，前往 [微信支付后台](https://pay.weixin.qq.com) - 上方菜单产品中心 - 找到商家转账到零钱 - 设置

### 腾讯云空间

前往unicloud控制台，打开转账对应的云函数详情，开启固定IP即可。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/0c2634e7-b26a-4e6f-ae8b-ecdeed0772d2.png)

### 阿里云空间

直接把下面的ip都加到[微信支付后台](https://pay.weixin.qq.com)即可。

**代理服务器IP列表**

```js
47.92.132.2
47.92.152.34
47.92.87.58
47.92.207.183
8.142.185.204
```

### 支付宝云空间

直接把下面的ip都加到[微信支付后台](https://pay.weixin.qq.com)即可。

**固定出口IP列表**

```js
47.97.38.108
112.124.10.115
```

注意：上面的IP是云端运行时的IP，若是本地运行云函数，则需要把自己电脑的外网IP加进去

**注意：**

- 1、只支持微信支付V3版本，不支持微信支付V2版本
- 2、转账前请保证微信支付商户号内有足够的余额（有些分运营账户和基本账户的，请充值到运营账户中，支出款项都由运营账户出资，下单收款都收到基本账户。）
