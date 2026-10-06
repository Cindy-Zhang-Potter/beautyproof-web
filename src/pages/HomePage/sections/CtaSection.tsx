import { motion } from 'framer-motion';
import { NavLink } from '@lark-apaas/client-toolkit-lite';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CtaSection() {
  return (
    <section id="cta" className="w-full py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card/50 to-primary/10 backdrop-blur-sm p-10 md:p-16 text-center overflow-hidden"
        >
          {/* 背景装饰 */}
          <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
              <Sparkles className="size-3.5" />
              随时准备好核验
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              粘贴一段种草文案，
              <br />
              看它到底<span className="text-primary">站不站得住脚</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              不判真假，只回答证据。每条 Claim 都附规则编号、数值对比、
              消费者友好解释——你可以直接转发给群里，也可以投喂给你的 AI 购物助手。
            </p>

            <div className="pt-4">
              <NavLink to="#hero">
                <Button size="lg" className="font-medium gap-2 h-12 px-8 text-base">
                  <ShieldCheck className="size-5" />
                  前往核验台
                  <ArrowRight className="size-4" />
                </Button>
              </NavLink>
            </div>

            <div className="pt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground/70 font-mono">
              <span>✓ 无需登录</span>
              <span>✓ 规则可审计</span>
              <span>✓ 15 条确定性契约</span>
              <span>✓ 6 个官方证据包</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
