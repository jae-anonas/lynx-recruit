import { StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Switch, Alert, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { useSession } from '@/components/SessionProvider';

export default function SurveyorProfile() {
  const { signOut } = useSession();
  const [userInfo, setUserInfo] = useState({
    name: 'Jae Anonas',
    email: 'jae.anonas@gmail.com',
    phone: '+64 20 479 3040',
    company: 'Lynx Recruitment',
    location: 'Auckland, New Zealand',
    joinDate: 'March 2023',
    licenseNumber: 'QS-NZ-2019-1847',
    experience: '8 years',
    specializations: ['Commercial', 'Residential', 'Industrial'],
    avatar: require('@/assets/images/avatar1.jpg'),
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    jobAlerts: true,
    availableForWork: true,
  });

  const [stats, setStats] = useState({
    totalProjects: 47,
    activeProjects: 4,
    completedProjects: 43,
    totalEarnings: 'NZ$67,500',
    averageRating: 4.8,
    totalReviews: 32,
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
              console.log('Surveyor profile logout starting...');
              
              // Sign out using session context - Stack.Protected will handle navigation
              await signOut();
              console.log('Surveyor profile logout successful');
              
              // Don't navigate manually - let Stack.Protected handle it
              // router.replace('/');
              
            } catch (error) {
              console.error('Surveyor profile logout error:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
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

  const SpecializationBadge = ({ specialization }: { specialization: string }) => (
    <View style={styles.specializationBadge}>
      <Text style={styles.specializationText}>{specialization}</Text>
    </View>
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

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingCard}>
            <View style={styles.ratingHeader}>
              <FontAwesome name="star" size={24} color="#FFD700" />
              <Text style={styles.ratingValue}>{stats.averageRating}</Text>
            </View>
            <Text style={styles.ratingText}>Average Rating</Text>
            <Text style={styles.ratingSubtext}>{stats.totalReviews} reviews</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Statistics</Text>
          <View style={styles.statsGrid}>
            <StatCard title="Total Projects" value={stats.totalProjects} />
            <StatCard title="Active" value={stats.activeProjects} />
            <StatCard title="Completed" value={stats.completedProjects} />
            <StatCard title="Total Earned" value={stats.totalEarnings} />
          </View>
        </View>

        {/* Professional Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <FontAwesome name="id-card" size={16} color="#aaa" />
              <Text style={styles.infoLabel}>License Number</Text>
              <Text style={styles.infoValue}>{userInfo.licenseNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome name="briefcase" size={16} color="#aaa" />
              <Text style={styles.infoLabel}>Experience</Text>
              <Text style={styles.infoValue}>{userInfo.experience}</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesome name="calendar" size={16} color="#aaa" />
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>{userInfo.joinDate}</Text>
            </View>
          </View>
        </View>

        {/* Specializations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specializations</Text>
          <View style={styles.specializationsContainer}>
            {userInfo.specializations.map((spec, index) => (
              <SpecializationBadge key={index} specialization={spec} />
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
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
              title="Job Alerts"
              subtitle="Notifications about new jobs"
              value={settings.jobAlerts}
              onToggle={() => handleSettingChange('jobAlerts')}
              icon="briefcase"
            />
            <SettingItem
              title="Available for Work"
              subtitle="Show as available to clients"
              value={settings.availableForWork}
              onToggle={() => handleSettingChange('availableForWork')}
              icon="check-circle"
            />
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actionsContainer}>
            <ActionButton
              title="Edit Profile"
              subtitle="Update your professional information"
              onPress={() => console.log('Edit profile')}
              icon="edit"
            />
            <ActionButton
              title="Portfolio"
              subtitle="Manage your work portfolio"
              onPress={() => console.log('Portfolio')}
              icon="folder"
            />
            <ActionButton
              title="Certifications"
              subtitle="Upload and manage certificates"
              onPress={() => console.log('Certifications')}
              icon="certificate"
            />
            <ActionButton
              title="Payment Settings"
              subtitle="Manage payment methods"
              onPress={() => console.log('Payment settings')}
              icon="credit-card"
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
    backgroundColor: 'transparent',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: '#222',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
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
    marginBottom: 5,
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
    width: 40,
    height: 40,
    backgroundColor: '#222',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingSection: {
    marginBottom: 30,
  },
  ratingCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  ratingSubtext: {
    fontSize: 14,
    color: '#aaa',
  },
  statsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00E5FF',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  infoContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: '#aaa',
    marginLeft: 15,
  },
  infoValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  specializationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specializationBadge: {
    backgroundColor: '#00E5FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  specializationText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  settingIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#222',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#aaa',
  },
  actionsContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#aaa',
  },
});
