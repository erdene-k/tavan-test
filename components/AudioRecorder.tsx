"use client";

import { useState, useRef } from "react";

type AudioRecorderProps = {
  onAudioRecorded: (audioBlob: Blob) => void;
  isDisabled: boolean;
};

export function AudioRecorder({ onAudioRecorded, isDisabled }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        onAudioRecorded(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please ensure you've granted permission.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="flex items-center justify-center">
      {isRecording ? (
        <button
          onClick={stopRecording}
          className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700 flex items-center justify-center"
          disabled={isDisabled}
        >
          <span className="h-3 w-3 bg-white rounded-sm"></span>
        </button>
      ) : (
        <button
          onClick={startRecording}
          className="bg-[#60A5FA] text-white p-4 rounded-full hover:bg-blue-700 flex items-center justify-center"
          disabled={isDisabled}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
        </button>
      )}
      <p className="ml-4 text-gray-500">
        {isRecording ? "Recording... Click to stop" : "Click to start recording"}
      </p>
    </div>
  );
}