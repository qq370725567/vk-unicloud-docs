---
sidebarDepth: 0
---

# 查询返回树状结构

## 代码示例@demo

### 树状结构@demo1

以下语句效果是：查询已启用的菜单，并自动将子菜单合并到父菜单的children字段下

```js
res = await vk.baseDao.selects({
  dbName: "opendb-admin-menus",
  pageIndex: 1,
  pageSize: 500,
  whereJson:{
    enable: true,
    parent_id: _.in([null, ""]),
    menu_id: _.exists(true)
  },
  sortArr: [{ name: "sort", type: "asc" }], // 主节点的排序规则
  // 树状结构参数
  treeProps: {
    id: "menu_id",          // 唯一标识字段，默认为 _id
    parent_id: "parent_id", // 父级标识字段，默认为 parent_id
    children: "children",   // 自定义返回的下级字段名，默认为 children
    level: 3,               // 查询返回的树的最大层级。超过设定层级的节点不会返回。默认10级，最大15，最小1
    limit: 500,             // 每一级最大返回的数据。
    sortArr: [{ name: "sort", type: "asc" }], // 所有子节点的排序规则
    whereJson: {
      enable: true
    }
  }
});
```

### 树状结构+or查询条件@demo2

**注意：**

`treeProps` 内的 `whereJson` 若需要用到 `or` 和 `and` 则

`_.or` 需写成 `$.or`

`_.and` 需写成 `$.and`

同时不支持流式语法，只支持如下写法。

```js
let selectsRes = await vk.baseDao.selects({
  dbName: "opendb-admin-menus",
  pageIndex: 1,
  pageSize: 500,
  whereJson:{
    enable: true,
    parent_id: _.in([null, ""]),
    menu_id: _.exists(true)
  },
  sortArr: [{ name: "sort", type: "asc" }], // 主节点的排序规则
  // 树状结构参数
  treeProps: {
    id: "menu_id",          // 唯一标识字段，默认为 _id
    parent_id: "parent_id", // 父级标识字段，默认为 parent_id
    children: "children",   // 自定义返回的下级字段名，默认为 children
    level: 3,               // 查询返回的树的最大层级。超过设定层级的节点不会返回。默认10级，最大15，最小1
    limit: 500,             // 每一级最大返回的数据。
    sortArr: [{ name: "sort", type: "asc" }], // 所有子节点的排序规则
    whereJson: $.or([
      {
        menu_id: _.eq("sys-user-manage")
      },
      {
        menu_id: _.exists(false)
      }
    ])
  }
});
```

### 树状结构+and+or查询条件@demo3

**注意：**

`treeProps` 内的 `whereJson` 若需要用到 `or` 和 `and` 则

`_.or` 需写成 `$.or`

`_.and` 需写成 `$.and`

同时不支持流式语法，只支持如下写法。

```js
let selectsRes = await vk.baseDao.selects({
  dbName: "opendb-admin-menus",
  pageIndex: 1,
  pageSize: 500,
  whereJson:{
    enable: true,
    parent_id: _.in([null, ""]),
    menu_id: _.exists(true)
  },
  sortArr: [{ name: "sort", type: "asc" }], // 主节点的排序规则
  // 树状结构参数
  treeProps: {
    id: "menu_id",          // 唯一标识字段，默认为 _id
    parent_id: "parent_id", // 父级标识字段，默认为 parent_id
    children: "children",   // 自定义返回的下级字段名，默认为 children
    level: 3,               // 查询返回的树的最大层级。超过设定层级的节点不会返回。默认10级，最大15，最小1
    limit: 500,             // 每一级最大返回的数据。
    sortArr: [{ name: "sort", type: "asc" }], // 所有子节点的排序规则
    whereJson: $.and([
      {
        menu_id: _.eq("sys-user-manage")
      },
      $.or([
        {
          menu_id: _.eq("sys-user-manage2")
        },
        {
          menu_id: _.exists(true)
        }
      ])
    ])
  }
});
```

### 树状结构+连表@demo4

连表时，`foreignDB` 属性只需写在主表下，无需写在 `treeProps` 内。（子表会继承主表的 `foreignDB` 属性)

```js
res = await vk.baseDao.selects({
  dbName: "opendb-admin-menus",
  pageIndex: 1,
  pageSize: 500,
  whereJson:{
    enable: true,
    parent_id: _.in([null, ""]),
    menu_id: _.exists(true)
  },
  sortArr: [{ name: "sort", type: "asc" }], // 主节点的排序规则
  // 树状结构参数
  treeProps: {
    id: "menu_id",          // 唯一标识字段，默认为 _id
    parent_id: "parent_id", // 父级标识字段，默认为 parent_id
    children: "children",   // 自定义返回的下级字段名，默认为 children
    level: 3,               // 查询返回的树的最大层级。超过设定层级的节点不会返回。默认10级，最大15，最小1
    limit: 500,             // 每一级最大返回的数据。
    sortArr: [{ name: "sort", type: "asc" }], // 所有子节点的排序规则
    whereJson: {
      enable: true
    }
  },
  // 副表列表
  foreignDB: [
    {
      dbName: "副表1表名",
      localKey: "主表外键名",
      foreignKey: "副表1外键名",
      as: "副表1as字段",
      limit: 1
    },
    {
      dbName: "副表2表名",
      localKey: "主表外键名",
      foreignKey: "副表2外键名",
      as: "副表2as字段",
      limit: 1
    }
  ]
});
```

下方的代码效果是查询用户列表，并自动带出用户推广的用户列表（组成树状结构，支持带出多层）

```js
res = await vk.baseDao.selects({
  dbName: "uni-id-users",
  pageIndex: 1,
  pageSize: 1000,
  whereJson:{
    inviter_uid:  _.exists(false),
  },
  // 树状结构参数
  treeProps: {
    id: "_id",
    parent_id: $.arrayElemAt(['$inviter_uid', 0]),
    children: "children",
    level: 2,
    limit: 1000,
    whereJson: {
      
    }
  }
});
```

## 注意：文档中出现的 $ 在云函数若不可用，则可写成 _.$@tips

以下是 _ 和 $ 变量实际代表的含义

```javascript
const db = uniCloud.database(); // 全局数据库引用
const _ = db.command; // 数据库操作符
const $ = _.aggregate; // 聚合查询操作符
```


