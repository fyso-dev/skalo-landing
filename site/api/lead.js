/* POST /api/lead — recibe el formulario de contacto y guarda el lead en Fyso.
   Variables de entorno requeridas: FYSO_API_KEY, FYSO_TENANT_ID.
   Opcional: FYSO_API_URL (default https://api.fyso.dev).
   Opcional: RESEND_API_KEY (si está, se notifica cada lead por email),
   LEAD_NOTIFY_EMAIL (default salva@skalo.ai), LEAD_NOTIFY_FROM. */

const INTERESES_VALIDOS = new Set([
  "Formación", "Agentes IA", "Equipos híbridos", "Automatizaciones", "Asesoría", "Fyso",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido." });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};
  const { nombre, email, empresa, intereses, website } = body;

  // Honeypot: los bots lo completan; respondemos OK sin guardar nada.
  if (typeof website === "string" && website.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  if (typeof nombre !== "string" || nombre.trim().length === 0 || nombre.trim().length > 200) {
    return res.status(400).json({ ok: false, error: "Contanos tu nombre." });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim()) || email.trim().length > 200) {
    return res.status(400).json({ ok: false, error: "Ingresá un email válido." });
  }
  if (empresa !== undefined && (typeof empresa !== "string" || empresa.trim().length > 200)) {
    return res.status(400).json({ ok: false, error: "Empresa inválida." });
  }

  let interesesLimpios = [];
  if (Array.isArray(intereses)) {
    interesesLimpios = intereses.filter((i) => INTERESES_VALIDOS.has(i));
  }

  const apiUrl = process.env.FYSO_API_URL || "https://api.fyso.dev";
  const apiKey = process.env.FYSO_API_KEY;
  const tenantId = process.env.FYSO_TENANT_ID;

  if (!apiKey || !tenantId) {
    console.error("lead: faltan FYSO_API_KEY / FYSO_TENANT_ID");
    return res.status(500).json({ ok: false, error: "El servidor no está configurado." });
  }

  try {
    const fysoRes = await fetch(`${apiUrl}/api/entities/lead/records`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "X-Tenant-ID": tenantId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        empresa: (empresa || "").trim() || undefined,
        intereses: interesesLimpios.join(", ") || undefined,
        origen: "landing skalo.ai",
        estado: "nuevo",
      }),
    });

    if (!fysoRes.ok) {
      const detail = await fysoRes.text().catch(() => "");
      console.error("lead: Fyso respondió", fysoRes.status, detail.slice(0, 500));
      return res.status(502).json({ ok: false, error: "No pudimos guardar tus datos. Probá de nuevo en un rato." });
    }

    await notificarPorEmail({
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      empresa: (empresa || "").trim(),
      intereses: interesesLimpios,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("lead: error de red hacia Fyso", err);
    return res.status(502).json({ ok: false, error: "No pudimos guardar tus datos. Probá de nuevo en un rato." });
  }
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Notifica el lead por email vía Resend. El lead ya quedó guardado en Fyso:
   si falta RESEND_API_KEY o el envío falla, solo se loguea y la respuesta sigue OK. */
async function notificarPorEmail({ nombre, email, empresa, intereses }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = process.env.LEAD_NOTIFY_EMAIL || "salva@skalo.ai";
  const from = process.env.LEAD_NOTIFY_FROM || "Skalo Landing <onboarding@resend.dev>";

  const filas = [
    ["Nombre", nombre],
    ["Email", email],
    ["Empresa", empresa || "—"],
    ["Intereses", intereses.length ? intereses.join(", ") : "—"],
  ]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;">${k}</td><td style="padding:4px 0;"><b>${escapeHtml(v)}</b></td></tr>`)
    .join("");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Nuevo lead en skalo.ai — ${nombre}`,
        html: `<p>Nueva consulta desde el formulario de skalo.ai:</p><table>${filas}</table><p style="color:#999;font-size:12px;">Guardado en Fyso (tenant Skalo Web, entidad lead). Respondé a este email para contactar al lead.</p>`,
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("lead: Resend respondió", r.status, detail.slice(0, 300));
    }
  } catch (err) {
    console.error("lead: error enviando notificación por email", err);
  }
}
