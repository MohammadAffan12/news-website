import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const LINKS = ['Latest', 'Politics', 'Business', 'Tech', 'Science', 'Culture']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    // Entry animation
    gsap.fromTo(navRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 })

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0.5">
          <span className={`text-[22px] font-semibold tracking-tight transition-colors duration-500 ${scrolled ? 'text-[#191C1F]' : 'text-white'}`}>
            Flavor
          </span>
          <span className={`text-[22px] font-semibold tracking-tight transition-colors duration-500 ${scrolled ? 'text-[#191C1F]' : 'text-white'}`}>
            News
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`px-4 py-2 text-[15px] font-medium rounded-full transition-all duration-300 ${
                scrolled
                  ? 'text-[#191C1F] hover:bg-[#F4F4F4]'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className={`hidden md:block px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${
              scrolled ? 'text-[#191C1F]' : 'text-white/90'
            }`}
          >
            Log in
          </a>
          <a
            href="#subscribe"
            className={`hidden md:flex items-center px-5 py-2.5 text-[15px] font-medium rounded-full transition-all duration-500 ${
              scrolled
                ? 'bg-[#191C1F] text-white hover:bg-[#2d3136]'
                : 'bg-white text-[#191C1F] hover:bg-[#F4F4F4]'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)' }}
          >
            Sign up
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          >
            <span className={`block w-5 h-[1.5px] rounded-full transition-all duration-300 ${scrolled ? 'bg-[#191C1F]' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] rounded-full transition-all duration-300 ${scrolled ? 'bg-[#191C1F]' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] rounded-full transition-all duration-300 ${scrolled ? 'bg-[#191C1F]' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-white`}
        style={{
          maxHeight: menuOpen ? '400px' : '0px',
          transitionTimingFunction: 'cubic-bezier(0.35, 0, 0, 1)',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-[#191C1F] text-[16px] font-medium hover:bg-[#F7F7F7] rounded-xl transition-colors">
              {link}
            </a>
          ))}
          <div className="flex gap-3 mt-3">
            <a href="#" className="flex-1 text-center py-3 text-[15px] font-medium text-[#191C1F] rounded-full border border-[#E8E8E8]">Log in</a>
            <a href="#subscribe" className="flex-1 text-center py-3 text-[15px] font-medium bg-[#191C1F] text-white rounded-full">Sign up</a>
          </div>
        </div>
      </div>
    </header>
  )
}
