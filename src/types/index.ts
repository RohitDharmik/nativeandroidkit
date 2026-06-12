export type UserRole = 'individual' | 'commercial' | 'admin';
export type UserKycStatus = 'pending' | 'submitted' | 'verified' | 'rejected';
export type SubscriptionPlan = 'free' | 'premium' | 'commercial_pro';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  avatarUrl?: string;
  city?: string;
  state?: string;
  credits: number;
  plan: SubscriptionPlan;
  kycStatus: UserKycStatus;
  companyId?: string;
  createdAt: string;
}

export interface Company {
  id: string;
  ownerId: string;
  name: string;
  gst?: string;
  cin?: string;
  pan?: string;
  registration?: string;
  logoUrl?: string;
  coverUrl?: string;
  description: string;
  team?: TeamMember[];
  certifications?: string[];
  city: string;
  state: string;
  yearFounded?: number;
  employees?: string;
  rating: number;
  reviewsCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export type ServiceCategoryId =
  | 'architecture'
  | 'structural'
  | 'legal'
  | 'approvals'
  | 'contractors'
  | 'interior'
  | 'materials'
  | 'survey'
  | 'project_mgmt'
  | 'environmental'
  | 'financial';

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  icon: string; // ionicon name
  description: string;
  count: number;
}

export interface Service {
  id: string;
  vendorId: string;
  category: ServiceCategoryId;
  name: string;
  description: string;
  priceFrom: number;
  priceUnit: string;
  city: string;
  state: string;
  images: string[];
  documents: ServiceDocument[];
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  featured: boolean;
  premium: boolean;
  deliverables: string[];
  tags: string[];
}

export interface ServiceDocument {
  id: string;
  name: string;
  url: string;
  sizeKb: number;
  premium: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export type LeadStatus =
  | 'new'
  | 'assigned'
  | 'contacted'
  | 'negotiation'
  | 'converted'
  | 'closed';

export interface Lead {
  id: string;
  buyerName: string;
  buyerMobile: string;
  buyerEmail?: string;
  serviceId: string;
  serviceName: string;
  message: string;
  budget?: number;
  city?: string;
  status: LeadStatus;
  notes?: LeadNote[];
  createdAt: string;
  updatedAt: string;
}

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface ChatThread {
  id: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  serviceId?: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  fromMe: boolean;
  text?: string;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'file';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  type: 'lead' | 'payment' | 'system' | 'subscription' | 'message';
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

export interface Plan {
  id: SubscriptionPlan;
  name: string;
  pricePerMonth: number;
  credits: number;
  highlight?: string;
  features: string[];
  recommended?: boolean;
}

export interface CreditPack {
  id: string;
  credits: number;
  price: number;
  bonus?: number;
}

export interface PurchaseHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'plan' | 'credits' | 'featured';
  status: 'success' | 'pending' | 'failed';
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: string;
  createdAt: string;
  updatedAt: string;
  messages: { id: string; fromMe: boolean; text: string; createdAt: string }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface FormField {
  field: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'mobile' | 'date' | 'upload' | 'select' | 'radio' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface FormSchema {
  id: string;
  title: string;
  fields: FormField[];
}
