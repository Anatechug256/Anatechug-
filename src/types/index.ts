export type Category = 
  | 'All'
  | 'Repair & Making'
  | 'Music & Arts'
  | 'Career & Digital'
  | 'Food & Cooking'
  | 'Language & Learning'
  | 'Home & Garden';

export type SwapPreference = 'any' | 'direct_barter' | 'hour_credit';

export type SessionFormat = 'In-person' | 'Virtual' | 'Both';

export interface Vouch {
  id: string;
  authorName: string;
  authorAvatar?: string;
  skillName: string;
  text: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  neighborhood: string;
  bio: string;
  hoursBalance: number;
  swapsCompleted: number;
  vouchesCount: number;
  skillsOffered: string[];
  skillsWanted: string[];
}

export interface SkillListing {
  id: string;
  userId: string;
  author: User;
  title: string;
  category: Category;
  durationHours: number;
  swapPreference: SwapPreference;
  lookingForSkill: string;
  format: SessionFormat;
  location: string;
  description: string;
  image: string;
  experienceLevel: 'Beginner Friendly' | 'Intermediate' | 'All Levels';
  toolsProvided: string[];
  createdAt: string;
  vouches: Vouch[];
}

export interface SkillRequest {
  id: string;
  userId: string;
  author: User;
  title: string;
  category: Category;
  urgency: 'Flexible' | 'This Week' | 'Urgent';
  creditsOffered: number;
  lookingFor: string;
  format: SessionFormat;
  responsesCount: number;
  createdAt: string;
}

export interface SwapMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface SwapProposal {
  id: string;
  listingId?: string;
  requesterId: string;
  recipientId: string;
  requester: User;
  recipient: User;
  offeredType: 'direct_swap' | 'time_credit';
  offeredSkillTitle?: string;
  requestedSkillTitle: string;
  hours: number;
  proposedDate: string;
  proposedTime: string;
  location: string;
  format: SessionFormat;
  note: string;
  status: 'pending' | 'accepted' | 'completed' | 'declined';
  messages: SwapMessage[];
  createdAt: string;
}

export interface LedgerTransaction {
  id: string;
  userId: string;
  type: 'credit_earned' | 'credit_spent' | 'welcome_grant';
  hours: number;
  description: string;
  counterpartName: string;
  timestamp: string;
  swapId?: string;
}
