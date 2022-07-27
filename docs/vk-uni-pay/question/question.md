# 常见问题
## 微信H5外部浏览器支付流程

* 1、用户点击发起支付
* 2、唤起微信APP，在微信APP内输入支付密码
* 3、支付成功后，会返回之前的页面（返回的页面可以通过 `return-url` 指定）
```html
<vk-uni-pay
  ref="vkPay"
  :status.sync="vkPay.status"
  :query-payment-action="vkPay.queryPaymentAction"
  :return-url="vkPay.returnUrl"
></vk-uni-pay>
```
* 4、此时页面需要弹出一个确认支付的弹窗

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/e6cbafb2-bdaf-444a-bc15-7704a8b408ad.png)

* 5、用户点击已完成支付，则会请求云函数，云函数会请求微信支付服务器进行查询是否真的已付款。
* （其中第5步建议替换成请求你自己业务的订单查询云函数，云函数内查询订单是否已被异步回调处理成已付款）
* 6、若已付款，前端应该自己处理下付款成功后的页面展示逻辑。

#### 注意：
* 1、H5支付的域名需要在微信支付商户后台进行配置
* 2、H5支付的unicloud配置在 `uniCloud/cloudfunctions/common/uni-config-center/uni-pay/config.js` 的
```js
// 微信 - 手机外部浏览器H5支付
"wxConfigMweb": {
  "appId": "", // 可以是小程序的也可以是公众号的
  "secret": "", 
  "mchId": "", // 商户id
  "key": "", // 商户key
  "pfx": fs.readFileSync(__dirname+'/wxpay/wxpay.p12'),
  // 场景信息，必填
  "sceneInfo":{
    "h5_info":{
      "type": "Wap", // 此值固定Wap
      "wap_url": "https://www.xxxx.cn",// 你的H5首页地址，必须和你发起支付的页面的域名一致。
      "wap_name": "你的网站名称",// 你的H5网站名称
    }
  }
},
```
* 3、微信H5支付不支持在微信浏览器中支付（只能在非微信APP的浏览器中发起支付）（微信浏览器中只能用公众号支付）


## 微信公众号支付注意事项

* 1、h5的路由模式必须配置为 `history`，因为微信公众号登录的回调地址不支持 `hash` 模式。

* 2、微信公众号支付时，openid为必传参数，需要先获取用户的openid（网页授权）（一般你微信公众号登录的时候已经取到了）

获取openid的方法 [点击查看微信公众号文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

具体而言，获取openid流程分为两步：

* 1、访问授权页面，获取code

* 2、通过code换取openid

授权地址为：

`https://open.weixin.qq.com/connect/oauth2/authorize?appid=你公众号的appid&redirect_uri=你的回调地址&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`

注意：

redirect_uri（你的回调地址）不可以带参数，访问授权页面后，最终会返回你的回调地址页面，同时带上 `code` 参数，使用这个 `code` 参数即可获取 `openid`（注意 `code` 是一次性的）

拼接完授权地址url后，直接执行下面代码即可访问授权页面

```js
window.location.href = url;
```

其中 scope = snsapi_base时，为静默授权（无需用户点击同意）（但只能获取openid）

scope = snsapi_userinfo时，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。

#### 如何通过code换取openid?

**vkUtil在 `uni_modules/vk-uni-pay/js_sdk/vk-util.js`**

```js
vkUtil.getH5Openid(code).then((res) => {
  console.log("res", res);
});
```



#### 注意：
* 1、微信公众号支付的域名需要在微信支付商户后台进行配置

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/76a353e8-eb7f-4a83-8005-d3fa60ee9e46.png)

* 2、微信公众号支付的unicloud配置在 `uniCloud/cloudfunctions/common/uni-config-center/uni-pay/config.js` 的 `wxpay` 节点的 `h5-weixin`
```js
// 微信 - 公众号支付（微信支付申请JSAPI支付）
"h5-weixin": {
  "appId": "",
  "secret": "",
  "mchId": "",
  "key": "",
  "pfx": fs.readFileSync(__dirname + '/wxpay/wxpay.p12')
},
```
* 3、微信公众号支付只能在微信浏览器中支付（非微信APP的浏览器中无法发起支付，非微信APP的浏览器请使用H5支付）



## H5支付浏览器报跨域错误

* 进入 `unicloud` 控制台 [https://unicloud.dcloud.net.cn/home](https://unicloud.dcloud.net.cn/home)
* 点击跨域配置

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/045bbc8d-363e-4e1b-99e5-028b39e89eeb.png)

* 将你浏览器访问的域名加入安全域名中

如 将 `localhost:8080` `localhost:8081` `localhost:8082` `www.aaaa.com` 等加入安全域名

___你浏览器中访问的域名是什么，就加什么域名___


## 小程序体验版和正式版无法请求云函数

将以下域名加入小程序 `request` 合法域名（为了省事，可以两个都加了）

阿里云：https://api.bspapp.com;

腾讯云：https://tcb-api.tencentcloudapi.com;


- 1、 进入小程序后台 `https://mp.weixin.qq.com/wxamp/devprofile/get_profile` [点击前往](https://mp.weixin.qq.com/wxamp/devprofile/get_profile)

- 2、 点击 `开发管理` - `开发设置` - 服务器域名 点击 `修改`

- 3、 在 `request` 合法域名中添加域名。

___添加域名后还是无法请求?___

- 1、可能是缓存问题，删除微信APP里对应的小程序（清空缓存），微信开发者工具点下清空全部缓存，并重启微信开发者工具（点重新打开项目），最后重新上传体验版。

- 2、如果上面的清空缓存还是不行，则点击微信开发者工具右上角【详情】，把不校验合法域名前的勾去掉，尝试在微信开发者工具里访问云函数，此时会提示还有哪个域名没有加入白名单。

## APP支付签名失败？

APP支付必须打自定义基座，包名和签名等必须和开放平台上填写的一致，且开放平台上申请的应用必须已通过审核。


## 发起支付时提示：请先配置正确的异步回调URL

配置文件在 `cloudfunctions/common/uni-config-center/uni-pay/config.js`(没有则新建)

配置属性 `notifyUrl` 格式为 "服务空间SpaceID":"URL化完整地址"

如： 
```json
"notifyUrl": {
   "a4f90532-ac60-4a43-81c1-a5c4s3fbs66": "https://a4f90532-ac60-4a43-81c1-a5c4s3fbs66.bspapp.com/http/vk-pay",
}
```

[查看完整配置文件](https://vkdoc.fsq.pub/vk-uni-pay/config.html)

___如何获取服务空间SpaceID?___

* 进入 `unicloud` 控制台 [https://unicloud.dcloud.net.cn/home](https://unicloud.dcloud.net.cn/home)
* 这个就是

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/42a14023-1a36-4920-af40-89e8aef05d87.png)


___如何获取URL化完整地址___

* 进入 `unicloud` 控制台 [https://unicloud.dcloud.net.cn/home](https://unicloud.dcloud.net.cn/home)
* 进入对应的服务空间，点击左侧【云函数】-【函数列表】- 点击云函数 vk-pay 右边的 【详情】，在详情页即可看到url地址。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/5722777d-d636-4b8e-9db5-f9c5ceac6ee0.png)

## 微信支付的key密钥在哪里获取?

进入微信支付后台，点击账户中心 - API安全 - 设置APl2密钥 - 修改（密钥只能修改后才能查看）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/21b12172-ea0c-4f69-a064-2211a1fe149c.png)

## 报错：Cannot read property 'createPayment' of undefined

报错原因：支付组件没有正确加载，检查`uni_modules`下的`vk-uni-pay`是否包含`pages`。























<style scoped>
h1{
  font-size:1.4em;
}

h2{
  font-size:1.3em;
}

h3{
  font-size:1.1em;
}
</style>