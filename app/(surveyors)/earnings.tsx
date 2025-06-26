import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface EarningsData {
  totalEarnings: string;
  thisMonth: string;
  lastMonth: string;
  pendingPayments: string;
  totalProjects: number;
  averagePerProject: string;
}

interface Transaction {
  id: string;
  projectTitle: string;
  client: string;
  amount: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Processing';
  type: 'Payment' | 'Bonus' | 'Refund';
}

interface MonthlyData {
  month: string;
  earnings: number;
  projects: number;
}

export default function Earnings() {
  const [earningsData, setEarningsData] = useState<EarningsData>({
    totalEarnings: 'NZ$67,500',
    thisMonth: 'NZ$12,800',
    lastMonth: 'NZ$15,200',
    pendingPayments: 'NZ$4,500',
    totalProjects: 24,
    averagePerProject: 'NZ$2,813',
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      projectTitle: 'Office Complex Survey',
      client: 'Auckland Property Ltd',
      amount: 'NZ$4,500',
      date: '2025-06-25',
      status: 'Paid',
      type: 'Payment',
    },
    {
      id: '2',
      projectTitle: 'Residential Complex',
      client: 'Hamilton Homes Ltd',
      amount: 'NZ$2,800',
      date: '2025-06-24',
      status: 'Processing',
      type: 'Payment',
    },
    {
      id: '3',
      projectTitle: 'Quality Bonus',
      client: 'QS Mate Platform',
      amount: 'NZ$500',
      date: '2025-06-23',
      status: 'Paid',
      type: 'Bonus',
    },
    {
      id: '4',
      projectTitle: 'Warehouse Extension',
      client: 'Wellington Logistics',
      amount: 'NZ$6,200',
      date: '2025-06-20',
      status: 'Paid',
      type: 'Payment',
    },
    {
      id: '5',
      projectTitle: 'Shopping Centre Survey',
      client: 'Tauranga Properties',
      amount: 'NZ$3,200',
      date: '2025-06-18',
      status: 'Pending',
      type: 'Payment',
    },
  ]);

  const [monthlyData] = useState<MonthlyData[]>([
    { month: 'Jan', earnings: 8500, projects: 3 },
    { month: 'Feb', earnings: 12300, projects: 4 },
    { month: 'Mar', earnings: 15600, projects: 5 },
    { month: 'Apr', earnings: 11200, projects: 4 },
    { month: 'May', earnings: 14800, projects: 5 },
    { month: 'Jun', earnings: 12800, projects: 4 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return '#4CAF50';
      case 'Processing': return '#FF9800';
      case 'Pending': return '#F44336';
      default: return '#666';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Payment': return 'dollar';
      case 'Bonus': return 'gift';
      case 'Refund': return 'undo';
      default: return 'dollar';
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color = '#00E5FF' }: {
    title: string;
    value: string;
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

  const TransactionCard = ({ transaction }: { transaction: Transaction }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionIcon}>
          <FontAwesome name={getTypeIcon(transaction.type) as any} size={16} color="#00E5FF" />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionTitle}>{transaction.projectTitle}</Text>
          <Text style={styles.transactionClient}>{transaction.client}</Text>
          <Text style={styles.transactionDate}>{transaction.date}</Text>
        </View>
        <View style={styles.transactionAmountSection}>
          <Text style={styles.transactionAmount}>{transaction.amount}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) }]}>
            <Text style={styles.statusText}>{transaction.status}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const MonthlyChart = () => {
    const maxEarnings = Math.max(...monthlyData.map(item => item.earnings));
    
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly Earnings Trend</Text>
        <View style={styles.chart}>
          {monthlyData.map((item, index) => {
            const height = (item.earnings / maxEarnings) * 150;
            return (
              <View key={index} style={styles.chartBar}>
                <View style={styles.barContainer}>
                  <View style={[styles.bar, { height }]} />
                </View>
                <Text style={styles.barLabel}>{item.month}</Text>
                <Text style={styles.barValue}>NZ${(item.earnings / 1000).toFixed(1)}k</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Earnings</Text>
          <Text style={styles.subtitle}>Track your surveying income</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Earnings"
            value={earningsData.totalEarnings}
            icon="dollar"
            color="#4CAF50"
          />
          <StatCard
            title="This Month"
            value={earningsData.thisMonth}
            icon="calendar"
            color="#00E5FF"
          />
          <StatCard
            title="Last Month"
            value={earningsData.lastMonth}
            icon="history"
            color="#2196F3"
          />
          <StatCard
            title="Pending"
            value={earningsData.pendingPayments}
            subtitle="Awaiting payment"
            icon="clock-o"
            color="#FF9800"
          />
        </View>

        {/* Summary Cards */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Projects Completed</Text>
            <Text style={styles.summaryValue}>{earningsData.totalProjects}</Text>
            <Text style={styles.summarySubtext}>Total projects</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Average per Project</Text>
            <Text style={styles.summaryValue}>{earningsData.averagePerProject}</Text>
            <Text style={styles.summarySubtext}>Avg. earnings</Text>
          </View>
        </View>

        {/* Monthly Chart */}
        <MonthlyChart />

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {transactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="file-text" size={20} color="#00E5FF" />
              <Text style={styles.actionText}>Generate Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="bank" size={20} color="#00E5FF" />
              <Text style={styles.actionText}>Withdraw Funds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome name="question-circle" size={20} color="#00E5FF" />
              <Text style={styles.actionText}>Payment Help</Text>
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
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
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
    fontSize: 16,
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
  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  summaryCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  summaryTitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00E5FF',
    marginBottom: 5,
  },
  summarySubtext: {
    fontSize: 12,
    color: '#666',
  },
  chartContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#222',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 150,
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  bar: {
    backgroundColor: '#00E5FF',
    width: 20,
    borderRadius: 2,
  },
  barLabel: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 2,
  },
  barValue: {
    fontSize: 10,
    color: '#666',
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
  transactionCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#222',
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#222',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  transactionClient: {
    fontSize: 12,
    color: '#00E5FF',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmountSection: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
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
