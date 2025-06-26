import { StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState, useEffect } from 'react';

const { width } = Dimensions.get('window');

interface AnalyticsData {
  userGrowth: { month: string; users: number }[];
  surveyorPerformance: { name: string; completed: number; rating: number }[];
  projectStats: { status: string; count: number; percentage: number }[];
  revenueData: { month: string; revenue: number }[];
}

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    userGrowth: [],
    surveyorPerformance: [],
    projectStats: [],
    revenueData: [],
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setAnalyticsData({
      userGrowth: [
        { month: 'Jan', users: 45 },
        { month: 'Feb', users: 52 },
        { month: 'Mar', users: 61 },
        { month: 'Apr', users: 73 },
        { month: 'May', users: 84 },
        { month: 'Jun', users: 95 },
      ],
      surveyorPerformance: [
        { name: 'John Doe', completed: 15, rating: 4.8 },
        { name: 'Jane Smith', completed: 12, rating: 4.6 },
        { name: 'Mike Johnson', completed: 18, rating: 4.9 },
        { name: 'Sarah Wilson', completed: 9, rating: 4.4 },
      ],
      projectStats: [
        { status: 'Completed', count: 28, percentage: 70 },
        { status: 'In Progress', count: 8, percentage: 20 },
        { status: 'Pending', count: 4, percentage: 10 },
      ],
      revenueData: [
        { month: 'Jan', revenue: 15000 },
        { month: 'Feb', revenue: 18000 },
        { month: 'Mar', revenue: 22000 },
        { month: 'Apr', revenue: 26000 },
        { month: 'May', revenue: 24000 },
        { month: 'Jun', revenue: 29000 },
      ],
    });
  }, []);

  const MetricCard = ({ title, value, subtitle, color = '#2196F3' }: {
    title: string;
    value: string;
    subtitle?: string;
    color?: string;
  }) => (
    <View style={[styles.metricCard, { borderLeftColor: color }]}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </View>
  );

  const SimpleBarChart = ({ data, height = 120 }: {
    data: { month: string; users: number }[];
    height?: number;
  }) => {
    const maxValue = Math.max(...data.map(item => item.users));
    
    return (
      <View style={[styles.chartContainer, { height }]}>
        <View style={styles.barsContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.barGroup}>
              <View
                style={[
                  styles.bar,
                  {
                    height: (item.users / maxValue) * (height - 40),
                    backgroundColor: '#2196F3',
                  },
                ]}
              />
              <Text style={styles.barLabel}>{item.month}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const ProgressBar = ({ label, value, maxValue, color = '#2196F3' }: {
    label: string;
    value: number;
    maxValue: number;
    color?: string;
  }) => {
    const percentage = (value / maxValue) * 100;
    
    return (
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarHeader}>
          <Text style={styles.progressBarLabel}>{label}</Text>
          <Text style={styles.progressBarValue}>{value}</Text>
        </View>
        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${percentage}%`, backgroundColor: color },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Analytics Dashboard</Text>
          <Text style={styles.subtitle}>Performance insights and metrics</Text>
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricsRow}>
            <MetricCard
              title="Total Revenue"
              value="$134,000"
              subtitle="+12% from last month"
              color="#4CAF50"
            />
            <MetricCard
              title="Active Projects"
              value="12"
              subtitle="3 new this week"
              color="#FF9800"
            />
          </View>
          <View style={styles.metricsRow}>
            <MetricCard
              title="User Satisfaction"
              value="4.7/5"
              subtitle="Based on 250 reviews"
              color="#9C27B0"
            />
            <MetricCard
              title="Response Time"
              value="2.3h"
              subtitle="Average response time"
              color="#F44336"
            />
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>User Growth</Text>
          <View style={styles.chartCard}>
            <SimpleBarChart data={analyticsData.userGrowth} />
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Top Surveyors Performance</Text>
          <View style={styles.chartCard}>
            {analyticsData.surveyorPerformance.map((surveyor, index) => (
              <View key={index} style={styles.surveyorItem}>
                <View style={styles.surveyorInfo}>
                  <Text style={styles.surveyorName}>{surveyor.name}</Text>
                  <Text style={styles.surveyorRating}>Rating: {surveyor.rating}/5</Text>
                </View>
                <View style={styles.surveyorStats}>
                  <Text style={styles.completedProjects}>{surveyor.completed} projects</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Project Status Distribution</Text>
          <View style={styles.chartCard}>
            {analyticsData.projectStats.map((stat, index) => (
              <ProgressBar
                key={index}
                label={stat.status}
                value={stat.count}
                maxValue={40}
                color={
                  stat.status === 'Completed' ? '#4CAF50' :
                  stat.status === 'In Progress' ? '#FF9800' : '#F44336'
                }
              />
            ))}
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Revenue Trend</Text>
          <View style={styles.chartCard}>
            <View style={styles.revenueList}>
              {analyticsData.revenueData.map((item, index) => (
                <View key={index} style={styles.revenueItem}>
                  <Text style={styles.revenueMonth}>{item.month}</Text>
                  <Text style={styles.revenueAmount}>${item.revenue.toLocaleString()}</Text>
                </View>
              ))}
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
  metricsContainer: {
    marginBottom: 30,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metricCard: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 12,
    width: '48%',
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  metricTitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 5,
    color: '#aaa',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  metricSubtitle: {
    fontSize: 12,
    opacity: 0.6,
    color: '#666',
  },
  chartSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#fff',
  },
  chartCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  chartContainer: {
    justifyContent: 'flex-end',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
  },
  barGroup: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    backgroundColor: '#00E5FF',
    width: 20,
    borderRadius: 2,
    marginBottom: 5,
  },
  barLabel: {
    fontSize: 12,
    color: '#aaa',
  },
  surveyorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  surveyorInfo: {
    flex: 1,
  },
  surveyorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
    color: '#fff',
  },
  surveyorRating: {
    fontSize: 14,
    color: '#FF9800',
  },
  surveyorStats: {
    alignItems: 'flex-end',
  },
  completedProjects: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00E5FF',
  },
  progressBarContainer: {
    marginBottom: 15,
  },
  progressBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressBarLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  progressBarValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  revenueList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  revenueItem: {
    width: '48%',
    padding: 15,
    backgroundColor: '#222',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  revenueMonth: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#fff',
  },
  revenueAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
