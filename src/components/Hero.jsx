import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
 * HERO — Self-Contained GSAP Scroll-Docking Component
 * ────────────────────────────────────────────────────
 * Drop this single file into any React + Tailwind + GSAP project.
 *
 * Dependencies (peer):
 *   • react, react-dom
 *   • gsap + gsap/ScrollTrigger
 *   • tailwindcss (utility classes)
 *
 * All custom CSS is embedded via <style> — no external stylesheet needed.
 */

/* ═══════════════════════════════════════════════════════
   Embedded styles — everything the Hero needs beyond
   Tailwind utilities lives here, scoped to .hero-section.
   ═══════════════════════════════════════════════════════ */
const HERO_STYLES = `
  /* ── Font ── */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .hero-section {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #191C1F;
  }

  /* ── Scrollbar hide (carousel) ── */
  .hero-scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hero-scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* ── Line clamp ── */
  .hero-line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ── Images inside hero ── */
  .hero-section img {
    display: block;
    max-width: 100%;
    height: auto;
    transition: transform 0.8s cubic-bezier(0.35, 0, 0, 1), opacity 0.4s ease;
  }

  /* ── Selection ── */
  .hero-section ::selection {
    background: #4B8BCB;
    color: #fff;
  }
`

export default function Hero() {
  const sectionRef = useRef(null)
  const textWrapRef = useRef(null)
  const textRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  const heroImageRef = useRef(null)
  const gridRef = useRef(null)
  const carouselRef = useRef(null)
  const middleCardRef = useRef(null)
  const middleSlotRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance animations ──
      const entrance = gsap.timeline({ delay: 0.2 })
      entrance
        .fromTo(textRef.current,
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
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.4 }
      )

      // ═══════════════════════════════════════════════════
      // SCROLL-LINKED DOCKING
      // ═══════════════════════════════════════════════════
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const section = sectionRef.current
        const hero = heroImageRef.current
        const grid = gridRef.current
        const carousel = carouselRef.current
        const card = middleCardRef.current
        const slot = middleSlotRef.current
        const textWrap = textWrapRef.current

        let endRect = { left: 0, top: 0, width: 0, height: 0 }
        let carouselTarget = 0
        const gridStartY = window.innerHeight

        function measure() {
          gsap.set(hero, { clearProps: 'all' })
          const heroBox = hero.getBoundingClientRect()
          const secBox = section.getBoundingClientRect()
          gsap.set(hero, {
            position: 'absolute',
            right: 'auto',
            left: heroBox.left - secBox.left,
            top: heroBox.top - secBox.top,
            width: heroBox.width,
            height: heroBox.height,
          })

          carouselTarget = card.offsetLeft - carousel.offsetLeft
            - (carousel.clientWidth / 2) + (card.offsetWidth / 2)

          const prevY = gsap.getProperty(grid, 'y')
          const prevScroll = carousel.scrollLeft
          gsap.set(grid, { y: 0 })
          carousel.scrollLeft = carouselTarget

          const slotBox = slot.getBoundingClientRect()
          const secBox2 = section.getBoundingClientRect()
          endRect = {
            left: slotBox.left - secBox2.left,
            top: slotBox.top - secBox2.top,
            width: slotBox.width,
            height: slotBox.height,
          }

          carousel.scrollLeft = prevScroll
          gsap.set(grid, { y: prevY })
        }

        gsap.set(grid, { y: gridStartY })
        measure()

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=200%',
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => measure(),
            onUpdate: (self) => {
              const t = Math.min(self.progress * 2, 1)
              carousel.scrollLeft = carouselTarget * t
            },
          },
        })

        // Phase 1: Animate (timeline 0 → 1)
        scrollTl.fromTo(grid,
          { y: gridStartY },
          { y: 0, duration: 1, ease: 'power2.inOut' },
          0
        )

        gsap.set(textWrap, { transformOrigin: 'left center' })
        scrollTl.to(textWrap, {
          scale: 0.85, opacity: 0, duration: 0.6, ease: 'power2.inOut',
        }, 0)

        scrollTl.to(hero, {
          left: () => endRect.left,
          top: () => endRect.top,
          width: () => endRect.width,
          height: () => endRect.height,
          borderRadius: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 1,
          ease: 'power2.inOut',
        }, 0)

        scrollTl.fromTo(card,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'none' },
          0.75
        )

        scrollTl.set(hero, { autoAlpha: 0 }, 1)

        // Phase 2: Hold (timeline 1 → 2)
        scrollTl.to({}, { duration: 1 }, 1)
      })

      // ── Mobile: simple parallax ──
      mm.add('(max-width: 1023px)', () => {
        gsap.set(heroImageRef.current, { clearProps: 'all' })
        gsap.set(gridRef.current, { clearProps: 'all' })
        gsap.set(middleCardRef.current, { opacity: 1 })

        gsap.to(textWrapRef.current, {
          y: -60,
          opacity: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '10% top',
            end: '70% top',
            scrub: 0.6,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headline = 'Change the way you read news'

  return (
    <>
      {/* Embedded styles — no external CSS needed */}
      <style>{HERO_STYLES}</style>

      <section
        ref={sectionRef}
        className="hero-section relative w-full overflow-hidden bg-white lg:h-screen lg:min-h-[700px]"
      >
        {/* ═══ LAYER 1 — Text (left) ═══ */}
        <div
          ref={textWrapRef}
          className="relative lg:absolute inset-0 z-[5] flex flex-col justify-center max-w-[1200px] mx-auto px-6 lg:px-10 pt-[120px] lg:pt-[100px] pb-[60px] pointer-events-none"
        >
          <div className="w-full lg:w-1/2 pointer-events-auto">
            <h1
              ref={textRef}
              className="text-[52px] sm:text-[64px] md:text-[80px] lg:text-[96px] font-medium text-[#191C1F] leading-[0.95] tracking-[-0.03em] mb-7 max-w-[700px]"
              style={{ opacity: 0 }}
            >
              {headline}
            </h1>

            <p
              ref={subRef}
              className="text-[17px] md:text-[19px] text-[#191C1F]/70 leading-[1.55] max-w-[420px] mb-9"
              style={{ opacity: 0 }}
            >
              From breaking stories to deep analysis — stay informed
              with trusted journalism, delivered in real-time.
              Start reading for free, in a tap.
            </p>

            <div ref={ctaRef} style={{ opacity: 0 }}>
              <a
                href="#latest"
                className="inline-flex items-center px-8 py-4 bg-[#191C1F] text-white text-[16px] font-medium rounded-full hover:bg-[#333] transition-colors duration-300"
                style={{ transitionTimingFunction: 'cubic-bezier(0.15, 0.5, 0.5, 1)' }}
              >
                Start reading
              </a>
            </div>
          </div>
        </div>

        {/* ═══ LAYER 2 — Hero Image (right → docks into card) ═══ */}
        <div
          ref={heroImageRef}
          className="relative lg:absolute z-[10] rounded-[24px] overflow-hidden shadow-2xl mx-6 lg:mx-0 mt-10 lg:mt-0 h-[280px] sm:h-[300px] lg:h-[315px] w-[calc(100%-48px)] sm:w-[520px] lg:w-[560px] lg:right-[max(2rem,calc((100vw-1200px)/2+2rem))] lg:top-[calc(50%-158px)]"
        >
          <img
            src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&q=90"
            alt="Breaking News Newsroom"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* ═══ LAYER 3 — Horizontal Carousel (slides up) ═══ */}
        <div
          ref={gridRef}
          className="relative lg:absolute inset-0 z-[5] flex items-center pt-16 lg:pt-0 pb-20 lg:pb-0 bg-white"
        >
          <div
            ref={carouselRef}
            className="w-full flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 px-6 lg:px-10 hero-scrollbar-hide"
          >
            {/* Card 1 — Politics */}
            <div className="flex-none w-80 snap-center rounded-[24px] overflow-hidden bg-[#F7F7F7] transition-transform hover:scale-[1.02] duration-300">
              <h4 className="px-5 pt-4 pb-2 text-[13px] font-bold text-[#191C1F] uppercase tracking-wider">Politics</h4>
              <div className="w-80 h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=600&q=80" className="w-full h-full object-cover" alt="US Capitol" />
              </div>
              <div className="p-5">
                <h3 className="text-[18px] font-semibold text-[#191C1F] leading-tight mb-2">Senate passes landmark infrastructure bill</h3>
                <p className="text-[13px] text-[#8D969E] leading-relaxed hero-line-clamp-2">Bipartisan agreement reached after weeks of intense negotiations on Capitol Hill.</p>
              </div>
            </div>

            {/* Card 2 — Technology */}
            <div className="flex-none w-80 snap-center rounded-[24px] overflow-hidden bg-[#F7F7F7] transition-transform hover:scale-[1.02] duration-300">
              <h4 className="px-5 pt-4 pb-2 text-[13px] font-bold text-[#191C1F] uppercase tracking-wider">Technology</h4>
              <div className="w-80 h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80" className="w-full h-full object-cover" alt="Technology" />
              </div>
              <div className="p-5">
                <h3 className="text-[18px] font-semibold text-[#191C1F] leading-tight mb-2">AI revolution reshapes global industries</h3>
                <p className="text-[13px] text-[#8D969E] leading-relaxed hero-line-clamp-2">From healthcare to finance, artificial intelligence is transforming how we work and live.</p>
              </div>
            </div>

            {/* Card 3 — Breaking (hero docks here) */}
            <div
              ref={middleCardRef}
              className="flex-none w-[560px] snap-center rounded-[24px] overflow-hidden bg-[#F7F7F7] transition-transform duration-300"
              style={{ opacity: 0 }}
            >
              <h4 className="px-5 pt-4 pb-2 text-[13px] font-bold text-[#191C1F] uppercase tracking-wider">Breaking</h4>
              <div ref={middleSlotRef} className="w-[560px] h-[315px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&q=90" className="w-full h-full object-cover object-top" alt="Breaking News Newsroom" />
              </div>
              <div className="p-5">
                <h3 className="text-[20px] font-semibold text-[#191C1F] leading-tight mb-2">Global summit addresses climate crisis</h3>
                <p className="text-[14px] text-[#8D969E] leading-relaxed hero-line-clamp-2">World leaders gather to set new targets for reducing carbon emissions worldwide.</p>
              </div>
            </div>

            {/* Card 4 — Economy */}
            <div className="flex-none w-80 snap-center rounded-[24px] overflow-hidden bg-[#F7F7F7] transition-transform hover:scale-[1.02] duration-300">
              <h4 className="px-5 pt-4 pb-2 text-[13px] font-bold text-[#191C1F] uppercase tracking-wider">Economy</h4>
              <div className="w-80 h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80" className="w-full h-full object-cover" alt="Stock Market" />
              </div>
              <div className="p-5">
                <h3 className="text-[18px] font-semibold text-[#191C1F] leading-tight mb-2">Federal Reserve announces rate decision</h3>
                <p className="text-[13px] text-[#8D969E] leading-relaxed hero-line-clamp-2">Markets react as central bank outlines new strategy to combat inflation.</p>
              </div>
            </div>

            {/* Card 5 — Science */}
            <div className="flex-none w-80 snap-center rounded-[24px] overflow-hidden bg-[#F7F7F7] transition-transform hover:scale-[1.02] duration-300">
              <h4 className="px-5 pt-4 pb-2 text-[13px] font-bold text-[#191C1F] uppercase tracking-wider">Science</h4>
              <div className="w-80 h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80" className="w-full h-full object-cover" alt="Space" />
              </div>
              <div className="p-5">
                <h3 className="text-[18px] font-semibold text-[#191C1F] leading-tight mb-2">NASA confirms new exoplanet discovery</h3>
                <p className="text-[13px] text-[#8D969E] leading-relaxed hero-line-clamp-2">James Webb telescope captures first images of a potentially habitable world.</p>
              </div>
            </div>

            {/* Card 6 — Sports */}
            <div className="flex-none w-80 snap-center rounded-[24px] overflow-hidden bg-[#F7F7F7] transition-transform hover:scale-[1.02] duration-300">
              <h4 className="px-5 pt-4 pb-2 text-[13px] font-bold text-[#191C1F] uppercase tracking-wider">Sports</h4>
              <div className="w-80 h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80" className="w-full h-full object-cover" alt="Sports" />
              </div>
              <div className="p-5">
                <h3 className="text-[18px] font-semibold text-[#191C1F] leading-tight mb-2">Champions League final draws record viewers</h3>
                <p className="text-[13px] text-[#8D969E] leading-relaxed hero-line-clamp-2">Historic match delivers breathtaking finish watched by millions worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
