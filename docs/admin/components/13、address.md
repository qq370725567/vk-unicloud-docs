# 13、address 地址选择（省市区选择）

### 万能表单使用方式

```js
{ key: "address", title: "address类型", type: "address" },
```

### API

### 公共属性

[点击查看『公共属性』](https://vkdoc.fsq.pub/admin/components/0%E3%80%81public.html)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| level            | 层级（最大3级，省市区） | Number  | 3 | 1 、 2  |
| clearable          | 是否可以清空选项 | Boolean  | true| false  |


### 万能表格使用方式

```js
{ key: "address", title: "地址", type: "address", width: 120 },
```

### template 使用方式

```html
<vk-data-input-address v-model="address" placeholder="请选择省市区" :level="3"></vk-data-input-address>
```
