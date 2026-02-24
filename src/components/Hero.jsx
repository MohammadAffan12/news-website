import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import useMouseParallax from '../hooks/useMouseParallax'

/* ── Easing & spring presets ─────────────────────────── */
const ease = [0.35, 0, 0, 1]

/* ── Entrance variants ───────────────────────────────── */
const fadeSlideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
})

const wordVariants = {
  initial: { opacity: 0, y: 60 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: 0.3 + i * 0.08 },
  }),
}

/* ── Card stagger container + child ──────────────────── */
const cardContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.15, delayChildren: 0.9 },
  },
}

const cardChild = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

/* ── Floating card component (reusable) ──────────────── */
function FloatingCard({
  children,
  className = '',
  parallax,         // { x, y } motion values
  depthFactor = 1,  // multiplier for parallax layer
}) {
  return (
    <motion.div
      className={className}
      variants={cardChild}
      style={{
        x: parallax.x === 0 ? 0 : parallax.x,
        y: parallax.y === 0 ? 0 : parallax.y,
        willChange: 'transform',
      }}
      whileHover={{ y: -6, transition: { duration: 0.35, ease } }}
    >
      {children}
    </motion.div>
  )
}

/* ── Hero ─────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null)

  // Mouse-based parallax (auto-disabled on touch devices)
  const bgParallax   = useMouseParallax(8)   // slowest layer
  const textParallax = useMouseParallax(14)   // mid layer
  const cardParallax = {
    slow:   useMouseParallax(10),
    center: useMouseParallax(20),   // deepest movement → feels closest
    fast:   useMouseParallax(15),
  }

  // Scroll-based parallax (content shifts gently on scroll)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  const headline = 'Change the way you read news'

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: '#4B8BCB' }}
    >
      {/* Subtle scroll-parallax background layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: bgY,
          x: bgParallax.x,
          willChange: 'transform',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#4B8BCB] via-[#4B8BCB] to-[#3d7ab8]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-[140px] pb-[60px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ── Left: Text ──────────────────────────── */}
          <motion.div
            style={{
              x: textParallax.x,
              y: textParallax.y,
              willChange: 'transform',
            }}
          >
            {/* Headline — word-by-word stagger */}
            <h1 className="text-[48px] sm:text-[56px] md:text-[72px] lg:text-[80px] font-medium text-white leading-[1] tracking-[-0.02em] mb-6">
              {headline.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.22em]"
                  variants={wordVariants}
                  initial="initial"
                  animate="animate"
                  custom={i}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              className="text-[17px] md:text-[19px] text-white/80 leading-[1.5] max-w-[420px] mb-8"
              {...fadeSlideUp(0.7)}
            >
              From breaking stories to deep analysis — stay informed with trusted journalism, delivered in real-time. Start reading for free.
            </motion.p>

            {/* CTA */}
            <motion.div {...fadeSlideUp(0.9)}>
              <motion.a
                href="#latest"
                className="inline-flex items-center px-7 py-3.5 bg-[#191C1F] text-white text-[16px] font-medium rounded-full hover:bg-[#2d3136] transition-colors duration-500"
                style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Start reading
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── Right: Parallax cards stack ──────────── */}
          <motion.div
            className="hidden lg:flex gap-4 justify-end"
            variants={cardContainer}
            initial="initial"
            animate="animate"
          >
            {/* Card 1 — slow layer */}
            <FloatingCard
              className="w-[200px] bg-white rounded-[20px] overflow-hidden shadow-lg shadow-black/10"
              parallax={cardParallax.slow}
              depthFactor={0.6}
            >
              <div className="h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80" alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <p className="text-[12px] text-[#8D969E]">Technology</p>
                <p className="text-[14px] font-medium text-[#191C1F] mt-1 leading-tight">AI reshapes global newsrooms</p>
              </div>
              <div className="mx-4 mb-4 px-3 py-2.5 bg-[#F7F7F7] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#4B8BCB] flex items-center justify-center">
                    <span className="text-white text-[10px]">🔔</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#191C1F]">Breaking</p>
                    <p className="text-[10px] text-[#8D969E]">Just now</p>
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-[#191C1F]">Live</p>
              </div>
            </FloatingCard>

            {/* Card 2 — center / deepest parallax + zoom-in scale */}
            <FloatingCard
              className="w-[220px] bg-white rounded-[20px] overflow-hidden shadow-lg shadow-black/10 -mt-4"
              parallax={cardParallax.center}
              depthFactor={1.4}
            >
              <motion.div
                className="h-[240px] overflow-hidden bg-[#4B8BCB] relative"
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 2.5, ease, delay: 1.2 }}
              >
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80" alt="" className="w-full h-full object-cover opacity-80" loading="lazy" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <p className="text-[12px] opacity-70">Breaking</p>
                  <p className="text-[28px] font-semibold mt-1">24/7</p>
                  <p className="text-[13px] mt-1 px-4 py-1 bg-white/20 rounded-full">Coverage</p>
                </div>
              </motion.div>
              <div className="mx-4 my-4 px-3 py-2.5 bg-[#F7F7F7] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                    <span className="text-white text-[10px]">✓</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#191C1F]">Subscribed</p>
                    <p className="text-[10px] text-[#8D969E]">Today, 08:00</p>
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-[#22C55E]">Active</p>
              </div>
            </FloatingCard>

            {/* Card 3 — fast layer */}
            <FloatingCard
              className="w-[200px] bg-white rounded-[20px] overflow-hidden shadow-lg shadow-black/10 mt-4"
              parallax={cardParallax.fast}
              depthFactor={1}
            >
              <div className="h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <p className="text-[12px] text-[#8D969E]">Science</p>
                <p className="text-[14px] font-medium text-[#191C1F] mt-1 leading-tight">Deep space signals decoded</p>
              </div>
              <div className="mx-4 mb-4 px-3 py-2.5 bg-[#F7F7F7] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#6366F1] flex items-center justify-center">
                    <span className="text-white text-[10px]">🔬</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#191C1F]">Trending</p>
                    <p className="text-[10px] text-[#8D969E]">2 min ago</p>
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-[#6366F1]">+2.4K</p>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
