// Prints the static exercises + BAC problems as JSON on stdout.
// Used by backend/scripts/import_frontend_exercises.py (run with: npx tsx scripts/export-exercises.mts).
import { exercises } from '../src/data/exercises';
import { bacExercises } from '../src/data/bacExercises';

process.stdout.write(JSON.stringify({ exercises, bacExercises }));
