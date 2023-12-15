---
sidebarDepth: 0
---

# 短信发送（聚合版）
 
## 调用示例

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
    code:"1234",
    name:"重要",
    action:"身份验证",
    expMinute:"3"
  }
});

// 阿里云调用示例
let sendSmsRes = await vk.system.smsUtil.sendSms({
  provider: "aliyun",
  phone: "15200000001",
  templateId: "SMS_202470413",
  data: {
    code: "1234"
  }
});

```

## 配置unicloud短信

定位到文件 `uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json` 的 `service.sms`

```js
"sms": {
  "name": "重要",
  "codeExpiresIn": 180,       // 验证码过期时间，单位为秒，注意一定要是60的整数倍
  "templateId": "",           // 发送验证码的短信模板ID（此模板id仅配合uni-id需要）
  "smsKey": "",               // 可不填，短信密钥key，开通短信服务处可以看到 https://dev.dcloud.net.cn/uniSms
  "smsSecret": ""             // 可不填，短信密钥secret，开通短信服务处可以看到 https://dev.dcloud.net.cn/uniSms
},
```

## 配置阿里云短信

定位到文件 `uniCloud/cloudfunctions/common/uni-config-center/vk-unicloud/index.js` 的 `vk.service.sms`

```js
// 短信服务
"sms": {
  // 阿里云短信服务
  "aliyun": {
    "enable": false,       // 是否启用阿里云短信
    "accessKeyId": "",     // 短信密钥key
    "accessKeySecret": "", // 短信密钥secret
    "signName": "",        // 默认签名
    "templateCode": {
      "verifyCode": ""     // 验证码短信模板 - 配合uni-id需要
    }
  }
},
```

## 常见问题

### 发送短信失败，报错uniCloud.sendSms由uni-cloud-sms扩展库提供，请确保云函数/云对象/clientDB依赖了此扩展库

需要右键云函数，管理依赖，添加uni-cloud-sms扩展库，如下图所示

![](https://mp-cf0c5e69-620c-4f3c-84ab-f4619262939f.cdn.bspapp.com/vk-doc/446.png)