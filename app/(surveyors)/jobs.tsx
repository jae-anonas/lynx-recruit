import { StyleSheet, TouchableOpacity, SafeAreaView, FlatList, TextInput, Alert, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Job {
  id: string;
  title: string;
  description: string;
  client: string;
  location: string;
  budget: string;
  deadline: string;
  type: 'Commercial' | 'Residential' | 'Industrial' | 'Infrastructure';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  postedDate: string;
  applicants: number;
}

export default function AvailableJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'commercial' | 'residential' | 'industrial' | 'infrastructure'>('all');

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Office Tower Quantity Survey',
        description: 'Comprehensive quantity survey for a 20-story office building in Auckland CBD. Requires detailed cost analysis and material estimation.',
        client: 'Auckland Development Corp',
        location: 'Auckland CBD, New Zealand',
        budget: 'NZ$8,500',
        deadline: '2025-07-20',
        type: 'Commercial',
        priority: 'High',
        postedDate: '2025-06-25',
        applicants: 5,
      },
      {
        id: '2',
        title: 'Residential Complex Cost Analysis',
        description: 'Cost estimation for 50-unit residential development including landscaping and infrastructure.',
        client: 'Wellington Homes Ltd',
        location: 'Wellington, New Zealand',
        budget: 'NZ$6,200',
        deadline: '2025-07-15',
        type: 'Residential',
        priority: 'Medium',
        postedDate: '2025-06-24',
        applicants: 8,
      },
      {
        id: '3',
        title: 'Manufacturing Facility Survey',
        description: 'Industrial quantity survey for food processing plant expansion project.',
        client: 'Hamilton Industries',
        location: 'Hamilton, New Zealand',
        budget: 'NZ$12,000',
        deadline: '2025-08-01',
        type: 'Industrial',
        priority: 'Urgent',
        postedDate: '2025-06-23',
        applicants: 3,
      },
      {
        id: '4',
        title: 'Bridge Infrastructure Assessment',
        description: 'Structural and cost assessment for bridge renovation and strengthening project.',
        client: 'Christchurch Council',
        location: 'Christchurch, New Zealand',
        budget: 'NZ$15,500',
        deadline: '2025-08-15',
        type: 'Infrastructure',
        priority: 'High',
        postedDate: '2025-06-22',
        applicants: 2,
      },
      {
        id: '5',
        title: 'Shopping Centre Renovation',
        description: 'Quantity survey for major shopping centre renovation including new retail spaces.',
        client: 'Tauranga Properties',
        location: 'Tauranga, New Zealand',
        budget: 'NZ$9,800',
        deadline: '2025-07-30',
        type: 'Commercial',
        priority: 'Medium',
        postedDate: '2025-06-21',
        applicants: 6,
      },
    ];
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);

  useEffect(() => {
    let filtered = jobs;

    // Filter by type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(job => job.type.toLowerCase() === selectedFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, selectedFilter]);

  const handleApplyToJob = (jobId: string, jobTitle: string) => {
    Alert.alert(
      'Apply to Job',
      `Are you sure you want to apply for "${jobTitle}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Apply', 
          onPress: () => {
            Alert.alert('Success', 'Your application has been submitted!');
          }
        },
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return '#F44336';
      case 'High': return '#FF9800';
      case 'Medium': return '#2196F3';
      case 'Low': return '#4CAF50';
      default: return '#666';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Commercial': return '#2196F3';
      case 'Residential': return '#4CAF50';
      case 'Industrial': return '#FF9800';
      case 'Infrastructure': return '#9C27B0';
      default: return '#666';
    }
  };

  const FilterButton = ({ title, value, isSelected }: { title: string; value: string; isSelected: boolean }) => (
    <TouchableOpacity
      style={[styles.filterButton, isSelected && styles.filterButtonActive]}
      onPress={() => setSelectedFilter(value as any)}
    >
      <Text style={[styles.filterButtonText, isSelected && styles.filterButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const JobCard = ({ job }: { job: Job }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleSection}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.jobClient}>{job.client}</Text>
        </View>
        <View style={styles.badgeSection}>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(job.priority) }]}>
            <Text style={styles.badgeText}>{job.priority}</Text>
          </View>
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor(job.type) }]}>
            <Text style={styles.badgeText}>{job.type}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.jobDescription}>{job.description}</Text>

      <View style={styles.jobDetails}>
        <View style={styles.jobDetailRow}>
          <FontAwesome name="map-marker" size={14} color="#aaa" />
          <Text style={styles.jobDetailText}>{job.location}</Text>
        </View>
        <View style={styles.jobDetailRow}>
          <FontAwesome name="dollar" size={14} color="#aaa" />
          <Text style={styles.jobDetailText}>{job.budget}</Text>
        </View>
        <View style={styles.jobDetailRow}>
          <FontAwesome name="calendar" size={14} color="#aaa" />
          <Text style={styles.jobDetailText}>Due: {job.deadline}</Text>
        </View>
        <View style={styles.jobDetailRow}>
          <FontAwesome name="users" size={14} color="#aaa" />
          <Text style={styles.jobDetailText}>{job.applicants} applicants</Text>
        </View>
      </View>

      <View style={styles.jobFooter}>
        <Text style={styles.postedDate}>Posted: {job.postedDate}</Text>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => handleApplyToJob(job.id, job.title)}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Jobs</Text>
        <Text style={styles.subtitle}>Find your next surveying project</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <FilterButton title="All" value="all" isSelected={selectedFilter === 'all'} />
        <FilterButton title="Commercial" value="commercial" isSelected={selectedFilter === 'commercial'} />
        <FilterButton title="Residential" value="residential" isSelected={selectedFilter === 'residential'} />
        <FilterButton title="Industrial" value="industrial" isSelected={selectedFilter === 'industrial'} />
        <FilterButton title="Infrastructure" value="infrastructure" isSelected={selectedFilter === 'infrastructure'} />
      </View>

      {/* Jobs List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobCard job={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    paddingBottom: 10,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: '#111',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#222',
  },
  filterButtonActive: {
    backgroundColor: '#00E5FF',
    borderColor: '#00E5FF',
  },
  filterButtonText: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  jobCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  jobTitleSection: {
    flex: 1,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  jobClient: {
    fontSize: 14,
    color: '#00E5FF',
  },
  badgeSection: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 5,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  jobDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 15,
  },
  jobDetails: {
    marginBottom: 15,
  },
  jobDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  jobDetailText: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 8,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  postedDate: {
    fontSize: 12,
    color: '#666',
  },
  applyButton: {
    backgroundColor: '#00E5FF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  applyButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
