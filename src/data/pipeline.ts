// EXPORTS: IPipelineStep, IPipelineStat, MOCK_PIPELINE_STEPS, MOCK_PIPELINE_STATS
export interface IPipelineStep {
  id: string
  nameEn: string
  nameZh: string
  description: string
  icon: string
}

export interface IPipelineStat {
  id: string
  value: string
  label: string
}

export const MOCK_PIPELINE_STEPS: IPipelineStep[] = [
  {
    id: '1',
    nameEn: 'Break',
    nameZh: '拆解',
    description: '把文案拆成原子Claim，保留原文span',
    icon: '🔨',
  },
  {
    id: '2',
    nameEn: 'Evidence',
    nameZh: '对照',
    description: '逐条检索6个官方证据包',
    icon: '🔍',
  },
  {
    id: '3',
    nameEn: 'Triangulate',
    nameZh: '交叉',
    description: '多源交叉定位失真点',
    icon: '🔗',
  },
  {
    id: '4',
    nameEn: 'Applicability',
    nameZh: '适用',
    description: '校验人群·版本·时机',
    icon: '🎯',
  },
]

export const MOCK_PIPELINE_STATS: IPipelineStat[] = [
  {
    id: '1',
    value: '62/62',
    label: '挑战集 final_state 命中',
  },
  {
    id: '2',
    value: '55/62',
    label: 'reason_code 命中',
  },
  {
    id: '3',
    value: 'R001–R015',
    label: '确定性契约规则',
  },
  {
    id: '4',
    value: '6',
    label: '官方证据包',
  },
]