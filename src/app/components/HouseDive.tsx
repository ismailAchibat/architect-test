"use client";

import { useRef } from "react";
import { useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  MotionValue,
} from "motion/react";

/**
 * HouseDive — a scroll-scrubbed "dive into the house" sequence.
 *
 * The section is tall (DEPTH * 100vh). A sticky stage holds a series of
 * depth planes. As you scroll, the camera pushes forward and each plane
 * scales up through the centre of the frame and passes the lens — giving
 * the sensation of flying through the facade, the foyer and the rooms.
 *
 * ── Dropping in a Higgsfield video ──────────────────────────────────────
 * When the Higgsfield connector is reconnected, generate a 16:9 "camera
 * push-in through a modern house" clip, drop it at /public/dive.mp4 and set
 * USE_VIDEO = true. The same scroll progress then scrubs the video instead
 * of the CSS planes (see <VideoScrub/> at the bottom of this file).
 */

const USE_VIDEO = true; // /public/dive.mp4 generated with Higgsfield

// scroll progress where each plane is centred & largest
const PLANES = [
  { at: 0.02, kind: "sky" as const },
  { at: 0.26, kind: "facade" as const },
  { at: 0.5, kind: "foyer" as const },
  { at: 0.74, kind: "living" as const },
  { at: 0.95, kind: "atrium" as const },
];

const CAPTIONS = [
  { at: 0.04, eyebrow: "Est. 2009 · Selected works", title: "We design the\nspaces light lives in." },
  { at: 0.28, eyebrow: "The threshold", title: "Glass dissolves\nthe line between\nin and out." },
  { at: 0.52, eyebrow: "The foyer", title: "Arrival becomes\na quiet ceremony." },
  { at: 0.76, eyebrow: "The living room", title: "Volume, proportion,\nand the long view." },
  { at: 0.96, eyebrow: "Welcome home", title: "Atelier Noir." },
];

export default function HouseDive() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // smooth the raw scroll for buttery motion
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });

  // subtle ambient drift of the whole stage
  const stageX = useTransform(p, [0, 1], ["1.5%", "-1.5%"]);
  const vignette = useTransform(p, [0, 0.9, 1], [0.55, 0.55, 0.9]);

  return (
    <section ref={ref} style={{ height: `${PLANES.length * 120}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg">
        {/* depth fog */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(120%_120%_at_50%_40%,#16161a_0%,#0a0a0b_70%)]" />

        {USE_VIDEO ? (
          <VideoScrub progress={p} />
        ) : (
          <motion.div
            style={{ x: stageX, perspective: 1400 }}
            className="absolute inset-0 z-10 flex items-center justify-center [transform-style:preserve-3d]"
          >
            {PLANES.map((plane) => (
              <Plane key={plane.at} at={plane.at} kind={plane.kind} p={p} />
            ))}
          </motion.div>
        )}

        {/* captions */}
        <div className="absolute inset-0 z-30 flex items-center justify-center px-6">
          {CAPTIONS.map((c) => (
            <Caption key={c.at} c={c} p={p} />
          ))}
        </div>

        {/* cinematic vignette */}
        <motion.div
          style={{ opacity: vignette }}
          className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(110%_110%_at_50%_50%,transparent_45%,#000_100%)]"
        />

        {/* progress rail */}
        <Rail p={p} />

        {/* scroll hint (fades out quickly) */}
        <HintFade p={p} />
      </div>
    </section>
  );
}

/* ── a single depth plane ──────────────────────────────────────────────── */
function Plane({
  at,
  kind,
  p,
}: {
  at: number;
  kind: "sky" | "facade" | "foyer" | "living" | "atrium";
  p: MotionValue<number>;
}) {
  // grow from small (far) to huge (passing the lens)
  const scale = useTransform(p, [at - 0.3, at, at + 0.12], [0.45, 1, 3.4]);
  const opacity = useTransform(
    p,
    [at - 0.3, at - 0.16, at + 0.03, at + 0.1],
    [0, 1, 1, 0]
  );
  const blur = useTransform(p, [at - 0.3, at - 0.12, at, at + 0.1], [6, 0, 0, 8]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      style={{ scale, opacity, filter }}
      className="absolute h-[78vh] w-[88vw] max-w-[1100px] will-change-transform"
    >
      <Scene kind={kind} />
    </motion.div>
  );
}

/* ── architectural scenes drawn with gradients + SVG line work ─────────── */
function Scene({ kind }: { kind: string }) {
  const stroke = "#c8a97e";
  const faint = "rgba(200,169,126,0.22)";

  if (kind === "sky") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-[linear-gradient(180deg,#1a1c22_0%,#0d0e12_60%)]">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_18%,rgba(231,211,180,0.18),transparent_60%)]" />
        <svg viewBox="0 0 1100 820" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <g fill="none" stroke={stroke} strokeWidth="1.4">
            {/* modern house silhouette */}
            <path d="M170 560 H930 V760 H170 Z" opacity="0.7" />
            <path d="M170 560 L170 420 L560 320 L930 420 L930 560" opacity="0.7" />
            <path d="M360 560 V760 M560 560 V760 M740 560 V760" stroke={faint} />
            <rect x="600" y="470" width="240" height="290" stroke={faint} />
            <path d="M250 470 h180 v90 h-180 z" stroke={faint} />
          </g>
          <g fill={faint}>
            <rect x="610" y="480" width="220" height="270" opacity="0.5" />
          </g>
        </svg>
        <div className="absolute bottom-8 left-8 font-display text-[clamp(2rem,7vw,5rem)] leading-none text-fg/90">
          A H O U S E
        </div>
      </div>
    );
  }

  if (kind === "facade") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-[linear-gradient(180deg,#101216_0%,#0a0b0e_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_60%,rgba(231,211,180,0.16),transparent_65%)]" />
        {/* glowing glass grid */}
        <div className="absolute inset-[10%] grid grid-cols-4 grid-rows-3 gap-[3px] bg-accent/10 p-[3px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-[linear-gradient(160deg,rgba(231,211,180,0.22),rgba(20,22,26,0.6))]"
            />
          ))}
        </div>
        <div className="absolute inset-[10%] border border-accent/40" />
        <div className="absolute left-1/2 top-[10%] h-[80%] w-[2px] -translate-x-1/2 bg-accent/40" />
      </div>
    );
  }

  if (kind === "foyer") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-[linear-gradient(180deg,#0e0f13_0%,#08090b_100%)]">
        {/* perspective corridor */}
        <svg viewBox="0 0 1100 780" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(231,211,180,0.5)" />
              <stop offset="100%" stopColor="rgba(231,211,180,0)" />
            </radialGradient>
          </defs>
          <rect x="430" y="300" width="240" height="320" fill="url(#glow)" />
          <g fill="none" stroke={stroke} strokeWidth="1.4" opacity="0.65">
            <path d="M0 0 L430 300 M1100 0 L670 300 M0 780 L430 620 M1100 780 L670 620" />
            <rect x="430" y="300" width="240" height="320" />
            <path d="M430 300 L670 300 M430 620 L670 620" stroke={faint} />
            <path d="M250 150 L250 700 M850 150 L850 700" stroke={faint} />
          </g>
        </svg>
      </div>
    );
  }

  if (kind === "living") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-[linear-gradient(180deg,#101115_0%,#0a0b0e_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_75%_40%,rgba(231,211,180,0.14),transparent_60%)]" />
        <svg viewBox="0 0 1100 780" className="absolute inset-0 h-full w-full">
          <g fill="none" stroke={stroke} strokeWidth="1.4" opacity="0.6">
            {/* big window wall + horizon */}
            <rect x="120" y="120" width="600" height="430" />
            <path d="M120 300 H720 M420 120 V550" stroke={faint} />
            {/* low furniture lines */}
            <path d="M780 560 h220 v40 h-220 z" />
            <path d="M150 600 h420 v36 h-420 z" />
            <path d="M120 660 H1000" stroke={faint} />
          </g>
        </svg>
      </div>
    );
  }

  // atrium / final reveal
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-[radial-gradient(80%_80%_at_50%_45%,#1b1d23_0%,#0a0b0e_70%)]">
      <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_50%_30%,rgba(231,211,180,0.3),transparent_60%)]" />
      <svg viewBox="0 0 1100 780" className="absolute inset-0 h-full w-full">
        <g fill="none" stroke={stroke} strokeWidth="1.2" opacity="0.5">
          <rect x="380" y="80" width="340" height="620" />
          <path d="M380 240 H720 M380 400 H720 M380 560 H720" stroke={faint} />
        </g>
      </svg>
    </div>
  );
}

/* ── floating captions synced to the dive ──────────────────────────────── */
function Caption({
  c,
  p,
}: {
  c: { at: number; eyebrow: string; title: string };
  p: MotionValue<number>;
}) {
  const opacity = useTransform(
    p,
    [c.at - 0.12, c.at - 0.04, c.at + 0.04, c.at + 0.12],
    [0, 1, 1, 0]
  );
  const y = useTransform(p, [c.at - 0.12, c.at + 0.12], [28, -28]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute max-w-3xl text-center will-change-transform"
    >
      <p className="eyebrow mb-4">{c.eyebrow}</p>
      <h2 className="whitespace-pre-line font-display text-[clamp(2.2rem,6vw,5.2rem)] font-light leading-[1.02] text-fg">
        {c.title}
      </h2>
    </motion.div>
  );
}

function Rail({ p }: { p: MotionValue<number> }) {
  const h = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <div className="absolute right-6 top-1/2 z-40 hidden h-40 -translate-y-1/2 md:block">
      <div className="relative h-full w-px bg-line">
        <motion.div style={{ height: h }} className="absolute left-0 top-0 w-px bg-accent" />
      </div>
    </div>
  );
}

function HintFade({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0, 0.05], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 text-center"
    >
      <p className="mb-2 text-[0.7rem] tracking-[0.3em] text-muted">SCROLL TO ENTER</p>
      <div className="scroll-hint mx-auto h-8 w-px bg-accent/60" />
    </motion.div>
  );
}

/* ── Higgsfield video scrubbing (USE_VIDEO = true) ─────────────────────── */
function VideoScrub({ progress }: { progress: MotionValue<number> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const raf = useRef(0);

  // make sure metadata (duration) is loaded before we seek
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.pause();

    // ease the video time toward the scroll target for extra smoothness
    const tick = () => {
      if (vid.duration) {
        const want = target.current * vid.duration;
        const now = vid.currentTime;
        const next = now + (want - now) * 0.18;
        if (Math.abs(want - now) > 0.001) vid.currentTime = next;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  useMotionValueEvent(progress, "change", (v) => {
    target.current = Math.max(0, Math.min(1, v));
  });

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 z-10 h-full w-full object-cover"
        src="/dive-scrub.mp4"
        poster="/dive-poster.png"
        muted
        playsInline
        preload="auto"
      />
      {/* darken slightly so captions stay readable over the footage */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-bg/30" />
    </>
  );
}
