# 万能连表 selects（连表、聚合、分组）
 
## 目录

- 1、[1张主表多张副表](#场景1-1张主表多张副表)

- 2、[1张主表多张副表，同时副表也有多张副表](#场景2-1张主表多张副表-同时副表也有多张副表)
- 3、[需要查询同时满足主表和副表的条件，即副表不满足条件，则主表记录也不获取](#场景3-需要查询同时满足主表和副表的条件-即副表不满足条件-则主表记录也不获取)
- 4、[连表查询时需要按照离给定点从近到远输出（地理位置经纬度）](#场景4-连表查询时需要按照离给定点从近到远输出-地理位置经纬度)
- 5、[连表查询，主表外键是数组（id数组），查询出数组内的每个记录详情](#场景5-连表查询-主表外键是数组-id数组-查询出数组内的每个记录详情)
- 6、[连表查询，副表外键是数组（只要数组内任意元素与主表外键匹配即可）](#场景6-连表查询-副表外键是数组-只要数组内任意元素与主表外键匹配即可)
- 7、[分组查询](#场景7-分组查询)
- 8、[分组统计带if(查询每个班级中，数学成绩大于语文成绩的学生人数)](#场景8-分组统计带if)
- 9、[连表查询，并获取满足条件的第一条记录，以对象形式返回](#场景9-连表查询-并获取满足条件的第一条记录-以对象形式返回)
- 10、[利用分组查询实现以指定字段去重复查询](#场景10-利用分组查询实现以指定字段去重复查询)
- 11、[连表查询，使用数组下标对应的值进行连表（如连表查推荐人信息）](#场景11-使用数组下标对应的值进行连表)
- 12、[连表查询，通过副表字段排序](#场景12-通过副表字段排序)

## vk.baseDao.selects（万能连表查询）

**接口名**

云开发数据库连表查询最大支持查询500条数据，即pageSize最大值为500

特别注意：此分页功能会随着 `pageIndex` 的值越大，效率越低（传统mysql也有此问题），pageIndex * pageSize 的值最好不要超过 400万（如每页显示10条，则建议最多让用户查看到第40万页）

### 调用示例

```js
let res = await vk.baseDao.selects({
  dbName:"",
  getCount:false,
  pageIndex:1,
  pageSize:20,
  // 主表where条件
  whereJson:{
    
  },
  // 主表字段显示规则
  fieldJson:{},
  // 主表排序规则
  sortArr:[{ name:"_id", type:"desc" }],
  // 副表列表
  foreignDB:[
    {
      dbName:"副表表名",
      localKey:"主表外键名",
      foreignKey:"副表外键名",
      as:"副表as字段",
      limit:1
    }
  ]
});
```

### 参数说明

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   主表表名    |
|   whereJson |  Object  |  否  |   主表 where 条件  |
|   pageIndex |  Number  |  否  |   第几页 默认 1  |
|   pageSize |  Number  |  否  |   每页显示数量 默认 10  |
|   getOne |  Boolean  |  否  |   是否只返回第一条数据。默认 false  |
|   getMain |  Boolean  |  否  |   是否只返回rows数组。默认 false |
|   getCount |  Boolean  |  否  |   是否返回满足条件的记录总数。默认 false |
|   groupJson |  Object  |  否  |   主表分组规则（副表不支持分组） |
|   sortArr |  Array  |  否  |   主表排序规则  |
|   foreignDB |  Array  |  否  |   连表规则 [详情](#foreigndb-连表规则) |
|   lastWhereJson |  Object  |  否  |   连表后的查询条件  |
|   lastSortArr |  Array  |  否  |   连表后的排序条件  |
|   fieldJson |  Object  |  否  |   字段显示规则  |
|   addFields |  Object  |  否  |   添加自定义字段规则  |
|   db   |  DB  |  否  |   指定数据库实例 const db = uniCloud.database(); |

### 返回值

|    参数名   |   类型   |     说明    |
|------------|----------|-----------|
|   rows   |  Array  |    数据列表    |
|   total   |  Number  |    满足条件的记录总数（如果getCount为false，则total=rows.length  |
|   hasMore   |  Boolean  |    分页参数，true 还有下一页 false 无下一页    |
|   pagination   |  Object  |   当前分页的页码pageIndex和每页显示的大小pageSize    |

### foreignDB（连表规则）

foreignDB是一个数组，数组内每一个对象代表一个连表规则

**代码示例**

```js
foreignDB:[
  {
    dbName:"副表表名",
    localKey:"主表外键名",
    foreignKey:"副表外键名",
    as:"副表as字段",
    limit:1, // limit=1则以对象形式返回
  },
  {
    dbName:"副表表名",
    localKey:"主表外键名",
    foreignKey:"副表外键名",
    as:"副表as字段",
    limit:10, // limit>1则以数组形式返回
  },
  {
    dbName:"副表表名",
    localKey:"主表外键名",
    foreignKey:"副表外键名",
    as:"副表as字段",
    limit:1,
    // foreignDB能再嵌套foreignDB，等于副表的副表（因云数据库限制，最多可以嵌套15层）
    foreignDB:[
      {
        dbName:"副表表名",
        localKey:"主表外键名",
        foreignKey:"副表外键名",
        as:"副表as字段",
        limit:1,
      }
    ]
  }
]
```

### foreignDB（参数说明）

|    参数名   |   类型   | 必填 |    说明    |
|------------|----------|------|-----------|
|   dbName   |  String  |  是  |   副表表名  |
|   localKey |  String  |  是  |   主表外键名 |
|   foreignKey |  String  |  是  |   副表外键名 |
|   as         |  String  |  是  |   副表连表结果的别名 |
|   whereJson |  Object  |  否  |   副表 where 条件  |
|   fieldJson |  Object  |  否  |   副表字段显示规则  |
|   addFields |  Object  |  否  |   副表添加自定义字段规则  |
|   sortArr |  Array  |  否  |   副表排序规则  |
|   foreignDB |  Array  |  否  |   副表连表规则 |

## 场景示例

### 场景1：1张主表多张副表

主表：uni-id-users （用户表）

副表：order （用户订单表）

副表：vip （会员卡表）

以下代码作用是：用一条聚合查询语句，查询前10个用户的信息，并查询他们的最新10个订单记录表，再查询他们的VIP信息

```js

res = await vk.baseDao.selects({
  dbName: "uni-id-users",// 主表名
  getCount: false, // 是否需要同时查询满足条件的记录总数量，默认false
  getMain:false,// 是否只返回rows数据，默认false
  pageIndex: 1, // 查询第几页
  pageSize: 10, // 每页多少条数据
  // 主表where条件
  whereJson: {

  },
  // 主表字段显示规则
  fieldJson: {
    token: false,
    password: false,
  },
  // 主表排序规则
  sortArr: [{ "name": "_id","type": "desc" }],
  // 副表列表
  foreignDB: [
    {
      dbName: "order", // 副表名
      localKey:"_id", // 主表外键字段名
      foreignKey: "user_id", // 副表外键字段名
      as: "orderList",
      limit: 10, // 当limit = 1时，以对象形式返回，否则以数组形式返回
      // 副表where条件
      whereJson: {},
      // 副表字段显示规则
      fieldJson: {},
      // 副表排序规则
      sortArr: [{ "name": "time","type": "desc" }],
    },
    {
      dbName: "vip", // 副表名
      localKey:"_id", // 主表外键字段名
      foreignKey: "user_id", // 副表外键字段名
      as: "vipInfo",
      limit: 1, // 当limit = 1时，以对象形式返回，否则以数组形式返回
    }
  ]
});

```

### 场景2：1张主表多张副表，同时副表也有多张副表

主表：opendb-mall-comments （评论表）

副表：uni-id-users （用户表）

副表的副表：opendb-mall-orders（用户订单表）

以下代码作用是：用一条聚合查询语句，查询前10个评论信息，并查询评论的发布者信息，再查询他们各自最新的3个订单信息

```js
res = await vk.baseDao.selects({
  dbName:"opendb-mall-comments",
  pageIndex: 1,
  pageSize: 10,
  // 副表列表
  foreignDB:[
    {
      dbName:"uni-id-users",
      localKey:"user_id",
      foreignKey:"_id",
      as:"userInfo",
      limit:1,
      foreignDB:[
        {
          dbName:"opendb-mall-orders",
          localKey:"_id",
          foreignKey:"user_id",
          as:"orderList",
          limit:3,
          sortArr:[{ "name":"_add_time", "type":"desc" }],
        },
      ]
    }
  ]
});

```

### 场景3：需要查询同时满足主表和副表的条件，即副表不满足条件，则主表记录也不获取

主表：opendb-mall-comments （评论表）

副表：uni-id-users （用户表）

以下代码作用是：用一条聚合查询语句，查询前10条女性用户的评论信息

```js
res = await vk.baseDao.selects({
  dbName:"opendb-mall-comments",
  pageIndex: 1,
  pageSize: 10,
  // 副表列表
  foreignDB:[
    {
      dbName:"uni-id-users",
      localKey:"user_id",
      foreignKey:"_id",
      as:"userInfo",
      limit:1
    }
  ],
  lastWhereJson:{
    "userInfo.gender" : 2
  }
});
```

### 场景4：连表查询时需要按照离给定点从近到远输出（地理位置经纬度）

主表：vk-test （地理位置测试表）

副表：uni-id-users （用户表）

以下代码作用是：用一条聚合查询语句，查询前10条离我最近的记录

```js
res = await vk.baseDao.selects({
  dbName: "vk-test",
  getCount: true,
  pageIndex: 1,
  pageSize: 10,
  // 主表where条件
  whereJson: {
    location: _.geoNear({
      geometry: new db.Geo.Point(120.12792, 30.228932),  // 点的地理位置
      maxDistance: 4000,         // 选填，最大距离，米为单位
      minDistance: 0,            // 选填，最小距离，米为单位
      distanceMultiplier: 1,     // 返回时在距离上乘以该数字 1代表米 100 代表厘米 0.001 代表千米
      distanceField: "distance", // 输出的每个记录中 distance 即是与给定点的距离
    })
  },
  // 副表列表
  foreignDB: [{
    dbName: "uni-id-users",
    localKey: "user_id",
    foreignKey: "_id",
    as: "userInfo",
    limit: 1
  }]
});
```
**提示:使用地理位置经纬度查询前，数据表内需要事先准备好地理位置经纬度数据，例如：**
```js
  let longitude = 120.12792 
  let latitude = 30.228932
  res.id = await vk.baseDao.add({
    dbName:"vk-test",
    dataJson:{
      "location":new db.Geo.Point(longitude, latitude) // 使用new db.Geo.Point(longitude，latitude)方法写入
    }
  });
```

### 场景5：连表查询，主表外键是数组（id数组），查询出数组内的每个记录详情

主表：uni-id-users （用户表）

副表：uni-id-roles （角色表）

以下代码作用是：用一条聚合查询语句，查询前10个用户信息（同时带出角色列表roleList）

```js
res = await vk.baseDao.selects({
  dbName: "uni-id-users",
  getCount: true,
  pageIndex: 1,
  pageSize: 10,
  // 主表where条件
  whereJson: {

  },
  // 副表列表
  foreignDB: [{
    dbName: "uni-id-roles",
    localKey: "role",
    localKeyType: "array",
    foreignKey: "role_id",
    as: "roleList",
    limit: 500
  }]
});
```

### 场景6：连表查询，副表外键是数组（只要数组内任意元素与主表外键匹配即可）

主表：uni-id-roles （角色表）

副表：uni-id-users （用户表）

以下代码作用是：用一条聚合查询语句，查询前10个角色信息（同时带出拥有该角色的用户列表）

```js
res = await vk.baseDao.selects({
  dbName:"uni-id-roles",
  getCount:false,
  pageIndex:1,
  pageSize:10,
  // 主表where条件
  whereJson:{

  },
  // 副表列表
  foreignDB:[
    {
      dbName:"uni-id-users",
      localKey:"role_id",
      foreignKey:"role",
      foreignKeyType:"array",
      as:"userInfo",
      limit:500
    }
  ]
});
```

### 场景7：分组查询

主表：你的消费记录表或订单表

副表：uni-id-users （用户表）

以下代码作用是：用一条聚合查询语句，查询排行榜前10名用户消费金额和用户信息

```js
res = await vk.baseDao.selects({
  dbName: "你的消费记录表或订单表",
  pageIndex: 1,
  pageSize: 10,
  // 主表where条件
  whereJson: {

  },
  groupJson: {
    _id: "$user_id", // _id是分组id（_id:为固定写法，必填属性），这里指按user_id字段进行分组
    user_id: _.$.first("$user_id"), // 这里是为了把user_id原样输出
    payment_amount: _.$.sum("$payment_amount"), // sum求和支付金额
    count: _.$.sum(1), // count记录条数
  },
  sortArr: [{ name: "payment_amount",type: "desc" }], // 对分组后的结果进行排序
  // 副表列表
  foreignDB: [{
    dbName: "uni-id-users",
    localKey: "user_id",
    foreignKey: "_id",
    as: "userInfo",
    limit: 1
  }],
  // 最后的where，（分组后的筛选）主要用于对分组后的结果再进行筛选 如：筛选金额大于1000才能上榜（这里的lastWhereJson在数据量大的情况下是有性能问题的，（建议主表的where条件中先进行筛选，如只查本季度数据，只要主表过滤完后数据量不大，则没有性能问题。）
  lastWhereJson:{
    payment_amount:_.gt(1000)
  }
});
```

### 场景8：分组统计带if

以下代码作用是：以班级分组，统计本期考试每个班级学生成绩中，数学成绩大于语文成绩的人数和物理成绩大于化学成绩的人数

```js
res = await vk.baseDao.selects({
  dbName: "学生学科成绩表",
  pageIndex: 1,
  pageSize: 500,
  // 主表where条件
  whereJson: {
    no:"20211201", // 本期考试编号
  },
  groupJson: {
    _id: "$班级id字段", // 以 班级id 作为分组字段
    // count1是 数学成绩大于语文成绩的人数
    count1: $.sum($.cond({
      if: $.gte(['$数学成绩字段', '$语文成绩字段']),
      then: 1,
      else: 0,
    })),
    // count2是 物理成绩大于化学成绩的人数
    count2: $.sum($.cond({
      if: $.lt(['$物理成绩字段', '$化学成绩字段']),
      then: 1,
      else: 0,
    })),
  },
  // 数学成绩大于语文成绩的人数越多,越显示在前面.
  sortArr: [{ "name": "count1", "type": "desc" }]
});
```

### 场景9：连表查询，并获取满足条件的第一条记录，以对象形式返回

```js
let info = await vk.baseDao.selects({
  dbName: "用户表",
  getOne: true,
  getMain: true,
  // 主表where条件
  whereJson: {
    _id: "001"
  },
  foreignDB: [
    {
      dbName: "vip", // 副表名
      localKey:"vip_id", // 主表外键字段名
      foreignKey: "user_id", // 副表外键字段名
      as: "vipInfo",
      limit: 1, // 当limit = 1时，以对象形式返回，否则以数组形式返回
    }
  ]
});
```

**参数解析**

* getOne:true 代表只获取满足条件的第一条数据，并以对象形式返回。
* getMain:true 代表返回的数据不包含code:0

**即原本selects返回的数据格式是这样的。**

```json
{
  "code": 0,
  "msg": "查询成功",
  "total": 1,
  "hasMore": false,
  "rows": [{"_id":"001","name":"xxx"}]
}
```

**getOne:true 后 返回的数据格式是这样的（rows从数组变成了对象）**

```json
{
  "code": 0,
  "msg": "查询成功",
  "total": 1,
  "hasMore": false,
  "rows": {"_id":"001","name":"xxx"}
}
```

**getMain:true 后 返回的数据格式是这样的（直接返回rows的值）**

```json
[{"_id":"001","name":"xxx"}]
```

**getMain:true + getOne:true 后 返回的数据格式是这样的（等于findByWhereJson的效果，但具有连表功能）**

```json
{"_id":"001","name":"xxx"}
```

### 场景10：利用分组查询实现以指定字段去重复查询

**注意：分组后，显示其他字段需要通过`_.$.first("$key1"),`形式**

first代表分组后，显示该组第一条数据的该字段值。

```js
res = await vk.baseDao.selects({
  dbName: "表名",
  pageIndex: 1,
  pageSize: 10,
  // 主表where条件（分组前的筛选）
  whereJson: {
    
  },
  groupJson: {
    _id: "$key1", // _id是分组id（_id:为固定写法，必填属性） $ 后面接字段名，如user_id字段进行分组
    key1: _.$.first("$key1"), // $ 后面接字段名，如把user_id原样输出
    key2: _.$.first("$key2"), // $ 后面接字段名，如把user_id原样输出
    key3: _.$.first("$key3"), // $ 后面接字段名，如把user_id原样输出
    key4: _.$.first("$key4"), // $ 后面接字段名，如把user_id原样输出
    count: _.$.sum(1), // 代表每组各有多少条记录总量
  },
  sortArr: [{ name: "count",type: "desc" }], // 对分组后的结果进行排序
  // 最后的where，（分组后的筛选）主要用于对分组后的结果再进行筛选 如：筛选金额大于1000才能上榜（这里的lastWhereJson在数据量大的情况下是有性能问题的，（建议主表的where条件中先进行筛选，如只查本季度数据，只要主表过滤完后数据量不大，则没有性能问题。）
  // lastWhereJson:{
  //   count:_.gte(10)
  // }
});
```

**还可以多字段组合去重复**

```js
res = await vk.baseDao.selects({
  dbName: "表名",
  pageIndex: 1,
  pageSize: 10,
  // 主表where条件（分组前的筛选）
  whereJson: {
    
  },
  groupJson: {
    _id: {
      key1:"$key1",
      key2:"$key2",
    }, // _id是分组id（_id:为固定写法，必填属性）， $ 后面接字段名，如user_id字段进行分组
    key1: _.$.first("$key1"), // $ 后面接字段名，如把user_id原样输出
    key2: _.$.first("$key2"), // $ 后面接字段名，如把user_id原样输出
    key3: _.$.first("$key3"), // $ 后面接字段名，如把user_id原样输出
    key4: _.$.first("$key4"), // $ 后面接字段名，如把user_id原样输出
    count: _.$.sum(1), // 代表每组各有多少条记录总量
  },
  sortArr: [{ name: "count",type: "desc" }], // 对分组后的结果进行排序
  // 最后的where，（分组后的筛选）主要用于对分组后的结果再进行筛选 如：筛选金额大于1000才能上榜（这里的lastWhereJson在数据量大的情况下是有性能问题的，（建议主表的where条件中先进行筛选，如只查本季度数据，只要主表过滤完后数据量不大，则没有性能问题。）
  // lastWhereJson:{
  //   count:_.gte(10)
  // }
});
```

### 场景11：使用数组下标对应的值进行连表

**核心**

```js
localKey: $.arrayElemAt(['$inviter_uid', 0]),
```

**注意**

```js
$ = db.command.aggregate
```

下方的代码效果是查询并连表带出用户的第一级分享人信息

```js
res = await vk.baseDao.selects({
  dbName: "uni-id-users",
  getCount: false,
  pageIndex: 1,
  pageSize: 5,
  fieldJson:{ token: false, password: false },
  // 副表列表
  foreignDB: [{
    dbName: "uni-id-users",
    localKey: $.arrayElemAt(['$inviter_uid', 0]),
    foreignKey: "_id",
    as: "inviterUserInfo",
    limit: 1,
    fieldJson:{ token: false, password: false },
  }]
});
```

### 场景12：通过副表字段排序

主表：opendb-mall-comments （评论表）

副表：uni-id-users （用户表）

以下代码作用是：用一条聚合查询语句，查询前10条女性用户的评论信息，且优先展示新用户

```js
res = await vk.baseDao.selects({
  dbName:"opendb-mall-comments",
  pageIndex: 1,
  pageSize: 10,
  // 副表列表
  foreignDB:[
    {
      dbName:"uni-id-users",
      localKey:"user_id",
      foreignKey:"_id",
      as:"userInfo",
      limit:1
    }
  ],
  lastSortArr: [{ name: "userInfo._add_time",type: "desc" }],
});
```
