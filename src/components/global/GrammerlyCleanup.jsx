"use client";
import { useEffect } from "react";

export function GrammarlyCleanup() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      "[data-gr-ext-installed], [data-new-gr-c-s-check-loaded]"
    );
    elements.forEach((el) => {
      el.removeAttribute("data-gr-ext-installed");
      el.removeAttribute("data-new-gr-c-s-check-loaded");
    });
  }, []);

  return null;
}
