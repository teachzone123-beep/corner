import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { finishWorkout, type WorkoutRecord } from '@/lib/logic.mjs';
type Profile = { name:string; experience:string; days:string[]; lowImpact:boolean };
type Ctx = { hydrated:boolean; profile:Profile|null; history:WorkoutRecord[]; setProfile:(p:Profile)=>void; completeWorkout:(title:string,minutes:number)=>void };
const Context=createContext<Ctx|undefined>(undefined);
export function AppProvider({children}:{children:React.ReactNode}) { const [hydrated,setHydrated]=useState(false);const [profile,setProfileState]=useState<Profile|null>(null);const [history,setHistory]=useState<WorkoutRecord[]>([]);
 useEffect(()=>{(async()=>{try{const [p,h]=await Promise.all([AsyncStorage.getItem('corner.profile'),AsyncStorage.getItem('corner.history')]);if(p)setProfileState(JSON.parse(p));if(h)setHistory(JSON.parse(h));}catch{}finally{setHydrated(true);}})();},[]);
 const setProfile=(p:Profile)=>{setProfileState(p);void AsyncStorage.setItem('corner.profile',JSON.stringify(p));};
 const completeWorkout=(title:string,minutes:number)=>setHistory(current=>{const next=finishWorkout(current,title,minutes);void AsyncStorage.setItem('corner.history',JSON.stringify(next));return next;});
 const value=useMemo(()=>({hydrated,profile,history,setProfile,completeWorkout}),[hydrated,profile,history]);return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useApp(){const value=useContext(Context);if(!value)throw new Error('useApp must be used inside AppProvider');return value;}

