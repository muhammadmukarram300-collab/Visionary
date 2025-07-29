export interface Vision {
  id: string;
  name: string;
  description: string;
  completedDates: string[];
}

export type Page = 'opening' | 'intermediate' | 'home' | 'analysis' | 'performanceCoach' | 'mindset' | 'ai' | 'history' | 'settings' | 'conversationHistory';

export interface Reward {
  id: string;
  name: string;
  date: string;
}

export interface Conversation {
  id:string;
  prompt: string;
  response: string;
  timestamp: string;
}