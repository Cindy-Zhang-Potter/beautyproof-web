import { motion } from 'framer-motion';
import { MOCK_CAPABILITIES } from '@/data/capabilities';

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="w-full py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-block text-primary font-mono text-xs font-medium mb-3 tracking-wider">
            CORE CAPABILITIES
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            三层确定性，一句话到证据链
          </h2>
          <p className="text-muted-foreground text-base">
            从一段自然语言文案，到逐条可追溯的证据案卷——中间没有黑箱，只有规则。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-7 hover:border-primary/40 hover:bg-card/70 transition-all duration-300 overflow-hidden"
            >
              {/* 顶部 accent 光条 */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="space-y-4">
                <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
                  {cap.icon}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-foreground">
                    {cap.title}
                  </h3>
                  <div className="text-xs font-mono text-primary/80 tracking-wide">
                    {cap.englishName}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>
              </div>

              {/* 编号 */}
              <div className="absolute top-5 right-5 text-5xl font-bold text-foreground/5 font-mono leading-none">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
