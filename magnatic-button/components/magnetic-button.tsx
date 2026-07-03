"use client";
import React, { useState, useRef } from "react";
import { motion } from "motion/react";

export const MagneticButton = ({
  children = "Magnetic Button",
  strength = 0.8,
  maxDistance = 100,
}: {
  children: React.ReactNode;
  strength?: number;
  maxDistance?: number;
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    let x = (clientX - (left + width / 2)) * strength;
    let y = (clientY - (top + height / 2)) * strength;

    const distance = Math.hypot(x, y);
    if (distance > maxDistance) {
      const scale = maxDistance / distance;
      x *= scale;
      y *= scale;
    }

    setPosition({ x, y });
  };
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  const hasMoved = position.x !== 0 || position.y !== 0;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer rounded-lg border border-dashed transition-colors duration-300 [--show-color:var(--color-blue-500)]"
      style={{
        borderColor: hasMoved ? "var(--show-color)" : "transparent",
        backgroundColor: hasMoved
          ? "color-mix(in srgb,var(--color-neutral-500) 20%, transparent)"
          : "transparent",
      }}
    >
      <motion.button
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 50, mass: 0.1 }}
        className="px-4 py-2 bg-linear-to-b from-blue-500 to-blue-700 rounded-lg font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-blue-500 transition-transform duration-150 ring-inset active:scale-98 relative z-10  "
      >
        {children}
      </motion.button>
    </div>
  );
};

export default MagneticButton;
