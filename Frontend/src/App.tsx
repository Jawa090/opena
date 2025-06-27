import React, { useState, useCallback } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { PromptInput } from './components/PromptInput';
import { ConversationHistory } from './components/ConversationHistory';
import { AudioPlayer } from './components/AudioPlayer';
import { generateAIResponse } from './services/aiService';
import { Message } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  const handleSubmit = useCallback(async (prompt: string) => {
    if (isLoading) return;

    setIsLoading(true);

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Generate AI response
      const aiResponse = await generateAIResponse(prompt);

      // Add AI message
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: aiResponse.text,
        timestamp: new Date(),
        audioUrl: aiResponse.audioUrl,
        confidence: aiResponse.confidence,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: 'ai',
        content: 'I apologize, but I encountered an error while generating a response. Please try again.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handlePlayAudio = useCallback((audioUrl: string) => {
    setCurrentAudio(audioUrl);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Conversation Builder</h1>
              <p className="text-sm text-gray-600">Enter a prompt and get intelligent responses</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Prompt Input */}
        <PromptInput onSubmit={handleSubmit} isLoading={isLoading} />
        
        {/* AI Response */}
        <ConversationHistory 
          messages={messages} 
          onPlayAudio={handlePlayAudio}
        />

        {/* Audio Player */}
        {currentAudio && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Audio Response</h3>
            <AudioPlayer 
              audioUrl={currentAudio} 
              onEnded={() => setCurrentAudio(null)}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;