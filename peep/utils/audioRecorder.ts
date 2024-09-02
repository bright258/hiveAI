export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  async startRecording(): Promise<MediaRecorder> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    return new Promise((resolve, reject) => {
      this.mediaRecorder!.onstart = () => resolve(this.mediaRecorder!);
      this.mediaRecorder!.onerror = (event) => reject(event.error);
      this.mediaRecorder!.start();
    });
  }

  stopRecording(): Blob {
    return new Promise<Blob>((resolve) => {
      this.mediaRecorder!.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioChunks = [];
        resolve(audioBlob);
      };
      this.mediaRecorder!.stop();
    });
  }
}