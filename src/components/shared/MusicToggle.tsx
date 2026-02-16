"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      // Placeholder audio source — replace with a royalty-free lo-fi audio file URL
      // e.g. "https://assets.thealchemyst.dev/lofi-ambient.mp3"
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      // audioRef.current.src = "https://assets.thealchemyst.dev/lofi-ambient.mp3";
    }

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked — user will need to click again
      });
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-surface border border-surface-border text-foreground/60 hover:text-accent hover:border-accent/30 transition-colors"
      aria-label={playing ? "Mute music" : "Play music"}
    >
      {playing ? (
        <Volume2 className="w-4 h-4" />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
      {playing && (
        <motion.span
          className="absolute inset-0 rounded-full border border-accent/30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
