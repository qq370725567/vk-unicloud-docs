# 6、discount 折扣输入

### 万能表单使用方式@form

```js
{ key: "discount", title: "折扣类型", type: "discount" },
```

### API

### 公共属性@public

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性@props

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| max            | 最大输入 | Number  | - | -  |
| rightText          | 右侧文字后缀 | String  | 折 | - |
| precision            | 精度（小数点位数） | Number  | 2 | -  |
| readonly          | 原生属性，是否只读  | boolean|  false | true |

### 万能表格使用方式@table

```js
{ key: "discount", title: "折扣类型", type: "discount", width: 100 },
```

### template 使用方式@template

```html
<vk-data-input-discount v-model="form1.value1" placeholder="请输入折扣" :precision="2" width="300px"></vk-data-input-discount>
```
