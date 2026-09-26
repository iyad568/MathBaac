import { AuthUser } from '../types';
import { apiClient, tokenStorage } from './apiClient';
import { localStorageService } from './localStorageService';

interface ApiUser {
  id: number;
  fullName: string;
  email: string;
  is_admin: boolean;
  stream: string | null;
  createdAt: string | null;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string | null;
  doctor: ApiUser;
}

const DEFAULT_STREAM = 'شعبة العلوم التجريبية';

function toAuthUser(user: ApiUser): AuthUser {
  return {
    id: String(user.id),
    email: user.email,
    fullName: user.fullName,
    stream: user.stream ?? '',
    isAdmin: user.is_admin,
    isLoggedIn: true,
    createdAt: user.createdAt ?? '',
  };
}

function persistSession(data: TokenResponse): AuthUser {
  tokenStorage.set(data.access_token, data.refresh_token);
  const user = toAuthUser(data.doctor);
  localStorageService.setAuthUser(user);
  return user;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthUser> {
    const data = await apiClient.post<TokenResponse>('/auth/login', { email: email.trim(), password });
    return persistSession(data);
  },

  async register(fullName: string, email: string, password: string): Promise<AuthUser> {
    const data = await apiClient.post<TokenResponse>('/auth/register', {
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      confirmPassword: password,
      stream: DEFAULT_STREAM,
    });
    return persistSession(data);
  },

  logout(): void {
    tokenStorage.clear();
    localStorageService.logout();
  },
};
