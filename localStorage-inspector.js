// LocalStorage Inspector - Debug Tool for MathBAC
// Copy and paste this into your browser console at http://localhost:3000

(function() {
  console.log('🔍 MathBAC LocalStorage Inspector\n');
  console.log('═'.repeat(60));
  
  // Get all MathBAC keys
  const allKeys = Object.keys(localStorage).filter(k => k.startsWith('dzbac_') || k === 'theme');
  
  console.log(`\n📦 Total Keys: ${allKeys.length}`);
  console.log('─'.repeat(60));
  
  // Calculate sizes
  let totalSize = 0;
  const data = {};
  
  allKeys.forEach(key => {
    const value = localStorage.getItem(key);
    const size = value ? value.length : 0;
    totalSize += size;
    
    data[key] = {
      size: `${(size / 1024).toFixed(2)} KB`,
      rawSize: size,
      preview: value ? value.substring(0, 100) + '...' : 'empty'
    };
  });
  
  // Sort by size
  const sorted = Object.entries(data).sort((a, b) => b[1].rawSize - a[1].rawSize);
  
  console.log('\n📊 Storage by Size:');
  sorted.forEach(([key, info], i) => {
    console.log(`${i + 1}. ${key}: ${info.size}`);
  });
  
  console.log('\n' + '─'.repeat(60));
  console.log(`📏 Total Size: ${(totalSize / 1024).toFixed(2)} KB`);
  console.log(`💾 Available: ~${5000 - (totalSize / 1024).toFixed(0)} KB (of ~5 MB)`);
  console.log(`📈 Usage: ${((totalSize / 1024 / 5000) * 100).toFixed(1)}%`);
  
  // Show specific important data
  console.log('\n' + '═'.repeat(60));
  console.log('🎯 Important Data:');
  console.log('─'.repeat(60));
  
  // User Stats
  try {
    const stats = JSON.parse(localStorage.getItem('dzbac_user_stats_v2'));
    console.log('\n📊 User Stats:');
    console.log('  Study Time:', stats.totalStudyTimeMinutes, 'minutes');
    console.log('  Streak:', stats.streakDays, 'days');
    console.log('  Progress:', stats.overallCourseProgress + '%');
    console.log('  Exercises Solved:', stats.solvedExercisesCount);
    console.log('  BAC Problems:', stats.solvedBacCount);
    console.log('  Accuracy:', stats.averageAccuracy + '%');
  } catch(e) {
    console.log('❌ User stats not found');
  }
  
  // Auth
  try {
    const auth = JSON.parse(localStorage.getItem('dzbac_auth_session_v1'));
    console.log('\n🔐 Authentication:');
    console.log('  Logged In:', auth.isLoggedIn);
    if (auth.isLoggedIn) {
      console.log('  Name:', auth.fullName);
      console.log('  Email:', auth.email);
      console.log('  Stream:', auth.stream);
    }
  } catch(e) {
    console.log('❌ Auth session not found');
  }
  
  // Progress
  try {
    const progress = JSON.parse(localStorage.getItem('dzbac_concept_progress_v2'));
    const concepts = Object.keys(progress || {});
    console.log('\n📚 Concept Progress:');
    console.log('  Concepts Started:', concepts.length);
    concepts.forEach(id => {
      const p = progress[id];
      console.log(`  • ${id}: ${p.overallPercentage}%`);
    });
  } catch(e) {
    console.log('❌ No progress data');
  }
  
  // Theme
  const theme = localStorage.getItem('theme');
  console.log('\n🌓 Theme:', theme || 'not set');
  
  console.log('\n' + '═'.repeat(60));
  console.log('💡 Tips:');
  console.log('  • View details: JSON.parse(localStorage.getItem("key"))');
  console.log('  • Clear all: localStorageService.resetAllData()');
  console.log('  • Clear one: localStorage.removeItem("key")');
  console.log('═'.repeat(60));
  
  // Return data for inspection
  return {
    keys: allKeys,
    totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
    usage: `${((totalSize / 1024 / 5000) * 100).toFixed(1)}%`,
    data: data
  };
})();
