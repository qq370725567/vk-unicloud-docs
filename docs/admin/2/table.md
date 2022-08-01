# 万能表格

#### 核心思想：通过 JSON 配置渲染规则

## 基础用法
```html
<vk-data-table :data="table1.data" :columns="table1.columns"></vk-data-table>
```
```js
export default {
  data() {
    // 页面数据变量
    return {
      table1:{
        // 表格数据
        data:[],
        // 表格字段显示规则
        columns:[
          { key:"_id" , title:"用户ID" , type:"text" , width:200 },
          { key:"username" , title:"用户名" , type:"text" , width:200 },
          { key:"nickname" , title:"用户昵称" , type:"text" , width:200 },
          { key:"mobile" , title:"手机号" , type:"text" , width:200 },
          { key:"comment" , title:"备注" , type:"text" , minWidth:200 },
        ]
      }
    };
  }
};
```

## 进阶用法

请直接看示例文件 `/pages_template/components/table/table-easy`

# API

## 属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| action           | 动态模式 - vk框架下的云函数地址            | String | 无      | - |
| auto-action       | 动态模式 - 是否组件加载完毕后自动运行action | Boolean  | 无 | -  |
| query-form-param   | 动态模式 - 请求参数（表格查询参数） | Object  | {} | -  |
| data-preprocess          | 动态模式 - 云函数返回的数据进行预处理 [查看数据预处理](#数据预处理)  | function(list)  | - | -  |
| is-request    | 动态模式 - 是否是http请求模式 [查看http请求模式](#http请求模式) | Boolean  | false | true |
| request-header    | 动态模式 - http请求头 | Object  | - | - |
| props    | 动态模式 - 渲染数据的配置选项 [查看http请求模式](#http请求模式) | Object  | - | - |
| retry-count    | 动态模式 - 请求最大重试次数 [查看异常重试机制](#异常重试机制) | Number  | 0 | - |
| retry-interval    | 动态模式 - 每次重试间隔，单位毫秒 | Number  | 0 | - |
| data             | 静态模式 - 列表数据 | Array  | 无 | -  |
| total            | 静态模式 - 总记录数 | Number  | 无 | -  |
| columns          | 通用 - 字段显示规则 [查看columns](#columns-字段列表)| Array  | [] | -   |
| height           | 通用 - table的高度 | Number  | 无 | -  |
| max-height        | 通用 - table的最大高度 | Number  | 无 | -  |
| row-height        | 通用 - 行高 | Number  | 无 | -  |
| row-key      | 通用 - 行数据的 Key （重要：值必须唯一，默认是_id） | Function,String  | "_id" | - |
| top          | 通用 - margin-top的高度 | Number  | 10 | -  |
| selection          | 通用 - 显示多选框 | Boolean  | false | true |
| selectable          | 通用 - 搭配selection=true时使用，返回值用来决定这一行的 CheckBox 是否可以勾选 [查看用法](#表格自带的多选框禁用规则)  | Function(row,index)  | - | - |
| rowNo          | 通用 - 显示序号 | Boolean  | false | true |
| pagination     | 通用 - 显示分页器 | Boolean  | false | true |
| page-size       | 通用 - 每页显示数量 | Number  | 10 | - |
| page-sizes      | 通用 - 每页显示数量选择列表 | Array  | [1, 5, 10, 20, 50, 100, 1000] | - |
| right-btns      | 通用 - 右侧显示的按钮列表 [查看right-btns](#right-btns-右侧固定按钮列表) | Array  | [] | - |
| right-btns-type      | 通用 - 右侧显示的按钮类型 | String  | button | text |
| right-btns-align     | 通用 - 右侧显示的按钮对齐方式 | String  | center | left right |
| right-btns-more      | 通用 - 右侧更多按钮 [查看right-btns-more](#right-btns-more-更多按钮列表)| Array  | [] | - |
| custom-right-btns      | 通用 - 自定义右侧按钮 [查看custom-right-btns](#custom-right-btns-自定义右侧固定按钮)| Array  | [] | - |
| empty-text      | 通用 - 空数据时显示的文本内容 | String  | "暂无数据" | - |
| default-expand-all      | 通用 - 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效 | Boolean  | false | true |
| tree-props      | 通用 - 渲染嵌套数据的配置选项 | Object  | {children: 'children', hasChildren: 'hasChildren'} | - |
| border     | 通用 - 是否带有纵向边框 | Boolean  | false | true |
| stripe     | 通用 - 是否为斑马纹 | Boolean  | false | true |
| size     | 通用 - Table 的尺寸 | String  | 无 | medium / small / mini |
| show-header     | 通用 - 是否显示表头 | Boolean  | true | false |
| highlight-current-row     | 通用 - 是否要高亮当前行 [查看高亮行处理](#高亮行处理) | Boolean  | true | false |
| detail-dialog-width     | 通用 - 详情弹窗的宽度 | Number,String  | "830px" | - |
| multiple     | 通用 - 可多选 |Boolean  | true | false |
| default-sort     | 默认排序规则 [查看default-sort](#default-sort-默认排序)|Object  | - | -  |
| show-summary     | 通用 - 是否需要显示合计行 |Boolean  | false | true |
| summary-method     | 通用 - 自定义合计的计算函数（详情见下方） [查看summary-method](#summary-method) |Function  | - |-  |
| total-option     | 通用 - 需要自动统计的行（详情见下方） |Array  | - | - |
| expand     | 通用 - 是否开启点击可以展开行 [查看展开行](#展开行)|Boolean  | false | true |
| left-fixed     | 通用 - 序号、多选框是否固定在左侧 |Boolean  | true | false |
| right-fixed     | 通用 - 操作按钮是否固定在右侧 |Boolean  | true | false |

### columns（字段列表）
columns 是一个数组，数组内每个元素有以下属性

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| key    |   键名    | String  | 无    | - |
| title  |   标题    | String  | 无    | -  |
| type   |   类型    | String  | 无    | [查看type](#type-字段类型)   |
| width  |   宽度    | Number  | 无    | -  |
| minWidth  | 最小宽度（设置此值会自动填充宽度） | Number  | 无    | -  |
| align  |  对其方式 | String  | center    | left 、right  |
| headerAlign  |  表头对其方式 | String  | center    | left 、right  |
| sortable  |  是否是排序字段 | String  | custom  | true 、false  |
| fixed  | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean  | 无  | true、left、right  |
| show  | 显示规则，[查看show](#show-字段显示规则)  | string 、 array | ["detail","row","expand"]  | "detail"、"row"、"expand"、 "none"  |
| defaultValue  |   默认值  | String  | 无  | -  |
| formatter  | 自定义格式化函数 | function(val, row, column, index)  | -  | -  |
| buttons  | 扩展按钮列表 [查看buttons](#buttons-字段扩展按钮列表)| Array | -  | -  |

### default-sort（默认排序）
| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| name           | 需要排序的字段名            | String | -      | - |
| type           | 排序类型            | String | asc（升序）  | desc（降序） |


### right-btns（右侧固定按钮列表）

**高效用法**

效果图

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/bb64b55a-9f94-4b40-a1d5-d4ad93513e83.png)

```html
<vk-data-table
  :right-btns="['detail_auto','update','delete','more']"
></vk-data-table>
```

**自定义显示规则用法**

效果图

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/97b70681-214b-49bb-a96c-835f8876aec7.png)

```html
<vk-data-table
  :right-btns="table1.rightBtns"
  right-btns-align="right"
></vk-data-table>
```

```js
data() {
  return {
    table1:{
      
      rightBtns:[
      	'detail_auto',
      	{
      		mode:'update',
      		title:'编辑',
      		disabled: (item)=>{
      			return item._id == '002'
      		}
      	},
      	{
      		mode:'delete',
      		title:'删除',
      		show: (item)=>{
      			return item._id != '002'
      		}
      	},
      	'more'
      ],
      
    }
  }
}
```

##### right-btns数组内的可选值有
| 可选值   | 说明                    |
|----------|------------------------|
| detail     | 点击后触发detail事件 |
| detail_auto     | 点击后自动弹出详情页 |
| update     | 点击后触发update事件 |
| delete     | 点击后触发delete事件 |
| more     | 与 rightBtnsMore 搭配使用|

### right-btns-more（更多按钮列表）
right-btns-more（右侧更多按钮点击后显示的按钮列表）

**效果图**

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/04d7bad0-87d3-4e54-b275-3c89cb833d11.png)

```html
<vk-data-table
  right-btns="['detail_auto','update','delete','more']"
  :right-btns-more="table1.rightBtnsMore"
></vk-data-table>

```

```js
data() {
  return {
    table1:{
      
      rightBtnsMore:[
        {
          title: '按钮1',
          disabled: (item)=>{
            return item._id == '002'
          },
          onClick: (item)=>{
            vk.toast(`${item._id}-按钮1`);
          }
        },
        {
          title: '按钮2',
          show: (item)=>{
            return item._id != '002'
          },
          onClick: (item)=>{
            vk.toast(`${item._id}-按钮2`);
          }
        },
        {
          title: '按钮3',
          disabled: '_id==002',
          onClick: (item)=>{
            vk.toast(`${item._id}-按钮3`);
          }
        },
        {
          title: '按钮4',
          disabled: '_id!=002',
          onClick: (item)=>{
            vk.toast(`${item._id}-按钮4`);
          }
        }
      ]
      
    }
  }
}
```

### custom-right-btns（自定义右侧固定按钮）

**效果图**

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/3d559376-73af-4749-9516-f9c33149d74f.png)

```html
<vk-data-table
  :custom-right-btns="table1.customRightBtns"
  right-btns-align="right"
></vk-data-table>
```

```js
data() {
  return {
    table1: {
      
      customRightBtns: [
      	{
      		title: '按钮1', type: 'primary', icon: 'el-icon-edit',
      		disabled:(item)=>{
      			return item._id == '002'
      		},
      		onClick:(item)=>{
      			vk.toast(`${item._id}-按钮1`);
      		}
      	},
      	{
      		title: '按钮2', type: 'success', icon: 'el-icon-edit',
      		show:(item)=>{
      			return item._id != '002'
      		},
      		onClick:(item)=>{
      			vk.toast(`${item._id}-按钮2`);
      		}
      	},
      	{
      		title: '按钮3', type: 'warning', icon: 'el-icon-edit',
      		disabled: '_id==002',
      		onClick:(item)=>{
      			vk.toast(`${item._id}-按钮3`);
      		}
      	},
      	{
      		title: '按钮4', type: 'danger', icon: 'el-icon-edit',
      		disabled: '_id!=002',
      		onClick:(item)=>{
      			vk.toast(`${item._id}-按钮4`);
      		}
      	}
      ],
      
    }
  }
}
```



### 高亮行处理

通过设置
```html
:highlight-current-row = "false"
```
可以关闭 `点击` 某行时的高亮，若想要关闭 `hover` 某行时的高亮，可以通过以下css样式覆盖达到效果。(将下方css写在需要生效的页面的style标签内)
```css
::v-deep .plTableBox .el-table__body tr.hover-row.current-row>td,
::v-deep .plTableBox .el-table__body tr.hover-row.el-table__row--striped.current-row>td,
::v-deep .plTableBox .el-table__body tr.hover-row.el-table__row--striped>td,
::v-deep .plTableBox .el-table__body tr.hover-row>td {
  background-color: #FFFFFF !important;
}
```


### http请求模式
#### props 对象属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| rows           | 表格数据源的键名            | String | rows      | - |
| total           | 总记录条数的键名           | String | total  | - |
| pageIndex       | 查询时当前第几页的键名      | String | pageIndex  | - |
| pageSize        | 查询时每页显示几条的键名    | String | pageSize  | - |
| formData        | 查询表单的数据源的键名      | String | formData  | - |

#### 示例代码

```html
<vk-data-table
  ref="table1"
  action="https://www.xxx.com/xxx/xxx"
  :is-request="true"
  :props="{ rows: 'rows', total: 'total', pageIndex: 'pageIndex', pageSize: 'pageSize', formData: 'formData' }"
  :columns="table1.columns"
  :query-form-param="queryForm1"
></vk-data-table>
```

### 数据预处理

```html
<vk-data-table
  :data-preprocess="table1.dataPreprocess"
></vk-data-table>
```

```js
export default {
  data() {
    return {
      table1:{
        
        dataPreprocess : (list) => {
          // 这里写自己的处理逻辑，最终返回处理完的list即可。
          list.map((item, index) => {
          	item.a = 1;
          });
          return list;
        }
        
      }
    }
  }
}
  
```

### 展开行
当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。
```html
<vk-data-table
  ref="table1"
  :action="table1.action"
  :columns="table1.columns"
  :query-form-param="queryForm1"
  :expand="true"
></vk-data-table>
```

可以配合show选择展开后显示的哪些字段  [查看show](#show)

同时还可以通过插槽编写展开后的样式 [查看插槽](#展开行插槽)

### 表格自带的多选框禁用规则
```html
<vk-data-table
  :selection="true"
  :selectable="table1.selectable"
></vk-data-table>
```

```js
export default {
  data() {
    return {
      table1:{
        
        selectable:(row,index)=>{
          // 返回true,代表可以多选,返回false代表该行的多选框禁用。
          if (index == 1) {
            return false;
          } else {
            return true;
          }
        }
        
      }
    }
  }
}
  
```

### 异常重试机制

`retry-count` 属性异常重试机制可以有效解决当前阿里云空间偶尔会出现数据库连接超时导致的异常没有获取到数据的问题。

同时可以通过设置 `retry-interval` 属性，可以控制每次重试的间隔（单位为毫秒）

```html
<vk-data-table
  ref="table1"
  :action="table1.action"
  :columns="table1.columns"
  :query-form-param="queryForm1"
  :retry-count="3"
></vk-data-table>
```

注意：并非所有异常都会重试，框架会合理判断。（目前此判断逻辑也还在不断优化中）

## columns（属性详细说明）

### show（字段显示规则）

show是一个字符串数组，columns 数组内每一个元素都可以单独设置 show

* 如果 columns 的某元素中不存在 show 参数，则代表全部显示（行内、详情弹窗、行展开时）

* 如果数组中有包含 "detail" ，则代表会在详情弹窗时显示

* 如果数组中有包含 "row" ，则代表会在表格行内显示

* 如果数组中有包含 "expand" ，则代表会在表格行展开时显示

* 如果数组只有 ["none"] ，则代表都不显示

[返回展开行](#展开行)

### type（字段类型）
```js
table1:{
  columns:[
    { key: "nickname", title: "昵称", type: "text", width: 120, defaultValue:"未设置昵称", },
    { key: "avatar", title: "头像", type: "avatar", width: 80, imageWidth:40, shape:"circle" }, // circle 圆形 square 方形
    { key: "images", title: "图片", type: "image", width: 120, imageWidth:60 },
    { key: "rate", title: "评分", type: "rate", width: 120 },
    { key: "switch", title: "开关", type: "switch", width: 120, activeValue:true, inactiveValue:false },
    { key: "icon1", title: "图标", type: "icon", width: 120 },
    { 
      key: "icon2", title: "图标", type: "icon", width: 120,
      // 当 icon2 值为1时，显示vk-icon-activityfill图标，2时，显示vk-icon-crownfill图标
      data:[
      	{ value:1, icon:"vk-icon-activityfill"},
        { value:2, icon:"vk-icon-crownfill"}
      ]
    },
    { 
      key: "type", title: "类型", type: "tag", width: 120, size: "small",
      data:[
        { value:1, label:"收入", tagType:"success" },
        { value:2, label:"支出", tagType:"danger" }
      ]
    },
    { key: "_add_time", title: "添加时间", type: "time", width: 160, valueFormat:"yyyy-MM-dd hh:mm:ss" },
    { key: "_add_time", title: "距离现在", type: "dateDiff", width: 120 },
    { key:"exp_time", title:"到期剩", type:"dateDiff2", endText:"已到期", width:80, defaultValue: "永久", sortable:"custom" },
    { 
      key: "nickname", title: "html渲染", type: "html",
      formatter: (val, row, column, index) => {
        let str = `<text>${val}</text>（审核通过）`;
        return str;
      }
    },
    { key: "balance", title: "余额", type: "money", width: 120 },
    { key: "percentage", title: "占比", type: "percentage", width: 120 },
    { key: "address", title: "地址", type: "address", width: 120 },
    { key: "userInfo", title: "用户", type: "userInfo", width: 120 },
    // group 是将多个字段显示在一个单元格内
    { 
      key: "", title: "分组显示", type: "group", minWidth: 290, align:"left",
      columns:[
        { key: "_id", title: "ID", type: "text" },
        { key: "avatar", title: "头像", type: "avatar" },
        { key: "nickname", title: "昵称", type: "text" },
      ],
    },
    // object 是解析对象类型的字段
    { 
      key: "object1", title: "对象字段", type: "object", width: 180, align:"left",
      columns:[
        { key: "key1", title: "对象内字段1", type: "text" },
        { key: "key2", title: "对象内字段2", type: "text" },
      ],
    },
    // table 是解析对象数组类型的字段，建议只在详情页内展示.
    { 
      key: "arr1", title: "对象数组字段", type: "table", width: 200, show: ["detail"],
    	rowHeight:50, // 行高
    	columns: [
    		{ key: "key1",title: "对象的字段1",type: "text",width: 120 },
    		{ key: "key2",title: "对象内字段2",type: "text",width: 120 }
    	]
    },
    { 
      key: "gender", title: "性别", type: "radio", width: 120, defaultValue:0,
      data:[
        { value:1, label:"男" },
        { value:2, label:"女" },
        { value:0, label:"保密" },
      ]
    },
    { 
      key: "gender", title: "性别", type: "select", width: 120, defaultValue:0,
      data:[
        { value:1, label:"男" },
        { value:2, label:"女" },
        { value:0, label:"保密" },
      ]
    },
    { 
      key: "checkbox", title: "多选字段", type: "checkbox", width: 120, defaultValue:1,
      data:[
        { value: 1, label: "选项1" },
        { value: 2, label: "选项2" },
      ]
    },
    { key: "json", title: "json字段", type: "json", width: 120, maxHeight:300 }
  ]
}
```

### buttons（字段扩展按钮列表）

每个字段的扩展按钮列表（支持每行记录显示不同的按钮）

效果图：（此效果图为场景1的样式）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/ff651c6a-5478-4479-859f-0cb6898a14bd.png)

主要使用场景：

* 1、点击修改该字段（如修改商品名称，点击后自动在字段右侧显示修改商品名称的弹窗，输入新商品名称，点击确定，自动修改）;
* 2、点击后查看字段扩展信息（如：审核未通过旁边加个 `原因` 按钮，点击后查看未通过的审核的原因）;
* 3、余额字段，点击后给用户加余额;
* 4、点击后给待发货的订单发货;
* 5、等等;

原先我们实现此功能需要使用插槽来写，而现在只需要写一个 `buttons` 属性即可

特别注意：使用 `buttons` 的 `key` 的值不支持 `a.b` 这样的路径（即不支持带.）

___如果扩展按钮列表无法满足你的需求，则可以用插槽来完全自定义该字段的实现。___ [查看插槽](#插槽)

**单个修改按钮示例**

```js
{
  key: "key1", title: "标题", type: "text", width: 200,
  buttonsPosition:"right", // 支持 left right bottom top
  buttons: [
    {
      title: "修改",
      type: "text", // 文字形式按钮 可选：primary / success / warning / danger / info / text
      mode: "update", // 模式 可选：update（通用修改模式） / default（自定义模式）
      show: ["row"], // 在哪些场景显示按钮 多选：row（在行内显示） / detail（在详情页显示）
      showRule: (formData) => {
        // 此为演示只有字段 key2 不等于 1时，才会显示此按钮。
        return (formData.key2 != 1) ? true : false;
      },
      click: (options) => {
        console.log(1, options.value, options.formData);
        vk.callFunction({
          url: 'template/test/pub/test',
          data: options.formData,
          success: (data) => {
            // 通知组件操作成功（否则组件按钮会一直处于loading状态）
            options.success({
              msg: "修改成功"
            });
          }
        });
      }
    }
  ]
},
```

**多个修改按钮示例**

```js
{
  key: "key1", title: "标题", type: "text", width: 200,
  buttonsPosition:"right", // 支持 left right bottom top
  buttons: [
    {
      title: "修改",
      type: "text", // 文字形式按钮 可选：primary / success / warning / danger / info / text
      mode: "update", // 模式 可选：update（通用修改模式） / default（自定义模式）
      show: ["row"], // 在哪些场景显示按钮 多选：row（在行内显示） / detail（在详情页显示）
      showRule: (formData) => {
        // 此为演示只有字段 key2 不等于 1时，才会显示此按钮。
        return (formData.key2 != 1) ? true : false;
      },
      click: (options) => {
        console.log(1, options.value, options.formData);
        vk.callFunction({
          url: 'template/test/pub/test',
          data: options.formData,
          success: (data) => {
            // 通知组件操作成功（否则组件按钮会一直处于loading状态）
            options.success({
              msg: "修改成功"
            });
          }
        });
      }
    },
    {
      title: "查看",
      type: "text",
      show: ["detail", "row"],
      click: (options) => {
        console.log(2, options.value, options.formData);
        uni.vk.toast("你点击了查看");
      }
    }
  ]
},
```

### filter（本地数据过滤器）
```js
{ key:"remark", title:"备注", type:"text", width:200,
  // 本地数据过滤器
  filter:{
    data:[
      { text: '备注1', value: '备注1' },
      { text: '备注2', value:'备注2' },
    ],
    multiple:true, // 是否可多选
    method:(value, row, column)=>{
      return value === row.remark;
    },
    defaultValue:[], // 过滤器默认值 如：["备注1"]
  }
},
```

### formatter（自定义格式化渲染）

一般用于 `type` 为 `html` 或 `text` 时使用，最终显示的结果时 `formatter` 函数 `return` 的值

```js
{ 
  key: "nickname", title: "text", type: "text",
  formatter: (val, row, column, index) => {
    let str = `${val}（审核通过）`;
    return str;
  }
},
```

```js
{ 
  key: "nickname", title: "html", type: "html",
  formatter: (val, row, column, index) => {
    let str = `<text>${val}</text>（审核通过）`;
    return str;
  }
},
```

## 事件

| 事件名   | 说明                    | 回调参数 |
|----------|------------------------|------|
| table-mounted     | 表格组件挂载完毕时（此时还没有数据） |  -  |
| success     | 表格数据查询成功时   |  { data(请求返回的原始数据), list, total }  |
| fail     | 表格数据查询失败时   |  err  |
| complete     | 表格数据查询无论成功和失败都会触发   |  res  |
| detail     | 点击详情按钮（手动版）时 item和row值一样，区别在于修改row的值会影响表格实际显示 |  { item, row, open }  |
| update     | 点击修改按钮时 item和row值一样，区别在于修改row的值会影响表格实际显示 | { item, row }  |
| delete     | 点击删除按钮时   |  { item, deleteFn }  |
| custom-right-btns | 自定义右侧按钮点击事件 |    column, event     |
| right-btns-more | 自定义右侧更多按钮点击事件 |  res, item    |
| current-change    | 点击(高亮)某一行          |  row    |
| row-click | 单击某一行 |   row, column, event  |
| row-dblclick  | 双击某一行 |    row, column, event     |
| row-contextmenu | 鼠标右键某一行 |   row, column, event  |
| cell-mouse-enter | 当单元格 hover 进入时会触发该事件 |   row, column, cell, eventt  |
| cell-mouse-leave | 当单元格 hover 退出时会触发该事件 |   row, column, cell, eventt  |
| cell-click | 单击某一个单元格 |    row, column, cell, event     |
| cell-dblclick | 双击某一个单元格 |    row, column, cell, event     |
| header-click | 某一列的表头被点击时 |    column, event     |
| header-contextmenu | 某一列的表头被鼠标右键点击时 |    row, btn    |
| header-dragend | 当拖动表头改变了列的宽度的时候会触发该事件 |    newWidth, oldWidth, column, event   |
| pagination-change | 点击分页按钮事件（手动模式下使用） | paginationData |
| select     | 当用户手动勾选数据行的 Checkbox 时触发的事件   |  selection, row  |
| select-all     | 当用户手动勾选全选的 Checkbox 时触发的事件   |  selection  |
| selection-change     | 多选框状态发生变化时   |  rows  |
| 其他 | 其他element自带的事件大部分也支持 |    -     |


## 方法

#### 通过 this.$refs.table1.xxx(); 方式调用
| 方法名   | 说明                    |
|----------|------------------------|
| refresh     | 刷新 |
| search     | 查询（搜索） |
| getCurrentRow     | 获取当前选中的行的数据 |
| getTableData     | 获取整个表格数据 |
| getTableFormatterData     | 获取整个表格数据（格式化后的数据） |
| getMultipleSelection     | 获取多选框的数据 |
| showDetail     | 显示详情页 |
| closeDetail     | 关闭详情页 |
| exportExcel     | 导出xls表格文件 |
| deleteRows     | 删除指定的行（不删数据库数据） |
| updateRows     | 更新指定的行数据（不更新据库数据） |
| setTableData | 手动给表格重新赋值数据 |


### showDetail（显示详情页）
```js
that.$refs.table1.showDetail(item); // item是该条记录的数据源
```

### 删除指定的行（不删数据库数据）
```js
that.$refs.table1.deleteRows({
  ids:["60acf6248a69dc00018d8520"],
  success:()=>{
    
  }
});
```
### 更新指定的行数据（不更新据库数据）
```js
that.$refs.table1.updateRows({
  mode:"update", // update 局部字段更新 set 覆盖字段更新
  rows:[
    { _id:"60acf6248a69dc00018d8520", remark:"被修改了", money:10000 }
  ],
  success:()=>{
    
  }
});
```

### 导出表格显示的数据
```js
that.$refs.table1.exportExcel();
```
### 导出表格显示的数据（不显示序号）
```js
that.$refs.table1.exportExcel({
  showNo: false
});
```
### 自定义导出表格数据
```js
that.$refs.table1.exportExcel({
  fileName : "表格数据",
  original : false,
  columns: [
    { key:"_id", title:"id", type:"text" },
    { key:"money", title:"金额", type:"money" },
  ]
});
```
### 导出满足表格查询条件的数据库内所有数据
```js
that.$refs.table1.exportExcel({
  fileName: "表格全部数据",
  title: "正在导出数据...",
  pageIndex: 1,
  pageSize: -1, // 此值为-1，代表导出所有数据
});
```
### 导出自定义数据
```js
that.$refs.table1.exportExcel({
  fileName:"文件名称",
  data:[
    { a:1,b:2},
    { a:11,b:22}
  ],
  columns:[
    { key:"a", title:"标题a", type:"text" },
    { key:"b", title:"标题b", type:"text" },
  ]
});
```
### 获取当前选中的行的数据（原始数据）
```js
let info = that.$refs.table1.getCurrentRow();
console.log(info);
```
### 获取整个表格数据（原始数据）
```js
let info = that.$refs.table1.getTableData();
console.log(info);
```
### 获取整个表格数据（格式化后的数据）
```js
let info = that.$refs.table1.getTableFormatterData();
console.log(info);
```
### 获取整个表格数据（格式化后的数据,key为中文）
```js
let info = that.$refs.table1.getTableFormatterData({
  key:"title"
});
console.log(info);
```

        
## 插槽
#### columns中的每一个key都是插槽的名称
#### 如重写`gender`字段的渲染
* 注意: 只需要把下方`<template></template>`标签和标签内的代码复制到你页面上的`<vk-data-table></vk-data-table>`标签内即可

```html
<vk-data-table>

  <!-- v-slot:gender 中的 gender 对应 columns中的 key, row对应 这一行的数据源 -->
  <template  v-slot:gender="{ row, column, index }">
    <view>我是插槽：{{ row.gender }}</view>
  </template>
  
</vk-data-table>
```

#### 展开行插槽
```html
<vk-data-table>

  <!-- v-slot:tableExpand 是固定的 row 是该行的数据源-->
  <template  v-slot:tableExpand="{ row }">
    <view>我是插槽：{{ row._id }}</view>
  </template>
  
</vk-data-table>
```

[返回展开行](#展开行)

## 万能表格搜索组件 


```html
<!-- 表格搜索组件开始 -->
<vk-data-table-query
  v-model="queryForm1.formData"
  :columns="queryForm1.columns"
  @search="search"
></vk-data-table-query>
<!-- 表格搜索组件结束 -->

<!-- 表格组件开始 -->
<vk-data-table
 ...其他参数
  :query-form-param="queryForm1"
 ...其他参数
></vk-data-table>
<!-- 表格组件结束 -->
```


#### 折叠抽屉弹窗模式
```html
<vk-data-table-query
  ref="tableQuery1"
  v-model="queryForm1.formData"
  :columns="queryForm1.columns"
  :main-columns="['user_id','_add_time']"
  @search="search"
></vk-data-table-query>
```

```js
queryForm1:{
  // 查询表单数据源，可在此设置默认值
  formData:{

  },
  // 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
  columns:[
    { key:"nickname", title:"昵称", type:"text", width:160, mode:"%%" },
    { key:"_add_time", title:"添加时间", type:"datetimerange", width:400, mode:"[]" },
  ]
}

```


### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| v-model            | 绑定查询表单数据源 | Object  | - | -  |
| columns            | 字段渲染规则  | Array  | - |  [查看columns](#columns)   |
| show-reset            | 是否显示重置按钮 | Boolean  | false | true |
| main-columns            | 在页面上直接显示的字段名数组，此值若不为空，则会显示高级搜索按钮 | Array  | - | -  |
| drawer            | 高级搜索的抽屉弹窗的属性（详情见element的drawer文档）| Object | -  |
| search-text            | 搜索按钮的文本 | String  | 搜索 | -  |
| senior-search-text            | 高级搜索按钮的文本 | String  | 高级搜索 | -  |

### columns
queryForm1.columns 参数说明
columns属性的写法与万能表单相似(但部分表单组件搜索不支持)

[万能表单文档](https://vkdoc.fsq.pub/admin/3/form.html)


| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| key    |   键名    | String  | 无    | - |
| title  |   标题    | String  | 无    | -  |
| type   |   组件类型    | String  | 无    | -  |
| width   |  组件宽度    | Number  | 无    | -  |
| placeholder   |   输入前的提示    | String  | - | -  |
| mode   |  查询模式    | String  | = | [查看mode](#mode)  |
| fieldName   |  数据库字段名称，默认=key的值    | String  | key的值  | -  |
| lastWhereJson   |  是否是连表后的where条件 | Boolean  | false | true  |
| hidden   |  是否隐藏该字段（规则依然生效，但不在页面中渲染此组件） | Boolean  | false | true  |
| show     | 显示规则,page代表显示在页面上，drawer代表显示在高级搜索中 | Array  | ["page"] |  ["page","drawer"] |


### fieldName 参数的用处
##### 如余额按金额范围查询
```js
columns:[
  { 
    key:"balance1", title:"金额范围", type:"money", width:160, placeholder:"请输入最小金额", 
    mode:">=", fieldName:"balance", 
  },
  { 
    key:"balance2", title:"-", type:"money", width:160, placeholder:"请输入最大金额", 
    mode:"<=", fieldName:"balance", 
  }
]
```
### lastWhereJson 参数的用处
##### 如userInfo是连表字段的as的值，想要根据 userInfo.mobile 进行查询
```js
columns:[
  { 
    key:"mobile", title:"手机号", type:"text", width:160,
    mode:"=", fieldName:"userInfo.mobile", lastWhereJson:true
  }
]
```

### mode
#### queryForm1.columns 中 mode 参数详情
| 值         | 说明              
|------------|-------------------|
| =          | 完全匹配 |
| !=          | 不等于 |
| %%          | 模糊匹配 |
| %*          | 以xxx开头 |
| *%          | 以xxx结尾 |
| >          | 大于 |
| >=          | 大于等于 |
| <          | 小于 |
| <=          | 小于等于 |
| in          | 在数组里 |
| nin          | 不在数组里 |
| []          | 范围 arr[0] <= x <= arr[1] |
| [)          | 范围 arr[0] <= x <  arr[1]|
| (]          | 范围 arr[0] <  x <= arr[1] |
| ()          | 范围 arr[0] <  x <  arr[1] |

### 特殊说明
当 value 为以下值时，会有特殊效果。

| value值         | 说明              
|------------|-------------------|
| `___empty-array___`         | 匹配空数组 |
| `___empty-object___`          | 匹配空对象 |
| `___non-existent___`          | 字段不存在 |
| `___existent___`          | 字段存在 |

___tips: 左右各 3 个下划线____

## vk.baseDao.getTableData

用法与 `vk.baseDao.selects` 相似，区别是 `vk.baseDao.getTableData` 多了一个 `data` 参数

[vk.baseDao.selects万能连表文档](https://vkdoc.fsq.pub/client/uniCloud/db/selects.html)

### data 参数介绍

`data` 参数的作用是让前端可以直接传查询条件和排序条件。同时为了控制安全性，`getTableData` 的 `whereJson` 参数可以设置强制where条件

**Ta的优势是：**

* 1、条件查询很方便，且减少了很多代码量。
* 2、在云函数端写强制条件，不用担心用户看到不该看的数据。
* 3、代码结构比较清晰，容易阅读与理解。

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| pageIndex        | 第几页            | Number | 1      | - |
| pageSize         | 每页查询数量 | Number  | - | -  |
| formData         | 查询条件数据源 | Object  | - | -  |
| columns          | 查询条件字段规则 | Array  | - | -  |
| sortRule         | 排序规则 | Array  | - | -  |

### 云函数代码示例
```js
// 通常data是前端传过来的数据
let data = {
  pageIndex: 1,
  pageSize: 20,
  formData: {
    nickname: "张飞"
  },
  columns: [
    { key: "nickname", title: "昵称", type: "text", width: 160, mode: "%%" },
    { key: "_add_time", title: "添加时间", type: "datetimerange", width: 400, mode: "[]" },
  ],
  sortRule: [
    { name: "_add_time", type: "desc" }
  ]
};
// 上面的formData.nickname = "张飞"，且columns中的nickname的 mode为 "%%"，代表模糊搜索nickname字段包含张飞的数据

let dbName = "表名";
vk.baseDao.getTableData({
  dbName,
  data,
  // 强制where条件，比如这里设置了只能查询当前登录用户的数据
  whereJson: {
    user_id:uid
  }, 
  // 强制字段显示规则
  fieldJson: {
    
  }, 
  // 默认排序规则
  sortArr: [
    
  ], 
  // 副表列表
  foreignDB:[
    
  ], 
  // 聚合结束后的where条件
  lastWhereJson: {
    
  } 
});

```

### 设置全局默认排序规则

在 `common/uni-config-center/vk-unicloud/index.js` 中

配置 `vk.db.unicloud.getTableData.sortArr`，可以设置 `vk.baseDao.getTableData` 全局默认排序规则
```js
"vk":{
  "db":{
    "unicloud":{
      "getTableData":{
        "sortArr":[{"name":"_add_time","type":"desc"}], // vk.baseDao.getTableData 默认排序规则
      }
    }
  }
}
```


## 万能表格合计列的示例
### 简单模式
```html
<vk-data-table
  ...其他属性
  :show-summary="true"
  :total-option=" [
     { key: '（此为table1.columns中key的值）', 'unit': '单位', type:'number' },
     { key: 'balance', 'unit': '元', type:'money' }
  ]"
></vk-data-table>
```
#### summary-method
### 自定义模式
#### 自定义函数方法，如果想要自定义合计规则和样式，则需要使用summary-method属性进行自定义，代码如下
```html
<vk-data-table
  ...其他属性
  :show-summary="true"
  :summary-method="summaryMethod"
></vk-data-table>
```

```js
summaryMethod({ columns, data }) {
  const means = ['']; // 合计
  // 需要进行合计的字段
  let totalOption = [
    { key: 'money', 'unit': '元', type:"money" },
  ];
  for(let columnIndex=0; columnIndex<columns.length; columnIndex++){
    let column = columns[columnIndex];
    if (columnIndex === 0) {
      means.push('合计');
    } else {
      let columnItem = vk.pubfn.getListItem(totalOption, "key", column.property);
      if(!columnItem){
        continue;
      }
      const values = data.map(dataItem => Number(dataItem[column.property]));
      // 合计
      if (!values.every(value => isNaN(value))) {
        means[columnIndex] = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
        if(columnItem.type === "money"){
          // 金额字段的特殊处理
          let money = vk.pubfn.priceFilter(means[columnIndex]);
          means[columnIndex] = `<span style="color: red">${money}${columnItem.unit}</span>`;
        }else{
          means[columnIndex] = `<span style="color: red">${means[columnIndex]}${columnItem.unit}</span>`;
        }
      } else {
        // 如果不是数字类型,则直接为空
        means[columnIndex] = "";
      }
    }
  }
  return [means];
}
```