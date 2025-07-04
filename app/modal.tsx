import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export default function DropdownMenu() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        alert('Successful logout!');
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Text style={styles.menuText}>☰ Menu</Text>
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={logout} style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Sign Out</Text>
          </TouchableOpacity>
          {/* Add more options here if needed */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  menuButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 6,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
  },
  dropdown: {
    backgroundColor: '#222',
    borderRadius: 6,
    marginTop: 10,
    width: 150,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    paddingVertical: 5,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
  },
});
