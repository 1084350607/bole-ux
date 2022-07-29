# Bole-ux

This project is a `monorepo` based on `pnpm`.

Before use, we recommond to install the `pnpm` and use `ni` to run the script.

You can also use `npm` or `yarn`, but not recommondly.

## Plan

核心理念：Less is more

仓库模式：menorepo

开发方式：基于Vitest进行TDD模式进行开发，保证完整的测试用例，先测试用例规定上层用法

TODO:

- [ ] 编写vite插件，Demo文件自动添加到markdown
- [x] 脚本：根据目录自动生成siderbar结构树形结构

## Hooks 

- [ ] 设计和业务相关的Hooks，高可复用性
- [ ] Hooks遵循最佳实践[Composables](https://vuejs.org/guide/reusability/composables.html)

### Hooks开发说明：
- 理念：常出现的逻辑，封装后业务层使用扩展性中等，尽量代码量1-5行即可完成
- 抽象程度：业务层 < Bole-toole-set < vueuse等著名hooks开源库
- 可扩展性：根据业务需求，常见的多场景复用。同样：业务层 < Bole-tool-set < 开源工具

## Styles

- [ ] 收集原子类css
- [ ] 编写vscode插件，支持内部css提示


## Utils

## Components

- [ ] 原子类组件
