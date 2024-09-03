'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaStop, FaUpload, FaDownload, FaPause, FaPlay } from 'react-icons/fa';
import { AudioRecorder } from '../../../utils/audioRecorder';
import { formatTime, createDownloadLink, AudioRecorderInterface } from '../../../utils/apiUtils';
import { Button } from '../../../components/ui/button';
import { Sparkles } from 'lucide-react';
import {
  startRecording,
  stopRecording,
  pauseRecording,
  resumeRecording,
  onFileUpload,
  generateFlashcards
} from '../../../utils/recordingUtils';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [timer, setTimer] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRecorder = useRef<AudioRecorder>(new AudioRecorder());
  const audioContext = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Retrieve state from local storage on component mount
    const storedAudioBlob = localStorage.getItem('audioBlob');
    const storedTimer = localStorage.getItem('timer');
    const storedIsRecording = localStorage.getItem('isRecording');
    const storedIsPaused = localStorage.getItem('isPaused');

    if (storedAudioBlob) {
      const blob = new Blob([Uint8Array.from(JSON.parse(storedAudioBlob))], { type: 'audio/webm' });
      setAudioBlob(blob);
      setShowPlayer(true);
    }
    if (storedTimer) setTimer(parseInt(storedTimer));
    if (storedIsRecording) setIsRecording(JSON.parse(storedIsRecording));
    if (storedIsPaused) setIsPaused(JSON.parse(storedIsPaused));
  }, []);

  useEffect(() => {
    // Store state in local storage whenever it changes
    if (audioBlob) {
      const reader = new FileReader();
      reader.onload = function() {
        if (reader.result instanceof ArrayBuffer) {
          const array = new Uint8Array(reader.result);
          localStorage.setItem('audioBlob', JSON.stringify(Array.from(array)));
        }
      };
      reader.readAsArrayBuffer(audioBlob);
    } else {
      localStorage.removeItem('audioBlob');
    }
    localStorage.setItem('timer', timer.toString());
    localStorage.setItem('isRecording', JSON.stringify(isRecording));
    localStorage.setItem('isPaused', JSON.stringify(isPaused));
  }, [audioBlob, timer, isRecording, isPaused]);

  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;
          localStorage.setItem('timer', newTimer.toString());
          return newTimer;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, isPaused]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Audio Recorder</h1>
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="text-6xl font-semibold mb-8 text-center">
            <div className="inline-block font-mono w-48 text-center bg-gray-700 p-4 rounded">
              {formatTime(timer)}
            </div>
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              className={`p-6 rounded-full ${isRecording && !isPaused ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              onClick={isRecording 
                ? (isPaused 
                  ? () => resumeRecording(audioRecorder.current, setIsPaused)
                  : () => pauseRecording(audioRecorder.current, setIsPaused))
                : () => startRecording(audioContext.current, audioRecorder.current, setIsRecording, setShowPlayer, setError, setIsPaused)}
            >
              {isRecording ? (isPaused ? <FaPlay size={24} /> : <FaPause size={24} />) : <FaMicrophone size={24} />}
            </Button>
            {isRecording && (
              <Button
                className="p-6 rounded-full bg-yellow-500 hover:bg-yellow-600"
                onClick={() => stopRecording(audioContext.current, audioRecorder.current, setAudioBlob, setIsRecording, setShowPlayer, setIsPaused, setTimer)}
              >
                <FaStop size={24} />
              </Button>
            )}
            <input
              type="file"
              accept="audio/*"
              onChange={(event) => onFileUpload(event, setAudioBlob, setShowPlayer)}
              ref={fileInputRef}
              className="hidden"
            />
            <Button
              className="p-6 rounded-full bg-green-500 hover:bg-green-600"
              onClick={() => fileInputRef.current?.click()}
            >
              <FaUpload size={24} />
            </Button>
            {audioBlob && !isRecording && (
              <Button
                className="p-6 rounded-full bg-purple-500 hover:bg-purple-600"
                onClick={() => audioBlob && createDownloadLink(audioBlob)}
              >
                <FaDownload size={24} />
              </Button>
            )}
          </div>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          {showPlayer && audioBlob && (
            <div className="mt-8">
              <audio controls src={URL.createObjectURL(audioBlob)} className="w-full mb-4" />
              <Button
                className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-lg"
                onClick={() => generateFlashcards(audioBlob, setIsGenerating)}
                disabled={isGenerating}
              >
                <Sparkles className="mr-2" />
                {isGenerating ? 'Generating Flashcards...' : 'Generate Flashcards'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
