---
sidebarDepth: 0
---

# 代码提示

## 代码块提示

代码块是很方便的代码提示工具，简单的敲几个字母，回车，就能生成大段代码。效果如下：

**效果**

在 `script` 内输入vk

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/3d2824ab-d034-48be-9fff-f49edde50921.png)

在 `云函数` 内输入dao.

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/fe965ad9-e9ed-44fc-ad0b-5bc286988e09.png)

**安装代码块步骤**

**下载 [VK框架快速开发辅助工具](https://ext.dcloud.net.cn/plugin?id=6663)**

安装好后重启下HBX，即可直接使用！

## d.ts 语法提示

> vk-unicloud版本需 ≥ 2.18.2

自2.18.2版本起，新增了d.ts语法提示功能，具体效果如下：

**效果**

可以清楚的看到某个方法可接受哪些参数，并且返回值是什么

![](https://cdn.fsq.pub/vkdoc/vk-client/1715786134138t96cpsvdqq8.png)

vk.navigateTo 也能自动提示页面了

![](https://cdn.fsq.pub/vkdoc/vk-client/171578624935168169cn3k3.png)

**因为目前云端不支持ts，但如果想在云端也能有d.ts的语法提示，按照如下步骤安装即可。**

1. 复制文件 `/uni_modules/vk-unicloud/uniCloud/cloudfunctions/common/vk-unicloud/vk.d.ts`
2. 粘贴到 `你的HBX安装目录\plugins\hbuilderx-language-services\builtin-dts\uniapp@vue2\node_modules\@dcloudio\types\uni-cloud-server`
3. 修改上面目录下的 `index.d.ts` 新增代码 `/// <reference path="./vk.d.ts" />`

![](https://cdn.fsq.pub/vkdoc/vk-client/17157865882296b936falre8.png)

![](https://cdn.fsq.pub/vkdoc/vk-client/1715786661474jpamj7690po.png)


