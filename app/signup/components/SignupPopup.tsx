"use client";

import { motion, AnimatePresence } from "framer-motion";

type SignupPopupProps = {
  type: "success" | "error" | null;
  message?: string | null;
  setShowPopup: (show: boolean) => void;
};

export default function SignupPopup({ type, message, setShowPopup }: SignupPopupProps) {
  const isSuccess = type === "success";

  const title = isSuccess
    ? "Registrazione completata!"
    : "Errore durante la registrazione";

  const defaultMessage = isSuccess
    ? "Ti abbiamo inviato una mail di conferma. Segui il link per accedere al tuo nuovo profilo!"
    : "Qualcosa è andato storto. Riprova tra qualche minuto.";

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={() => setShowPopup(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <motion.div
          key="popup"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl 
            ${isSuccess ? "border border-green-400" : "border border-red-400"}
          `}
        >
          {/* Icona circolare sopra il box */}
          <div
            className={`absolute -top-8 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-full shadow-md
              ${isSuccess ? "bg-green-500" : "bg-red-500"}
            `}
          >
            {isSuccess ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          <div className="pt-8 text-center">
            <h2
              className={`text-xl font-semibold mb-2 ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}
            >
              {title}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {message || defaultMessage}
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowPopup(false)}
              className={`rounded-lg px-5 py-2 font-medium text-white shadow-md transition 
                ${isSuccess
                  ? "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300"
                  : "bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-300"}
              `}
            >
              Chiudi
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
