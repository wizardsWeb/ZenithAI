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
  
  const navigate = useNavigate(); // Hook to use React Router for navigation

  // If the browser doesn't support SpeechRecognition, show a message
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // Function to handle navigation based on the transcript command
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
    // Check for valid command after every new transcript
    if (transcript) {
      handleNavigation();
    }
  }, [transcript]); // Run handleNavigation whenever transcript changes

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;
