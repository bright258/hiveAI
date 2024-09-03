import { AssemblyAI } from 'assemblyai';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SSENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const client = new AssemblyAI({
  apiKey: process.env.NEXT_PUBLIC_ASSEMBLY_AI_API_KEY as string,
});

export const transcribeAudio = async (url: string): Promise<string> => {
  const transcript = await client.transcripts.transcribe({ audio: url });
  return transcript.text as string;
};

export const uploadAudioToFirebase = async (audioBlob: Blob): Promise<string> => {
  const storage = getStorage(app);
  const audioRef = ref(storage, `audios/${Date.now()}.wav`);
  
  try {
    const snapshot = await uploadBytes(audioRef, audioBlob);
    console.log('Uploaded audio file!');
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error('Error uploading audio:', error);
    throw error;
  }
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const createDownloadLink = (audioBlob: Blob): void => {
  const url = URL.createObjectURL(audioBlob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'audio.wav';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
};

export interface AudioRecorderInterface {
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob>;
}

export const handleStartRecording = async (
  audioRecorder: AudioRecorderInterface,
  setIsRecording: (value: boolean) => void,
  setShowPlayer: (value: boolean) => void,
  setError: (value: string | null) => void
) => {
  try {
    await audioRecorder.startRecording();
    setIsRecording(true);
    setShowPlayer(false);
    setError(null);
  } catch (error) {
    console.error('Error accessing microphone:', error);
    setError('Microphone is currently in use by another application or not accessible.');
  }
};

export const handleStopRecording = async (
  audioRecorder: AudioRecorderInterface,
  setAudioBlob: (blob: Blob) => void,
  setIsRecording: (value: boolean) => void,
  setShowPlayer: (value: boolean) => void
) => {
  const audioBlob = await audioRecorder.stopRecording();
  setAudioBlob(audioBlob);
  setIsRecording(false);
  setShowPlayer(true);
};

export const handleFileUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  setAudioBlob: (blob: Blob) => void,
  setShowPlayer: (value: boolean) => void
) => {
  const file = event.target.files?.[0];
  if (file && file.type.startsWith('audio/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const blob = new Blob([e.target?.result as ArrayBuffer], { type: file.type });
      setAudioBlob(blob);
      setShowPlayer(true);
    };
    reader.readAsArrayBuffer(file);
  } else {
    alert('Please select a valid audio file.');
  }
};

export const handleGenerateFlashcards = async (
  audioBlob: Blob,
  setIsGenerating: (value: boolean) => void
) => {
  setIsGenerating(true);
  try {
    const url = await uploadAudioToFirebase(audioBlob);
    const transcript = await transcribeAudio(url);
    console.log(transcript);
    // TODO: Implement flashcard generation logic here
  } catch (error) {
    console.error('Failed to generate flashcards:', error);
    alert('Failed to generate flashcards. Please try again.');
  } finally {
    setIsGenerating(false);
  }
};
