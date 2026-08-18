// Skalo Landing — app shell. Load LAST.

/* ── Contact modal ──────────────────────────────────────────── */
const INTERESTS = ["Formación", "Agentes IA", "Equipos híbridos", "Automatizaciones", "Asesoría", "Fyso"];

const ContactModal = ({ open, onClose }) => {
  const [step, setStep] = React.useState(0);
  const [interests, setInterests] = React.useState(new Set(["Agentes IA"]));
  React.useEffect(() => { if (open) { setStep(0); } }, [open]);
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const toggle = (k) => setInterests((prev) => { const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n; });
  if (!open) return null;
  return (
    <div className="sk-modal" onClick={onClose}>
      <div className="sk-modal__panel" onClick={(e) => e.stopPropagation()}>
        {step < 2 && (
          <div className="sk-modal__head">
            <span className="sk-mono">// contacto · paso {step + 1} / 2</span>
            <button className="sk-modal__close" onClick={onClose} aria-label="Cerrar">×</button>
          </div>
        )}
        {step === 0 && (
          <React.Fragment>
            <h2>No tengas miedo a la IA.</h2>
            <p>Contanos qué querés escalar. Te respondemos en 48&nbsp;h.</p>
            <div className="sk-chips">
              {INTERESTS.map((k) => (
                <span key={k} className={`sk-chip ${interests.has(k) ? "sk-chip--on" : ""}`} onClick={() => toggle(k)}>{k}</span>
              ))}
            </div>
            <div className="sk-modal__footer">
              <span className="sk-mono" style={{ color: "var(--ink-mute)" }}>{interests.size} seleccionado{interests.size === 1 ? "" : "s"}</span>
              <Button variant="ink" arrow onClick={() => setStep(1)}>Continuar</Button>
            </div>
          </React.Fragment>
        )}
        {step === 1 && (
          <React.Fragment>
            <h2>¿Cómo te contactamos?</h2>
            <p>Dejanos tus datos y arrancamos la conversación.</p>
            <form className="sk-form" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <label>Nombre <input type="text" placeholder="María González" required /></label>
              <label>Email <input type="email" placeholder="maria@empresa.com" required /></label>
              <label>Empresa <input type="text" placeholder="Tu PYME S.A." /></label>
              <div className="sk-modal__footer">
                <button type="button" className="sk-link" onClick={() => setStep(0)}>← atrás</button>
                <Button variant="spark" arrow>Enviar</Button>
              </div>
            </form>
          </React.Fragment>
        )}
        {step === 2 && (
          <div className="sk-modal__done">
            <Bolt size={54} on="light" className="sk-bigbolt" />
            <h2>¡Listo! Estás dentro del sistema.</h2>
            <p>Te escribimos a la brevedad desde <b style={{ color: "var(--orange)" }}>info@skalo.ai</b>.</p>
            <Button variant="ink" onClick={onClose}>Cerrar</Button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Scroll reveal ──────────────────────────────────────────── */
function useScrollReveal(active) {
  // Arm the hidden state before paint so above-the-fold doesn't flash.
  React.useLayoutEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!active) { els.forEach((el) => { el.classList.remove("armed", "in"); el.style.cssText = ""; }); return; }
    els.forEach((el) => { el.classList.add("armed"); el.classList.remove("in"); el.style.cssText = ""; });
  }, [active]);

  React.useEffect(() => {
    if (!active) return;
    const els = Array.from(document.querySelectorAll(".reveal"));
    const inView = (el) => {
      const h = window.innerHeight || document.documentElement.clientHeight;
      const r = el.getBoundingClientRect();
      return r.top < h * 0.9 && r.bottom > 0;
    };
    const reveal = (el) => { el.classList.remove("armed"); el.classList.add("in"); };
    const check = () => els.forEach((el) => { if (!el.classList.contains("in") && inView(el)) reveal(el); });
    requestAnimationFrame(check);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const id = setInterval(check, 200);
    // Self-heal: if an in-view element is still fully hidden (e.g. a throttled
    // background iframe froze its transition), hard-show it. Starts late so it
    // never interrupts a normal entrance in a focused tab.
    let safety;
    const startSafety = setTimeout(() => {
      safety = setInterval(() => {
        els.forEach((el) => {
          if (inView(el) && getComputedStyle(el).opacity === "0") {
            el.classList.remove("armed"); el.classList.add("in");
            el.style.transition = "none"; el.style.opacity = "1"; el.style.transform = "none";
          }
        });
      }, 600);
    }, 1300);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      clearInterval(id); clearTimeout(startSafety); clearInterval(safety);
    };
  }, [active]);
}

/* ── Tweaks ─────────────────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "izquierda",
  "accent": "color",
  "boltPattern": 6,
  "animations": true
}/*EDITMODE-END*/;

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [modalOpen, setModalOpen] = React.useState(false);
  const openCta = React.useCallback(() => setModalOpen(true), []);
  useScrollReveal(t.animations);

  const rootCls = [
    t.heroLayout === "centrado" ? "hero-center" : "",
    t.accent === "subrayado" ? "accent-underline" : "",
    t.animations ? "anim-on" : "",
  ].join(" ");

  React.useEffect(() => {
    document.documentElement.style.setProperty("--bolt-opacity", String((t.boltPattern || 0) / 100));
  }, [t.boltPattern]);

  return (
    <div className={rootCls}>
      <Nav onCta={openCta} />
      <main>
        <Hero onCta={openCta} />
        <Manifesto />
        <Servicios onCta={openCta} />
        <Productos />
        <Proceso />
        <Stats />
        <CTA onCta={openCta} />
      </main>
      <Footer onCta={openCta} />
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Alineación" value={t.heroLayout} options={["izquierda", "centrado"]} onChange={(v) => setTweak("heroLayout", v)} />
        <TweakRadio label="Acento del titular" value={t.accent} options={["color", "subrayado"]} onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Marca y movimiento" />
        <TweakSlider label="Patrón de rayos" value={t.boltPattern} min={0} max={18} unit="%" onChange={(v) => setTweak("boltPattern", v)} />
        <TweakToggle label="Animaciones" value={t.animations} onChange={(v) => setTweak("animations", v)} />
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
