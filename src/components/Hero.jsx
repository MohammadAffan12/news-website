import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
 * REVOLUT-EXACT HERO — GSAP + SCROLL CLIP
 * ─────────────────────────────────────────
 * 1. Girl photo covers full viewport as background
 * 2. On load: photo scale(1.75) → scale(1) zoom-out
 * 3. Text fades up on left
 * 4. Phone frame + UI fade in with stagger
 * 5. On scroll: full-screen image CLIPS INTO the center phone frame
 *    → girl ends up perfectly fitted inside the box
 * 6. Text fades out while image clips in
 */

export default function Hero() {
  const sectionRef = useRef(null)
  const bgContainerRef = useRef(null)
  const bgImgRef = useRef(null)
  const overlayRef = useRef(null)
  const frameRef = useRef(null)
  const textWrapRef = useRef(null)
  const textRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const uiLabelRef = useRef(null)
  const uiPillRef = useRef(null)
  const notifRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── ENTRANCE: Girl zooms out from screen ──
      gsap.fromTo(bgImgRef.current,
        { scale: 1.75, transformOrigin: 'center top' },
        { scale: 1, duration: 2.4, ease: 'power3.out', delay: 0.1 }
      )

      // ── Text entrance: fade + slide up ──
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }
      )
      .fromTo(subRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo(ctaRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )

      // ── Phone frame fade in ──
      gsap.fromTo(frameRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.9 }
      )

      // ── UI elements stagger ──
      gsap.fromTo(uiLabelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 1.4 }
      )
      gsap.fromTo(uiPillRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.4)', delay: 1.8 }
      )
      gsap.fromTo(notifRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 2.0 }
      )

      // ═══════════════════════════════════════════════
      // SCROLL: Girl image clips from full-screen
      // into the center phone frame box
      // ═══════════════════════════════════════════════
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const section = sectionRef.current
        const w = section.offsetWidth
        const h = section.offsetHeight
        const frameW = Math.min(640, w * 0.5)
        const frameH = frameW * 9 / 16
        const insetX = (w - frameW) / 2
        const insetY = (h - frameH) / 2

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })

        // 1. Clip the full-bleed image into the landscape frame area
        scrollTl.fromTo(bgContainerRef.current,
          { clipPath: 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)' },
          {
            clipPath: `inset(${insetY}px ${insetX}px ${insetY}px ${insetX}px round 18px)`,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        )

        // 2. Overlay stays visible (keep the blue color consistent)
        scrollTl.to(overlayRef.current,
          { opacity: 0.5, duration: 1, ease: 'power1.out' },
          0
        )

        // 3. Text slides up and fades out
        scrollTl.to(textWrapRef.current,
          { y: -100, opacity: 0, duration: 0.7, ease: 'power2.in' },
          0
        )

        // 4. Section background turns white behind the clipped frame
        scrollTl.fromTo(sectionRef.current,
          { backgroundColor: 'transparent' },
          { backgroundColor: '#ffffff', duration: 0.6, ease: 'none' },
          0.3
        )

        // 5. Frame border strengthens
        const frameBorder = frameRef.current?.querySelector('.frame-border')
        if (frameBorder) {
          scrollTl.to(frameBorder, {
            borderColor: 'rgba(201, 201, 205, 0.85)',
            duration: 0.5,
            ease: 'none',
          }, 0.4)
        }

        // Recalculate on resize
        ScrollTrigger.addEventListener('refreshInit', () => {
          const newW = section.offsetWidth
          const newH = section.offsetHeight
          const newFrameW = Math.min(640, newW * 0.5)
          const newFrameH = newFrameW * 9 / 16
          const newInsetX = (newW - newFrameW) / 2
          const newInsetY = (newH - newFrameH) / 2
          gsap.set(bgContainerRef.current, {
            '--clip-end': `inset(${newInsetY}px ${newInsetX}px ${newInsetY}px ${newInsetX}px round 18px)`
          })
        })
      })

      // Mobile: simpler scroll animations
      mm.add('(max-width: 1023px)', () => {
        gsap.to(bgImgRef.current, {
          y: '-8%',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        })
        gsap.to(textWrapRef.current, {
          y: -60,
          opacity: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '10% top',
            end: '70% top',
            scrub: 0.6,
          }
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headline = 'Change the way you read news'

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '700px' }}
    >
      {/* ═══════════════════════════════════════════════
          LAYER 0 — Full-bleed girl photo (background)
          Starts full-screen → clips into center frame on scroll
         ═══════════════════════════════════════════════ */}
      <div
        ref={bgContainerRef}
        className="absolute inset-0 z-0"
        style={{ clipPath: 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)' }}
      >
        <div
          ref={bgImgRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: 'center top' }}
        >
          <img
            src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1920&q=90"
            alt="Breaking news"
            className="w-full h-full object-cover object-center"
            style={{ display: 'block' }}
          />
        </div>
        {/* Color overlay — Revolut exact bright sky blue */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{
            background: '#4A9BD9',
            opacity: 0.72,
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════
          LAYER 1 — Phone frame overlay (centered)
         ═══════════════════════════════════════════════ */}
      <div
        ref={frameRef}
        className="absolute left-1/2 top-1/2 z-[3] hidden lg:block pointer-events-none"
        style={{ width: 'min(640px, 50vw)', aspectRatio: '16/9', transform: 'translate(-50%, -50%)', opacity: 0 }}
      >
        {/* Landscape frame: gray border, fully rounded */}
        <div
          className="frame-border absolute inset-0"
          style={{
            border: '2.4px solid rgba(201, 201, 205, 0.45)',
            borderRadius: '18px',
          }}
        />

        {/* UI: "Breaking" label + big number */}
        <div
          ref={uiLabelRef}
          className="absolute left-1/2 top-1/2 text-center z-10"
          style={{ transform: 'translate(-50%, -70%)', opacity: 0 }}
        >
          <p className="text-white/70 text-[14px] font-medium tracking-wide">Breaking</p>
          <p className="text-white text-[42px] font-semibold leading-none mt-1 drop-shadow-lg">
            24/7
          </p>
        </div>

        {/* UI: Pill button */}
        <div
          ref={uiPillRef}
          className="absolute left-1/2 z-10"
          style={{ top: '68%', transform: 'translateX(-50%)', opacity: 0 }}
        >
          <div className="px-5 py-1.5 bg-white rounded-full text-[12px] font-medium text-[#191C1F] inline-block shadow-md">
            Live Feed
          </div>
        </div>

        {/* UI: Bottom notification card */}
        <div
          ref={notifRef}
          className="absolute bottom-3 left-1/2 w-[280px] bg-white rounded-2xl px-3 py-2.5 shadow-xl z-10"
          style={{ transform: 'translateX(-50%)', opacity: 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6366F1]/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#6366F1]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                  <path d="M10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#191C1F]">Breaking Alert</p>
                <p className="text-[12px] text-[#8D969E]">Today, 11:28</p>
              </div>
            </div>
            <span className="text-[14px] font-bold text-[#191C1F]">+2,550</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          LAYER 2 — Text content (left side)
         ═══════════════════════════════════════════════ */}
      <div
        ref={textWrapRef}
        className="relative z-[5] h-full flex flex-col justify-center max-w-[1000px] mx-auto px-6 lg:px-10 pt-[100px] pb-[60px]"
      >
        <h1
          ref={textRef}
          className="text-[52px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-medium text-white leading-[0.95] tracking-[-0.03em] mb-7 max-w-[700px]"
          style={{ opacity: 0 }}
        >
          {headline}
        </h1>

        <p
          ref={subRef}
          className="text-[17px] md:text-[19px] text-white/85 leading-[1.55] max-w-[420px] mb-9"
          style={{ opacity: 0 }}
        >
          From breaking stories to deep analysis — stay informed
          with trusted journalism, delivered in real-time.
          Start reading for free, in a tap.
        </p>

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <a
            href="#latest"
            className="inline-flex items-center px-8 py-4 bg-[#191C1F] text-white text-[16px] font-medium rounded-full hover:bg-[#2d3136] transition-colors duration-300"
            style={{ transitionTimingFunction: 'cubic-bezier(0.15, 0.5, 0.5, 1)' }}
          >
            Start reading
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MOBILE — notification at bottom
         ═══════════════════════════════════════════════ */}
      <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[280px]">
        <div className="bg-white rounded-2xl px-4 py-3 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#6366F1]/15 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#6366F1]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                  <path d="M10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#191C1F]">Breaking Alert</p>
                <p className="text-[11px] text-[#8D969E]">Today, 11:28</p>
              </div>
            </div>
            <span className="text-[12px] font-bold text-[#191C1F]">Live</span>
          </div>
        </div>
      </div>
    </section>
  )
}
