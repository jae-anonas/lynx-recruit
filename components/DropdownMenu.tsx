import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Modal, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { useSession } from './SessionProvider';

export default function DropdownMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { signOut } = useSession();

  const toggleMenu = () => setMenuVisible((v) => !v);

  const logout = async () => {
    setMenuVisible(false);
    try {
      console.log('Starting logout process...');
      
      // Sign out using session context
      await signOut();
      console.log('Logout successful, navigating to login');
      
      // Navigate to login - Stack.Protected will handle the rest
      router.replace('/');
      
    } catch (error) {
      console.error('Logout error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert('Error signing out: ' + errorMessage);
    }
  };

  return (
    <>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity onPress={toggleMenu}>
          <FontAwesome name="user-circle" size={25} color="#fff" />
        </TouchableOpacity>
        {menuVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Profile</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={logout} style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {menuVisible && (
        <Modal transparent animationType="none" visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
          <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)} />
        </Modal>
      )}
    </>
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
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    paddingVertical: 5,
    zIndex: 100,
  },
  dropdownItem: { padding: 12 },
  dropdownText: { color: '#fff', fontSize: 16 },
  separator: { 
    height: 1, 
    backgroundColor: '#444', 
    marginHorizontal: 12 
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});