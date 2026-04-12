import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const MotionImg = motion.img

function MediaFrame({
  alt,
  className = '',
  imageClassName = '',
  overlay = true,
  parallax = true,
  src,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ['-7%', '7%'] : ['0%', '0%'])

  return (
    <div className={['media-frame', className].filter(Boolean).join(' ')} ref={ref}>
      <MotionImg
        alt={alt}
        className={['media-frame__image', imageClassName].filter(Boolean).join(' ')}
        src={src}
        style={{ scale: parallax ? 1.12 : 1, y }}
      />
      {overlay ? <div aria-hidden="true" className="media-frame__overlay" /> : null}
    </div>
  )
}

export default MediaFrame
