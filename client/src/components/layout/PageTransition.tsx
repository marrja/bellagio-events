import { motion } from 'framer-motion'

/**
 * Framer Motion page-transition wrapper.
 * 500ms fade + Y translate (+16px → 0), ease-out — per the motion spec.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  )
}

export default PageTransition
