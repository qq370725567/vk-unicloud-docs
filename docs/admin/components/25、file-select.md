# 25、file-select 素材库选择

### 效果图
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/0ca12bfc-703e-4662-98b8-068ed01e4fac.png)
### 万能表单使用方式
```js
{ key:"image1", title:"多选图片", type:"file-select", placeholder:"请选择图片", fileType:"image", multiple:true, multipleLimit:6 }
```

### API

### 属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| fileType            | 文件类型 | String  | image | image、video、other |
| multiple            | 是否可多选 | Number  | - | -  |
| multipleLimit            | 最大多选数量 | Number  | 9 | -  |
| defaultCategory            | 默认显示哪个分类下的素材（分类ID） | String  | - | - |
| upload            | 是否允许上传 | Boolean  | true | false |
| updateCategory    | 是否允许编辑分类 | Boolean  | true | false  |

### 万能表格使用方式

```js
 { key: "image", title: "图片", type: "image", width: 120 }
```


### template 使用方式
```html
<vk-data-input-file-select v-model="image1" placeholder="请选择图片" multiple :multiple-limit="9" file-type="image"></vk-data-input-file-select>
```

### 注意：
### 需确保有以下云函数（如没有，则从新版本中拷贝）
* 1、admin/system_uni/vk-files/files/kh/delete

* 2、admin/system_uni/vk-files/files/kh/getList

* 3、admin/system_uni/vk-files/files/kh/update

* 4、admin/system_uni/vk-files/categories/kh/getList

* 5、admin/system_uni/vk-files/categories/sys/add

* 6、admin/system_uni/vk-files/categories/sys/delete

* 7、admin/system_uni/vk-files/categories/sys/update

* 8、user/kh/addUploadRecord


### 若需要使用 `素材管理`，则还需要进行以下操作
#### 1、拷贝目录 `/pages_plugs/system_uni/uni-id-files/`（如果没有，则从新版本中拷贝）

#### 2、在`pages.json` 中的子包 `pages_plugs` 添加 `{ "path": "system_uni/uni-id-files/list" }`

#### 3、`导入` 动态菜单

* 1、打开admin后台，进入用户角色权限 - 菜单管理 

* 2、点击 `通过json导入菜单` 选择

* 3、粘贴下面的数组

```js
[
  {
    "menu_id": "system_uni",
    "name": "系统设置",
    "icon": "el-icon-s-tools",
    "sort": 110,
    "children": [{
        "menu_id": "system-uni-uni-id-files",
        "name": "素材管理",
        "icon": "el-icon-folder-opened",
        "url": "/pages_plugs/system_uni/uni-id-files/list",
        "sort": 0
      }
    ]
  }
]
```

* 4、导入

* 5、刷新页面，点击系统设置-素材管理（如果是非admin账号，则需要授权才能看到）

#### 注意：前端 `vk.uploadFile` 带参数 `needSave: true`时，上传的图片记录会保存到admin后台，可在`素材管理`中查看