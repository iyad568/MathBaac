# MathBac API

87 endpoints. All are prefixed with `/api` (except `GET /`, a health check).
Send the JWT as `Authorization: Bearer <access_token>`. Interactive docs: `/docs`.

## Contents

1. [Authentication](#authentication)
2. [Curriculum](#curriculum)
3. [Exercises](#exercises)
4. [Quizzes](#quizzes)
5. [Mini Tests](#mini-tests)
6. [Progress](#progress)
7. [Dashboard](#dashboard)
8. [Community](#community)
9. [Admin](#admin)

---

## Authentication

Base path: `/api/auth`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Log in, returns access + refresh tokens |
| POST | `/auth/refresh` | Get a new access token |
| GET | `/auth/me` | Get the current user |
| PUT | `/auth/me` | Update the current user's profile |

## Curriculum

Base path: `/api/curriculum`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/curriculum/subjects` | List subjects |
| POST | `/curriculum/subjects` | Create a subject |
| PUT | `/curriculum/subjects/{id}` | Update a subject |
| DELETE | `/curriculum/subjects/{id}` | Delete a subject |
| GET | `/curriculum/chapters` | List chapters |
| POST | `/curriculum/chapters` | Create a chapter |
| GET | `/curriculum/chapters/{id}` | Get a chapter |
| PUT | `/curriculum/chapters/{id}` | Update a chapter |
| DELETE | `/curriculum/chapters/{id}` | Delete a chapter |
| GET | `/curriculum/concepts` | List concepts |
| POST | `/curriculum/concepts` | Create a concept |
| GET | `/curriculum/concepts/{id}` | Get a concept |
| PUT | `/curriculum/concepts/{id}` | Update a concept |
| DELETE | `/curriculum/concepts/{id}` | Delete a concept |
| POST | `/curriculum/lessons` | Create a lesson |
| GET | `/curriculum/lessons/by-concept/{concept_id}` | Get the lesson of a concept |
| PUT | `/curriculum/lessons/{id}` | Update a lesson |
| DELETE | `/curriculum/lessons/{id}` | Delete a lesson |

## Exercises

Base path: `/api/exercises`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/exercises/` | List exercises |
| POST | `/exercises/` | Create an exercise |
| GET | `/exercises/{id}` | Get an exercise |
| PUT | `/exercises/{id}` | Update an exercise |
| DELETE | `/exercises/{id}` | Delete an exercise |
| POST | `/exercises/extract-text` | Extract text from an uploaded file |

## Quizzes

Base path: `/api/quizzes`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/quizzes/questions` | List quiz questions |
| POST | `/quizzes/questions` | Create a quiz question |
| GET | `/quizzes/questions/admin` | List questions with answers (admin) |
| PUT | `/quizzes/questions/{id}` | Update a question |
| DELETE | `/quizzes/questions/{id}` | Delete a question |
| POST | `/quizzes/submissions` | Submit a quiz (graded server-side) |
| GET | `/quizzes/submissions` | List the user's submissions |
| GET | `/quizzes/submissions/latest` | Latest submission for a concept |

## Mini Tests

Base path: `/api/tests`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/tests/` | List mini tests |
| POST | `/tests/` | Create a mini test |
| GET | `/tests/by-concept/{concept_id}` | Get the mini test of a concept |
| PUT | `/tests/{id}` | Update a mini test |
| DELETE | `/tests/{id}` | Delete a mini test |
| POST | `/tests/questions` | Add a question to a test |
| DELETE | `/tests/questions/{id}` | Delete a test question |
| POST | `/tests/results` | Submit a test result (graded server-side) |
| GET | `/tests/results` | List the user's test results |

## Progress

Base path: `/api/progress`. Progress percentages are computed live on the server from submitted work.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/progress/concept/{id}` | Progress of one concept |
| GET | `/progress/chapter/{id}` | Aggregate progress of a chapter |
| GET | `/progress/chapter/{id}/concepts` | Progress of every concept in a chapter (one call) |
| GET | `/progress/stats` | Overall study stats (time, streak, accuracy, progress) |
| POST | `/progress/lesson-complete` | Mark a lesson as completed |
| POST | `/progress/reset` | Delete all of the user's progress (irreversible) |

Legacy sync endpoints (not used by the current frontend):

| Method | Path |
|--------|------|
| GET / POST | `/progress/concept` |
| GET | `/progress/concepts` |
| POST | `/progress/exercise` |
| GET | `/progress/exercises` |
| GET / POST | `/progress/bac` |
| POST | `/progress/quiz` |
| GET | `/progress/quizzes` |
| POST | `/progress/test` |
| GET | `/progress/tests` |
| GET / PUT | `/progress/preferences` |
| GET | `/progress/all` |
| POST | `/progress/sync` |

## Dashboard

Base path: `/api/dashboard`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/dashboard/` | Dashboard summary |
| GET | `/dashboard/streak` | Current study streak |
| POST | `/dashboard/activity` | Log an exercise / BAC activity |

## Community

Base path: `/api/community`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/community/posts` | List posts |
| POST | `/community/posts` | Create a post |
| GET | `/community/posts/{id}` | Get a post with its answers |
| POST | `/community/posts/{id}/vote` | Vote on a post |
| POST | `/community/posts/{id}/answers` | Answer a post |
| POST | `/community/answers/{id}/vote` | Vote on an answer |
| POST | `/community/answers/{id}/best` | Mark an answer as best |
| POST | `/community/answers/{id}/replies` | Reply to an answer |
| POST | `/community/replies/{id}/vote` | Vote on a reply |
| GET | `/community/users/{id}` | Public user profile |
| GET | `/community/users/{id}/posts` | A user's posts |
| GET | `/community/users/{id}/answers` | A user's answers |
| POST | `/community/uploads/image` | Upload an image |

## Admin

Base path: `/api/admin`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/admin/stats` | Platform statistics |
| GET | `/admin/users` | List users |
| PUT | `/admin/users/{id}` | Update a user |
| DELETE | `/admin/users/{id}` | Delete a user |
