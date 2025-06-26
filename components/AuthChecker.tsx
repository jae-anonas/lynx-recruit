// components/AuthChecker.tsx
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { router } from 'expo-router';

type Props = {
  children: React.ReactNode;
};

export default function AuthChecker({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('AuthChecker mounted, setting up auth listener');
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed, user:', currentUser ? currentUser.email : 'null');
      setUser(currentUser);
      setLoading(false);
      
      if (!currentUser) {
        console.log('No user found, redirecting to login');
        // Use a small delay to ensure state updates are complete
        setTimeout(() => {
          router.replace('/');
        }, 100);
      }
    });

    return () => {
      console.log('AuthChecker unmounting, cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#00ffff" />
      </View>
    );
  }

  return <>{user ? children : null}</>;
}
