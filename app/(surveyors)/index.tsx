import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface DashboardStats {
  activeProjects: number;
  completedThisMonth: number;
  totalEarnings: string;
  pendingPayments: string;
  avgRating: number;
  totalReviews: number;
}

interface RecentJob {
  id: string;
  title: string;
  client: string;
  location: string;
  budget: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function SurveyorDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    activeProjects: 4,
    completedThisMonth: 8,
    totalEarnings: 'NZ$18,500',
    pendingPayments: 'NZ$3,200',
    avgRating: 4.8,
    totalReviews: 47,
  });

  const [recentJobs, setRecentJobs] = useState<RecentJob[]>([
    {
      id: '1',
      title: 'Commercial Office Survey',
      client: 'Auckland Property Ltd',
      location: 'Auckland CBD',
      budget: 'NZ$4,500',
      deadline: '2025-07-15',
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'Residential Cost Analysis',
      client: 'Hamilton Homes',
      location: 'Hamilton',
      budget: 'NZ$2,800',
      deadline: '2025-07-10',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Warehouse Extension',
      client: 'Wellington Logistics',
      location: 'Wellington',
      budget: 'NZ$6,200',
      deadline: '2025-06-30',
      status: 'completed',
    },
  ]);

  const StatCard = ({ title, value, subtitle, icon, color = '#00E5FF' }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: string;
    color?: string;
  }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <FontAwesome name={icon as any} size={20} color="white" />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );

  const JobCard = ({ job }: { job: RecentJob }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'completed': return '#4CAF50';
        case 'in-progress': return '#FF9800';
        case 'pending': return '#2196F3';
        default: return '#666';
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'completed': return 'Completed';
        case 'in-progress': return 'In Progress';
        case 'pending': return 'Pending';
        default: return status;
      }
    };

    return (
      <TouchableOpacity style={styles.jobCard}>
        <View style={styles.jobHeader}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
            <Text style={styles.statusText}>{getStatusText(job.status)}</Text>
          </View>
        </View>
        <Text style={styles.jobClient}>{job.client}</Text>
        <View style={styles.jobDetails}>
          <View style={styles.jobDetailItem}>
            <FontAwesome name="map-marker" size={14} color="#aaa" />
            <Text style={styles.jobDetailText}>{job.location}</Text>
          </View>
          <View style={styles.jobDetailItem}>
            <FontAwesome name="dollar" size={14} color="#aaa" />
            <Text style={styles.jobDetailText}>{job.budget}</Text>
          </View>
          <View style={styles.jobDetailItem}>
            <FontAwesome name="calendar" size={14} color="#aaa" />
            <Text style={styles.jobDetailText}>{job.deadline}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back, Ben!</Text>
          <Text style={styles.welcomeSubtext}>Here's your surveying activity overview</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Active Projects"
            value={stats.activeProjects}
            icon="briefcase"
            color="#00E5FF"
          />
          <StatCard
            title="Completed"
            value={stats.completedThisMonth}
            subtitle="This month"
            icon="check-circle"
            color="#4CAF50"
          />
          <StatCard
            title="Total Earnings"
            value={stats.totalEarnings}
            icon="dollar"
            color="#FF9800"
          />
          <StatCard
            title="Pending"
            value={stats.pendingPayments}
            subtitle="Awaiting payment"
            icon="clock-o"
            color="#F44336"
          />
        </View>

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingCard}>
            <View style={styles.ratingHeader}>
              <FontAwesome name="star" size={24} color="#FFD700" />
              <Text style={styles.ratingValue}>{stats.avgRating}</Text>
            </View>
            <Text style={styles.ratingText}>Average Rating</Text>
            <Text style={styles.ratingSubtext}>{stats.totalReviews} reviews</Text>
          </View>
        </View>

        {/* Recent Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Jobs</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="search" size={20} color="#00E5FF" />
              <Text style={styles.actionText}>Find Jobs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="edit" size={20} color="#00E5FF" />
              <Text style={styles.actionText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="file-text" size={20} color="#00E5FF" />
              <Text style={styles.actionText}>Submit Report</Text>
            </TouchableOpacity>
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
  welcomeSection: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#aaa',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 10,
    color: '#666',
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
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAllText: {
    fontSize: 14,
    color: '#00E5FF',
  },
  jobCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#222',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  jobClient: {
    fontSize: 14,
    color: '#00E5FF',
    marginBottom: 10,
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  jobDetailText: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#222',
  },
  actionText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
});
