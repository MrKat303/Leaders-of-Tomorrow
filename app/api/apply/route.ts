const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScWfU7x-YHSHM39tohF-iY4DOSk6Joa1EvfltTyUrVpojwPDw/formResponse";

export async function POST(request: Request) {
  try {
    const incoming = new URLSearchParams(await request.text());
    const payload = new URLSearchParams();

    for (const [key, value] of incoming.entries()) {
      if (key.startsWith("entry.")) payload.append(key, value);
    }

    if (!payload.get("entry.925029811") || !payload.get("entry.1591252637")) {
      return Response.json({ error: "Faltan datos obligatorios." }, { status: 400 });
    }

    // Google Forms requires the visited-page history for multi-section forms.
    // Without it, it records a response shell but discards the entry values.
    payload.set("fvv", "1");
    payload.set("pageHistory", "0,1,2,3,4");
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
