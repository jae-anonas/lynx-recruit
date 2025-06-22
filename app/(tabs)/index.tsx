import { StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, Pressable } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from '@/firebaseConfig';
import { useState } from 'react';

type ItemProps = {
  item: {
    id: string;
    avatar: any; // Replace 'any' with the correct type for avatar if known, e.g., ImageSourcePropType
    name: string;
    title: string;
    years: string;
    type: string;
    location: string;
  };
};

const Item = ({ item }: ItemProps) => (
  <TouchableOpacity onPress={() => router.push({ pathname: './SurveyorProfile', params: item })}>
    <View style={styles.itemContainer}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sub}>
          {item.title}
        </Text>
        <Text style={styles.sub}>
          {item.years} · {item.type} · {item.location}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

// Example data for FlatList
const DATA = [
  {
    id: '1',
    avatar: require('@/assets/images/avatar1.jpg'), // Replace with actual image path
    name: 'Jane Doe',
    title: 'Software Engineer',
    years: '5 yrs',
    type: 'Full-time',
    location: 'Remote',
  },
  {
    id: '2',
    avatar: require('@/assets/images/avatar1.jpg'), // Replace with actual image path
    name: 'John Smith',
    title: 'Product Manager',
    years: '3 yrs',
    type: 'Contract',
    location: 'New York',
  },
  // Add more items as needed
];

export default function TabOneScreen() {
  // onAuthStateChanged(auth, (user) => {
  //   if (!user) {
  //     router.replace('/');
  //   }
  // });


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => { /* handle */ }}>
          <Text style={styles.buttonText}>Request QS</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  listContent: { padding: 20, paddingBottom: 100 },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  info: { flex: 1 },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sub: { color: '#ccc', fontSize: 14, marginTop: 2 },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#3eece6',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%', // full width
  },
  buttonText: { color: '#000', fontSize: 16, fontWeight: '600' },
});
