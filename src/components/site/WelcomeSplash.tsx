import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "livan-welcomed";

/**
 * Branded welcome animation shown on the first visit of a session:
 * the Livan logo assembles, a welcome message types in, then the
 * overlay lifts away to reveal the site.
 */
export function WelcomeSplash() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-primary px-6 text-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <motion.div
            className="absolute inset-0 bg-grid-fade opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.8 }}
          />

          <motion.div
            className="relative flex h-28 w-28 items-center justify-center rounded-2xl bg-primary-foreground/95 p-3 shadow-2xl"
            initial={{ scale: 0.7, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="absolute inset-0 rounded-2xl border-2 border-secondary/60"
              animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <img
              src="/livan-logo.png"
              alt="Livan Lab Supplies Uganda Limited logo"
              className="h-full w-full object-contain"
            />
          </motion.div>

          <motion.h1
            className="relative mt-8 max-w-xl text-2xl font-bold text-primary-foreground md:text-3xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Welcome to Livan Lab Supplies Uganda Limited
          </motion.h1>
          <motion.p
            className="relative mt-3 max-w-md text-sm text-primary-foreground/75"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Laboratory, diagnostic and scientific solutions delivered across Uganda and East Africa.
          </motion.p>

          <motion.div
            className="relative mt-8 h-0.5 w-40 overflow-hidden rounded-full bg-primary-foreground/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span
              className="block h-full w-full origin-left bg-secondary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
