# 厨王争霸 - AI智能菜单生成器

一个基于React和DeepSeek AI的智能菜单生成器，支持六大菜系同时创作菜谱。

## 🌟 功能特色

- **六大菜系同时创作**：湘菜、粤菜、川菜、法国菜、泰国菜、俄罗斯菜
- **AI智能判断风格**：DeepSeek根据食材特性自动判断专业模式或幽默模式
- **自动幽默模式**：遇到非食用物品时自动切换到幽默创作风格
- **实时动画效果**：厨师头像跳动，炒菜步骤文字忽隐忽现
- **并行API调用**：同时调用多个DeepSeek接口，按完成顺序排序
- **详细菜谱展示**：包含食材清单、制作步骤、小贴士等
- **响应式设计**：支持移动端和桌面端
- **背景音乐**：支持厨房背景音乐播放，营造烹饪氛围

## 🚀 快速开始

### 环境要求

- Node.js 16.0+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 🔧 配置

### DeepSeek API Key

1. 访问 [DeepSeek Platform](https://platform.deepseek.com)
2. 注册并登录账号
3. 在控制台中创建 API Key
4. 在应用中输入您的 API Key

### 项目结构

```
KitchenKing/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ChefCard.tsx       # 厨师卡片组件
│   │   ├── DishDetail.tsx     # 菜品详情弹窗
│   │   └── IngredientInput.tsx # 食材输入组件
│   ├── services/
│   │   └── deepseekApi.ts    # DeepSeek API 服务
│   ├── types/
│   │   └── index.ts          # TypeScript 类型定义
│   ├── utils/
│   │   └── helpers.ts        # 工具函数
│   ├── styles/
│   │   └── globals.css       # 全局样式
│   ├── App.tsx               # 主应用组件
│   └── index.tsx             # 入口文件
├── package.json
└── 配置文件...
```

## 🎯 使用说明

1. **输入食材**：在输入框中输入您拥有的食材，用逗号分隔
2. **AI智能判断**：DeepSeek会根据食材特性自动判断是专业模式还是幽默模式
3. **六大菜系创作**：系统会自动调用六大菜系的厨师同时创作
4. **等待生成**：观察厨师们的炒菜动画和实时状态
5. **查看结果**：点击完成的菜品查看详细制作方法
6. **重新开始**：点击重置按钮可以重新输入食材

### 🎭 智能模式示例

**专业模式**（正常食材）：
- 输入："鸡蛋，番茄，牛肉"
- 输出：专业的烹饪指导和详细步骤

**幽默模式**（奇特物品）：
- 输入："手机，电脑，键盘"
- 输出：荒诞有趣的创意菜谱，包含免责声明

## 🎨 设计特色

- **动画效果**：CSS动画实现厨师头像跳动和文字渐变
- **响应式布局**：适配不同屏幕尺寸
- **渐变背景**：现代化的视觉效果
- **交互反馈**：丰富的用户交互体验
- **音效体验**：背景音乐和音效增强沉浸感

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式框架**：Tailwind CSS
- **AI服务**：DeepSeek API
- **动画**：CSS Animations + Transitions

## 📱 移动端支持

- 完全响应式设计
- 触摸友好的交互
- PWA支持
- 移动端优化动画

## 🔒 隐私保护

- API Key本地存储，不上传到服务器
- 无用户数据收集
- 所有处理都在客户端完成

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

---

**让AI为您创作专属菜谱，享受美食的乐趣！** 🍽️✨