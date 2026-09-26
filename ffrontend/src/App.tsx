import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './layouts/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { MathematicsPage } from './pages/MathematicsPage';
import { ChapterDetailPage } from './pages/ChapterDetailPage';
import { ConceptPage } from './pages/ConceptPage';
import { ExercisesBankPage } from './pages/ExercisesBankPage';
import { BACLibraryPage } from './pages/BACLibraryPage';
import { TestsPage } from './pages/TestsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';
import { CommunityPage } from './pages/CommunityPage';
import { CommunityPostDetailPage } from './pages/CommunityPostDetailPage';
import { CommunityUserProfilePage } from './pages/CommunityUserProfilePage';
import { AdminPage } from './pages/AdminPage';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// The UI guard only hides the page; the backend enforces admin access on every /admin request.
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user.isAdmin ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

// Root index redirector - shows login first if not logged in
const RootRedirect: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return <Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Root entry point */}
      <Route path="/" element={<RootRedirect />} />

      {/* Standalone Full-Screen Login & Auth */}
      <Route path="/login" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected App Routes wrapped in AppLayout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="mathematics" element={<MathematicsPage />} />
        <Route path="mathematics/:chapterId" element={<ChapterDetailPage />} />
        <Route path="concept/:conceptId" element={<ConceptPage />} />
        <Route path="exercises" element={<ExercisesBankPage />} />
        <Route path="bac" element={<BACLibraryPage />} />
        <Route path="tests" element={<TestsPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="community/post/:postId" element={<CommunityPostDetailPage />} />
        <Route path="community/user/:userId" element={<CommunityUserProfilePage />} />
        <Route path="progress" element={<Navigate to="/dashboard" replace />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
      </Route>

      {/* Fallback Catch-all */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

