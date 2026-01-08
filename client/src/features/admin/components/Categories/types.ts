export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  websiteCount: number;
  status: "Active" | "Hidden";
  createdDate: string;
}
