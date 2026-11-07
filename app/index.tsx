import { Redirect } from 'expo-router';
import { useApp } from '@/state/AppContext';
export default function Index() { const { hydrated, profile } = useApp(); if (!hydrated) return null; return <Redirect href={profile ? '/(tabs)' : '/onboarding'} />; }

