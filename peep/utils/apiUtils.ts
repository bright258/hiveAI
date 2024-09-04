import { AssemblyAI } from 'assemblyai';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp, FirebaseError } from "firebase/app";
import { UploadResult } from "firebase/storage";





export const transcribeAudio = async (url: string) => {
  try{
    const client = new AssemblyAI({
      apiKey: process.env.NEXT_PUBLIC_ASSEMBLY_AI_API_KEY as string,
      });
    const transcript = await client.transcripts.transcribe({ audio: url });
    return transcript.text as string;} catch(error){
      console.log(error, 'fireeee')
    }
  
};

export const uploadAudioToFirebase = async (audioBlob: Blob): Promise<string> => {
  try {
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
    
    const storage = getStorage(app);
    const audioRef = ref(storage, `audios/${Date.now()}.wav`);
    
    // Set a timeout for the upload
    const uploadPromise = uploadBytes(audioRef, audioBlob);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Upload timed out')), 10000) // 10 seconds timeout
    );

    const snapshot = await Promise.race([uploadPromise, timeoutPromise]);
    const uploadResult = snapshot as UploadResult;
    return await getDownloadURL(uploadResult.ref);
  } catch (error) {
    throw error
    
  }
};







