import axios from 'axios';

const ASSEMBLYAI_API_KEY = "a4f3c23cd647472f8432b3e6294ed3e6";

async function uploadAudio(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('file', audioBlob);


  const response = await axios.post('https://api.assemblyai.com/v2/upload', formData, {
    headers: {
      'authorization': ASSEMBLYAI_API_KEY,
      'content-type': 'multipart/form-data',
    },
  });

  return response.data.upload_url;
}

async function getTranscription(transcriptId: string): Promise<string> {
  const response = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
    headers: {
      'authorization': ASSEMBLYAI_API_KEY,
    },
  });

  if (response.data.status === 'completed') {
    return response.data.text;
  } else if (response.data.status === 'failed') {
    throw new Error('Transcription failed');
  } else {
    throw new Error('Transcription in progress');
  }
}

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const uploadUrl = await uploadAudio(audioBlob);

  const response = await axios.post('https://api.assemblyai.com/v2/transcript', {
    audio_url: uploadUrl,
  }, {
    headers: {
      'authorization': ASSEMBLYAI_API_KEY,
    },
  });

  const transcriptId = response.data.id;

  // Polling for the transcription result
  let transcript: string | null = null;
  while (!transcript) {
    try {
      transcript = await getTranscription(transcriptId);
    } catch (error: any) {
      if (error.message === 'Transcription in progress') {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
      } else {
        throw error;
      }
    }
  }
  

  return transcript;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export async function generateFlashcards(transcript: string): Promise<Flashcard[]> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates flashcards from transcripts. Generate 5 flashcards in JSON format." },
        { role: "user", content: `Generate flashcards from this transcript: ${transcript}` }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate flashcards');
  }

  const data = await response.json();
  const flashcardsText = data.choices[0].message.content;
  return JSON.parse(flashcardsText);
}
