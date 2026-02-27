import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './components/Hero'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500)
    return () => { clearTimeout(timer); ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <div className="overflow-x-hidden">
      <Hero />
    </div>
  )
}
