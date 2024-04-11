---
sidebarDepth: 0
---

# 扩展图标库

## 下载安装图标

* 从 [https://www.iconfont.cn](https://www.iconfont.cn) 网站上生成图标库css文件

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/0a5b6fdc-aeb3-44e8-ab82-95bfdf052457.png)

注意看上图的命名格式

FontClass前缀：vk-xxx-icon-

Font Family：vk-xxx-icon

你只改动xxx，如

FontClass前缀：vk-aaa-icon-

Font Family：vk-aaa-icon

* 下载至本地

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/82b89772-7a86-445a-be0f-c22af9127bdb.png)

* 3、解压下载的文件，并复制 `iconfont.css` 文件到 你项目根目录的 `static` 目录，并将 `iconfont.css` 改名为 `vk-custom-icon.css`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/682c34a8-2bc5-4a91-a17d-26247eeb9eb4.png)

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/24ee623d-fb3f-4149-9d19-7e9629c0b9a6.png)

* 4、在 `App.vue` 内引入图标

```scss
<style lang="scss">@import "@/static/vk-custom-icon.css";
</style>
```

* 5、假设你的某个图标是 `vk-custom-icon-update` 

则 `vk-custom-icon-update` 就是图标的 `name`，也是图标的值

## 使用示例

**显示图标**

```html
<text class="vk-custom-icon vk-custom-icon-update" style=" font-size: 16px;color: #000000;"></text>
```
    
**如果你使用了 `vk-uview-ui` 组件库，则可以这样显示图标**

```html
<u-icon name="vk-custom-icon-update" size="16" color="#000000"></u-icon>
```

[传送门 - admin端扩展图标教程](https://vkdoc.fsq.pub/admin/components2/1%E3%80%81vk-data-icon.html#%E5%A6%82%E4%BD%95%E6%89%A9%E5%B1%95%E5%9B%BE%E6%A0%87%E5%BA%93)