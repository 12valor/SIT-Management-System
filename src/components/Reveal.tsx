"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Sensible bottom-only margin so it triggers when the top of the element enters the viewport,
  // even if the element is taller than the viewport.
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  // Impeccable Motion Law: Exponential Ease-Out
  const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.8, 
        delay, 
        ease: EASE_EXPO,
        opacity: { duration: 1.0 }
      }}
    >
      {children}
    </motion.div>
  );
}
