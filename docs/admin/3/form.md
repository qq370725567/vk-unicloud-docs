# 万能表单

#### 核心思想：通过 JSON 配置渲染规则

如：渲染一个input输入框,只需要如下代码

 ```js
{ key:"nickname", title:"昵称", type:"text" }
```

渲染一个单选框组,只需要如下代码

 ```js
{
  key:"gender", title:"性别", type:"radio",
  data:[
    { value:1, label:"男" },
    { value:2, label:"女" }
  ]
}
```

#### 你甚至还可以通过 `表单可视化拖拽工具` 直接生成`vk框架代码` [点击体验](https://vkunicloud.fsq.pub/vk-form-visualizer/)

## 基础用法
vk-data-dialog为弹窗表单，去掉则为表单页面

```html
<vk-data-dialog
  v-model="form1.props.show"
  title="表单标题"
  width="600px"
  mode="form"
>
  <vk-data-form
    ref="form1"
    v-model="form1.data"
    :action="form1.props.action"
    :columns="form1.props.columns"
    :rules="form1.props.rules"
    :form-type="form1.props.formType"
    :loading.sync="form1.props.loading"
    :auto-close="true"
    label-width="140px"
    @success="onFormSuccess"
  ></vk-data-form>
</vk-data-dialog>
```
js部分
```js
export default {
  data() {
    // 页面数据变量
    return {
      // 表单相关开始-----------------------------------------------------------
      form1: {
        // 表单请求数据，此处可以设置默认值
        data: {
          radio: 1,
          checkbox : [1,2]
        },
        // 表单属性
        props: {
          // 表单请求地址
          action: "template/test/sys/test",
          // 表单字段显示规则
          columns: [
            { key: "text", title: "text类型字段", type: "text" },
            { key: "number", title: "number类型字段", type: "number" },
            { 
              key: "radio", title: "radio类型字段", type: "radio",
              data: [
                { value: 1, label: "选项1" },
                { value: 2, label: "选项2" },
              ]
            },
            { 
              key: "checkbox", title: "checkbox类型字段", type: "checkbox",
              data: [
                { value: 1, label: "选项1" },
                { value: 2, label: "选项2" },
              ]
            },
            { key: "switch", title: "switch类型字段", type: "switch" }
          ],
          // 表单验证规则
          rules: {
            text: [
              { required: true, message: "text不能为空", trigger: "change" },
            ]
          },
          // add 代表添加 update 代表修改
          formType: "",
          // 表单是否在请求中
          loading: false,
          // 是否显示表单1 的弹窗
          show: false
        }
      },
      // 表单相关结束-----------------------------------------------------------
    };
  }
}
```

## 进阶用法

请直接看示例文件 `/pages_template/components/form/form-pro`

# API

## 属性

| 参数             | 说明                   | 类型    | 默认值  | 可选值 |
|------------------|-----------------------|---------|--------|-------|
| v-model           | 表单数据源            | Object | {}      | - |
| rules       | 表单验证规则 [查看规则](#rules-表单验证)| Object  | 无 | -  |
| action   | vk框架云函数地址(表单提交地址：表单点击确定按钮后请求的云函数地址) | String  | 无 | -  |
| before-action   | action请求前拦截器 [查看示例代码](#before-action-请求前拦截) | Function  | 无 | -  |
| is-request    | 是否是http请求模式 [查看http请求模式](#http请求模式) | Boolean  | false | true |
| form-type       | 表单类型，用于复用表单 [查看表单复用](#show-复用时的显示规则) | String  | 无 | -  |
| columns          | 通用 - 字段规则 [查看columns](#columns-字段渲染规则) | Array  | [] | - |
| loading           | 表单是否在请求中 | Boolean  | false | true  |
| label-width        | 左侧label宽度 | String,Number  | "80px" | -  |
| width     | 表单宽度 | Number,String  | 无 | - |
| footer-show          | 底部按钮是否显示 | Boolean  | true | false  |
| footer-center          | 底部按钮是否居中 | Boolean  | true | false |
| show-cancel          | 是否显示取消按钮 | Boolean  | true | false |
| cancel-text     | 取消按钮的文字 | String  | 关 闭 | - |
| submit-text       | 确定按钮的文字 | String  | 确 定 | - |
| submit-disabled      | 确定按钮是否禁用 | Boolean  | false | true |
| auto-close      | 表单请求成功后自动关闭 | Boolean  | true | false |
| auto-reset      | 自动重置表单 | String  | Boolean  | true | false |
| label-position      | 对齐方式 | String  | right | right left top |
| max-height      | 表单最大高度 | String  | 无 | - |
| size      | 表单内组件的size | String  | 无 | - |
| label-suffix      | label的后缀 | String  | 无 | - |
| disabled      | 禁用表单 | Boolean  | false | true |
| clearable      | 表单内的组件有清空效果 | Boolean  | true | false |
| success-msg      | 表单提交成功后右上角的提示 | String  | 操作成功！ | - |
| inline      | 是否设置整个表单为横向表单 | Boolean  | false | true |
| columns-number      | 横向表单每行显示数量 | Number  | 2 | - |


### columns（字段渲染规则）
columns是一个数组，数组内每个元素有以下属性，每个元素代表一个表单元素

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| key           | 字段名  [查看](#key-字段名)           | String | -    | -      |
| title         | 字段显示的名称  [查看](#title-标题)     | String | -    | -      |
| type          | 组件类型    [查看](#type-组件类型)        | String | -    | -      |
| width         | 宽度      [查看](#width-宽度)          | Number | -    | -      |
| placeholder   | 占位符  [查看](#placeholder-占位符)        | String | -    | -      |
| tips  | 下方的提示  [查看](#tips-下方的固定提示)  | String  | 无    | -  |
| showLabel  |  是否显示label [查看](#showLabel-是否显示label)  | Boolean  | true    | false  |
| show  | 表单复用时的显示规则 [查看](#show-复用时的显示规则)  | array | -  | - |
| showRule  |  是否显示该字段  [查看](#showrule-自定义显示规则) | String、Function  | -    | -  |
| disabled  |  是否禁用 [查看](#disabled-自定义禁用规则) | Boolean、String、Function| false | true  |
| watch     | 监听key对应的值的改变（只监听组件内部造成的值的改变） [查看](#watch-监听) | Function | - | - |


### key（字段名）

字段名，如下方代码中，`key` 为 `nickname`，代表绑定 `nickname` 字段

```js
{ key: "nickname", title:"昵称", type:"text", },
```

### title（标题）

字段显示的名称，如下方代码中，`title` 为 `昵称`，代表该字段以别名 `昵称` 显示在页面上。

```js
{ key: "nickname", title:"昵称", type:"text", },
```

### type（组件类型）

页面需要渲染的组件类型，如下方代码中，`type` 为 `text`，在 `万能表格` 中渲染为 `字符串`，在 `万能表单` 中渲染为 `input输入框`

```js
{ key: "nickname", title:"昵称", type:"text", },
```


### width（宽度）

单位是px，只能是数字，如下

```js
{ key: "nickname", title:"昵称", type:"text", width: 200 },
```

### placeholder（占位符）

占位符，类似 `input` 组件中的 `placeholder` （即用户还未输入任何内容时输入框内的提示）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/8ccbc513-8bad-4a8f-903e-e745dfdecdfd.png)

### tips（下方的固定提示）

下方的固定提示，与 `placeholder` 不同的是：不管用户是否输入信息，此提示一直都在。而 `placeholder` 是当用户输入内容后，提示就隐藏了。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/82fe7344-1aa0-4e31-9c33-8232099b700f.png)

**tips支持解析html字符串，如下所示**

```js
// 增加详情按钮 跳新窗口打开新页面
{ key: "text1", title:"text类型字段", type:"text", tips:`<text>这里使其他文字介绍</text><a href="#/pages/order/list" target="_blank">详情</a>`, width:600 },
// 增加详情按钮 关闭当前页面，跳新页面
{ key: "text2", title:"text类型字段", type:"text", tips:`<text>这里使其他文字介绍</text><a href="javascript:void(0);" onClick="vk.navigateTo('/pages_template/components/form/form-basic');">详情</a>`, width:600 },
// 增加详情按钮 跳https外部页面
{ key: "text3", title:"text类型字段", type:"text", tips:`<text>这里使其他文字介绍</text><a href="https://www.baidu.com" target="_blank">跳百度</a>`, width:600 },
```

**tips还支持解析对象数组，如下所示**

```js
{ 
  key:"text1", title:"选择快递公司", type:"text",
  tips:[
  	{ text:"查不到快递公司？" },
  	{
  		text:"点击添加",
  		click:()=>{
  			console.log(1)
  		},
  	},
  	{
  		text:"刷新",
  		click:()=>{
  			console.log(1)
  		},
  	}
  ]
},
```

### showLabel（是否显示label）

默认为true，当设置为false时，对应的title不显示。

### show（复用时的显示规则）

表单组件的组件 `form-type` 可以动态复用同一个表单达到显示不同字段的功能。

完整示例代码可以查看页面 `pages_template/components/form/form-dialog-2`

`show` 是一个字符串数组，`columns` 数组内每一个元素都可以单独设置 `show`

* 如果 show 字段不存在，代表显示。
* 如果 show 的某元素中包含 `form-type`的值，则代表显示。
* 如果 show 的某元素中不包含 `form-type`的值，则不显示。

### showRule（自定义显示规则）

与 show 不同，showRule 更灵活。

如 当 `login_appid_type` = 1 时，渲染 `mode` 字段，否则不渲染（支持符号 = == > >= < <= != {in} {nin} && || ）

提示：= 和 == 效果一样

```js
{
  key:"login_appid_type", title:"登录权限", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"部分应用" },
    { value:0, label:"全部应用" }
  ]
},
{
  key:"mode", title:"模式", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"覆盖" },
    { value:2, label:"新增" },
    { value:3, label:"移除" }
  ],
  showRule:"login_appid_type==1",
},
```

**{in}和{nin}的用法**

```js
{ key:"arr", title:"arr", type:"array<string>" },
{ key:"text", title:"text", type:"text" },
{ key:"text1", title:"arr包含1则显示", type:"text", showRule:"arr{in}1" },
{ key:"text2", title:"arr不包含2则显示", type:"text", showRule:"arr{nin}2" },
```

同时 showRule 还支持函数形式

```js
{
  key:"login_appid_type", title:"登录权限", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"部分应用" },
    { value:0, label:"全部应用" }
  ]
},
{
  key:"mode", title:"模式", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"覆盖" },
    { value:2, label:"新增" },
    { value:3, label:"移除" }
  ],
  showRule:(formData)=>{
  	if(formData.login_appid_type == 1){
  		return true;
  	}else{
  		return false;
  	}
  }
},
```

### disabled（自定义禁用规则）

`disabled` 和 `showRule` 基本写法一致，功能区别是，`showRule` 是满足条件则显示，`disabled` 是满足条件则禁用。

如 当 `login_appid_type` = 0 时，禁用 `mode` 字段（支持符号 = == > >= < <= != in && || ）

提示：= 和 == 效果一样

```js
{
  key:"login_appid_type", title:"登录权限", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"部分应用" },
    { value:0, label:"全部应用" }
  ]
},
{
  key:"mode", title:"模式", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"覆盖" },
    { value:2, label:"新增" },
    { value:3, label:"移除" }
  ],
  disabled:"login_appid_type==0",
},
```

同时 disabled 还支持函数形式

```js
{
  key:"login_appid_type", title:"登录权限", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"部分应用" },
    { value:0, label:"全部应用" }
  ]
},
{
  key:"mode", title:"模式", type:"radio",
  optionType:"button",
  data:[
    { value:1, label:"覆盖" },
    { value:2, label:"新增" },
    { value:3, label:"移除" }
  ],
  disabled:(formData)=>{
  	if(formData.login_appid_type === 0){
  		return true;
  	}else{
  		return false;
  	}
  }
},
```

### watch（监听）

用于监听key对应的值的改变（只监听组件内部造成的值的改变）

使用示例如下：

```js
{
  key: "text", title:"text类型字段", type:"text",
  watch: (res) => {
    console.log("watch", res)
  }
}
```


### inline（行内表单）

```html
<vk-data-form
  ...其他组件
  :inline="true"
  :columnsNumber="2"
></vk-data-form>
```

**行内表单中columns若设置oneLine:true可强制单独一行**

```js
columns:[
  { key: "text1", title:"text类型字段", type:"text" },
  { key: "text2", title:"text类型字段", type:"text" },
  { key: "text3", title:"text类型字段", type:"text", oneLine:true }, // 单独一行
  { key: "text4", title:"text类型字段", type:"text", oneLine:true, width: 500 }, // 单独一行，并设置input的宽度
]
```

### type（组件类型）
type类型（更多请见：`/pages_template/components/form/form-pro`）

```js
form1:{
  // 表单请求数据，此处可以设置默认值
  data: {
    
  },
  // 表单属性
  props:[
    { key:"", title:"基础字段", type:"bar-title" },
    { key:"text", title:"单行文本", type:"text" },
    {
      key:"textarea", title:"多行文本", type:"textarea",
      autosize:{ minRows:4, maxRows:10 },
      maxlength:200,
      showWordLimit:true,
    },
    { key:"money", title:"money类型", type:"money", tips:"100 = 1元。页面显示的是1，实际的值是100，请看右上角表单数据的值。" },
    { key:"number", title:"number类型", type:"number", precision:2, tips:"number类型值会转为数字，可以指定小数位数" },
    { key:"number2", title:"计数器类型", type:"number", controls:true, precision:0, min:5, max:100, placeholder:"请输入数字" },
    { key:"percentage", title:"百分比类型", type:"percentage", precision:0, tips:"页面显示的是1，实际的值是0.01，请看右上角表单数据的值。" },
    { key:"discount", title:"折扣类型", type:"discount", tips:"页面显示的是1，实际的值是0.1，请看右上角表单数据的值。" },
    { key:"text2", title:"文本2", type:"text",prepend:"前置文字",append:"后置文字",prefixIcon:"el-icon-user" },
    // 选择型字段
    { key:"", title:"选择型字段", type:"bar-title" },
    {
      key:"radio1", title:"radio类型1", type:"radio",
      data:[
        { value:1, label:"选项1" },
        { value:2, label:"选项2" }
      ]
    },
    {
      key:"checkbox1", title:"checkbox类型1", type:"checkbox",
      data:[
        { value:1, label:"选项1" },
        { value:2, label:"选项2" }
      ]
    },
    {
      key:"select1", title:"select类型1", type:"select",
      data:[
        { value:1, label:"选项1" },
        { value:2, label:"选项2" }
      ]
    },
    { key:"address", title:"address类型", type:"address" },
    { key:"cascader2", title:"云端数据级联", type:"cascader",
      action:"admin/system/permission/sys/getAll",
      props:{
        list:"rows",
        value:"permission_id",
        label:"label",
        children:"children",
        multiple:true
      }
    },
    { key:"switch", title:"switch类型", type:"switch" },
    { key:"rate", title:"评分类型", type:"rate", allowHalf:false },
    { key:"slider", title:"滑块类型", type:"slider" },
    { key:"color1", title:"颜色类型1", type:"color" },
    { key:"color2", title:"颜色类型2", type:"color", showAlpha:true },
    // 文件上传
    { key:"", title:"文件上传", type:"bar-title" },
    { key:"image1", title:"image类型", type:"image", limit:6 },
    // 日期型字段
    { key:"", title:"日期型字段", type:"bar-title" },
    { key:"date", title:"date类型", type:"date", dateType:"date", tips:"可选择年月日" },
    { key:"dateTime", title:"dataTime类型", type:"date", dateType:"datetime", tips:"可选择年月日时分秒" },
    { key:"dateArr", title:"date类型范围", type:"date", dateType:"daterange" },
    { key:"dataTimeArr", title:"dataTime类型范围", type:"date", dateType:"datetimerange" },
    // 时间型字段
    { key:"", title:"时间型字段", type:"bar-title" },
    { key:"time1", title:"time类型1", type:"time" },
    { key:"timeArr1", title:"time类型范围1", type:"time", isRange:true },
    // 数据库联动字段
    { key:"", title:"数据库联动字段", type:"bar-title" },
    {
      key:"user_id", title:"用户选择器", type:"remote-select", placeholder:"请输入用户账号/昵称",
      action:"admin/select/kh/user",
    },
    {
      key: "user_id", title: "选择用户", type: "table-select", placeholder:"选择",
      action:"admin/system/user/sys/getList",
      columns:[
        { key:"nickname", title:"用户昵称", type:"text", nameKey:true },
        { key:"_id", title:"用户标识", type:"text", idKey:true },
        { key:"mobile", title:"手机号", type:"text" },
      ]
    },
    {
      key: "role1", title: "通过表格选择(单选)", type: "table-select", placeholder:"请选择角色",
      action:"admin/system/role/sys/getList",
      columns:[
        { key:"role_name", title:"角色昵称", type:"text", nameKey:true },
        { key:"role_id", title:"角色标识", type:"text", idKey:true }
      ],
    },
    {
      key: "role2", title: "通过表格选择(多选)", type: "table-select", placeholder:"请选择角色",
      action:"admin/system/role/sys/getList",
      columns:[
        { key:"role_name", title:"角色昵称", type:"text", nameKey:true },
        { key:"role_id", title:"角色标识", type:"text", idKey:true }
      ],
      multiple:true
    },
    // 布局
    { key:"", title:"横向布局", type:"bar-title" },
    { key:"", title:"", type:"group", justify:"start",
    	columns:[
    		{ key:"text1", title:"单行文本1", type:"text" },
    		{ key:"text2", title:"单行文本2", type:"text" },
    		{ key:"text3", title:"单行文本3", type:"text" },
    		{ key:"text4", title:"单行文本4", type:"text" },
    	]
    },
    { key:"", title:"", type:"group", justify:"start",
    	columns:[
    		{ key:"text5", title:"单行文本5", type:"text" },
    		{ key:"text6", title:"单行文本6", type:"text" },
    		{ key:"text7", title:"单行文本7", type:"text" },
    		{ key:"text8", title:"单行文本8", type:"text" },
    	]
    },
    { key:"", title:"", type:"group", justify:"end",
    	columns:[
    		{ key:"text11", title:"单行文本11", type:"text", col:{ span: 6 } },
    		{ key:"text12", title:"单行文本12", type:"text", col:{ span: 6 } },
    	]
    },
    { key:"", title:"", type:"group", justify:"start",
    	columns:[
    		{ key:"text13", title:"单行文本13", type:"text" },
    		{ key:"text14", title:"单行文本14", type:"text" },
    	]
    },
    { key:"", title:"", type:"group", justify:"start",
    	columns:[
    		{ key:"text21", title:"单行文本21", type:"text", col:{ span:16 } },
    		{ key:"text22", title:"单行文本22", type:"text", col:{ span:24 } },
    		{ key:"text23", title:"单行文本23", type:"text", col:{ span:16 } },
    		{ key:"text24", title:"单行文本24", type:"text", col:{ span:24 } },
    	]
    },
    // 特殊类型
    { key:"", title:"特殊类型", type:"bar-title" },
    { key:"editor", title:"富文本类型", type:"editor" },
    // 纯展示类型
    { key:"", title:"纯展示类型", type:"bar-title" },
    { key:"text100", title:"文本展示类型", type:"text-view" },
    { key:"text101", title:"金额展示类型", type:"money-view" },
    { key:"html102", title:"html展示类型", type:"html" },
    
  ]
}
```

### before-action（请求前拦截）

```html
<vk-data-form
  :before-action="form1.props.beforeAction"
></vk-data-form>
```

```js
data: function() {
  // 组件创建时,进行数据初始化
  return {
    form1: {
      // 表单属性
      props: {
        
        beforeAction:(formData)=>{
          // 可在此处修改 formData 后返回 formData，若在此处return false，则表单不触发提交请求。
          return formData;
        },
        
      }
    }
  }
}
```

### rules（表单验证）
表单验证规则，和 element 表单验证规则一致，以下是部分示例

```html
<vk-data-form
  :rules="form1.props.rules"
></vk-data-form>
```

```js
data: function() {
  // 组件创建时,进行数据初始化
  return {
    form1: {
      data:{
        
      },
      // 表单属性
      props: {
        // 表单验证规则
        rules: {
          user_id: [
            // 必填
            { required: true, message: "用户ID不能为空", trigger: ['blur','change'] }
          ],
          money: [
            // 必填
            { required: true, message: "金额不能为空", trigger: ['blur','change'] },
            // 必须是数字
            { type: "number", message: "金额必须是数字", trigger: ['blur','change'] }
          ],
          mobile: [
            // 必填
            { required:true,  message: '提现人手机号不能为空', trigger: ['blur','change'] },
            // 必须是手机号格式
            { validator: vk.pubfn.validator("mobile"),  message: '手机号格式错误', trigger: 'blur' }
          ],
          username:[
            // 必填，且用户名以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            { 
              required: true, 
              validator:vk.pubfn.validator("username"), 
              message: '用户名以字母开头，长度在6~18之间，只能包含字母、数字和下划线', 
              trigger: 'blur' 
            }
          ],
          nickname: [
            // 必填
            { required: true, message: '昵称为必填字段', trigger: ['blur','change'] },
            // 长度在 2-20 个字
            { min: 2, max: 20, message: '昵称长度在 2 到 20 之间', trigger: 'blur' }
          ],
          card: [
            // 身份证
            { validator: vk.pubfn.validator("card"),  message: '身份证格式错误', trigger: 'blur' }
          ],
          pwd: [
            // 密码
            { validator: vk.pubfn.validator("pwd"),  message: '密码长度在6~18之间，只能包含字母、数字和下划线', trigger: 'blur' }
          ],
          payPwd: [
            // 支付密码
            { validator: vk.pubfn.validator("payPwd"),  message: '支付密码必须为 6位纯数字', trigger: 'blur' }
          ],
          postal: [
            // 邮政编码
            { validator: vk.pubfn.validator("postal"),  message: '邮政编码格式错误', trigger: 'blur' }
          ],
          email: [
            // 邮箱
            { validator: vk.pubfn.validator("email"),  message: '邮箱格式错误', trigger: 'blur' }
          ],
          QQ: [
            // qq
            { validator: vk.pubfn.validator("QQ"),  message: 'QQ号格式错误', trigger: 'blur' }
          ],
          URL: [
            // URL
            { validator: vk.pubfn.validator("URL"),  message: 'URL格式错误', trigger: 'blur' }
          ],
          IP: [
            // IP
            { validator: vk.pubfn.validator("IP"),  message: 'IP格式错误', trigger: 'blur' }
          ],
          date: [
            // 日期 2014-01-01（字符串）
            { validator: vk.pubfn.validator("date"),  message: 'date格式错误', trigger: 'blur' }
          ],
          time: [
            // 时间 12:00:00（字符串）
            { validator: vk.pubfn.validator("time"),  message: 'time格式错误', trigger: 'blur' }
          ],
          dateTime: [
            // 日期+时间 2014-01-01 12:00:00（字符串）
            { validator: vk.pubfn.validator("dateTime"),  message: 'dateTime格式错误', trigger: 'blur' }
          ],
          english: [
            // 英文
            { validator: vk.pubfn.validator("english"),  message: '只能输入英文', trigger: 'blur' }
          ],
          englishnumber: [
            // 只能是英文或数字
            { validator: vk.pubfn.validator("english+number"),  message: '只能输入英文或数字', trigger: 'blur' }
          ],
          englishnumber2: [
            // 只能是英文、数字、下划线
            { validator: vk.pubfn.validator("english+number+_"),  message: '只能输入英文、数字、下划线', trigger: 'blur' }
          ],
          chinese: [
            // 中文
            { validator: vk.pubfn.validator("chinese"),  message: '只能输入中文', trigger: 'blur' }
          ],
          lower: [
            // 小写字母
            { validator: vk.pubfn.validator("lower"),  message: '只能输入小写字母', trigger: 'blur' }
          ],
          upper: [
            // 大写字母
            { validator: vk.pubfn.validator("upper"),  message: '只能输入大写字母', trigger: 'blur' }
          ],
          HTML: [
            // HTML
            { validator: vk.pubfn.validator("HTML"),  message: 'html格式错误', trigger: 'blur' }
          ],
          pwd2: [
            // 自定义
            { validator: (rule, value, callback)=>{
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== that.form1.data.pwd) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            }, trigger: ['blur','change'] }
          ]
        }
      }
    }
  }
}
```



## 事件

| 事件名   | 说明                    | 回调参数 |
|----------|------------------------|------|
| success     | 表单提交成功   |  data, formType  |
| fail    | 表单提交失败       |  data, formType   |
| complete | 表单提交结束 |   data, formType |
| cancel  | 表单点击取消按钮 |    -     |

**如监听表单提交成功事件**

```html
<vk-data-form
  ...其他属性
  @success="onFormSuccess"
></vk-data-form>
```

```js
methods: {
  onFormSuccess(data, formType){
    console.log("表单提交成功", data);
  }
},
```

## 方法

通过 this.$refs.form1.xxx(); 方式调用

| 方法名   | 说明                    |
|----------|------------------------|
| submitForm     | 提交表单（提交前会自动进行一次表单验证） |
| resetForm     | 重置表单 |
| clearValidate     | 移除整个表单的校验 |
| validate     | 进行表单验证 |
| validateField     | 对部分表单字段进行校验 |
| setResetFormData     | 设置重置表单函数执行后，数据重置的数据源 |


#### validate
```js
that.$refs.form1.validate((valid) => {
  if (valid){
    // 验证通过
    
  }
});
```

#### validateField
```js
that.$refs.form1.validate("username",(errMsg, arr) => {
  if (errMsg) {
    // 未验证通过
    
  }
});
```

#### setResetFormData
```js
// 执行了这个setResetFormData方法后
this.$refs.form1.setResetFormData(data);
// 后面再执行 resetForm时，表单数据会变成 data 的值
this.$refs.form1.resetForm();
```

## 插槽
columns中的每一个key都是插槽的名称 （详情见示例:`/pages_template/components/form/form-slot`)

#### 如重写 `rate` 字段的渲染
```html
<vk-data-form
  ref="form1"
  v-model="form1.data"
  :rules="form1.props.rules"
  :action="form1.props.action"
  :form-type="form1.props.formType"
  :columns='form1.props.columns'
  :loading.sync="form1.props.loading"
  label-width="140px"
  @success="onFormSuccess"
>
  <!-- v-slot:rate 中的 rate 对应 columns中的 key, form对应 form1.data keyName 对应 columns中的 key -->
  <template v-slot:rate="{ form, keyName }">
    <view style="height: 36px;display: flex;align-items: center;">
      <el-rate v-model="form[keyName]"></el-rate>
    </view>
  </template>
</vk-data-form>
```

#### 还可以重写提交按钮
```html
<vk-data-form
  ref="form1"
  v-model="form1.data"
  :rules="form1.props.rules"
  :action="form1.props.action"
  :form-type="form1.props.formType"
  :columns='form1.props.columns'
  :loading.sync="form1.props.loading"
  label-width="140px"
  @success="onFormSuccess"
>
  <template v-slot:footer="{ loading }">
  	<view style="text-align: center;" >
  		<el-button :loading="loading" type="danger"  size="small" style="padding: 10px 40px;margin-right: 30px; " @click="adopt(-1)"> 拒绝 </el-button>
  		<el-button :loading="loading" type="success" size="small" style="padding: 10px 40px; " @click="adopt(1)"> 通过 </el-button>
  	</view>
  </template>
</vk-data-form>
```

```js
// 审核通过执行的方法
adopt(status){
  that.$refs.form1.submitForm({
    // data为额外提交的参数，真正提交的参数为form1.data+这里的data
    data:{
      status:status
    },
    success: (data) => {
      // 提交成功
      
    },
    fail: (data) => {
      // 提交失败
      
    }
  });
}
```


## http请求模式

#### 示例代码

```html
<vk-data-form
  ref="form1"
  v-model="form1.data"
  :rules="form1.props.rules"
  action="https://www.xxx.com/xxx/xxx"
  :is-request="true"
  :request-header="{ 'content-type':'application/x-www-form-urlencoded'} "
  :columns="form1.props.columns"
></vk-data-form>
```

## 表单可视化拖拽工具

可直接生成 `vk框架代码` 和 `element` 原生代码 [点击体验](https://vkunicloud.fsq.pub/vk-form-visualizer/)

#### 更多请见：`/pages_template/components/form/form-pro`
