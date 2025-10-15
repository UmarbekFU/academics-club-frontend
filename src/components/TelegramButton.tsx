'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';

const TelegramButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="https://t.me/theacademicsadmin"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on Telegram"
    >
      <div className="relative">
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-lg animate-fade-in">
            Chat with Admin
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-gray-900 transform rotate-45"></div>
          </div>
        )}
        
        {/* Button */}
        <div className="bg-[#0088cc] hover:bg-[#0077b3] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
          <Send className="w-6 h-6" />
        </div>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-[#0088cc] rounded-full animate-ping opacity-20"></div>
      </div>
    </a>
  );
};

export default TelegramButton;

