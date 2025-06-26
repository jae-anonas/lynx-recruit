import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert, View, Text } from 'react-native';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    autoBackup: true,
    twoFactorAuth: false,
    darkMode: false,
    locationTracking: true,
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleBackup = () => {
    Alert.alert(
      'Backup Data',
      'This will create a backup of all system data. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Backup', onPress: () => console.log('Backup initiated') },
      ]
    );
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Settings',
      'This will reset all settings to default values. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            setSettings({
              emailNotifications: true,
              pushNotifications: false,
              autoBackup: true,
              twoFactorAuth: false,
              darkMode: false,
              locationTracking: true,
            });
          }
        },
      ]
    );
  };

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
        <FontAwesome name={icon as any} size={20} color="#2196F3" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#e0e0e0', true: '#2196F3' }}
        thumbColor={value ? '#ffffff' : '#f4f3f4'}
      />
    </View>
  );

  const ActionButton = ({ 
    title, 
    subtitle, 
    onPress, 
    icon, 
    color = '#2196F3' 
  }: { 
    title: string; 
    subtitle: string; 
    onPress: () => void; 
    icon: string; 
    color?: string;
  }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <FontAwesome name={icon as any} size={20} color="white" />
      </View>
      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>
      <FontAwesome name="chevron-right" size={16} color="#ccc" />
    </TouchableOpacity>
  );

  const InfoCard = ({ title, value }: { title: string; value: string }) => (
    <View style={styles.infoCard}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your admin preferences</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Information</Text>
          <View style={styles.infoContainer}>
            <InfoCard title="App Version" value="1.2.0" />
            <InfoCard title="Last Backup" value="June 25, 2025" />
            <InfoCard title="Active Users" value="150" />
            <InfoCard title="Storage Used" value="2.3 GB" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingsContainer}>
            <SettingItem
              title="Email Notifications"
              subtitle="Receive system alerts via email"
              value={settings.emailNotifications}
              onToggle={() => handleSettingChange('emailNotifications')}
              icon="envelope"
            />
            <SettingItem
              title="Push Notifications"
              subtitle="Get real-time notifications on your device"
              value={settings.pushNotifications}
              onToggle={() => handleSettingChange('pushNotifications')}
              icon="bell"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.settingsContainer}>
            <SettingItem
              title="Two-Factor Authentication"
              subtitle="Add an extra layer of security"
              value={settings.twoFactorAuth}
              onToggle={() => handleSettingChange('twoFactorAuth')}
              icon="shield"
            />
            <SettingItem
              title="Auto Backup"
              subtitle="Automatically backup data daily"
              value={settings.autoBackup}
              onToggle={() => handleSettingChange('autoBackup')}
              icon="cloud-upload"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.settingsContainer}>
            <SettingItem
              title="Location Tracking"
              subtitle="Track surveyor locations for projects"
              value={settings.locationTracking}
              onToggle={() => handleSettingChange('locationTracking')}
              icon="map-marker"
            />
            <SettingItem
              title="Dark Mode"
              subtitle="Use dark theme throughout the app"
              value={settings.darkMode}
              onToggle={() => handleSettingChange('darkMode')}
              icon="moon-o"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actionsContainer}>
            <ActionButton
              title="Backup Data"
              subtitle="Create a manual backup of all data"
              onPress={handleBackup}
              icon="download"
              color="#4CAF50"
            />
            <ActionButton
              title="Export Reports"
              subtitle="Generate and download system reports"
              onPress={() => console.log('Export reports')}
              icon="file-text"
              color="#FF9800"
            />
            <ActionButton
              title="System Logs"
              subtitle="View detailed system activity logs"
              onPress={() => console.log('View logs')}
              icon="list"
              color="#9C27B0"
            />
            <ActionButton
              title="Reset Settings"
              subtitle="Reset all settings to default values"
              onPress={handleReset}
              icon="refresh"
              color="#F44336"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.actionsContainer}>
            <ActionButton
              title="Help Center"
              subtitle="Access documentation and guides"
              onPress={() => console.log('Open help')}
              icon="question-circle"
            />
            <ActionButton
              title="Contact Support"
              subtitle="Get help from our support team"
              onPress={() => console.log('Contact support')}
              icon="support"
            />
            <ActionButton
              title="Send Feedback"
              subtitle="Share your thoughts and suggestions"
              onPress={() => console.log('Send feedback')}
              icon="comment"
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
  header: {
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    color: '#aaa',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#fff',
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  infoCard: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 12,
    width: '48%',
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  infoTitle: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 5,
    color: '#aaa',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
    color: '#fff',
  },
  settingSubtitle: {
    fontSize: 14,
    opacity: 0.7,
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
    color: '#fff',
  },
  actionSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    color: '#aaa',
  },
});
