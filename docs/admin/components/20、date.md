# 20、date 日期选择

### 万能表单使用方式

```js
// date类型
{ key:"date", title:"date类型", type:"date", dateType:"date", tips:"可选择年月日" },
// dataTime类型
{ key:"dateTime", title:"dataTime类型", type:"date", dateType:"datetime", tips:"可选择年月日时分秒" },
// date类型范围
{ key:"dateArr", title:"date类型范围", type:"date", dateType:"daterange" },
// dataTime类型范围
{ key:"dataTimeArr", title:"dataTime类型范围", type:"date", dateType:"datetimerange" },
```

### API

### 属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| dateType            | 时间格式类型 | String  | - | date、datetime、daterange、datetimerange |
| align            | 对其方式 | String  | left | left, center, right  |
| format          | 显示在输入框中的格式 | String  | yyyy-MM-dd HH:mm:ss | - |
| startPlaceholder    | 范围选择时开始日期的占位内容 | String  | - | -  |
| endPlaceholder    | 范围选择时结束日期的占位内容 | String  | - | -  |
| rangeSeparator    | 选择范围时的分隔符 | String  | '-' | - |
| pickerOptions    | 当前时间日期选择器特有的选项参考下表 | Object  | {} | - |

### pickerOptions 详情说明
| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| shortcuts            | 设置快捷选项，需要传入 { text, onClick }  | Object[]  | - | - |
| disabledDate            | 设置禁用状态，参数为当前日期，要求返回 Boolean| Function  |- | -  |
| cellClassName          |设置日期的 className | Function(Date)  | - | - |
| firstDayOfWeek    | 周起始日 | Number  | 7 | 1 到 7 |
| onPick    | 选中日期后会执行的回调，只有当 daterange 或 datetimerange 才生效 | Function({ maxDate, minDate })  | - | -  |

[点击查看更多element 官方API](https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi)


### 万能表格使用方式

```js
{ key: "_add_time", title: "添加时间", type: "time", width: 160 },
{ key: "_add_time", title: "距离现在", type: "dateDiff", width: 120 },
```


### template 使用方式
```html
<!-- 选择日期 -->
<vk-data-input-date-time v-model="value1" type="date"></vk-data-input-date-time>
<!-- 选择日期+时间 -->
<vk-data-input-date-time v-model="value1" type="datetime"></vk-data-input-date-time>
<!-- 选择日期范围-->
<vk-data-input-date-time v-model="value1" type="daterange"></vk-data-input-date-time>
<!-- 选择日期时间范围-->
<vk-data-input-date-time v-model="value1" type="datetimerange"></vk-data-input-date-time>
```
