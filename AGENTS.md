# BeautyProof - 需求拆解文档

## 产品概述

- **产品类型**: 产品展示官网（AI 科技公司风格）
- **场景类型**: <scene_type>prototype-app</scene_type>
- **目标用户**: 欧莱雅黑客松评委、美妆行业从业者、AI 信任基础设施关注者、普通消费者
- **核心价值**: 通过确定性规则引擎将美妆种草文案拆解为原子 Claim 并对照官方证据，输出可解释的 Evidence Case，解决美妆营销中的信任失真问题
- **界面语言**: 中文
- **主题偏好**: 深色（深蓝黑底色 + 青绿 accent 色）
- **导航模式**: 锚点导航
- **导航布局**: Topbar（顶部固定）
- **附件说明**: 用户提供了 1 个附件 URL（https://aka.doubaocdn.com/s/Etjck18XU1），当前阶段无法访问，待 design-agent 阶段处理

---

## 页面结构总览

**页面文件**: `HomePage.tsx`

| 区块名称 | 锚点 | 区块说明 |
|---------|------|---------|
| 首屏/Hero | `#hero` | 黑客松标签 + 大标题 + 副标题 + CTA 按钮 + 右侧核验演示面板 + 底部亮点标签 |
| 核心能力 | `#capabilities` | 三个大卡片横向排列：原子化拆解 / 确定性契约 / 可解释案卷 |
| 失真类型 | `#distortions` | 标题"他们是怎么偷换你的信任的" + 10种失真标签云 + 3个案例行表格 |
| BETA Engine 流水线 | `#pipeline` | 四步流程图（Break → Evidence → Triangulate → Applicability）+ 四个数据统计卡片 |
| 证据库区 | `#evidence` | 标题"只认官方公开证据" + 六个品牌证据包标签 |
| 底部CTA | `#cta` | 大标题 + 「前往核验台」按钮 |

---

## 页面布局建议

- **布局模式**: 单页纵向滚动 + 锚点导航；Hero 区采用左右分栏（左侧文案 + 右侧演示面板），其余区块为居中内容区
- **视觉重心**: Hero 区的核验演示面板是首屏视觉重心，用交互演示直观传达产品核心能力；数据统计卡片用大字号数字强化冲击力
- **结果承载区**: Hero 右侧核验演示面板内含结果区，初始态展示预填输入框 + 空结果占位，点击核验后显示加载动画，再渲染 claim 条目（含 SUPPORTED / PARTIAL / CONTEXT_MISMATCH 状态色标）

---

## 插件规划

| 插件实例名称 | 基于官方插件 | 业务用途 | 输出模式 | 所属页面 |
|------------|-----------|---------|---------|---------|
| beauty-claim-parser | ai-text-to-json | 将用户输入的美妆种草文案拆解为功效、数值、时间、人群、背书等原子 Claim | unary | HomePage（Hero 演示区） |
| evidence-matcher | ai-categorization | 将原子 Claim 与官方证据包进行对照匹配，判定 SUPPORTED / PARTIAL / CONTEXT_MISMATCH | unary | HomePage（Hero 演示区） |
| evidence-explainer | ai-text-generate | 根据匹配结果生成可解释的 Evidence Case 文案（触发规则、数字差异、消费者解释） | stream | HomePage（Hero 演示区） |

> **说明**: Hero 区的核验演示为核心交互功能，涉及非结构化文本解析、语义匹配和自然语言生成，需通过上述三个插件链式调用实现。页面其他区块为静态展示内容。

---

## 导航配置

- **导航布局**: Topbar（顶部固定，深色透明背景，滚动时加深）
- **导航项**:

| 导航文字 | 锚点 |
|---------|------|
| 首页 | `#hero` |
| 核心能力 | `#capabilities` |
| 失真类型 | `#distortions` |
| 流水线 | `#pipeline` |
| 证据库 | `#evidence` |

> **Logo**: 左侧展示 "BeautyProof" logo（文字 + 小图标）

---

## 数据来源声明

| 数据/操作 | 来源类型 | 实现要求 | mock 兜底 |
|---|---|---|---|
| 种草文案原子化拆解 | real-plugin | 调 beauty-claim-parser 实例，传入用户输入的种草文案，返回结构化原子 Claim 列表 | 无（插件能力不可 mock） |
| Claim 与官方证据对照匹配 | real-plugin | 调 evidence-matcher 实例，传入拆解后的 Claim 列表，返回每条 Claim 的匹配状态与规则编号 | 失败提示（toast "证据引擎暂不可用"） |
| Evidence Case 解释文案生成 | real-plugin | 调 evidence-explainer 实例，传入匹配结果，流式输出可解释的证据案卷文案 | 失败提示（toast "解释生成失败"） |
| 核心能力卡片数据 | demo-mock | src/data/capabilities.ts const 数组 | ✅ 本身就是 mock |
| 失真类型与案例数据 | demo-mock | src/data/distortions.ts const（10 种失真 + 3 个案例） | ✅ 本身就是 mock |
| BETA Engine 流水线数据 | demo-mock | src/data/pipeline.ts const（四步流程 + 四个统计数据） | ✅ 本身就是 mock |
| 证据库品牌数据 | demo-mock | src/data/evidencePacks.ts const（6 个品牌证据包） | ✅ 本身就是 mock |
| Hero 演示示例文案 | demo-mock | src/data/demo.ts const 预填示例文案 + 预置核验结果（用于无插件环境下的演示 fallback） | ✅ 预置示例数据，仅作展示 fallback |

> **mock 例外说明**: Hero 核验演示的主链路走 real-plugin（3 个插件），但因本项目为黑客松展示官网，保留一套预置的 mock 核验结果作为无插件环境下的展示 fallback，确保页面打开即可看到完整演示效果。mock 数据每条记录带 `source: 'mock'` 字段。

---

## 功能列表

- **区块: Hero 首屏**
  - **页面目标**: 用一句话抓住用户注意力，通过交互演示直观传达产品核心价值
  - **功能点**:
    - **核验演示交互**: 左侧输入框预填示例种草文案，右侧为核验结果面板；点击「立即核验」按钮后触发加载动画，然后渲染多条 Claim 结果条目，每条带状态色标（绿色 SUPPORTED / 黄色 PARTIAL / 红色 CONTEXT_MISMATCH）
    - **CTA 双按钮**: 「立即体验核验」滚动到演示面板并聚焦输入框；「查看契约规则」滚动到 BETA Engine 流水线区
    - **底部亮点标签**: 横向排列 4 个高亮标签（确定性规则引擎裁决 / 6个官方证据包 / 62/62挑战集命中 / 可解释证据案卷），带图标和数字强调

- **区块: 核心能力**
  - **页面目标**: 展示产品三大核心能力，建立专业可信度
  - **功能点**:
    - **三大能力卡片**: 横向三列卡片（原子化拆解 / 确定性契约 / 可解释案卷），各含图标、标题、英文术语名、描述文案
    - **卡片 hover 效果**: 鼠标悬停时卡片微上浮 + 边框 accent 色高亮

- **区块: 失真类型**
  - **页面目标**: 直观展示 10 种常见失真模式，强化用户痛点认知
  - **功能点**:
    - **失真标签云**: 10 个失真类型标签（带 emoji 图标 + 名称），网格排列，hover 时放大高亮
    - **失真案例表格**: 3 个具体案例行，每行三列（原文案 / 触发规则编号 / 实际问题说明），规则编号用等宽字体 + accent 色突出

- **区块: BETA Engine 流水线**
  - **页面目标**: 展示技术流程与关键数据，体现技术实力
  - **功能点**:
    - **四步流程图**: 横向步骤图（Break → Evidence → Triangulate → Applicability），每步含图标、英文名称、中文说明，步骤间用连线/箭头连接
    - **数据统计卡片**: 下方 4 个大数字统计卡片（62/62 final_state 命中、55/62 reason_code 命中、R001–R015 规则、6 个证据包），数字用超大等宽字体

- **区块: 证据库区**
  - **页面目标**: 展示官方证据来源，增强权威性
  - **功能点**:
    - **品牌证据包标签**: 6 个品牌标签卡片（Dior / Estée Lauder / L'Oréal Paris / La Roche-Posay / Shiseido / SkinCeuticals），网格排列，hover 时边框高亮

- **区块: 底部 CTA**
  - **页面目标**: 引导用户行动
  - **功能点**:
    - **CTA 大按钮**: 「前往核验台」按钮，点击后滚动到 Hero 区演示面板并聚焦输入框

- **全局交互**
  - **滚动渐入动画**: 每个区块进入视口时触发淡入上移动画
  - **响应式适配**: 桌面端横向多列布局，移动端自动堆叠为单列；Hero 演示面板移动端改为上下布局
  - **顶部导航锚点跳转**: 点击导航项平滑滚动到对应区块，当前区块高亮

-------

<scene_type>landing-page</scene_type>

# UI 设计指南

## 1. 设计推导依据

- **参考意图**: Free Direction —— 附件无法访问，基于用户需求文案与产品语义自主建立视觉方向
- **核心情绪 / 应用类型**: 美妆事实核验基础设施的科技品牌站——冷静、精密、可信，像法务证据系统而非美妆种草
- **独特记忆点**: 「证据链三色状态条」——每条 Claim 左侧以 SUPPORTED / PARTIAL / CONTEXT_MISMATCH 三色竖条标识证据强度，贯穿 Hero 演示、案例表与流水线输出，成为产品识别符号

## 2. Art Direction

- **方向名**: Forensic Dark Tech
- **Design Style**: Modern Dark + Grid Editorial —— 深色精密控制台气质，搭配瑞士式排版网格，让规则、数据、证据三类信息层次分明
- **DNA 参数**: 圆角 subtle（rounded-md） / 阴影 subtle（shadow-sm + 内发光感） / 间距 standard（gap-4 / p-6） / 字体方向：无衬线正文 + 等宽数字与规则编号 / 装饰手法：细边框分割、点阵网格底纹、左侧状态色条
- **应用类型**: Landing —— 单页叙事流，Hero 演示 + 能力卡 + 失真案例 + 流水线 + 证据库 + 底部 CTA

## 3. Color System

**色彩关系**: 深蓝黑底色 + 炭灰蓝卡片面 + 青绿主色 + 琥珀/赤红语义状态色；所有色彩从同一冷色调基底衍生，状态色饱和度与主色对齐
**配色设计理由**: 青绿 primary 承担「可信、通过、证据成立」的正向语义与 CTA 行动；深蓝黑 bg 营造基础设施级的稳重与精密；语义色用绿/琥珀/红对应三种证据强度，不判真假只标语境匹配度
**主色推导**: 青绿（emerald）来自「证据链、验真、通过」的语义联想，比电光蓝更少被 SaaS 滥用，也呼应实验室/法医感的冷静可信；在深蓝底上对比度充足
**使用比例**: 70% 深蓝黑中性 / 20% 炭灰蓝卡片与边框 / 10% 青绿 primary + 语义状态色；primary 只用于 CTA、SUPPORTED 状态、品牌锚点

| 角色 | CSS 变量 | Tailwind Class | HSL 值 | 设计说明 |
|---|---|---|---|---|
| bg | `--background` | `bg-background` | hsl(222 47% 7%) | 深蓝黑页面底，接近 #0a0e1a |
| card | `--card` | `bg-card` | hsl(218 32% 12%) | 炭灰蓝卡片面，接近 #121826 |
| text | `--foreground` | `text-foreground` | hsl(210 20% 94%) | 近白正文，高对比可读 |
| textMuted | `--muted-foreground` | `text-muted-foreground` | hsl(215 15% 60%) | 次级说明、元信息 |
| primary | `--primary` | `bg-primary` / `text-primary` | hsl(160 84% 42%) | 青绿主色，接近 #10b981 |
| primaryForeground | `--primary-foreground` | `text-primary-foreground` | hsl(165 40% 98%) | 主色上的文字，极浅青 |
| accent | `--accent` | `bg-accent` | hsl(217 28% 18%) | hover/focus 浅底、选中态底 |
| accentForeground | `--accent-foreground` | `text-accent-foreground` | hsl(210 20% 88%) | accent 上的文字 |
| border | `--border` | `border-border` | hsl(215 20% 22%) | 细微边框，结构分隔 |

**语义色提示**: 
- SUPPORTED（绿）：bg hsl(160 84% 12%) / border hsl(160 70% 30%) / text hsl(160 70% 65%) —— 与 primary 同色温
- PARTIAL（琥珀）：bg hsl(38 90% 12%) / border hsl(38 80% 30%) / text hsl(38 80% 65%) —— 饱和度与 primary 对齐
- CONTEXT_MISMATCH（红）：bg hsl(0 70% 12%) / border hsl(0 65% 30%) / text hsl(0 70% 68%) —— 饱和度低于 primary 5%，避免刺眼
- 规则编号、数据数字用等宽字体，颜色同 text 或 primary，不另设独立品牌色

## 4. 字体与节奏

- **font-display**: Space Grotesk, Noto Sans SC —— 几何科技感标题，增强精密基础设施气质；中文补 Noto Sans SC
- **font-body**: Inter, Noto Sans SC —— 清晰中立的正文阅读；数字与规则编号使用 IBM Plex Mono 等宽字体
- **字号**: H1 text-5xl md:text-6xl lg:text-7xl（bold）；H2 text-2xl md:text-3xl；数据大字 text-4xl md:text-5xl；body text-base；muted text-sm；规则编号 text-xs 等宽
- **圆角**: 中（rounded-md）—— 卡片、按钮、输入框统一 6-8px 圆角，克制专业

## 5. 全局布局契约

- **Reference Layout Use**: 按需求结构推导，6 个区块顺序与用户需求 1:1 对齐
- **Page / Section Order**: Hero → 核心能力 → 失真类型 → BETA Engine 流水线 → 证据库 → 底部 CTA
- **Standard Content Zone**: `max-w-6xl mx-auto` —— Landing 标准宽度，兼顾首屏演示面板与数据卡片舒展度
- **Shell / Frame Alignment**: 单页 Landing，无顶部导航 chrome；内容容器独立居中，背景层可全宽延伸
- **Padding & Rhythm**: `px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-28`，区块间用 `py-20 md:py-28` 保持呼吸
- **Full-bleed Zones**: Hero 背景点阵网格、各 section 背景渐变层可 `w-full`，内部文字与卡片受 Standard Content Zone 约束
- **Local Narrowing**: 底部 CTA 文案可收窄至 `max-w-3xl mx-auto` 居中
- **Overflow Strategy**: 失真标签云、证据库标签行在移动端使用 `flex-wrap`；案例表格在窄屏用 `overflow-x-auto`
- **Flexibility Boundary**: 允许移动端卡片改为单列、padding 减半、数据字号下调；不允许改变主色、圆角系统、状态色语义与左侧色条识别符号

## 6. 视觉与动效

- **装饰**: 细边框点阵网格、左侧状态色条、等宽规则编号
- **阴影/边界**: 轻 —— 卡片以 1px 边框为主，hover 时加极淡外发光（primary 色 20% 不透明度）
- **动效**: 克制精致 —— 滚动渐入（opacity 0→1 + translateY 12px→0，duration 500ms ease-out）；卡片 hover 微上浮（translateY -2px，shadow 加深）；核验演示有骨架屏→结果展开的步进动画；状态色条有从左到右的填充动效

## 7. 组件原则

- 按钮：Primary 实色青绿 + 深青文字；Secondary 边框 + accent 底 hover；Ghost 纯文字 + accent 底 hover
- 状态卡片（Claim 结果）：左侧 3px 竖条（绿/琥珀/红）+ 等宽状态标签 + claim 文本 + 规则编号
- 数据统计卡：大号等宽数字 + 小号说明文字 + 顶部细微边框
- 所有交互元素必须有 `:focus-visible`（2px primary 外轮廓 + 2px offset）
- 加载态：用点阵进度条或骨架屏，不使用旋转 spinner

## 8. Image Direction

- **Image Role**: Hero 背景氛围 + 区块分割装饰点阵
- **Image Art Direction**: 极淡的深蓝色点阵网格与细微径向渐变（中心略亮），营造数字证据库/控制台底的空间感；不使用具象人物或产品图，保持抽象基础设施感；所有图像作为背景层，前景文字与卡片清晰可读
- **Image Prompt Keywords**: dark navy digital grid, subtle dot matrix pattern, deep blue-black background, faint radial glow center, forensic evidence database aesthetic, minimal tech infrastructure texture, low contrast cyan accent specks, ultra clean geometric grid, cinematic depth, no people no products
- **Image Avoidance**: 避免美妆产品图、模特人像、粉金色调、花哨渐变、商务握手素材、3D 玻璃拟态球体、赛博朋克霓虹过饱和

## 9. Anti-patterns

- **Beauty blog drift**: 用粉色、金色、圆润柔美曲线或产品美图接管视觉；坚持法医证据系统的深色精密气质
- **Neon overload**: 青绿 primary 到处发光、描边、铺满；把 primary 收回到 CTA、SUPPORTED 状态和品牌锚点
- **Status rainbow**: 10 种失真类型各给一个颜色；统一用左侧色条 + 等宽标签的三色系统承载状态
- **Mono card stack**: 所有信息塞进一样的圆角卡片；核心能力卡用大卡片、失真类型用标签云+表格、流水线用步骤条、证据库用标签，每种区块有独立形态
- **Invisible keyboard state**: hover 做了微动效，focus-visible 丢了；每个按钮、输入、卡片都要有清晰的键盘聚焦轮廓
- **Fake data gloss**: 数字用渐变描边或 3D 立体字显得"科技"；用等宽字体 + 纯色 + 足够字号体现数据醒目