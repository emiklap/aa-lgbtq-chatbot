export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
  model: string;
}

export interface Topic {
  id: string;
  label: string;
}

export interface FeedbackRequest {
  rating: number;
  comment?: string;
}
