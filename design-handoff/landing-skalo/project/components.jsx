// Skalo Landing — primitives + chrome
// Load AFTER React + Babel. Exposes components on window.

const ICON_LIGHT = "assets/Skalo-Solo-Icono-Sobre-Blanco.png"; // bolt for light bg
const ICON_DARK  = "assets/Skalo-Solo-Icono-Sobre-Oscuro.png"; // bolt for dark bg
const LOGO_DARK  = "assets/Skalo-Sobre-Oscuro.png";            // full lockup, white wordmark
const LOGO_LIGHT = "assets/Skalo-Full-Color.png";             // full lockup, dark wordmark

// Bolt mark image — pick variant by background
const Bolt = ({ size = 22, on = "light", className = "", style = {} }) => (
  <img
    src={on === "dark" ? ICON_DARK : ICON_LIGHT}
    width={size} height={size} alt="" aria-hidden="true"
    className={className}
    style={{ objectFit: "contain", ...style }}
  />
);

const Arrow = () => <span className="sk-arrow">↗</span>;

const Button = ({ variant = "ink", size = "md", arrow = false, children, onClick, href, className = "" }) => {
  const cls = `sk-btn sk-btn--${variant} ${size !== "md" ? `sk-btn--${size}` : ""} ${className}`;
  const inner = (<><span>{children}</span>{arrow && <Arrow />}</>);
  if (href) return <a className={cls} href={href} onClick={onClick} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>;
  return <button className={cls} onClick={onClick}>{inner}</button>;
};

const Caption = ({ children, dark = false, className = "" }) => (
  <span className={`sk-caption ${dark ? "sk-caption--dark" : ""} ${className}`}>{children}</span>
);

const NAV_LINKS = [
  { id: "manifiesto", label: "Manifiesto" },
  { id: "servicios", label: "Servicios" },
  { id: "productos", label: "Productos" },
  { id: "proceso", label: "Cómo trabajamos" },
];

const Nav = ({ onCta }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
  };
  return (
    <nav className={`sk-nav ${scrolled ? "sk-nav--solid" : ""}`}>
      <a className="sk-nav__brand" href="#top" onClick={go("top")} aria-label="Skalo — inicio">
        <img src={scrolled ? LOGO_LIGHT : LOGO_DARK} alt="Skalo" style={{ height: 30, width: "auto" }} />
      </a>
      <div className="sk-nav__links">
        {NAV_LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>{l.label}</a>
        ))}
      </div>
      <div className="sk-nav__right">
        <Button variant="line" size="sm" onClick={onCta}>Hablá con nosotros</Button>
      </div>
    </nav>
  );
};

const Footer = ({ onCta }) => (
  <footer className="sk-footer on-dark">
    <hr className="sk-footer__rule" />
    <div className="sk-footer__grid">
      <div className="sk-footer__brand">
        <img src={LOGO_DARK} alt="Skalo" style={{ height: 46, width: "auto" }} />
        <p className="sk-footer__manifesto">
          Productividad se automatiza.<br />
          Creatividad se cultiva.<br />
          <span>No te quedes fuera del sistema.</span>
        </p>
      </div>
      <div className="sk-footer__cols">
        <div>
          <h5>Servicios</h5>
          <ul>
            <li><a href="#servicios" onClick={(e)=>{e.preventDefault();document.getElementById("servicios")?.scrollIntoView({behavior:"smooth"});}}>Formación &amp; consultoría</a></li>
            <li><a href="#servicios" onClick={(e)=>{e.preventDefault();document.getElementById("servicios")?.scrollIntoView({behavior:"smooth"});}}>Agentes IA</a></li>
            <li><a href="#servicios" onClick={(e)=>{e.preventDefault();document.getElementById("servicios")?.scrollIntoView({behavior:"smooth"});}}>Equipos híbridos</a></li>
            <li><a href="#servicios" onClick={(e)=>{e.preventDefault();document.getElementById("servicios")?.scrollIntoView({behavior:"smooth"});}}>Asesoría IA &amp; Software</a></li>
            <li><a href="#servicios" onClick={(e)=>{e.preventDefault();document.getElementById("servicios")?.scrollIntoView({behavior:"smooth"});}}>TerapIA</a></li>
          </ul>
        </div>
        <div>
          <h5>Productos</h5>
          <ul>
            <li><a href="https://fyso.dev/" target="_blank" rel="noreferrer">Fyso ↗</a></li>
            <li><a href="https://fyso.world/" target="_blank" rel="noreferrer">Fyso Teams ↗</a></li>
            <li><a href="#manifiesto" onClick={(e)=>{e.preventDefault();document.getElementById("manifiesto")?.scrollIntoView({behavior:"smooth"});}}>Manifiesto</a></li>
          </ul>
        </div>
        <div>
          <h5>Contacto</h5>
          <ul>
            <li><a href="mailto:info@skalo.ai">info@skalo.ai</a></li>
            <li><a href="#" onClick={(e)=>{e.preventDefault();onCta&&onCta();}}>Agendá una charla</a></li>
            <li><a href="#">LinkedIn ↗</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="sk-footer__base">
      <span className="sk-mono">© 2026 Skalo Technologies · Río Cuarto, Argentina</span>
      <span className="sk-mono">la IA es la nueva electricidad ⚡</span>
    </div>
  </footer>
);

Object.assign(window, { Bolt, Arrow, Button, Caption, Nav, Footer, NAV_LINKS, ICON_LIGHT, ICON_DARK });
