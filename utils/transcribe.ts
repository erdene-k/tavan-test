export async function transcribeAudio(audioBlob: Blob): Promise<string> {
    // Create form data with audio file
    const formData = new FormData();
    formData.append("audio", audioBlob);
  
    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data.transcription;
    } catch (error) {
      console.error("Error transcribing audio:", error);
      throw error;
    }
  }
  