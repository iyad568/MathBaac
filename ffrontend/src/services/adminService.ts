import { apiClient } from './apiClient';

export interface AdminUser {
  id: number;
  fullName: string;
  email: string;
  stream: string | null;
  isAdmin: boolean;
  createdAt: string | null;
  activitiesCount: number;
  studyMinutes: number;
}

export interface AdminStats {
  totalUsers: number;
  totalAdmins: number;
  newUsersLast7Days: number;
  totalExercises: number;
  totalBacExercises: number;
  totalActivities: number;
  totalCommunityPosts: number;
}

export type ExerciseType = 'exercise' | 'bac';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ExerciseListItem {
  id: number;
  external_id: string | null;
  chapter_id: string;
  concept_id: string | null;
  exercise_type: ExerciseType;
  title: string | null;
  difficulty: Difficulty | null;
  estimated_minutes: number | null;
  points: number | null;
  bac_year: number | null;
  bac_session: 'Normal' | 'Rattrapage' | null;
  bac_stream: string | null;
}

export interface ExerciseDetail extends ExerciseListItem {
  content: string;
  solution: string | null;
}

// The admin form only edits the basic fields; imported rich fields (answer keys, solution steps) are left untouched.
export type ExerciseInput = Omit<ExerciseDetail, 'id' | 'external_id'>;

export interface ExtractedText {
  filename: string;
  text: string;
  page_count: number | null;
  warning: string | null;
}

export const adminService = {
  getStats: () => apiClient.get<AdminStats>('/admin/stats'),

  listUsers: (search?: string) =>
    apiClient.get<AdminUser[]>(`/admin/users${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  updateUser: (id: number, changes: { fullName?: string; isAdmin?: boolean }) =>
    apiClient.put<AdminUser>(`/admin/users/${id}`, changes),
  deleteUser: (id: number) => apiClient.delete<void>(`/admin/users/${id}`),

  listExercises: (type?: ExerciseType) =>
    apiClient.get<ExerciseListItem[]>(`/exercises/${type ? `?exercise_type=${type}` : ''}`),
  getExercise: (id: number) => apiClient.get<ExerciseDetail>(`/exercises/${id}`),
  createExercise: (data: ExerciseInput) => apiClient.post<ExerciseDetail>('/exercises/', data),
  updateExercise: (id: number, data: ExerciseInput) => apiClient.put<ExerciseDetail>(`/exercises/${id}`, data),
  deleteExercise: (id: number) => apiClient.delete<void>(`/exercises/${id}`),
  extractText: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return apiClient.postForm<ExtractedText>('/exercises/extract-text', form);
  },
};
