import { AudioRecorder } from './audioRecorder';
import { playBeep, handleStartRecording, handleStopRecording, handleFileUpload, handleGenerateFlashcards } from './apiUtils';

export const startRecording = (
  audioContext: AudioContext | null,
  audioRecorder: AudioRecorder,
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (audioContext) {
    playBeep(audioContext, 523.25, 0.15);
  }
  handleStartRecording(audioRecorder, setIsRecording, setShowPlayer, setError);
  setIsPaused(false);
};

export const stopRecording = (
  audioContext: AudioContext | null,
  audioRecorder: AudioRecorder,
  setAudioBlob: React.Dispatch<React.SetStateAction<Blob | null>>,
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>,
  setTimer: React.Dispatch<React.SetStateAction<number>>
) => {
  if (audioContext) {
    playBeep(audioContext, 392.00, 0.15);
  }
  handleStopRecording(audioRecorder, setAudioBlob, setIsRecording, setShowPlayer);
  setIsPaused(false);
  setTimer(0);
  localStorage.setItem('timer', '0');
  localStorage.setItem('isRecording', 'false');
  localStorage.setItem('isPaused', 'false');
};

export const pauseRecording = (
  audioRecorder: AudioRecorder,
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
) => {
  audioRecorder.pauseRecording();
  setIsPaused(true);
};

export const resumeRecording = (
  audioRecorder: AudioRecorder,
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>
) => {
  audioRecorder.resumeRecording();
  setIsPaused(false);
};

export const onFileUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  setAudioBlob: React.Dispatch<React.SetStateAction<Blob | null>>,
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>
) => handleFileUpload(event, setAudioBlob, setShowPlayer);

export const generateFlashcards = (
  audioBlob: Blob | null,
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>
) => audioBlob && handleGenerateFlashcards(audioBlob, setIsGenerating);
