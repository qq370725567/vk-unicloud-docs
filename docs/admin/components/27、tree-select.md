# 27、tree-select 树形选择

### 万能表单使用方式
#### 静态数据方式1
#### 应用场景：选项数据为静态数据的情况。
```js
{
  key:"tree1", title:"本地数据", type:"tree-select",
  data:[
    {
      value:1,
      label:"数学",
      children:[
        { value:11,label:"奥数" },
        { value:12,label:"微积分" }
      ]
    },
    {
      value:2,
      label:"语文",
      children:[
        { value:21, label:"文言文" },
        { value:22, label:"古诗" }
      ]
    },
  ]
}
```

#### 静态数据方式2
#### 应用场景：选项数据需要通过函数计算
```js
{
  key:"tree1", title:"本地数据", type:"tree-select",
  data:function(){
    let list = that.list;
    return list;
  }
}
```


#### 远程数据方式
#### 应用场景：需要从数据库中获取选项的情况。
```js
{ 
  key:"parent_id", title:"父级菜单", type:"tree-select", tips:"父级的menu_id" ,
  action:"admin/system/menu/sys/getAll",
  props: { list:"rows", value:"menu_id", label:"label", children:"children" },
}
```

### API

### 属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| data            | 静态模式数据源 | Array、Function  | - | -  |
| action          | 动态模式 - 远程请求的云函数地址 | String  | - | -  |
| props          | 数据源的属性匹配规则 | Object  | [查看props](#props)  | -  |
| showAllLevels      | 输入框中是否显示选中值的完整路径 | Boolean  | true | false  |
| collapseTags      | 多选模式下是否折叠Tag | Boolean  | false | true  |
| separator        | 选项分隔符 | String  | 斜杠' / ' | -  |
| filterable        | 是否可搜索选项 | Boolean  | - | -  |
| filterMethod          | 自定义搜索逻辑 | function(node, keyword)  | -| - |
| debounce          | 搜索关键词输入的去抖延迟，毫秒 | Number  | 300 | -  |
| beforeFilter          | 筛选之前的钩子，若返回 false 或者返回 Promise 且被 reject，则停止筛选 | function(value)  | -| - |
| multiple      | 是否可多选 | Boolean  | false | true  |
| checkStrictly      | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 | Boolean  | false | true  |



#### props

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| list    | 数据源的键名，一般为rows | String  | list | -  |
| value            | 指定选项的值为选项对象的某个属性值 | String  | value | - |
| label            | 指定选项标签为选项对象的某个属性值 | String  | label | - |
| children         | 指定选项的子选项为选项对象的某个属性值 | String  | children | - |
| disabled         | 指定选项的禁用为选项对象的某个属性值 | String  | disabled | - |


#### onChange 使用示例
```js
{
  key:"tree1", title:"本地数据", type:"tree-select",
  data:[
    {
      value:1,
      label:"数学",
      children:[
        { value:11,label:"奥数" },
        { value:12,label:"微积分" }
      ]
    },
    {
      value:2,
      label:"语文",
      children:[
        { value:21, label:"文言文" },
        { value:22, label:"古诗" }
      ]
    }
  ],
  onChange:function(val, formData, column, index, option, val2, option2){
    /**
     * val 双向绑定的表单值
     * formData 双向绑定的整个表单数据源
     * option val对应的对象
     * val2 多选模式下包含了父级的值
     * option2 val2对应的对象
     */
    console.log(1,val, formData, column, index, option, val2, option2);
    // 在多选模式下想获取树状结构的数据，可以参考下面写法
    let newObj = vk.pubfn.copyObject(option2); //拷贝
    let arr = []
    for (let i = 0; i < newObj.length; i++) {
        delete newObj[i].children //去除children
        arr.push(newObj[i])
    }
    // 通过数组转对象的方法转成需要的树状结构并赋给formData
    formData.objArr = vk.pubfn.arrayToTree(arr,{
        id:"_id", 
        parent_id:"parent_id", 
        children:"children"
    });
  }
}
```

### 万能表格使用方式

#### 无


### template 使用方式
#### 静态数据方式
#### 应用场景：选项数据为静态数据的情况。
```html
<vk-data-input-tree-select
  v-model="form1.value"
  :localdata="[
    {
      value:1,
      label:'数学',
      children:[
        { value:11,label:'奥数' },
        { value:12,label:'微积分' }
      ]
    },
    {
      value:2,
      label:'语文',
      children:[
        { value:21, label:'文言文' },
        { value:22, label:'古诗' }
      ]
    },
  ]"
  placeholder="请选择"
></vk-data-input-tree-select>
```
#### 远程数据方式
#### 应用场景：需要从数据库中获取选项的情况。
```html
<vk-data-input-tree-select
  v-model="form1.value"
  action="admin/system/menu/sys/getAll"
  :props="{ list:'rows', value:'menu_id', label:'label', children:'children' }"
  placeholder="请选择"
></vk-data-input-tree-select>
```
