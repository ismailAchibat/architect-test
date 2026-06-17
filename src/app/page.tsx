import Nav from "./components/Nav";
import HouseDive from "./components/HouseDive";
import Reveal from "./components/Reveal";

const projects = [
  { name: "Casa Lumen", place: "Marrakech, MA", year: "2024", tag: "Residence" },
  { name: "The Glass Spine", place: "Oslo, NO", year: "2023", tag: "Villa" },
  { name: "Pavilion 9", place: "Kyoto, JP", year: "2023", tag: "Retreat" },
  { name: "Monolith House", place: "Lisbon, PT", year: "2022", tag: "Residence" },
];

const services = [
  {
    n: "01",
    t: "Architecture",
    d: "Ground-up homes and pavilions where structure, light and landscape are designed as one continuous gesture.",
  },
  {
    n: "02",
    t: "Interior & Spatial",
    d: "Material palettes, joinery and lighting tuned to how a room is actually lived in — morning to midnight.",
  },
  {
    n: "03",
    t: "Visualisation",
    d: "Cinematic 3D modelling and walkthroughs so you can step inside the house long before the first stone is laid.",
  },
];

const stats = [
  { k: "120+", v: "Homes delivered" },
  { k: "15", v: "Years of practice" },
  { k: "9", v: "Design awards" },
  { k: "4", v: "Continents" },
];

export default function Home() {
  return (
    <main id="top" className="relative">
      <Nav />

      {/* ── The dive ── */}
      <HouseDive />

      {/* ── Manifesto ── */}
      <section id="studio" className="relative border-t border-line bg-bg px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="eyebrow mb-8">The studio</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="font-display text-[clamp(1.8rem,4.4vw,3.4rem)] font-light leading-[1.25] text-fg">
              We are an architecture studio that treats a house as a quiet
              instrument for daylight. Every threshold, every sightline and
              every shadow is{" "}
              <span className="text-accent">drawn on purpose</span> — so the
              building disappears and the living begins.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="relative bg-bg-soft px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow mb-14">What we do</p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="group h-full bg-bg-soft p-10 transition-colors hover:bg-bg">
                  <p className="font-display text-3xl text-accent/70">{s.n}</p>
                  <h3 className="mb-4 mt-6 text-xl text-fg">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-muted">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="relative bg-bg px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-14 flex items-end justify-between">
              <div>
                <p className="eyebrow mb-3">Selected works</p>
                <h2 className="font-display text-4xl font-light text-fg md:text-5xl">
                  Houses, lately.
                </h2>
              </div>
              <a href="#contact" className="hidden text-sm text-muted hover:text-fg md:block">
                All projects →
              </a>
            </div>
          </Reveal>

          <div className="divide-y divide-line border-y border-line">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05}>
                <a
                  href="#contact"
                  className="group flex items-center justify-between gap-6 py-7 transition-colors"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="text-xs text-muted">0{i + 1}</span>
                    <span className="font-display text-2xl text-fg transition-colors group-hover:text-accent md:text-4xl">
                      {p.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-8 text-sm text-muted">
                    <span className="hidden sm:block">{p.tag}</span>
                    <span className="hidden md:block">{p.place}</span>
                    <span>{p.year}</span>
                    <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="process" className="relative border-y border-line bg-bg-soft px-6 py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.v} delay={i * 0.08}>
              <div>
                <p className="font-display text-5xl text-fg md:text-6xl">{s.k}</p>
                <p className="mt-3 text-sm text-muted">{s.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section id="contact" className="relative overflow-hidden bg-bg px-6 py-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(200,169,126,0.12),transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow mb-8">Let&apos;s build</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2.6rem,8vw,6rem)] font-light leading-[0.98] text-fg">
              Have a site?
              <br />
              <span className="text-accent">Let&apos;s give it a home.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="mailto:studio@ateliernoir.com"
              className="mt-12 inline-block rounded-full bg-accent px-9 py-4 text-bg transition-transform hover:scale-[1.03]"
            >
              studio@ateliernoir.com
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-line bg-bg px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
          <span className="font-display tracking-[0.2em] text-fg">
            ATELIER<span className="text-accent"> NOIR</span>
          </span>
          <span>© {new Date().getFullYear()} — Architecture &amp; Spatial Design</span>
          <span>Marrakech · Oslo · Lisbon</span>
        </div>
      </footer>
    </main>
  );
}
