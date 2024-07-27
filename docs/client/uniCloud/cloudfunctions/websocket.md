---
sidebarDepth: 0
---

# WebSocket

> 仅支付宝云（云端）支持
> 
> 不支持本地调试
> 
> Nodejs版本 >= 18
> 
> WebSocket VK版目前只支持在云对象中使用

## 介绍

WebSocket 是一种协议，可通过单个 TCP 连接在网络客户端与网络服务器之间提供全双工通信通道。

原本的 callFunction 是一个 http 请求，Ta只能客户端发给服务端（云端），然后服务端再返回一个响应结果给客户端，但如果客户端不发请求，则服务端无法主动通知客户端，而 WebSocket 不仅客户端能通知服务端，服务端也能主动通知客户端。

云对象 WebSocket 运行原理为客户端请求WebSocket网关，由WebSocket网关处理连接后转发给指定的云对象，调用云对象内不同的WebSocket事件完成事件触发与执行。

**使用场景**

1. 聊天软件
2. 游戏
3. 股票金融交易
4. 其他需要实时交互的场景

**VK版WebSocket优势**

1. 双向加密通信，密文传输数据（注意：此加密通信只能相对安全，无法绝对安全）
2. 适配VK框架，支持通过user_id发送消息
3. 可以查看在线（与WebSocket建立连接未断开）的用户

## 云端（云对象） WebSocket 事件

### onWebsocketConnection（连接时触发）

> 当有客户端进行连接时触发

**云对象实现**

函数名：`onWebsocketConnection`

```javascript
module.exports = {
  
  // 当有客户端进行连接时触发
  onWebsocketConnection: async function(data) {
    console.log("onWebsocketConnection", data);
    let { uid, cid } = this.getClientInfo();
    let userInfo = await this.getUserInfo();


  }
  
}
```

**入参参数**

data为前端执行 [vk.connectWebSocket](#vk-connectwebsocket-建立连接) 时传的data

### onWebsocketMessage（收到消息时触发）

> 接收到客户端消息时触发

**云对象实现**

函数名：`onWebsocketMessage`

```javascript
module.exports = {
  
  // 当有客户端发送时触发
  onWebsocketMessage: async function(data) {
    console.log("onWebsocketMessage", data);
    let { uid, cid } = this.getClientInfo();
    let userInfo = await this.getUserInfo();
      

  }
  
}
```

**入参参数**

data：值为 [webSocket.send](#websocket-send-发送消息) 发送的 data 的值

### onWebsocketDisConnection（连接断开时触发）

> 连接断开时触发

**云对象实现**

```javascript
module.exports = {
  
  // 当有客户端断开连接时触发
  onWebsocketDisConnection: async function(data) {
      console.log("onWebsocketDisConnection", data);
      let { uid, cid } = this.getClientInfo();

  }
  
}
```

**入参参数**

**data**

|参数	|类型		|说明		|
|---	|---		|---		|
|cid	| String	|连接ID		|

### onWebsocketError（连接错误时触发）

> 触发其他事件时失败后触发

**云对象实现**

函数名：`onWebsocketError`

```javascript
module.exports = {
  
  // 当有客户端连接出错时触发
  onWebsocketError: async function(data) {
    console.log("onWebsocketError", data);
    let { uid, cid } = this.getClientInfo();

  }
  
}
```

**入参参数**

**data**

|参数	|类型		|说明		|
|---	|---		|---		|
|cid	| String	|连接ID		|
|errMsg	|String	|错误信息	|

## 云端（云对象） API

用法：`const ws = this.getWebSocketManage()`

返回值: `WebSocket` 对象实例

### ws.send（发送消息）

> 从云对象中向客户端发送消息

```javascript
const ws = this.getWebSocketManage();
await ws.send({
  encrypt: true,
  user_id: [uid],
  data: {
    a: 1,
    b: "2"
  }
});
```

**参数说明**

|参数		|类型					|说明																																		|
|---		|---					|---																																		|
|encrypt|Boolean			| 【选填】是否加密发送																											|
|cid		|String、Array	|【特殊必填】连接id, 支持批量向客户端发送消息，`cid` 和 `user_id` 二选一传即可	|
|user_id|String、Array	|【特殊必填】用户id, 支持批量向客户端发送消息，`cid` 和 `user_id` 二选一传即可	|
|data		|Object				|【必填】发送给客户端的json数据																						|
|url		|String				| 【选填】云对象url路径，默认不需要传，会自动使用当前云对象										|


**云对象示例**

```javascript
module.exports = {
  
  sendTest: async function(data) {
    let { uid } = this.getClientInfo();
    const ws = this.getWebSocketManage();
    
    // 指定cid发送给单个客户端
    await ws.send({
      encrypt: true,
      cid: [cid],
      data: {
        a: 1,
        b: "2"
      }
    });
    
    // 指定cid发送给多个客户端
    await ws.send({
      encrypt: true,
      cid: [cid1, cid2, ...],
      data: {
        a: 1,
        b: "2"
      }
    });
    
    // 指定user_id发送给单个用户（1个用户如果登录多台设备，每台设备都能收到相同消息）
    await ws.send({
      encrypt: true,
      user_id: [uid],
      data: {
        a: 1,
        b: "2"
      }
    });
    
    // 指定user_id发送给多个用户（1个用户如果登录多台设备，每台设备都能收到相同消息）
    await ws.send({
      encrypt: true,
      user_id: [uid1, uid2, ...],
      data: {
        a: 1,
        b: "2"
      }
    });
    
    // 发送给客户端二进制数据
    await ws.send({
      encrypt: true,
      user_id: [uid],
      data: Buffer.from(`我是二进制数据`)
    });
    
    // 发送给客户端二进制数据和其他数据
    await ws.send({
      encrypt: true,
      user_id: [uid],
      data: {
        a: Buffer.from(`我是二进制数据`),
        b: 2
      }
    });
    
  }
}
```

### ws.close（关闭连接）

> 在云对象中关闭连接

**参数说明**

|参数|类型|说明|
|---|---|---|
|cid		|String、Array	|【特殊必填】连接id, 支持批量向客户端发送消息，`cid` 和 `user_id` 二选一传即可	|
|user_id|String、Array	|【特殊必填】用户id, 支持批量向客户端发送消息，`cid` 和 `user_id` 二选一传即可	|
|url		|String				| 【选填】云对象url路径，默认不需要传，会自动使用当前云对象										|


**云对象示例**

```javascript
module.exports = {
 
  closeTest: async function(data) {
    const ws = this.getWebSocketManage();
    
    // 根据cid关闭单个连接
    res.url = await ws.close({
    	cid: [cid],
    });
    
    // 根据cid关闭多个连接
    res.url = await ws.close({
    	cid: [cid1, cid2, ...],
    });
    
    // 根据user_id来关闭单个连接（1个用户如果登录多台设备，每台设备的连接都断开）
    res.url = await ws.close({
    	user_id: [uid],
    });
    
    // 根据user_id来关闭多个连接（1个用户如果登录多台设备，每台设备的连接都断开）
    res.url = await ws.close({
    	user_id: [uid1, uid2, ...],
    });
    
  }
}
```

### ws.signedURL（生成外部连接地址）

> 在云对象中生成WebSocket连接地址（可以给其他非uniapp客户端连接）

在客户端没有使用 uniCloud SDK 时，可以通过 URL 化在云端生成 WebSocket 连接地址。

```javascript
const ws = this.getWebSocketManage();
res.url = await ws.signedURL();
```

**参数说明**

|参数|类型|说明|
|---|---|---|
|name| String |WebSocket云函数/云对象名称|
|query| Object |建立连接时需要传递的参数, 仅在 `connection` 事件中接收到|

**返回值**

WebSocket 连接地址

**示例**

```javascript
module.exports = {
 
  /**
   * 生成适合与任何客户端连接的签名URL（可在非uniapp项目中连接WebSocket）
   */
  signedURL: async function(data) {
  	let res = { code: 0, msg: '' };
  	let { uid } = this.getClientInfo(); // 获取客户端信息
  	// 业务逻辑开始-----------------------------------------------------------
  	const ws = this.getWebSocketManage();
  	res.url = await ws.signedURL();
  	// 业务逻辑结束-----------------------------------------------------------
  	return res;
  },
}
```

## 前端（客户端） API

:::warning uni-app-x 连接 WebSocket 说明

uni-app-x WebSocket API 暂未实现，仅影响客户端无法生成WebSocket连接地址，
可以通过云端API -> [signedURL](#ws-signedurl-生成外部连接地址) 生成连接地址后，使用 [uni.connectSocket](https://uniapp.dcloud.net.cn/api/request/websocket.html) 连接到 WebSocket 服务

:::

### vk.connectWebSocket（建立连接）

快速连接 WebSocket 服务

```javascript
const webSocket = await vk.connectWebSocket({
	url: "template/web-socket/web-socket", // 云对象地址
	encrypt: true, // 是否加密通信
	title: "连接中...",
	data: {

	}
});
```

**参数说明**


|参数		|类型		|说明												|
|---		|---		|---												|
|url		|String	| 【必填】云对象url路径				|
|encrypt|Boolean| 【选填】是否加密通信					|
|title	|String	|【选填】连接时的遮罩title			|
|data		|Object	|【选填】发送给云端的json数据	|

**返回值**

WebSocket对象实例

**示例**

```javascript
// 监听 - 页面每次【加载时】执行(如：前进)
onLoad(options = {}) {
	this.webSocket = await vk.connectWebSocket({
		url: "template/web-socket/web-socket",
		encrypt: true, // 是否加密通信
		title: "连接中...",
		data: {
	
		}
	});
	
	// 连接成功时触发
	this.webSocket.onOpen(data => {
		console.log("WebSocket:open", data);
	
	});
	
	// 收到数据时触发
	this.webSocket.onMessage(data => {
		console.log("WebSocket:message", data);
	  
	});
	
	// 监听vk框架主动抛出的错误
	this.webSocket.onVkError(data => {
		console.log("WebSocket:vkError", data);
		// 在连接非pub云对象时，token过期框架会主动断开连接，data.close为true代表已断开连接
		if (data.type === "invalidToken") {
			// 主动关闭
			this.webSocket.close({
				code: 1000, // 这里固定1000，表示正常关闭
				reason: data.err.msg
			});
		}
	});
	
	// 连接被关闭时触发
	this.webSocket.onClose(data => {
		console.log("WebSocket:close", data);
	
	});
	
	// 连接因错误而关闭时触发
	this.webSocket.onError(data => {
		console.log("WebSocket:error", data);
	
	});
},
```

### webSocket.send（发送消息）

`this.webSocket` 通过执行 [vk.connectWebSocket](#vk-connectwebsocket-建立连接) 获得

```js
this.webSocket.send({
  data: {
    a: 1,
    b: "2"
  }
});
```

### webSocket.close（关闭连接）

`this.webSocket` 通过执行 [vk.connectWebSocket](#vk-connectwebsocket-建立连接) 获得

```js
this.webSocket.close({
  code: 1000, // 这里固定1000，表示正常关闭
  reason: data.err.msg
});
```

## 关联的数据表

### vk-ws-connection

**在线连接表**

该表保存了当前在线的连接

| 字段名称		| 字段类型	| 必填	| 默认值	| 说明								|
|---					|:---:		|:---:|:---:	|---								|
| _id					|  string	| 是		|				| 连接id，即cid			|
| `_add_time`	|  time		| 是		|				| 创建时间						|
| url					|  string	| 是		|				|连接的云对象url地址	|
| user_id			|  string	| 否		|				| 用户id							|
| device_id		|  string	| 否		|				|设备id							|
| appid				|  string	| 否		|				|dcloud_appid				|

## 注意事项

### 数据库报表vk-ws-connection不存在

请在 `database` 目录新建索引文件 `vk-ws-connection.index.json`，文件内容如下

```json
[
  {
    "IndexName": "_add_time",
    "MgoKeySchema": {
      "MgoIndexKeys": [
        {
          "Name": "_add_time",
          "Direction": "1"
        }
      ],
      "MgoIsUnique": false
    }
  },
  {
    "IndexName": "user_id",
    "MgoKeySchema": {
      "MgoIndexKeys": [
        {
          "Name": "user_id",
          "Direction": "1"
        }
      ],
      "MgoIsUnique": false
    }
  },
  {
    "IndexName": "device_id",
    "MgoKeySchema": {
      "MgoIndexKeys": [
        {
          "Name": "device_id",
          "Direction": "1"
        }
      ],
      "MgoIsUnique": false
    }
  }
]
```

然后右键 `database` 目录，初始化数据库，即可自动创建表和索引（注意：如果弹窗问你是否需要覆盖之前老的表的数据，千万别把老的表打勾）

### 报错，类型错误：Invalid URL

WebSocket目前只能连接云端运行，无法本地运行。