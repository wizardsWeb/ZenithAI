
// TextInput.js
import React, { useState } from 'react';
import { IoMdSend } from 'react-icons/io';

const TextInput = ({ handleMessageAdd }) => {
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const submit = (event) => {
        event.preventDefault();
        if (message.trim()) {
            handleMessageAdd("user", message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={submit} className="flex items-center space-x-2">
            <input
                type="text"
                value={message}
                onChange={handleChange}
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
                <IoMdSend size={24} />
            </button>
        </form>
    );
};

export default TextInput;