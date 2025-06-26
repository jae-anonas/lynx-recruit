import { StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Switch, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getAuth, signOut } from 'firebase/auth';
import { router } from 'expo-router';

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState({
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@example.com',
    phone: '+63 912 345 6789',
    company: 'Rodriguez Construction Co.',
    location: 'Manila, Philippines',
    joinDate: 'January 2024',
    avatar: require('@/assets/images/avatar1.jpg'),
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    darkMode: true,
  });

  const [stats, setStats] = useState({
    totalProjects: 15,
    activeProjects: 3,
    completedProjects: 12,
    totalSpent: '₱12,450,000',
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSignOut = () => {
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
              await signOut(getAuth());
              router.replace('/');
            } catch (error) {
              console.error('Sign out error:', error);
            }
          },
        },
      ]
    );
  };

  const StatCard = ({ title, value }: { title: string; value: string | number }) => (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const SettingItem = ({ 
    title, 
    subtitle, 
    value, 
    onToggle,
    icon 
  }: { 
    title: string; 
    subtitle: string; 
    value: boolean; 
    onToggle: () => void;
    icon: string;
  }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <FontAwesome name={icon as any} size={20} color="#00E5FF" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#333', true: '#00E5FF' }}
        thumbColor={value ? '#ffffff' : '#f4f3f4'}
      />
    </View>
  );

  const ActionButton = ({ 
    title, 
    subtitle, 
    onPress, 
    icon, 
    color = '#00E5FF',
    danger = false
  }: { 
    title: string; 
    subtitle: string; 
    onPress: () => void; 
    icon: string; 
    color?: string;
    danger?: boolean;
  }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: danger ? '#F44336' : color }]}>
        <FontAwesome name={icon as any} size={20} color="white" />
      </View>
      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>
      <FontAwesome name="chevron-right" size={16} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={userInfo.avatar} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{userInfo.name}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>
            <Text style={styles.company}>{userInfo.company}</Text>
            <View style={styles.locationContainer}>
              <FontAwesome name="map-marker" size={14} color="#aaa" />
              <Text style={styles.location}>{userInfo.location}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <FontAwesome name="edit" size={16} color="#00E5FF" />
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Statistics</Text>
          <View style={styles.statsGrid}>
            <StatCard title="Total Projects" value={stats.totalProjects} />
            <StatCard title="Active" value={stats.activeProjects} />
            <StatCard title="Completed" value={stats.completedProjects} />
            <StatCard title="Total Spent" value={stats.totalSpent} />
          </View>
        </View>

        {/* Account Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <FontAwesome name="envelope" size={16} color="#aaa" />
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userInfo.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome name="phone" size={16} color="#aaa" />
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{userInfo.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome name="calendar" size={16} color="#aaa" />
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>{userInfo.joinDate}</Text>
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingsContainer}>
            <SettingItem
              title="Email Notifications"
              subtitle="Receive updates via email"
              value={settings.emailNotifications}
              onToggle={() => handleSettingChange('emailNotifications')}
              icon="envelope"
            />
            <SettingItem
              title="Push Notifications"
              subtitle="Get real-time notifications"
              value={settings.pushNotifications}
              onToggle={() => handleSettingChange('pushNotifications')}
              icon="bell"
            />
            <SettingItem
              title="Project Updates"
              subtitle="Notifications about project changes"
              value={settings.projectUpdates}
              onToggle={() => handleSettingChange('projectUpdates')}
              icon="briefcase"
            />
            <SettingItem
              title="Dark Mode"
              subtitle="Use dark theme"
              value={settings.darkMode}
              onToggle={() => handleSettingChange('darkMode')}
              icon="moon-o"
            />
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actionsContainer}>
            <ActionButton
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => console.log('Edit profile')}
              icon="edit"
            />
            <ActionButton
              title="Change Password"
              subtitle="Update your account password"
              onPress={() => console.log('Change password')}
              icon="lock"
            />
            <ActionButton
              title="Privacy Settings"
              subtitle="Manage your privacy preferences"
              onPress={() => console.log('Privacy settings')}
              icon="shield"
            />
            <ActionButton
              title="Help & Support"
              subtitle="Get help or contact support"
              onPress={() => console.log('Help & support')}
              icon="question-circle"
            />
            <ActionButton
              title="Sign Out"
              subtitle="Sign out of your account"
              onPress={handleSignOut}
              icon="sign-out"
              danger={true}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#00E5FF',
    marginBottom: 5,
  },
  company: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 5,
  },
  editButton: {
    padding: 10,
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 12,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  infoLabel: {
    fontSize: 14,
    color: '#aaa',
    marginLeft: 15,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  settingsContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 3,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#aaa',
  },
  actionsContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 3,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#aaa',
  },
});
