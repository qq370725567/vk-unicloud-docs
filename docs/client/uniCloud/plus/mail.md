---
sidebarDepth: 0
---

# 发送邮箱验证码

## 配置

### 添加 vk-mail 公共模块依赖

插件地址：[点击前往](https://ext.dcloud.net.cn/plugin?id=7688)

成功导入后，还需要在你需要使用 `邮件发送功能` 的云函数上，如 `router` 上 `右键` `管理公共模块依赖或扩展库`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/cfbfd5fb-44e6-40e3-b1f0-a6b4e6d1c53c.png)

然后打勾 `vk-mail` 模块。

最后还需要重新上传公共模块 `vk-mail` 和云函数 `router`（本地运行则需要重启项目）

### 配置QQ邮箱教程

* 1、登录QQ邮箱
* 2、`邮箱首页` | `设置` - `换肤` 的设置
* 3、点击`常规` `帐户` `换肤` 中的 `帐户`
* 4、POP3/SMTP服务 点击开启
* 5、复制授权码
* 6、粘贴到 `uniCloud/cloudfunctions/common/uni-config-center/vk-unicloud/index.js` 配置文件中
```js
"vk":{
  "service": {
    "email": {
      "codeExpiresIn": 180, // 邮件验证码有效期（单位秒）
      "qq": {
        "host": "smtp.qq.com",
        "port": 465,
        "secure": true,
        "auth": {
          "user": "你的邮箱@qq.com",
          "pass": "邮箱授权码"
        }
      }
    }
  }
}
```

配置完需要上传 `uni-config-center` 这个公共模块才会生效

### 配置163邮箱教程

* 1、登录163邮箱
* 2、`邮箱首页` | `设置` - `POP3/SMTP服务` - 开启 `POP3/SMTP服务`
* 3、复制授权码
* 4、粘贴到 `uniCloud/cloudfunctions/common/uni-config-center/vk-unicloud/index.js` 配置文件中
```js
"vk":{
  "service": {
    "email": {
      "codeExpiresIn": 180, // 邮件验证码有效期（单位秒）
      "163": {
        "host": "smtp.163.com",
        "port": 465,
        "secure": true,
        "auth": {
          "user": "你的邮箱@163.com",
          "pass": "邮箱授权码"
        }
      }
    }
  }
}
```

配置完需要上传 `uni-config-center` 这个公共模块才会生效

## 发送邮箱验证码示例

### vk框架下router函数内

```js
var vkmail;
try {
  vkmail = require('vk-mail');
} catch (err) {
  console.error("请先添加公共模块：vk-mail（右键对应的云函数，点击管理公共模块或扩展库依赖，勾选vk-mail依赖）");
}
module.exports = {
  /**
   * 发送邮箱验证码
   * @url user/pub/sendEmailCode 前端调用的url参数地址
   * @description 发送邮箱验证码
   * data 请求参数 说明
   * @param {String} email 邮箱
   * @param {String} type  验证码类型
   * @param {String} serviceType 邮件服务类型，默认为qq
   * res 返回参数说明
   * @param {Number} code 错误码，0表示成功
   * @param {String} msg 详细信息
   * @param {String} email 手机号  
   * @param {String} verifyCode 验证码
   */
  main: async (event) => {
    let { data = {}, util } = event;
    let { uniID, config } = util;
    let { 
      email, 
      type,
      serviceType = "qq"
    } = data;
    let res = { code: 0, msg: 'ok' };
    // 业务逻辑开始----------------------------------------------------------- 
    if (!vkmail) {
      return { code: -1, msg: "请先添加公共模块：vk-mail（右键对应的云函数，点击管理公共模块或扩展库依赖，勾选vk-mail依赖）" };
    }
    let code = vk.pubfn.random(6, "0123456789");
    let param = {
      code,
      type,
      email
    };
    // 发送验证码开始
    let emailConfig = config.vk.service.email;
    // 如果配置设置了过期时间，则使用配置的过期时间，否则默认180秒
    param.expiresIn = emailConfig.codeExpiresIn || 180;
    let emailService = vkmail.createTransport({
      "host": emailConfig[serviceType].host,
      "port": emailConfig[serviceType].port,
      "secure": emailConfig[serviceType].secure, // use SSL
      "auth": emailConfig[serviceType].auth
    });
    try {
      // 发送邮件
      await emailService.sendMail({
        "from": emailConfig[serviceType].auth.user,
        "to": data.email,
        "cc": emailConfig[serviceType].auth.user, // 由于邮件可能会被当成垃圾邮件，但只要把邮件抄送给自己一份，就不会被当成垃圾邮件。
        "subject": data.subject, // 邮件的标题
        "text": `您的验证码是${code},打死也不要告诉别人哦!`, // 邮件的内容
      });
      // 发送验证码成功后，设置验证码
      await uniID.setVerifyCode(param);
    } catch (err) {
      console.error(err);
      return { code: -1, msg: "邮件发送失败", err };
    }
    // 发送验证码结束

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}
```

### vk框架下非router函数内

```js
'use strict';
// 通过 require 引入 vk 实例
const vk = require('vk-unicloud');
// 通过 vk.init 初始化 vk实例（只有初始化后才能使用）
vk.init({
  baseDir: __dirname,
  requireFn: require
});

var vkmail;
try {
  vkmail = require('vk-mail');
} catch (err) {
  console.error("请先添加公共模块：vk-mail（右键对应的云函数，点击管理公共模块或扩展库依赖，勾选vk-mail依赖）");
}

exports.main = async (event, context) => {
  let res = { code: 0, msg: "" };
  let { config = {} } = vk.getUnicloud();

  let emailConfig = config.vk.service.email;
  
  let serviceType = "qq";
  let email = "发送给谁，他的邮箱";
  let subject = "标题";
  let text = `验证码 123456`;

  // 创建邮箱服务实例
  let emailService = vkmail.createTransport({
    "host": emailConfig[serviceType].host,
    "port": emailConfig[serviceType].port,
    "secure": emailConfig[serviceType].secure, // use SSL
    "auth": emailConfig[serviceType].auth
  });

  try {
    // 发送邮件
    res.sendMailRes = await emailService.sendMail({
      "from": emailConfig[serviceType].auth.user, // 邮件的发送者
      "to": email, // 邮件的接收者
      "cc": emailConfig[serviceType].auth.user, // 由于邮件可能会被当成垃圾邮件，但只要把右键抄送给自己一份，就不会被当成垃圾邮件。
      "subject": subject, // 邮件的标题
      "text": text, // 邮件的内容
    });
    res.code = 0;
    res.msg = "ok";
  } catch (err) {
    res.code = -1;
    res.msg = "邮件发送失败";
    res.err = err;
  }

  return res;
};

```

### uniCloud通用版本

也是 node.js 通用版本

```js
'use strict';

var vkmail;
try {
  vkmail = require('vk-mail');
} catch (err) {
  console.error("请先添加公共模块：vk-mail（右键对应的云函数，点击管理公共模块或扩展库依赖，勾选vk-mail依赖）");
}

exports.main = async (event, context) => {
  let res = { code: 0, msg: "" };

  let {
    email, // 前端接收邮箱
    type = "bind", // 前端接收验证码类型（如: login register bind unbind）
  } = event;

  // 支持QQ 163 等主流邮箱

  let emailConfig = {
    "host": "smtp.163.com",
    "port": 465,
    "secure": true,
    "auth": {
      "user": "xxxx@163.com", // 发件人邮箱账号
      "pass": "xxxxxxxxxxxx", // 账号授权码
    }
  };

  if (!email) return { code: -1, msg: "email不能为空" };
  if (!type) return { code: -1, msg: "type不能为空" };

  let code = Math.floor(Math.random() * 100000) + 100000;
  let subject = `验证码 ${code}`;
  let text = `验证码 ${code}，打死也不要告诉别人！`;

  // 创建邮箱服务实例
  let emailService = vkmail.createTransport({
    "host": emailConfig.host,
    "port": emailConfig.port,
    "secure": emailConfig.secure, // use SSL
    "auth": emailConfig.auth
  });

  try {
    // 发送邮件
    res.sendMailRes = await emailService.sendMail({
      "from": emailConfig.auth.user, // 邮件的发送者
      "to": email, // 邮件的接收者
      "cc": emailConfig.auth.user, // 由于邮件可能会被当成垃圾邮件，但只要把右键抄送给自己一份，就不会被当成垃圾邮件。
      "subject": subject, // 邮件的标题
      "text": text, // 邮件的内容
    });
    // 标记发送成功
    res.code = 0;
    res.msg = "ok";
    // 发送验证码成功后，通常需要设置验证码（写入数据库）
    // await uniID.setVerifyCode({ code, email, type });
  } catch (err) {
    res.code = -1;
    res.msg = "邮件发送失败";
    res.err = err;
  }
  return res;
};
```