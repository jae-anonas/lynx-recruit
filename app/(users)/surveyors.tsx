import { StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList, TextInput, View, Text } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Surveyor {
  id: string;
  avatar: any;
  name: string;
  title: string;
  years: string;
  type: string;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: string;
  availability: 'Available' | 'Busy' | 'Offline';
}

export default function SurveyorsList() {
  const [surveyors, setSurveyors] = useState<Surveyor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSurveyors, setFilteredSurveyors] = useState<Surveyor[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockSurveyors: Surveyor[] = [
      {
        id: '1',
        avatar: require('@/assets/images/avatar1.jpg'),
        name: 'Michael Thompson',
        title: 'Senior Quantity Surveyor',
        years: '8 years experience',
        type: 'Commercial',
        location: 'Auckland, New Zealand',
        rating: 4.9,
        reviewCount: 25,
        hourlyRate: 'NZ$125/hr',
        availability: 'Available',
      },
      {
        id: '2',
        avatar: require('@/assets/images/avatar1.jpg'),
        name: 'Emma Johnson',
        title: 'Construction Cost Analyst',
        years: '6 years experience',
        type: 'Residential',
        location: 'Wellington, New Zealand',
        rating: 4.8,
        reviewCount: 18,
        hourlyRate: 'NZ$110/hr',
        availability: 'Available',
      },
      {
        id: '3',
        avatar: require('@/assets/images/avatar1.jpg'),
        name: 'David Mitchell',
        title: 'Building Surveyor',
        years: '10 years experience',
        type: 'Industrial',
        location: 'Christchurch, New Zealand',
        rating: 4.7,
        reviewCount: 32,
        hourlyRate: 'NZ$140/hr',
        availability: 'Busy',
      },
      {
        id: '4',
        avatar: require('@/assets/images/avatar1.jpg'),
        name: 'Sophie Taylor',
        title: 'Cost Estimator',
        years: '5 years experience',
        type: 'Commercial',
        location: 'Hamilton, New Zealand',
        rating: 4.6,
        reviewCount: 14,
        hourlyRate: 'NZ$100/hr',
        availability: 'Available',
      },
      {
        id: '5',
        avatar: require('@/assets/images/avatar1.jpg'),
        name: 'James Patterson',
        title: 'Project Quantity Surveyor',
        years: '12 years experience',
        type: 'Infrastructure',
        location: 'Tauranga, New Zealand',
        rating: 4.9,
        reviewCount: 41,
        hourlyRate: 'NZ$160/hr',
        availability: 'Available',
      },
    ];
    setSurveyors(mockSurveyors);
    setFilteredSurveyors(mockSurveyors);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = surveyors.filter(surveyor =>
        surveyor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surveyor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surveyor.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surveyor.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSurveyors(filtered);
    } else {
      setFilteredSurveyors(surveyors);
    }
  }, [searchQuery, surveyors]);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return '#4CAF50';
      case 'Busy':
        return '#FF9800';
      case 'Offline':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const SurveyorItem = ({ item }: { item: Surveyor }) => (
    <TouchableOpacity 
      style={styles.surveyorCard}
      onPress={() => router.push({ 
        pathname: '/SurveyorProfile', 
        params: {
          id: item.id,
          name: item.name,
          title: item.title,
          years: item.years,
          type: item.type,
          location: item.location,
          rating: item.rating.toString(),
          reviewCount: item.reviewCount.toString(),
          hourlyRate: item.hourlyRate,
          availability: item.availability,
        }
      })}
    >
      <View style={styles.cardHeader}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.surveyorInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.experience}>{item.years}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={[styles.availabilityDot, { backgroundColor: getAvailabilityColor(item.availability) }]} />
          <Text style={[styles.availabilityText, { color: getAvailabilityColor(item.availability) }]}>
            {item.availability}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <FontAwesome name="briefcase" size={14} color="#aaa" />
          <Text style={styles.detailText}>{item.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="map-marker" size={14} color="#aaa" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome name="star" size={14} color="#FF9800" />
          <Text style={styles.ratingText}>{item.rating} ({item.reviewCount} reviews)</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.hourlyRate}>{item.hourlyRate}</Text>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Quantity Surveyors</Text>
        <Text style={styles.headerSubtitle}>Browse and connect with qualified professionals</Text>
        
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, specialization, or location..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredSurveyors}
        renderItem={({ item }) => <SurveyorItem item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.surveyorsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
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
  surveyorsList: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  surveyorCard: {
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  surveyorInfo: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
  },
  title: {
    fontSize: 14,
    color: '#00E5FF',
    marginBottom: 3,
  },
  experience: {
    fontSize: 12,
    color: '#aaa',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
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
  ratingText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#222',
    backgroundColor: 'transparent',
  },
  hourlyRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  contactButton: {
    backgroundColor: '#00E5FF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  contactButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
