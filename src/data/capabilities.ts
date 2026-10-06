// EXPORTS: ICapability, MOCK_CAPABILITIES
export interface ICapability {
  id: string
  icon: string
  title: string
  englishName: string
  description: string
}

export const MOCK_CAPABILITIES: ICapability[] = [
  {
    id: '1',
    icon: '🔍',
    title: '原子化拆解',
    englishName: 'Beauty Claim Compiler',
    description: '把一段种草文案拆成功效、数值、时间、人群、背书等11类原子Claim，任何断言都保留原文出处，绝不脑补。',
  },
  {
    id: '2',
    icon: '⚖️',
    title: '确定性契约',
    englishName: 'E7 Context Engine',
    description: '用 R001–R015 确定性规则对照官方证据——时间压缩、幅度通胀、应答率偷换、证据越级……规则说了算，LLM只负责解释。',
  },
  {
    id: '3',
    icon: '📜',
    title: '可解释案卷',
    englishName: 'Evidence Case',
    description: '输出触发规则、双方数字差异、消费者解释——逐条可追溯，可直接投喂给AI购物助手。',
  },
]