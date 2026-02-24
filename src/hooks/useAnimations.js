import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Revolut's easing
const EASE = 'power2.out'

export function useReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const { y = 40, duration = 0.9, delay = 0, start = 'top 85%' } = options
    gsap.set(el, { y, opacity: 0 })
    const tw = gsap.to(el, {
      y: 0, opacity: 1, duration, delay, ease: EASE,
      scrollTrigger: { trigger: el, start, toggleActions: 'play none none none' },
    })
    return () => { tw.kill() }
  }, [])
  return ref
}

export function useStagger(stagger = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !el.children.length) return
    gsap.set(el.children, { y: 40, opacity: 0 })
    const tw = gsap.to(el.children, {
      y: 0, opacity: 1, duration: 0.8, stagger, ease: EASE,
      scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
    })
    return () => { tw.kill() }
  }, [])
  return ref
}

export function useParallax(speed = -0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const tw = gsap.to(el, {
      yPercent: speed * 100, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    })
    return () => { tw.kill() }
  }, [])
  return ref
}
