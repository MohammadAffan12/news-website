import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Card data: 3 person-photo cards like Revolut ────── */
const FEATURE_CARDS = [
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    bgClass: 'from-[#2d2015]/40 to-[#2d2015]/10',
    label: 'World · EUR',
    stat: '€3,126',
    pill: 'Stories',
    notifIcon: '☕',
    notifIconBg: 'bg-[#4B8BCB]',
    notifTitle: 'Coffee in Paris',
    notifSub: 'Yesterday, 09:02',
    notifAmount: '-€3.25',
    notifColor: 'text-[#191C1F]',
  },
  {
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=85',
    bgClass: 'from-[#4B8BCB]/40 to-[#4B8BCB]/10',
    label: 'Breaking',
    stat: '24/7',
    pill: 'Live Feed',
    notifIcon: '🔔',
    notifIconBg: 'bg-[#6366F1]',
    notifTitle: 'Breaking Alert',
    notifSub: 'Today, 11:28',
    notifAmount: 'Live',
    notifColor: 'text-[#191C1F]',
    featured: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
    bgClass: 'from-[#0d2d1a]/40 to-[#0d2d1a]/10',
    label: 'Science',
    stat: '£2,350',
    pill: 'Topics',
    notifIcon: '🏠',
    notifIconBg: 'bg-[#4B8BCB]',
    notifTitle: 'House bills',
    notifSub: 'Due today',
    notifAmount: '-£225',
    notifColor: 'text-[#191C1F]',
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

        {/* ── Revolut-style 3 photo cards ──────────────────── */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.label}
              className={`group relative rounded-[24px] overflow-hidden cursor-pointer card-lift ${
                card.featured ? 'md:-mt-3 md:mb-3' : ''
              }`}
              style={{ aspectRatio: '3/4' }}
            >
              {/* Background photo */}
              <img
                src={card.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient overlay for readability */}
              <div className={`absolute inset-0 bg-gradient-to-t ${card.bgClass}`} />

              {/* Phone frame border */}
              <div className="absolute inset-[6%] rounded-[16px] border border-white/15 pointer-events-none" />

              {/* UI overlay: label + stat + pill */}
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 text-center z-10">
                <p className="text-white/70 text-[13px] font-medium">{card.label}</p>
                <p className="text-white text-[36px] md:text-[42px] font-semibold leading-none mt-1 drop-shadow-lg">
                  {card.stat}
                </p>
                <div className="mt-2 px-4 py-1.5 bg-white rounded-full text-[12px] font-medium text-[#191C1F] inline-block shadow-md">
                  {card.pill}
                </div>
              </div>

              {/* Bottom notification card */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[280px] bg-white rounded-2xl px-4 py-3 shadow-xl shadow-black/10 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-full ${card.notifIconBg} flex items-center justify-center`}>
                      <span className="text-white text-[12px]">{card.notifIcon}</span>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#191C1F]">{card.notifTitle}</p>
                      <p className="text-[11px] text-[#8D969E]">{card.notifSub}</p>
                    </div>
                  </div>
                  <span className={`text-[13px] font-bold ${card.notifColor}`}>{card.notifAmount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
