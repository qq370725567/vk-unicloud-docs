---
sidebarDepth: 0
---

# 短信发送（聚合版）
 
## 调用示例@demo

### 发送通知类短信（非验证码）@sendSms

```js
/**
 * 发送短信(聚合版)
 * @param {String} provider   服务供应商
 * @param {String} smsKey     密钥ID，若不传，则自动从config公共模块中获取
 * @param {String} smsSecret  密钥密码，若不传，则自动从config公共模块中获取
 * @param {String} signName   短信签名，若不传，则自动从config公共模块中获取
 * @param {String} phone      多个手机号用,号隔开 目前unicloud不支持多个手机号，阿里云支持
 * @param {String} templateId 发送的短信模板ID
 * @param {object} data       短信模板内的参数数据
 */

// unicloud调用示例
let sendSmsRes = await vk.system.smsUtil.sendSms({
  provider: "unicloud",
  phone: "15200000001",
  templateId: "11558",
  data: {
    orderNo: "DD8888888888",
    expressCom: "顺丰快递",
    expressNo: "SF88888888"
  }
});

// 阿里云调用示例
let sendSmsRes = await vk.system.smsUtil.sendSms({
  provider: "aliyun",
  phone: "15200000001",
  templateId: "SMS_202470413",
  data: {
    orderNo: "DD8888888888",
    expressCom: "顺丰快递",
    expressNo: "SF88888888"
  }
});
```

### 发送短信验证码@sendSmsVerifyCode

此写法会自动将验证码保存到数据库，可用于

1. 手机号登录 type: "login"
2. 绑定手机 type: "bind"
3. 解绑手机 type: "unbind"
4. 重置账号密码 type: "reset-pwd"

**调用示例**

```js
let sendSmsVerifyCodeRes = await vk.system.smsUtil.sendSmsVerifyCode({
	provider: "短信供应商", // unicloud 内置验证码; aliyun 阿里云验证码
	code: "1234", // 验证码
	type: "login", // login 手机号登录; bind 绑定手机; unbind 解绑手机; reset-pwd 重置账号密码;
	phone: "15200000001",
	expiresIn: 180, // 验证码实际有效时间，必须是60的倍数
});
console.log('sendSmsVerifyCodeRes: ', sendSmsVerifyCodeRes);
```

#### 自定义校验type@@sendSmsVerifyCode-type

如果业务不是上面4种（手机号登录、绑定手机、解绑手机、重置账号密码），那么type可以自己自定义，比如操作 “其他重要操作” 时的手机号验证码校验，type可以写为 type: "verify"，此时可以手动校验验证码是否正确，校验验证码可通过uni-id模块自带的API实现，代码如下：

**云函数调用示例**

```js
'use strict';
module.exports = {
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk, db, _, $ } = util;
    let { uid } = data;
    let res = { code: 0, msg: "" };
    // 业务逻辑开始-----------------------------------------------------------
    let verifyCodeRes = await uniID.verifyCode({
      mobile: "15200000001", // 手机号
      code: "123456", // 验证码
      type: 'verify', // 此处的type的值需和你发送验证码时传的type一致
    });
    if (verifyCodeRes.code !== 0) {
      // 校验失败
      return {
        code: -1,
        msg: "短信验证码错误"
      }
    } 
    // 校验成功，继续执行其他逻辑
    
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}
```

**云对象调用示例**

```js
let { uniID } = this.getUtil();
let verifyCodeRes = await uniID.verifyCode({
  mobile: "15200000001", // 手机号
  code: "123456", // 验证码
  type: 'verify', // 此处的type的值需和你发送验证码时传的type一致
});
if (verifyCodeRes.code !== 0) {
  // 校验失败
  return {
    code: -1,
    msg: "短信验证码错误"
  }
} 
// 校验成功，继续执行其他逻辑
```

## 配置unicloud短信@unicloud

定位到文件 `uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json` 的 `service.sms`

```js
"sms": {
  "name": "重要",
  "codeExpiresIn": 180,       // 验证码过期时间，单位为秒，注意一定要是60的整数倍
  "templateId": "",           // 发送验证码的短信模板ID（此模板id仅配合vk.system.smsUtil.sendSmsVerifyCode API需要）
  "smsKey": "",               // 可不填，短信密钥key，开通短信服务处可以看到 https://dev.dcloud.net.cn/uniSms
  "smsSecret": ""             // 可不填，短信密钥secret，开通短信服务处可以看到 https://dev.dcloud.net.cn/uniSms
},
```

配置完需要上传 `uni-config-center` 这个公共模块才会生效

## 配置阿里云短信@aliyun

定位到文件 `uniCloud/cloudfunctions/common/uni-config-center/vk-unicloud/index.js` 的 `vk.service.sms`

```js
// 短信服务
"sms": {
  // 阿里云短信服务
  "aliyun": {
    "enable": true,       // 是否启用阿里云短信
    "accessKeyId": "",     // 短信密钥key
    "accessKeySecret": "", // 短信密钥secret
    "signName": "",        // 默认签名
    "templateCode": {
      "verifyCode": ""     // 验证码短信模板 - 此模板id仅配合vk.system.smsUtil.sendSmsVerifyCode API需要
    }
  }
},
```

配置完需要上传 `uni-config-center` 这个公共模块才会生效

## 常见问题@question

### 发送短信失败，报错uniCloud.sendSms由uni-cloud-sms扩展库提供，请确保云函数/云对象/clientDB依赖了此扩展库@q1

需要右键云函数，管理依赖，添加uni-cloud-sms扩展库，如下图所示

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/446.png)