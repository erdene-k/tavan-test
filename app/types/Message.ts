export enum MessageType {
    USER = 'user',
    ASSISTANT = 'assistant',
  }
  
export interface Message {
    id: string;
    type: MessageType;
    content: string;
    timestamp: Date;
  }
  