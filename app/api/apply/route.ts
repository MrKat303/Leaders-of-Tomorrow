const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd86_m4wXE6GVMQC-2rcxB3MkbijdBpltrDXHczu6kJ7DuAHQ/formResponse";

export async function POST(request: Request) {
  try {
    const incoming = new URLSearchParams(await request.text());
    const payload = new URLSearchParams();

    for (const [key, value] of incoming.entries()) {
      if (key.startsWith("entry.")) payload.append(key, value);
    }

    if (!payload.get("entry.781459710") || !payload.get("entry.159407556")) {
      return Response.json({ error: "Faltan datos obligatorios." }, { status: 400 });
    }

    // Google Forms requires the visited-page history for multi-section forms.
    // Without it, it records a response shell but discards the entry values.
    payload.set("fvv", "1");
    const hasActivities = payload.get("entry.920754456") === "Sí";
    payload.set("pageHistory", hasActivities ? "0,1,2,3,4,5,6,7" : "0,1,2,4,5,6,7");
    payload.set("draftResponse", "[]");
    payload.set("submit", "Submit");

    const googleResponse = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: payload.toString(),
      cache: "no-store",
    });

    if (!googleResponse.ok) {
      return Response.json({ error: "Google Forms rechazó el envío." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "No fue posible procesar la postulación." }, { status: 500 });
  }
}
