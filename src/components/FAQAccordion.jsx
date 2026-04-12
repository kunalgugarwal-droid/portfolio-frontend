import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Reveal from './Reveal.jsx'

const MotionDiv = motion.div

function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <Reveal className="faq-item" delay={index * 0.05} key={item.question}>
            <button
              aria-expanded={isOpen}
              className="faq-item__trigger"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
            >
              <span>{item.question}</span>
              <span className="faq-item__icon">{isOpen ? '-' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <MotionDiv
                  animate={{ height: 'auto', opacity: 1 }}
                  className="faq-item__content"
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{item.answer}</p>
                </MotionDiv>
              ) : null}
            </AnimatePresence>
          </Reveal>
        )
      })}
    </div>
  )
}

export default FAQAccordion
