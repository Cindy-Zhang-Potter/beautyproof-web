import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MOCK_PIPELINE_STEPS, MOCK_PIPELINE_STATS } from '@/data/pipeline';

export default function PipelineSection() {
  return (
    <section id="pipeline" className="w-full py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-block text-primary font-mono text-xs font-medium mb-3 tracking-wider">
            BETA ENGINE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            四步流水线，从文案到证据案卷
          </h2>
          <p className="text-muted-foreground text-base">
            Break → Evidence → Triangulate → Applicability。
            每一步输出可独立核验，整条链路可复现、可审计。
          </p>
        </motion.div>

        {/* 步骤图 */}
        <div className="relative mb-16">
          {/* 连线 (桌面端) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {MOCK_PIPELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* 步骤圆 */}
                <div className="relative z-10 size-20 rounded-full bg-card border border-border/60 flex items-center justify-center text-3xl mb-4 shadow-lg shadow-primary/5">
                  {step.icon}
                  {/* 步骤编号 */}
                  <div className="absolute -top-1 -right-1 size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center font-mono">
                    {i + 1}
                  </div>
                </div>

                <div className="font-mono text-primary text-sm font-semibold mb-1 tracking-wider">
                  {step.nameEn.toUpperCase()}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.nameZh}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
                  {step.description}
                </p>

                {/* 箭头 (桌面端, 除了最后一个) */}
                {i < MOCK_PIPELINE_STEPS.length - 1 && (
                  <div className="hidden md:flex absolute top-9 -right-2 z-0">
                    <ArrowRight className="size-4 text-primary/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 数据统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_PIPELINE_STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-7 overflow-hidden group hover:border-primary/30 transition-colors"
            >
              {/* 装饰角 */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-primary/20 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-primary/20 rounded-br-xl" />

              <div className="font-mono text-3xl md:text-4xl font-black text-foreground tracking-tight mb-2 tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground leading-snug">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
