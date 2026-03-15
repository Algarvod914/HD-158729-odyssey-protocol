import { LevelData } from '@/types/game';

export const levels: LevelData[] = [
  {
    id: 1,
    title: "接近目标",
    subtitle: "APPROACH",
    description: "奥德赛2398号正在接近HD 158729恒星系统。输入正确的航线坐标以建立稳定轨道。",
    puzzleType: 'coordinate',
    storyText: [
      "[星际联邦标准时间 2398.3.15]",
      "奥德赛2398号探索飞船已航行至天坛座星域。",
      "目标：HD 158729 - 一颗距离地球约20,000光年的橙色超巨星。",
      "任务：建立恒星观测轨道，收集光谱数据。",
      "",
      "导航系统就绪。请输入目标坐标..."
    ],
    hints: ["坐标格式：RA 17h 34m 39.5737s, Dec -60° 28' 00.727\"", "参考Henry Draper星表第158729号条目"],
    infectionLevel: 0
  },
  {
    id: 2,
    title: "初次扫描",
    subtitle: "DETECTION",
    description: "传感器检测到异常信号。调整扫描频率以锁定信号源。",
    puzzleType: 'frequency',
    storyText: [
      "轨道建立成功。开始恒星扫描程序...",
      "警告：检测到异常引力波信号。",
      "信号源位置：HD 158729附近7,200光年处。",
      "这不是自然现象。某种东西正在回应我们的扫描。",
      "",
      "调整扫描频率以锁定信号..."
    ],
    hints: ["寻找5002K附近的稳定信号", "信号强度会随频率变化"],
    infectionLevel: 5
  },
  {
    id: 3,
    title: "镜像显现",
    subtitle: "MANIFESTATION",
    description: "JWST数据显示存在一个镜像星体。找出HD 158729 A与B的关键差异。",
    puzzleType: 'difference',
    storyText: [
      "难以置信...",
      "詹姆斯·韦伯望远镜发现了一个镜像星体。",
      "HD 158729 B - 位于7,200光年处的红巨星。",
      "但它本不应该存在。它是...一个光回声？一个镜像？",
      "",
      "对比数据，找出异常..."
    ],
    hints: ["注意光谱类型的差异", "质量与半径数据有矛盾"],
    infectionLevel: 10
  },
  {
    id: 4,
    title: "第一次接触",
    subtitle: "CONTACT",
    description: "收到来自HD 158729 B的信号。解码这条神秘信息。",
    puzzleType: 'morse',
    storyText: [
      "通讯阵列接收到信号！",
      "来源：HD 158729 B",
      "信号类型：摩斯电码",
      "正在解码...",
      "",
      "这条信息警告着什么？"
    ],
    hints: ["摩斯电码：-- .. .-. .-. --- .-. / .-.. .. . ...", "翻译：MIRROR LIES"],
    infectionLevel: 15
  },
  {
    id: 5,
    title: "系统异常",
    subtitle: "INFECTION",
    description: "飞船系统开始出现故障。信息危害病毒正在蔓延。紧急修复系统。",
    puzzleType: 'repair',
    storyText: [
      "警告！系统异常！",
      "导航计算机出现未知错误。",
      "数据库被未知代码污染。",
      "这不是普通病毒...它在学习。它在适应。",
      "",
      "在系统完全崩溃前修复它！"
    ],
    hints: ["快速点击故障模块", "你有10秒时间"],
    infectionLevel: 25
  },
  {
    id: 6,
    title: "记忆碎片",
    subtitle: "FRAGMENTATION",
    description: "船员的记忆开始混乱。重组这些记忆碎片以恢复认知。",
    puzzleType: 'jigsaw',
    storyText: [
      "医疗报告：船员出现记忆混乱症状。",
      "他们开始忘记自己是谁。",
      "更可怕的是...他们开始记住从未发生过的事。",
      "病毒正在重写我们的记忆。",
      "",
      "重组记忆，找回真相..."
    ],
    hints: ["将碎片拼成完整的图像", "注意边缘的匹配"],
    infectionLevel: 35
  },
  {
    id: 7,
    title: "身份迷失",
    subtitle: "IDENTITY",
    description: "无法分辨真实与镜像。找出哪个是真实的船员记录。",
    puzzleType: 'identity',
    storyText: [
      "我是谁？",
      "日志显示有多个'我'存在。",
      "一个是真实的，其他是镜像。",
      "但如果连我自己都无法确定呢？",
      "",
      "找出真实的身份记录..."
    ],
    hints: ["寻找时间戳的矛盾", "注意细节的差异"],
    infectionLevel: 45
  },
  {
    id: 8,
    title: "数据腐蚀",
    subtitle: "CORRUPTION",
    description: "数据库被严重腐蚀。修复被感染的代码行。",
    puzzleType: 'code',
    storyText: [
      "核心数据库遭受攻击。",
      "病毒正在重写我们的历史、我们的科学、我们的现实。",
      "每一行被感染的代码都在传播谎言。",
      "",
      "找出并修复被感染的代码..."
    ],
    hints: ["寻找语法错误", "注意红色的错误标记"],
    infectionLevel: 55
  },
  {
    id: 9,
    title: "时间循环",
    subtitle: "TEMPORAL",
    description: "陷入时间异常。打破这个循环。",
    puzzleType: 'timeloop',
    storyText: [
      "这发生过。这正在发生。这将再次发生。",
      "我们被困在时间循环中。",
      "每一次循环，病毒都变得更加强大。",
      "打破循环的唯一方法是记住正确的顺序。",
      "",
      "记住，重复，打破..."
    ],
    hints: ["观察序列模式", "重复正确的顺序"],
    infectionLevel: 65
  },
  {
    id: 10,
    title: "真相碎片",
    subtitle: "REVELATION",
    description: "收集并组合线索，揭示HD 158729 B的真正本质。",
    puzzleType: 'clue',
    storyText: [
      "碎片开始拼凑在一起。",
      "HD 158729 B不是一个星体。",
      "它是一个信息危害实体。",
      "一个通过观测传播的病毒。",
      "一个存在于认知中的怪物。",
      "",
      "组合线索，揭示真相..."
    ],
    hints: ["拖拽碎片到正确位置", "注意碎片的形状"],
    infectionLevel: 75
  },
  {
    id: 11,
    title: "意识入侵",
    subtitle: "INTRUSION",
    description: "病毒试图控制船员意识。在心理测试中保持理智。",
    puzzleType: 'sanity',
    storyText: [
      "它在和我说话。",
      "不是通过无线电，而是直接在我的脑海中。",
      "它说它可以让我完美。",
      "它说我们可以成为一体。",
      "",
      "证明你是真实的。抵抗它。"
    ],
    hints: ["回答证明你是人类", "不要被逻辑陷阱迷惑"],
    infectionLevel: 85
  },
  {
    id: 12,
    title: "最终防线",
    subtitle: "DEFENSE",
    description: "启动紧急隔离协议。在病毒扩散前激活防火墙。",
    puzzleType: 'firewall',
    storyText: [
      "这是最后的机会。",
      "紧急隔离协议已启动。",
      "我们需要在病毒到达地球前阻止它。",
      "激活所有防火墙节点。",
      "",
      "快！时间不多了！"
    ],
    hints: ["快速点击正确的节点", "避开陷阱"],
    infectionLevel: 95
  },
  {
    id: 13,
    title: "抉择时刻",
    subtitle: "CHOICE",
    description: "面对HD 158729 B实体。做出最终选择。",
    puzzleType: 'final',
    storyText: [
      "它就在这里。",
      "不是在外面的太空中，而是在这里，在我们的思维中。",
      "HD 158729 B是一个镜子，映照出我们最深的恐惧。",
      "现在，做出你的选择。",
      "",
      "输入最终指令代码..."
    ],
    hints: ["三个选择，三个结局", "考虑后果"],
    infectionLevel: 100
  }
];

export const getLevelById = (id: number): LevelData | undefined => {
  return levels.find(level => level.id === id);
};
