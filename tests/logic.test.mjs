import test from 'node:test';
import assert from 'node:assert/strict';
import { finishWorkout, formatTime, localDateKey, unlockedRewards } from '../src/lib/logic.mjs';

test('completed workouts append a positive rounded session',()=>{const result=finishWorkout([], 'Foundations', 3.4, '2026-11-07');assert.deepEqual(result,[{date:'2026-11-07',title:'Foundations',minutes:3}]);});
test('rewards unlock at consistency milestones and do not reset',()=>{assert.deepEqual(unlockedRewards(0),[]);assert.deepEqual(unlockedRewards(3),['First Step','Getting Steady']);assert.equal(unlockedRewards(14).length,4);});
test('timer formatting clamps negative values',()=>{assert.equal(formatTime(65),'01:05');assert.equal(formatTime(-1),'00:00');});
test('date keys use local calendar fields',()=>{assert.equal(localDateKey(new Date(2026,10,7,0,30)),'2026-11-07');});

