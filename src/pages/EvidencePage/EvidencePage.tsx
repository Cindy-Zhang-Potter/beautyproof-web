import { motion } from 'framer-motion';
import { BookOpen, FileCheck, Clock, FlaskConical, Award } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MOCK_EVIDENCE_PACKS } from '@/data/evidencepacks';

// 品牌产品图（按 evidence pack id 映射，1=dior, 2=estee, ...）
const BRAND_IMAGES: Record<string, string> = {
  '1': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyowrgqyjs_ve_miaoda',
  '2': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyoz2efoau_ve_miaoda',
  '3': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyoogcmucu_ve_miaoda',
  '4': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyomixp6as_ve_miaoda',
  '5': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyoope6sbu_ve_miaoda',
  '6': '/spark/app/app_17ffhymctfv/runtime/api/v1/storage/object/bucket_aadkypjvvaqqw_static/static%2Faadkyoitzx4lw_ve_miaoda',
};

const PACK_FEATURES = [
  { icon: FileCheck, label: '官方声称库', desc: '品牌公开声称的结构化记录' },
  { icon: Clock, label: '临床研究', desc: '样本量、周期、应答率完整数据' },
  { icon: FlaskConical, label: '体外研究', desc: 'in-vitro 实验与成分证据' },
  { icon: Award, label: '专家背书', desc: '皮肤科医生与专业机构认证' },
];

export default function EvidencePage() {
  return (
    <div className="w-full pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary/90 text-xs font-medium tracking-wide mb-5">
            <BookOpen className="size-3.5" strokeWidth={2} />
            Evidence Library
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-medium text-foreground tracking-tight mb-4">
            证据库
          </h1>
          <p className="text-foreground/60 text-base max-w-xl mx-auto leading-relaxed">
            只认官方公开证据。每一个品牌证据包均来自品牌官网产品页、
            官方研究报告与公开临床数据——绝不脑补、绝不臆测。
          </p>
        </motion.div>

        {/* 统计条 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { value: '6', label: '品牌证据包' },
            { value: '128', label: '条官方声称' },
            { value: '47', label: '项临床研究' },
            { value: '100%', label: '公开来源可追溯' },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white border border-border/60 rounded-xl p-5 text-center"
            >
              <div className="font-serif text-2xl md:text-3xl font-semibold text-foreground tabular-nums mb-1">
                {s.value}
              </div>
              <div className="text-xs text-foreground/50">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* 证据包卡片 */}
        <div className="space-y-6">
          {MOCK_EVIDENCE_PACKS.map((pack, i) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.25 } }}
              className="group bg-white border border-border/60 rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* 图片区 */}
                <div className="md:col-span-4 bg-gradient-to-br from-stone-50 via-stone-100/60 to-stone-50 p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-[10px] font-mono text-foreground/30 tracking-wider">
                    EP-0{i + 1}
                  </div>
                  {BRAND_IMAGES[pack.id] && (
                    <Image
                      src={BRAND_IMAGES[pack.id]}
                      alt={pack.brand}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                {/* 信息区 */}
                <div className="md:col-span-8 p-6 md:p-7 space-y-5">
                  <div>
                    <div className="text-xs font-mono text-foreground/40 uppercase tracking-wider mb-1">
                      {pack.brand}
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-2">
                      {pack.productLine}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      来自 {pack.fullName} 的官方公开证据，涵盖核心功效声称、临床研究数据、
                      成分作用机制与专家背书，所有条目均可追溯至品牌官网。
                    </p>
                  </div>

                  {/* 数据点 */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <div className="font-serif text-lg font-semibold text-foreground tabular-nums">
                        {pack.evidenceCount}
                      </div>
                      <div className="text-[10px] text-foreground/50">证据条目</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <div className="font-serif text-lg font-semibold text-foreground tabular-nums">
                        {Math.floor(pack.evidenceCount * 0.6)}
                      </div>
                      <div className="text-[10px] text-foreground/50">临床研究</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <div className="font-serif text-lg font-semibold text-foreground tabular-nums">
                        {pack.evidenceCount * 30}+
                      </div>
                      <div className="text-[10px] text-foreground/50">受试者</div>
                    </div>
                  </div>

                  {/* 证据类型 */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {PACK_FEATURES.map((f) => {
                      const Icon = f.icon;
                      return (
                        <div
                          key={f.label}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 text-xs text-primary/80"
                        >
                          <Icon className="size-3" strokeWidth={1.5} />
                          {f.label}
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Link to="/verify">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-medium border-border/70 hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        用此包核验
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 来源说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-2xl bg-card/60 border border-border/50 p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="size-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="size-5 text-primary" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-medium text-foreground">
                证据来源声明
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                BeautyProof 所有证据包数据均来自各品牌官方公开渠道，包括但不限于：
                品牌官网产品详情页、官方临床研究报告、公开出版的学术论文、
                监管机构备案信息。我们不对原始证据做任何修改或演绎，
                仅做结构化整理，确保核验过程可追溯、可复核。
              </p>
              <p className="text-xs text-foreground/40 font-serif italic">
                如有品牌方希望接入或更新证据包，请联系我们。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
