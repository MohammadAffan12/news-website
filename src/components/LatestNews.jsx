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
      </div>
      <div className="mt-4">
        <span className="text-[13px] text-[#8D969E] font-medium">{article.category}</span>
        <h3 className={`font-medium text-[#191C1F] leading-[1.25] mt-1.5 group-hover:text-[#4B8BCB] transition-colors duration-300 ${
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

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
    )
  }, [])

  return (
    <section id="latest" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header - Revolut style */}
        <div ref={titleRef} className="mb-12">
          <h2 className="text-[36px] md:text-[48px] font-medium text-[#191C1F] leading-[1.1] tracking-[-0.02em]">
            Your daily briefing,<br />reimagined
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ARTICLES.map((a, i) => (
            <NewsCard key={a.id} article={a} index={i} large={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
