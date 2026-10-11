"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

function subscribePointer(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  if (typeof window === "undefined") return false;
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  return isFinePointer && !prefersReduced;
}

function getPointerServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const isEnabled = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getPointerServerSnapshot
  );

  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for cinematic cursor lag
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (target) {
        const text = target.getAttribute("data-cursor") || "View";
        setCursorText(text);
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isEnabled, mouseX, mouseY]);

  if (!isEnabled) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center font-serif text-xs font-semibold rounded-full text-[#E0A030] tracking-wider uppercase backdrop-blur-xs transition-colors duration-200"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovered ? 68 : 12,
        height: isHovered ? 68 : 12,
        backgroundColor: isHovered
          ? "rgba(14, 27, 26, 0.92)"
          : "rgba(224, 160, 48, 0.75)",
        borderColor: isHovered ? "#E0A030" : "transparent",
        borderWidth: isHovered ? 1 : 0,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      aria-hidden="true"
    >
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="select-none"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
