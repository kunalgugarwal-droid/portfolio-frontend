import { motion } from 'framer-motion'

const offsets = {
  up: { x: 0, y: 64 },
  down: { x: 0, y: -64 },
  left: { x: 64, y: 0 },
  right: { x: -64, y: 0 },
}

const MotionDiv = motion.div

function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}) {
  const offset = offsets[direction] ?? offsets.up

  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, ...offset }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ amount: 0.2, once }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
    >
      {children}
    </MotionDiv>
  )
}

export default Reveal
