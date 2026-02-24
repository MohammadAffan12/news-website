import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import useMouseParallax from '../hooks/useMouseParallax'

/* ── Easing ──────────────────────────────────────────── */
const ease = [0.35, 0, 0, 1]

/* ── Animation helpers ───────────────────────────────── */
const fadeSlideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay } },
})

const wordVariants = {
  initial: { opacity: 0, y: 60 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: 0.35 + i * 0.09 },
  }),
}

/* ── Hero ─────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null)

  // Mouse parallax – different depths for layered feel
  const bgParallax   = useMouseParallax(6)    // slowest – background
  const textParallax = useMouseParallax(12)   // mid – headline
  const imgParallax  = useMouseParallax(18)   // faster – person image
  const uiParallax   = useMouseParallax(26)   // fastest – floating UI cards

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const imgY   = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  const headline = 'Change the way you read news'

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#4B8BCB' }}
    >
      {/* ── Background: sky photo + gradient ─────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY, x: bgParallax.x, willChange: 'transform' }}
      >
        <img
          src="https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-[#4B8BCB]/60" />
      </motion.div>

      {/* ── Main content area ────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-[130px] pb-[50px]">
        <div className="relative flex items-end lg:items-center min-h-[85vh]">

          {/* ── Left: Text (overlaps image on desktop) ─ */}
          <motion.div
            className="relative z-20 max-w-[600px] pb-12 lg:pb-0"
            style={{
              x: textParallax.x,
              y: textParallax.y,
              willChange: 'transform',
            }}
          >
            <h1 className="text-[52px] sm:text-[64px] md:text-[80px] lg:text-[92px] font-medium text-white leading-[0.95] tracking-[-0.03em] mb-7">
              {headline.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.24em]"
                  variants={wordVariants}
                  initial="initial"
                  animate="animate"
                  custom={i}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="text-[17px] md:text-[19px] text-white/85 leading-[1.55] max-w-[440px] mb-9"
              {...fadeSlideUp(0.85)}
            >
              From breaking stories to deep analysis — stay informed
              with trusted journalism, delivered in real-time.
              Start reading for free.
            </motion.p>

            <motion.div {...fadeSlideUp(1.05)}>
              <motion.a
                href="#latest"
                className="inline-flex items-center px-8 py-4 bg-[#191C1F] text-white text-[16px] font-medium rounded-full hover:bg-[#2d3136] transition-colors duration-500"
                style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Start reading
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── Center-right: Person image + phone UI ── */}
          <motion.div
            className="hidden lg:block absolute right-0 top-1/2"
            style={{
              x: imgParallax.x,
              y: imgY,
              translateY: '-50%',
              willChange: 'transform',
            }}
          >
            {/* Zoom-out entrance: starts 1.18 → 1.0 (Revolut effect) */}
            <motion.div
              className="relative w-[460px] xl:w-[520px] h-[620px] xl:h-[700px]"
              initial={{ scale: 1.18, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.4, ease, delay: 0.2 }}
            >
              {/* Person photo */}
              <div className="absolute inset-0 rounded-[4px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=85"
                  alt="Person reading news"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Phone frame overlay (subtle white border like Revolut) */}
              <motion.div
                className="absolute inset-[8%] rounded-[16px] border-[1.5px] border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1, ease }}
              />

              {/* ── Floating UI: Account label + balance ── */}
              <motion.div
                className="absolute top-[40%] left-1/2 text-center"
                style={{
                  translateX: '-50%',
                  x: uiParallax.x,
                  y: uiParallax.y,
                  willChange: 'transform',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.9, ease }}
              >
                <p className="text-white/70 text-[14px] font-medium">Breaking</p>
                <p className="text-white text-[48px] xl:text-[54px] font-semibold leading-none mt-1 drop-shadow-lg">
                  24/7
                </p>
                <motion.div
                  className="mt-3 px-5 py-1.5 bg-white rounded-full text-[13px] font-medium text-[#191C1F] inline-block shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9, duration: 0.6, ease }}
                >
                  Live Feed
                </motion.div>
              </motion.div>

              {/* ── Floating UI: Transaction-style notification ── */}
              <motion.div
                className="absolute bottom-[7%] left-1/2 w-[290px] bg-white rounded-2xl px-4 py-3 shadow-xl shadow-black/15"
                style={{
                  translateX: '-50%',
                  x: uiParallax.x,
                  willChange: 'transform',
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.9, ease }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#4B8BCB]/12 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#4B8BCB]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                        <path d="M10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[#191C1F]">Breaking Alert</p>
                      <p className="text-[12px] text-[#8D969E]">Today, 11:28</p>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-[#191C1F]">Live</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Mobile: person image (below text, simpler layout) ── */}
      <motion.div
        className="lg:hidden relative z-10 px-6 pb-10"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease, delay: 0.5 }}
      >
        <div className="relative w-full max-w-[360px] mx-auto aspect-[3/4] rounded-[16px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80"
            alt="Person reading news"
            className="w-full h-full object-cover object-top"
          />
          {/* Overlay UI */}
          <div className="absolute inset-[6%] rounded-[12px] border border-white/20" />
          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 text-center">
            <p className="text-white/70 text-[13px]">Breaking</p>
            <p className="text-white text-[40px] font-semibold leading-none mt-1 drop-shadow-lg">24/7</p>
            <div className="mt-2 px-4 py-1 bg-white rounded-full text-[12px] font-medium text-[#191C1F] inline-block">
              Live Feed
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[250px] bg-white rounded-xl px-3 py-2.5 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#4B8BCB]/12 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#4B8BCB]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                  <path d="M10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#191C1F]">Breaking Alert</p>
                <p className="text-[10px] text-[#8D969E]">Today, 11:28</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#191C1F]">Live</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
