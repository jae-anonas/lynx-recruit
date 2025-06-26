import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Tabs } from 'expo-router';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import AuthChecker from '@/components/AuthChecker';
import DropdownMenu from '@/components/DropdownMenu';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function UserTabLayout() {

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      alert('You are not logged in. Please log in to continue.');
      // Redirect to the login page or home page
      router.replace('/');
    }
  });

  return (
    <AuthChecker>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#00E5FF',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: '#111',
            borderTopColor: '#333',
            borderTopWidth: 1,
          },
          headerStyle: {
            backgroundColor: '#111',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerRight: () => <DropdownMenu />,
          }}
        />
        <Tabs.Screen
          name="surveyors"
          options={{
            title: 'Surveyors',
            tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
            headerRight: () => <DropdownMenu />,
          }}
        />
        <Tabs.Screen
          name="projects"
          options={{
            title: 'Projects',
            tabBarIcon: ({ color }) => <TabBarIcon name="briefcase" color={color} />,
            headerRight: () => <DropdownMenu />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
            headerRight: () => <DropdownMenu />,
          }}
        />
      </Tabs>
    </AuthChecker>
  );
}
