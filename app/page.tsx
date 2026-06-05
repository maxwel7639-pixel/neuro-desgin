"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { MessageCircle, Award, TrendingUp, Users, Lightbulb, Target, Sparkles, ArrowRight, Check, Globe, Star } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/5551991580526"

// ─── Particle ────────────────────────────────────────────────────────────────
function Particle({ left, delay, duration, size }: { left: string; delay: number; duration: number; size: number }) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full pointer-events-none"
      style={{ left, width: size, height: size, background: `rgba(210,105,30,0.25)` }}
      animate={{ y: [0, -500], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.3] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
    />
  )
}

// ─── Glow Orb ─────────────────────────────────────────────────────────────────
function GlowOrb({ color, size, style }: { color: string; size: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: color, filter: `blur(${size / 2.5}px)`, ...style }}
      animate={{ scale: [1, 1.25, 1], opacity: [0.07, 0.18, 0.07] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard3D({
  children,
  className,
  intensity = 12,
  autoWobble = false,
}: {
  children: React.ReactNode
  className?: string
  intensity?: number
  autoWobble?: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springX = useSpring(rotX, { stiffness: 180, damping: 22 })
  const springY = useSpring(rotY, { stiffness: 180, damping: 22 })

  useEffect(() => {
    if (!autoWobble) return
    let t = 0
    let rafId: number
    const tick = () => {
      t += 0.012
      rotX.set(Math.sin(t * 0.9) * 4)
      rotY.set(Math.cos(t * 0.6) * 7)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [autoWobble, rotX, rotY])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (autoWobble || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    rotY.set(((e.clientX - rect.left) / rect.width - 0.5) * intensity * 2)
    rotX.set(-((e.clientY - rect.top) / rect.height - 0.5) * intensity * 2)
  }

  const onMouseLeave = () => {
    if (autoWobble) return
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const startTime = Date.now()
        const tick = () => {
          const elapsed = Date.now() - startTime
          const p = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(eased * end))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return <span ref={ref}>{count}{suffix}</span>
}

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
}
const scaleUp = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: "backOut" } },
}

// ─── Deconstruct Background ───────────────────────────────────────────────────
const DCOLS = 10
const DROWS = 7
const DTILES = Array.from({ length: DCOLS * DROWS }, (_, i) => {
  const col = i % DCOLS
  const row = Math.floor(i / DCOLS)
  const cx = (DCOLS - 1) / 2
  const cy = (DROWS - 1) / 2
  const dx = col - cx
  const dy = row - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const maxDist = Math.sqrt(cx * cx + cy * cy)
  const normDist = dist / maxDist
  const angle = Math.atan2(dy, dx)
  const flyDist = 320 + normDist * 200
  const flyX = Math.round(Math.cos(angle) * flyDist)
  const flyY = Math.round(Math.sin(angle) * flyDist)
  const rotDir = (col + row) % 2 === 0 ? 1 : -1
  const rotate = rotDir * (12 + normDist * 32)
  const delay = (1 - normDist) * 0.55
  const bgX = DCOLS <= 1 ? 0 : (col / (DCOLS - 1)) * 100
  const bgY = DROWS <= 1 ? 0 : (row / (DROWS - 1)) * 100
  return { flyX, flyY, rotate, delay, bgX, bgY }
})

function DeconstructBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${DCOLS}, 1fr)`,
          gridTemplateRows: `repeat(${DROWS}, 1fr)`,
        }}
      >
        {DTILES.map((tile, i) => (
          <motion.div
            key={i}
            style={{
              backgroundImage: "url('/images/hero-architecture.jpg')",
              backgroundSize: `${DCOLS * 100}% ${DROWS * 100}%`,
              backgroundPosition: `${tile.bgX}% ${tile.bgY}%`,
            }}
            animate={{
              x: [0, tile.flyX, tile.flyX, 0],
              y: [0, tile.flyY, tile.flyY, 0],
              opacity: [1, 0, 0, 1],
              rotate: [0, tile.rotate, tile.rotate, 0],
              scale: [1, 0.12, 0.12, 1],
            }}
            transition={{
              duration: 10,
              delay: tile.delay,
              repeat: Infinity,
              times: [0, 0.28, 0.58, 1],
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Blueprint grid — appears when tiles are scattered */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(210,105,30,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(210,105,30,0.15) 1px, transparent 1px)
          `,
          backgroundSize: `${100 / DCOLS}% ${100 / DROWS}%`,
        }}
        animate={{ opacity: [0, 0, 0.9, 0.9, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          times: [0, 0.24, 0.38, 0.55, 0.72],
        }}
      />

      {/* Orange scan line sweeping during reconstruction */}
      <motion.div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          height: 3,
          top: 0,
          background: "linear-gradient(90deg, transparent 0%, rgba(210,105,30,0.95) 50%, transparent 100%)",
          boxShadow: "0 0 28px rgba(210,105,30,0.7), 0 0 70px rgba(210,105,30,0.3)",
        }}
        animate={{ top: ["-3px", "100%"] }}
        transition={{
          duration: 4,
          delay: 5.8,
          repeat: Infinity,
          repeatDelay: 6,
          ease: "linear",
        }}
      />
    </div>
  )
}

// ─── Rotating Cube ────────────────────────────────────────────────────────────
function RotatingCube() {
  const faces = [
    { transform: "translateZ(70px)",             bg: "rgba(210,105,30,0.14)" },
    { transform: "translateZ(-70px) rotateY(180deg)", bg: "rgba(210,105,30,0.08)" },
    { transform: "rotateY(90deg) translateZ(70px)",  bg: "rgba(46,158,107,0.12)" },
    { transform: "rotateY(-90deg) translateZ(70px)", bg: "rgba(46,158,107,0.08)" },
    { transform: "rotateX(90deg) translateZ(70px)",  bg: "rgba(210,105,30,0.10)" },
    { transform: "rotateX(-90deg) translateZ(70px)", bg: "rgba(46,158,107,0.10)" },
  ]
  return (
    <motion.div
      animate={{ rotateY: 360, rotateX: [0, 18, 0, -12, 0] }}
      transition={{
        rotateY: { duration: 14, repeat: Infinity, ease: "linear" },
        rotateX: { duration: 9, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ transformStyle: "preserve-3d", width: 140, height: 140, position: "relative" }}
    >
      {faces.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 140, height: 140,
            transform: f.transform,
            background: f.bg,
            border: "1px solid rgba(210,105,30,0.28)",
            borderRadius: 14,
            backdropFilter: "blur(6px)",
          }}
        />
      ))}
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function NeuroDesignShowcase() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -90])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.35])

  const tickerItems = [
    { v: "5x", l: "Mais Engajamento" },
    { v: "+300%", l: "Mais Alcance" },
    { v: "100+", l: "Projetos Elite" },
    { v: "Top 1%", l: "Posicionamento" },
    { v: "100%", l: "Satisfacao" },
    { v: "Global", l: "Autoridade" },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#08111E" }}>

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="sticky top-0 z-50"
        style={{
          background: "rgba(8,17,30,0.75)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(210,105,30,0.18)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
          <motion.div
            animate={{
              textShadow: [
                "0 0 0px rgba(210,105,30,0)",
                "0 0 28px rgba(210,105,30,0.65)",
                "0 0 0px rgba(210,105,30,0)",
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="text-xl md:text-2xl font-extrabold"
            style={{ color: "#D2691E" }}
          >
            Neuro-Design
          </motion.div>

          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #2E9E6B, #1a7a52)" }}
            whileHover={{ scale: 1.06, boxShadow: "0 0 28px rgba(46,158,107,0.55)" }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Conversar no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </motion.a>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center px-5 py-24 overflow-hidden">
        {/* BG image — deconstruct/reconstruct effect */}
        <div className="absolute inset-0">
          <DeconstructBackground />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(8,17,30,0.88) 0%, rgba(8,17,30,0.60) 55%, rgba(210,105,30,0.04) 100%)",
            }}
          />
        </div>

        {/* Aurora */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse at 12% 65%, rgba(210,105,30,0.14) 0%, transparent 55%), radial-gradient(ellipse at 88% 25%, rgba(46,158,107,0.09) 0%, transparent 50%)",
          }}
        />

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 22 }).map((_, i) => (
            <Particle
              key={i}
              left={`${(i * 4.7) % 100}%`}
              delay={i * 0.42}
              duration={4 + (i % 5)}
              size={2 + (i % 4)}
            />
          ))}
        </div>

        {/* 3D Cube */}
        <div
          className="absolute right-20 top-1/2 -translate-y-1/2 hidden xl:block"
          style={{ perspective: "700px" }}
        >
          <RotatingCube />
        </div>

        {/* Floating orbs */}
        <GlowOrb
          color="radial-gradient(circle, rgba(210,105,30,0.9), transparent)"
          size={600}
          style={{ top: -180, right: -120, opacity: 0.08 }}
        />
        <GlowOrb
          color="radial-gradient(circle, rgba(46,158,107,0.9), transparent)"
          size={400}
          style={{ bottom: -100, left: -80, opacity: 0.07 }}
        />

        {/* Hero content with parallax */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-6xl mx-auto w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-7"
              style={{
                background: "rgba(210,105,30,0.12)",
                border: "1px solid rgba(210,105,30,0.38)",
                color: "#D2691E",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Neuro-Design Showcase
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] mb-7"
            >
              Sua Neuroarquitetura
              <br />
              <motion.span
                style={{
                  display: "inline-block",
                  backgroundImage: "linear-gradient(135deg, #D2691E, #E07820, #FFB347, #D2691E)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                Merece Ser Global
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-white/62 leading-relaxed mb-10 max-w-2xl"
            >
              Transformamos projetos excepcionais em infograficos de elite que comunicam a ciencia por tras do design e
              elevam seu posicionamento de mercado.
            </motion.p>

            {/* CTA button */}
            <motion.div variants={fadeUp}>
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold text-lg text-white group"
                style={{ background: "linear-gradient(135deg, #2E9E6B, #1a7a52)" }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(46,158,107,0)",
                    "0 0 40px rgba(46,158,107,0.5)",
                    "0 0 0px rgba(46,158,107,0)",
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                Comecar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ ...stagger, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 1 } } }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {[
                { icon: Award, label: "Autoridade Cientifica" },
                { icon: Sparkles, label: "Design de Elite" },
                { icon: TrendingUp, label: "Engajamento 5x" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={scaleUp}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                  style={{
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                  <item.icon className="w-4 h-4" style={{ color: "#D2691E" }} />
                  {item.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div
        className="relative py-5 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #C2571A, #D2691E)" }}
      >
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...tickerItems, ...tickerItems].map((s, i) => (
            <div key={i} className="flex items-center gap-4 flex-shrink-0">
              <span className="font-black text-white text-lg">{s.v}</span>
              <span className="font-medium text-sm" style={{ color: "rgba(255,255,255,0.68)" }}>
                {s.l}
              </span>
              <span className="text-xl" style={{ color: "rgba(255,255,255,0.3)" }}>
                ·
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── PROBLEMA ── */}
      <section
        className="relative py-20 md:py-28 px-5 overflow-hidden"
        style={{ background: "#0D1B2A" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-8"
          style={{ backgroundImage: "url('/images/luxury-interior.jpg')", opacity: 0.07 }}
        />
        <GlowOrb
          color="radial-gradient(circle, rgba(210,105,30,0.8), transparent)"
          size={520}
          style={{ top: -130, right: -160 }}
        />
        <GlowOrb
          color="radial-gradient(circle, rgba(46,158,107,0.8), transparent)"
          size={380}
          style={{ bottom: -90, left: -130 }}
        />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div
              variants={fadeUp}
              className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(210,105,30,0.12)",
                color: "#D2691E",
                border: "1px solid rgba(210,105,30,0.3)",
              }}
            >
              O Desafio
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black text-white">
              O Problema Silencioso
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
            style={{ perspective: "1200px" }}
          >
            {[
              {
                title: "Projetos Excepcionais",
                desc: "Seu trabalho em Neuroarquitetura e revolucionario, moldando espacos que impactam o bem-estar.",
                icon: Lightbulb,
                color: "#D2691E",
              },
              {
                title: "Visibilidade Comum",
                desc: "Em um cenario digital saturado, ate os projetos mais inovadores se perdem em feeds genericos.",
                icon: Users,
                color: "#2E9E6B",
              },
              {
                title: "Falta de Narrativa",
                desc: "Imagens de alta qualidade sao essenciais, mas a ciencia por tras delas e o que realmente engaja.",
                icon: Target,
                color: "#D2691E",
              },
            ].map((card, index) => (
              <motion.div key={index} variants={scaleUp}>
                <TiltCard3D autoWobble intensity={10}>
                  <div
                    className="h-full rounded-2xl p-6 relative overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      backdropFilter: "blur(22px)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Top glow line */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                      }}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.8 }}
                    />

                    {/* Icon */}
                    <motion.div
                      className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `rgba(${card.color === "#D2691E" ? "210,105,30" : "46,158,107"},0.12)`,
                        border: `1px solid rgba(${card.color === "#D2691E" ? "210,105,30" : "46,158,107"},0.25)`,
                      }}
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                    >
                      <card.icon className="w-6 h-6" style={{ color: card.color }} />
                    </motion.div>

                    <h3 className="font-bold text-lg mb-2" style={{ color: "#FFB347" }}>
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
                      {card.desc}
                    </p>

                    {/* Inner radial glow */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% -10%, ${card.color}12, transparent 65%)`,
                      }}
                    />

                    {/* Bottom scan line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                        originX: "0.5",
                      }}
                      animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.6 }}
                    />
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SOLUCAO ── */}
      <section className="py-20 md:py-28 px-5" style={{ background: "#F8F4EC" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div
              variants={fadeUp}
              className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(210,105,30,0.1)",
                color: "#D2691E",
                border: "1px solid rgba(210,105,30,0.3)",
              }}
            >
              A Solucao
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black" style={{ color: "#0D1B2A" }}>
              Neuro-Design Showcase
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8" style={{ color: "#374151" }}>
                Uma curadoria e representacao visual estrategica dos seus projetos, destacando os principios
                neuroarquitetonicos aplicados e seus resultados tangiveis.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-4">
                {[
                  "Infograficos que traduzem ciencia em autoridade",
                  "Narrativa visual que educa seu publico",
                  "Posicionamento como referencia global",
                  "Aumento de engajamento e valor percebido",
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
                    <motion.span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "#2E9E6B" }}
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(46,158,107,0)",
                          "0 0 20px rgba(46,158,107,0.6)",
                          "0 0 0px rgba(46,158,107,0)",
                        ],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.45 }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.span>
                    <span style={{ color: "#374151" }}>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Right: 3D card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleUp}
              style={{ perspective: "1000px" }}
            >
              <TiltCard3D intensity={10}>
                <div
                  className="rounded-3xl p-8 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #0D1B2A, #1A2B3C)",
                    border: "1px solid rgba(210,105,30,0.22)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    animate={{
                      background: [
                        "radial-gradient(circle at 0% 0%, rgba(210,105,30,0.09), transparent 55%)",
                        "radial-gradient(circle at 100% 100%, rgba(210,105,30,0.09), transparent 55%)",
                        "radial-gradient(circle at 0% 0%, rgba(210,105,30,0.09), transparent 55%)",
                      ],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <motion.div
                    className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center"
                    style={{
                      background: "rgba(210,105,30,0.12)",
                      border: "1px solid rgba(210,105,30,0.25)",
                    }}
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Globe className="w-7 h-7" style={{ color: "#D2691E" }} />
                  </motion.div>

                  <h3 className="text-xl font-extrabold text-white mb-3">Nosso Objetivo</h3>
                  <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
                    Posicionar voce como uma{" "}
                    <motion.span
                      style={{ color: "#D2691E" }}
                      animate={{ opacity: [0.65, 1, 0.65] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    >
                      lider de pensamento
                    </motion.span>{" "}
                    e referencia global em Neuroarquitetura, atraindo reconhecimento, clientes de alto valor e novas
                    oportunidades.
                  </p>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(210,105,30,0.5), transparent)",
                    }}
                  />
                </div>
              </TiltCard3D>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMPARATIVO ── */}
      <section className="py-20 md:py-28 px-5 relative overflow-hidden" style={{ background: "#0D1B2A" }}>
        <GlowOrb
          color="radial-gradient(circle, rgba(46,158,107,0.7), transparent)"
          size={450}
          style={{ top: -120, left: "35%" }}
        />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div
              variants={fadeUp}
              className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(210,105,30,0.12)",
                color: "#D2691E",
                border: "1px solid rgba(210,105,30,0.3)",
              }}
            >
              Comparativo
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black text-white">
              Do Projeto a Narrativa de Bem-Estar
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleUp}
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(22px)",
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px]">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <th className="p-5 text-left text-white font-bold text-sm">Elemento</th>
                    <th
                      className="p-5 text-left font-bold text-sm"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      Abordagem Tradicional
                    </th>
                    <th className="p-5 text-left font-bold text-sm" style={{ color: "#D2691E" }}>
                      Neuro-Design Showcase
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      e: "Iluminacao",
                      t: "Luz natural para o ambiente",
                      n: "Aumento de 30% na produtividade via otimizacao da luz circadiana",
                    },
                    {
                      e: "Cores",
                      t: "Tons neutros e elegantes",
                      n: "Paleta que estimula criatividade e calma, baseada em psicologia ambiental",
                    },
                    {
                      e: "Layout",
                      t: "Espaco otimizado",
                      n: "Fluxo intuitivo que minimiza fadiga cognitiva e promove colaboracao",
                    },
                  ].map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.55 }}
                      whileHover={{ background: "rgba(210,105,30,0.06)" }}
                      style={{
                        borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      }}
                    >
                      <td className="p-5 font-bold text-sm" style={{ color: "#D2691E" }}>
                        {row.e}
                      </td>
                      <td className="p-5 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {row.t}
                      </td>
                      <td className="p-5 text-sm font-semibold text-white">{row.n}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── IMPACTO ── */}
      <section className="py-20 md:py-28 px-5" style={{ background: "#F8F4EC" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div
              variants={fadeUp}
              className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(210,105,30,0.1)",
                color: "#D2691E",
                border: "1px solid rgba(210,105,30,0.3)",
              }}
            >
              Resultados
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black" style={{ color: "#0D1B2A" }}>
              O Impacto:{" "}
              <span style={{ color: "#D2691E" }}>Autoridade Global</span>
            </motion.h2>
          </motion.div>

          {/* Stats counters */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-3 gap-4 mb-10"
          >
            {[
              { v: 5, s: "x", l: "Mais Engajamento" },
              { v: 300, s: "%", l: "Mais Alcance" },
              { v: 100, s: "+", l: "Projetos Elite" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                className="text-center py-6 px-4 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #0D1B2A, #1A2B3C)",
                  border: "1px solid rgba(210,105,30,0.16)",
                }}
                whileHover={{ scale: 1.04 }}
              >
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: "#D2691E" }}>
                  <AnimatedCounter end={stat.v} suffix={stat.s} />
                </div>
                <div className="text-xs md:text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {stat.l}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 3D impact cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            style={{ perspective: "1100px" }}
          >
            {[
              {
                icon: Award,
                title: "Reconhecimento",
                desc: "Posicionamento como uma das principais vozes em Neuroarquitetura no cenario global.",
                color: "#D2691E",
              },
              {
                icon: TrendingUp,
                title: "Engajamento",
                desc: "Conteudo altamente compartilhavel que gera discussoes e atrai publico qualificado.",
                color: "#2E9E6B",
              },
              {
                icon: Sparkles,
                title: "Diferenciacao",
                desc: "Destaque-se com comunicacao que une estetica e ciencia de forma unica.",
                color: "#D2691E",
              },
              {
                icon: Target,
                title: "Oportunidades",
                desc: "Atracao de projetos de alto valor, parcerias estrategicas e convites para palestras.",
                color: "#2E9E6B",
              },
            ].map((card, index) => (
              <motion.div key={index} variants={fadeUp} style={{ perspective: "800px" }}>
                <TiltCard3D intensity={14}>
                  <div
                    className="rounded-2xl p-5 h-full relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #0D1B2A, #1A2B3C)",
                      border: `1px solid rgba(${card.color === "#D2691E" ? "210,105,30" : "46,158,107"},0.18)`,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                      className="mb-3 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `rgba(${card.color === "#D2691E" ? "210,105,30" : "46,158,107"},0.12)`,
                      }}
                    >
                      <card.icon className="w-5 h-5" style={{ color: card.color }} />
                    </motion.div>
                    <h3 className="font-bold text-white mb-2 text-sm">{card.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {card.desc}
                    </p>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                        originX: "0.5",
                      }}
                      animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.55 }}
                    />
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="relative py-24 md:py-36 px-5 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #B84A0E, #D2691E, #E07820)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/images/premium-space.jpg')" }}
        />

        {/* Pulsing rings */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 320 + i * 220,
              height: 320 + i * 220,
              border: `1px solid rgba(255,255,255,${0.13 - i * 0.035})`,
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.04, 0.4] }}
            transition={{ duration: 4.5 + i * 1.5, repeat: Infinity, delay: i * 1.4 }}
          />
        ))}

        {/* Floating stars */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: `${(i * 7.3) % 100}%`, top: `${(i * 12.7) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.75, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5 + i * 0.22, repeat: Infinity, delay: i * 0.38 }}
          >
            <Star className="w-3 h-3" style={{ color: "rgba(255,255,255,0.4)", fill: "rgba(255,255,255,0.3)" }} />
          </motion.div>
        ))}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            Pronto para Transformar
            <br className="hidden md:block" />
            Sua Visao em Realidade?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Vamos iniciar uma conversa estrategica para selecionar seus primeiros projetos e definir o cronograma de
            implementacao.
          </motion.p>

          <motion.div variants={scaleUp}>
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-extrabold text-lg shadow-2xl group"
              style={{ background: "white", color: "#D2691E" }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(0,0,0,0.18)",
                  "0 20px 65px rgba(0,0,0,0.38)",
                  "0 10px 30px rgba(0,0,0,0.18)",
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity }}
            >
              <MessageCircle className="w-6 h-6" />
              Agendar Conversa no WhatsApp
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#060E18",
          padding: "24px 20px",
          borderTop: "1px solid rgba(210,105,30,0.1)",
        }}
      >
        <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.22)" }}>
          © 2026 Neuro-Design Showcase. Elevando a Neuroarquitetura ao Proximo Nivel.
        </p>
      </footer>
    </div>
  )
}
