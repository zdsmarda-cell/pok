
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface GreetingVariant {
  language: string;
  text: string;
  pronunciation: string;
  context: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  CHATTING = 'CHATTING',
  ERROR = 'ERROR'
}
