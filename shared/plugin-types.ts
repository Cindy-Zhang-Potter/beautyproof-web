// ---- plugin:evidence_matcher_claim_classification_1 ----
// ============================================================
// 插件 evidence_matcher_claim_classification_1 (证据匹配声明分类) 的类型定义
// 由 get_plugin_ai_json 自动生成
// ============================================================

export interface EvidenceMatcherClaimClassificationOneInput {
  /** 待分类的原子Claim文本 */
  claim_text: string;
  /** 官方证据包文本内容 */
  evidence_package: string;
}

/**
 * capabilityClient.load('evidence_matcher_claim_classification_1').call<EvidenceMatcherClaimClassificationOneOutput>('aiCategorize', input)
 * 直接返回此类型，无 .data 包装，直接解构使用：
 * const { categories } = result;
 * 返回值形如：
 *   {"categories":["示例文本"]}
 */
export interface EvidenceMatcherClaimClassificationOneOutput {
  /** [object Object] */
  categories: string[];
}
// ---- end:evidence_matcher_claim_classification_1 ----

// ---- plugin:evidence_explainer_case_generator_1 ----
// ============================================================
// 插件 evidence_explainer_case_generator_1 (证据解释文案生成器) 的类型定义
// 由 get_plugin_ai_json 自动生成
// ============================================================

export interface EvidenceExplainerCaseGeneratorOneInput {
  /** Claim匹配结果原始数据，包含匹配规则、涉及数值、相关上下文信息 */
  claim_match_result: string;
  /** 业务场景标识，用于适配不同行业的解释话术风格 */
  business_scene?: string;
}

/**
 * capabilityClient.load('evidence_explainer_case_generator_1').callStream<EvidenceExplainerCaseGeneratorOneOutput>('textGenerate', input)
 * 每个 chunk 就是下面这个扁平对象，字段名与 EvidenceExplainerCaseGeneratorOneOutput 一致，外面没有 data / choices / message 包装：
 *   {"content":"示例文本","response":"示例文本"}
 * 返回值可能是 AsyncIterable<chunk>，也可能是 { output: AsyncIterable<chunk> }，取流前先归一化。
 * 逐段累加：
 *   for await (const chunk of stream) { result += chunk.content ?? ''; }
 */
export interface EvidenceExplainerCaseGeneratorOneOutput {
  /** [object Object] */
  content: string;
  /** [object Object] */
  response?: string;
}
// ---- end:evidence_explainer_case_generator_1 ----

// ---- plugin:beauty_claim_parser_1 ----
// ============================================================
// 插件 beauty_claim_parser_1 (美妆种草文案拆解工具) 的类型定义
// 由 get_plugin_ai_json 自动生成
// ============================================================

export interface BeautyClaimParserOneInput {
  /** 待拆解的美妆种草文案内容 */
  beauty_copy: string;
}

/**
 * capabilityClient.load('beauty_claim_parser_1').call<BeautyClaimParserOneOutput>('textToJson', input)
 * 直接返回此类型，无 .data 包装，直接解构使用：
 * const { claims } = result;
 * 返回值形如：
 *   {"claims":[]}
 */
export interface BeautyClaimParserOneOutput {
  /** 原子Claim数组，items schema: {text: string(宣传声称的原始文本内容), category: string(声称分类，可选值：功效声称、成分声称、安全声称、体验声称、其他), status: string(合规性状态，可选值：合规、违规、待验证), ruleCode: string(对应法规条款编码，如无则填空字符串), explanation: string(对该声称合规性判断的详细解释)} */
  claims: unknown[];
}
// ---- end:beauty_claim_parser_1 ----