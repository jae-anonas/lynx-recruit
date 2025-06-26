import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import AuthChecker from '@/components/AuthChecker';
import DropdownMenu from '@/components/DropdownMenu';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function AdminTabLayout() {
  return (
    <AuthChecker>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#00E5FF',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: '#0a0a0a',
            borderTopColor: '#222',
            borderTopWidth: 1,
          },
          headerStyle: {
            backgroundColor: '#0a0a0a',
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
            title: 'Admin Dashboard',
            tabBarIcon: ({ color }) => <TabBarIcon name="dashboard" color={color} />,
            headerRight: () => <DropdownMenu />,
          }}
        />
        <Tabs.Screen
          name="users"
          options={{
            title: 'Manage Users',
            tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
            headerRight: () => <DropdownMenu />,
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
            headerRight: () => <DropdownMenu />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
            headerRight: () => <DropdownMenu />,
          }}
        />
      </Tabs>
    </AuthChecker>
  );
}
