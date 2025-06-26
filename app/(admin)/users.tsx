import { StyleSheet, TouchableOpacity, SafeAreaView, FlatList, TextInput, Alert, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { collection, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import AddUserModal from './AddUser';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'surveyor' | 'user';
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  phone?: string;
  company?: string;
  location?: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'admin' | 'surveyor' | 'user'>('all');
  const [addUserModalVisible, setAddUserModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up real-time listener for users collection with error handling
    if (!db) {
      console.log('Firebase not available, using mock data');
      loadMockData();
      return;
    }

    try {
      const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      
      const unsubscribe = onSnapshot(usersQuery, 
        (snapshot) => {
          const usersData: User[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            usersData.push({
              id: doc.id,
              name: data.name || '',
              email: data.email || '',
              role: data.role || 'user',
              status: data.status || 'active',
              joinDate: data.joinDate?.toDate ? data.joinDate.toDate().toISOString().split('T')[0] : data.joinDate || '',
              phone: data.phone || '',
              company: data.company || '',
              location: data.location || '',
            });
          });
          setUsers(usersData);
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching users:', error);
          // Fallback to mock data if Firebase fails
          loadMockData();
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up Firebase listener:', error);
      // Fallback to mock data if Firebase setup fails
      loadMockData();
      setLoading(false);
    }
  }, []);

  const loadMockData = () => {
    // Mock data fallback - for development/testing
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Michael Thompson',
        email: 'michael.thompson@example.co.nz',
        role: 'surveyor',
        status: 'active',
        joinDate: '2024-01-15',
        phone: '+64 21 456 789',
        company: 'Thompson Surveying Ltd',
        location: 'Auckland, New Zealand',
      },
      {
        id: '2',
        name: 'Sarah Williams',
        email: 'sarah.williams@example.co.nz',
        role: 'admin',
        status: 'active',
        joinDate: '2023-12-01',
        phone: '+64 21 987 654',
        company: 'QS Mate',
        location: 'Wellington, New Zealand',
      },
      {
        id: '3',
        name: 'David Mitchell',
        email: 'david.mitchell@example.co.nz',
        role: 'user',
        status: 'pending',
        joinDate: '2024-06-20',
        phone: '+64 21 234 567',
        company: 'Mitchell Construction',
        location: 'Christchurch, New Zealand',
      },
      {
        id: '4',
        name: 'Emma Johnson',
        email: 'emma.johnson@example.co.nz',
        role: 'surveyor',
        status: 'inactive',
        joinDate: '2024-03-10',
        phone: '+64 21 876 543',
        company: 'Johnson & Associates',
        location: 'Hamilton, New Zealand',
      },
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  };

  useEffect(() => {
    let filtered = users;

    // Filter by role
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(user => user.role === selectedFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchQuery, selectedFilter]);

  const handleUserAction = async (userId: string, action: 'activate' | 'deactivate' | 'delete') => {
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${action} this user?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              if (!db) {
                throw new Error('Database not initialized');
              }
              
              if (action === 'delete') {
                await deleteDoc(doc(db, 'users', userId));
              } else {
                const newStatus = action === 'activate' ? 'active' : 'inactive';
                await updateDoc(doc(db, 'users', userId), {
                  status: newStatus,
                  updatedAt: new Date(),
                });
              }
            } catch (error) {
              console.error(`Error ${action}ing user:`, error);
              Alert.alert('Error', `Failed to ${action} user. Please try again.`);
              
              // If Firebase fails, update locally for mock data
              if (error instanceof Error && error.message.includes('Database not initialized')) {
                setUsers(prevUsers => {
                  if (action === 'delete') {
                    return prevUsers.filter(user => user.id !== userId);
                  } else {
                    return prevUsers.map(user =>
                      user.id === userId
                        ? { ...user, status: action === 'activate' ? 'active' : 'inactive' }
                        : user
                    );
                  }
                });
              }
            }
          },
        },
      ]
    );
  };

  const handleUserAdded = () => {
    // Users will be automatically updated via the real-time listener if Firebase is available
    // If Firebase is not available, this will be handled by the modal's fallback logic
    console.log('User added successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'inactive':
        return '#F44336';
      case 'pending':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return '#9C27B0';
      case 'surveyor':
        return '#2196F3';
      case 'user':
        return '#607D8B';
      default:
        return '#9E9E9E';
    }
  };

  const FilterButton = ({ filter, title }: { filter: typeof selectedFilter; title: string }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.filterButtonActive
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === filter && styles.filterButtonTextActive
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const UserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={styles.userTags}>
          <View style={[styles.roleTag, { backgroundColor: getRoleColor(item.role) }]}>
            <Text style={styles.tagText}>{item.role.toUpperCase()}</Text>
          </View>
          <View style={[styles.statusTag, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.tagText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.joinDate}>Joined: {item.joinDate}</Text>
      </View>
      <View style={styles.userActions}>
        {item.status === 'inactive' ? (
          <TouchableOpacity
            style={[styles.actionButton, styles.activateButton]}
            onPress={() => handleUserAction(item.id, 'activate')}
          >
            <FontAwesome name="check" size={16} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, styles.deactivateButton]}
            onPress={() => handleUserAction(item.id, 'deactivate')}
          >
            <FontAwesome name="ban" size={16} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleUserAction(item.id, 'delete')}
        >
          <FontAwesome name="trash" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filtersContainer}>
          <FilterButton filter="all" title="All" />
          <FilterButton filter="admin" title="Admins" />
          <FilterButton filter="surveyor" title="Surveyors" />
          <FilterButton filter="user" title="Users" />
        </View>
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => <UserItem item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.usersList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setAddUserModalVisible(true)}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>

      <AddUserModal
        visible={addUserModalVisible}
        onClose={() => setAddUserModalVisible(false)}
        onUserAdded={handleUserAdded}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 10,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#444',
  },
  filterButtonActive: {
    backgroundColor: '#00E5FF',
    borderColor: '#00E5FF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#aaa',
  },
  filterButtonTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  usersList: {
    flex: 1,
    padding: 20,
  },
  userItem: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  userInfo: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#fff',
  },
  userEmail: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
  },
  userTags: {
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: 'transparent',
  },
  roleTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  joinDate: {
    fontSize: 12,
    color: '#666',
  },
  userActions: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
  activateButton: {
    backgroundColor: '#4CAF50',
  },
  deactivateButton: {
    backgroundColor: '#FF9800',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#00E5FF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
