import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { useSession } from './SessionProvider';

export default function DropdownMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { signOut } = useSession();

  const toggleMenu = () => {
    console.log('Toggle menu pressed, current state:', menuVisible);
    setMenuVisible((v) => !v);
  };

  const profilePress = () => {
    console.log('DropdownMenu profile press - CALLED!');
    console.log('About to set menu visible to false');
    setMenuVisible(false);
    console.log('Menu visible set to false');
    // Add navigation or profile action here
    // router.push('/profile'); // Example navigation
  };

  const logout = async () => {
    console.log('DropdownMenu logout press - CALLED!');
    console.log('About to set menu visible to false');
    setMenuVisible(false);
    console.log('Menu visible set to false');
    console.log('DropdownMenu logout should be starting...');
    
    // Add a small delay to ensure Modal is fully closed before showing Alert
    setTimeout(() => {
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Sign Out',
            style: 'destructive',
            onPress: async () => {
            try {
              console.log('DropdownMenu logout starting...');
              
              // Sign out using session context - Stack.Protected will handle navigation
              await signOut();
              console.log('DropdownMenu logout successful');
              
              // Don't navigate manually - let Stack.Protected handle it
              // router.replace('/');
              
            } catch (error) {
              console.error('DropdownMenu logout error:', error);
              const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
    }, 100); // Small delay to ensure Modal is closed
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={toggleMenu}>
        <FontAwesome name="user-circle" size={25} color="#fff" />
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity 
            onPress={profilePress}
            style={styles.dropdownItem}
          >
            <Text style={styles.dropdownText}>Profile</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity 
            onPress={logout}
            style={styles.dropdownItem}
          >
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: { position: 'relative', marginRight: 15 },
  dropdown: {
    position: 'absolute',
    top: 35,
    right: 0,
    backgroundColor: '#222',
    borderRadius: 6,
    width: 150,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    paddingVertical: 5,
    zIndex: 1000,
  },
  dropdownItem: { 
    padding: 12,
    backgroundColor: 'transparent', // Ensure no background interference
  },
  dropdownText: { color: '#fff', fontSize: 16 },
  separator: { 
    height: 1, 
    backgroundColor: '#444', 
    marginHorizontal: 12 
  },
});