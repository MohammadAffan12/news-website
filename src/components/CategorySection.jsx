import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CATEGORIES } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function CategorySection() {
  const titleRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
    )

    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' } }
      )
    }
  }, [])

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#191C1F' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={titleRef} className="mb-12">
          <h2 className="text-[36px] md:text-[48px] font-medium text-white leading-[1.1] tracking-[-0.02em]">
            Explore 10,000+ stories
          </h2>
          <p className="text-[17px] text-[#8D969E] mt-4 max-w-xl">
            From global markets to cultural movements — dive into the topics that matter most to you.
          </p>
        </div>

        {/* Revolut-style white cards on dark bg */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="group bg-white rounded-[20px] p-6 cursor-pointer card-lift"
            >
              <div className="text-[36px] mb-4">{cat.icon}</div>
              <h3 className="text-[20px] font-semibold text-[#191C1F] mb-2">{cat.name}</h3>
              <p className="text-[14px] text-[#8D969E] leading-relaxed mb-6">{cat.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#8D969E] font-medium">{cat.count} articles</span>
                {/* Arrow - Revolut style */}
                <div className="w-8 h-8 rounded-full bg-[#F7F7F7] flex items-center justify-center group-hover:bg-[#191C1F] transition-colors duration-300">
                  <svg className="w-4 h-4 text-[#191C1F] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
