import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Global route transition feedback: a thin progress bar plus a branded
 * "lab logistics" overlay while a route (or its data) is loading.
 */
export function RouteProgress() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowOverlay(false);
      return;
    }
    const t = setTimeout(() => setShowOverlay(true), 180);
    return () => clearTimeout(t);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="bar"
            className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-secondary"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 0.9, transition: { duration: 1.4, ease: "easeOut" } }}
            exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.25 } }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[99] flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LabLoader />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function LabLoader({ label = "Preparing your lab data" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-secondary/25"
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-t-secondary border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
        <motion.span
          className="material-symbols-outlined filled text-secondary"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          science
        </motion.span>
      </div>
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-secondary"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
      <p className="eyebrow">{label}</p>
    </div>
  );
}
