---
sidebarDepth: 0
---

# 云端数据缓存（新版）

> vk-unicloud版本需 ≥ 2.18.0

## 介绍

云端数据缓存是通过 `key`，`value` 键值对的形式进行数据的储存，通过 `key` 对数据进行读取

新版云端数据缓存同时支持 `空间内置数据库` 和 `redis数据库`，且可以自由切换

## 初始化实例

在调用API前，需要先初始化实例

注意：以下API均只能在云端运行，前端的本地缓存请查看 [本地持久化缓存](https://vkdoc.fsq.pub/client/pages/localStorage.html) 或 [vuex](https://vkdoc.fsq.pub/client/pages/vuex.html) 

```js
const cacheManage = vk.getCacheManage();
```

**指定存储模式**

```js
const cacheManage = vk.getCacheManage({
  mode: "db"
});
```

**参数**

|参数								|类型		|必填	|说明																												|
|:-:								|:-:		|:-:	|:-																												|
|mode								|String	|否		|存储模式，如不填，则自动从配置中获取，可选<br/>db：使用空间内置数据库作为缓存<br/>redis：使用Redis数据库作为缓存	|

**配置文件**

配置文件在 `uni-config-center/vk-unicloud/index.js` 下的 `cacheManage` 节点

```js
"cacheManage": {
	/**
	 * 可选 db、redis
	 * db 使用空间内置数据库作为缓存
	 * redis 使用Redis数据库作为缓存
	 */
	"mode": "db",
},
```

## API

### get（获取缓存）

```js
let value = await cacheManage.get(key);
```

**参数**

|参数	|类型		|必填	|说明			|
|:-:	|:-:		|:-:	|:-:			|
|key	|string	|是		|缓存的键名	|

**返回值**

缓存内容

### set（设置缓存）

```js
await cacheManage.set(key, value, second);
```

**参数**

|参数	|类型		|必填	|说明			|
|:-:	|:-:		|:-:	|:-:			|
|key	|string	|是		|缓存的键名	|
|value	|any	|是		|缓存的值	|
|second	|number	|否		|缓存过期时间，单位秒，0代表永不过期	|

**返回值**

|参数	|类型		|说明			|
|:-:	|:-:		|:-:			|
|code	|number	|0代表成功，其他均为失败	|
|msg	|string	|失败原因	|
|mode	|string	|add 添加 update 修改	|
|key	|string	|缓存的键名	|

### setnx（不存在才设置）

只有在 key 不存在时才设置 key 的值。

```js
let setnxRes = await cacheManage.setnx(key, value, second);
```

**参数**

|参数	|类型		|必填	|说明			|
|:-:	|:-:		|:-:	|:-:			|
|key	|string	|是		|缓存的键名	|
|value	|any	|是		|缓存的值	|
|second	|number	|否		|缓存过期时间，单位秒，0代表永不过期	|

**返回值**

|参数	|类型		|说明			|
|:-:	|:-:		|:-:			|
|code	|number	|0代表成功，其他均为失败	|
|msg	|string	|失败原因	|
|key	|string	|缓存的键名	|

### del（删除缓存）

```js
await cacheManage.del(key);
```

**参数**

|参数	|类型		|必填	|说明			|
|:-:	|:-:		|:-:	|:-:			|
|key	|string	|是		|缓存的键名	|

**返回值**

受影响的记录数

### clear（清空缓存）

```js
await cacheManage.clear(prefix);
```

**参数**

|参数	|类型		|必填	|说明			|
|:-:	|:-:		|:-:	|:-:			|
|prefix	|string	|是		|缓存的键名前缀	|

**返回值**

受影响的记录数

### count（获取缓存数量）

```js
await cacheManage.count(prefix);
```

**参数**

|参数	|类型		|必填	|说明			|
|:-:	|:-:		|:-:	|:-:			|
|prefix	|string	|是		|缓存的键名前缀	|

**返回值**

记录数

### exists（判断缓存是否存在）

```js
await cacheManage.exists(key);
```

**参数**

|参数	|类型		|必填	|说明			|
|:-:	|:-:		|:-:	|:-:			|
|key	|string	|是		|缓存的键名	|

**返回值**

1：存在 0：不存在

### expire（修改缓存过期时间）

```js
await cacheManage.expire(key, seconds);
```

**参数**

|参数	|类型		|必填	|说明			|
|:-:	|:-:		|:-:	|:-:			|
|key	|string	|是		|缓存的键名	|
|second	|number	|否		|缓存过期时间，单位秒，不填或填0代表永不过期	|

**返回值**

1：成功 0：失败

### ttl（获取过期时间剩余多少秒）

```js
await cacheManage.ttl(key);
```

**参数**

|参数	|类型		|必填	|说明			|
|:-:	|:-:		|:-:	|:-:			|
|key	|string	|是		|缓存的键名	|

**返回值**

秒数

### pttl（获取过期时间剩余多少毫秒）

```js
await cacheManage.pttl(key);
```

**参数**

|参数	|类型		|必填	|说明			|
|:-:	|:-:		|:-:	|:-:			|
|key	|string	|是		|缓存的键名	|

**返回值**

毫秒数
