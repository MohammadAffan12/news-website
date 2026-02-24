import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATS, TRUST_BADGES } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function TrustSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef(null)
  const badgesRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 70%' } }
      )

      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 80%' } }
        )
      }

      if (badgesRef.current) {
        gsap.fromTo(badgesRef.current.children,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: badgesRef.current, start: 'top 80%' } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Title + description */}
        <div ref={textRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[36px] md:text-[52px] font-medium text-[#191C1F] leading-[1.08] tracking-[-0.025em] mb-5">
            Your trusted<br />news source
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#8D969E] leading-relaxed max-w-xl mx-auto">
            Award-winning journalism backed by rigorous fact-checking and editorial independence. Trusted by millions worldwide.
          </p>
        </div>

        {/* Stats grid - Revolut style big numbers */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-[#F7F7F7] rounded-[20px] p-6 md:p-8 text-center">
              <p className="text-[40px] md:text-[52px] font-semibold text-[#191C1F] leading-none tracking-tight mb-2">
                {stat.value}
              </p>
              <p className="text-[14px] md:text-[15px] text-[#8D969E] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust badges row */}
        <div ref={badgesRef} className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2.5 px-5 py-3 bg-white border border-[#E8E8E8] rounded-full hover:border-[#191C1F]/20 hover:shadow-sm transition-all duration-300"
            >
              <span className="text-[18px]">{badge.icon}</span>
              <span className="text-[14px] font-medium text-[#191C1F] whitespace-nowrap">{badge.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#latest"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#191C1F] text-white text-[16px] font-medium rounded-full hover:bg-[#2d3136] transition-all duration-500"
            style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
          >
            Learn more
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
