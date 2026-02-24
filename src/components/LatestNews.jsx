import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NEWS_ARTICLES } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

function NewsCard({ article, index, large }) {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, delay: index * 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', toggleActions: 'play none none none' },
      }
    )
  }, [index])

  return (
    <article ref={ref} className={`group cursor-pointer ${large ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <div className={`relative overflow-hidden rounded-[20px] bg-[#F7F7F7] ${large ? 'aspect-[16/11]' : 'aspect-[16/11]'}`}>
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105"
          style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)', transitionDuration: '0.8s' }}
        />
        {/* Category badge overlay */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[12px] font-semibold text-[#191C1F]">
            {article.category}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className={`font-medium text-[#191C1F] leading-[1.25] group-hover:text-[#4B8BCB] transition-colors duration-300 ${
          large ? 'text-[24px] md:text-[28px]' : 'text-[18px]'
        }`}>
          {article.title}
        </h3>
        {large && (
          <p className="text-[15px] text-[#8D969E] mt-2 line-clamp-2 leading-relaxed">{article.excerpt}</p>
        )}
        <div className="flex items-center gap-2 mt-3 text-[13px] text-[#8D969E]">
          <span>{article.date}</span>
          <span className="w-1 h-1 bg-[#D4D4D4] rounded-full" />
          <span>{article.readTime}</span>
        </div>
      </div>
    </article>
  )
}

export default function LatestNews() {
  const titleRef = useRef(null)
  const seeAllRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
    )
    gsap.fromTo(seeAllRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
    )
  }, [])

  return (
    <section id="latest" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div ref={titleRef}>
            <h2 className="text-[36px] md:text-[52px] font-medium text-[#191C1F] leading-[1.08] tracking-[-0.025em]">
              Your daily briefing,<br />reimagined
            </h2>
          </div>
          <a ref={seeAllRef} href="#"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[15px] font-medium text-[#191C1F] rounded-full border border-[#E8E8E8] hover:bg-[#F7F7F7] transition-all duration-300"
            style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}>
            See all stories
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Top row: featured + 2 side articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {NEWS_ARTICLES.slice(0, 3).map((a, i) => (
            <NewsCard key={a.id} article={a} index={i} large={i === 0} />
          ))}
        </div>

        {/* Bottom row: 3 smaller articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {NEWS_ARTICLES.slice(3, 6).map((a, i) => (
            <NewsCard key={a.id} article={a} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  )
}
