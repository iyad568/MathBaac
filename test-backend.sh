#!/bin/bash

# Quick Backend Test Script
# Tests if the backend server can start without errors

cd "$(dirname "$0")/backend"

echo "🔍 Testing backend startup..."
echo ""

# Test 1: Check if models can be imported
echo "Test 1: Importing models..."
python -c "
from app.modules.progress.models import (
    LessonCompletion,
    ConceptProgress,
    ExerciseAttempt,
    BACExerciseAttempt,
    QuizResult,
    UserPreferences
)
from app.modules.tests.models import TestResult
print('✓ All models imported successfully')
" 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Models test passed"
else
    echo "❌ Models test failed"
    exit 1
fi

echo ""
echo "Test 2: Checking if main.py can be loaded..."
python -c "
import sys
sys.path.insert(0, '.')
try:
    from app.main import app
    print('✓ FastAPI app loaded successfully')
except Exception as e:
    print(f'✗ Error loading app: {e}')
    sys.exit(1)
" 2>&1

if [ $? -eq 0 ]; then
    echo "✅ FastAPI app test passed"
else
    echo "❌ FastAPI app test failed"
    exit 1
fi

echo ""
echo "✨ All tests passed! Backend is ready to start."
echo ""
echo "To start the server, run:"
echo "  cd backend"
echo "  uvicorn app.main:app --reload"
