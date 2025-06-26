import { StyleSheet, TouchableOpacity, SafeAreaView, FlatList, TextInput, Alert, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'surveyor' | 'user';
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'admin' | 'surveyor' | 'user'>('all');

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Michael Thompson',
        email: 'michael.thompson@example.co.nz',
        role: 'surveyor',
        status: 'active',
        joinDate: '2024-01-15',
      },
      {
        id: '2',
        name: 'Sarah Williams',
        email: 'sarah.williams@example.co.nz',
        role: 'admin',
        status: 'active',
        joinDate: '2023-12-01',
      },
      {
        id: '3',
        name: 'David Mitchell',
        email: 'david.mitchell@example.co.nz',
        role: 'user',
        status: 'pending',
        joinDate: '2024-06-20',
      },
      {
        id: '4',
        name: 'Emma Johnson',
        email: 'emma.johnson@example.co.nz',
        role: 'surveyor',
        status: 'inactive',
        joinDate: '2024-03-10',
      },
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

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

  const handleUserAction = (userId: string, action: 'activate' | 'deactivate' | 'delete') => {
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${action} this user?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            setUsers(prevUsers =>
              prevUsers.map(user =>
                user.id === userId
                  ? { 
                      ...user, 
                      status: action === 'activate' ? 'active' : action === 'deactivate' ? 'inactive' : user.status 
                    }
                  : user
              ).filter(user => action !== 'delete' || user.id !== userId)
            );
          },
        },
      ]
    );
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
        <Text style={styles.title}>Manage Users</Text>
        
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
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

      <TouchableOpacity style={styles.addButton}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
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
