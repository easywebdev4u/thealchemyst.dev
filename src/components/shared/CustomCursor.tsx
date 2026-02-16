"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsMobile(!mq.matches);
    if (!mq.matches) return;

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", () => setIsClicking(true));
    window.addEventListener("mouseup", () => setIsClicking(false));

    const onHover = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    const observe = () => {
      document
        .querySelectorAll("a, button, [data-hover]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onHover);
          el.addEventListener("mouseleave", onLeave);
        });
    };
    observe();
    const observer = new MutationObserver(observe);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, [onMouseMove]);

  if (isMobile) return null;

  return (
    <>
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : isClicking ? 12 : 20,
            height: isHovering ? 48 : isClicking ? 12 : 20,
            borderRadius: "50%",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </>
  );
}
