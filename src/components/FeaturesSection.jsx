import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function FeedMockup() {
  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#4B8BCB]/5 to-[#4B8BCB]/15 rounded-[16px] p-5 overflow-hidden">
      <div className="space-y-3">
        <div className="flex gap-3 items-start bg-white rounded-xl p-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#4B8BCB]/10 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 bg-[#191C1F] rounded w-3/4" />
            <div className="h-2 bg-[#8D969E]/30 rounded w-full" />
            <div className="h-2 bg-[#8D969E]/20 rounded w-2/3" />
          </div>
        </div>
        <div className="flex gap-3 items-start bg-white rounded-xl p-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 bg-[#191C1F] rounded w-2/3" />
            <div className="h-2 bg-[#8D969E]/30 rounded w-full" />
          </div>
        </div>
        <div className="flex gap-3 items-start bg-white rounded-xl p-3 shadow-sm opacity-70">
          <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 bg-[#191C1F] rounded w-4/5" />
            <div className="h-2 bg-[#8D969E]/30 rounded w-3/4" />
          </div>
        </div>
      </div>
      <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#4B8BCB] text-white text-[10px] font-semibold rounded-full shadow-lg">
        For You
      </div>
    </div>
  )
}

function AlertsMockup() {
  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#F59E0B]/5 to-[#F59E0B]/15 rounded-[16px] p-5 overflow-hidden flex flex-col justify-center">
      <div className="w-full space-y-2.5">
        <div className="bg-white rounded-xl p-3 shadow-md border-l-4 border-[#EF4444] transform -rotate-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-[#EF4444] rounded-full" />
            <span className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider">Breaking</span>
            <span className="text-[9px] text-[#8D969E] ml-auto">Just now</span>
          </div>
          <div className="h-2.5 bg-[#191C1F] rounded w-4/5" />
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-[#F59E0B] rounded-full" />
            <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider">Trending</span>
            <span className="text-[9px] text-[#8D969E] ml-auto">2m ago</span>
          </div>
          <div className="h-2.5 bg-[#191C1F]/60 rounded w-3/5" />
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm opacity-60">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-[#4B8BCB] rounded-full" />
            <span className="text-[10px] font-bold text-[#4B8BCB] uppercase tracking-wider">Update</span>
            <span className="text-[9px] text-[#8D969E] ml-auto">15m ago</span>
          </div>
          <div className="h-2.5 bg-[#191C1F]/40 rounded w-2/3" />
        </div>
      </div>
    </div>
  )
}

function OfflineMockup() {
  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-[#22C55E]/5 to-[#22C55E]/15 rounded-[16px] p-5 overflow-hidden flex flex-col justify-center">
      <div className="space-y-3">
        <div className="flex gap-3 items-center bg-white rounded-xl p-3 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#22C55E]/20 to-[#22C55E]/5 shrink-0 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="h-2.5 bg-[#191C1F] rounded w-3/4 mb-1.5" />
            <div className="h-2 bg-[#22C55E]/30 rounded w-1/3" />
          </div>
        </div>
        <div className="flex gap-3 items-center bg-white rounded-xl p-3 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#22C55E]/20 to-[#22C55E]/5 shrink-0 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="h-2.5 bg-[#191C1F] rounded w-2/3 mb-1.5" />
            <div className="h-2 bg-[#22C55E]/30 rounded w-1/4" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-[#191C1F]">Downloading...</span>
            <span className="text-[10px] text-[#22C55E] font-bold">67%</span>
          </div>
          <div className="h-1.5 bg-[#F7F7F7] rounded-full overflow-hidden">
            <div className="h-full bg-[#22C55E] rounded-full" style={{ width: '67%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

const FEATURES = [
  {
    title: 'Personalized Feed',
    desc: 'AI-curated stories matching your interests, so you never miss what truly matters.',
    Mockup: FeedMockup,
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#4B8BCB]">
        <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 9h6M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Real-time Alerts',
    desc: 'Breaking news notifications delivered the instant stories break.',
    Mockup: AlertsMockup,
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#F59E0B]">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Offline Reading',
    desc: 'Download stories for later and read anywhere offline.',
    Mockup: OfflineMockup,
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#22C55E]">
        <path d="M12 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const ctaRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%' } }
      )

      gsap.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 78%' } }
      )

      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power2.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Centered header */}
        <div className="text-center mb-5">
          <h2 ref={titleRef} className="text-[36px] md:text-[52px] font-medium text-[#191C1F] leading-[1.08] tracking-[-0.025em]">
            Your news, reimagined
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#8D969E] mt-4 max-w-xl mx-auto leading-relaxed">
            Read smarter, stay informed, and never miss a story that matters — all with FlavorNews.
          </p>
        </div>

        <div className="text-center mb-16" ref={ctaRef}>
          <a href="#subscribe"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#191C1F] text-white text-[16px] font-medium rounded-full hover:bg-[#2d3136] transition-all duration-500"
            style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}>
            Get started
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Rich feature cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group bg-[#F7F7F7] rounded-[24px] p-6 md:p-7 cursor-pointer card-lift"
            >
              <div className="mb-5">
                <f.Mockup />
              </div>
              <div className="bg-white rounded-[16px] px-5 py-4 flex items-start gap-4">
                <div className="shrink-0 mt-0.5 w-10 h-10 rounded-full bg-[#F7F7F7] flex items-center justify-center">
                  {f.iconSvg}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[16px] font-semibold text-[#191C1F] mb-1">{f.title}</p>
                  <p className="text-[13px] text-[#8D969E] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
