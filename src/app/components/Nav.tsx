"use client";

import { useEffect, useState } from "react";

const links = ["Studio", "Projects", "Process", "Journal", "Contact"];

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-bg/70 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-display text-xl tracking-[0.2em] text-fg">
          ATELIER<span className="text-accent"> NOIR</span>
        </a>
        <ul className="hidden gap-9 text-sm text-muted md:flex">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="transition-colors hover:text-fg"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full border border-accent/50 px-5 py-2 text-sm text-accent-soft transition-colors hover:bg-accent hover:text-bg"
        >
          Start a project
        </a>
      </nav>
    </header>
  );
}
