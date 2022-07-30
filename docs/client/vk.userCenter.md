# vk.userCenter 用户中心 API

**仅限前端使用，云函数中无法使用**

**NVUE特别注意**

如果你的页面是 `nvue` 页面，则无法直接使用 `vk`，需用 `uni.vk` 代替。

**支付宝、抖音 小程序特别注意**

在 `js` 中需用 `uni.vk` 代替 `vk`。

## 公共请求参数

| 参数   | 说明       | 类型    | 
|------- |-----------|---------|
| data    |  发送到云函数的参数数据  | Object  |
| title    |  遮罩层提示语，为空或不传则代表不显示遮罩层。   | String  |
| loading    |  自定义loading [查看详情](#loading) | Boolean、Object  |
| needAlert     | 为true代表请求错误时，会有alert弹窗提示 | Boolean  | true | false |
| success       | 请求成功时，执行的回调函数 | Function  | - | - |
| fail          | 请求失败时，执行的回调函数 | Function  | - | - |
| complete      | 无论请求成功与否，都会执行的回调函数 | Function  | - | - |

### loading

loading 参数详细说明

* 若 `loading` 的值为 `false`，则不显示默认遮罩层提示语

* 若 `loading` 的值为 `true` ，则不显示默认遮罩层提示语，同时在请求时，会自动设置页面变量 `loading=true` ，请求完成时，自动设置页面变量 `loading=false`

* 若 `loading` 的值类型为 `Object`，如下方代码效果是：请求时，会自动执行 `this.loading2=true` ，请求完成时，会自动执行 `this.loading2=false`

```js
loading:{ that:this, name:"loading2"}
```

* name 支持. 如下方代码效果是：请求时，会自动执行 `this.page.loading=true` ，请求完成时，会自动执行 `this.page.loading=false`

```js
loading:{ that:this, name:"page.loading"}
```


## 公共返回信息

| 参数   | 说明       | 类型    | 
|------- |-----------|---------|
| code    |  错误码    | Number  |
| msg  |   错误提示    | String  |

## 通用

### vk.userCenter.register（注册）

用户名+密码

___框架会自动保存 `token`，无需你再手动去保存。___

[查看token介绍](#token介绍) 

```js
/**
 * 用户注册(用户名+密码)
 * data 请求参数 说明
 * @param {String} username 用户名
 * @param {String} password 密码
 * res 返回参数说明
 * @param {String} token 注册完成自动登录之后返回的token信息
 * @param {String} tokenExpired token过期时间
 * @param {Object} userInfo 用户信息
 * @param {String} uid 用户ID
 */
vk.userCenter.register({
  data: {
    username: "",
    password: ""
  },
  success: (data) => {
    // 注册成功后的逻辑

  }
});
```

### vk.userCenter.login（登录）

用户名+密码

___框架会自动保存 `token`，无需你再手动去保存。___

[查看token介绍](#token介绍) 

```js
/**
 * 用户登陆(用户名+密码)
 * data 请求参数 说明
 * @param {String} username 用户名
 * @param {String} password 密码
 * res 返回参数说明
 * @param {String} token 注册完成自动登录之后返回的token信息
 * @param {String} tokenExpired token过期时间
 * @param {Object} userInfo 用户信息
 * @param {String} uid 用户ID
 */
vk.userCenter.login({
  data: {
    username: "",
    password: ""
  },
  success: (data) => {
    // 登录成功后的逻辑

  }
});
```

### vk.userCenter.updatePwd（修改密码）

```js
/**
 * 修改密码
 * @description 修改成功后，需要重新登录获取新的token
 * data 请求参数 说明
 * @param {String} oldPassword 旧密码
 * @param {String} newPassword 新密码
 */
vk.userCenter.updatePwd({
  data: {
    oldPassword: "123456",
    newPassword: "654321",
    password_confirmation: "654321"
  },
  success: (data) => {
    // 修改成功后的逻辑

  }
});
```

### vk.userCenter.logout（登出）

```js
/**
 * 登出(退出)
 */
vk.userCenter.logout({
  success: (data) => {
    // 退出登录成功后的逻辑

  }
});
```


### vk.userCenter.resetPwd（重置密码）

```js
/**
 * 重置密码
 * data 请求参数 说明
 * @param {String} password 重置后的密码
 */
vk.userCenter.resetPwd({
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.setAvatar（设置头像）

```js
/**
 * 设置头像
 * data 请求参数 说明
 * @param {String} avatar 头像地址
 * @param {Boolean} deleteOldFile 是否同时删除云储存内的头像文件
 */
vk.userCenter.setAvatar({
  data: {
    avatar: "https://www.aa.com/1.jpg"
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.updateUser（设置昵称等）

```js
/**
 * 设置昵称等用户展示的个人信息
 * data 请求参数 说明
 * @param {String} nickname 昵称
 * @param {String} avatar 头像
 * @param {Number} gender 性别
 */
vk.userCenter.updateUser({
  data: {
    nickname: "剑圣李白",
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.getCurrentUserInfo（取用户信息）

```js
/**
 * 获取用户最新信息
 * res 返回参数说明
 * @param {Object} userInfo 用户信息
 */
vk.userCenter.getCurrentUserInfo({
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.checkToken（token云端校验）

**注意：实际开发过程中，无需你主动执行这个api来判断用户tokne是否有效**

[查看token介绍](#token介绍) 

```js
/**
 * token校验
 * res 返回参数说明
 * @param {String} uid 当前token对应的用户uid
 * @param {Object} userInfo 当前用户信息
 * @param {Array} role 当前用户角色
 * @param {Array} permission 当前用户权限
 */
vk.userCenter.checkToken({
  success: (data) => {
    // 成功后的逻辑
    
  }
});
```

### vk.checkToken（token本地校验）

**此api无网络请求，无延迟**

前端校验原理（宽松模式）：只判断token是否存在，且未过期（不解密token内容）（对前端来说，token存在且未过期，就代表用户已经登录）

云端校验原理（严格模式）：解密token内容，判断token真实性，获得uid，并判断是否过期

**你无需担心本地校验用户会伪造的可能，因为用户只要请求云函数，云端最终还会再校验一遍的**

[查看token介绍](#token介绍) 

```js
if (!vk.checkToken()) {
  // token无效
  
} else {
  // token有效
  
}
```

```js
if (vk.checkToken()) {
  // token有效
  
}
```

```js
if (!vk.checkToken()) {
  // token无效
  return false;
}
// token有效

```


## 手机号

### vk.userCenter.bindMobile（绑定手机）
 
```js
/**
 * 绑定手机号
 * data 请求参数 说明
 * @param {String} mobile 手机号
 * @param {String} code 手机收到的验证码
 */
vk.userCenter.bindMobile({
  data: {
    mobile: '',
    code: '',
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.unbindMobile（解绑手机）

```js
/**
 * 绑定手机号
 * data 请求参数 说明
 * @param {String} mobile 手机号
 * @param {String} code 手机收到的验证码
 */
vk.userCenter.unbindMobile({
  data: {
    mobile: '',
    code: '',
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.bindNewMobile（换绑手机号）

```js
/**
 * 绑定新的手机号（换绑手机号）
 * data 请求参数 说明
 * @param {String} oldMobile 旧手机号码
 * @param {String} oldMobileCode 旧手机收到的验证码
 * @param {String} mobile 新手机号码
 * @param {String} code 新手机收到的验证码
 * res 返回参数说明
 * @param {Number} code 错误码，0表示成功
 * @param {String} msg 详细信息
 */
vk.userCenter.bindNewMobile({
  data: {
    oldMobile: '',
    oldMobileCode: '',
    mobile: '',
    code: '',
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.loginBySms（手机号登录）

___框架会自动保存 `token`，无需你再手动去保存。___

[查看token介绍](#token介绍) 

```js
/**
 * 手机号登录(手机号+手机验证码)
 * data 请求参数 说明
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * res 返回参数说明
 * @param {String} token 注册完成自动登录之后返回的token信息
 * @param {String} tokenExpired token过期时间
 */
vk.userCenter.loginBySms({
  data: {
    mobile: '',
    code: '',
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.sendSmsCode（发送手机号验证码）

```js
/**
 * 发送手机号验证码
 * data 请求参数 说明
 * @param {String} mobile 手机号
 * @param {String} type  验证码类型
 * res 返回参数说明
 * @param {Object} requestRes 原始返回数据
 * @param {Object} requestParam 包含服务供应商和发送的手机号
 */
vk.userCenter.sendSmsCode({
  data: {
    mobile: '',
    type: 'login',
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.resetPasswordByMobile（根据手机验证码重置账号密码）

```js
/**
 * 根据手机验证码重置账号密码
 * data 请求参数 说明
 * @param {String} password 重置后的密码
 * @param {String} code 验证码
 * @param {String} mobile 手机号
 */
vk.userCenter.resetPasswordByMobile({
  data: {
    password: "123456",
    code: "",
    mobile: ""
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.loginByUniverify（手机一键登录）

只有 `APP` 端可以用

___框架会自动保存 `token`，无需你再手动去保存。___

[查看token介绍](#token介绍) 

```js
/**
 * APP端 手机一键登录
 * data 请求参数 说明
 * @param {String} type 							指定操作类型，可选值为login、register，不传此参数时表现为手机号已注册则登录，手机号未注册则进行注册
 * @param {String} password 					密码，type为register时生效
 * @param {String} inviteCode 				邀请人的邀请码，type为register时生效
 * @param {String} access_token 			uni.login登录成功后，返回的access_token参数（此参数自动获取，无需填写）
 * @param {String} openid 						uni.login登录成功后，返回的openid参数（此参数自动获取，无需填写）
 * @param {String} myInviteCode 			设置当前注册用户自己的邀请码，type为register时生效（此参数自动生成，无需填写）
 * res 返回参数说明
 * @param {Number} code			错误码，0表示成功
 * @param {String} msg			详细信息
 * @param {String} uid 			当前token对应的用户uid
 * @param {String} type			操作类型，login为登录、register为注册
 * @param {String} mobile		登录者手机号
 * @param {String} userInfo	用户全部信息
 * @param {String} token			登录成功之后返回的token信息
 * @param {String} tokenExpired		token过期时间
 */
vk.userCenter.loginByUniverify({
  // 更多配置请查看 https://uniapp.dcloud.io/univerify
  univerifyStyle: {
    "fullScreen": true, // 是否全屏显示(hbx3.1.5起支持全屏)，true表示全屏模式，false表示非全屏模式，默认值为false。
    "backgroundColor": "#f5f5f5", // 授权页面背景颜色，默认值：#ffffff
    "authButton": {
      "normalColor": "#19be6b", // 授权按钮正常状态背景颜色 默认值：#3479f5
      "highlightColor": "#18b566", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
      "disabledColor": "#71d5a1", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
      "textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff
      "title": "本机号码一键登录" // 授权按钮文案 默认值：“本机号码一键登录”
    },
    "privacyTerms": {
      "suffix": "使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”
      "termsColor": "#555555"
    }
  },
  data: {

  },
  success: (data) => {
    uni.closeAuthView();
    setTimeout(() => {
      vk.alert(data.msg);
    }, 300);
  },
  fail: (res) => {
    uni.closeAuthView();
  }
});
```

## 邮箱

### vk.userCenter.bindEmail（绑定邮箱）

```js
/**
 * 绑定邮箱
 * data 请求参数 说明
 * @param {String} email 邮箱
 * @param {String} code  邮箱收到的验证码
 */
vk.userCenter.bindEmail({
  data: {
    email: '',
    code: '',
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.unbindEmail（解绑邮箱）

```js
/**
 * 解绑邮箱
 * @param {String} email 邮箱
 * @param {String} code  邮箱收到的验证码
 */
vk.userCenter.unbindEmail({
  data: {
    email: '',
    code: '',
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.bindNewEmail（换绑邮箱）

```js
/**
 * 绑定新的邮箱（换绑邮箱）
 * @param {String} oldEmail 旧邮箱码
 * @param {String} oldEmailCode 旧邮箱收到的验证码
 * @param {String} email 新邮箱码
 * @param {String} code 新邮箱收到的验证码
 */
vk.userCenter.bindNewEmail({
  data: {
    oldEmail: '',
    oldEmailCode: '',
    email: '',
    code: '',
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.loginByEmail（邮箱登录）

___框架会自动保存 `token`，无需你再手动去保存。___

[查看token介绍](#token介绍) 

```js
/**
 * 邮箱登录(邮箱+邮箱验证码)
 * data 请求参数 说明
 * @param {String} email 邮箱
 * @param {String} code  邮箱收到的验证码
 * res 返回参数说明
 * @param {String} token 注册完成自动登录之后返回的token信息
 * @param {String} tokenExpired token过期时间
 */
vk.userCenter.loginByEmail({
  data: {
    email: '',
    code: '',
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.sendEmailCode（发送邮件验证码）

```js
/**
 * 发送邮件验证码
 * data 请求参数 说明
 * @param {String} email 邮箱
 * @param {String} type  验证码类型
 * res 返回参数说明
 * @param {String} email 邮箱
 * @param {String} verifyCode 验证码
 */
vk.userCenter.sendEmailCode({
  data: {
    email: '',
    type: 'login',
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.resetPasswordByEmail（根据邮箱证码重置账号密码）

```js
/**
 * 根据邮箱证码重置账号密码
 * data 请求参数 说明
 * @param {String} password 重置后的密码
 * @param {String} code 验证码
 * @param {String} email 邮箱号码
 */
vk.userCenter.resetPasswordByEmail({
  data: {
    password: "123456",
    code: "",
    email: ""
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

## 微信

### vk.userCenter.loginByWeixin（微信登录）

___框架会自动保存 `token`，无需你再手动去保存。___

[查看token介绍](#token介绍) 

注意：

微信小程序登录配置

* 配置 `common/uni-config-center/uni-id/config.json` 内 `mp-weixin` 的 `appid` 和 `appsecret`
* 在 `manifest.json` 内配置微信小程序的 `appid`

APP登录配置

* 在 `manifest.json` 的APP模块配置微信登录用 `appid`
* 打包并使用自定义基座（注意一定要在 `manifest.json` 填写微信 `appid` 后再制作自定义基座）[自定义基座使用说明](https://ask.dcloud.net.cn/article/35115)
* 配置 `common/uni-config-center/uni-id/config.json` 内 `app-plus.oauth.weixin` 的 `appid` 和 `appsecret`

微信公众号H5登录配置

* 配置 `common/uni-config-center/uni-id/config.json` 内 `h5-weixin` 的 `appid` 和 `appsecret`

**注意：h5的路由模式必须配置为 `history`，因为微信公众号登录的回调地址不支持 `hash` 模式。**

```js
/**
 * 用户登录(微信授权)
 * @description 用户登录(微信授权)
 * data 请求参数 说明
 * @param {String} type 可传login或register，若为login：则不存在不会自动注册，若为register，则用户存在会报错，不传，则存在自动登录，不存在，则注册。
 * res 返回参数说明
 * @param {String} token 登录成功之后返回的token信息
 * @param {String} tokenExpired token过期时间
 */
vk.userCenter.loginByWeixin({
  data: {
    type: ""
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.code2SessionWeixin（获取微信openid）

```js
/**
 * 获取微信openid
 * res 返回参数说明
 * @param {String} openid 用户openid
 * @param {String} unionid 用户unionid，可以取到此值时返回
 * @param {String} sessionKey 客户端为微信小程序时返回
 * @param {String} accessToken 客户端为APP时返回
 * @param {String} expiresIn 客户端为APP时返回，accessToken 接口调用凭证超时时间，单位（秒）
 * @param {String} refreshToken 客户端为APP时返回，用于刷新accessToken
 */
vk.userCenter.code2SessionWeixin({
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.bindWeixin（绑定微信）

```js
/**
 * 绑定微信
 */
vk.userCenter.bindWeixin({
  success: (data) => {
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.unbindWeixin（解绑微信）

```js
/**
 * 解绑微信
 */
vk.userCenter.unbindWeixin({
  success: (data) => {
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.getPhoneNumber（获取微信绑定的手机号）

```html
<button type="default" open-type="getPhoneNumber"  @getphonenumber="getPhoneNumber">获取微信绑定的手机号</button>
```

```js
// 需要先在onLoad内执行此函数
vk.userCenter.code2SessionWeixin({
  data: {
    needCache: true
  },
  success: (data) => {
    this.sessionKey = data.sessionKey;
  }
});
```
        
```js
// 获取微信绑定的手机号码
getPhoneNumber(e) {
  let { encryptedData, iv } = e.detail;
  if (!encryptedData || !iv) {
    return false;
  }
  vk.userCenter.getPhoneNumber({
    data: {
      encryptedData,
      iv,
      sessionKey: this.sessionKey
    },
    success: (data) => {
      vk.alert("手机号:" + data.phone);
    }
  });
},
```

### vk.userCenter.loginByWeixinPhoneNumber（通过微信小程序绑定的手机号登录）

```html
<button type="default" open-type="getPhoneNumber"  @getphonenumber="loginByWeixinPhoneNumber">使用微信绑定的手机号登录/注册</button>
```

```js
// 需要先在onLoad内执行此函数
vk.userCenter.code2SessionWeixin({
  data: {
    needCache: true
  },
  success: (data) => {
    this.sessionKey = data.sessionKey;
  }
});
```
        
```js
// 使用微信绑定的手机号登录/注册
loginByWeixinPhoneNumber(e) {
  let { encryptedData, iv } = e.detail;
  if (!encryptedData || !iv) {
    return false;
  }
  vk.userCenter.loginByWeixinPhoneNumber({
    data: {
      encryptedData,
      iv,
      sessionKey: this.sessionKey
    },
    success: (data) => {
      // 成功后的逻辑

    }
  });
},
```

### vk.userCenter.getWeixinMPqrcode（生成微信小程序码）

```js
/**
 * 生成微信小程序码
 * @param {String} scene        自定义参数最大32个可见字符 只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~
 * @param {String} page         必须是已经发布的小程序存在的页面（否则报错），例如 pages/index/index, 根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
 * @param {boolean} check_path  默认是true，检查page 是否存在，为 true 时 page 必须是已经发布的小程序存在的页面（否则报错）；为 false 时允许小程序未发布或者 page 不存在， 但page 有数量上限（60000个）请勿滥用。
 * @param {String} env_version  要打开的小程序版本。正式版为 "release"，体验版为 "trial"，开发版为 "develop"。默认是正式版。
 * @param {number} width        二维码的宽度，单位 px，最小 280px，最大 1280px
 * @param {boolean} auto_color  自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false
 * @param {Object} line_color   auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
 * @param {boolean} is_hyaline  是否需要透明底色，为 true 时，生成透明底色的小程序
 */
vk.userCenter.getWeixinMPqrcode({
  data: {
    page: "pages/index/index",
    scene: "a=1&b=2",
    check_path: false,
    env_version: "release", // 默认值"release"。要打开的小程序版本。正式版为 "release"，体验版为"trial"，开发版为"develop"，仅在微信外打开时生效。
  },
  success:(data) =>{
    console.log("imageUrl", data.base64)
  }
});
```

### vk.userCenter.getWeixinMPscheme（生成微信小程序scheme码）

```js
/**
 * 生成微信小程序scheme码
 * data 请求参数 说明
 * @param {String} path    小程序页面路径
 * @param {String} query   小程序页面参数
 */
vk.userCenter.getWeixinMPscheme({
  data: {
    query: "a=1&b=2",
    path: "pages/index/index",
    env_version: "release", // 默认值"release"。要打开的小程序版本。正式版为 "release"，体验版为"trial"，开发版为"develop"，仅在微信外打开时生效。
  },
  success: (data) => {
    console.log("url", data.openlink)
  }
});
```


### vk.userCenter.getWeixinMPurl（生成微信小程序url链接）

```js
/**
 * 生成微信小程序scheme码
 * data 请求参数 说明
 * @param {String} path    小程序页面路径
 * @param {String} query   小程序页面参数
 */
vk.userCenter.getWeixinMPurl({
  data: {
    path: "pages/index/index",
    query: "a=1&b=2",
    env_version: "release", // 默认值"release"。要打开的小程序版本。正式版为 "release"，体验版为"trial"，开发版为"develop"，仅在微信外打开时生效。
  },
  success:(data) =>{
    console.log("url", data.url_link)
  }
});
```

## 支付宝

### vk.userCenter.loginByAlipay（支付宝登录）

___框架会自动保存 `token`，无需你再手动去保存。___

[查看token介绍](#token介绍) 

注意：

* 需要在 `common/uni-config-center/uni-id/config.json` 内支付宝平台下配置 `appid`和 `privateKey`（应用私钥）

```js
/**
 * 支付宝登录
 * data 请求参数 说明
 * @param {String} type 可传login或register，若为login：则不存在不会自动注册，若为register，则用户存在会报错，不传，则存在自动登录，不存在，则注册。
 * res 返回参数说明
 * @param {String} token 登录成功之后返回的token信息
 * @param {String} tokenExpired token过期时间
 */
vk.userCenter.loginByAlipay({
  data: {
    type: ""
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### vk.userCenter.code2SessionAlipay（获取支付宝openid）

```js
/**
 * 获取支付宝openid
 * res 返回参数说明
 * @param {String} openid 用户openid
 * @param {String} accessToken 客户端为APP时返回
 * @param {String} expiresIn 客户端为APP时返回，accessToken 接口调用凭证超时时间，单位（秒）
 * @param {String} refreshToken 客户端为APP时返回，用于刷新accessToken
 * @param {String} reExpiresIn refreshToken超时时间，单位（秒）
 */
vk.userCenter.code2SessionAlipay({
  success: (data) => {
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.bindAlipay（绑定支付宝）

```js
/**
 * 绑定支付宝
 */
vk.userCenter.bindAlipay({
  success: (data) => {
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.unbindAlipay（解绑支付宝）

```js
/**
 * 解绑支付宝
 */
vk.userCenter.unbindAlipay({
  success: (data) => {
    // 成功后的逻辑
    
  }
});
```

## QQ

### vk.userCenter.loginByQQ（QQ登录）

目前仅支持app和小程序的qq登录

___框架会自动保存 `token`，无需你再手动去保存。___

[查看token介绍](#token介绍) 

注意：

QQ小程序登录配置

* 配置 `common/uni-config-center/uni-id/config.json` 内 `mp-qq` 的 `appid` 和 `appsecret`
* 在 `manifest.json` 内配置QQ小程序的 `appid`

APP登录配置

* 在 `manifest.json` 的APP模块配置QQ登录用 `appid`
* 打包并使用自定义基座（注意一定要在 `manifest.json` 填写QQ `appid` 后再制作自定义基座）[自定义基座使用说明](https://ask.dcloud.net.cn/article/35115)
* 配置 `common/uni-config-center/uni-id/config.json` 内 `app-plus.oauth.qq` 的 `appid` 和 `appsecret`

```js
/**
 * QQ登录
 * data 请求参数 说明
 * @param {String} type 可传login或register，若为login：则不存在不会自动注册，若为register，则用户存在会报错，不传，则存在自动登录，不存在，则注册。
 * res 返回参数说明
 * @param {String} token 登录成功之后返回的token信息
 * @param {String} tokenExpired token过期时间
 */
vk.userCenter.loginByQQ({
  data: {
    type: ""
  },
  success: (data) => {
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.bindQQ（绑定QQ）

```js
/**
 * 绑定QQ
 */
vk.userCenter.bindQQ({
  success: (data) => {
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.unbindQQ（解绑QQ）

```js
/**
 * 解绑QQ
 */
vk.userCenter.unbindQQ({
  success: (data) => {
    // 成功后的逻辑
    
  }
});
```


## 裂变分销

### vk.userCenter.setUserInviteCode（设置邀请码）

```js
/**
 * 设置用户邀请码(自动生成)
 * @description 针对未生成邀请码的用户使用此方法生成邀请码(自动生成)
 * res 返回参数说明
 * @param {String} myInviteCode 最终设置的邀请码
 */
vk.userCenter.setUserInviteCode({
  success: (data) => {
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.acceptInvite（用户接受邀请）

```js
/**
 * 用户接受邀请
 * @description 此接口用于在注册之后再填写邀请码的场景，多数情况下不会用到此接口而是在注册时填写邀请码
 * data 请求参数 说明
 * @param {String} inviteCode 邀请人的邀请码
 */
vk.userCenter.acceptInvite({
  data: {
    inviteCode :""
  },
  success: (data) => {
    // 成功后的逻辑
    
  }
});
```

### vk.userCenter.getInvitedUser（获取接受邀请的用户列表）

```js
/**
 * 获取接受邀请的用户清单
 * data 请求参数 说明
 * @param {Number}         pageIndex 当前页码
 * @param {Number}         pageSize  每页显示数量
 * @param {Array<Object>}  sortRule  排序规则
 * @param {object}         formData  查询条件数据源
 * @param {Array<Object>}  columns   查询条件规则
 */
vk.userCenter.getInvitedUser({
  data: {
    pageIndex: 1,
    pageSize: 100
  },
  success: (data) => {
    // 成功后的逻辑

  }
});
```

### token介绍

以下仅为介绍 `token`，实际开发过程中，即使你不了解 `token` 的实现逻辑，也不影响你开发项目（框架已经处理完token的逻辑）。

* 云函数通过 `token` 作为识别用户的令牌

* 当用户登录成功后，云函数会返回 `token` 给前端，前端会自动将 `token` 保存到本地缓存。

* 在客户端，`token的值` 存在 `localStorage` 的 `uni_id_token` 键值中，`token的过期时间` 存在 `uni_id_token_expired` 键值中。

* 在云函数端，`token` 存在 `uni-id-users` 表的 `token` 字段中，云函数端解密 `token` 可以获得 `用户ID` 和 `过期时间`

* 当你访问需要登录的函数时，框架会自动检测token是否有效，有效则放行，无效则拦截。（无需你手动传token和验证token）

* `uni-id配置` 中的 `tokenExpiresIn` 参数，代表产生 `新token` 时，该 `token` 的有效期，单位为秒

* 当你在 `uni-id配置` 中设置了 `tokenExpiresThreshold` 时，`token` 在满足条件的情况下，会自动续期，前端也会自动更新 `token` 到本地缓存

* 当你在 `uni-id配置` 中设置了 `tokenMaxLimit`（单一用户最大token数量） 时，当该用户 `token` 数量达到此值时，会直接淘汰旧的 `token`（即使未过期也会淘汰）