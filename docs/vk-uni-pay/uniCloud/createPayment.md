---
sidebarDepth: 0
---

# 1、获取支付参数

## 接口名：`createPayment`

无框架下的云函数代码示例（该写法同时也适用于任何框架）

```js
const vkPay = require("vk-uni-pay");

exports.main = async (event, context) => {
  
  let res = await vkPay.createPayment({
    context,
    provider: "alipay",
    data: {
      openid: "用户openid，小程序支付时必传",
      out_trade_no: "必填项，商户支付订单号，需自行保证全局唯一",
      total_fee: 1, // 订单金额（单位分 100 = 1元）
      subject: "订单标题",
      type: "订单类型如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。", // 此处type的值如果是goods，则回调时就会执行 pay-notify 目录下的 goods.js 内的逻辑
      // 自定义回调数据，能在回调事件获取到以下数据，回调函数中通过 let { out_trade_no, user_id, recharge_balance } = data;方式获取（不可与data内的一级属性名重复）
      custom:{
        
      },
      // 微信、支付宝文档上的其他选填参数（other内的参数会原样发送给微信、支付宝）
      other:{
      
      }
    }
  });

  return res;
  
};
```
 
## 请求参数

| 参数			| 说明																																																																																												| 类型		| 默认值| 可选值								|
|-------		|-----------																																																																																									|---------|-------|-------								|
| context		|  客户端请求环境，用于自动识别支付方式，如识别是小程序支付还是APP支付还是H5支付等等 <br/>VK云函数传 `originalParam.context` <br/>云对象传 `this.getClientInfo()` <br/>官方云函数传 `context`	| Object	| -			| -											|
| provider	|  支付供应商：<br/>wxpay：微信支付官方 <br/>alipay：支付宝支付官方 <br/>appleiap：IOS内购支付 [详情](https://vkdoc.fsq.pub/vk-uni-pay/iosiap.html) <br/>vkspay：VksPay个人支付	[详情](https://vkdoc.fsq.pub/vk-uni-pay/vkspay.html)																																															| String	| -			| wxpay、alipay、vkspay	|
| isPC			|  如果是PC扫码支付，则设为true（使用支付组件时，组件会自动上传isPC的参数）																																																										| Boolean	| false	| true									|
| needQRcode|  是否强制使用二维码支付（让顾客扫码支付，一般用于物联网，如按摩椅上的扫码支付） [查看详情](#needqrcode-强制使用二维码支付模式)																															| Boolean	| false	| true									|
| data			|  订单数据 [查看详情](#data-参数)																																																																														| Object	| -			|												|

## data 参数

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| openid    |   用户openid，小程序支付和微信公众号支付时必传    | String  | -    | - |
| out_trade_no  |   必填项，商户支付订单号，需自行保证全局唯一    | String  | -    | -  |
| total_fee  |   订单金额（单位分 100 = 1元）    | Number  | -    | -  |
| subject  |   订单标题    | String  | -    | -  |
| type  |   订单类型如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。    | String  | -    | -  |
| custom  |   自定义数据，不可与外部已有字段重名（custom内的参数不会发送给微信、支付宝）    | Object  | -    | -  |
| other  |   微信、支付宝文档上的其他选填参数（other内的参数会原样发送给微信、支付宝）    | Object  | -    | -  |
| pid  |  多商户模式下的自定义商户id（等于vk-pay-config表的_id）[查看vk-pay-config表](https://vkdoc.fsq.pub/vk-uni-pay/db/vk-pay-config.html)   | String  | -    | -  |
| user_id  | 用户id（选填） | String  | -    | -  |
| nickname  | 用户昵称（选填） | String  | -    | -  |
| return_url  | 手机端同步回调地址，仅`provider=vkspay`时生效（选填） | String  | -    | -  |
| time_expire  | 指定支付截至时间，13位时间戳格式（选填）| Number  | -    | -  |

 * out_trade_no作用: 用于根据out_trade_no查订单状态、发起退款等接口需要。
 * 同时该订单号需保证全局唯一。
 * 通常情况下，支付订单号就是你系统的订单表的订单号或订单表的_id 
 * 假设你的订单号是：2107151010101541001
 * 但如果你的订单分多次付款（如预付款，尾款等，则需要分别创建不同的支付订单号，如pre2107151010101541001、due2107151010101541001，也可以是2107151010101541001-1、2107151010101541001-2）
 * 对未支付的订单再次发起支付时，商户应该使用原单号发起，不要更换支付单号，避免用户重复支付。

**time_expire**

time_expire的值是时间戳，如 `time_expire: Date.now() + 1000*60` 代表60秒后过期

建议time_expire的值在1-10分钟内

**注意：**

1. provider=wxpay时，time_expire的扫码支付最短时间是1分钟，其他是5分钟
2. provider=alipay时，time_expire的最短时间是1秒
3. provider=appleiap时，不支持此参数
4. provider=vkspay时，不支持此参数

## 返回值

|参数名				|类型		|说明																																								|
|:-:					|:-:		|:-:																																								|
|orderInfo		|object	|用于发起支付的订单信息（不同的付款方式返回的值不同）																|
|out_trade_no	|string	|本次交易的商户支付订单号																														|
|provider			|string	|本次交易的支付供应商																																|
|pay_type			|string	|本次交易的付款方式																																	|
|needQRcode		|boolean|本次交易的是否是扫码支付模式																												|
|qrcodeImage	|string	|如果是扫码支付，且设置了`needQRcode:'image'`，则会返回此字段，代表二维码的base64值	|
|total_fee		|number	|本次交易的付款金额（单位分 100 = 1元）（新增于 1.11.3）														|
|platform			|string	|发起支付时的客户端运行环境（新增于 1.11.3）																				|

## pid（多商户模式）

```js
const vkPay = require("vk-uni-pay");

exports.main = async (event, context) => {
  
  let res = await vkPay.createPayment({
    context,
    provider: "alipay",
    data: {
      pid: "001", // 使用_id为001的商户配置
      openid: "用户openid，小程序支付时必传",
      out_trade_no: "必填项，商户支付订单号，需自行保证全局唯一",
      total_fee: 1, // 订单金额（单位分 100 = 1元）
      subject: "订单标题",
      type: "订单类型如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。", // 此处type的值如果是goods，则回调时就会执行 pay-notify 目录下的 goods.js 内的逻辑
      // 自定义回调数据，能在回调事件获取到以下数据，回调函数中通过 let { out_trade_no, user_id, recharge_balance } = data;方式获取（不可与data内的一级属性名重复）
      custom:{
        
      },
      // 微信、支付宝文档上的其他选填参数（other内的参数会原样发送给微信、支付宝）
      other:{
      
      }
    }
  });

  return res;
  
};
```
 
## needQRcode（强制使用二维码支付模式）

给vue页面使用时，传 `needQRcode:true`
 
```js
 const vkPay = require("vk-uni-pay");
 
 exports.main = async (event, context) => {
   
   let res = await vkPay.createPayment({
     context,
     provider: "alipay",
     needQRcode: true, // 前端页面是vue时，传true
     data: {
       openid: "用户openid，小程序支付时必传",
       out_trade_no: "必填项，商户支付订单号，需自行保证全局唯一",
       total_fee: 1, // 订单金额（单位分 100 = 1元）
       subject: "订单标题",
       type: "订单类型如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。", // 此处type的值如果是goods，则回调时就会执行 pay-notify 目录下的 goods.js 内的逻辑
       // 自定义回调数据，能在回调事件获取到以下数据，回调函数中通过 let { out_trade_no, user_id, recharge_balance } = data;方式获取（不可与data内的一级属性名重复）
       custom:{
         
       },
       // 微信、支付宝文档上的其他选填参数（other内的参数会原样发送给微信、支付宝）
       other:{
       
       }
     }
   });
 
   return res;
   
 };
```
 
给nvue页面使用时，传 `needQRcode:'image'`

```js
 const vkPay = require("vk-uni-pay");
 
 exports.main = async (event, context) => {
   
   let res = await vkPay.createPayment({
     context,
     provider: "alipay",
     needQRcode: "image", // 前端页面是nvue时，传 "image"
     data: {
       openid: "用户openid，小程序支付时必传",
       out_trade_no: "必填项，商户支付订单号，需自行保证全局唯一",
       total_fee: 1, // 订单金额（单位分 100 = 1元）
       subject: "订单标题",
       type: "订单类型如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。", // 此处type的值如果是goods，则回调时就会执行 pay-notify 目录下的 goods.js 内的逻辑
       // 自定义回调数据，能在回调事件获取到以下数据，回调函数中通过 let { out_trade_no, user_id, recharge_balance } = data;方式获取（不可与data内的一级属性名重复）
       custom:{
         
       },
       // 微信、支付宝文档上的其他选填参数（other内的参数会原样发送给微信、支付宝）
       other:{
       
       }
     }
   });
 
   return res;
   
 };
```

## 支付宝小程序支付使用新版JSAPI接口

支付宝官方公告：2024年4月1日起，小程序必须使用专用支付产品（JSAPI支付），否则可能影响支付功能。

只需要在 `other` 内额外增加一个参数 `product_code: "JSAPI_PAY"` 即可，如下示例 如果还是不能支付，来Q群解决：22466457

```js
const vkPay = require("vk-uni-pay");

exports.main = async (event, context) => {
  
  let res = await vkPay.createPayment({
    context,
    provider: "alipay",
    data: {
      openid: "用户openid，小程序支付时必传",
      out_trade_no: "必填项，商户支付订单号，需自行保证全局唯一",
      total_fee: 1, // 订单金额（单位分 100 = 1元）
      subject: "订单标题",
      type: "订单类型如recharge（充值订单）、goods（商品订单）、vip（会员订单）等。", // 此处type的值如果是goods，则回调时就会执行 pay-notify 目录下的 goods.js 内的逻辑
      // 自定义回调数据，能在回调事件获取到以下数据，回调函数中通过 let { out_trade_no, user_id, recharge_balance } = data;方式获取（不可与data内的一级属性名重复）
      custom:{
        
      },
      // 微信、支付宝文档上的其他选填参数（other内的参数会原样发送给微信、支付宝）
      other:{
        product_code: "JSAPI_PAY"
      }
    }
  });

  return res;
  
};
```