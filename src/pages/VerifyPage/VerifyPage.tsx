import { useState, useCallback, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { capabilityClient, logger } from '@lark-apaas/client-toolkit-lite';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Loader2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Play,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import {
  MOCK_DEMO_SAMPLE_TEXT,
  MOCK_DEMO_RESULT,
  type IDemoClaim,
} from '@/data/demo';
import { MOCK_EVIDENCE_PACKS } from '@/data/evidencepacks';

const PARSER_PLUGIN_ID = 'beauty_claim_parser_1';
const EXPLAINER_PLUGIN_ID = 'evidence_explainer_case_generator_1';

const STATUS_STYLES: Record<
  IDemoClaim['status'],
  { label: string; dot: string; text: string; bg: string; border: string; icon: typeof CheckCircle2 }
> = {
  SUPPORTED: {
    label: 'SUPPORTED',
    dot: 'bg-emerald-500',
    text: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: CheckCircle2,
  },
  PARTIAL: {
    label: 'PARTIAL',
    dot: 'bg-amber-500',
    text: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: AlertTriangle,
  },
  CONTEXT_MISMATCH: {
    label: 'CONTEXT_MISMATCH',
    dot: 'bg-rose-500',
    text: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
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
      transition={{ duration: 0.5, delay: 0.1 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-xl border-l-4 ${style.border} ${style.bg} pl-5 pr-4 py-4 space-y-2`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <Icon className={`size-4 shrink-0 ${style.text}`} strokeWidth={2} />
          <span className="text-sm font-medium text-foreground/90 truncate">
            「{claim.text}」
          </span>
        </div>
        <span
          className={`shrink-0 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text} border ${style.border} tracking-wide`}
        >
          {style.label}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span className="text-foreground/50">{claim.category}</span>
        {claim.ruleCode && (
          <>
            <span className="text-border">·</span>
            <span className="font-mono text-primary font-medium">
              {claim.ruleCode}
            </span>
          </>
        )}
      </div>
      <p className="text-xs text-foreground/60 leading-relaxed">
        {claim.explanation}
      </p>
    </motion.div>
  );
}

function VerifyPage() {
  const [inputText, setInputText] = useState(MOCK_DEMO_SAMPLE_TEXT);
  const [selectedPack, setSelectedPack] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IDemoClaim[] | null>(null);
  const [summary, setSummary] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const runMockDemo = useCallback(() => {
    setIsLoading(true);
    setResult(null);
    setSummary('');

    const timer = setTimeout(() => {
      setResult(MOCK_DEMO_RESULT.claims);
      setSummary(MOCK_DEMO_RESULT.summary);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleVerify = useCallback(async () => {
    if (!inputText.trim()) {
      toast.warning('请输入一段种草文案');
      return;
    }
    // 演示模式
    runMockDemo();
  }, [inputText, runMockDemo]);

  const supported = result?.filter((c) => c.status === 'SUPPORTED').length ?? 0;
  const partial = result?.filter((c) => c.status === 'PARTIAL').length ?? 0;
  const mismatch = result?.filter((c) => c.status === 'CONTEXT_MISMATCH').length ?? 0;

  return (
    <div className="w-full pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary/90 text-xs font-medium tracking-wide mb-5">
            <Sparkles className="size-3.5" strokeWidth={2} />
            Evidence Verifier
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-4">
            核验台
          </h1>
          <p className="text-foreground/60 text-base max-w-xl mx-auto leading-relaxed">
            粘贴一段美妆种草文案，选择对应的品牌证据包，
            让 BeautyProof 逐条对照官方证据，输出可解释的 Evidence Case。
          </p>
        </motion.div>

        {/* 主工作区 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 左侧输入区 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="rounded-2xl bg-white border border-border/60 p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-primary" strokeWidth={1.5} />
                <h2 className="font-serif text-lg font-medium text-foreground">
                  输入文案
                </h2>
              </div>

              {/* 产品选择 */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground/70">
                  选择证据包
                </label>
                <Select value={selectedPack} onValueChange={setSelectedPack}>
                  <SelectTrigger className="h-11 bg-background/50 border-border/70">
                    <SelectValue placeholder="选择品牌证据包" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部证据包（自动匹配）</SelectItem>
                    {MOCK_EVIDENCE_PACKS.map((pack) => (
                      <SelectItem key={pack.id} value={pack.id}>
                        {pack.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 输入框 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground/70">
                    种草文案
                  </label>
                  <span className="text-[10px] text-foreground/40 font-mono">
                    {inputText.length} chars
                  </span>
                </div>
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  placeholder="粘贴一段美妆种草文案，例如：「欧莱雅RevitaLift，皮肤科医生实测，7天淡纹48%，敏感肌闭眼入。」"
                  className="w-full resize-none rounded-xl border border-border/70 bg-background/40 px-4 py-3.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/40 transition-all font-serif leading-relaxed"
                />
              </div>

              <Button
                onClick={handleVerify}
                disabled={isLoading || !inputText.trim()}
                className="w-full h-12 font-medium tracking-wide bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    正在核验证据链...
                  </>
                ) : (
                  <>
                    <Play className="size-4 mr-1.5" fill="currentColor" />
                    立即核验
                  </>
                )}
              </Button>

              {/* 快速示例 */}
              <div className="space-y-2 pt-2 border-t border-border/40">
                <p className="text-xs text-foreground/50">试试这些：</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    '7天淡纹48%',
                    '543名女性临床证实',
                    '敏感肌闭眼入',
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => setInputText(`欧莱雅RevitaLift，${t}。`)}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted/60 text-foreground/60 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 状态图例 */}
            <div className="rounded-xl bg-white border border-border/60 p-5">
              <h3 className="text-xs font-semibold text-foreground/60 tracking-wide uppercase mb-3">
                状态说明
              </h3>
              <div className="space-y-2.5">
                {(['SUPPORTED', 'PARTIAL', 'CONTEXT_MISMATCH'] as const).map(
                  (s) => {
                    const st = STATUS_STYLES[s];
                    const desc = {
                      SUPPORTED: '官方证据完全支持该声称',
                      PARTIAL: '部分内容有依据，但存在偏差',
                      CONTEXT_MISMATCH: '与证据上下文不符，存在失真',
                    }[s];
                    return (
                      <div
                        key={s}
                        className="flex items-start gap-2.5"
                      >
                        <span
                          className={`size-2 rounded-full ${st.dot} mt-1.5 shrink-0`}
                        />
                        <div>
                          <span
                            className={`text-xs font-mono font-semibold ${st.text}`}
                          >
                            {s}
                          </span>
                          <p className="text-xs text-foreground/50 mt-0.5">
                            {desc}
                          </p>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </motion.div>

          {/* 右侧结果区 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-white border border-border/60 min-h-[500px] overflow-hidden shadow-sm">
              {/* 结果标题栏 */}
              <div className="px-6 py-4 border-b border-border/50 bg-background/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-foreground/80">
                    Evidence Case
                  </span>
                </div>
                {result && (
                  <span className="text-xs font-mono text-foreground/40">
                    BETA Engine v0.2
                  </span>
                )}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {isLoading && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="py-12 space-y-5"
                    >
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 text-sm text-foreground/50">
                          <Loader2
                            className="size-4 animate-spin text-primary"
                            strokeWidth={2}
                          />
                          <span className="font-mono">
                            正在对照官方证据包...
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-20 rounded-xl border border-border/40 bg-muted/30 overflow-hidden relative"
                          >
                            <motion.div
                              initial={{ x: '-100%' }}
                              animate={{ x: '150%' }}
                              transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: 'linear',
                                delay: i * 0.25,
                              }}
                              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {!isLoading && result && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-5"
                    >
                      {/* 汇总 */}
                      <div className="rounded-xl bg-gradient-to-r from-primary/[0.06] to-amber-50/50 border border-primary/15 p-5">
                        <p className="text-sm text-foreground/80 leading-relaxed font-serif">
                          {summary}
                        </p>
                        <div className="flex items-center gap-5 mt-3 pt-3 border-t border-primary/10">
                          <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-emerald-500" />
                            <span className="text-xs font-mono text-emerald-600 font-medium">
                              {supported}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-amber-500" />
                            <span className="text-xs font-mono text-amber-600 font-medium">
                              {partial}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-rose-500" />
                            <span className="text-xs font-mono text-rose-500 font-medium">
                              {mismatch}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Claim 列表 */}
                      <div className="space-y-3">
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
                      className="h-[420px] flex flex-col items-center justify-center text-center"
                    >
                      <div className="size-20 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                        <Image
                          src="/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyoqdqmigu_ve_miaoda"
                          alt=""
                          className="w-12 h-12 object-contain opacity-60"
                        />
                      </div>
                      <p className="font-serif text-lg text-foreground/50 mb-1">
                        等待核验
                      </p>
                      <p className="text-sm text-foreground/30 max-w-xs">
                        粘贴一段种草文案，点击「立即核验」
                        <br />
                        查看它的 Evidence Case
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default memo(VerifyPage);
