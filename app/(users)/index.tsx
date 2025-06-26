import { StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from '@/firebaseConfig';
import { useState, useEffect } from 'react';

export default function UserDashboard() {
  const [userStats, setUserStats] = useState({
    activeProjects: 0,
    completedProjects: 0,
    totalSurveyors: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setUserStats({
      activeProjects: 3,
      completedProjects: 12,
      totalSurveyors: 45,
      pendingRequests: 2,
    });
  }, []);

  const StatCard = ({ title, value, color = '#00E5FF' }: { title: string; value: number; color?: string }) => (
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
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Here's what's happening with your projects</Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard title="Active Projects" value={userStats.activeProjects} color="#4CAF50" />
            <StatCard title="Completed" value={userStats.completedProjects} color="#2196F3" />
            <StatCard title="Available Surveyors" value={userStats.totalSurveyors} color="#FF9800" />
            <StatCard title="Pending Requests" value={userStats.pendingRequests} color="#F44336" />
          </View>
        </View>

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              title="Find Surveyors"
              icon="search"
              onPress={() => {
                router.push('./surveyors');
              }}
            />
            <QuickAction
              title="Create Project"
              icon="plus"
              onPress={() => {
                console.log('Navigate to create project');
              }}
            />
            <QuickAction
              title="View Reports"
              icon="file-text"
              onPress={() => {
                console.log('Navigate to reports');
              }}
            />
            <QuickAction
              title="Support"
              icon="support"
              onPress={() => {
                console.log('Navigate to support');
              }}
            />
          </View>
        </View>

        <View style={styles.recentActivityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>Project "Office Complex Survey" completed</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>New surveyor application from Mike Johnson</Text>
              <Text style={styles.activityTime}>2 days ago</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>Project "Residential Survey" in progress</Text>
              <Text style={styles.activityTime}>3 days ago</Text>
            </View>
          </View>
        </View>

        <View style={styles.featuredSurveyorsContainer}>
          <Text style={styles.sectionTitle}>Featured Surveyors</Text>
          <View style={styles.surveyorsList}>
            <TouchableOpacity 
              style={styles.surveyorCard}
              onPress={() => router.push('./surveyors')}
            >
              <Text style={styles.surveyorName}>John Doe</Text>
              <Text style={styles.surveyorTitle}>Senior Quantity Surveyor</Text>
              <Text style={styles.surveyorRating}>⭐ 4.9 (25 reviews)</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.surveyorCard}
              onPress={() => router.push('./surveyors')}
            >
              <Text style={styles.surveyorName}>Sarah Wilson</Text>
              <Text style={styles.surveyorTitle}>Construction Cost Analyst</Text>
              <Text style={styles.surveyorRating}>⭐ 4.8 (18 reviews)</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('./surveyors')}
          >
            <Text style={styles.viewAllText}>View All Surveyors</Text>
          </TouchableOpacity>
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
  header: {
    marginBottom: 30,
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
  },
  statCard: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 12,
    width: '48%',
    marginBottom: 15,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#333',
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
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 12,
    width: '48%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  recentActivityContainer: {
    marginBottom: 30,
  },
  activityList: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  activityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
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
  featuredSurveyorsContainer: {
    marginBottom: 20,
  },
  surveyorsList: {
    marginBottom: 15,
  },
  surveyorCard: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  surveyorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  surveyorTitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
  },
  surveyorRating: {
    fontSize: 12,
    color: '#FF9800',
  },
  viewAllButton: {
    backgroundColor: '#00E5FF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
