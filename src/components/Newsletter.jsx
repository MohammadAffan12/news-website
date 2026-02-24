import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LOGOS = ['Reuters', 'AP News', 'BBC', 'CNN', 'Bloomberg', 'WSJ']

export default function Newsletter() {
  const ref = useRef(null)
  const contentRef = useRef(null)
  const logosRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' } }
      )
      if (logosRef.current) {
        gsap.fromTo(logosRef.current.children,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: logosRef.current, start: 'top 88%' } }
        )
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="subscribe" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={contentRef} className="text-center max-w-2xl mx-auto">
          <h2 className="text-[36px] md:text-[52px] font-medium text-[#191C1F] leading-[1.08] tracking-[-0.025em] mb-4">
            Join the 10 million+<br />reading FlavorNews
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#8D969E] leading-relaxed mb-10">
            Get the most important stories delivered to your inbox every morning. 
            Trusted by professionals and curious minds worldwide.
          </p>

          <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-full border border-[#E8E8E8] text-[15px] text-[#191C1F] placeholder-[#8D969E] focus:outline-none focus:border-[#191C1F] transition-colors duration-300"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-[#191C1F] text-white text-[15px] font-medium rounded-full hover:bg-[#2d3136] transition-all duration-500 shrink-0"
              style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
            >
              Subscribe
            </button>
          </form>

          <p className="text-[13px] text-[#8D969E] mb-16">
            Free to subscribe · Unsubscribe anytime · No spam, ever
          </p>
        </div>

        {/* "As featured in" logos - Revolut style */}
        <div className="text-center">
          <p className="text-[13px] text-[#8D969E] font-medium uppercase tracking-widest mb-8">Trusted by journalists at</p>
          <div ref={logosRef} className="flex items-center justify-center flex-wrap gap-8 md:gap-14">
            {LOGOS.map((name) => (
              <span key={name} className="text-[18px] md:text-[20px] font-semibold text-[#D4D4D4] hover:text-[#8D969E] transition-colors duration-300 cursor-default">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
