
export type AppStage = 'landing' | 'game' | 'gallery' | 'notes' | 'proposal' | 'dashboard';

export interface Memory {
  id: number;
  imageUrl: string;
  caption: string;
  totemImageUrl: string;
  totemLabel: string;
  quote: string;
}

export interface LoveNote {
  id: number;
  message: string;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: string;
}

export interface TimeCapsule {
  id: string;
  message: string;
  openDate: string;
  createdAt: number;
}
