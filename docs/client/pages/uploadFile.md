---
sidebarDepth: 0
---

# 上传云储存或阿里云OSS

## 接口名：vk.uploadFile

## 属性

| 参数									| 说明																										| 类型		| 默认值	| 可选值|
|------------------			|-------------------------------													|---------|--------	|-------|
| title									| 上传时的loading提示语																		| String	| -				| -			|
| file									| 要上传的文件对象，file与filePath二选一即可							| File		| -				| -			|
| filePath							| 要上传的文件路径，file与filePath二选一即可							| String	| -				| -			|
| suffix								| 指定上传后的文件后缀，如果传了file 参数，则此参数可不传	| String	| -				| -			|
| provider							| 云存储供应商，支持：unicloud、aliyun										| String	| unicloud| aliyun|
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

## 上传至unicloud云储存

注意，记得小程序需要加域名白名单 [点击查看](https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp)

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
      success: (res) => {
       // 上传成功

      }
    });
  }
});
```

提示： file和filePath二选一即可，都传也可以，如果传了file，可以不传suffix，suffix会自动从file.name中获取

## 上传至阿里云oss

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
      provider: "aliyun",
      success:(res) => {
       // 上传成功

      }
    });
  }
});
```

注意，记得小程序需要加域名白名单

**还需要在`app.config.js`中配置**

```js
// 第三方服务配置
service:{
  // 阿里云oss配置
  aliyunOSS:{
    // 密钥和签名信息 (由于签名的获取比较麻烦,建议初学者使用上传到unicloud的方案,上传到阿里云OSS是给有特殊需求的用户使用)
    uploadData:{
      OSSAccessKeyId: "",
      policy:"",
      signature:"",
    },
    // oss上传地址
    action:"https://xxxxxxxx.oss-cn-hangzhou.aliyuncs.com",
    // 根目录名称
    dirname:"test",
    // oss外网访问地址，也可以是阿里云cdn地址
    host:"https://xxx.xxx.com",
    // 上传时,是否按用户id进行分组储存
    groupUserId:false,
    // vk.uploadFile 是否默认上传到阿里云OSS
    isDefault:false
  }
}
```

service.aliyunOSS 参数生成工具 [点击下载](https://gitee.com/vk-uni/oss-h5-upload-js-direct.git)

导入项目后,修改项目根目录`upload.js`内的参数,然后运行`index.html`,随便上传一张图片,页面上会显示`aliyunOSS`参数配置

如下图所示

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/1a02b98c-ac0e-4662-95d9-e170f5f246d3.png)

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
      category_id: "001"
      success:(res) => {
       // 上传成功

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
      }
    });
  }
});
```