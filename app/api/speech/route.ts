export const runtime = "nodejs";

export async function POST(req: Request) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
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

    const response = await fetch(
      "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
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
      return new Response(JSON.stringify({ error: `Hugging Face: ${response.status}` }), { status: 500 });
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
