# 微信小程序API

## 配置文件

打开 `uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json` 文件，配置里面的 

"mp-weixin" 微信小程序

app-plus" APP（需要用到APP登录才需要配置）

"h5-weixin" （需要用到公众号登录才需要配置）

```js
"app-plus": {
  "tokenExpiresIn": 604800,
  "oauth": {
    "weixin": {
      "appid": "",
      "appsecret": ""
    }
  }
},
"mp-weixin": {
  "oauth": {
    "weixin": {
      "appid": "",
      "appsecret": ""
    }
  }
},
"h5-weixin": {
  "oauth": {
    "weixin": {
      "appid": "",
      "appsecret": ""
    }
  }
},
```

配置完需要上传 `uni-config-center` 这个公共模块

## 1.1、授权相关API

### 获取token 
`vk.openapi.weixin.auth.getAccessToken` 
```js
/**
 * (带缓存,缓存1小时) 获取小程序全局唯一后台接口调用凭据（access_token）。调用绝大多数后台接口时都需使用 access_token，开发者需要进行妥善保存。
 * @param {String} appid 小程序APPID,默认使用config公共模块中的config.uni["mp-weixin"].oauth.weixin.appid
 * @param {String} appsecret 小程序appsecret,默认使用config公共模块中的config.uni["mp-weixin"].oauth.weixin.appsecret
 * @param {String} cache 默认true 使用缓存
 */
let access_token = await vk.openapi.weixin.auth.getAccessToken();

```

### code换取openid 
`vk.openapi.weixin.auth.code2Session`
```js
/**
 * 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。
 * @param {String} appid 小程序APPID,默认使用config公共模块中的config.uni["mp-weixin"].oauth.weixin.appid
 * @param {String} appsecret 小程序appsecret,默认使用config公共模块中的config.uni["mp-weixin"].oauth.weixin.appsecret
 * @param {String} js_code 登录时获取的 code
 */
let code2SessionRes = await vk.openapi.weixin.auth.code2Session({
  js_code : js_code
});
```
### 获取微信绑定的手机号
`vk.openapi.weixin.decrypt.getPhoneNumber`
```js
/**
 * 获取微信绑定的手机号
 * @param {String} appId 小程序APPID,默认使用config公共模块中的config.uni["mp-weixin"].oauth.weixin.appid
 * @param {String} encryptedData 加密数据
 * @param {String} iv 密钥1
 * @param {String} sessionKey 密钥2
 */
let getPhoneNumberRes = await vk.openapi.weixin.decrypt.getPhoneNumber({
  encryptedData,
  iv,
  sessionKey
});

```

### 获取小程序码
`vk.openapi.weixin.wxacode.getUnlimited`
```js

/**
 * 获取小程序码，适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制。 更多用法详见 获取二维码。
 * @param {String} access_token 默认自动获取,不需要传
 * @param {String} scene        最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
 * @param {String} page         必须是已经发布的小程序存在的页面（否则报错），例如 pages/index/index, 根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
 * @param {boolean} check_path  默认是true，检查page 是否存在，为 true 时 page 必须是已经发布的小程序存在的页面（否则报错）；为 false 时允许小程序未发布或者 page 不存在， 但page 有数量上限（60000个）请勿滥用。
 * @param {String} env_version  要打开的小程序版本。正式版为 "release"，体验版为 "trial"，开发版为 "develop"。默认是正式版。
 * @param {number} width        二维码的宽度，单位 px，最小 280px，最大 1280px
 * @param {boolean} auto_color  自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false
 * @param {Object} line_color   auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":0,"g":0,"b":0} 十进制表示
 * @param {boolean} is_hyaline  是否需要透明底色，为 true 时，生成透明底色的小程序 默认false
 */
let getUnlimitedRes = await vk.openapi.weixin.wxacode.getUnlimited({
  page: "pages/index/index",
  scene: "",
  check_path: false,
  env_version: "develop", // 要打开的小程序版本。正式版为 "release"，体验版为 "trial"，开发版为 "develop"。默认是正式版。
});

```

**注意：getUnlimited在执行成功后返回的是二进制，故在云函数中需要转换，完整代码如下**

```js
let getUnlimitedRes = await vk.openapi.weixin.wxacode.getUnlimited({
  page: "pages/index/index",
  scene: "",
  check_path: false,
  env_version: "develop", // 要打开的小程序版本。正式版为 "release"，体验版为 "trial"，开发版为 "develop"。默认是正式版。
});
if (typeof getUnlimitedRes === "object" && getUnlimitedRes.code) {
  return getUnlimitedRes;
}
try {
  // 二进制转base64
  let base64 = Buffer.from(getUnlimitedRes, 'binary').toString('base64')
  return {
    code: 0,
    base64: `data:image/png;base64,${base64}`
  };
} catch (err) {
  // 转base64失败
  return {
    code: -1,
    msg: "生成小程序码失败",
    err: {
      message: err.message,
      stack: err.stack
    }
  };
}
```


### 获取scheme码
`vk.openapi.weixin.urlscheme.generate`
```js
/**
 * 获取小程序scheme码
 * @param {String} access_token    默认自动获取,不需要传
 * @param {Object} jump_wxa        跳转到的目标小程序信息。
 * @param {boolean} is_expire      生成的scheme码类型，到期失效：true，永久有效：false。
 * @param {number} expire_type     默认值0，到期失效的 scheme 码失效类型，失效时间：0，失效间隔天数：1
 * @param {number} expire_time     到期失效的scheme码的失效时间，为Unix时间戳。生成的到期失效scheme码在该时间前有效。最长有效期为1年。生成到期失效的scheme时必填。
 * @param {number} expire_interval 到期失效的 scheme 码的失效间隔天数。生成的到期失效 scheme 码在该间隔时间到达前有效。最长间隔天数为365天。is_expire 为 true 且 expire_type 为 1 时必填
 * jump_wxa 的结构
 * @param {string} path            通过scheme码进入的小程序页面路径，必须是已经发布的小程序存在的页面，不可携带query。path为空时会跳转小程序主页。
 * @param {string} query           通过scheme码进入小程序时的query，最大1024个字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~
 * @param {String} env_version     要打开的小程序版本。正式版为 "release"，体验版为 "trial"，开发版为 "develop"。默认是正式版。
 * 返回结果
 * @return {String} openlink 
 */
let generateRes = await vk.openapi.weixin.urlscheme.generate({
  jump_wxa:{
    path: "pages/index/index",
    query: "a=1",
    env_version: "develop", // 要打开的小程序版本。正式版为 "release"，体验版为 "trial"，开发版为 "develop"。默认是正式版。
  },
  is_expire: true,
  iexpire_type: 1,
	expire_interval: 30, // 有效期30天
});
```


### 获取小程序URL链接
`vk.openapi.weixin.urllink.generate`
```js
/**
  * 获取小程序 URL Link，适用于短信、邮件、网页、微信内等拉起小程序的业务场景。通过该接口，可以选择生成到期失效和永久有效的小程序链接，有数量限制，目前仅针对国内非个人主体的小程序开放
 * @param {String} access_token      默认自动获取,不需要传
 * @param {String} path              通过 URL Link 进入的小程序页面路径，必须是已经发布的小程序存在的页面，不可携带 query 。path 为空时会跳转小程序主页
 * @param {string} query             通过 URL Link 进入小程序时的query，最大1024个字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~%
 * @param {boolean} is_expire        默认值false。生成的 URL Link 类型，到期失效：true，永久有效：false。注意，永久有效 Link 和有效时间超过180天的到期失效 Link 的总数上限为10万个，详见获取 URL Link，生成 Link 前请仔细确认。
 * @param {number} expire_type       默认值0.小程序 URL Link 失效类型，失效时间：0，失效间隔天数：1
 * @param {number} expire_time       到期失效的scheme码的失效时间，为Unix时间戳。生成的到期失效scheme码在该时间前有效。最长有效期为1年。生成到期失效的scheme时必填。
 * @param {number} expire_interval   到期失效的URL Link的失效间隔天数。生成的到期失效URL Link在该间隔时间到达前有效。最长间隔天数为365天。expire_type 为 1 必填
 * @param {object} cloud_base        云开发静态网站自定义 H5 配置参数，可配置中转的云开发 H5 页面。不填默认用官方 H5 页面
 * @param {string} env_version       默认值"release"。要打开的小程序版本。正式版为 "release"，体验版为"trial"，开发版为"develop"，仅在微信外打开时生效
 * 返回结果
 * @return {String} url_link 
 */
let generateRes = await vk.openapi.weixin.urllink.generate({
	path: "pages/index/index",
	query: "a=1&b=2",
	is_expire: true,
	expire_type: 1,
	expire_interval: 90, // 有效期90天
	env_version: "develop", // 要打开的小程序版本。正式版为 "release"，体验版为 "trial"，开发版为 "develop"。默认是正式版。
});
```

## 1.2、内容安全
### 检测文本是否违规
`vk.openapi.weixin.security.msgSecCheck`
```js
/**
 * 检查一段文本是否含有违法违规内容。
 * 频率限制：单个 appId 调用上限为 4000 次/分钟，2,000,000 次/天*
 * @param {String} access_token   默认自动获取,不需要传
 * @param {String} content        要检测的文本内容，长度不超过 500KB
 */
let msgSecCheckRes = await vk.openapi.weixin.security.msgSecCheck({
  content:content
});

```
### 检测图片是否违规
`vk.openapi.weixin.security.imgSecCheck`
```js
/**
 * 校验一张图片是否含有违法违规内容。
 * 频率限制：单个 appId 调用上限为 2000 次/分钟，200,000 次/天 （ 图片大小限制：1M **）
 * @param {String} access_token   默认自动获取,不需要传
 * @param {String} base64         要检测的图片文件base64，图片尺寸不超过 750px x 1334px
 */
let imgSecCheckRes = await vk.openapi.weixin.security.imgSecCheck({
  base64:base64
});
```
## 1.3、发送消息

### 发送订阅消息 
`vk.openapi.weixin.subscribeMessage.send`
```js
/**
 * 发送订阅消息
 * @param {String} touser             接收者（用户）的 openid
 * @param {String} template_id        所需下发的订阅模板id
 * @param {String} page               点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
 * @param {String} data               模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
 * @param {String} miniprogram_state  跳转小程序类型：developer为开发版；trial为体验版；formal为正式版；默认为正式版
 */
let sendRes = await vk.openapi.weixin.subscribeMessage.send({
  touser : openid,
  template_id : "订阅模板ID",
  page : "pages/index/index",
  data : {
    character_string1:{
      value:"202103040830158485629163994677"
    },
    name2:{
      value:"中通快递"
    },
    character_string3:{
      value:"ZT2015215125352511"
    },
    thing6:{
      value:"雪花秀滋盈生人生焕颜精华露"
    },
    thing8:{
      value:"杭州市xxxxxxxxx号"
    }
  },
  miniprogram_state : "formal",
});

// 注意
// 发送订阅消息需要用户先在小程序前端点击订阅，且订阅是一次性的，发第二次消息需要再次订阅。
uni.requestSubscribeMessage({
  tmplIds: ['订阅模板ID'],
});
```

注意：订阅消息发送的每个字段值是有严格限制的，具体限制 [点击查看](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html)
并阅读其 `订阅消息参数值内容限制说明`

如果发送失败，可以在云函数内打印下 `sendRes` 的值，并根据返回的 `code` 进行判断错在哪里。


| 值   | 说明                                    |
|------- |---------------------------------------|
| 40003  |   touser字段openid为空或者不正确    | 
| 40037  |   订阅模板id为空不正确    |
| 43101  |   用户拒绝接受消息，如果用户之前曾经订阅过，则表示用户取消了订阅关系    |
| 47003  |   模板参数不准确，可能为空或者不满足规则，errmsg会提示具体是哪个字段出错	    |
| 41030  |   page路径不正确，需要保证在现网版本小程序中存在，与app.json保持一致    |

### 小程序转公众号模板消息
`vk.openapi.weixin.uniformMessage.send`

**该接口亮点：可以用小程序的 openid 来发送公众号的模板消息（用户只需关注公众号，无需点击订阅消息）**

**请求参数**

| 参数   | 类型    |说明                                    |
|------- |--------|------------------------------------|
| touser  | String |  接收者（用户）的 openid（可以是小程序下的openid，也可以是公众号下的openid）   | 
| template_id  |String |    所需下发的消息模板id    |
| url  |  String |  跳转网页时填写 |
| miniprogram  |Object |    跳转小程序时填写	    |
| data  | Object |  模板内容    |

```js
/**
 * 发送公众号模板消息
 * @param {String} touser             接收者（用户）的 openid（可以是小程序下的openid，也可以是公众号下的openid）
 * @param {String} template_id        所需下发的消息模板id
 * @param {String} url                跳转网页时填写
 * @param {Object} miniprogram  			跳转小程序时填写
 * @param {Object} data               模板内容
 */
let sendRes = await vk.openapi.weixin.uniformMessage.send({
  touser: "", // 接收者（用户）的 openid（可以是小程序下的openid，也可以是公众号下的openid）
  template_id: "", // 所需下发的订阅模板id
  url: "https://www.baidu.com", // 跳转网页时填写（如填了miniprogram参数则自动忽略url参数）
  miniprogram: {
    appid: "", // 需要跳转的小程序appid
    path: "pages/order/order?id=aaa", // 需要跳转的小程序页面
  },
  data: {
    "first": {
      "value": "您购买的订单已经发货啦，正快马加鞭向您飞奔而去。",
      "color": "#173177"
    },
    "keyword1": {
      "value": "D201803111235825",
      "color": "#173177"
    },
    "keyword2": {
      "value": "2018-03-11 19:56",
      "color": "#173177"
    },
    "keyword3": {
      "value": "顺丰快递",
      "color": "#173177"
    },
    "keyword4": {
      "value": "980456952123",
      "color": "#173177"
    },
    "keyword5": {
      "value": "王先生 135xxxxxxxx 广东省深圳市龙华区建设东路",
      "color": "#173177"
    },
    "remark": {
      "value": "欢迎再次购买！",
      "color": "#173177"
    }
  }
});

```

**注意：公众号和小程序无需绑定在同一个开放平台下，但需要同时满足下面的3个要求。**

* 1、公众号必须和小程序是同主体。
* 2、小程序关联了公众号。
* 3、该用户关注了公众号。

如果发送失败，可以在云函数内打印下 `sendRes` 的值，并根据返回的 `code` 进行判断错在哪里。

| 值   | 说明                                    |
|------- |---------------------------------------|
| 40003  |   touser字段openid为空或者不正确    | 
| 40037  |   模板id不正确   |
| 45009  |   接口调用超过限额  |
| 40013  |   不符合绑定关系要求   |


### 单独公众号模板消息
`vk.openapi.weixin.h5.templateMessage.send`

该接口与 `vk.openapi.weixin.uniformMessage.send` 的区别是

* 1、templateMessage 只需配置公众号的配置，而 uniformMessage 需要同时配置小程序+公众号的配置。（在uni-id的配置文件中配置）
* 2、templateMessage 的 touser 参数只能是公众号下的openid，而 uniformMessage 可以是小程序下的openid，也可以是公众号下的openid）

**请求参数**

| 参数   | 类型    |说明                                    |
|------- |--------|------------------------------------|
| touser  | String |  接收者（用户）的 openid（只能是公众号下的openid）   | 
| template_id  |String |    所需下发的消息模板id    |
| url  |  String |  跳转网页时填写 |
| miniprogram  |Object |    跳转小程序时填写	    |
| data  | Object |  模板内容    |

```js
/**
 * 发送公众号模板消息
 * @param {String} touser             接收者（用户）的 openid（只能是公众号下的openid）
 * @param {String} template_id        所需下发的消息模板id
 * @param {String} url                跳转网页时填写
 * @param {Object} miniprogram  			跳转小程序时填写
 * @param {Object} data               模板内容
 */
let sendRes = await vk.openapi.weixin.h5.templateMessage.send({
  touser: "", // 接收者（用户）的 openid（只能是公众号下的openid）
  template_id: "", // 所需下发的订阅模板id
  url: "https://www.baidu.com", // 跳转网页时填写（如填了miniprogram参数则自动忽略url参数）
  miniprogram: {
    appid: "", // 需要跳转的小程序appid
    path: "pages/order/order?id=aaa", // 需要跳转的小程序页面
  },
  data: {
    "first": {
      "value": "您购买的订单已经发货啦，正快马加鞭向您飞奔而去。",
      "color": "#173177"
    },
    "keyword1": {
      "value": "D201803111235825",
      "color": "#173177"
    },
    "keyword2": {
      "value": "2018-03-11 19:56",
      "color": "#173177"
    },
    "keyword3": {
      "value": "顺丰快递",
      "color": "#173177"
    },
    "keyword4": {
      "value": "980456952123",
      "color": "#173177"
    },
    "keyword5": {
      "value": "王先生 135xxxxxxxx 广东省深圳市龙华区建设东路",
      "color": "#173177"
    },
    "remark": {
      "value": "欢迎再次购买！",
      "color": "#173177"
    }
  }
});

```

**注意：公众号和小程序无需绑定在同一个开放平台下，但需要同时满足下面的3个要求。**

* 1、公众号必须和小程序是同主体。
* 2、小程序关联了公众号。
* 3、该用户关注了公众号。

如果发送失败，可以在云函数内打印下 `sendRes` 的值，并根据返回的 `code` 进行判断错在哪里。

| 值   | 说明                                    |
|------- |---------------------------------------|
| 40003  |   touser字段openid为空或者不正确    | 
| 40037  |   模板id不正确   |
| 45009  |   接口调用超过限额  |
| 40013  |   不符合绑定关系要求   |

## 1.4、直播

### 获取直播间列表 
`vk.openapi.weixin.livebroadcast.getLiveInfo`
```js
/**
 * 获取直播间列表
 * @params {Number} pageIndex 第几页
 * @params {Number} pageSize  每页显示数量
 */
let getLiveInfoRes = await vk.openapi.weixin.livebroadcast.getLiveInfo({
  pageIndex : 1,
  pageSize : 100,
});
```


## 微信小程序万能API调用接口

**如果以上API不能满足你的需求，你可以使用这个万能API**

```js
let requestRes = await vk.openapi.weixin.request({
  method: "GET",
  url: "wxaapi/newtmpl/gettemplate",
  data: {

  }
});
```

**请求参数**

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| method           | 请求模式，分为GET和POST（不区分大小写）  | String | POST   | GET |
| url           | 微信接口路径         | String | -   | - |
| data           | 请求数据         | Object | -   | - |


**url参数详解**

以 `获取小程序 URL Link` 为例

**请求地址**

`POST` https://api.weixin.qq.com/`wxa/generate_urllink`?access_token=ACCESS_TOKEN

`method` 为 `POST`

`url` 为 `wxa/generate_urllink`

**最终代码**

```js
let requestRes = await vk.openapi.weixin.request({
  method: "POST",
  url: "wxa/generate_urllink",
  data: {
    path: "pages/index/index"
  }
});
```


**公共返回参数**

| 参数             | 说明                           | 类型    | 
|------------------|-------------------------------|---------|
| code           | 0代表成功，其他均为失败           | Number | 
| msg           | 失败时的提示内容           | String | 

其他返回参数参考微信小程序服务端API文档 [传送门](https://developers.weixin.qq.com/miniprogram/dev/api-backend/)
