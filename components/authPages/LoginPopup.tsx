'use client'

import { motion, AnimatePresence } from 'framer-motion'

type LoginPopupProps = {
  type: 'success' | 'error' | null
  message?: string | null
  setShowPopup: (show: boolean) => void
}

export default function LoginPopup({ type, message, setShowPopup }: LoginPopupProps) {
  const isSuccess = type === 'success'

  const title = isSuccess ? 'Login completato!' : 'Errore durante il login'

  const defaultMessage = isSuccess
    ? 'Benvenuto di nuovo! Sei stato loggato con successo.'
    : 'Qualcosa è andato storto. Riprova tra qualche minuto.'

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm"
        onClick={() => setShowPopup(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <motion.div
          key="popup"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`relative flex w-full max-w-sm flex-col gap-8 rounded-2xl border border-solid border-gray-200 bg-white px-8 py-10 shadow-xl`}
        >
          <div className="flex flex-col gap-5 text-center">
            <h2
              className={`text-xl font-semibold ${
                isSuccess ? 'text-brand-main' : 'text-myRed-500'
              }`}
            >
              {title}
            </h2>
            <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
              {message || defaultMessage}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setShowPopup(false)}
              className={`rounded-lg px-5 py-2 font-medium text-white transition-all duration-300 ease-in-out ${
                isSuccess
                  ? 'bg-brand-main hover:bg-brand-600 focus:ring-brand-300 focus:ring-2'
                  : 'bg-myRed-500 hover:bg-myRed-700 focus:ring-myRed-300 focus:ring-2'
              } `}
            >
              Chiudi
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
