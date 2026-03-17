# 🌟 BabyEnglish - 幼儿英语互动学习

面向 3-6 岁儿童的英语启蒙互动游戏，iPad 优先，支持 PWA 离线使用。

## 📱 项目截图

- **首页**：学习统计概览，今日目标进度，快速开始练习入口
- **字母学习**：A-Z 大写小写闪卡，配合语音朗读
- **主题词汇**：颜色、动物、水果、数字等主题分类学习
- **互动练习**：听音选图、看图选词、拖拽配对、记忆游戏
- **关卡地图**：多邻国风格的学习路径，星星进度展示
- **游戏化**：连击系统、经验值、等级提升、每日目标

## ✨ 功能特性

- 🎨 **多邻国风格 UI**：深色主题，卡通配色，大触控按钮
- 📱 **iPad 优化**：竖屏优先，安全区域适配，PWA standalone 模式
- 🔄 **PWA 离线**：Service Worker 缓存，无网络也能学习
- 🎮 **游戏化学习**：关卡地图、星星奖励、连击系统、经验值
- 🔤 **5 大学习模块**：字母、颜色、动物、水果、数字
- 🎯 **4 种互动练习**：听音选图、看图选词、拖拽配对、记忆游戏
- 🔊 **音效反馈**：正确/错误/完成音效（Web Audio API，无需外部文件）
- ✨ **流畅动画**：页面转场、按钮反馈、连击特效
- 🦉 **引导流程**：首次使用 4 步引导，设置每日目标
- 🛡️ **错误边界**：渲染异常时显示友好页面，支持重试

## 🛠️ 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite 6
- **路由**: react-router-dom v7
- **状态管理**: zustand v5（localStorage 持久化）
- **PWA**: vite-plugin-pwa + Workbox
- **样式**: CSS Modules + CSS Variables
- **音效**: Web Audio API（零依赖）

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📦 部署（Vercel）

项目已配置 `vercel.json`，支持：
- SPA 路由回退
- 静态资源长期缓存（带 hash）
- PWA 相关文件不缓存（sw.js、manifest）
- Google Fonts 缓存策略

部署步骤：
1. 连接 GitHub 仓库到 Vercel
2. 构建命令：`npm run build`
3. 输出目录：`dist`
4. 自动部署，无需额外配置

## 📋 项目结构

```
src/
├── components/        # 公共组件
│   ├── AppLayout      # 主布局（顶部栏 + 底部导航）
│   ├── PageTransition # 页面转场动画
│   ├── ErrorBoundary  # 错误边界
│   ├── Loading        # Loading + 骨架屏
│   ├── Confetti       # 🎉 撒花特效
│   ├── ComboDisplay   # 连击显示
│   ├── AchievementBadge # 成就徽章
│   └── Guide          # 角色引导
├── pages/             # 页面组件
│   ├── HomePage       # 首页
│   ├── OnboardingPage # 首次引导
│   ├── MapPage        # 关卡地图
│   ├── AlphabetPage   # 字母学习
│   ├── TopicPage      # 主题词汇
│   ├── PracticePage   # 练习入口
│   └── SettingsPage   # 设置
├── data/              # 学习数据
├── store/             # 状态管理
├── utils/             # 工具函数
│   ├── sound.ts       # 音效系统
│   └── speech.ts      # 语音合成
└── styles/            # 全局样式
```

## 📋 License

MIT
