import { StyleSheet, TouchableOpacity, SafeAreaView, FlatList, TextInput, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Completed' | 'On Hold' | 'Planning';
  startDate: string;
  endDate?: string;
  budget: string;
  location: string;
  assignedSurveyor?: string;
  progress: number;
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed' | 'planning'>('all');

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Office Complex Survey',
        description: 'Quantity survey for 15-story office building in Makati CBD',
        status: 'Completed',
        startDate: '2025-05-01',
        endDate: '2025-06-15',
        budget: '₱850,000',
        location: 'Makati, Philippines',
        assignedSurveyor: 'John Doe',
        progress: 100,
      },
      {
        id: '2',
        title: 'Residential Complex',
        description: 'Cost estimation for 3-building residential project',
        status: 'Active',
        startDate: '2025-06-10',
        budget: '₱1,200,000',
        location: 'Quezon City, Philippines',
        assignedSurveyor: 'Sarah Wilson',
        progress: 65,
      },
      {
        id: '3',
        title: 'Shopping Mall Extension',
        description: 'Survey for mall expansion and renovation project',
        status: 'Planning',
        startDate: '2025-07-01',
        budget: '₱2,500,000',
        location: 'Pasig, Philippines',
        progress: 0,
      },
      {
        id: '4',
        title: 'Industrial Warehouse',
        description: 'Quantity survey for warehouse and logistics facility',
        status: 'Active',
        startDate: '2025-05-20',
        budget: '₱950,000',
        location: 'Taguig, Philippines',
        assignedSurveyor: 'Mike Johnson',
        progress: 40,
      },
      {
        id: '5',
        title: 'Condominium Tower',
        description: 'High-rise residential building cost analysis',
        status: 'On Hold',
        startDate: '2025-04-15',
        budget: '₱1,800,000',
        location: 'Mandaluyong, Philippines',
        progress: 25,
      },
    ];
    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter by status
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(project => 
        project.status.toLowerCase() === selectedFilter.replace('planning', 'planning')
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return '#4CAF50';
      case 'Completed':
        return '#2196F3';
      case 'On Hold':
        return '#FF9800';
      case 'Planning':
        return '#9C27B0';
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

  const ProjectItem = ({ item }: { item: Project }) => (
    <TouchableOpacity style={styles.projectCard}>
      <View style={styles.cardHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{item.title}</Text>
          <Text style={styles.projectDescription}>{item.description}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <FontAwesome name="calendar" size={14} color="#aaa" />
          <Text style={styles.detailText}>Started: {item.startDate}</Text>
        </View>
        {item.endDate && (
          <View style={styles.detailRow}>
            <FontAwesome name="calendar-check-o" size={14} color="#aaa" />
            <Text style={styles.detailText}>Completed: {item.endDate}</Text>
          </View>
        )}
        <View style={styles.detailRow}>
          <FontAwesome name="map-marker" size={14} color="#aaa" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="money" size={14} color="#aaa" />
          <Text style={styles.detailText}>Budget: {item.budget}</Text>
        </View>
        {item.assignedSurveyor && (
          <View style={styles.detailRow}>
            <FontAwesome name="user" size={14} color="#aaa" />
            <Text style={styles.detailText}>Surveyor: {item.assignedSurveyor}</Text>
          </View>
        )}
      </View>

      {item.status !== 'Completed' && (
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressValue}>{item.progress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${item.progress}%`,
                  backgroundColor: getStatusColor(item.status)
                }
              ]} 
            />
          </View>
        </View>
      )}

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="eye" size={16} color="#00E5FF" />
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        {item.status === 'Active' && (
          <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
            <FontAwesome name="edit" size={16} color="#000" />
            <Text style={[styles.actionButtonText, { color: '#000' }]}>Update</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Projects</Text>
        <Text style={styles.headerSubtitle}>Track and manage your surveying projects</Text>
        
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filtersContainer}>
          <FilterButton filter="all" title="All" />
          <FilterButton filter="active" title="Active" />
          <FilterButton filter="completed" title="Completed" />
          <FilterButton filter="planning" title="Planning" />
        </View>
      </View>

      <FlatList
        data={filteredProjects}
        renderItem={({ item }) => <ProjectItem item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.projectsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.addButton}>
        <FontAwesome name="plus" size={24} color="#000" />
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
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  searchIcon: {
    marginRight: 10,
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
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#222',
  },
  filterButtonActive: {
    backgroundColor: '#00E5FF',
    borderColor: '#00E5FF',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#aaa',
  },
  filterButtonTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  projectsList: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  projectCard: {
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  projectInfo: {
    flex: 1,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardBody: {
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  detailText: {
    fontSize: 14,
    color: '#aaa',
    marginLeft: 8,
  },
  progressContainer: {
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  progressLabel: {
    fontSize: 14,
    color: '#fff',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#222',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#222',
    backgroundColor: 'transparent',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00E5FF',
  },
  primaryAction: {
    backgroundColor: '#00E5FF',
    borderColor: '#00E5FF',
  },
  actionButtonText: {
    color: '#00E5FF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
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
