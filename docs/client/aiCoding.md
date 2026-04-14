---
sidebarDepth: 0
---

# AI 编程

## 推荐的 AI Coding 工具

- Claude Code
- Visual Studio Code 内的 Claude Code、Copilot
- Cursor
- HBuilderX 内的 uni-agent

## 初始化环境变量@init-env

1. 通过 git 导入仓库文档项目 [https://gitee.com/vk-uni/vk-unicloud-docs.git](https://gitee.com/vk-uni/vk-unicloud-docs.git)
2. 安装最新版 [VK 框架快速开发辅助工具](https://ext.dcloud.net.cn/plugin?id=6663)
3. 右键 `.claude` 目录（没有则新建，在项目根目录下新建这个目录）点击菜单【vk】-【初始化环境变量】

**效果**

- 自动识别 router 函数的位置、文档仓库项目位置，添加到 `.claude/rules/env.md`，内容示例如下

```md
# 环境变量

- `uniCloud目录`：`D:\hbxwork\vk-unicloud-client-dev\uniCloud-alipay`
- `router主函数名`：`router`
- `文档根目录`: `D:\hbxwork\vk-unicloud-docs\docs`

**注意**：

- `uniCloud目录` 为后端代码所在目录，且后端默认使用 `router主函数`，位于 `${uniCloud目录}/cloudfunctions/${router主函数名}` 目录下，当需要编写云函数、云对象等后端代码时，默认均写在此目录下
- 当需要查看文档时，优先在 `文档根目录` 下查看
- 在所有的 `skills` 中，当有写 `${uniCloud目录}/cloudfunctions/${router主函数名}` 这样的方式时，最终文件地址需要替换为绝对路径拼接
```

## uni-agent 注意事项@uni-agent-tips

因 uni-agent 不支持读取 `.claude/rules/` 目录，故 uni-agent 的全局提示词需要写到 `AGENTS.md`

**操作步骤**

1. 在项目根目录创建一个 `AGENTS.md` 文件，这是 uni-agent 提供的全局自定义规则
2. 复制 `.claude/rules/env.md` 文件内所有内容，粘贴到 `AGENTS.md` 内，可放在最顶部

## 框架 AI 后续发展计划

当前 VK 未提供框架级别的 skills（已在计划中），敬请期待。
