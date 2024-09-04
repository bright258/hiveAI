export interface AudioRecorderInterface {
    resumeRecording(): unknown;
    pauseRecording(): unknown;
    startRecording: () => Promise<void>;
    stopRecording: () => Promise<Blob>;
  }