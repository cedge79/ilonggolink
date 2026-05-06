import { HfInference } from "@huggingface/inference";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  console.log("Hugging Face API key present:", !!apiKey, "length:", apiKey?.length);
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Hugging Face API key not configured" }), { status: 500 });
  }

  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as Blob;

    if (!audio) {
      return new Response(JSON.stringify({ error: "No audio provided" }), { status: 400 });
    }

    console.log("Audio type:", audio.type, "size:", audio.size);

    const audioBuffer = await audio.arrayBuffer();
    const hf = new HfInference(apiKey);

    const result = await hf.automaticSpeechRecognition({
      model: "openai/whisper-large-v2",
      data: new Blob([audioBuffer], { type: "audio/webm" }),
    });

    console.log("Whisper transcript:", result.text);

    return new Response(JSON.stringify({ transcript: result.text }), { status: 200 });
  } catch (error: any) {
    console.error("Speech API error:", error);
    return new Response(JSON.stringify({ error: `Transcription failed: ${error.message}` }), { status: 500 });
  }
}
