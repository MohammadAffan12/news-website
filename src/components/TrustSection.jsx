import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TrustSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    gsap.fromTo(textRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 70%' } }
    )

    gsap.fromTo(imageRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 70%' } }
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text - left side like Revolut's "Your money's safe space" */}
          <div ref={textRef}>
            <h2 className="text-[36px] md:text-[48px] font-medium text-[#191C1F] leading-[1.1] tracking-[-0.02em] mb-5">
              Your trusted<br />news source
            </h2>
            <p className="text-[17px] text-[#8D969E] leading-relaxed mb-8 max-w-md">
              With FlavorNews, you're getting award-winning journalism backed by rigorous 
              fact-checking and editorial independence. Trusted by millions worldwide, 24/7.
            </p>
            <a
              href="#latest"
              className="inline-flex items-center px-7 py-3.5 bg-[#191C1F] text-white text-[16px] font-medium rounded-full hover:bg-[#2d3136] transition-all duration-500"
              style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
            >
              Learn more
            </a>
          </div>

          {/* Right side - shield style image like Revolut */}
          <div ref={imageRef} className="flex justify-center">
            <div className="relative">
              {/* Shield/badge */}
              <div className="w-[280px] h-[320px] md:w-[340px] md:h-[380px] bg-gradient-to-b from-[#E8E8E8] to-[#D4D4D4] rounded-[32px] flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] mx-auto bg-white rounded-[24px] flex items-center justify-center shadow-lg mb-6">
                    <span className="text-[48px] md:text-[56px] font-bold text-[#191C1F]">FN</span>
                  </div>
                  <p className="text-[16px] font-semibold text-[#191C1F]">Verified Source</p>
                  <p className="text-[13px] text-[#8D969E] mt-1">Fact-checked · Independent</p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-white rounded-full shadow-lg text-[12px] font-semibold text-[#191C1F] border border-[#E8E8E8]">
                ✓ Pulitzer Prize
              </div>
              <div className="absolute -bottom-3 -left-3 px-3 py-1.5 bg-white rounded-full shadow-lg text-[12px] font-semibold text-[#191C1F] border border-[#E8E8E8]">
                ⭐ Trusted by 10M+
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
