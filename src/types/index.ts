export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  date: string;
  scripture: string;
  description: string;
  category: 'Latest Sermons' | 'Bible Study' | 'Prophecy' | 'Christian Living' | 'Youth Messages' | 'Special Worship Services';
  videoUrl: string;
  audioUrl?: string;
  thumbnailUrl: string;
  duration: string;
  featured?: boolean;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: 'Evangelism' | 'Youth' | 'Sabbath Special' | 'Prayer' | 'Baptism' | 'Outreach' | 'Seminar' | 'Camp Meeting';
  description: string;
  imageUrl: string;
  registrationRequired?: boolean;
  registrationCount?: number;
  featured?: boolean;
}

export interface Ministry {
  id: string;
  title: string;
  leader: string;
  description: string;
  mission: string;
  activities: string[];
  meetingSchedule: string;
  imageUrl: string;
  category: string;
  contactEmail: string;
}

export interface WorshipProgram {
  id: string;
  name: string;
  day: string;
  time: string;
  description: string;
  location: string;
  active: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'normal' | 'high' | 'urgent';
  active: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Church Services' | 'Baptisms' | 'Worship & Praise' | 'Youth Activities' | 'Mission & Outreach' | 'Conferences';
  imageUrl: string;
  date: string;
  description?: string;
}

export interface VisitorRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  numberOfVisitors: number;
  preferredVisitDate: string;
  message?: string;
  createdAt: string;
  status: 'Pending' | 'Contacted' | 'Welcomed' | 'Followed Up';
  notes?: string;
}

export interface BibleStudyRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredMethod: 'In-Person' | 'Online Zoom' | 'Self-Paced Guides' | 'Telephone';
  message: string;
  createdAt: string;
  status: 'New' | 'Assigned' | 'In Progress' | 'Completed';
  assignedTeacher?: string;
}

export interface PrayerRequest {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  isConfidential: boolean;
  requestText: string;
  createdAt: string;
  status: 'Received' | 'Prayed For' | 'Praise Report';
  notes?: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  category: 'General enquiry' | 'Prayer request' | 'Bible study' | 'Church programmes' | 'Volunteering' | 'Other';
  message: string;
  createdAt: string;
  status: 'Unread' | 'Read' | 'Replied';
}

export interface ChurchSettings {
  churchName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  sabbathSchoolTime: string;
  divineWorshipTime: string;
  prayerMeetingTime: string;
  livestreamUrl: string;
  givingInstructions: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Administrator' | 'Administrator' | 'Content Editor';
  active: boolean;
  lastLogin: string;
}
