import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Headline words stagger in
    const words = headlineRef.current.querySelectorAll('.word')
    tl.fromTo(words,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power2.out' }
    )

    // Subtitle
    tl.fromTo(subRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.4'
    )

    // CTA
    tl.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )

    // Cards slide up
    if (cardsRef.current) {
      tl.fromTo(cardsRef.current.children,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power2.out' },
        '-=0.5'
      )
    }

    // Parallax on scroll
    gsap.to(sectionRef.current, {
      backgroundPositionY: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  const headline = 'Change the way you read news'

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: '#4B8BCB' }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-[140px] pb-[60px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h1
              ref={headlineRef}
              className="text-[48px] sm:text-[56px] md:text-[72px] lg:text-[80px] font-medium text-white leading-[1] tracking-[-0.02em] mb-6"
            >
              {headline.split(' ').map((word, i) => (
                <span key={i} className="word inline-block mr-[0.22em]">
                  {word}
                </span>
              ))}
            </h1>

            <p
              ref={subRef}
              className="text-[17px] md:text-[19px] text-white/80 leading-[1.5] max-w-[420px] mb-8"
            >
              From breaking stories to deep analysis — stay informed with trusted journalism, delivered in real-time. Start reading for free.
            </p>

            <div ref={ctaRef}>
              <a
                href="#latest"
                className="inline-flex items-center px-7 py-3.5 bg-[#191C1F] text-white text-[16px] font-medium rounded-full hover:bg-[#2d3136] transition-all duration-500"
                style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
              >
                Start reading
              </a>
            </div>
          </div>

          {/* Right: Revolut-style cards stack */}
          <div ref={cardsRef} className="hidden lg:flex gap-4 justify-end">
            {/* Card 1 */}
            <div className="w-[200px] bg-white rounded-[20px] overflow-hidden shadow-lg shadow-black/10">
              <div className="h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-[12px] text-[#8D969E]">Technology</p>
                <p className="text-[14px] font-medium text-[#191C1F] mt-1 leading-tight">AI reshapes global newsrooms</p>
              </div>
              <div className="mx-4 mb-4 px-3 py-2.5 bg-[#F7F7F7] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#4B8BCB] flex items-center justify-center">
                    <span className="text-white text-[10px]">🔔</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#191C1F]">Breaking</p>
                    <p className="text-[10px] text-[#8D969E]">Just now</p>
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-[#191C1F]">Live</p>
              </div>
            </div>

            {/* Card 2 - taller, centered */}
            <div className="w-[220px] bg-white rounded-[20px] overflow-hidden shadow-lg shadow-black/10 -mt-4">
              <div className="h-[240px] overflow-hidden bg-[#4B8BCB] relative">
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80" alt="" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <p className="text-[12px] opacity-70">Breaking</p>
                  <p className="text-[28px] font-semibold mt-1">24/7</p>
                  <p className="text-[13px] mt-1 px-4 py-1 bg-white/20 rounded-full">Coverage</p>
                </div>
              </div>
              <div className="mx-4 my-4 px-3 py-2.5 bg-[#F7F7F7] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                    <span className="text-white text-[10px]">✓</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#191C1F]">Subscribed</p>
                    <p className="text-[10px] text-[#8D969E]">Today, 08:00</p>
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-[#22C55E]">Active</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-[200px] bg-white rounded-[20px] overflow-hidden shadow-lg shadow-black/10 mt-4">
              <div className="h-[200px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-[12px] text-[#8D969E]">Science</p>
                <p className="text-[14px] font-medium text-[#191C1F] mt-1 leading-tight">Deep space signals decoded</p>
              </div>
              <div className="mx-4 mb-4 px-3 py-2.5 bg-[#F7F7F7] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#6366F1] flex items-center justify-center">
                    <span className="text-white text-[10px]">🔬</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#191C1F]">Trending</p>
                    <p className="text-[10px] text-[#8D969E]">2 min ago</p>
                  </div>
                </div>
                <p className="text-[11px] font-semibold text-[#6366F1]">+2.4K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
