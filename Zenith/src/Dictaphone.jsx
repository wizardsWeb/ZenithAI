import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  const navigate = useNavigate();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-red-500 text-white p-4 text-center">
        Browser doesn't support speech recognition.
      </div>
    );
  }

  const handleNavigation = () => {
    if (transcript.toLowerCase().includes("go to home")) {
      navigate("/home");
    } else if (transcript.toLowerCase().includes("go to profile")) {
      navigate("/profile");
    } else if (transcript.toLowerCase().includes("go to chat")) {
      navigate("/chat");
    } else if (transcript.toLowerCase().includes("go to ar meditation")) {
      navigate("/ar-meditation");
    } else if (transcript.toLowerCase().includes("go to face detection")) {
      navigate("/face-detection");
    }
  };

  useEffect(() => {
    if (transcript) {
      handleNavigation();
    }
  }, [transcript]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <div
            className={`w-4 h-4 rounded-full ${
              listening ? "bg-green-500" : "bg-red-500"
            }`}
            title={listening ? "Microphone is ON" : "Microphone is OFF"}
          ></div>
          <span className="text-sm">
            Microphone: {listening ? "Listening" : "Off"}
          </span>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={SpeechRecognition.startListening}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded"
          >
            Start
          </button>
          <button
            onClick={SpeechRecognition.stopListening}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-1 px-3 rounded"
          >
            Stop
          </button>
          <button
            onClick={resetTranscript}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dictaphone;
