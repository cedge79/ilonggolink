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

  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as Blob;

    if (!audio) {
      return new Response(JSON.stringify({ error: "No audio provided" }), { status: 400 });
    }

    console.log("Audio type:", audio.type, "size:", audio.size);

    const audioBuffer = await audio.arrayBuffer();

    const response = await fetch(
      "https://api-inference.huggingface.co/models/openai/whisper-large-v2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "audio/webm",
        },
        body: audioBuffer,
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Hugging Face error status:", response.status, "body:", text);
      console.error("Request URL:", "https://api-inference.huggingface.co/models/openai/whisper-large-v3");
      console.error("Request headers:", { Authorization: `Bearer ${apiKey?.substring(0, 10)}...`, "Content-Type": "audio/webm" });
      return new Response(JSON.stringify({ error: `Hugging Face: ${response.status} - ${text}` }), { status: 500 });
    }

    const data = await response.json();
    const transcript = data.text || "";

    console.log("Whisper transcript:", transcript);

    return new Response(JSON.stringify({ transcript }), { status: 200 });
  } catch (error: any) {
    console.error("Speech API error:", error);
    return new Response(JSON.stringify({ error: "Transcription failed" }), { status: 500 });
  }
}
