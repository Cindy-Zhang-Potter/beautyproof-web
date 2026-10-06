import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Gauge,
  FileText,
  BookmarkCheck,
} from 'lucide-react';
import { MOCK_CAPABILITIES } from '@/data/capabilities';
import { MOCK_DISTORTIONS } from '@/data/distortions';

const HIGHLIGHTS = [
  { icon: Gauge, value: '15', label: '条确定性契约规则' },
  { icon: BookmarkCheck, value: '6', label: '个官方证据包' },
  { icon: ShieldCheck, value: '62/62', label: '挑战集命中' },
  { icon: FileText, value: '100%', label: '可解释证据案卷' },
];

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative w-full pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-100/40 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary/90 text-xs font-medium tracking-wide">
                <Sparkles className="size-3.5" strokeWidth={2} />
                2026 欧莱雅黑客松 · 赛题 2
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.15] tracking-tight">
                种草文案，
                <br />
                <span className="text-primary italic">凭什么</span>值得信？
              </h1>

              <p className="text-base md:text-lg text-foreground/60 leading-relaxed max-w-lg">
                BeautyProof 把一段美妆文案拆成原子 Claim，逐条对照品牌官方公开证据，
                用确定性契约规则找出失真——不判真假，只回答证据站不站得住脚。
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/verify">
                  <Button
                    size="lg"
                    className="font-medium tracking-wide h-12 px-7 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    立即核验
                    <ArrowRight className="size-4 ml-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-medium tracking-wide h-12 px-7 border-border/80 hover:border-primary/40 hover:text-primary transition-all duration-300"
                  >
                    了解更多
                  </Button>
                </Link>
              </div>

              {/* 亮点数据 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border/50">
                {HIGHLIGHTS.map((h, i) => {
                  const Icon = h.icon;
                  return (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="size-4 text-primary" strokeWidth={1.5} />
                        <span className="font-serif text-2xl font-semibold text-foreground tabular-nums">
                          {h.value}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/50">{h.label}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Hero 产品图 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-[4/5] max-w-md mx-auto rounded-[2rem] overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200/50 shadow-2xl shadow-primary/5">
                <Image
                  src="/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyoqdqmigu_ve_miaoda"
                  alt="高级护肤品"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 装饰卡片 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-lg shadow-primary/10 border border-border/50 p-4 max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono font-medium text-emerald-600">
                    SUPPORTED
                  </span>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  产品名称与官方证据包一致
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -right-2 bottom-1/4 bg-white rounded-xl shadow-lg shadow-rose-500/10 border border-border/50 p-4 max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-2 rounded-full bg-rose-500" />
                  <span className="text-[10px] font-mono font-medium text-rose-500">
                    CONTEXT_MISMATCH
                  </span>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  官方 12 周 32%，被压缩为 7 天 48%
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 核心能力 */}
      <section className="w-full py-24 md:py-32 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-primary font-serif text-sm italic mb-3 tracking-wide">
              Core Capabilities
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
              三层确定性，一句话到证据链
            </h2>
            <p className="text-foreground/60 text-base leading-relaxed">
              从一段自然语言文案，到逐条可追溯的证据案卷——
              中间没有黑箱，只有规则。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl bg-white border border-border/60 p-8 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500"
              >
                <div className="space-y-5">
                  <div className="size-14 rounded-2xl bg-primary/8 border border-primary/15 flex items-center justify-center text-2xl">
                    {cap.icon}
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-mono text-primary/70 tracking-wider">
                      {cap.englishName}
                    </div>
                    <h3 className="font-serif text-xl font-medium text-foreground">
                      {cap.title}
                    </h3>
                  </div>

                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="absolute top-7 right-7 font-serif text-5xl font-medium text-foreground/5 leading-none">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 失真类型概览 */}
      <section className="w-full py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="text-amber-600 font-serif text-sm italic mb-3 tracking-wide">
              Distortion Patterns
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-4">
              他们是怎么<span className="text-amber-600 italic">偷换</span>你的信任的
            </h2>
            <p className="text-foreground/60 text-base leading-relaxed">
              十种最常见的美妆文案失真手法——从时间压缩到跨研究拼接，
              每一种都对应一条确定性契约规则。
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {MOCK_DISTORTIONS.slice(0, 10).map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -3, transition: { duration: 0.25 } }}
                className="group flex flex-col items-center text-center gap-2.5 p-5 rounded-xl bg-white border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <div className="text-2xl">{d.emoji}</div>
                <div className="text-sm font-medium text-foreground">
                  {d.name}
                </div>
                <div className="text-xs text-foreground/50 leading-relaxed">
                  {d.description}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/about">
              <Button variant="outline" className="font-medium border-border/80 hover:border-primary/40 hover:text-primary">
                查看全部失真类型与案例
                <ArrowRight className="size-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 md:py-32 bg-gradient-to-b from-background to-primary/[0.04]">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="text-primary font-serif text-sm italic tracking-wide">
              Ready to Verify
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-foreground leading-tight tracking-tight">
              粘贴一段种草文案，
              <br />
              看它到底<span className="text-primary italic">站不站得住脚</span>
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
              不判真假，只回答证据。每条 Claim 都附规则编号、数值对比、
              消费者友好解释。
            </p>
            <Link to="/verify">
              <Button
                size="lg"
                className="font-medium tracking-wide h-14 px-10 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-500"
              >
                前往核验台
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
