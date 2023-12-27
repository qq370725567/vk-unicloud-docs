---
sidebarDepth: 0
---

# 文件上传

## 接口名：vk.uploadFile

## 请求参数

| 参数									| 说明																										| 类型		| 默认值	| 可选值|
|------------------			|-------------------------------													|---------|--------	|-------|
| title									| 上传时的loading提示语																		| String	| -				| -			|
| file									| 要上传的文件对象，file与filePath二选一即可							| File		| -				| -			|
| filePath							| 要上传的文件路径，file与filePath二选一即可							| String	| -				| -			|
| suffix								| 指定上传后的文件后缀，如果传了file 参数，则此参数可不传	| String	| -				| -			|
| provider							| 云存储供应商，可选：<br/>unicloud 上传至空间内置存储<br/>extStorage 上传至扩展存储<br/>aliyun 上传至阿里云oss	| String	| - | 见说明|
| cloudPath							| 指定上传后的云端文件路径（不指定会自动生成）						| String	| -				| -			|
| cloudDirectory				| 指定上传后的云端目录（若cloudPath有值，则此参数无效）		| String	| -				| -			|
| needSave							| 是否需要将图片信息保存到admin素材库											| Boolean	| false		| true	|
| category_id						| 素材库分类id，当needSave为true时生效										| String	| -				| -			|
| uniCloud							| 上传到其他空间时使用，uniCloud和env二选一即可						| cloud		| -				| -			|
| env										| 上传到其他空间时使用，uniCloud和env二选一即可						| String	| -				| -			|
| cloudPathAsRealPath		| 阿里云目录支持，需HBX3.8.5以上版本才支持								| Boolean	| true		| false	|
| cloudPathRemoveChinese| 删除文件名中的中文																			| Boolean	| true		| false	|
| onUploadProgress			| 上传进度回调																						| Function| -				| -			|
| success								| 上传成功时，执行的回调函数															| Function| -				| -			|
| fail									| 上传失败时，执行的回调函数															| Function| -				| -			|
| complete							| 无论上传成功与否，都会执行的回调函数										| Function| -				| -			|

uniCloud 和 env 参数用法与vk.callFunction 用法一致 [点击查看](https://vkdoc.fsq.pub/client/question/q9.html)

## 返回值

**vk-unicloud 核心库版本 ≥ 2.17.0 时**

|参数名		|类型		|说明											|
|:-:			|:-:		|:-:											|
|provider	|string	|本次上传的存储供应商				|
|filePath	|string	|本地文件路径							|
|cloudPath|string	|云端文件路径							|
|fileID		|string	|云端文件ID								|
|fileURL	|string	|云端文件URL								|
|url			|string	|云端文件URL，与fileURL一致	|

旧版本唯一不兼容的参数是fileID，新版本fileID是云端文件ID，而旧版本中fileID和url是一致的，因此若在项目中有用到获取url时，请改用url或fileURL

**vk-unicloud 核心库版本 < 2.17.0 时**

|参数名		|类型		|说明											|
|:-:			|:-:		|:-:											|
|fileID		|string	|云端文件URL								|
|url			|string	|云端文件URL，与fileID一致	|


## 上传至unicloud空间内置存储

注意，记得小程序需要加域名白名单 [点击查看](https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp)

**示例代码**

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    // 上传至 unicloud空间内置存储
    vk.uploadFile({
      title: "上传中...",
      file: res.tempFiles[0],
      provider: "unicloud", // 指定上传至unicloud空间内置存储（provider可不传，默认从中配置中读取）
      success: (res) => {
       // 上传成功

      },
      fail: (err) => {
       // 上传失败
      
      }
    });
  }
});
```

## 上传扩展存储

**版本要求**

1. vk-unicloud核心库版本 ≥ 2.17.0
2. hbx版本 ≥ 3.99

**示例代码**

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    // 上传至 扩展存储
    vk.uploadFile({
      title: "上传中...",
      file: res.tempFiles[0],
      provider: "extStorage", // 指定上传至扩展存储
      success:(res) => {
       // 上传成功

      },
      fail: (err) => {
       // 上传失败
      
      }
    });
  }
});
```

注意，记得小程序需要加域名白名单

**上传域名**

将下方域名添加到小程序的uploadFile合法域名列表中

```
https://upload.qiniup.com
```

**下载域名**

下载域名就是你开通扩展存储时绑定的自定义域名，将你的自定义域名添加到download合法域名列表中

**还需要在`app.config.js`中配置**

一般只需要改下面配置中的 `domain` 为自己的即可

```js
// 第三方服务配置
service: {
  // 云储存相关配置
  cloudStorage: {
    /**
     * vk.uploadFile 接口默认使用哪个存储
     * unicloud 空间内置存储（默认）
     * extStorage 扩展存储
     * aliyun 阿里云oss 
     */
    defaultProvider: "extStorage", // 这里若设置 extStorage 则 vk.uploadFile默认会上传至 扩展存储
    // 扩展存储配置
    extStorage: {
      provider: "qiniu", // qiniu: 扩展存储-七牛云
      // 根目录名称（如果改了这里的dirname，则云函数user/pub/getUploadFileOptionsForExtStorage内判断的目录权限也要改，否则无法上传）
      dirname: "public",
      // 用于鉴权的云函数地址（一般不需要改这个参数）
      authAction: "user/pub/getUploadFileOptionsForExtStorage",
      // 自定义域名，如：cdn.example.com（填你在扩展存储绑定的域名）
      domain: "cdn.example.com",
      // 上传时，是否按用户id进行分组储存
      groupUserId: false,
    }
  }
},
```

最后复制最新框架项目中的云函数 `user/pub/getUploadFileOptionsForExtStorage` 到你的项目中（扩展存储上传需要依赖这个云函数来获取上传token）

## 上传至阿里云oss

**示例代码**

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    // 上传至 阿里云oss
    vk.uploadFile({
      title: "上传中...",
      file: res.tempFiles[0],
      provider: "aliyun", // 指定上传到阿里云
      success:(res) => {
       // 上传成功

      },
      fail: (err) => {
       // 上传失败
      
      }
    });
  }
});
```

注意，记得小程序需要加域名白名单

**还需要在`app.config.js`中配置**

```js
// 第三方服务配置
service: {
  // 云储存相关配置
  cloudStorage: {
    /**
     * vk.uploadFile 接口默认使用哪个存储
     * unicloud 空间内置存储（默认）
     * extStorage 扩展存储
     * aliyun 阿里云oss 
     */
    defaultProvider: "aliyun", // 这里若设置 aliyun 则 vk.uploadFile默认会上传至 阿里云oss 
    // 阿里云oss
    // 密钥和签名信息（由于签名的获取比较麻烦,建议初学者使用上传到unicloud或extStorage的方案，上传到阿里云OSS是给有特殊需求的用户使用）
    // 相关文档 : https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.11186623.6.1757.b7987d9czoFCVu
    aliyun: {
      // 密钥和签名信息
      uploadData: {
        OSSAccessKeyId: "",
        policy:"",
        signature:"",
      },
      // oss上传地址
      action:"https://xxxxxxxx.oss-cn-hangzhou.aliyuncs.com",
      // 根目录名称
      dirname: "public",
      // oss外网访问地址，也可以是阿里云cdn地址
      host:"https://xxx.xxx.com",
      // 上传时，是否按用户id进行分组储存
      groupUserId: false,
    }
  }
},
```

aliyun oss 参数生成工具 [点击下载](https://gitee.com/vk-uni/oss-h5-upload-js-direct.git)

导入项目后,修改项目根目录`upload.js`内的参数,然后运行`index.html`,随便上传一张图片,页面上会显示`aliyunOSS`参数配置

如下图所示

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/1a02b98c-ac0e-4662-95d9-e170f5f246d3.png)

将生成的 `aliyunOSS` 对象内的值赋值给 `service.cloudStorage.aliyun` 即可

**上传阿里云OSS注意**

需要在oss上配置允许跨域

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/d11222f6-5397-433f-b272-941ac6f4e953.png)

**允许 Headers**

```js
*
access-control-allow-origin
```

**暴露 Headers**

```js
Etag
x-oss-request-id
```

## 完整配置

配置文件在项目根目录的 `app.config.js` 文件

配置节点：`service.cloudStorage`

```js
// 第三方服务配置
service: {
  // 云储存相关配置
  cloudStorage: {
    /**
     * vk.uploadFile 接口默认使用哪个存储
     * unicloud 空间内置存储（默认）
     * extStorage 扩展存储
     * aliyun 阿里云oss 
     */
    defaultProvider: "unicloud",
    // 空间内置存储
    unicloud: {
      // 暂无配置项
    },
    // 扩展存储配置
    extStorage: {
      provider: "qiniu", // qiniu: 扩展存储-七牛云
      // 根目录名称（如果改了这里的dirname，则云函数user/pub/getUploadFileOptionsForExtStorage内判断的目录权限也要改，否则无法上传）
      dirname: "public",
      // 用于鉴权的云函数地址（一般不需要改这个参数）
      authAction: "user/pub/getUploadFileOptionsForExtStorage",
      // 自定义域名，如：cdn.example.com（填你在扩展存储绑定的域名）
      domain: "cdn.example.com",
      // 上传时，是否按用户id进行分组储存
      groupUserId: false,
    }
    // 阿里云oss
    // 密钥和签名信息（由于签名的获取比较麻烦,建议初学者使用上传到unicloud或extStorage的方案，上传到阿里云OSS是给有特殊需求的用户使用）
    // 相关文档 : https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.11186623.6.1757.b7987d9czoFCVu
    aliyun: {
      // 密钥和签名信息
      uploadData: {
        OSSAccessKeyId: "",
        policy:"",
        signature:"",
      },
      // oss上传地址
      action:"https://xxxxxxxx.oss-cn-hangzhou.aliyuncs.com",
      // 根目录名称
      dirname: "public",
      // oss外网访问地址，也可以是阿里云cdn地址
      host:"https://xxx.xxx.com",
      // 上传时，是否按用户id进行分组储存
      groupUserId: false,
    }
  }
},
```

## 更多示例

### 上传图片，并将图片记录保存到admin后台

关键属性：`设置 needSave 为 true`

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    vk.uploadFile({
      title: "上传中...",
      file: res.tempFiles[0],
      needSave: true,
      success:(res) => {
       // 上传成功

      },
      fail: (err) => {
       // 上传失败
      
      }
    });
  }
});

```

### 上传图片，并将图片记录保存到admin后台指定分类,category_id对应vk-files-categories表的分类ID(可在admin素材管理中新建分类)

关键属性：`设置 needSave 为 true，并设置category_id`

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    vk.uploadFile({
      title: "上传中...",
      file: res.tempFiles[0],
      needSave: true,
      category_id: "001",
      success :(res) => {
       // 上传成功

      },
      fail: (err) => {
       // 上传失败
      
      }
    });
  }
});

```

### 自定义云端图片保存路径

通过 cloudPath 参数可直接指定路径（需包含文件后缀名）

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    // 上传至 unicloud云储存
    vk.uploadFile({
      title: "上传中...",
      file: res.tempFiles[0],
      cloudPath: "myPath/aa.png",
      success:(res) => {
       // 上传成功

      },
      fail: (err) => {
       // 上传失败
      
      }
    });
  }
});
```

### 监听实时上传进度回调

关键属性：onUploadProgress

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    console.log('res: ', res)
    // 上传至 unicloud云储存
    vk.uploadFile({
      title: "上传中...",
      file: res.tempFiles[0],
      onUploadProgress: (res) => {
        let { progress } = res;
        console.log(`当前进度：${progress}%`);
      },
      success: (res) => {
        this.url = res.url;
      },
      fail: (err) => {
       // 上传失败
      
      }
    });
  }
});
```

## 常见问题

### 小程序本地可以上传，体验版小程序无法上传

通常都是因为域名白名单没有添加导致的，检查上传域名是否已加入到小程序的uploadFile合法域名列表中

### 上传扩展存储报错，云函数user/pub/getUploadFileOptionsForExtStorage不存在

下载最新框架项目，去复制这个云函数到你的项目中（扩展存储上传需要依赖这个云函数来获取上传token）

