import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function SurveyorProfile() {
  const route = useRoute();
  let { item } = route.params as {
    item: {
      name: string;
      role: string;
      type: string;
      experience: string;
      about: string;
      rate: string;
      image: any;
    };
  };

    if (!item) {
      item = {
  name: 'Ben Richardson',
  role: 'Quantity Surveyor',
  type: 'Contractor',
  experience: '8 years',
  about: 'Experienced quantity surveyor with a strong background in cost estimation, contract administration, and project management. Proven track record in delivering accurate and efficient results across New Zealand construction projects.',
  rate: 'NZ$125',
  image: require('@/assets/images/avatar1.jpg'),
};
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/avatar1.jpg')} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.type}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Experience</Text>
        <Text style={styles.value}>{item.experience}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>About</Text>
        <Text style={styles.value}>{item.about}</Text>
      </View>
      <View style={styles.rateBox}>
        <Text style={styles.rateText}>{item.rate} / hour</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 24 },
  header: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16, backgroundColor: '#222' },
  name: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  role: { fontSize: 18, color: '#b0b0b0', marginBottom: 8 },
  badge: { backgroundColor: '#222', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 8 },
  badgeText: { color: '#fff', fontSize: 14 },
  section: { marginBottom: 16 },
  label: { color: '#b0b0b0', fontWeight: 'bold', marginBottom: 2 },
  value: { color: '#fff', fontSize: 16 },
  rateBox: { backgroundColor: '#222', borderRadius: 8, padding: 12, alignItems: 'center', marginBottom: 24 },
  rateText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  button: { backgroundColor: '#00e0e6', borderRadius: 8, padding: 16, alignItems: 'center' },
  buttonText: { color: '#111', fontSize: 18, fontWeight: 'bold' },
  errorText: { color: '#ff4d4f', fontSize: 18, textAlign: 'center', marginTop: 20 },
});