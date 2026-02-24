import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const springConfig = { damping: 25, stiffness: 120, mass: 0.5 }

/**
 * Reusable mouse-parallax hook.
 * Returns { x, y } MotionValues that map cursor position to a
 * translateX / translateY range of ±magnitude px.
 *
 * Automatically disabled on touch-only devices so mobile stays smooth.
 */
export default function useMouseParallax(magnitude = 20) {
  const cursorX = useMotionValue(0.5)
  const cursorY = useMotionValue(0.5)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detect touch-only device once
    const touch = window.matchMedia('(pointer: coarse)').matches
    setIsTouchDevice(touch)
    if (touch) return

    const handleMove = (e) => {
      cursorX.set(e.clientX / window.innerWidth)
      cursorY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [cursorX, cursorY])

  // Map 0-1 cursor range → ± magnitude
  const rawX = useTransform(cursorX, [0, 1], [magnitude, -magnitude])
  const rawY = useTransform(cursorY, [0, 1], [magnitude, -magnitude])

  // Smooth spring physics
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)

  return { x: isTouchDevice ? 0 : x, y: isTouchDevice ? 0 : y, isTouchDevice }
}
