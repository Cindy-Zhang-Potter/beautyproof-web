import { motion } from 'framer-motion';
import { BookOpen, FileCheck, Clock, Users, BarChart3 } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MOCK_EVIDENCE_PACKS } from '@/data/evidencepacks';
import { MOCK_DISTORTIONS } from '@/data/distortions';
import { MOCK_PIPELINE_STATS } from '@/data/pipeline';

// 品牌产品图（按 evidence pack id 映射）
const BRAND_IMAGES: Record<string, string> = {
  '1': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyowrgqyjs_ve_miaoda',
  '2': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyoz2efoau_ve_miaoda',
  '3': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyoogcmucu_ve_miaoda',
  '4': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyomixp6as_ve_miaoda',
  '5': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyoope6sbu_ve_miaoda',
  '6': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyoitzx4lw_ve_miaoda',
};

const RULE_CODE_MAP: Record<string, string> = {
  '1': 'R001',
  '2': 'R002',
  '3': 'R004',
  '4': 'R005',
  '5': 'R006',
  '6': 'R007',
  '7': 'R011',
  '8': 'R013',
  '9': 'R014',
  '10': 'R015',
};

const BENCHMARK_STATS = [
  { icon: BarChart3, value: '62/62', label: '挑战集 final_state 命中', sub: '100%' },
  { icon: FileCheck, value: '55/62', label: 'reason_code 命中', sub: '88.7%' },
  { icon: Clock, value: '15', label: '条确定性契约规则', sub: 'R001 – R015' },
  { icon: Users, value: '6', label: '个官方证据包', sub: '持续扩充中' },
];

const TECH_STACK = [
  {
    title: 'Beauty Claim Compiler',
    desc: '基于 LLM 的原子化拆解器，将自然语言文案拆分为功效、数值、时间、人群、背书等 11 类 Claim，保留原文 span 与位置。',
  },
  {
    title: 'E7 Context Engine',
    desc: '确定性规则引擎，15 条契约规则（R001–R015）覆盖时间压缩、幅度通胀、应答率偷换、证据越级、跨研究拼接等核心失真类型。',
  },
  {
    title: 'Evidence Case Generator',
    desc: '生成可解释证据案卷，包含触发规则、双方数值对比、消费者友好解释，可直接投喂给 AI 购物助手或审核系统。',
  },
];

export default function AboutPage() {
  return (
    <div className="w-full pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-primary font-serif text-sm italic mb-3 tracking-wide">
            About BeautyProof
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-5">
            关于 BeautyProof
          </h1>
          <p className="text-foreground/60 text-base max-w-xl mx-auto leading-relaxed">
            2026 欧莱雅第二届美妆科技黑客松 · 赛题 2「信任守护师」参赛作品。
            让每一句种草文案，都经得起证据的追问。
          </p>
        </motion.div>

        {/* 项目介绍 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="sticky top-28">
                <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
                  01 · Project
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-2 mb-3">
                  我们在做什么
                </h2>
              </div>
            </div>
            <div className="md:col-span-3 space-y-5 text-foreground/70 leading-relaxed">
              <p>
                BeautyProof 是一套<strong className="text-foreground font-medium">美妆事实可信基础设施</strong>。
                它的核心信念是：消费者不应该在算法推荐与内容创作的洪流中，
                被经过精心包装的营销话术悄悄改变对"有效"的判断标准。
              </p>
              <p>
                我们不判"真假"。因为美妆功效的成立与否，从来不是二元判断——
                它依赖时间、人群、产品组合、研究方法、证据层级等一整套上下文。
                脱离上下文的数字，没有任何意义。
              </p>
              <p>
                所以 BeautyProof 做的事情，是把一段自然语言种草文案
                <em className="text-primary font-serif">拆成原子 Claim</em>，
                逐条与品牌官方公开证据做<strong className="text-foreground">上下文对照</strong>，
                用确定性规则引擎找出失真点，输出可解释的 Evidence Case。
              </p>
              <p className="text-sm text-foreground/50 font-serif italic border-l-2 border-primary/30 pl-4 py-1">
                "Truth in beauty, proof in words."
                <br />
                美可以主观，证据必须客观。
              </p>
            </div>
          </div>
        </motion.section>

        {/* 技术架构 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="sticky top-28">
                <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
                  02 · Architecture
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-2 mb-3">
                  技术架构
                </h2>
              </div>
            </div>
            <div className="md:col-span-3 space-y-4">
              {TECH_STACK.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 4, transition: { duration: 0.25 } }}
                  className="group bg-white border border-border/60 rounded-xl p-5 hover:border-primary/25 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="font-serif text-lg font-medium text-foreground mb-2 flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Benchmark 数据 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
              03 · Benchmark
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-2">
              挑战集评测数据
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BENCHMARK_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="bg-white border border-border/60 rounded-xl p-5 text-center hover:border-primary/25 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-center mb-3">
                    <div className="size-10 rounded-full bg-primary/8 flex items-center justify-center">
                      <Icon
                        className="size-5 text-primary"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  <div className="font-serif text-3xl font-semibold text-foreground tabular-nums mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-foreground/60 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-[10px] font-mono text-primary/70">
                    {stat.sub}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* 失真类型完整列表 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-amber-600/70 tracking-widest uppercase">
              04 · Distortion Patterns
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-2">
              十种常见失真类型
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MOCK_DISTORTIONS.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-start gap-4 bg-white border border-border/60 rounded-xl p-4.5 hover:border-amber-200/70 hover:bg-amber-50/20 transition-all duration-300 p-4"
              >
                <div className="size-10 shrink-0 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-lg">
                  {d.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-foreground">
                      {d.name}
                    </span>
                    <span className="text-[10px] font-mono text-amber-600/80 bg-amber-50 px-1.5 py-0.5 rounded">
                      {RULE_CODE_MAP[d.id] || 'R000'}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    {d.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 证据包一览 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
              05 · Evidence Packs
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mt-2 mb-3">
              已接入证据包
            </h2>
            <p className="text-sm text-foreground/50 max-w-md mx-auto">
              六个品牌的官方公开证据包，所有数据均来自品牌官网公开的产品页面与研究报告。
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MOCK_EVIDENCE_PACKS.map((pack, i) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group bg-white border border-border/60 rounded-xl overflow-hidden hover:border-primary/25 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden relative">
                  {BRAND_IMAGES[pack.id] && (
                    <Image
                      src={BRAND_IMAGES[pack.id]}
                      alt={pack.brand}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-4 space-y-1.5">
                    <div className="text-[10px] font-mono text-foreground/40 uppercase tracking-wider">
                      {pack.brand}
                    </div>
                    <div className="font-serif text-base font-medium text-foreground truncate">
                      {pack.productLine}
                    </div>
                    <div className="text-xs text-foreground/50 truncate">
                      {pack.evidenceCount} 条官方声称数据
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center py-12 border-t border-border/40"
        >
          <p className="font-serif text-xl text-foreground/70 mb-5">
            想亲自试试 BeautyProof？
          </p>
          <Link to="/verify">
            <Button
              size="lg"
              className="font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
            >
              <BookOpen className="size-4 mr-2" />
              前往核验台
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
