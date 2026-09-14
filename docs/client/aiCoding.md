---
sidebarDepth: 0
---

# AI 编程

## 推荐的 AI Coding 工具

- Codex
- Claude Code
- Visual Studio Code 内的 Codex、Claude Code、Copilot
- Cursor
- HBuilderX 内的 uni-agent

## 初始化 Agent 配置@init-env

通过辅助工具将项目环境信息写入项目根目录的 `AGENTS.md`，供 AI 编程工具使用。以下操作适用于辅助工具 0.13.0 及以上版本。

1. 通过 git 导入 [VK 框架文档仓库](https://gitee.com/vk-uni/vk-unicloud-docs.git)，保留目录名 `vk-unicloud-docs` 不变，并将它与当前项目放在同一父目录下。例如当前项目为 `D:/hbxwork/my-project`，则文档仓库应为 `D:/hbxwork/vk-unicloud-docs`。
2. 安装或升级 [VK 框架快速开发辅助工具](https://ext.dcloud.net.cn/plugin?id=6663) 最新版本。
3. 在 HBuilderX 项目管理器中右键 VK 框架项目名，选择【VK】-【初始化 Agent 配置】。也可以在项目根目录的 `AGENTS.md` 文件或该文件的代码编辑器中右键执行。
4. 初始化完成后，点击【查看】检查 `AGENTS.md` 中的项目环境信息。

> 菜单仅在项目包含 `uni_modules/vk-unicloud/` 时显示。初始化前需关联 uniCloud 服务空间，同时确保同级文档仓库中存在 `docs` 目录。

**效果**

- 自动识别 router 函数的位置、文档仓库项目位置，添加到 `.claude/rules/env.md`，内容示例如下
- 能正确识别项目绑定关系，如 B 项目绑定 A 项目，则在 B 项目执行初始化时，uniCloud 目录会自动识别到 A 项目。
- 自动创建 `CLAUDE.md`；如果文件已存在，则补充缺少的 `@AGENTS.md` 引用，并保留已有内容。
- 项目路径、绑定关系或 router 主函数名变更后，可以再次执行，更新环境信息并保留 `AGENTS.md` 中的其他规则。

`AGENTS.md` 内容示例：

```md
<!-- vk-unicloud-skills:rules:start -->

## 1、环境变量

- `uniCloud目录`：`D:/hbxwork/vk-unicloud-client/uniCloud-alipay`
- `router主函数名`：`router`
- `文档根目录`: `D:/hbxwork/vk-unicloud-docs/docs`

**注意**：

- `uniCloud目录` 为后端代码所在目录，且后端默认使用 `router主函数`，位于 `${uniCloud目录}/cloudfunctions/${router主函数名}` 目录下，当需要编写云函数、云对象等后端代码时，默认均写在此目录下
- 在所有的 `skills` 中，当有写 `${uniCloud目录}/cloudfunctions/${router主函数名}` 这样的方式时，最终文件地址需要替换为绝对路径拼接

<!-- vk-unicloud-skills:rules:end -->
```

`CLAUDE.md` 通过以下内容引用项目配置：

```md
@AGENTS.md
```

也可以通过 HBuilderX 命令行工具执行，`projectName` 为当前工作区中的项目名：

```sh
cli vk.initEnvConfig --projectName vk-unicloud-admin
```

## 自定义项目规则@rules

当你需要补充项目规则时，可在项目根目录的 `AGENTS.md` 中追加内容，放在 `<!-- vk-unicloud-skills:rules:end -->` 标记之后。

以下是可以追加的规则示例：

```md
# 项目规则模板

## 通用规则

### 强制规则

- AI 必须用中文回答问题
- 如果本次改动较大，在执行你的操作前，你必须先说明你的方案，不要马上执行，等待用户确认后再执行操作（如果用户已明示让你直接操作，则无视此条规则）

## 代码规范

### 变量命名规范

- 普通变量命名使用驼峰命名法（如：userInfo）
- 数据库表的字段名使用全小写蛇形（下划线命名法）（如：user_id）
- 数据库表名使用 kebab-case（中划线命名法）（如：uni-id-users）

```

## uni-agent 注意事项@uni-agent-tips

完成【初始化 Agent 配置】后，项目根目录已经包含 `AGENTS.md`，可直接作为 uni-agent 的项目规则文件。将需要共用的自定义规则也写入该文件即可。

## 框架 AI 后续发展计划

当前 VK 未提供框架级别的 skills（已在计划中），敬请期待。
