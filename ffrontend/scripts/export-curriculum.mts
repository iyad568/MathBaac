// Prints the static curriculum (subject/chapters/concepts/lessons/quizzes/mini-tests) as JSON on stdout.
// Used by backend/scripts/import_frontend_curriculum.py (run with: npx tsx scripts/export-curriculum.mts).
import { mathSubject } from '../src/data/mathematics';
import { chapters } from '../src/data/chapters';
import { concepts } from '../src/data/concepts';
import { lessons } from '../src/data/lessons';
import { quizQuestions } from '../src/data/quizzes';
import { miniTests } from '../src/data/tests';

process.stdout.write(JSON.stringify({
  subject: mathSubject,
  chapters,
  concepts,
  lessons: Object.values(lessons),
  quizQuestions: Object.values(quizQuestions).flat(),
  miniTests: Object.values(miniTests),
}));
