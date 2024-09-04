import { AudioRecorderInterface } from "../types/recordTypes";
import { transcribeAudio, uploadAudioToFirebase } from "./apiUtils";

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
  
export const handleGenerateFlashcards = async (audioBlob: Blob): Promise<string>  => {
    try {
      // Upload audio to Firebase
      const audioUrl = await uploadAudioToFirebase(audioBlob);
      
      // Transcribe the audio
      const transcript = await transcribeAudio(audioUrl);
      
      // Return the generated transcript
      return transcript as string;
    } catch (error) {
      alert('Error generating flashcards. Check your internet connection and try again.');
      throw error ;
    }
  };