import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types';
import { localStorageService } from '../services/localStorageService';
import { authService } from '../services/authService';
import { progressApiService } from '../services/progressApiService';
import { AUTH_EXPIRED_EVENT, tokenStorage } from '../services/apiClient';

interface AuthContextType {
  user: AuthUser;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (fullName: string, email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOGGED_OUT_USER: AuthUser = {
  id: '',
  email: '',
  fullName: '',
  stream: '',
  isLoggedIn: false,
  createdAt: '',
};

// A stored session only counts if it has a real backend token (older fake sessions do not).
const loadInitialUser = (): AuthUser => {
  const stored = localStorageService.getAuthUser();
  return stored.isLoggedIn && tokenStorage.getAccess() ? stored : LOGGED_OUT_USER;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>(loadInitialUser);

  const logout = () => {
    authService.logout();
    setUser(LOGGED_OUT_USER);
  };

  useEffect(() => {
    window.addEventListener(AUTH_EXPIRED_EVENT, logout);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, logout);
  }, []);

  // One-time push of lesson-completion flags recorded locally before progress was backend-tracked.
  useEffect(() => {
    if (user.isLoggedIn) {
      progressApiService.migrateLocalLessonCompletions();
    }
  }, [user.isLoggedIn]);

  const login = async (email: string, password: string) => {
    const loggedUser = await authService.login(email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async (fullName: string, email: string, password: string) => {
    const newUser = await authService.register(fullName, email, password);
    setUser(newUser);
    return newUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user?.isLoggedIn),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
