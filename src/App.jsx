import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BreakingTicker from './components/BreakingTicker'
import FeaturesSection from './components/FeaturesSection'
import LatestNews from './components/LatestNews'
import FeaturedVideo from './components/FeaturedVideo'
import TrustSection from './components/TrustSection'
import ImageGallery from './components/ImageGallery'
import CategorySection from './components/CategorySection'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Refresh after all images + layout settle
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500)
    return () => { clearTimeout(timer); ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <BreakingTicker />
      <FeaturesSection />
      <LatestNews />
      <FeaturedVideo />
      <TrustSection />
      <ImageGallery />
      <CategorySection />
      <Newsletter />
      <Footer />
    </div>
  )
}
