import { motion } from 'framer-motion'

const MotionDiv = motion.div

function RevealOnScroll({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.6,
}) {
  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </MotionDiv>
  )
}

export default RevealOnScroll
