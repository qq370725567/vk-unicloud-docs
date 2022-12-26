# 上传 云储存或阿里云OSS

### 上传至`unicloud云储存`
#### 注意，记得小程序需要加域名白名单 [点击查看](https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp)
```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    // 上传至 unicloud云储存
    vk.uploadFile({
      title:"上传中...",
      filePath: res.tempFilePaths[0],
      suffix:"png", // 不传suffix会自动获取，但H5环境下获取不到后缀，但可以通过file.name 获取
      provider:"unicloud",
      success:(res) => {
       // 上传成功

      }
    });
  }
});

```

### 上传至 `阿里云oss`

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    // 上传至 阿里云oss
    vk.uploadFile({
      title:"上传中...",
      filePath: res.tempFilePaths[0],
      suffix:"png", // 不传suffix会自动获取，但H5环境下获取不到后缀，但可以通过file.name 获取
      provider:"aliyun",
      success:(res) => {
       // 上传成功

      }
    });
  }
});

```

#### 注意，记得小程序需要加域名白名单
#### 还需要在`app.config.js`中配置
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
#### service.aliyunOSS 参数生成工具 [点击下载](https://gitee.com/vk-uni/oss-h5-upload-js-direct.git)
导入项目后,修改项目根目录`upload.js`内的参数,然后运行`index.html`,随便上传一张图片,页面上会显示`aliyunOSS`参数配置

#### 如下图所示
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/1a02b98c-ac0e-4662-95d9-e170f5f246d3.png)

#### 上传阿里云OSS注意：

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


## 上传图片，并将图片记录保存到admin后台
```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    vk.uploadFile({
      title:"上传中...",
      filePath: res.tempFilePaths[0],
      file: res.tempFiles[0],
      needSave:true,
      success:(res) => {
       // 上传成功

      }
    });
  }
});

```

## 上传图片，并将图片记录保存到admin后台指定分类,category_id对应vk-files-categories表的分类ID(可在admin素材管理中新建分类)
```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    vk.uploadFile({
      title:"上传中...",
      filePath: res.tempFilePaths[0],
      file: res.tempFiles[0],
      needSave:true,
      category_id : "001"
      success:(res) => {
       // 上传成功

      }
    });
  }
});

```

## 自定义云端图片保存路径

通过 cloudPath 参数可直接指定路径（需包含文件后缀名）

```js
// 选择图片
uni.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  success: (res) => {
    // 上传至 unicloud云储存
    vk.uploadFile({
      title:"上传中...",
      filePath: res.tempFilePaths[0],
      cloudPath: "myPath/aa.png",
      success:(res) => {
       // 上传成功

      }
    });
  }
});

```

