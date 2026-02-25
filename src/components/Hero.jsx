import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
 * REVOLUT-EXACT HERO — GSAP + SCROLL DOCKING
 * ─────────────────────────────────────────
 * 1. Solid light blue background
 * 2. Single portrait image on the right
 * 3. On scroll: 3-card grid slides up from bottom
 * 4. Portrait image scales down and docks into the empty middle slot
 */

export default function Hero() {
  const sectionRef = useRef(null)
  const textWrapRef = useRef(null)
  const textRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  
  const heroImageRef = useRef(null)
  const gridRef = useRef(null)
  const middleSlotRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── ENTRANCE ANIMATIONS ──
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

      gsap.fromTo(heroImageRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.4 }
      )

      // ═══════════════════════════════════════════════
      // SCROLL: Docking Animation
      // ═══════════════════════════════════════════════
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const section = sectionRef.current
        
        function setInitialPosition() {
          gsap.set(heroImageRef.current, { clearProps: 'all' })
          const imgRect = heroImageRef.current.getBoundingClientRect()
          const sectionRect = section.getBoundingClientRect()
          gsap.set(heroImageRef.current, {
            right: 'auto',
            left: imgRect.left - sectionRect.left,
            top: imgRect.top - sectionRect.top,
            width: imgRect.width,
            height: imgRect.height,
          })
        }
        
        setInitialPosition()
        ScrollTrigger.addEventListener('refreshInit', setInitialPosition)

        // We will animate the grid up from 100vh to 0
        gsap.set(gridRef.current, { y: window.innerHeight })

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        })

        // 1. Move grid up
        scrollTl.to(gridRef.current, {
          y: 0,
          duration: 1,
          ease: 'power2.inOut'
        }, 0)

        // 2. Scale down and fade out text (Revolut style)
        gsap.set(textWrapRef.current, { transformOrigin: 'left center' })
        scrollTl.to(textWrapRef.current, {
          scale: 0.85,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut'
        }, 0)

        // 3. Animate hero image to middle slot
        scrollTl.to(heroImageRef.current, {
          left: () => {
            gsap.set(gridRef.current, { y: 0 })
            const val = middleSlotRef.current.getBoundingClientRect().left - section.getBoundingClientRect().left
            gsap.set(gridRef.current, { y: window.innerHeight * (1 - scrollTl.progress()) })
            return val
          },
          top: () => {
            gsap.set(gridRef.current, { y: 0 })
            const val = middleSlotRef.current.getBoundingClientRect().top - section.getBoundingClientRect().top
            gsap.set(gridRef.current, { y: window.innerHeight * (1 - scrollTl.progress()) })
            return val
          },
          width: () => {
            gsap.set(gridRef.current, { y: 0 })
            const val = middleSlotRef.current.getBoundingClientRect().width
            gsap.set(gridRef.current, { y: window.innerHeight * (1 - scrollTl.progress()) })
            return val
          },
          height: () => {
            gsap.set(gridRef.current, { y: 0 })
            const val = middleSlotRef.current.getBoundingClientRect().height
            gsap.set(gridRef.current, { y: window.innerHeight * (1 - scrollTl.progress()) })
            return val
          },
          duration: 1,
          ease: 'power2.inOut'
        }, 0)

        return () => {
          ScrollTrigger.removeEventListener('refreshInit', setInitialPosition)
        }
      })

      // Mobile: simpler scroll animations
      mm.add('(max-width: 1023px)', () => {
        gsap.set(heroImageRef.current, { clearProps: 'all' })
        gsap.set(gridRef.current, { clearProps: 'all' })
        
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
      className="relative w-full overflow-hidden bg-[#000000] lg:h-screen lg:min-h-[700px]"
    >
      {/* ═══════════════════════════════════════════════
          LAYER 1 — Text content (left side)
         ═══════════════════════════════════════════════ */}
      <div
        ref={textWrapRef}
        className="relative lg:absolute inset-0 z-[5] flex flex-col justify-center max-w-[1200px] mx-auto px-6 lg:px-10 pt-[120px] lg:pt-[100px] pb-[60px] pointer-events-none"
      >
        <div className="w-full lg:w-1/2 pointer-events-auto">
          <h1
            ref={textRef}
            className="text-[52px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-medium text-white leading-[0.95] tracking-[-0.03em] mb-7 max-w-[700px]"
            style={{ opacity: 0 }}
          >
            {headline}
          </h1>

          <p
            ref={subRef}
            className="text-[17px] md:text-[19px] text-white/80 leading-[1.55] max-w-[420px] mb-9"
            style={{ opacity: 0 }}
          >
            From breaking stories to deep analysis — stay informed
            with trusted journalism, delivered in real-time.
            Start reading for free, in a tap.
          </p>

          <div ref={ctaRef} style={{ opacity: 0 }}>
            <a
              href="#latest"
              className="inline-flex items-center px-8 py-4 bg-white text-[#000000] text-[16px] font-medium rounded-full hover:bg-gray-200 transition-colors duration-300"
              style={{ transitionTimingFunction: 'cubic-bezier(0.15, 0.5, 0.5, 1)' }}
            >
              Start reading
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          LAYER 2 — Hero Image (Right side)
          Starts on right → docks into middle slot on scroll
         ═══════════════════════════════════════════════ */}
      <div
        ref={heroImageRef}
        className="relative lg:absolute z-[10] rounded-[24px] overflow-hidden shadow-2xl mx-6 lg:mx-0 mt-10 lg:mt-0 h-[300px] lg:h-[400px] lg:w-[544px] lg:right-[max(2rem,calc((100vw-1200px)/2+2rem))] lg:top-[calc(50%-200px)]"
      >
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=90"
          alt="Breaking News Newsroom"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* ═══════════════════════════════════════════════
          LAYER 3 — 3-Card Grid (Slides up on scroll)
         ═══════════════════════════════════════════════ */}
      <div
        ref={gridRef}
        className="relative lg:absolute inset-0 z-[5] flex items-center justify-center pt-16 lg:pt-0 pb-20 lg:pb-0 bg-white"
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Card */}
          <div className="bg-[#F7F7F7] rounded-[24px] overflow-hidden h-[400px] flex flex-col transition-transform hover:scale-[1.02] duration-300 lg:col-span-1">
            <div className="h-1/2 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=80" className="w-full h-full object-cover" alt="White House" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <span className="text-[12px] font-bold text-[#191C1F] uppercase tracking-wider mb-2">Politics</span>
              <h3 className="text-[20px] font-semibold text-[#191C1F] leading-tight mb-3">Senate passes landmark infrastructure bill</h3>
              <p className="text-[14px] text-[#8D969E] leading-relaxed line-clamp-2">Bipartisan agreement reached after weeks of intense negotiations on Capitol Hill.</p>
            </div>
          </div>

          {/* Middle Slot (Empty placeholder for docking on desktop) */}
          <div
            ref={middleSlotRef}
            className="hidden lg:block rounded-[24px] h-[400px] opacity-0 lg:col-span-2"
          />

          {/* Right Card */}
          <div className="bg-[#F7F7F7] rounded-[24px] overflow-hidden h-[400px] flex flex-col transition-transform hover:scale-[1.02] duration-300 lg:col-span-1">
            <div className="h-1/2 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80" className="w-full h-full object-cover" alt="Stock Market" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <span className="text-[12px] font-bold text-[#191C1F] uppercase tracking-wider mb-2">Economy</span>
              <h3 className="text-[20px] font-semibold text-[#191C1F] leading-tight mb-3">Federal Reserve announces rate decision</h3>
              <p className="text-[14px] text-[#8D969E] leading-relaxed line-clamp-2">Markets react as central bank outlines new strategy to combat inflation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
