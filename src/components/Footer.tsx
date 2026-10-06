import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/60 bg-card/40">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="font-serif text-xl font-medium tracking-wide text-foreground">
                BeautyProof
              </span>
            </div>
            <p className="text-sm text-foreground/60 leading-relaxed max-w-sm">
              美妆事实可信基础设施。用确定性规则引擎，对照官方公开证据，
              让每一句种草文案都经得起追问。
            </p>
            <p className="text-xs text-foreground/40 font-serif italic">
              2026 欧莱雅美妆科技黑客松 · 赛题 2 参赛作品
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-foreground/50">
              产品
            </h4>
            <ul className="space-y-2.5 text-sm text-foreground/70">
              <li className="hover:text-primary transition-colors cursor-pointer">
                核验台
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                证据库
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                契约规则
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                API 接入
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-foreground/50">
              资源
            </h4>
            <ul className="space-y-2.5 text-sm text-foreground/70">
              <li className="hover:text-primary transition-colors cursor-pointer">
                技术白皮书
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                挑战集评测报告
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                品牌接入申请
              </li>
              <li className="hover:text-primary transition-colors cursor-pointer">
                联系我们
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-foreground/40">
          <span>© 2026 BeautyProof Team. All rights reserved.</span>
          <span className="font-serif italic">Truth in beauty, proof in words.</span>
        </div>
      </div>
    </footer>
  );
}
