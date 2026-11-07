export function localDateKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
export function finishWorkout(history, title, minutes, date = localDateKey()) { return [...history, { date, title, minutes: Math.max(1, Math.round(minutes)) }]; }
export function unlockedRewards(sessionCount) { return ['First Step','Getting Steady','In the Groove','Cornerstone'].filter((_, i) => sessionCount >= [1,3,7,14][i]); }
export function formatTime(seconds) { const safe=Math.max(0, Math.floor(seconds)); return `${String(Math.floor(safe/60)).padStart(2,'0')}:${String(safe%60).padStart(2,'0')}`; }

