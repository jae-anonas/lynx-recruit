// components/AuthChecker.tsx
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

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
      
      // Don't navigate here - just track the user state
      // Let the logout functions handle navigation
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

  if (!user) {
    // Don't render anything when there's no user
    // This prevents navigation conflicts and remounting cycles
    return null;
  }

  return <>{children}</>;
}
