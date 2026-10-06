import { motion } from 'framer-motion';
import { Database, FlaskConical, BadgeCheck } from 'lucide-react';
import { MOCK_EVIDENCE_PACKS } from '@/data/evidencepacks';

export default function EvidencePacksSection() {
  return (
    <section
      id="evidence"
      className="w-full py-20 md:py-28 bg-gradient-to-b from-background via-card/20 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs font-medium mb-3 tracking-wider">
            <Database className="size-3.5" />
            EVIDENCE PACKS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            只认<span className="text-emerald-400">官方公开证据</span>
          </h2>
          <p className="text-muted-foreground text-base">
            所有核验对照的唯一依据，是品牌官方公开发布的产品说明、临床研究和注册信息。
            不采信自媒体、不采信二手转述、不采信"据说"。
          </p>
        </motion.div>

        {/* 证据包卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_EVIDENCE_PACKS.map((pack, i) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-5 hover:border-emerald-500/30 hover:bg-card/70 transition-all duration-300 overflow-hidden"
            >
              {/* 状态标签 */}
              <div className="absolute top-4 right-4">
                {pack.status === 'active' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <span className="size-1.5 rounded-full bg-amber-400" />
                    BETA
                  </span>
                )}
              </div>

              <div className="flex items-start gap-3">
                <div className="size-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  {pack.brand === 'Dior' ||
                  pack.brand === "L'Oréal Paris" ||
                  pack.brand === 'Estée Lauder' ||
                  pack.brand === 'Shiseido' ? (
                    <FlaskConical className="size-5 text-emerald-400" />
                  ) : (
                    <BadgeCheck className="size-5 text-emerald-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-foreground truncate">
                    {pack.brand}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {pack.productLine}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-lg font-bold text-foreground tabular-nums">
                    {pack.evidenceCount}
                  </span>
                  <span className="text-xs text-muted-foreground">条证据</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground/60">
                  v1.0
                </span>
              </div>

              {/* hover 发光效果 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 接入说明 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted-foreground">
            证据包按品牌标准化接入，支持版本追踪。欢迎品牌方提交官方证据 →
          </p>
        </motion.div>
      </div>
    </section>
  );
}
