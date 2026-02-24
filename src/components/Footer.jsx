import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LINKS = {
  News: ['Latest', 'Breaking', 'World', 'Local', 'Analysis', 'Opinion'],
  Topics: ['Technology', 'Business', 'Science', 'Health', 'Sports', 'Culture'],
  Media: ['Videos', 'Podcasts', 'Photo Gallery', 'Infographics', 'Live TV'],
  Company: ['About', 'Careers', 'Press', 'Ethics', 'Contact'],
}

export default function Footer() {
  const footerRef = useRef(null)
  const colsRef = useRef(null)

  useEffect(() => {
    if (colsRef.current) {
      gsap.fromTo(colsRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' } }
      )
    }
  }, [])

  return (
    <footer ref={footerRef} style={{ backgroundColor: '#191C1F' }}>
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-10">
        {/* Top row: brand + links */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <span className="text-[22px] font-semibold text-white tracking-tight">FlavorNews</span>
            <p className="text-[14px] text-[#8D969E] mt-3 leading-relaxed max-w-[260px]">
              Fearless journalism for a changing world. Independent, accurate, and always on.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {['𝕏', 'f', '▶', 'in'].map((icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#8D969E] hover:text-white text-[13px] font-bold transition-all duration-300">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div ref={colsRef} className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[14px] font-semibold text-white mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-[14px] text-[#8D969E] hover:text-white transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom - Revolut style */}
        <div className="pt-8 border-t border-white/5">
          {/* Second bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <span className="text-[22px] font-semibold text-white/10 tracking-tight">FlavorNews</span>
            <div className="flex items-center gap-4">
              {['Facebook', 'Instagram', 'X', 'LinkedIn', 'TikTok'].map(s => (
                <a key={s} href="#" className="text-[13px] text-[#8D969E] hover:text-white transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {['Website Terms', 'Legal', 'Privacy', 'Cookie Settings'].map(link => (
                <a key={link} href="#" className="text-[13px] text-[#8D969E] hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
            <p className="text-[13px] text-[#8D969E]">© FlavorNews 2026</p>
          </div>

          {/* Disclaimer text like Revolut */}
          <p className="text-[12px] text-[#8D969E]/60 mt-8 leading-relaxed max-w-4xl">
            FlavorNews is a digital publication providing news, analysis, and opinion content. 
            All articles are independently reported and fact-checked. Views expressed in opinion 
            pieces are those of the authors and do not necessarily represent the views of FlavorNews. 
            For corrections or concerns, please contact our editorial team.
          </p>
        </div>
      </div>
    </footer>
  )
}
