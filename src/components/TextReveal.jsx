import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import clsx from 'clsx'

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function TextReveal({
  text,
  className,
  delay = 0,
  split = 'word',
  elementType: Element = 'div',
  staggerDuration = 0.04
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  let items = []
  if (split === 'word') {
    items = text.split(' ')
  } else if (split === 'char') {
    items = text.split('')
  } else if (split === 'line') {
    items = text.split('\n')
  }

  return (
    <Element ref={ref} className={clsx('relative', className)}>
      <motion.span
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          visible: {
            transition: {
              staggerChildren: staggerDuration,
              delayChildren: delay,
            },
          },
          hidden: {},
        }}
        className={clsx('flex flex-wrap', split === 'char' ? 'gap-0' : 'gap-[0.25em]', split === 'line' ? 'flex-col gap-0' : '')}
      >
        {items.map((item, index) => (
          <span key={index} className="overflow-hidden inline-flex">
            <motion.span className="inline-block" variants={wordAnimation}>
              {item === ' ' ? '\u00A0' : item}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Element>
  )
}

export default TextReveal
