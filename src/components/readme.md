# 组件目录结构规范

## 原子设计原则

组件按照以下层级组织：

1. **Atoms (原子)**：基础UI元素
   - Button
   - Input
   - Icon
   - ...

2. **Molecules (分子)**：由原子组成的简单组件
   - SearchBar (Input + Button)
   - CardHeader (Icon + Text)
   - ...

3. **Organisms (有机体)**：由分子组成的复杂组件
   - Header (Logo + Navigation + UserMenu)
   - Sidebar (Menu + SubMenu)
   - ...

4. **Templates (模板)**：页面布局结构
   - DefaultLayout
   - AuthLayout
   - ...

## 目录结构

```text
components/
├── atoms/
├── molecules/
├── organisms/
├── templates/
└── README.md
```

## 命名规范

- 使用PascalCase命名组件文件
- 组件名与文件名保持一致
- 禁止使用index.vue作为文件名
