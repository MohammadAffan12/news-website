import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GALLERY_ITEMS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function ImageGallery() {
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
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' } }
      )
    }
  }, [])

  const sizes = [
    'md:col-span-2 md:row-span-2',
    '',
    '',
    'md:col-span-2',
    '',
    '',
  ]

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={titleRef} className="mb-12">
          <h2 className="text-[36px] md:text-[48px] font-medium text-[#191C1F] leading-[1.1] tracking-[-0.02em]">
            Photo stories
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-[16px] cursor-pointer ${sizes[i] || ''} ${
                i === 0 ? 'aspect-square md:aspect-auto' : i === 3 ? 'aspect-[2/1]' : 'aspect-square'
              }`}
            >
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105"
                style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)', transitionDuration: '0.8s' }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#191C1F]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}>
                <p className="text-white text-[15px] font-medium">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
