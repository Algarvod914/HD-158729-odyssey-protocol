# HD 158729 解谜游戏 - 技术规格

---

## 组件清单

### shadcn/ui 组件
- Button - 按钮交互
- Card - 关卡卡片
- Dialog - 弹窗提示
- Input - 输入框
- Progress - 进度条
- Slider - 滑动条(频率调整)
- Tabs - 标签切换
- Alert - 警告信息

### 自定义组件
- `StarField` - 星空背景动画
- `Terminal` - 终端界面
- `GlitchText` - 故障文字效果
- `ScanLine` - 扫描线效果
- `PuzzleGame` - 拼图游戏
- `MemoryGame` - 记忆游戏
- `CodeRepair` - 代码修复
- `FireWall` - 防火墙小游戏

---

## 动画实现表

| 动画 | 库 | 实现方式 | 复杂度 |
|------|-----|---------|-------|
| 星空背景 | CSS + JS | 随机生成的星星粒子 | Medium |
| 文字打印 | Framer Motion | 逐字显示动画 | Low |
| 故障效果 | CSS | text-shadow动画 | Medium |
| 扫描线 | CSS | 线性渐变动画 | Low |
| 屏幕闪烁 | CSS | opacity关键帧 | Low |
| 波形图 | Canvas | 实时绘制正弦波 | Medium |
| 拼图拖拽 | Framer Motion | drag手势 | Medium |
| 感染扩散 | CSS | 红色渐变蔓延 | High |
| 时间循环 | Framer Motion | 重复动画序列 | Medium |

---

## 项目文件结构

```
src/
├── components/
│   ├── ui/              # shadcn组件
│   ├── StarField.tsx    # 星空背景
│   ├── Terminal.tsx     # 终端界面
│   ├── GlitchText.tsx   # 故障文字
│   ├── ScanLine.tsx     # 扫描线
│   └── puzzles/         # 谜题组件
│       ├── CoordinatePuzzle.tsx
│       ├── FrequencyPuzzle.tsx
│       ├── FindDifference.tsx
│       ├── MorseCode.tsx
│       ├── SystemRepair.tsx
│       ├── JigsawPuzzle.tsx
│       ├── IdentityPuzzle.tsx
│       ├── CodeRepair.tsx
│       ├── TimeLoop.tsx
│       ├── ClueAssembly.tsx
│       ├── SanityTest.tsx
│       ├── FirewallGame.tsx
│       └── FinalChoice.tsx
├── pages/
│   ├── Menu.tsx         # 主菜单
│   └── Level.tsx        # 关卡页面
├── hooks/
│   ├── useGameState.ts  # 游戏状态
│   └── useLocalStorage.ts
├── data/
│   └── levels.ts        # 关卡数据
├── types/
│   └── game.ts          # 类型定义
├── App.tsx
└── index.css
```

---

## 依赖项

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "latest",
    "@types/node": "latest"
  }
}
```

---

## 状态管理

### GameState
```typescript
interface GameState {
  currentLevel: number;
  unlockedLevels: number[];
  completedLevels: number[];
  infectionLevel: number; // 0-100
  endingsUnlocked: string[];
  currentEnding?: 'A' | 'B' | 'C';
}
```

### LevelData
```typescript
interface LevelData {
  id: number;
  title: string;
  description: string;
  puzzleType: PuzzleType;
  storyText: string[];
  hints: string[];
}
```

---

## 路由设计

- `/` - 主菜单
- `/level/:id` - 关卡页面
- `/ending/:type` - 结局页面

---

## 性能优化

- 使用React.memo优化组件
- 图片懒加载
- 动画使用GPU加速
- 本地存储序列化
