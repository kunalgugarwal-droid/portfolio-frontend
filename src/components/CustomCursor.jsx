import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

const DOT_SIZE = 12
const HOVER_SELECTOR =
  'a, button, input, textarea, select, [role="button"], .cursor-hover'

const MotionDiv = motion.div

function shouldEnableCursor() {
  if (typeof window === 'undefined') {
    return false
  }

  const finePointer = window.matchMedia('(pointer: fine)').matches
  const canHover = window.matchMedia('(hover: hover)').matches
  const wideEnough = window.matchMedia('(min-width: 900px)').matches
  const hasTouch =
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0

  return finePointer && canHover && wideEnough && !hasTouch
}

function CustomCursor() {
  const [enabled, setEnabled] = useState(() => shouldEnableCursor())
  const [isHovering, setIsHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springConfig = useMemo(
    () => ({
      damping: 26,
      mass: 0.45,
      stiffness: 260,
    }),
    [],
  )
  const smoothX = useSpring(x, springConfig)
  const smoothY = useSpring(y, springConfig)

  useEffect(() => {
    function handleResize() {
      setEnabled(shouldEnableCursor())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!enabled) {
      return
    }

    let frame = 0
    const handleMove = (event) => {
      if (frame) {
        cancelAnimationFrame(frame)
      }
      const { clientX, clientY } = event
      frame = requestAnimationFrame(() => {
        x.set(clientX - DOT_SIZE / 2)
        y.set(clientY - DOT_SIZE / 2)
      })
    }

    const handleOver = (event) => {
      const target = event.target
      const hoverTarget = target?.closest?.(HOVER_SELECTOR)
      setIsHovering(Boolean(hoverTarget))
    }

    const handleOut = (event) => {
      const related = event.relatedTarget
      if (related && related.closest?.(HOVER_SELECTOR)) {
        return
      }
      setIsHovering(false)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('pointerover', handleOver, true)
    document.addEventListener('pointerout', handleOut, true)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerover', handleOver, true)
      document.removeEventListener('pointerout', handleOut, true)
      if (frame) {
        cancelAnimationFrame(frame)
      }
    }
  }, [enabled, x, y])

  if (!enabled) {
    return null
  }

  return (
    <MotionDiv
      aria-hidden="true"
      className={isHovering ? 'custom-cursor custom-cursor--hover' : 'custom-cursor'}
      style={{
        translateX: smoothX,
        translateY: smoothY,
      }}
    />
  )
}

export default CustomCursor
