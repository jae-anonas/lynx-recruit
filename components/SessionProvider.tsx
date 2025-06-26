// components/SessionProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

type SessionContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('SessionProvider: Setting up auth listener');
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('SessionProvider: Auth state changed, user:', currentUser ? currentUser.email : 'null');
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      console.log('SessionProvider: Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      console.log('SessionProvider: Signing out user');
      await auth.signOut();
      console.log('SessionProvider: Firebase signOut successful');
      setUser(null);
      console.log('SessionProvider: User state set to null');
    } catch (error) {
      console.error('SessionProvider: Sign out error:', error);
      throw error;
    }
  };

  // Show loading screen while auth state is being determined
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#00ffff" />
      </View>
    );
  }

  return (
    <SessionContext.Provider value={{ user, loading, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
}

// Hook to get the session for the Stack.Screen guard
export function useSessionGuard() {
  const { user, loading } = useSession();
  
  if (loading) {
    console.log('useSessionGuard: Still loading, returning false');
    return false; // Still loading, don't show protected routes
  }
  
  const isAuthenticated = !!user;
  console.log('useSessionGuard: User authenticated:', isAuthenticated, user ? user.email : 'no user');
  return isAuthenticated; // Returns true if authenticated, false if not
}
