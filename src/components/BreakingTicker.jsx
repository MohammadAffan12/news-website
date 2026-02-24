import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const HEADLINES = [
  '🔴 AI governance framework ratified by 45 nations',
  '⚡ Quantum computing breaks encryption records',
  '🌍 Climate accord targets net-zero by 2035',
  '📈 Global markets surge on tech earnings',
  '🚀 Mars crew selection enters final phase',
  '🏛️ Historic trade pact reshapes Pacific bloc',
]

export default function BreakingTicker() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const totalWidth = track.scrollWidth / 2
    gsap.to(track, { x: -totalWidth, duration: 35, ease: 'none', repeat: -1 })
  }, [])

  const items = [...HEADLINES, ...HEADLINES]

  return (
    <div className="bg-white border-b border-[#E8E8E8] py-3.5 overflow-hidden">
      <div ref={trackRef} className="flex gap-10 whitespace-nowrap">
        {items.map((h, i) => (
          <span key={i} className="text-[14px] text-[#8D969E] font-medium shrink-0 flex items-center gap-3">
            {h}
            <span className="w-1 h-1 bg-[#E8E8E8] rounded-full" />
          </span>
        ))}
      </div>
    </div>
  )
}
