---
sidebarDepth: 0
---

# 云端文件上传

> vk-unicloud版本需 ≥ 2.18.6

注意：前端文件上传文档 [https://vkdoc.fsq.pub/client/pages/uploadFile.html](https://vkdoc.fsq.pub/client/pages/uploadFile.html)

## 接口名：vk.uploadFile

## 请求参数

| 参数							| 说明																																						| 类型			| 默认值		| 可选值								|
|------------------	|-------------------------------																								|---------|--------	|-------							|
| provider					| 指定云存储供应商，可选：<br/>unicloud 上传至空间内置存储<br/>extStorage 上传至扩展存储	| string	| -				| unicloud、extStorage	|
| cloudPath					| 云端文件路径																																		| string	| -				| -										|
| fileContent				| buffer 或要上传的文件可读流																											| -				| -				| -										|
| isPrivate					| 是否是私有文件，仅扩展存储有效																										| boolean	| -				| -										|

注意：若 `provider` 不传，则自动从云端配置 `uni-config-center/vk-unicloud/index.js` 中获取 `vk.service.cloudStorage.defaultProvider` 的值

## 返回值

|参数名		|类型		|说明																|
|:-:			|:-:		|:-:																|
|provider	|string	|本次上传的存储供应商									|
|cloudPath|string	|云端文件路径													|
|fileID		|string	|云端文件ID													|
|fileURL	|string	|云端文件URL													|
|url			|string	|云端文件URL，与fileURL一致						|
|isPrivate|boolean|是否是私有文件，仅扩展存储会返回此字段	|

## 上传文件示例代码

```js
// 模拟一个1KB的文件
const buffer = Buffer.alloc(1024); // 创建一个1KB的Buffer
let uploadFileRes = await vk.uploadFile({
  cloudPath: "public/test.txt",
  fileContent: buffer
});
console.log('uploadFileRes: ', uploadFileRes);
```

## 配置默认云存储供应商

### 默认上传至unicloud空间内置存储

在 `uni-config-center/vk-unicloud/index.js` 中配置 `vk.service.cloudStorage.defaultProvider` 值为 `unicloud`

```js
"service": {
  // 云储存相关配置
  "cloudStorage": {
    /**
     * vk.uploadFile 接口默认使用哪个存储
     * unicloud 空间内置存储（默认）
     * extStorage 扩展存储
     */
    "defaultProvider": "unicloud", // 这里若设置 extStorage 则 vk.uploadFile默认会上传至 扩展存储
  }
},
```

### 默认上传至扩展存储

**配置步骤**

1. 在 `uni-config-center/vk-unicloud/index.js` 中配置 `vk.service.cloudStorage.defaultProvider` 值为 `extStorage`
2. 修改 `vk.service.cloudStorage.extStorage` 中的 `domain` 为你开通扩展存储时绑定的域名

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
      "endpoint": {
        "upload": "", // 上传接口的代理域名，在国内上传无需填写
      }
    }
  }
},
```

## 完整配置

配置文件在 `uni-config-center/vk-unicloud/index.js`

配置节点：`vk.service.cloudStorage`

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
    // 空间内置存储
    "unicloud": {
      // 暂无配置项
    },
    // 扩展存储配置
    "extStorage": {
      "provider": "qiniu", // qiniu: 扩展存储-七牛云
      "domain": "", // 自定义域名，如：cdn.example.com（填你在扩展存储绑定的域名）
      "endpoint": {
        "upload": "", // 上传接口的代理域名，在国内上传无需填写
      }
    }
  }
},
```