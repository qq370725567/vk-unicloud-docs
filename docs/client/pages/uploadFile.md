---
sidebarDepth: 0
---

# 前端文件上传

## 接口名：vk.uploadFile@uploadFile

## 请求参数@parame

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

## 返回值@return

**vk-unicloud 核心库版本 ≥ 2.17.0 时**

|参数名			|类型		|说明											|
|:-:				|:-:		|:-:											|
|provider		|string	|本次上传的存储供应商				|
|filePath		|string	|本地文件路径								|
|cloudPath	|string	|云端文件路径								|
|fileID			|string	|云端文件ID								|
|fileURL		|string	|云端文件URL								|
|url				|string	|云端文件URL，与fileURL一致	|
|extendInfo	|object	|扩展存储额外返回的信息			|

**extendInfo**

> vk-unicloud 核心库版本 ≥ 2.18.7

仅扩展存储会返回此字段

|参数名	|类型		|说明																|
|:-:		|:-:		|:-:																|
|key		|string	| 等于cloudPath											|
|hash		|string	| 文件的hash值												|
|name		|string	| 上传前的文件名											|
|size		|number	| 文件大小，单位B（字节）1KB = 1024B	|
|width	|number	| 图片或视频的宽度										|
|height	|number	| 图片或视频的高度										|
|format	|string	| 文件格式														|

旧版本唯一不兼容的参数是fileID，新版本fileID是云端文件ID，而旧版本中fileID和url是一致的，因此若在项目中有用到获取url时，请改用url或fileURL

**vk-unicloud 核心库版本 < 2.17.0 时**

|参数名		|类型		|说明											|
|:-:			|:-:		|:-:											|
|fileID		|string	|云端文件URL								|
|url			|string	|云端文件URL，与fileID一致	|

## 上传文件示例代码@demo

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    // 文件上传
    vk.uploadFile({
      title: "上传中...",
      file: res.tempFiles[0],
      success: (res) => {
       // 上传成功
       let url = res.url;
       console.log('url: ', url)

      },
      fail: (err) => {
       // 上传失败
      
      }
    });
  }
});
```

## 配置默认云存储供应商@default

### 默认上传至unicloud空间内置存储@defaultunicloud

在 `app.config.js` 中配置 `cloudStorage.defaultProvider` 值为 `unicloud`

注意，记得小程序需要加域名白名单 [点击查看](https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp)

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
    defaultProvider: "unicloud", // 这里若设置 extStorage 则 vk.uploadFile默认会上传至 扩展存储
  }
},
```

### 默认上传至扩展存储@defaultExtStorage

**版本要求**

1. vk-unicloud核心库版本 ≥ 2.17.0
2. hbx版本 ≥ 3.99

**配置步骤**

1. 打开文件 `cloudfunctions/common/uni-config-center/vk-unicloud/index.js`，修改 `vk.service.cloudStorage.defaultProvider` 值为 `extStorage`，再修改 `domain` 为你开通扩展存储时绑定的域名，如下图所示

![](https://cdn.fsq.pub/vkdoc/vk-client/1e8b5e37-9edb-452f-ac2c-149e10ecebfa.png)

**具体配置如下**

```js
// 第三方服务配置
"service": {
  // 云储存相关配置
  "cloudStorage": {
  	/**
  	 * vk.uploadFile 接口默认使用哪个存储
  	 * unicloud 空间内置存储（默认）
  	 * extStorage 扩展存储
  	 */
  	"defaultProvider": "extStorage",
  	// 扩展存储配置
  	"extStorage": {
  		"provider": "qiniu", // qiniu: 扩展存储-七牛云
  		"domain": "", // 自定义域名，如：cdn.example.com（填你在扩展存储绑定的域名）
  		"bucketName": "", // 存储空间名称，可不填，不填则使用当前空间绑定的存储空间
  		"bucketSecret": "", // 存储空间密钥，可不填，不填则使用当前空间绑定的存储空间
  		"endpoint": {
  			"upload": "", // 上传接口的代理地址，在国内上传无需填写
  		}
  	}
  }
},
```

2. 打开文件 `项目根目录/app.config.js`，修改 `service.cloudStorage.defaultProvider` 值为 `extStorage`，再修改 `domain` 为你开通扩展存储时绑定的域名，如下图所示

![](https://cdn.fsq.pub/vkdoc/vk-client/0f8e0706-d731-491c-a5b0-0b09000f188b.png)

**具体配置如下**

```js
// 第三方服务配置
service: {
	// 云储存相关配置
	cloudStorage: {
		/**
		 * vk.uploadFile 接口默认使用哪个存储
		 * unicloud 空间内置存储（默认）
		 * extStorage 扩展存储
		 */
		defaultProvider: "extStorage",
		// 扩展存储配置
		extStorage: {
			provider: "qiniu", // qiniu: 扩展存储-七牛云
			// 根目录名称（如果改了这里的dirname，则云函数user/pub/getUploadFileOptionsForExtStorage内判断的目录权限也要改，否则无法上传）
			dirname: "public",
			// 用于鉴权的云函数地址（一般不需要改这个参数）
			authAction: "user/pub/getUploadFileOptionsForExtStorage",
			// 自定义域名，如：cdn.example.com（填你在扩展存储绑定的域名，若云端已设置 uni-config-center/vk-unicloud/index.js 内的 vk.service.cloudStorage.extStorage.domain 则此处可不填）
			domain: "",
			// 上传时，是否按用户id进行分组储存
			groupUserId: false,
		}
	}
},
```

注意，记得小程序需要加域名白名单

**上传域名**

将下方域名添加到小程序的uploadFile合法域名列表中

```
https://upload.qiniup.com
```

**下载域名**

下载域名就是你开通扩展存储时绑定的自定义域名，将你的自定义域名添加到download合法域名列表中

最后复制最新框架项目中的云函数 `user/pub/getUploadFileOptionsForExtStorage` 到你的项目中（扩展存储上传需要依赖这个云函数来获取上传token）[传送门 - 最新框架项目](https://ext.dcloud.net.cn/plugin?id=2204)

### 默认上传至阿里云OSS@defaultaliyunoss

1. 在 `app.config.js` 中配置 `cloudStorage.defaultProvider` 值为 `aliyun`
2. 修改 `cloudStorage.aliyun` 内的参数

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

注意，记得小程序需要加域名白名单

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

## 完整配置@config

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
    },
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

## 更多示例@example

### 上传图片，并将图片记录保存到admin后台@example1

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

### 自定义云端图片保存路径@example2

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

### 监听实时上传进度回调@example3

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

## 小程序域名白名单@whitelist

小程序需要添加域名白名单，否则无法正常使用

### 内置存储域名

[点击查看](https://vkdoc.fsq.pub/client/publish/mp-weixin.html#%E9%85%8D%E7%BD%AE%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%9F%9F%E5%90%8D%E7%99%BD%E5%90%8D%E5%8D%95)

### 扩展存储域名

**上传域名**

```js
https://upload.qiniup.com
```

**下载域名**

下载域名就是你开通扩展存储时绑定的自定义域名，将你的自定义域名添加到download合法域名列表中

## 常见问题@q

### 小程序本地可以上传，体验版小程序无法上传@q1

通常都是因为域名白名单没有添加导致的，检查上传域名是否已加入到小程序的uploadFile合法域名列表中，[查看小程序域名白名单](#小程序域名白名单)

### 上传扩展存储报错，云函数user/pub/getUploadFileOptionsForExtStorage不存在@q2

下载最新框架项目，去复制这个云函数到你的项目中（扩展存储上传需要依赖这个云函数来获取上传token）

### 我之前用的unicloud内置存储，现在想换成扩展存储，我的vk.uploadFile代码是否要指定provider为extStorage才行？@q3

不需要，只需要修改配置即可，将 `defaultProvider` 设置成 `extStorage` 则默认 `vk.uploadFile` 都会上传到扩展存储 [查看配置](#完整配置)
