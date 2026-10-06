// EXPORTS: IDemoClaim, IDemoResult, MOCK_DEMO_SAMPLE_TEXT, MOCK_DEMO_RESULT
export interface IDemoClaim {
  id: string
  text: string
  category: string
  status: 'SUPPORTED' | 'PARTIAL' | 'CONTEXT_MISMATCH'
  ruleCode?: string
  explanation: string
}

export interface IDemoResult {
  source: 'mock'
  summary: string
  claims: IDemoClaim[]
}

export const MOCK_DEMO_SAMPLE_TEXT = '欧莱雅RevitaLift，皮肤科医生实测，7天淡纹48%，敏感肌闭眼入。'

export const MOCK_DEMO_RESULT: IDemoResult = {
  source: 'mock',
  summary: '共拆解为 4 条原子 Claim，其中 0 条完全支持、1 条部分支持、3 条语境不匹配',
  claims: [
    {
      id: '1',
      text: '7天淡纹48%',
      category: '功效·时间·数值',
      status: 'CONTEXT_MISMATCH',
      ruleCode: 'R001',
      explanation: '官方证据为 12 周淡纹 32%，时间维度被压缩、效果数值被夸大。'
    },
    {
      id: '2',
      text: '皮肤科医生实测',
      category: '背书',
      status: 'PARTIAL',
      ruleCode: 'R013',
      explanation: '官方为皮肤科医生参与的临床研究，非个体医生实测背书。'
    },
    {
      id: '3',
      text: '敏感肌闭眼入',
      category: '人群',
      status: 'CONTEXT_MISMATCH',
      ruleCode: 'R014',
      explanation: '临床受试者为健康成人皮肤，未覆盖敏感肌人群，存在人群泛化。'
    },
    {
      id: '4',
      text: '欧莱雅RevitaLift',
      category: '产品',
      status: 'SUPPORTED',
      explanation: '产品名称与官方证据包一致。'
    }
  ]
}