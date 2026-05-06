export const runtime = "nodejs";

export async function POST(req: Request) {
  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Deepgram API key not configured" }), { status: 500 });
  }

  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as Blob;

    if (!audio) {
      return new Response(JSON.stringify({ error: "No audio provided" }), { status: 400 });
    }

    const response = await fetch("https://api.deepgram.com/v1/listen?language=fil&model=nova-2", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": audio.type || "audio/webm",
      },
      body: audio,
    });

    const data = await response.json();
    const transcript = data.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

    return new Response(JSON.stringify({ transcript }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Transcription failed" }), { status: 500 });
  }
}
