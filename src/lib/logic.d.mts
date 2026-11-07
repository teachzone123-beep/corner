export type WorkoutRecord = { date:string; title:string; minutes:number };
export function finishWorkout(history:WorkoutRecord[],title:string,minutes:number,date?:string):WorkoutRecord[];
export function unlockedRewards(sessionCount:number):string[];
export function formatTime(seconds:number):string;

