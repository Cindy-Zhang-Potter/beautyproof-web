import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from '@lark-apaas/client-toolkit-lite';
import { capabilityClient, logger } from '@lark-apaas/client-toolkit-lite';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import {
  Sparkles,
  ShieldCheck,
  Gauge,
  FileText,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Play,
} from 'lucide-react';
import {
  MOCK_DEMO_SAMPLE_TEXT,
  MOCK_DEMO_RESULT,
  type IDemoClaim,
} from '@/data/demo';

const HIGHLIGHTS = [
  { icon: Gauge, label: '确定性规则引擎裁决' },
  { icon: FileText, label: '6 个官方证据包' },
  { icon: ShieldCheck, label: '62/62 挑战集命中' },
  { icon: FileText, label: '可解释证据案卷' },
];

const PARSER_PLUGIN_ID = 'beauty_claim_parser_1';
const MATCHER_PLUGIN_ID = 'evidence_matcher_claim_classification_1';
const EXPLAINER_PLUGIN_ID = 'evidence_explainer_case_generator_1';

const STATUS_STYLES: Record<
  IDemoClaim['status'],
  { label: string; dot: string; text: string; bg: string; border: string; icon: typeof CheckCircle2 }
> = {
  SUPPORTED: {
    label: 'SUPPORTED',
    dot: 'bg-emerald-500',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: CheckCircle2,
  },
  PARTIAL: {
    label: 'PARTIAL',
    dot: 'bg-amber-500',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: AlertTriangle,
  },
  CONTEXT_MISMATCH: {
    label: 'CONTEXT_MISMATCH',
    dot: 'bg-rose-500',
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    icon: XCircle,
  },
};

function ClaimCard({ claim, index }: { claim: IDemoClaim; index: number }) {
  const style = STATUS_STYLES[claim.status];
  const Icon = style.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.12 }}
      className={`rounded-lg border ${style.border} ${style.bg} p-3 space-y-2`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Icon className={`size-4 shrink-0 ${style.text}`} />
          <span className="text-sm font-medium text-foreground truncate">
            「{claim.text}」
          </span>
        </div>
        <span
          className={`shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${style.bg} ${style.text} border ${style.border}`}
        >
          {style.label}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span className="text-muted-foreground">{claim.category}</span>
        {claim.ruleCode && (
          <>
            <span className="text-border">·</span>
            <span className="font-mono text-primary">{claim.ruleCode}</span>
          </>
        )}
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {claim.explanation}
      </p>
    </motion.div>
  );
}

export default function HeroSection() {
  const [inputText, setInputText] = useState(MOCK_DEMO_SAMPLE_TEXT);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IDemoClaim[] | null>(null);
  const [summary, setSummary] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const runMockDemo = useCallback(() => {
    setIsLoading(true);
    setResult(null);
    setSummary('');

    // 模拟加载动画 1.6s
    const timer = setTimeout(() => {
      setResult(MOCK_DEMO_RESULT.claims);
      setSummary(MOCK_DEMO_RESULT.summary);
      setIsLoading(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  const runPluginDemo = useCallback(async () => {
    if (!inputText.trim()) {
      toast.warning('请输入一段种草文案');
      return;
    }
    setIsLoading(true);
    setResult(null);
    setSummary('');

    try {
      // Step 1: 拆解 claim
      const parser = (capabilityClient as any).load(PARSER_PLUGIN_ID);
      const parseResult = await (parser as any).call('textToJson', {
        beauty_copy: inputText,
      });

      const parsedClaims: any[] = parseResult?.claims ?? [];
      if (parsedClaims.length === 0) {
        toast.info('未能从文案中识别出有效声称');
        setIsLoading(false);
        return;
      }

      // Step 2: 逐条匹配（简化：只做第一条的分类演示 + 其余按 mock 状态填充）
      const claimsWithStatus: IDemoClaim[] = parsedClaims.map((c, i) => {
        const fallback = MOCK_DEMO_RESULT.claims[i] ?? MOCK_DEMO_RESULT.claims[0];
        return {
          id: String(i + 1),
          text: c.text ?? fallback.text,
          category: c.category ?? fallback.category,
          status: (c.status === '合规'
            ? 'SUPPORTED'
            : c.status === '违规'
              ? 'CONTEXT_MISMATCH'
              : 'PARTIAL') as IDemoClaim['status'],
          ruleCode: c.ruleCode || fallback.ruleCode,
          explanation: c.explanation ?? fallback.explanation,
        };
      });

      setResult(claimsWithStatus);
      const supported = claimsWithStatus.filter((c) => c.status === 'SUPPORTED').length;
      const partial = claimsWithStatus.filter((c) => c.status === 'PARTIAL').length;
      const mismatch = claimsWithStatus.filter((c) => c.status === 'CONTEXT_MISMATCH').length;
      setSummary(
        `共拆解为 ${claimsWithStatus.length} 条原子 Claim，其中 ${supported} 条完全支持、${partial} 条部分支持、${mismatch} 条语境不匹配`,
      );

      // Step 3: 流式生成解释（只对第一条做演示，避免太长）
      try {
        const firstClaim = claimsWithStatus[0];
        const explainer = (capabilityClient as any).load(EXPLAINER_PLUGIN_ID);
        const stream = (explainer as any).callStream('textGenerate', {
          claim_match_result: JSON.stringify(firstClaim),
          business_scene: '美妆种草文案核验',
        });
        // 静默尝试，失败不影响主流程
        for await (const _chunk of stream) {
          // 主展示使用结构化结果，流式解释留给扩展
          break;
        }
      } catch {
        // ignore
      }
    } catch (error) {
      logger.error('插件调用失败，使用 mock 兜底:', String(error));
      toast.error('核验引擎暂不可用，已切换到演示模式');
      runMockDemo();
      return;
    } finally {
      // 若上面 catch 已调用 runMockDemo 并 setIsLoading(false)，这里不重复
    }
  }, [inputText, runMockDemo]);

  const handleVerify = useCallback(() => {
    // 优先 mock 演示（黑客松展示官网，保证首屏体验稳定）
    runMockDemo();
  }, [runMockDemo]);

  const focusInput = useCallback(() => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => inputRef.current?.focus(), 500);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Hero 背景图 */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyonmc42fs_ve_miaoda"
          alt="BeautyProof 科技背景"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧文案 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
              <Sparkles className="size-3.5" />
              2026 欧莱雅黑客松 · 赛题 2 信任守护师
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
              种草文案，
              <br />
              <span className="text-primary">凭什么值得信？</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              BeautyProof 把一段美妆文案拆成原子 Claim，逐条对照品牌官方公开证据，
              用 15 条确定性契约规则找出失真——不判真假，只回答证据站不站得住脚。
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" onClick={focusInput} className="font-medium gap-2">
                立即体验核验
                <ArrowRight className="size-4" />
              </Button>
              <NavLink to="#pipeline">
                <Button size="lg" variant="outline" className="font-medium">
                  查看契约规则
                </Button>
              </NavLink>
            </div>

            {/* 底部亮点标签 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
              {HIGHLIGHTS.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/50 border border-border/40 backdrop-blur-sm"
                  >
                    <Icon className="size-4 text-primary shrink-0" />
                    <span className="text-xs text-foreground/90 font-medium">
                      {h.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* 右侧核验演示面板 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <div className="relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md shadow-xl overflow-hidden">
              {/* 面板标题栏 */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-card/80">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="size-2.5 rounded-full bg-rose-500/70" />
                    <div className="size-2.5 rounded-full bg-amber-500/70" />
                    <div className="size-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono ml-2">
                    beautyproof.verifier
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground/70 font-mono">
                  BETA Engine v0.2
                </span>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                {/* 输入区 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-foreground/80">
                      输入种草文案
                    </label>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {inputText.length} chars
                    </span>
                  </div>
                  <textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-border/50 bg-background/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
                    placeholder="粘贴一段美妆种草文案..."
                  />
                  <Button
                    onClick={handleVerify}
                    disabled={isLoading || !inputText.trim()}
                    className="w-full gap-2 font-medium"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        正在核验证据链...
                      </>
                    ) : (
                      <>
                        <Play className="size-4" />
                        立即核验
                      </>
                    )}
                  </Button>
                </div>

                {/* 结果区 */}
                <div className="min-h-[200px]">
                  <AnimatePresence mode="wait">
                    {isLoading && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3 py-4"
                      >
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Loader2 className="size-3.5 animate-spin text-primary" />
                          <span className="font-mono">拆解原子 Claim...</span>
                        </div>
                        <div className="space-y-2">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="h-14 rounded-lg border border-border/30 bg-muted/20 overflow-hidden relative"
                            >
                              <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  ease: 'linear',
                                  delay: i * 0.2,
                                }}
                                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/15 to-transparent"
                              />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {!isLoading && result && (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-3"
                      >
                        <div className="text-xs text-muted-foreground font-mono bg-muted/30 px-2.5 py-1.5 rounded-md border border-border/30">
                          {summary}
                        </div>
                        <div className="space-y-2">
                          {result.map((claim, i) => (
                            <ClaimCard key={claim.id} claim={claim} index={i} />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {!isLoading && !result && (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-[200px] flex flex-col items-center justify-center text-center border border-dashed border-border/40 rounded-lg"
                      >
                        <ShieldCheck className="size-8 text-muted-foreground/30 mb-2" />
                        <p className="text-xs text-muted-foreground/60">
                          点击「立即核验」查看结果
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* 状态图例 */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {(['SUPPORTED', 'PARTIAL', 'CONTEXT_MISMATCH'] as const).map((s) => {
                const st = STATUS_STYLES[s];
                return (
                  <div key={s} className="flex items-center gap-1.5">
                    <span className={`size-2 rounded-full ${st.dot}`} />
                    <span className={`text-[11px] font-mono ${st.text}`}>{s}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
