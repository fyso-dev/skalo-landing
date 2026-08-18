// Skalo Landing — products (Fyso), process, stats, CTA. Load AFTER sections.jsx.

/* ─────────────────────────────────────────── PRODUCTOS (FYSO) */
const FysoDemo = () => (
  <div className="sk-prod__demo">
    <div className="sk-prod__demohead">
      <span className="sk-mono">fyso · build</span>
      <span className="sk-dots"><span /><span /><span /></span>
    </div>
    <div className="sk-chatline">
      <span className="sk-chatline__who">cliente</span>
      <div className="sk-bubble">«Necesito un CRM para mi taller: clientes, vehículos y órdenes de reparación.»</div>
    </div>
    <div className="sk-chatline">
      <span className="sk-chatline__who">fyso</span>
      <div className="sk-bubble sk-bubble--out">Listo. Generé las entidades y la API. Tu app ya está corriendo.</div>
    </div>
    <div className="sk-buildbar">
      <div className="sk-buildrow"><span className="sk-check">✓</span> <b>Entidades</b> · Cliente, Vehículo, Orden</div>
      <div className="sk-buildrow"><span className="sk-check">✓</span> <b>Reglas de negocio</b> · validaciones + estados</div>
      <div className="sk-buildrow"><span className="sk-check">✓</span> <b>API + Hosting</b> · desplegado</div>
    </div>
  </div>
);

const AGENTS = [
  { glyph: "✧", name: "Timon", role: "orchestrator", state: "running" },
  { glyph: "⚒", name: "Forja", role: "dev builder", state: "running" },
  { glyph: "✓", name: "Umbral", role: "code reviewer", state: "running" },
  { glyph: "◈", name: "Hermes", role: "project mgr", state: "idle" },
];

const TeamsDemo = () => (
  <div className="sk-prod__demo">
    <div className="sk-prod__demohead">
      <span className="sk-mono">fyso teams · equipo dev</span>
      <span className="sk-dots"><span /><span /><span /></span>
    </div>
    <div className="sk-roster">
      {AGENTS.map((a) => (
        <div className="sk-agent" key={a.name}>
          <div className="sk-agent__row">
            <span className="sk-agent__glyph">{a.glyph}</span>
            <span className={`sk-agent__stat ${a.state === "idle" ? "sk-agent__stat--idle" : ""}`}>
              <span className="sk-pulse" />{a.state}
            </span>
          </div>
          <span className="sk-agent__name">{a.name}</span>
          <span className="sk-agent__role">{a.role}</span>
        </div>
      ))}
    </div>
    <div className="sk-rosterbar"><span>Forja completó auth/login · hace 2 min</span><span><b>1,284</b> acciones · 24h</span></div>
  </div>
);

const Productos = () => (
  <section className="sk-sec sk-sec--dark on-dark" id="productos">
    <div className="sk-sec__head">
      <Reveal><Caption dark>Productos propios · 03</Caption></Reveal>
      <Reveal as="h2" d="1" className="sk-sec__title">Construimos lo que enseñamos.</Reveal>
      <Reveal as="p" d="2" className="sk-sec__lead">
        Dos productos nacidos de la misma tesis: que cualquiera pueda escalar sin límites.
      </Reveal>
    </div>
    <div className="sk-prod__rows">
      <Reveal className="sk-prod">
        <div className="sk-prod__copy">
          <span className="sk-prod__badge">Plataforma</span>
          <h3 className="sk-prod__name">Fyso</h3>
          <p className="sk-prod__tag">De la conversación a una app funcionando.</p>
          <p className="sk-prod__desc">
            Describí lo que tu cliente necesita y Fyso crea las entidades, las reglas de negocio,
            la API y el hosting. Software a medida, a la velocidad de una charla.
          </p>
          <ul className="sk-prod__feats">
            <li>Del lenguaje natural a una app real</li>
            <li>Entidades, reglas, API y hosting incluidos</li>
            <li>Pensado para construir para tus clientes</li>
          </ul>
          <div className="sk-prod__cta">
            <Button variant="paper" arrow href="https://fyso.dev/">Conocer Fyso</Button>
            <span className="sk-mono" style={{ color: "var(--mute-on-dark)" }}>fyso.dev</span>
          </div>
        </div>
        <FysoDemo />
      </Reveal>

      <Reveal className="sk-prod sk-prod--rev" d="1">
        <div className="sk-prod__copy">
          <span className="sk-prod__badge">Beta pública</span>
          <h3 className="sk-prod__name">Fyso <span>Teams</span></h3>
          <p className="sk-prod__tag">Tu equipo de agentes, organizado como una empresa.</p>
          <p className="sk-prod__desc">
            Contratá, agrupá y supervisá decenas de agentes especializados. Timon orquesta,
            Forja construye, Umbral revisa. Vos dirigís.
          </p>
          <ul className="sk-prod__feats">
            <li>Equipos de agentes por área de tu empresa</li>
            <li>Tracking en vivo, auditoría y rollback</li>
            <li>Desde USD 15/mes · datos en la UE</li>
          </ul>
          <div className="sk-prod__cta">
            <Button variant="paper" arrow href="https://fyso.world/">Conocer Fyso Teams</Button>
            <span className="sk-mono" style={{ color: "var(--mute-on-dark)" }}>fyso.world</span>
          </div>
        </div>
        <TeamsDemo />
      </Reveal>
    </div>
  </section>
);

/* ─────────────────────────────────────────── PROCESO */
const STEPS = [
  { n: "01", t: "Diagnóstico", d: "Entendemos tu negocio y dónde la IA suma de verdad. Sin promesas vacías." },
  { n: "02", t: "Hoja de ruta", d: "Priorizamos lo que mueve la aguja y armamos un plan claro y realista." },
  { n: "03", t: "Implementación", d: "Agentes, automatizaciones y equipos híbridos funcionando dentro de tu operación." },
  { n: "04", t: "Acompañamiento", d: "Capacitamos a tu equipo y quedamos cerca para que la aceleración no se frene." },
];

const Proceso = () => (
  <section className="sk-sec sk-sec--paper" id="proceso">
    <div className="sk-sec__head">
      <Reveal><Caption>Cómo trabajamos · 04</Caption></Reveal>
      <Reveal as="h2" d="1" className="sk-sec__title">Cuatro pasos, sin vueltas.</Reveal>
    </div>
    <div className="sk-proc__grid">
      {STEPS.map((s, i) => (
        <Reveal key={s.n} d={(i % 3) + 1} className="sk-step">
          <span className="sk-step__n">{s.n}</span>
          <h4>{s.t}</h4>
          <p>{s.d}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ─────────────────────────────────────────── MÉTRICAS */
const STATS = [
  { v: <>142</>, k: "PYMEs acompañadas" },
  { v: <>10<small>×</small></>, k: "aceleración promedio" },
  { v: <>38%</>, k: "tiempo creativo recuperado" },
  { v: <>0→1</>, k: "de la idea al producto" },
];

const Stats = () => (
  <section className="sk-sec sk-sec--black on-dark" id="metricas">
    <div className="sk-sec__head">
      <Reveal><Caption dark>Métricas · 05</Caption></Reveal>
      <Reveal as="h2" d="1" className="sk-sec__title">El sistema ya se mueve.</Reveal>
    </div>
    <div className="sk-stats__grid">
      {STATS.map((s, i) => (
        <Reveal key={i} d={(i % 3) + 1} className="sk-stat">
          <span className="sk-stat__v">{s.v}</span>
          <span className="sk-stat__k">{s.k}</span>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ─────────────────────────────────────────── CTA */
const CTA = ({ onCta }) => (
  <section className="sk-cta" id="contacto">
    <div className="sk-cta__bolts" aria-hidden="true" />
    <div className="sk-cta__inner">
      <Reveal as="h2" className="sk-cta__h">
        No tengas miedo a la IA.
        <em>Tené miedo de quedarte fuera.</em>
      </Reveal>
      <Reveal d="1"><Button variant="ink" size="lg" arrow onClick={onCta}>Empezá hoy</Button></Reveal>
    </div>
  </section>
);

Object.assign(window, { Productos, Proceso, Stats, CTA });
