export interface User {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
  location: string | null;
  created_at: string;
} 