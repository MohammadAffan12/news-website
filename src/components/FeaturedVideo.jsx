import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedVideo() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const videoRef = useRef(null)
  const playRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    // Text
    gsap.fromTo(textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 70%' } }
    )

    // Video card
    gsap.fromTo(videoRef.current,
      { y: 60, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 60%' } }
    )

    // Play button
    gsap.fromTo(playRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: 0.5, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: section, start: 'top 60%' } }
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28" style={{ backgroundColor: '#191C1F' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Text */}
        <div ref={textRef} className="max-w-2xl mb-12">
          <h2 className="text-[36px] md:text-[48px] font-medium text-white leading-[1.1] tracking-[-0.02em] mb-4">
            Elevate your perspective
          </h2>
          <p className="text-[17px] text-[#8D969E] leading-relaxed">
            Immersive video journalism from every corner of the globe. Award-winning 
            documentaries and live coverage, available 24/7.
          </p>
        </div>

        {/* Video thumbnail */}
        <div ref={videoRef} className="relative rounded-[24px] overflow-hidden aspect-video bg-[#2d3136] group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80"
            alt="Featured video"
            loading="lazy"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-[1.03]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)', transitionDuration: '0.8s' }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#191C1F]/60 via-transparent to-[#191C1F]/20" />

          {/* Play button - Revolut style */}
          <div ref={playRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500"
              style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}>
              <svg className="w-6 h-6 md:w-7 md:h-7 text-[#191C1F] ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <div>
              <h3 className="text-[20px] md:text-[24px] font-medium text-white">Inside the AI Revolution</h3>
              <p className="text-[14px] text-white/60 mt-1">Documentary · 42 min</p>
            </div>
            <div className="hidden md:block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-[13px] text-white font-medium border border-white/10">
              Watch now
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
