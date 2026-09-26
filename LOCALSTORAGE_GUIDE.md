# 📦 MathBAC LocalStorage - Complete Guide

**Generated:** September 24, 2026

---

## 🗄️ What's Stored in LocalStorage

MathBAC uses **browser localStorage** to store data locally on your device. Here's everything that's being saved:

---

## 📋 **Complete List of LocalStorage Keys**

### **1. Static Educational Content** (11,570+ lines of data)

| Key | Data Type | Size | Description |
|-----|-----------|------|-------------|
| `dzbac_subjects_v2` | Subject | ~1 KB | Mathematics subject info |
| `dzbac_chapters_v2` | Chapter[] | ~5 KB | 4 curriculum chapters |
| `dzbac_concepts_v2` | Concept[] | ~20 KB | 20 mathematical concepts |
| `dzbac_lessons_v2` | Lesson{} | ~100 KB | Full lesson content with theory |
| `dzbac_exercises_v2` | Exercise[] | ~80 KB | 76+ practice exercises |
| `dzbac_bac_exercises_v2` | BACExercise[] | ~150 KB | 37+ BAC exam problems (2014-2026) |
| `dzbac_quizzes_v2` | Quiz{} | ~130 KB | Quiz questions for all concepts |
| `dzbac_tests_v2` | MiniTest{} | ~75 KB | Timed assessment tests |

**Total Static Content:** ~560 KB

---

### **2. User Progress & Activity** (Dynamic Data)

| Key | Data Type | Size | Description |
|-----|-----------|------|-------------|
| `dzbac_concept_progress_v2` | ConceptProgress{} | ~10 KB | Your progress per concept (%) |
| `dzbac_exercise_attempts_v2` | Attempt[] | ~5 KB | Your exercise solutions & scores |
| `dzbac_bac_attempts_v2` | BACAttempt[] | ~5 KB | Your BAC problem attempts |
| `dzbac_quiz_results_v2` | QuizResult{} | ~3 KB | Quiz scores & answers |
| `dzbac_test_results_v2` | TestResult[] | ~5 KB | Mini test results |
| `dzbac_user_stats_v2` | UserStats | ~1 KB | Overall stats (time, streak, etc.) |

**Total User Data:** ~29 KB

---

### **3. Configuration & Settings**

| Key | Data Type | Size | Description |
|-----|-----------|------|-------------|
| `dzbac_weights_config_v2` | Weights | ~500 B | Progress calculation weights |
| `dzbac_active_stream_v2` | String | ~50 B | Selected stream (Sciences/Math) |
| `theme` | String | ~10 B | Dark/Light mode preference |

**Total Config:** ~560 B

---

### **4. Authentication & Session**

| Key | Data Type | Size | Description |
|-----|-----------|------|-------------|
| `dzbac_auth_session_v1` | AuthUser | ~500 B | Login session, user info |

**Total Auth:** ~500 B

---

## 📊 **Total localStorage Usage**

```
Static Content:    ~560 KB (56%)
User Progress:     ~29 KB  (3%)
Configuration:     ~1 KB   (<1%)
Authentication:    ~500 B  (<1%)
Other (buffer):    ~410 KB (41%)
────────────────────────────
TOTAL:             ~1 MB / 5-10 MB available
```

**Storage Remaining:** ~4-9 MB (plenty of space!)

---

## 🔍 **What Each Data Contains**

### **User Stats (`dzbac_user_stats_v2`)**
```json
{
  "totalStudyTimeMinutes": 54,
  "streakDays": 4,
  "lastStudyDate": "2026-09-24",
  "completedLessonsCount": 1,
  "solvedExercisesCount": 3,
  "solvedBacCount": 1,
  "averageAccuracy": 88,
  "overallCourseProgress": 35,
  "stream": "شعبة العلوم التجريبية"
}
```

### **Concept Progress (`dzbac_concept_progress_v2`)**
```json
{
  "chain-rule": {
    "conceptId": "chain-rule",
    "overallPercentage": 35,
    "lessonCompleted": true,
    "quizScore": 80,
    "exercisesSolved": 3,
    "bacSolved": 1,
    "testScore": 0,
    "lastUpdated": "2026-09-24T09:30:00Z"
  }
}
```

### **Auth User (`dzbac_auth_session_v1`)**
```json
{
  "id": "123",
  "email": "user@example.com",
  "fullName": "اسم الطالب",
  "stream": "شعبة العلوم التجريبية",
  "isLoggedIn": true,
  "createdAt": "2026-09-01T10:00:00Z"
}
```

### **Exercise Attempt (`dzbac_exercise_attempts_v2`)**
```json
[
  {
    "exerciseId": "ex-derivatives-01",
    "conceptId": "chain-rule",
    "isCorrect": true,
    "timeSpent": 180,
    "attempts": 1,
    "completedAt": "2026-09-24T09:15:00Z"
  }
]
```

---

## 🎯 **Why LocalStorage?**

### ✅ **Advantages:**
1. **Instant Loading** - No API calls, content appears immediately
2. **Offline Access** - Works without internet connection
3. **No Server Load** - Static content doesn't need backend
4. **Fast Performance** - Data read from local disk
5. **Privacy** - Your progress stays on your device
6. **Free** - No database hosting costs for static content

### ⚠️ **Limitations:**
1. **Size Limit** - 5-10 MB per domain (we use ~1 MB)
2. **No Sync** - Data doesn't transfer between devices
3. **Can Be Cleared** - Browser clear data = lost progress
4. **Not Secure** - Anyone with device access can view it

---

## 🔧 **How to View Your LocalStorage**

### **Method 1: Browser DevTools (Recommended)**

1. Open your browser
2. Go to: http://localhost:3000
3. Press `F12` to open DevTools
4. Click **Application** tab (Chrome) or **Storage** tab (Firefox)
5. Expand **Local Storage** → `http://localhost:3000`
6. View all `dzbac_*` keys

### **Method 2: Console Commands**

Open browser console (`F12` → Console) and run:

```javascript
// View all MathBAC keys
Object.keys(localStorage).filter(key => key.startsWith('dzbac_'))

// View user stats
JSON.parse(localStorage.getItem('dzbac_user_stats_v2'))

// View your progress
JSON.parse(localStorage.getItem('dzbac_concept_progress_v2'))

// View auth session
JSON.parse(localStorage.getItem('dzbac_auth_session_v1'))

// View exercise attempts
JSON.parse(localStorage.getItem('dzbac_exercise_attempts_v2'))

// Check total size used
const size = Object.keys(localStorage)
  .filter(k => k.startsWith('dzbac_'))
  .reduce((total, key) => 
    total + localStorage.getItem(key).length, 0)
console.log(`Total: ${(size / 1024).toFixed(2)} KB`)
```

---

## 🗑️ **How to Clear LocalStorage**

### **Clear All MathBAC Data:**
```javascript
// In browser console
Object.keys(localStorage)
  .filter(key => key.startsWith('dzbac_'))
  .forEach(key => localStorage.removeItem(key))

// Refresh page to reload default data
location.reload()
```

### **Clear Specific Data:**

```javascript
// Clear only progress (keep content)
localStorage.removeItem('dzbac_concept_progress_v2')
localStorage.removeItem('dzbac_exercise_attempts_v2')
localStorage.removeItem('dzbac_user_stats_v2')

// Clear only auth
localStorage.removeItem('dzbac_auth_session_v1')

// Clear theme preference
localStorage.removeItem('theme')
```

### **Reset to Defaults:**
The app has a built-in reset function:
```javascript
// In console
localStorageService.resetAllData()
```

---

## 🔄 **Data Sync Strategy**

### **Current Behavior:**
- ❌ **Not synced** between devices
- ❌ **Not backed up** to server
- ✅ **Persists** across browser sessions
- ✅ **Survives** page refreshes

### **Future Enhancement (Planned):**
- ✅ Sync progress to backend database
- ✅ Multi-device access
- ✅ Cloud backup
- ✅ Progress recovery

---

## 📝 **When LocalStorage is Updated**

| Action | Keys Updated | Trigger |
|--------|-------------|---------|
| Complete lesson | `concept_progress`, `user_stats` | Click "Mark Complete" |
| Solve exercise | `exercise_attempts`, `concept_progress` | Submit answer |
| Take quiz | `quiz_results`, `concept_progress` | Complete quiz |
| Solve BAC problem | `bac_attempts`, `concept_progress` | Submit BAC solution |
| Take test | `test_results`, `concept_progress` | Complete test |
| Login | `auth_session` | Successful login |
| Toggle theme | `theme` | Click moon/sun icon |
| Daily activity | `user_stats` (streak) | First action of the day |

---

## 🛡️ **Data Safety Tips**

### ✅ **Do's:**
- Keep your browser updated
- Don't clear browser data frequently
- Export your progress periodically (future feature)
- Use the app on same device for consistency

### ❌ **Don'ts:**
- Don't use "Clear browsing data" (keeps localStorage)
- Don't use Incognito mode (localStorage not persisted)
- Don't share device without logging out
- Don't delete browser profile

---

## 📱 **Multi-Device Access**

### **Current Limitation:**
Each device has its own localStorage. If you use:
- Device A: Progress saved on Device A
- Device B: Starts fresh or has different progress

### **Workaround (Manual):**
1. Export data from Device A (console → copy JSON)
2. Import data to Device B (console → paste JSON)

### **Future Solution:**
Backend sync will automatically sync across devices when implemented.

---

## 🔍 **Debugging LocalStorage Issues**

### **Problem: Progress not saving**
```javascript
// Check if localStorage works
try {
  localStorage.setItem('test', '1')
  localStorage.removeItem('test')
  console.log('✅ localStorage working')
} catch (e) {
  console.log('❌ localStorage blocked:', e)
}
```

### **Problem: Data disappeared**
Possible causes:
1. Browser cleared data
2. Incognito mode used
3. Different browser/profile
4. Storage quota exceeded (rare)

### **Problem: Old data showing**
```javascript
// Force reload from data files
localStorageService.resetAllData()
location.reload()
```

---

## 📊 **Storage Optimization**

### **Current Efficiency:**
- ✅ Compressed keys (short names)
- ✅ Versioned (`_v2`) for updates
- ✅ Only changed data stored
- ✅ No duplicate content

### **Space Breakdown:**
```
📚 Static Content:   560 KB (loaded once)
📊 Your Progress:    29 KB  (grows over time)
⚙️  Configuration:    1 KB   (rarely changes)
🔐 Authentication:    0.5 KB (per session)
```

---

## 🎓 **Summary**

**What's Local:**
- ✅ All curriculum content (chapters, lessons, exercises, BAC)
- ✅ Your learning progress
- ✅ Exercise attempts and scores
- ✅ Quiz and test results
- ✅ Study statistics and streaks
- ✅ Theme preference
- ✅ Login session

**What's NOT Local:**
- ❌ Community posts/answers (backend only)
- ❌ Other users' progress
- ❌ User profiles (backend)
- ❌ Admin data

**Total Size:** ~1 MB / 5-10 MB available (90% free)

---

## 🛠️ **Tools Created**

I can create a **LocalStorage Manager Page** where you can:
- 📊 View all stored data
- 📈 See storage usage
- 🗑️ Clear specific data
- 💾 Export/Import data
- 🔄 Reset to defaults

Would you like me to create this management interface?

---

**Last Updated:** September 24, 2026, 09:30 UTC  
**Version:** 2.0 - Complete localStorage Documentation
