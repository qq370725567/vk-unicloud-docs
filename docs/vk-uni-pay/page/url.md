---
sidebarDepth: 0
---

# 非 uni-app 项目使用支付插件

插件支持非 uni-app 项目中使用，此时需要放弃前端组件 `<vk-uni-pay></vk-uni-pay>`，直接使用http请求方式请求云函数url化的接口地址，拿到支付参数后直接发起支付，具体操作如下。

## 获取vk-pay云函数的url化地址@url

进入空间详情页，点击云函数，点击vk-pay云函数的详情按钮，如下图所示。

![](https://cdn.fsq.pub/vkdoc/vk-pay/a0b494b6-efc7-48c2-a026-bed5aceb4176.png)

然后点击复制按钮，如下图所示。这就是云函数url化的接口地址

![](https://cdn.fsq.pub/vkdoc/vk-pay/061ec41a-4d30-402b-87d2-a54540fa15be.png)

拿到地址后，通过下面的代码可访问支付接口。

## jquery的ajax请求@jquery

假设url化接口地址是 https://xxx.com/http/vk-pay

假设需要请求的云函数路由是 pay/createPayment

### PC扫码支付@jquery-pc

```js
$.ajax({
  type: 'POST',
  url: "https://xxx.com/http/vk-pay",
  headers:{ 
    'content-type': 'application/json;charset=utf8',
  },
  data: JSON.stringify({
    action: "pay/createPayment",
    data: {
      vk_platform: "h5", // 对应uniapp编译的平台，如 h5 mp-weixin app-plus等
      isPC: true, // 是否是电脑扫码支付
      needQRcode: "image", // "image" 代表直接返回二维码图片，true代表返回二维码链接地址
      provider: "alipay", // wxpay 微信支付 alipay 支付宝支付，其他值见文档：https://vkdoc.fsq.pub/vk-uni-pay/uniCloud/createPayment.html#%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0
      out_trade_no: "test202405230001", // 订单号
      total_fee: 1, // 支付金额，单位是分，100 = 1元
      subject: "订单标题", // 订单标题
      type: "recharge" // 支付回调类型
    }
  }),
  success: (data) => {
    // 拿到支付参数后自行根据参数发起支付
    console.log("data", data);
  }
});
```

### 微信小程序支付@jquery-mp-weixin

```js
$.ajax({
  type: 'POST',
  url: "https://xxx.com/http/vk-pay",
  headers:{ 
    'content-type': 'application/json;charset=utf8',
  },
  data: JSON.stringify({
    action: "pay/createPayment",
    data: {
      vk_platform: "mp-weixin", // 对应uniapp编译的平台，如 h5 mp-weixin app-plus等
      provider: "wxpay", // wxpay 微信支付 alipay 支付宝支付，其他值见文档：https://vkdoc.fsq.pub/vk-uni-pay/uniCloud/createPayment.html#%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0
      out_trade_no: "test202405230001", // 订单号
      total_fee: 1, // 支付金额，单位是分，100 = 1元
      subject: "订单标题", // 订单标题
      type: "recharge" // 支付回调类型
    }
  }),
  success: (data) => {
    // 拿到支付参数后自行根据参数发起支付
    console.log("data", data);
  }
});
```

### app支付@jquery-app

```js
$.ajax({
  type: 'POST',
  url: "https://xxx.com/http/vk-pay",
  headers:{ 
    'content-type': 'application/json;charset=utf8',
  },
  data: JSON.stringify({
    action: "pay/createPayment",
    data: {
      vk_platform: "app-plus", // 对应uniapp编译的平台，如 h5 mp-weixin app-plus等
      provider: "wxpay", // wxpay 微信支付 alipay 支付宝支付，其他值见文档：https://vkdoc.fsq.pub/vk-uni-pay/uniCloud/createPayment.html#%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0
      out_trade_no: "test202405230001", // 订单号
      total_fee: 1, // 支付金额，单位是分，100 = 1元
      subject: "订单标题", // 订单标题
      type: "recharge" // 支付回调类型
    }
  }),
  success: (data) => {
    // 拿到支付参数后自行根据参数发起支付
    console.log("data", data);
  }
});
```


## axios请求@axios

假设url化接口地址是 https://xxx.com/http/vk-pay

假设需要请求的云函数路由是 pay/createPayment

### PC扫码支付@axios-pc

```js
axios({
  method: 'POST',
  url: "https://xxx.com/http/vk-pay",
  headers:{ 
    'content-type': 'application/json;charset=utf8',
  },
  data: {
    action: "pay/createPayment",
    data: {
      vk_platform: "h5", // 对应uniapp编译的平台，如 h5 mp-weixin app-plus等
      isPC: true, // 是否是电脑扫码支付
      needQRcode: "image", // "image" 代表直接返回二维码图片，true代表返回二维码链接地址
      provider: "alipay", // wxpay 微信支付 alipay 支付宝支付，其他值见文档：https://vkdoc.fsq.pub/vk-uni-pay/uniCloud/createPayment.html#%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0
      out_trade_no: "test202405230001", // 订单号
      total_fee: 1, // 支付金额，单位是分，100 = 1元
      subject: "订单标题", // 订单标题
      type: "recharge" // 支付回调类型
    }
  }
}).then((res) => {
  // 拿到支付参数后自行根据参数发起支付
  console.log("then", res);
})
.catch((err) => {
  console.log("catch", err);
});
```

### 微信小程序支付@axios-mp-weixin

```js
axios({
  method: 'POST',
  url: "https://xxx.com/http/vk-pay",
  headers:{ 
    'content-type': 'application/json;charset=utf8',
  },
  data: {
    action: "pay/createPayment",
    data: {
      vk_platform: "mp-weixin", // 对应uniapp编译的平台，如 h5 mp-weixin app-plus等
      provider: "wxpay", // wxpay 微信支付 alipay 支付宝支付，其他值见文档：https://vkdoc.fsq.pub/vk-uni-pay/uniCloud/createPayment.html#%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0
      out_trade_no: "test202405230001", // 订单号
      total_fee: 1, // 支付金额，单位是分，100 = 1元
      subject: "订单标题", // 订单标题
      type: "recharge" // 支付回调类型
    }
  }
}).then((res) => {
  // 拿到支付参数后自行根据参数发起支付
  console.log("then", res);
})
.catch((err) => {
  console.log("catch", err);
});
```

### app支付@axios-app-plus

```js
axios({
  method: 'POST',
  url: "https://xxx.com/http/vk-pay",
  headers:{ 
    'content-type': 'application/json;charset=utf8',
  },
  data: {
    action: "pay/createPayment",
    data: {
      vk_platform: "app-plus", // 对应uniapp编译的平台，如 h5 mp-weixin app-plus等
      provider: "wxpay", // wxpay 微信支付 alipay 支付宝支付，其他值见文档：https://vkdoc.fsq.pub/vk-uni-pay/uniCloud/createPayment.html#%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0
      out_trade_no: "test202405230001", // 订单号
      total_fee: 1, // 支付金额，单位是分，100 = 1元
      subject: "订单标题", // 订单标题
      type: "recharge" // 支付回调类型
    }
  }
}).then((res) => {
  // 拿到支付参数后自行根据参数发起支付
  console.log("then", res);
})
.catch((err) => {
  console.log("catch", err);
});
```
