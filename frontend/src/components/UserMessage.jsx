// UserMessage.js
import React from 'react';

const UserMessage = ({ message }) => {
    return (
        <div className="w-fit ml-auto max-w-lg bg-blue-600 text-white p-4 rounded-lg shadow-md animate-slideInRight">
            {message}
        </div>
    );
};

export default UserMessage;