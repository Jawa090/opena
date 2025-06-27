// Simulated AI service - in production, replace with actual API calls
export interface AIResponse {
  text: string;
  audioUrl: string;
  confidence?: number; // Optional, backend does not provide
}

const AI_RESPONSES = [
  {
    keywords: ['hello', 'hi', 'greeting'],
    responses: [
      "Hello! I'm your AI assistant. How can I help you today?",
      "Hi there! I'm excited to chat with you. What would you like to discuss?",
      "Greetings! I'm here to assist you with any questions or tasks you might have."
    ]
  },
  {
    keywords: ['help', 'assist', 'support'],
    responses: [
      "I'm here to help! I can assist with various tasks, answer questions, provide information, and engage in meaningful conversations. What specific area would you like help with?",
      "Absolutely! I can help you with problem-solving, creative tasks, information gathering, or just have a friendly chat. What's on your mind?",
      "I'd be happy to assist you! Whether you need technical help, creative input, or just someone to talk to, I'm here for you."
    ]
  },
  {
    keywords: ['create', 'build', 'make', 'design'],
    responses: [
      "I love creative projects! I can help you brainstorm ideas, create content, design solutions, or build something new. What are you looking to create?",
      "Creating something new is exciting! Whether it's writing, planning, designing, or problem-solving, I'm ready to collaborate with you.",
      "Let's build something amazing together! I can assist with planning, ideation, content creation, or technical guidance. What's your vision?"
    ]
  },
  {
    keywords: ['explain', 'understand', 'learn', 'teach'],
    responses: [
      "I'd be happy to explain! I can break down complex topics, provide step-by-step guidance, or help you understand new concepts. What would you like to learn about?",
      "Learning is wonderful! I can explain concepts in simple terms, provide examples, or guide you through processes. What topic interests you?",
      "I love teaching and explaining things! Whether it's technical concepts, creative processes, or general knowledge, I'm here to help you understand."
    ]
  }
];

const GENERAL_RESPONSES = [
  "That's an interesting topic! Let me share some thoughts on that...",
  "I appreciate you sharing that with me. Here's what I think about this...",
  "That's a great question! Based on my understanding...",
  "I find that topic fascinating. Let me provide some insights...",
  "Thanks for bringing that up! Here's my perspective on this...",
];

export const generateAIResponse = async (prompt: string): Promise<AIResponse> => {
  const response = await fetch('http://localhost:4000/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate AI response');
  }

  const data = await response.json();
  return {
    text: data.text,
    audioUrl: data.audioUrl,
  };
};