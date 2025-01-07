import React, { useState } from 'react';
import BotMessage from '../components/BotMessage';
import UserMessage from '../components/UserMessage';
import TextInput from '../components/TextInput';
import VoiceInput from '../components/VoiceInput';
import { BiSolidMicrophone } from 'react-icons/bi';
import QuizModal from '../components/QuizModal';

const Chat = () => {
  const [isVoiceActivated, setVoiceActivated] = useState(false);
  const [isQuizModalOpen, setQuizModalOpen] = useState(false);
  const [showQuizButton, setShowQuizButton] = useState(true); // State for showing the button

  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Hi! How are you feeling today?' },
  ]);

  const handleMessageAdd = async (type, message) => {
    setChatHistory((prevHistory) => [...prevHistory, { type, message }]);

    if (type === 'user') {
      try {
        const response = await fetch('http://127.0.0.1:8080/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: message }),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { type: 'bot', message: data.data },
        ]);
      } catch (error) {
        console.error('Error:', error);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { type: 'bot', message: 'Oops! Something went wrong.' },
        ]);
      }
    }
  };

  const handleVoiceInput = (speechText) => {
    if (speechText) {
    //   handleMessageAdd('user', speechText);
        return
}
  };
  const handleQuizSubmit = (quizResponse) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: 'user', message: `Quiz Response: ${quizResponse}` },
    ]);
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { type: 'bot', message: 'Thank you for sharing your feelings!' },
    ]);
  };

  const handleQuizButtonClick = () => {
    setQuizModalOpen(true);
    setShowQuizButton(false);
  };
  return (
    <div className="w-full flex justify-between  bg-gray-50">
      <div className={`${isVoiceActivated ? 'w-7/12' : 'w-full'} flex flex-col`}>
        {/* Header */}
        <div className="w-full h-16 bg-blue-500 text-white flex items-center px-5 shadow-lg">
          <p className="text-xl font-semibold">Talk with Me</p>
          <button
            type="button"
            className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            onClick={() => setVoiceActivated(!isVoiceActivated)}
          >
            <BiSolidMicrophone size={20} />
            Use Voice
          </button>
                {/* Quiz Button */}
                {showQuizButton && (
          <div className="p-5 text-center">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              onClick={handleQuizButtonClick}
            >
              Would you like to understand your feelings better?
            </button>
          </div>
        )}
        </div>
        
        {/* Chat History */}
        <div className="h-[calc(100vh-160px)] overflow-y-scroll p-5">
          {chatHistory.map((chat, index) =>
            chat.type === 'user' ? (
              <UserMessage key={index} message={chat.message} />
            ) : (
              <BotMessage key={index} message={chat.message} />
            )
          )}
        </div>

        {/* Text Input */}
        <div className="p-5 fixed bottom-0 w-[86vw]">
          <TextInput handleMessageAdd={handleMessageAdd} />
        </div>
      </div>

      {/* Voice Input */}
      {isVoiceActivated && (
        <div className="w-5/12 bg-gray-100 shadow-lg">
          <VoiceInput handleVoiceInput={handleVoiceInput} />
        </div>
      )}
            {/* Quiz Modal */}
            <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        onSubmit={handleQuizSubmit}
      />
    </div>
  );
};

export default Chat;
