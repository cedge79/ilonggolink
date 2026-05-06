export const runtime = "nodejs";

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Google API key not configured" }), { status: 500 });
  }

  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as Blob;

    if (!audio) {
      return new Response(JSON.stringify({ error: "No audio provided" }), { status: 400 });
    }

    console.log("Audio type:", audio.type, "size:", audio.size);

    const audioBuffer = await audio.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString("base64");

    const response = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: {
            encoding: "LINEAR16",
            sampleRateHertz: 16000,
            languageCode: "fil-PH",
          },
          audio: { content: base64Audio },
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Google error status:", response.status, "body:", text);
      return new Response(JSON.stringify({ error: `Google: ${response.status}` }), { status: 500 });
    }

    const data = await response.json();
    const transcript = data.results?.[0]?.alternatives?.[0]?.transcript || "";

    console.log("Google transcript:", transcript);

    return new Response(JSON.stringify({ transcript }), { status: 200 });
  } catch (error: any) {
    console.error("Speech API error:", error);
    return new Response(JSON.stringify({ error: "Transcription failed" }), { status: 500 });
  }
}
