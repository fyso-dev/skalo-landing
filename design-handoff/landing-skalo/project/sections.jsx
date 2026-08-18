// Skalo Landing — section blocks. Load AFTER components.jsx.

const Reveal = ({ as: Tag = "div", d, className = "", children, ...rest }) => (
  <Tag className={`reveal ${className}`} data-d={d} {...rest}>{children}</Tag>
);

/* ─────────────────────────────────────────── HERO */
const Hero = ({ onCta }) => (
  <header className="sk-hero on-dark" id="top">
    <div className="sk-hero__bolts" aria-hidden="true" />
    <div className="sk-hero__glow" aria-hidden="true" />
    <div className="sk-hero__inner">
      <Reveal className="sk-hero__cap"><Caption dark>SKALO TECHNOLOGIES · 2026</Caption></Reveal>
      <Reveal as="h1" d="1" className="sk-hero__title">
        La IA es la nueva <span className="sk-hero__hl">electricidad</span>.
      </Reveal>
      <Reveal as="p" d="2" className="sk-hero__sub">
        Acompañamos a <b>PYMEs</b> a vivir en aceleración constante: formación, agentes y
        automatizaciones para que encuentres tu propuesta de valor — y no te quedes fuera del sistema.
      </Reveal>
      <Reveal d="3" className="sk-hero__cta">
        <Button variant="spark" size="lg" arrow onClick={onCta}>No tengas miedo a la IA</Button>
        <Button variant="line" size="lg" onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}>Ver qué hacemos</Button>
      </Reveal>
    </div>
    <div className="sk-hero__telemetry">
      <span className="sk-mono">// estado del sistema</span>
      <span className="sk-mono">PYMEs acompañadas · 142</span>
      <span className="sk-mono">aceleración · +28%</span>
      <span className="sk-mono"><span className="sk-pulse" /> en vivo</span>
    </div>
  </header>
);

/* ─────────────────────────────────────────── MANIFIESTO */
const Manifesto = () => (
  <section className="sk-sec sk-sec--paper" id="manifiesto">
    <div className="sk-sec__head"><Reveal><Caption>Manifiesto · 01</Caption></Reveal></div>
    <div className="sk-manifesto__body">
      <Reveal as="p" className="sk-manifesto__quote">
        Productividad se automatiza.<br />Creatividad se <em>cultiva</em>.
      </Reveal>
      <Reveal className="sk-manifesto__notes" d="1">
        <p>
          La IA ya está acá. La pregunta no es <em>si</em> te suma o te resta —
          es qué vas a crear con ella.
        </p>
        <p>
          Skalo existe para que las personas y las empresas no queden fuera del sistema.
          Te ayudamos a cambiar de mentalidad, a vivir el cambio constante y a potenciar la
          creatividad como tu habilidad más valiosa.
        </p>
        <span className="sk-manifesto__kicker">No te quedes fuera. →</span>
      </Reveal>
    </div>
  </section>
);

/* ─────────────────────────────────────────── SERVICIOS */
const SERVICES = [
  {
    feature: true, idx: "// núcleo", title: "Formación y consultoría en IA para tu PYME",
    desc: "Acompañamiento estratégico de punta a punta: diagnosticamos, capacitamos a tu equipo y dejamos la IA funcionando dentro de tu operación — sin humo, con resultados.",
    tags: ["Diagnóstico", "Capacitación", "Hoja de ruta"],
  },
  {
    idx: "01 / 03", title: "Agentes IA",
    desc: "Diseñamos e integramos agentes que ejecutan tareas reales de tu negocio — atención, ventas, back-office — y te devuelven horas para pensar.",
    tags: ["Atención", "Ventas", "Back-office"],
  },
  {
    idx: "02 / 03", title: "Equipos de trabajo híbridos",
    desc: "Personas y agentes trabajando como un solo equipo. Definimos roles, flujos y supervisión para que la IA potencie a tu gente, no la reemplace.",
    tags: ["Roles", "Flujos", "Supervisión"],
  },
  {
    idx: "03 / 03", title: "Automatizaciones",
    desc: "Conectamos tus herramientas y eliminamos el trabajo repetitivo. Lo manual que hoy te roba el día, mañana corre solo.",
    tags: ["Integraciones", "Procesos", "Sin código"],
  },
];

const Servicios = ({ onCta }) => (
  <section className="sk-sec sk-sec--paper2" id="servicios">
    <div className="sk-sec__head">
      <Reveal><Caption>Servicios · 02</Caption></Reveal>
      <Reveal as="h2" d="1" className="sk-sec__title">Maneras concretas de escalar.</Reveal>
      <Reveal as="p" d="2" className="sk-sec__lead">
        Formación y consultoría en IA para la PYME — del primer agente al bienestar de tu equipo.
      </Reveal>
    </div>
    <div className="sk-services__grid">
      {SERVICES.map((s, i) => (
        <Reveal key={s.title} d={(i % 3) + 1}
          className={`sk-card ${s.feature ? "sk-card--feature sk-card--span6" : "sk-card--span6"}`}>
          <div className="sk-card__top">
            <span className="sk-card__idx">{s.idx}</span>
            <Bolt size={s.feature ? 24 : 22} on={s.feature ? "dark" : "light"} className="sk-card__bolt" />
          </div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <div className="sk-card__tags">
            {s.tags.map((t) => <span key={t} className="sk-tag">{t}</span>)}
          </div>
        </Reveal>
      ))}
    </div>

    {/* Servicios complementarios — full-width bands */}
    <div className="sk-services__grid" style={{ marginTop: 14 }}>
      <Reveal className="sk-band" style={{ gridColumn: "span 12" }}>
        <span className="sk-band__num">04</span>
        <div className="sk-band__body">
          <span className="sk-card__idx">// criterio</span>
          <h3>Asesoría sobre IA y Software</h3>
          <p>¿Comprar, construir o esperar? Te ayudamos a decidir con criterio técnico y de negocio — sin venderte lo que no necesitás.</p>
        </div>
        <Button variant="line" size="md" arrow onClick={onCta}>Consultar</Button>
      </Reveal>

      <Reveal className="sk-band sk-band--dark" style={{ gridColumn: "span 12" }} d="1">
        <span className="sk-band__num">05</span>
        <div className="sk-band__body">
          <span className="sk-card__idx">// bienestar</span>
          <h3>Terap<span className="sk-em">IA</span></h3>
          <p>Acompañamiento psicológico para gestionar la resistencia al cambio y evitar el bucle ansioso de la productividad extrema. Escalar con IA no debería costarte el bienestar.</p>
          <div className="sk-card__tags">
            <span className="sk-tag">Resistencia al cambio</span>
            <span className="sk-tag">Gestión de la ansiedad</span>
            <span className="sk-tag">Bienestar del equipo</span>
          </div>
        </div>
        <Button variant="paper" size="md" arrow onClick={onCta}>Hablar con TerapIA</Button>
      </Reveal>
    </div>
  </section>
);

Object.assign(window, { Reveal, Hero, Manifesto, Servicios, SERVICES });
