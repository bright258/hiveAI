'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaUpload, FaDownload } from 'react-icons/fa';
import { AudioRecorder } from '../../../utils/audioRecorder';
import {
  formatTime,
  createDownloadLink,
  handleStartRecording,
  handleStopRecording,
  handleFileUpload,
  handleGenerateFlashcards,
  AudioRecorderInterface
} from '../../../utils/apiUtils';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [timer, setTimer] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRecorder = useRef<AudioRecorderInterface>(new AudioRecorder());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => setTimer((prevTimer) => prevTimer + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => handleStartRecording(audioRecorder.current, setIsRecording, setShowPlayer, setError);
  const stopRecording = () => handleStopRecording(audioRecorder.current, setAudioBlob, setIsRecording, setShowPlayer);
  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setAudioBlob, setShowPlayer);
  const generateFlashcards = () => audioBlob && handleGenerateFlashcards(audioBlob, setIsGenerating);

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
            onChange={onFileUpload}
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
              onClick={() => audioBlob && createDownloadLink(audioBlob)}
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
              onClick={generateFlashcards}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating Flashcards...' : 'Generate Flashcards'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
