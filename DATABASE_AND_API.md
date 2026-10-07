# MathBac - Database (MySQL) and API

Derived from the Stitch design (`stitch_mathbac_arabic_e_learning_platform.zip`, 11 screens) and the current app.
Target: MySQL 8 / MariaDB 10.4+, InnoDB, `utf8mb4` (Arabic + math text).

## 1. Screens and what they need

| Screen | Data it needs |
|--------|---------------|
| Auth page | users, streams, refresh tokens, password reset |
| Dashboard | target score, days to BAC, study time, streak, accuracy, avg time per question, chapter progress, next concept |
| Curriculum (chapters) | chapters + per-user progress + lock state |
| Chapter page | concepts, per-user progress, lock state, streams, summary PDF, mock exam |
| Lesson page | video, checkpoints, inline exercise, laws summary, notes, student questions, downloads, teacher card, XP, hints |
| Exercises bank | exercises + difficulty filter + lock state |
| BAC library | BAC subjects (year, session, stream, topics, duration, points) + marking scheme + lock state |
| Mini tests | tests, best score, timed attempt |
| Community Q&A | posts, answers, replies, votes, saved, categories, attachments |
| Header / sidebar | overall progress, streak, "continue lesson", notifications |

---

## 2. Database structure (MySQL)

Notes:
- Curriculum content uses readable text ids (`chain-rule`) so URLs stay clean. User-generated rows use `BIGINT`.
- Stored: raw facts (attempts, completions, time). **Not stored, computed on request:** progress percentages, chapter/concept lock state, accuracy, estimated BAC grade, days remaining.
- Progress weights (lesson 20 / quiz 15 / exercises 30 / BAC 20 / mini test 15) live in code or config, not in a table.
- Tables are ordered so every foreign key points to a table created earlier.

```sql
CREATE DATABASE IF NOT EXISTS mathbac
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mathbac;

-- ============================================================
-- USERS AND AUTH
-- ============================================================

CREATE TABLE streams (
  id        TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code      VARCHAR(30)  NOT NULL UNIQUE,      -- sciences | maths | tech_maths
  name_ar   VARCHAR(100) NOT NULL              -- علوم تجريبية | رياضيات | تقني رياضي
) ENGINE=InnoDB;

CREATE TABLE users (
  id             BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name      VARCHAR(150) NOT NULL,
  email          VARCHAR(190) NOT NULL UNIQUE,
  password_hash  VARCHAR(255) NOT NULL,        -- bcrypt, never plain text
  role           ENUM('student','admin') NOT NULL DEFAULT 'student',
  stream_id      TINYINT UNSIGNED NULL,
  avatar_url     VARCHAR(500) NULL,
  target_score   DECIMAL(4,2) NOT NULL DEFAULT 19.00,   -- "19.0 / 20" goal
  xp_points      INT UNSIGNED NOT NULL DEFAULT 0,
  is_active      TINYINT(1) NOT NULL DEFAULT 1,
  last_login_at  DATETIME NULL,
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_stream FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE refresh_tokens (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     BIGINT UNSIGNED NOT NULL,
  token_hash  CHAR(64) NOT NULL UNIQUE,        -- store a hash, not the token
  expires_at  DATETIME NOT NULL,
  revoked_at  DATETIME NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_rt_user (user_id),
  CONSTRAINT fk_rt_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE password_resets (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     BIGINT UNSIGNED NOT NULL,
  token_hash  CHAR(64) NOT NULL UNIQUE,
  expires_at  DATETIME NOT NULL,
  used_at     DATETIME NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_pr_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE user_preferences (
  user_id                BIGINT UNSIGNED PRIMARY KEY,
  theme                  ENUM('light','dark') NOT NULL DEFAULT 'light',
  notifications_enabled  TINYINT(1) NOT NULL DEFAULT 1,
  email_notifications    TINYINT(1) NOT NULL DEFAULT 0,
  CONSTRAINT fk_pref_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE exam_calendar (                   -- drives "days left until the BAC"
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  year       SMALLINT UNSIGNED NOT NULL,
  session    ENUM('normal','rattrapage') NOT NULL DEFAULT 'normal',
  stream_id  TINYINT UNSIGNED NULL,            -- NULL = all streams
  exam_date  DATE NOT NULL,
  UNIQUE KEY uq_exam (year, session, stream_id),
  CONSTRAINT fk_exam_stream FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- CURRICULUM
-- ============================================================

CREATE TABLE teachers (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  title      VARCHAR(150) NULL,                -- e.g. "BAC exam corrector"
  bio        TEXT NULL,
  quote      TEXT NULL,
  photo_url  VARCHAR(500) NULL
) ENGINE=InnoDB;

CREATE TABLE subjects (
  id           VARCHAR(100) PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  title_fr     VARCHAR(255) NULL,
  description  TEXT NULL
) ENGINE=InnoDB;

CREATE TABLE chapters (
  id                VARCHAR(100) PRIMARY KEY,
  subject_id        VARCHAR(100) NOT NULL,
  title             VARCHAR(255) NOT NULL,
  title_fr          VARCHAR(255) NULL,
  description       TEXT NULL,
  sort_order        INT NOT NULL DEFAULT 0,    -- curriculum order, drives unlocking
  estimated_hours   DECIMAL(5,1) NULL,
  bac_weight        VARCHAR(100) NULL,
  semester          TINYINT UNSIGNED NULL,
  summary_pdf_url   VARCHAR(500) NULL,         -- "download chapter summary PDF"
  INDEX idx_ch_subject_order (subject_id, sort_order),
  CONSTRAINT fk_ch_subject FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE chapter_streams (                 -- which streams study a chapter
  chapter_id  VARCHAR(100) NOT NULL,
  stream_id   TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (chapter_id, stream_id),
  CONSTRAINT fk_cs_chapter FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
  CONSTRAINT fk_cs_stream  FOREIGN KEY (stream_id)  REFERENCES streams(id)  ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE concepts (
  id                 VARCHAR(100) PRIMARY KEY,
  chapter_id         VARCHAR(100) NOT NULL,
  title              VARCHAR(255) NOT NULL,
  title_fr           VARCHAR(255) NULL,
  description        TEXT NULL,
  sort_order         INT NOT NULL DEFAULT 0,   -- order inside the chapter, drives unlocking
  estimated_minutes  SMALLINT UNSIGNED NULL,
  difficulty         ENUM('easy','medium','hard') NULL,
  summary            TEXT NULL,
  tags               JSON NULL,
  week_number        TINYINT UNSIGNED NULL,
  official_hours     DECIMAL(4,1) NULL,
  INDEX idx_co_chapter_order (chapter_id, sort_order),
  CONSTRAINT fk_co_chapter FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE lessons (
  id                      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  concept_id              VARCHAR(100) NOT NULL UNIQUE,   -- one lesson per concept
  teacher_id              INT UNSIGNED NULL,
  title                   VARCHAR(255) NOT NULL,
  video_url               VARCHAR(500) NULL,
  video_duration_seconds  INT UNSIGNED NULL,
  objectives              JSON NULL,
  theory                  JSON NULL,           -- theorem + special rules
  key_laws                JSON NULL,           -- "laws and theorems summary" tab
  worked_examples         JSON NULL,
  CONSTRAINT fk_le_concept FOREIGN KEY (concept_id) REFERENCES concepts(id) ON DELETE CASCADE,
  CONSTRAINT fk_le_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE lesson_checkpoints (              -- "lesson stations" on the video timeline
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lesson_id     INT UNSIGNED NOT NULL,
  title         VARCHAR(255) NOT NULL,
  start_second  INT UNSIGNED NOT NULL,
  end_second    INT UNSIGNED NOT NULL,
  sort_order    SMALLINT NOT NULL DEFAULT 0,
  INDEX idx_lc_lesson (lesson_id, sort_order),
  CONSTRAINT fk_lc_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE lesson_resources (                -- downloadable PDFs
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lesson_id  INT UNSIGNED NOT NULL,
  title      VARCHAR(255) NOT NULL,
  file_url   VARCHAR(500) NOT NULL,
  file_type  VARCHAR(20) NOT NULL DEFAULT 'pdf',
  size_kb    INT UNSIGNED NULL,
  CONSTRAINT fk_lr_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- EXERCISES, BAC, QUIZZES, MINI TESTS (content)
-- ============================================================

CREATE TABLE exercises (
  id                 BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  concept_id         VARCHAR(100) NOT NULL,
  number             SMALLINT UNSIGNED NOT NULL,           -- order inside the concept, drives per-exercise unlocking
  title              VARCHAR(255) NOT NULL,
  question           TEXT NOT NULL,
  question_math      TEXT NULL,                            -- LaTeX
  difficulty         ENUM('easy','medium','hard') NOT NULL DEFAULT 'easy',
  estimated_minutes  SMALLINT UNSIGNED NULL,
  answer_type        ENUM('numeric','expression','multiple_choice','essay') NOT NULL DEFAULT 'numeric',
  correct_answer     VARCHAR(500) NULL,                    -- never sent to the client before grading
  accepted_answers   JSON NULL,
  options            JSON NULL,                            -- for multiple choice
  hint               TEXT NULL,
  explanation        TEXT NULL,
  solution_steps     JSON NULL,
  xp_reward          SMALLINT UNSIGNED NOT NULL DEFAULT 10,
  hint_xp_cost       SMALLINT UNSIGNED NOT NULL DEFAULT 5, -- "request hint (-5 XP)"
  external_id        VARCHAR(100) NULL,                    -- id from imported content
  UNIQUE KEY uq_ex_concept_number (concept_id, number),
  CONSTRAINT fk_ex_concept FOREIGN KEY (concept_id) REFERENCES concepts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE lesson_inline_exercises (         -- exercise popping up inside the video (e.g. at 18:24)
  lesson_id    INT UNSIGNED NOT NULL,
  exercise_id  BIGINT UNSIGNED NOT NULL,
  at_second    INT UNSIGNED NOT NULL,
  PRIMARY KEY (lesson_id, exercise_id),
  CONSTRAINT fk_lie_lesson   FOREIGN KEY (lesson_id)   REFERENCES lessons(id)   ON DELETE CASCADE,
  CONSTRAINT fk_lie_exercise FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE bac_problems (                    -- official BAC subjects
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  concept_id        VARCHAR(100) NULL,         -- NULL for full exam papers
  chapter_id        VARCHAR(100) NULL,
  year              SMALLINT UNSIGNED NOT NULL,
  session           ENUM('normal','rattrapage') NOT NULL DEFAULT 'normal',
  stream_id         TINYINT UNSIGNED NULL,
  exam_part         VARCHAR(50) NULL,          -- "الموضوع الأول" / "الموضوع الثاني"
  title             VARCHAR(255) NOT NULL,
  topics_summary    TEXT NULL,                 -- "المحاور: ..."
  duration_minutes  SMALLINT UNSIGNED NULL,
  total_points      DECIMAL(4,1) NOT NULL DEFAULT 20.0,
  question          TEXT NOT NULL,
  question_math     TEXT NULL,
  solution_text     TEXT NULL,
  grading_notes     JSON NULL,
  pdf_url           VARCHAR(500) NULL,
  is_published      TINYINT(1) NOT NULL DEFAULT 1,
  INDEX idx_bac_filter (year, stream_id, chapter_id),
  CONSTRAINT fk_bac_concept FOREIGN KEY (concept_id) REFERENCES concepts(id) ON DELETE SET NULL,
  CONSTRAINT fk_bac_chapter FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE SET NULL,
  CONSTRAINT fk_bac_stream  FOREIGN KEY (stream_id)  REFERENCES streams(id)  ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE bac_sub_questions (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  bac_problem_id  BIGINT UNSIGNED NOT NULL,
  label           VARCHAR(20) NOT NULL,        -- "1. أ)"
  text            TEXT NOT NULL,
  math            TEXT NULL,
  points          DECIMAL(4,2) NOT NULL,
  sort_order      SMALLINT NOT NULL DEFAULT 0,
  CONSTRAINT fk_bsq_problem FOREIGN KEY (bac_problem_id) REFERENCES bac_problems(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE bac_solution_steps (              -- official marking scheme (barème)
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  bac_problem_id  BIGINT UNSIGNED NOT NULL,
  label           VARCHAR(100) NOT NULL,
  text            TEXT NOT NULL,
  math            TEXT NULL,
  points          DECIMAL(4,2) NOT NULL,
  sort_order      SMALLINT NOT NULL DEFAULT 0,
  CONSTRAINT fk_bss_problem FOREIGN KEY (bac_problem_id) REFERENCES bac_problems(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE quiz_questions (
  id                 BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  concept_id         VARCHAR(100) NOT NULL,
  number             SMALLINT UNSIGNED NOT NULL,
  question           TEXT NOT NULL,
  question_math      TEXT NULL,
  options            JSON NOT NULL,            -- [{id, text, math}]
  correct_option_id  VARCHAR(20) NOT NULL,     -- never sent before submission
  explanation        TEXT NULL,
  explanation_math   TEXT NULL,
  UNIQUE KEY uq_quiz_concept_number (concept_id, number),
  CONSTRAINT fk_qq_concept FOREIGN KEY (concept_id) REFERENCES concepts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE mini_tests (
  id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  concept_id          VARCHAR(100) NULL,
  chapter_id          VARCHAR(100) NULL,       -- set for the chapter "full mock exam"
  kind                ENUM('mini','mock_exam') NOT NULL DEFAULT 'mini',
  title               VARCHAR(255) NOT NULL,
  description         TEXT NULL,
  time_limit_minutes  SMALLINT UNSIGNED NOT NULL DEFAULT 10,
  CONSTRAINT fk_mt_concept FOREIGN KEY (concept_id) REFERENCES concepts(id) ON DELETE CASCADE,
  CONSTRAINT fk_mt_chapter FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE test_questions (
  id                 BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  test_id            BIGINT UNSIGNED NOT NULL,
  number             SMALLINT UNSIGNED NOT NULL,
  sub_concept_name   VARCHAR(255) NULL,        -- used for the weakness breakdown
  question           TEXT NOT NULL,
  question_math      TEXT NULL,
  options            JSON NOT NULL,
  correct_option_id  VARCHAR(20) NOT NULL,
  explanation        TEXT NULL,
  explanation_math   TEXT NULL,
  UNIQUE KEY uq_tq_test_number (test_id, number),
  CONSTRAINT fk_tq_test FOREIGN KEY (test_id) REFERENCES mini_tests(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- STUDENT ACTIVITY (the facts progress is computed from)
-- ============================================================

CREATE TABLE lesson_completions (
  id                    BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id               BIGINT UNSIGNED NOT NULL,
  concept_id            VARCHAR(100) NOT NULL,
  video_watched_seconds INT UNSIGNED NOT NULL DEFAULT 0,
  completed_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_lc_user_concept (user_id, concept_id),
  CONSTRAINT fk_lcp_user    FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  CONSTRAINT fk_lcp_concept FOREIGN KEY (concept_id) REFERENCES concepts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE video_progress (                  -- resume position + watched time
  user_id             BIGINT UNSIGNED NOT NULL,
  lesson_id           INT UNSIGNED NOT NULL,
  last_position_second INT UNSIGNED NOT NULL DEFAULT 0,
  watched_seconds     INT UNSIGNED NOT NULL DEFAULT 0,
  updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, lesson_id),
  CONSTRAINT fk_vp_user   FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE CASCADE,
  CONSTRAINT fk_vp_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE checkpoint_completions (          -- the green ticks on the lesson stations
  user_id        BIGINT UNSIGNED NOT NULL,
  checkpoint_id  INT UNSIGNED NOT NULL,
  completed_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, checkpoint_id),
  CONSTRAINT fk_cc_user       FOREIGN KEY (user_id)       REFERENCES users(id)             ON DELETE CASCADE,
  CONSTRAINT fk_cc_checkpoint FOREIGN KEY (checkpoint_id) REFERENCES lesson_checkpoints(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE lesson_notes (                    -- "my notes and summaries"
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id       BIGINT UNSIGNED NOT NULL,
  lesson_id     INT UNSIGNED NOT NULL,
  at_second     INT UNSIGNED NULL,             -- optional video timestamp
  content       TEXT NOT NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_ln_user_lesson (user_id, lesson_id),
  CONSTRAINT fk_ln_user   FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE CASCADE,
  CONSTRAINT fk_ln_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE exercise_attempts (
  id                 BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id            BIGINT UNSIGNED NOT NULL,
  exercise_id        BIGINT UNSIGNED NOT NULL,
  student_answer     TEXT NULL,
  is_correct         TINYINT(1) NOT NULL DEFAULT 0,   -- set by the server, never by the client
  time_spent_seconds INT UNSIGNED NOT NULL DEFAULT 0,
  hint_used          TINYINT(1) NOT NULL DEFAULT 0,
  xp_earned          SMALLINT NOT NULL DEFAULT 0,
  created_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_ea_user_ex (user_id, exercise_id, is_correct),
  CONSTRAINT fk_ea_user     FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
  CONSTRAINT fk_ea_exercise FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE bac_attempts (
  id                 BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id            BIGINT UNSIGNED NOT NULL,
  bac_problem_id     BIGINT UNSIGNED NOT NULL,
  completed          TINYINT(1) NOT NULL DEFAULT 0,
  self_score         DECIMAL(4,2) NULL,        -- student's self-assessment against the barème
  student_notes      TEXT NULL,                -- the "brouillon" scratchpad
  time_spent_seconds INT UNSIGNED NOT NULL DEFAULT 0,
  completed_at       DATETIME NULL,
  updated_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_ba_user_problem (user_id, bac_problem_id),
  CONSTRAINT fk_ba_user    FOREIGN KEY (user_id)        REFERENCES users(id)        ON DELETE CASCADE,
  CONSTRAINT fk_ba_problem FOREIGN KEY (bac_problem_id) REFERENCES bac_problems(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE quiz_submissions (
  id                 BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id            BIGINT UNSIGNED NOT NULL,
  concept_id         VARCHAR(100) NOT NULL,
  score              SMALLINT UNSIGNED NOT NULL,
  total              SMALLINT UNSIGNED NOT NULL,
  answers            JSON NOT NULL,            -- graded answers incl. explanations
  time_spent_seconds INT UNSIGNED NOT NULL DEFAULT 0,
  submitted_at       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_qs_user_concept (user_id, concept_id, submitted_at),
  CONSTRAINT fk_qsub_user    FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  CONSTRAINT fk_qsub_concept FOREIGN KEY (concept_id) REFERENCES concepts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE test_results (                    -- one row per timed attempt
  id                 BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id            BIGINT UNSIGNED NOT NULL,
  test_id            BIGINT UNSIGNED NOT NULL,
  status             ENUM('in_progress','completed') NOT NULL DEFAULT 'in_progress',
  started_at         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,   -- server-side timer start
  completed_at       DATETIME NULL,
  score              SMALLINT UNSIGNED NULL,
  total_questions    SMALLINT UNSIGNED NULL,
  time_spent_seconds INT UNSIGNED NULL,
  answers            JSON NULL,
  concept_breakdown  JSON NULL,                -- per sub-concept correct/total
  INDEX idx_tr_user_test (user_id, test_id, status),
  CONSTRAINT fk_tr_user FOREIGN KEY (user_id) REFERENCES users(id)      ON DELETE CASCADE,
  CONSTRAINT fk_tr_test FOREIGN KEY (test_id) REFERENCES mini_tests(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE study_streaks (
  user_id          BIGINT UNSIGNED PRIMARY KEY,
  current_streak   SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  longest_streak   SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  last_study_date  DATE NULL,
  CONSTRAINT fk_ss_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE daily_study_time (                -- real per-day minutes ("+18 min today", "this week")
  user_id     BIGINT UNSIGNED NOT NULL,
  study_date  DATE NOT NULL,
  seconds     INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, study_date),
  CONSTRAINT fk_dst_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE notifications (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     BIGINT UNSIGNED NOT NULL,
  type        VARCHAR(40) NOT NULL,            -- answer_received | best_answer | unlocked ...
  title       VARCHAR(255) NOT NULL,
  body        TEXT NULL,
  link        VARCHAR(500) NULL,
  is_read     TINYINT(1) NOT NULL DEFAULT 0,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_n_user_unread (user_id, is_read, created_at),
  CONSTRAINT fk_n_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- COMMUNITY (Q&A)
-- ============================================================

CREATE TABLE community_categories (
  id       SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug     VARCHAR(60) NOT NULL UNIQUE,
  name_ar  VARCHAR(100) NOT NULL               -- الدوال العددية, الاشتقاقية, ...
) ENGINE=InnoDB;

CREATE TABLE community_posts (
  id             BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  author_id      BIGINT UNSIGNED NOT NULL,
  category_id    SMALLINT UNSIGNED NOT NULL,
  concept_id     VARCHAR(100) NULL,            -- set when asked from a lesson ("student questions" tab)
  title          VARCHAR(255) NOT NULL,
  content        MEDIUMTEXT NOT NULL,          -- text + math
  views          INT UNSIGNED NOT NULL DEFAULT 0,
  votes_score    INT NOT NULL DEFAULT 0,
  answers_count  INT UNSIGNED NOT NULL DEFAULT 0,
  created_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_cp_list (category_id, created_at),
  INDEX idx_cp_concept (concept_id),
  FULLTEXT KEY ft_cp_search (title, content),
  CONSTRAINT fk_cp_author   FOREIGN KEY (author_id)   REFERENCES users(id)                ON DELETE CASCADE,
  CONSTRAINT fk_cp_category FOREIGN KEY (category_id) REFERENCES community_categories(id),
  CONSTRAINT fk_cp_concept  FOREIGN KEY (concept_id)  REFERENCES concepts(id)             ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE community_attachments (           -- "exercise attached" images
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  post_id     BIGINT UNSIGNED NOT NULL,
  file_url    VARCHAR(500) NOT NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_ca_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE community_answers (
  id                   BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  post_id              BIGINT UNSIGNED NOT NULL,
  author_id            BIGINT UNSIGNED NOT NULL,
  content              MEDIUMTEXT NOT NULL,
  is_best              TINYINT(1) NOT NULL DEFAULT 0,   -- chosen by the post author
  is_teacher_verified  TINYINT(1) NOT NULL DEFAULT 0,   -- "approved model answer"
  votes_score          INT NOT NULL DEFAULT 0,
  created_at           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_cans_post (post_id, created_at),
  CONSTRAINT fk_cans_post   FOREIGN KEY (post_id)   REFERENCES community_posts(id) ON DELETE CASCADE,
  CONSTRAINT fk_cans_author FOREIGN KEY (author_id) REFERENCES users(id)           ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE community_replies (
  id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  answer_id    BIGINT UNSIGNED NOT NULL,
  author_id    BIGINT UNSIGNED NOT NULL,
  content      TEXT NOT NULL,
  votes_score  INT NOT NULL DEFAULT 0,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_crep_answer FOREIGN KEY (answer_id) REFERENCES community_answers(id) ON DELETE CASCADE,
  CONSTRAINT fk_crep_author FOREIGN KEY (author_id) REFERENCES users(id)             ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE community_votes (
  id           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id      BIGINT UNSIGNED NOT NULL,
  target_type  ENUM('post','answer','reply') NOT NULL,
  target_id    BIGINT UNSIGNED NOT NULL,
  value        TINYINT NOT NULL,               -- +1 or -1
  UNIQUE KEY uq_vote (user_id, target_type, target_id),
  CONSTRAINT fk_cv_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE community_saved_posts (           -- "my discussions and bookmarks"
  user_id     BIGINT UNSIGNED NOT NULL,
  post_id     BIGINT UNSIGNED NOT NULL,
  saved_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, post_id),
  CONSTRAINT fk_csp_user FOREIGN KEY (user_id) REFERENCES users(id)           ON DELETE CASCADE,
  CONSTRAINT fk_csp_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- SEED (minimum)
-- ============================================================
INSERT INTO streams (code, name_ar) VALUES
  ('sciences',   'علوم تجريبية'),
  ('maths',      'رياضيات'),
  ('tech_maths', 'تقني رياضي');
```

### How the main relations read

```
users ──< exercise_attempts >── exercises ──> concepts ──> chapters ──> subjects
users ──< bac_attempts      >── bac_problems ─(sub_questions, solution_steps)
users ──< quiz_submissions  >── concepts ──< quiz_questions
users ──< test_results      >── mini_tests ──< test_questions
users ──< lesson_completions/video_progress/lesson_notes >── lessons ──< lesson_checkpoints
community_posts ──< community_answers ──< community_replies      (votes + saved: separate tables)
```

---

## 3. API

Base path: `/api`. Auth: `Authorization: Bearer <access_token>`.
Roles: **public** (no token), **student** (any logged-in user), **admin**.
Lists accept `?page=` and `?page_size=` and return `{ items, page, page_size, total }`. Errors return `{ "detail": "..." }`.

### 3.1 Rules the server must enforce (not the frontend)

1. **Locking.** Chapter N+1 is locked until chapter N is 100%. Concept N+1 is locked until concept N is 100%. Exercise N+1 is locked until exercise N is solved. List endpoints return an `is_locked` flag, and the detail/submit endpoints answer **403** for locked content. Exercises, BAC problems and mini tests inherit the lock of their concept.
2. **Grading.** Quizzes, tests and exercises are graded on the server. `correct_answer` / `correct_option_id` are never sent before submission.
3. **Time limits.** A timed test starts with `POST /tests/{id}/start`; the server compares `started_at` with the limit on submit.
4. **Progress is computed, not posted.** The client never sends a percentage.
5. **Ownership.** A student can only read and change their own attempts, notes and posts. Admin-only routes check `role = 'admin'`.
6. **Auth hygiene.** Passwords hashed (bcrypt), refresh tokens stored hashed and rotated, rate limit on login/register/forgot-password, uploads limited by type and size.

### 3.2 Auth and profile

| Method | Path | Role | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | public | `full_name, email, password, stream_id` |
| POST | `/auth/login` | public | Returns access + refresh token |
| POST | `/auth/refresh` | public | Rotate refresh token, new access token |
| POST | `/auth/logout` | student | Revoke the refresh token |
| POST | `/auth/forgot-password` | public | Send reset link |
| POST | `/auth/reset-password` | public | `token, new_password` |
| GET | `/auth/me` | student | Current user (+ stream, target score, XP) |
| PUT | `/auth/me` | student | Update name, stream, target score, avatar |
| PUT | `/auth/me/password` | student | Change password |
| GET | `/me/preferences` | student | Theme and notification settings |
| PUT | `/me/preferences` | student | Update them |
| GET | `/streams` | public | List streams (register form, filters) |
| GET | `/exam-calendar` | student | BAC date for the user's stream (days left) |

### 3.3 Curriculum (read)

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/subjects` | student | List subjects |
| GET | `/chapters` | student | Chapters with `progress_percent`, `is_locked`, counts (concepts, exercises, BAC) |
| GET | `/chapters/{id}` | student | One chapter (streams, duration, summary PDF) |
| GET | `/chapters/{id}/concepts` | student | Concepts with `progress_percent`, `is_locked`, per-pillar status |
| GET | `/chapters/{id}/summary-pdf` | student | Download the chapter summary |
| GET | `/chapters/{id}/mock-exam` | student | The chapter's full mock exam (see tests) |
| GET | `/concepts/{id}` | student | One concept (403 if locked) |
| GET | `/concepts/{id}/lesson` | student | Lesson content, teacher, checkpoints, resources (403 if locked) |
| GET | `/teachers/{id}` | student | Teacher card |

### 3.4 Lesson player

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/lessons/{id}/progress` | student | Resume position, watched seconds, completed checkpoints |
| PUT | `/lessons/{id}/progress` | student | Save position / watched seconds |
| POST | `/lessons/{id}/checkpoints/{checkpoint_id}/complete` | student | Tick a lesson station |
| POST | `/lessons/{id}/complete` | student | Mark the lesson finished |
| GET | `/lessons/{id}/inline-exercises` | student | Exercises shown inside the video |
| GET | `/lessons/{id}/resources` | student | Downloadable PDFs |
| GET | `/lessons/{id}/notes` | student | My notes |
| POST | `/lessons/{id}/notes` | student | Add a note (optional video second) |
| PUT | `/notes/{id}` | student | Edit my note |
| DELETE | `/notes/{id}` | student | Delete my note |
| GET | `/concepts/{id}/questions` | student | Student questions on this lesson (community posts filtered by concept) |

### 3.5 Exercises

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/exercises` | student | Bank list. Filters: `chapter_id, concept_id, difficulty, status, q`. Unlocked first, then by chapter, concept, number. Each item has `is_locked` |
| GET | `/concepts/{id}/exercises` | student | Exercises of one concept (per-exercise locking) |
| GET | `/exercises/{id}` | student | One exercise, no answer key (403 if locked) |
| POST | `/exercises/{id}/attempts` | student | `answer, time_spent_seconds` -> `is_correct`, XP, explanation |
| POST | `/exercises/{id}/hint` | student | Reveal hint and charge its XP cost |
| GET | `/exercises/{id}/solution` | student | Step-by-step solution (after a correct attempt) |
| GET | `/exercises/attempts` | student | My attempts |

### 3.6 BAC library

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/bac/problems` | student | Filters: `chapter_id, year, stream_id, session, status, q`. Unlocked first. Each item has `is_locked` |
| GET | `/bac/stats` | student | Year range, total subjects, completed count, total points |
| GET | `/bac/problems/{id}` | student | Statement + sub-questions (403 if locked) |
| GET | `/bac/problems/{id}/marking-scheme` | student | Official barème and grading notes |
| PUT | `/bac/problems/{id}/attempt` | student | Save notes / self score / time; `completed: true` to finish |
| GET | `/bac/attempts` | student | My BAC attempts |

### 3.7 Quizzes

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/concepts/{id}/quiz` | student | Questions without answers |
| POST | `/concepts/{id}/quiz/submissions` | student | `answers[], time_spent_seconds` -> score + explanations |
| GET | `/concepts/{id}/quiz/submissions/latest` | student | Latest result |
| GET | `/quiz/submissions` | student | My submissions |

### 3.8 Mini tests and mock exams

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/tests` | student | List with `is_locked`, best score, question count. Unlocked first |
| GET | `/tests/{id}` | student | Test info (403 if locked) |
| POST | `/tests/{id}/start` | student | Start timed attempt, returns questions without answers + `started_at` |
| POST | `/tests/{id}/results` | student | Submit answers -> score + per-sub-concept breakdown |
| GET | `/tests/{id}/results` | student | My attempts on this test |
| GET | `/tests/results` | student | All my results |

### 3.9 Dashboard and progress

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/dashboard` | student | One call for the dashboard: hero (next concept), target score, estimated BAC grade, days to BAC, study time (total, today, week), solved counts, accuracy, average time per question, streak, chapters progress |
| GET | `/progress/next` | student | The next unfinished, unlocked concept (the "continue lesson" button) |
| GET | `/progress/overview` | student | Overall course progress + streak (header widget) |
| GET | `/progress/chapters` | student | Progress of every chapter |
| GET | `/progress/chapters/{id}` | student | One chapter |
| GET | `/progress/concepts/{id}` | student | One concept, split by pillar |
| GET | `/progress/streak` | student | Current / longest streak |
| POST | `/progress/heartbeat` | student | Study-time ping (adds to `daily_study_time`, updates the streak) |
| POST | `/progress/reset` | student | Delete all of my progress (irreversible) |

### 3.10 Community

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/community/categories` | student | Categories with post counts |
| GET | `/community/stats` | student | Totals shown in the forum header |
| GET | `/community/posts` | student | Filters: `category, sort=latest/popular/unanswered, mine, saved, concept_id, q` |
| POST | `/community/posts` | student | Create a post (text, math, attachments) |
| GET | `/community/posts/{id}` | student | Post with answers and replies |
| PUT | `/community/posts/{id}` | student | Edit my post |
| DELETE | `/community/posts/{id}` | student | Delete my post (admin: any) |
| POST | `/community/posts/{id}/answers` | student | Answer a post |
| PUT | `/community/answers/{id}` | student | Edit my answer |
| DELETE | `/community/answers/{id}` | student | Delete my answer (admin: any) |
| POST | `/community/answers/{id}/replies` | student | Reply to an answer |
| DELETE | `/community/replies/{id}` | student | Delete my reply (admin: any) |
| POST | `/community/{post\|answer\|reply}/{id}/vote` | student | `value: 1 / -1 / 0` |
| POST | `/community/answers/{id}/best` | student | Post author marks the best answer |
| POST | `/community/answers/{id}/verify` | admin | Mark as approved model answer |
| POST | `/community/posts/{id}/save` | student | Bookmark |
| DELETE | `/community/posts/{id}/save` | student | Remove bookmark |
| POST | `/community/uploads/image` | student | Upload an image, returns URL |
| GET | `/community/users/{id}` | student | Public profile and badges |
| GET | `/community/users/{id}/posts` | student | Their posts |
| GET | `/community/users/{id}/answers` | student | Their answers |

### 3.11 Notifications

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/notifications` | student | My notifications (`?unread=true`) |
| PUT | `/notifications/{id}/read` | student | Mark one as read |
| PUT | `/notifications/read-all` | student | Mark all as read |

### 3.12 Admin

| Method | Path | Role | Description |
|--------|------|------|-------------|
| GET | `/admin/stats` | admin | Users, activity, content counts |
| GET | `/admin/users` | admin | List / search users |
| PUT | `/admin/users/{id}` | admin | Change role, stream, active flag |
| DELETE | `/admin/users/{id}` | admin | Delete a user |
| POST / PUT / DELETE | `/admin/subjects`, `/admin/subjects/{id}` | admin | Manage subjects |
| POST / PUT / DELETE | `/admin/chapters`, `/admin/chapters/{id}` | admin | Manage chapters |
| POST / PUT / DELETE | `/admin/concepts`, `/admin/concepts/{id}` | admin | Manage concepts |
| POST / PUT / DELETE | `/admin/lessons`, `/admin/lessons/{id}` | admin | Manage lessons |
| POST / PUT / DELETE | `/admin/lessons/{id}/checkpoints`, `/admin/checkpoints/{id}` | admin | Manage lesson stations |
| POST / DELETE | `/admin/lessons/{id}/resources`, `/admin/resources/{id}` | admin | Manage downloadable files |
| POST / PUT / DELETE | `/admin/teachers`, `/admin/teachers/{id}` | admin | Manage teachers |
| POST / PUT / DELETE | `/admin/exercises`, `/admin/exercises/{id}` | admin | Manage exercises |
| POST | `/admin/exercises/extract-text` | admin | Extract text from a PDF/Word file |
| POST / PUT / DELETE | `/admin/bac/problems`, `/admin/bac/problems/{id}` | admin | Manage BAC subjects, sub-questions, barème |
| POST / PUT / DELETE | `/admin/quiz/questions`, `/admin/quiz/questions/{id}` | admin | Manage quiz questions |
| GET | `/admin/quiz/questions` | admin | List questions **with** answers |
| POST / PUT / DELETE | `/admin/tests`, `/admin/tests/{id}` | admin | Manage mini tests and mock exams |
| POST / DELETE | `/admin/tests/{id}/questions`, `/admin/test-questions/{id}` | admin | Manage test questions |
| POST / PUT / DELETE | `/admin/exam-calendar`, `/admin/exam-calendar/{id}` | admin | Manage BAC dates |

---

## 4. What the design shows that your current app does not have yet

These need new tables/endpoints (already included above): target score and "days to BAC", estimated BAC grade, video checkpoints and inline exercise, lesson notes, XP and paid hints, teacher card, lesson/chapter PDFs, mock exam per chapter, real "today / this week" study time, saved posts, notifications, forgot-password. The design's "demo login" button is intentionally not part of the API.
