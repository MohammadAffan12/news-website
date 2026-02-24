import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AppPromo() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const phoneRef = useRef(null)
  const badgesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )

      gsap.fromTo(phoneRef.current,
        { y: 60, opacity: 0, rotateY: -8 },
        { y: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' } }
      )

      if (badgesRef.current) {
        gsap.fromTo(badgesRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: badgesRef.current, start: 'top 85%' } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#F7F7F7' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text */}
          <div ref={textRef}>
            <h2 className="text-[36px] md:text-[52px] font-medium text-[#191C1F] leading-[1.08] tracking-[-0.025em] mb-5">
              News at your<br />fingertips
            </h2>
            <p className="text-[17px] md:text-[19px] text-[#8D969E] leading-relaxed mb-8 max-w-md">
              Download the FlavorNews app and get personalized breaking news, 
              real-time alerts, and offline reading — all in one beautiful experience.
            </p>

            {/* App store badges */}
            <div ref={badgesRef} className="flex flex-wrap gap-3 mb-10">
              <a href="#" className="inline-flex items-center gap-3 px-5 py-3 bg-[#191C1F] rounded-[14px] hover:bg-[#2d3136] transition-all duration-300 group">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-[10px] text-white/60 leading-none">Download on the</p>
                  <p className="text-[15px] font-semibold text-white leading-tight">App Store</p>
                </div>
              </a>
              <a href="#" className="inline-flex items-center gap-3 px-5 py-3 bg-[#191C1F] rounded-[14px] hover:bg-[#2d3136] transition-all duration-300 group">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.72c-.36-.18-.68-.5-.77-.94-.09-.44-.09-1.17-.09-1.17V2.39s0-.73.09-1.17c.09-.44.41-.76.77-.94L14.46 12 3.18 23.72zm15.5-8.33l-3.38-1.97L18.7 12l-3.4-1.42 3.38-1.97 2.5 1.46c1.4.82 1.4 2.04 0 2.86l-2.5 1.46zM4.69 1.03L15.15 12 4.69 22.97l10.2-5.94L5.82 12l9.07-5.03-10.2-5.94z"/>
                </svg>
                <div>
                  <p className="text-[10px] text-white/60 leading-none">Get it on</p>
                  <p className="text-[15px] font-semibold text-white leading-tight">Google Play</p>
                </div>
              </a>
            </div>

            {/* Feature list */}
            <div className="space-y-4">
              {[
                { label: 'Free to download', sub: 'No hidden costs, ever' },
                { label: 'Works offline', sub: 'Save stories for later' },
                { label: 'Rated 4.9 stars', sub: 'On both App Store & Google Play' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#22C55E]/10 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[15px] font-medium text-[#191C1F]">{item.label}</span>
                    <span className="text-[14px] text-[#8D969E] ml-2">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div ref={phoneRef} className="flex justify-center md:justify-end" style={{ perspective: '1000px' }}>
            <div className="relative w-[280px] md:w-[320px]">
              {/* Phone frame */}
              <div className="bg-[#191C1F] rounded-[40px] p-3 shadow-2xl shadow-black/20">
                {/* Screen */}
                <div className="bg-white rounded-[32px] overflow-hidden">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pt-3 pb-2">
                    <span className="text-[11px] font-semibold text-[#191C1F]">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2.5 border border-[#191C1F] rounded-sm relative">
                        <div className="absolute inset-0.5 bg-[#22C55E] rounded-[1px]" />
                      </div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="px-5 pt-2 pb-4">
                    <p className="text-[20px] font-semibold text-[#191C1F]">Good morning</p>
                    <p className="text-[13px] text-[#8D969E] mt-0.5">Monday, Feb 24</p>
                  </div>

                  {/* Featured card */}
                  <div className="mx-4 mb-3">
                    <div className="relative rounded-[16px] overflow-hidden aspect-[16/10]">
                      <img
                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="px-2 py-0.5 bg-[#EF4444] text-white text-[9px] font-bold rounded uppercase">Breaking</span>
                        <p className="text-[13px] font-semibold text-white mt-1 leading-tight">AI Revolution reshapes global newsrooms</p>
                      </div>
                    </div>
                  </div>

                  {/* Mini news list */}
                  <div className="px-4 space-y-3 pb-6">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-[10px] bg-[#F7F7F7] shrink-0 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&q=80" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-[#191C1F] leading-tight truncate">Global data protection standards</p>
                        <p className="text-[10px] text-[#8D969E] mt-0.5">Cybersecurity · 4 min</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-[10px] bg-[#F7F7F7] shrink-0 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&q=80" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-[#191C1F] leading-tight truncate">Deep space signal stuns researchers</p>
                        <p className="text-[10px] text-[#8D969E] mt-0.5">Science · 6 min</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center opacity-60">
                      <div className="w-12 h-12 rounded-[10px] bg-[#F7F7F7] shrink-0 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&q=80" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-[#191C1F] leading-tight truncate">Startup funding hits $240B record</p>
                        <p className="text-[10px] text-[#8D969E] mt-0.5">Business · 4 min</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-[120px] h-[4px] bg-white/20 rounded-full" />
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -top-4 -right-6 md:-right-10 bg-white rounded-[14px] p-3 shadow-xl shadow-black/10 border border-[#E8E8E8] w-[180px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#4B8BCB] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">FN</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#191C1F]">FlavorNews</span>
                  <span className="text-[9px] text-[#8D969E] ml-auto">now</span>
                </div>
                <p className="text-[11px] text-[#191C1F] leading-tight">Breaking: AI governance framework ratified by 45 nations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
