"use client";

import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export function Titulo() {
  const words = [
    {
      text: "Saiba",
      className: "text-3xl",
    },
    {
      text: "mais",
      className: "text-3xl",
    },
    {
      text: "sobre",
      className: "text-3xl",
    },
    {
      text: "o",
      className: "text-3xl",
    },
    {
      text: "Projeto.",
      className: "text-blue-500 dark:text-blue-500 text-4xl",
    },
  ];
  return <TypewriterEffect words={words} />;
}
