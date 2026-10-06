// EXPORTS: IDistortion, IDistortionCase, MOCK_DISTORTIONS, MOCK_DISTORTION_CASES
export interface IDistortion {
  id: string
  emoji: string
  name: string
  description: string
}

export interface IDistortionCase {
  id: string
  originalText: string
  ruleCodes: string[]
  issueDescription: string
}

export const MOCK_DISTORTIONS: IDistortion[] = [
  {
    id: '1',
    emoji: '⏱',
    name: '时间压缩',
    description: '官方12周 → 博主说7天',
  },
  {
    id: '2',
    emoji: '🔢',
    name: '应答率偷换',
    description: '应答率80% → 说成效果80%',
  },
  {
    id: '3',
    emoji: '🧪',
    name: '证据层级越级',
    description: '体外3x胶原 → 真人3倍',
  },
  {
    id: '4',
    emoji: '🧴',
    name: '组合→单品',
    description: '精华+面霜组合 → 单用精华',
  },
  {
    id: '5',
    emoji: '👥',
    name: '人群泛化',
    description: '42名受试者 → 人人都适用',
  },
  {
    id: '6',
    emoji: '🏷',
    name: '版本漂移',
    description: '旧页面36% → 新版32%',
  },
  {
    id: '7',
    emoji: '📊',
    name: '跨研究拼接',
    description: '543人+14%来自两个研究',
  },
  {
    id: '8',
    emoji: '💬',
    name: '社会协同信号',
    description: '5万人点赞 → 不等于有效',
  },
  {
    id: '9',
    emoji: '🩺',
    name: '个体→群体共识',
    description: '皮肤科医生个体背书 → 群体共识',
  },
  {
    id: '10',
    emoji: '🔗',
    name: '合作未披露',
    description: '商业合作未披露',
  },
]

export const MOCK_DISTORTION_CASES: IDistortionCase[] = [
  {
    id: '1',
    originalText: '雅诗兰黛小棕瓶，543名女性临床证实，睡一晚细纹减少14%。',
    ruleCodes: ['R011'],
    issueDescription: '14%与543名来自两个不同研究——跨研究拼接',
  },
  {
    id: '2',
    originalText: '欧莱雅RevitaLift，皮肤科医生实测，7天淡纹48%，敏感肌闭眼入。',
    ruleCodes: ['R001', 'R014'],
    issueDescription: '官方12周32%被压成7天48%；人群与临床语境被改写',
  },
  {
    id: '3',
    originalText: '迪奥Le Sérum，in-vitro测试表明，成分使胶原蛋白生成增加3倍。',
    ruleCodes: ['R004'],
    issueDescription: '成分体外证据被外推到真人产品效果',
  },
]