import React from 'react';
import { MessageCircle, Bot, Volume2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

interface ConversationHistoryProps {
  messages: Message[];
  onPlayAudio: (audioUrl: string) => void;
}

export const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  messages,
  onPlayAudio,
}) => {
  // Only show the latest AI response
  const latestAiMessage = messages.filter(msg => msg.type === 'ai').pop();

  if (!latestAiMessage) {
    return (
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 text-center">
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Enter a prompt above to get an AI response!</p>
      </div>
    );
  }

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">AI Response</h3>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <p className="text-gray-800 leading-relaxed mb-3">{latestAiMessage.content}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {latestAiMessage.timestamp.toLocaleTimeString()}
          </span>
          {latestAiMessage.audioUrl && (
            <button
              onClick={() => onPlayAudio(latestAiMessage.audioUrl!)}
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
            >
              <Volume2 className="w-4 h-4" />
              Play Audio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};