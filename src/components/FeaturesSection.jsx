import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { title: 'Personalized Feed', desc: 'AI-curated stories matching your interests. Never miss what matters.', icon: '📱' },
  { title: 'Real-time Alerts', desc: 'Breaking news notifications delivered the moment stories break.', icon: '⚡' },
  { title: 'Offline Reading', desc: 'Download stories to read anywhere — even without internet.', icon: '📖' },
]

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const ctaRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    gsap.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%' } }
    )

    gsap.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 78%' } }
    )

    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' } }
      )
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Centered header - like Revolut's "Your salary, reimagined" */}
        <div className="text-center mb-6">
          <h2 ref={titleRef} className="text-[36px] md:text-[48px] font-medium text-[#191C1F] leading-[1.1] tracking-[-0.02em]">
            Your news, reimagined
          </h2>
          <p className="text-[17px] text-[#8D969E] mt-4 max-w-xl mx-auto leading-relaxed">
            Read smarter, stay informed, and never miss a story that matters — all with FlavorNews.
          </p>
        </div>

        <div className="text-center mb-14" ref={ctaRef}>
          <a href="#subscribe"
            className="inline-flex items-center px-7 py-3.5 bg-[#191C1F] text-white text-[16px] font-medium rounded-full hover:bg-[#2d3136] transition-all duration-500"
            style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}>
            Get started
          </a>
        </div>

        {/* 3 cards like Revolut's salary section */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group bg-[#F7F7F7] rounded-[20px] p-6 md:p-8 cursor-pointer card-lift"
            >
              {/* Image/icon area */}
              <div className="w-full aspect-[4/3] rounded-[14px] overflow-hidden mb-5 bg-white flex items-center justify-center">
                <span className="text-[64px]">{f.icon}</span>
              </div>

              {/* Info chip at bottom - like Revolut's transaction preview */}
              <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4B8BCB]/10 flex items-center justify-center shrink-0">
                  <span className="text-[14px]">{f.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-[#191C1F]">{f.title}</p>
                  <p className="text-[12px] text-[#8D969E] truncate">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
