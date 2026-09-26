export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  stream: string;
  token?: string;
  isAdmin?: boolean;
  isLoggedIn: boolean;
  createdAt: string;
}
