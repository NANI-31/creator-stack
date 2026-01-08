export interface SubmissionAuthor {
  username: string;
  avatar: string;
  reputation: number;
  totalSubmissions: number;
  joinDate: string;
}

export interface SubmissionStats {
  upvotes: number;
  rating: number;
  reviewCount: number;
  comments: number;
}

export interface HistoryItem {
  action: string;
  user: string;
  date: string;
  note: string;
}

export interface Submission {
  id: string;
  name: string;
  url: string;
  favicon: string;
  description: string;
  fullDescription: string;
  category: string;
  tags: string[];
  pricing: string;
  submittedBy: SubmissionAuthor;
  stats: SubmissionStats;
  status: string;
  submittedDate: string;
  history: HistoryItem[];
}
