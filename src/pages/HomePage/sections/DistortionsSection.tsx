import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { MOCK_DISTORTIONS, MOCK_DISTORTION_CASES } from '@/data/distortions';

export default function DistortionsSection() {
  return (
    <section
      id="distortions"
      className="w-full py-20 md:py-28 bg-gradient-to-b from-background via-card/20 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-block text-amber-400 font-mono text-xs font-medium mb-3 tracking-wider">
            DISTORTION PATTERNS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            他们是怎么<span className="text-amber-400">偷换你的信任</span>的
          </h2>
          <p className="text-muted-foreground text-base">
            10 种最常见的美妆文案失真手法——从时间压缩到跨研究拼接，
            每一种都对应一条确定性契约规则。
          </p>
        </motion.div>

        {/* 失真标签云 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-16"
        >
          {MOCK_DISTORTIONS.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{
                y: -3,
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              className="group flex flex-col items-start gap-2 p-4 rounded-xl border border-border/50 bg-card/40 hover:border-amber-500/40 hover:bg-card/70 transition-all duration-300 cursor-default"
            >
              <div className="text-2xl">{d.emoji}</div>
              <div className="text-sm font-semibold text-foreground">
                {d.name}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {d.description}
              </div>
              <div className="text-[10px] font-mono text-amber-400/70 opacity-0 group-hover:opacity-100 transition-opacity">
                R{String(i + 1).padStart(3, '0')}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 案例表格 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="size-4 text-amber-400" />
            <h3 className="text-lg font-semibold text-foreground">
              真实案例 · 规则触发演示
            </h3>
          </div>

          <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
            {/* 表头 */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] gap-0 border-b border-border/40 bg-muted/20">
              <div className="px-4 py-3 text-xs font-semibold text-foreground/70 border-b md:border-b-0 md:border-r border-border/30">
                原文案
              </div>
              <div className="px-4 py-3 text-xs font-semibold text-foreground/70 border-b md:border-b-0 md:border-r border-border/30">
                触发规则
              </div>
              <div className="px-4 py-3 text-xs font-semibold text-foreground/70">
                实际问题
              </div>
            </div>

            {/* 行 */}
            {MOCK_DISTORTION_CASES.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] gap-0 border-b last:border-b-0 border-border/20 hover:bg-card/60 transition-colors"
              >
                <div className="px-4 py-4 border-b md:border-b-0 md:border-r border-border/20">
                  <p className="text-sm text-foreground leading-relaxed">
                    「{c.originalText}」
                  </p>
                </div>
                <div className="px-4 py-4 border-b md:border-b-0 md:border-r border-border/20 flex flex-wrap items-start gap-1.5">
                  {c.ruleCodes.map((code) => (
                    <span
                      key={code}
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    >
                      {code}
                    </span>
                  ))}
                </div>
                <div className="px-4 py-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.issueDescription}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
