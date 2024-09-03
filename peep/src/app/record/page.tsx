'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaUpload, FaDownload } from 'react-icons/fa';
import { transcribeAudio, generateFlashcards, Flashcard } from '../../../utils/apiUtils';
import { AudioRecorder } from '../../../utils/audioRecorder';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [timer, setTimer] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const audioRecorder = useRef(new AudioRecorder());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => setTimer((prevTimer) => prevTimer + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      await audioRecorder.current.startRecording();
      setIsRecording(true);
      setShowPlayer(false);
      setError(null);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Microphone is currently in use by another application or not accessible.');
    }
  };

  const stopRecording = async () => {
    const audioBlob = await audioRecorder.current.stopRecording();
    setAudioBlob(audioBlob);
    setIsRecording(false);
    setShowPlayer(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const downloadAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'audio.wav';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  async function handleGenerateFlashcards() {
    if (audioBlob) {
      setIsGenerating(true);
      try {
        const transcript = await transcribeAudio(audioBlob);
        const generatedFlashcards = await generateFlashcards(transcript);
        setFlashcards(generatedFlashcards);
      } catch (error) {
        console.error('Failed to generate flashcards:', error);
        alert('Failed to generate flashcards. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Audio Recorder</h1>
        <div className="text-4xl font-semibold mb-6 text-center">
          <div className="inline-block font-mono w-32 text-center bg-gray-100 p-2 rounded">
            {formatTime(timer)}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`p-4 rounded-full ${isRecording ? 'bg-red-500' : 'bg-blue-500'} text-white`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <FaStop size={24} /> : <FaMicrophone size={24} />}
          </button>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            className="p-4 rounded-full bg-green-500 text-white"
            onClick={() => fileInputRef.current?.click()}
          >
            <FaUpload size={24} />
          </button>
          {audioBlob && !isRecording && (
            <button
              className="p-4 rounded-full bg-yellow-500 text-white"
              onClick={downloadAudio}
            >
              <FaDownload size={24} />
            </button>
          )}
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {showPlayer && audioBlob && (
          <div className="mt-4">
            <audio controls src={URL.createObjectURL(audioBlob)} className="w-full mb-4" />
            <button
              className="w-full px-4 py-2 bg-purple-500 text-white rounded"
              onClick={handleGenerateFlashcards}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating Flashcards...' : 'Generate Flashcards'}
            </button>
          </div>
        )}
        {flashcards.length > 0 && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Flashcards</h2>
            {flashcards.map((card, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-100 rounded">
                <p className="font-medium">{card.question}</p>
                <p className="mt-2 text-gray-600">{card.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
