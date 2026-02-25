import { useEffect, useRef, forwardRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NEWS_ARTICLES } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/*
 * GRID SECTION — 3-column grid with empty middle placeholder
 * The middle column receives the hero image via scroll animation
 */

function GridCard({ article }) {
  return (
    <article className="group cursor-pointer card-lift rounded-[20px] bg-[#F7F7F7] overflow-hidden">
      <div className="relative overflow-hidden aspect-[16/11]">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105"
          style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)', transitionDuration: '0.8s' }}
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[12px] font-semibold text-[#191C1F]">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-[18px] font-medium text-[#191C1F] leading-[1.25] group-hover:text-[#4B8BCB] transition-colors duration-300 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-[14px] text-[#8D969E] mt-2 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 mt-3 text-[13px] text-[#8D969E]">
          <span>{article.date}</span>
          <span className="w-1 h-1 bg-[#D4D4D4] rounded-full" />
          <span>{article.readTime}</span>
        </div>
      </div>
    </article>
  )
}

const GridSection = forwardRef(function GridSection(props, placeholderRef) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Left column: articles 0,1  |  Middle: placeholder  |  Right column: articles 2,3
  const leftArticles = NEWS_ARTICLES.slice(0, 2)
  const rightArticles = NEWS_ARTICLES.slice(2, 4)

  return (
    <section ref={sectionRef} className="grid-section py-24 md:py-32 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section title */}
        <div ref={titleRef} className="mb-14">
          <h2 className="text-[36px] md:text-[52px] font-medium text-[#191C1F] leading-[1.08] tracking-[-0.025em]">
            Your daily briefing,<br />reimagined
          </h2>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-8">
            {leftArticles.map((a) => (
              <GridCard key={a.id} article={a} />
            ))}
          </div>

          {/* MIDDLE COLUMN — empty placeholder for docking image */}
          <div
            ref={placeholderRef}
            className="grid-placeholder hidden lg:block rounded-[24px]"
            style={{
              aspectRatio: '3 / 4',
              /* Subtle dashed border to indicate the dock target (invisible when image arrives) */
            }}
          />

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-8">
            {rightArticles.map((a) => (
              <GridCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default GridSection
