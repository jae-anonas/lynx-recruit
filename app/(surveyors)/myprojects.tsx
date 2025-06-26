import { StyleSheet, TouchableOpacity, SafeAreaView, FlatList, TextInput, Alert, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface MyProject {
  id: string;
  title: string;
  client: string;
  location: string;
  budget: string;
  startDate: string;
  deadline: string;
  status: 'In Progress' | 'Completed' | 'Pending Review' | 'On Hold';
  progress: number;
  type: 'Commercial' | 'Residential' | 'Industrial' | 'Infrastructure';
  description: string;
  lastUpdate: string;
}

export default function MyProjects() {
  const [projects, setProjects] = useState<MyProject[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<MyProject[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'in-progress' | 'completed' | 'pending' | 'on-hold'>('all');

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockProjects: MyProject[] = [
      {
        id: '1',
        title: 'Commercial Office Survey',
        client: 'Auckland Property Ltd',
        location: 'Auckland CBD, New Zealand',
        budget: 'NZ$4,500',
        startDate: '2025-06-15',
        deadline: '2025-07-15',
        status: 'In Progress',
        progress: 75,
        type: 'Commercial',
        description: 'Comprehensive quantity survey for 12-story office building including cost analysis and material estimation.',
        lastUpdate: '2025-06-26',
      },
      {
        id: '2',
        title: 'Residential Complex',
        client: 'Hamilton Homes Ltd',
        location: 'Hamilton, New Zealand',
        budget: 'NZ$2,800',
        startDate: '2025-06-20',
        deadline: '2025-07-10',
        status: 'Pending Review',
        progress: 100,
        type: 'Residential',
        description: 'Cost estimation for 3-building residential development with landscaping analysis.',
        lastUpdate: '2025-06-25',
      },
      {
        id: '3',
        title: 'Warehouse Extension',
        client: 'Wellington Logistics',
        location: 'Wellington, New Zealand',
        budget: 'NZ$6,200',
        startDate: '2025-05-20',
        deadline: '2025-06-30',
        status: 'Completed',
        progress: 100,
        type: 'Industrial',
        description: 'Quantity survey for warehouse and logistics facility expansion project.',
        lastUpdate: '2025-06-28',
      },
      {
        id: '4',
        title: 'Shopping Centre Renovation',
        client: 'Tauranga Properties',
        location: 'Tauranga, New Zealand',
        budget: 'NZ$9,800',
        startDate: '2025-07-01',
        deadline: '2025-08-15',
        status: 'In Progress',
        progress: 25,
        type: 'Commercial',
        description: 'Major shopping centre renovation including new retail spaces and infrastructure upgrades.',
        lastUpdate: '2025-06-26',
      },
      {
        id: '5',
        title: 'Bridge Assessment',
        client: 'Christchurch Council',
        location: 'Christchurch, New Zealand',
        budget: 'NZ$15,500',
        startDate: '2025-06-01',
        deadline: '2025-08-15',
        status: 'On Hold',
        progress: 40,
        type: 'Infrastructure',
        description: 'Structural and cost assessment for bridge renovation and strengthening project.',
        lastUpdate: '2025-06-20',
      },
    ];
    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter by status
    if (selectedFilter !== 'all') {
      const statusMap = {
        'in-progress': 'In Progress',
        'completed': 'Completed',
        'pending': 'Pending Review',
        'on-hold': 'On Hold',
      };
      filtered = filtered.filter(project => project.status === statusMap[selectedFilter]);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#4CAF50';
      case 'In Progress': return '#2196F3';
      case 'Pending Review': return '#FF9800';
      case 'On Hold': return '#F44336';
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

  const handleProjectAction = (projectId: string, action: 'view' | 'edit' | 'submit') => {
    const actionMessages = {
      view: 'View project details',
      edit: 'Edit project information',
      submit: 'Submit final report',
    };
    
    Alert.alert(
      'Project Action',
      actionMessages[action],
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => console.log(`${action} project ${projectId}`) },
      ]
    );
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

  const ProjectCard = ({ project }: { project: MyProject }) => (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <View style={styles.projectTitleSection}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectClient}>{project.client}</Text>
        </View>
        <View style={styles.badgeSection}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
            <Text style={styles.badgeText}>{project.status}</Text>
          </View>
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor(project.type) }]}>
            <Text style={styles.badgeText}>{project.type}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.projectDescription}>{project.description}</Text>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressValue}>{project.progress}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${project.progress}%` }]} />
        </View>
      </View>

      <View style={styles.projectDetails}>
        <View style={styles.projectDetailRow}>
          <FontAwesome name="map-marker" size={14} color="#aaa" />
          <Text style={styles.projectDetailText}>{project.location}</Text>
        </View>
        <View style={styles.projectDetailRow}>
          <FontAwesome name="dollar" size={14} color="#aaa" />
          <Text style={styles.projectDetailText}>{project.budget}</Text>
        </View>
        <View style={styles.projectDetailRow}>
          <FontAwesome name="calendar" size={14} color="#aaa" />
          <Text style={styles.projectDetailText}>Due: {project.deadline}</Text>
        </View>
        <View style={styles.projectDetailRow}>
          <FontAwesome name="clock-o" size={14} color="#aaa" />
          <Text style={styles.projectDetailText}>Updated: {project.lastUpdate}</Text>
        </View>
      </View>

      <View style={styles.projectFooter}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleProjectAction(project.id, 'view')}
        >
          <FontAwesome name="eye" size={14} color="#00E5FF" />
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>
        {project.status === 'In Progress' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleProjectAction(project.id, 'edit')}
          >
            <FontAwesome name="edit" size={14} color="#00E5FF" />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
        {project.status === 'Pending Review' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryActionButton]}
            onPress={() => handleProjectAction(project.id, 'submit')}
          >
            <FontAwesome name="check" size={14} color="#000" />
            <Text style={[styles.actionButtonText, styles.primaryActionButtonText]}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Projects</Text>
        <Text style={styles.subtitle}>Manage your surveying projects</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={16} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search projects..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <FilterButton title="All" value="all" isSelected={selectedFilter === 'all'} />
        <FilterButton title="In Progress" value="in-progress" isSelected={selectedFilter === 'in-progress'} />
        <FilterButton title="Completed" value="completed" isSelected={selectedFilter === 'completed'} />
        <FilterButton title="Pending" value="pending" isSelected={selectedFilter === 'pending'} />
        <FilterButton title="On Hold" value="on-hold" isSelected={selectedFilter === 'on-hold'} />
      </View>

      {/* Projects List */}
      <FlatList
        data={filteredProjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProjectCard project={item} />}
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
  projectCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  projectTitleSection: {
    flex: 1,
    marginRight: 10,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  projectClient: {
    fontSize: 14,
    color: '#00E5FF',
  },
  badgeSection: {
    alignItems: 'flex-end',
  },
  statusBadge: {
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
  projectDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 15,
  },
  progressSection: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressLabel: {
    fontSize: 12,
    color: '#aaa',
  },
  progressValue: {
    fontSize: 12,
    color: '#00E5FF',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#222',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00E5FF',
    borderRadius: 3,
  },
  projectDetails: {
    marginBottom: 15,
  },
  projectDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  projectDetailText: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 8,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#00E5FF',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  primaryActionButton: {
    backgroundColor: '#00E5FF',
    borderColor: '#00E5FF',
  },
  actionButtonText: {
    color: '#00E5FF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  primaryActionButtonText: {
    color: '#000',
  },
});
