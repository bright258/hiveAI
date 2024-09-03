import { AudioContext as OriginalAudioContext } from 'web-audio-api';

declare module 'web-audio-api' {
  interface AudioContext extends OriginalAudioContext {
    createOscillator(): OscillatorNode;
    createGain(): GainNode;
  }
}
