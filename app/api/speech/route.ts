import Groq from "groq-sdk";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  console.log("Groq API key present:", !!apiKey, "length:", apiKey?.length);

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Groq API key not configured" }), { status: 500 });
  }

  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as Blob;

    if (!audio) {
      return new Response(JSON.stringify({ error: "No audio provided" }), { status: 400 });
    }

    console.log("Audio type:", audio.type, "size:", audio.size);

    const groq = new Groq({ apiKey });

    const transcription = await groq.audio.transcriptions.create({
      file: new File([audio], "audio.webm", { type: "audio/webm" }),
      model: "whisper-large-v3",
      language: "en",
    });

    console.log("Whisper transcript:", transcription.text);

    return new Response(JSON.stringify({ transcript: transcription.text }), { status: 200 });
  } catch (error: any) {
    console.error("Speech API error:", error);
    return new Response(JSON.stringify({ error: `Transcription failed: ${error.message}` }), { status: 500 });
  }
}
