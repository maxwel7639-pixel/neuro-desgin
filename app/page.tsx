"use client"

import { motion } from "framer-motion"
import { MessageCircle, Zap, Award, TrendingUp, Users, Lightbulb, Target, Sparkles, ArrowRight, Check } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/5551991580526"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

export default function NeuroDesignShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm shadow-sm"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
          <motion.div 
            className="text-xl md:text-2xl font-extrabold text-orange leading-tight"
            whileHover={{ scale: 1.05 }}
          >
            Neuro-<br className="md:hidden" />Design
          </motion.div>
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green text-white px-4 md:px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-green/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Conversar no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative px-5 pt-12 pb-8 md:pt-20 md:pb-12 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-architecture.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>
        
        <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-navy leading-tight mb-4"
          >
            Sua Neuroarquitetura Merece Ser{" "}
            <span className="text-orange">Autoridade Global</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-base md:text-lg text-foreground leading-relaxed mb-8 max-w-2xl"
          >
            Transformamos projetos excepcionais em infograficos de elite que comunicam a ciencia por tras do design e elevam seu posicionamento de mercado.
          </motion.p>
          
          <motion.a
            variants={fadeInUp}
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green text-white px-7 py-4 rounded-full font-bold text-base md:text-lg hover:bg-green/90 transition-all group"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(46, 158, 107, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Comecar Agora 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-yellow-bg rounded-3xl p-6 md:p-8 mt-12 md:mt-16"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Award, title: "Autoridade Cientifica", desc: "Comunique o impacto real da Neuroarquitetura nos seus projetos" },
              { icon: Sparkles, title: "Design de Elite", desc: "Infograficos sofisticados que elevam o valor percebido" },
              { icon: TrendingUp, title: "Engajamento 5x", desc: "Conteudo altamente compartilhavel que atrai clientes qualificados" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="flex gap-4 items-start"
              >
                <motion.div 
                  className="text-orange flex-shrink-0 mt-1"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <feature.icon className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-navy mb-1">{feature.title}</h3>
                  <p className="text-sm text-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </section>

      {/* Problema Section */}
      <section className="relative bg-navy py-12 md:py-20 px-5 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/images/luxury-interior.jpg')" }}
        />
        <div className="relative max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl md:text-4xl font-black text-white text-center mb-8 md:mb-12"
          >
            O Problema Silencioso
          </motion.h2>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-4 md:grid-cols-3"
          >
            {[
              { title: "Projetos Excepcionais", desc: "Seu trabalho em Neuroarquitetura e revolucionario, moldando espacos que impactam o bem-estar.", icon: Lightbulb },
              { title: "Visibilidade Comum", desc: "Em um cenario digital saturado, ate os projetos mais inovadores se perdem em feeds genericos.", icon: Users },
              { title: "Falta de Narrativa", desc: "Imagens de alta qualidade sao essenciais, mas a ciencia por tras delas e o que realmente engaja.", icon: Target }
            ].map((card, index) => (
              <motion.div 
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-navy-light rounded-2xl p-6 border border-white/10"
              >
                <motion.div 
                  className="text-orange mb-3"
                  initial={{ rotate: -10 }}
                  whileInView={{ rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <card.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-amber-400 font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solucao Section */}
      <section className="py-12 md:py-20 px-5 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl md:text-4xl font-black text-navy text-center mb-8 md:mb-12"
          >
            A Solucao: Neuro-Design Showcase
          </motion.h2>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-yellow-bg rounded-3xl p-6 md:p-10"
          >
            <h3 className="text-xl md:text-2xl font-extrabold text-navy mb-4">O que e?</h3>
            <p className="text-foreground leading-relaxed mb-6 max-w-3xl">
              Uma curadoria e representacao visual estrategica dos seus projetos, destacando os principios neuroarquitetonicos aplicados e seus resultados tangiveis.
            </p>
            
            <motion.ul 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3 mb-8"
            >
              {[
                "Infograficos que traduzem ciencia em autoridade",
                "Narrativa visual que educa seu publico",
                "Posicionamento como referencia global",
                "Aumento de engajamento e valor percebido"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <span className="bg-green text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </span>
                  <span className="text-foreground text-sm md:text-base">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div 
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-background rounded-2xl p-6 shadow-lg border border-border"
            >
              <h3 className="text-lg md:text-xl font-extrabold text-navy mb-3">Nosso Objetivo</h3>
              <p className="text-foreground leading-relaxed">
                Posicionar voce como uma <span className="text-orange font-semibold">lider de pensamento</span> e referencia global em Neuroarquitetura, atraindo reconhecimento, clientes de alto valor e novas oportunidades de negocio.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comparativo Section */}
      <section className="py-12 md:py-20 px-5 bg-cream">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl md:text-4xl font-black text-navy text-center mb-8 md:mb-12"
          >
            Do Projeto a Narrativa de Bem-Estar
          </motion.h2>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="overflow-x-auto rounded-2xl shadow-lg"
          >
            <table className="w-full bg-background min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="p-4 text-left text-navy font-bold text-sm">Elemento</th>
                  <th className="p-4 text-left text-muted-foreground font-bold text-sm">Abordagem Tradicional</th>
                  <th className="p-4 text-left text-orange font-bold text-sm">Neuro-Design Showcase</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { 
                    element: "Iluminacao", 
                    traditional: "Luz natural para o ambiente", 
                    neuro: "Aumento de 30% na produtividade e reducao do estresse atraves da otimizacao da luz circadiana" 
                  },
                  { 
                    element: "Cores", 
                    traditional: "Tons neutros e elegantes", 
                    neuro: "Paleta que estimula criatividade e calma, baseada em estudos de psicologia ambiental" 
                  },
                  { 
                    element: "Layout", 
                    traditional: "Espaco otimizado", 
                    neuro: "Fluxo intuitivo que minimiza fadiga cognitiva e promove colaboracao" 
                  }
                ].map((row, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 text-orange font-bold text-sm">{row.element}</td>
                    <td className="p-4 text-muted-foreground text-sm">{row.traditional}</td>
                    <td className="p-4 text-navy font-semibold text-sm">{row.neuro}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Impacto Section */}
      <section className="py-12 md:py-20 px-5 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-2xl md:text-4xl font-black text-navy text-center mb-8 md:mb-12"
          >
            O Impacto: Autoridade Global e Valor Percebido
          </motion.h2>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: Award, title: "Reconhecimento", desc: "Posicionamento como uma das principais vozes em Neuroarquitetura no cenario global." },
              { icon: TrendingUp, title: "Engajamento", desc: "Conteudo altamente compartilhavel que gera discussoes e atrai publico qualificado." },
              { icon: Sparkles, title: "Diferenciacao", desc: "Destaque-se da concorrencia com comunicacao que une estetica e ciencia." },
              { icon: Target, title: "Oportunidades", desc: "Atracao de projetos de alto valor, parcerias estrategicas e convites para palestras." }
            ].map((card, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                className="bg-muted rounded-2xl p-5 transition-all"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="text-orange mb-3"
                >
                  <card.icon className="w-7 h-7" />
                </motion.div>
                <h3 className="font-bold text-navy mb-2">{card.title}</h3>
                <p className="text-sm text-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative bg-orange py-14 md:py-20 px-5 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: "url('/images/premium-space.jpg')" }}
        />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative max-w-3xl mx-auto text-center"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4"
          >
            Pronto para Transformar Sua Visao em Realidade?
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-white/90 text-base md:text-lg mb-8 max-w-xl mx-auto"
          >
            Vamos iniciar uma conversa estrategica para selecionar seus primeiros projetos e definir o cronograma de implementacao.
          </motion.p>
          
          <motion.a
            variants={fadeInUp}
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-orange px-8 py-4 rounded-full font-extrabold text-base md:text-lg hover:bg-white/95 transition-all group shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5" />
            Agendar Conversa no WhatsApp
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-6 px-5">
        <p className="text-center text-white/50 text-sm">
          &copy; 2026 Neuro-Design Showcase. Elevando a Neuroarquitetura ao Proximo Nivel.
        </p>
      </footer>
    </div>
  )
}
