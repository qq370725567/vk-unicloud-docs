# 3、dialog 弹窗

### template 使用方式@template

#### 普通弹窗

完整代码见示例项目的 `pages_template/components/dialog/dialog-basic`

```vue
<vk-data-dialog v-model="dialog.show1" title="标题1" width="500px" top="14vh" center :close-on-click-modal="true">
  这里是自定义按钮内容
  <template v-slot:footer>
    <el-button @click="dialog.show1 = false">取 消</el-button>
    <el-button type="primary" @click="dialog.show1 = false">确 定</el-button>
  </template>
</vk-data-dialog>
```

#### 自动居中弹窗

设置 `auto-center`（对应组件属性 `autoCenter`）后，弹窗会在视口内水平、垂直居中。默认值为 `false`，未开启时保持原有布局。

```vue
<vk-data-dialog v-model="dialog.show2" title="居中弹窗" width="500px" auto-center :close-on-click-modal="true">
  这里是自定义内容
  <template v-slot:footer="{ close }">
    <el-button :size="$global.size" @click="close">取 消</el-button>
    <el-button type="primary" :size="$global.size" @click="close">确 定</el-button>
  </template>
</vk-data-dialog>
```

- 短内容保持自然高度；弹窗整体最大高度为 `96vh`，包含标题、内容和底部，超出时内容区域内部滚动，标题和 `footer` 插槽保持可见。
- 内容动态增减或窗口缩放时，布局自动适配，无需手动计算高度。
- 自动居中生效时，`top` 不参与弹窗定位；关闭自动居中后恢复原有 `top` 设置。
- 全屏状态优先，进入全屏时停用自动居中和 `96vh` 限制，退出全屏后恢复。
- `center` 仅控制标题和底部内容的对齐，与 `auto-center` 独立，可以同时使用。
- `max-height` 继续限制内部内容区高度。例如同时设置 `auto-center :max-height="400"`，内容区最大高度为 `400px`；视口不足时还会进一步收缩，保证弹窗整体不超过 `96vh`。插槽内组件自带的滚动布局仍由该组件控制。

#### 表单弹窗

完整代码见示例项目的 `pages_template/components/dialog/dialog-form`

```vue
<vk-data-dialog v-model="form1.props.show" title="表单标题" width="600px" mode="form">
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

### API

### 属性

| 参数                  | 说明                                                                         | 类型     | 默认值  | 可选值 |
| --------------------- | ---------------------------------------------------------------------------- | -------- | ------- | ------ |
| v-model               | 双向绑定一个变量,当变量为 true: 弹窗显示 false: 弹窗关闭                     | Boolean  | -       | -      |
| title                 | 弹窗标题                                                                     | String   | -       | -      |
| width                 | 弹窗宽度                                                                     | Number   | -       | -      |
| mode                  | 弹窗模式                                                                     | String   | default | form   |
| top                   | margin-top 值，自动居中生效时不参与弹窗定位                                   | String   | 7vh     | -      |
| auto-center           | 是否自动居中，开启后弹窗整体最大高度为 96vh，全屏时不生效                    | Boolean  | false   | true   |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Dialog                                           | Boolean  | false   | true   |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog                                             | Boolean  | true    | false  |
| show-close            | 是否显示关闭按钮                                                             | Boolean  | true    | false  |
| modal                 | 是否需要遮罩层                                                               | Boolean  | true    | false  |
| append-to-body        | Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true | Boolean  | true    | false  |
| modal-append-to-body  | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上 | Boolean  | true    | false  |
| fullscreen            | 是否全屏                                                                     | Boolean  | false   | true   |
| custom-class          | Dialog 的自定义类名                                                          | String   | -       | -      |
| show-fullscreen       | 是否显示全屏按钮（仅在 mode="form"时生效）                                   | Boolean  | true    | false  |
| show-header           | 是否显示头部                                                                 | Boolean  | true    | false  |
| before-close          | 关闭前的回调，会暂停 Dialog 的关闭                                           | Function | -       | -      |
| center                | 是否对标题和底部内容采用居中对齐，与弹窗整体居中的 auto-center 独立         | Boolean  | false   | true   |
| max-height            | 内部内容区最大高度，超出时内部滚动；数字单位为 px，字符串可携带 CSS 单位    | String / Number | - | - |
| destroy-on-close      | 控制是否在关闭弹窗之后将子元素全部销毁                                       | Boolean  | false   | true   |

### mode 样式说明

`mode` 属性影响弹窗内容区域的默认样式：

**mode="default"（默认模式）**

内容区域会自动应用以下默认样式：

```css
padding: 30px 20px;
color: #606266;
font-size: 14px;
word-break: break-all;
```

适用于普通弹窗，如提示信息、确认框等。

**mode="form"（表单模式）**

内容区域会自动应用以下默认样式：

```css
padding: 0px;
color: #606266;
font-size: 14px;
word-break: break-all;
```

适用于表单弹窗，因为表单组件（如 `vk-data-form`）通常有自己的布局和间距，所以不会自动添加 padding，避免样式冲突。

**使用建议**

- 普通弹窗使用 `mode="default"`，无需手动设置样式
- 表单弹窗使用 `mode="form"`，由表单组件自行控制布局
- 如果在 `mode="form"` 下需要自定义样式，可以通过 `custom-class` 属性添加自定义类名，并通过 `::v-deep` 方式重写样式，如

```vue
<vk-data-dialog mode="form" custom-class="export-column-dialog"></vk-data-dialog>
```

```scss
::v-deep {
  .export-column-dialog {
    .el-dialog__body {
      padding: 12px 20px 0 20px !important;
    }
  }
}
```

### 事件

| 事件名 | 说明                       | 回调参数 |
| ------ | -------------------------- | -------- |
| open   | 监听 - 弹窗打开 - 动画开始 | -        |
| opened | 监听 - 弹窗打开 - 动画结束 | -        |
| close  | 监听 - 弹窗关闭 - 动画开始 | -        |
| closed | 监听 - 弹窗关闭 - 动画结束 | -        |

### 方法

#### 通过 this.$refs.dialog1.xxx(); 方式调用

| 方法名                       | 说明                         |
| ---------------------------- | ---------------------------- |
| changeFullscreen             | 全屏切换                     |
| close()                      | 关闭弹窗，会触发 beforeClose |
| close({ beforeClose:false }) | 关闭弹窗，不触发 beforeClose |

### 插槽

| name    | 说明                    |
| ------- | ----------------------- |
| default | Dialog 主内容           |
| title   | Dialog 标题区的内容     |
| footer  | Dialog 按钮操作区的内容 |

**插槽示例**

```vue
<vk-data-dialog v-model="showDialog" width="500px" top="14vh" :close-on-click-modal="true">
  <template v-slot:title>
    <view> 这是标题的插槽 </view>
  </template>
  <template v-slot:default>
    <view> 这里是主内容插槽 </view>
  </template>
  <template v-slot:footer="{ close }">
    <!--这里是底部插槽-->
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="close">确 定</el-button>
  </template>
</vk-data-dialog>
```
