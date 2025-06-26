import { StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Pressable, Text, View } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from '@/firebaseConfig';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalSurveyors: 0,
    activeProjects: 0,
    pendingApprovals: 0,
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setAdminStats({
      totalUsers: 150,
      totalSurveyors: 45,
      activeProjects: 12,
      pendingApprovals: 8,
    });
  }, []);

  const StatCard = ({ title, value, color = '#2196F3' }: { title: string; value: number; color?: string }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const QuickAction = ({ title, onPress, icon }: { title: string; onPress: () => void; icon: string }) => (
    <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
      <Text style={styles.quickActionTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Welcome back, Administrator</Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard title="Total Users" value={adminStats.totalUsers} color="#4CAF50" />
            <StatCard title="Total Surveyors" value={adminStats.totalSurveyors} color="#FF9800" />
            <StatCard title="Active Projects" value={adminStats.activeProjects} color="#2196F3" />
            <StatCard title="Pending Approvals" value={adminStats.pendingApprovals} color="#F44336" />
          </View>
        </View>

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              title="Add New User"
              icon="user-plus"
              onPress={() => {
                // Navigate to add user screen
                console.log('Navigate to add user');
              }}
            />
            <QuickAction
              title="Review Applications"
              icon="file-text"
              onPress={() => {
                // Navigate to applications screen
                console.log('Navigate to applications');
              }}
            />
            <QuickAction
              title="System Reports"
              icon="bar-chart"
              onPress={() => {
                // Navigate to reports screen
                console.log('Navigate to reports');
              }}
            />
            <QuickAction
              title="Backup Data"
              icon="download"
              onPress={() => {
                // Navigate to backup screen
                console.log('Navigate to backup');
              }}
            />
          </View>
        </View>

        <View style={styles.recentActivityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>New surveyor registration: John Doe</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>Project completed: Site Survey #123</Text>
              <Text style={styles.activityTime}>4 hours ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>User profile updated: Jane Smith</Text>
              <Text style={styles.activityTime}>6 hours ago</Text>
            </View>
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
  statsContainer: {
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#fff',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  statCard: {
    backgroundColor: '#0a0a0a',
    padding: 20,
    borderRadius: 12,
    width: '48%',
    marginBottom: 15,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#222',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  statTitle: {
    fontSize: 14,
    opacity: 0.7,
    color: '#aaa',
  },
  quickActionsContainer: {
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  quickActionCard: {
    backgroundColor: '#0a0a0a',
    padding: 20,
    borderRadius: 12,
    width: '48%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#222',
    alignItems: 'center',
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  recentActivityContainer: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  activityList: {
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  activityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    backgroundColor: 'transparent',
  },
  activityText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#fff',
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.6,
    color: '#aaa',
  },
});
