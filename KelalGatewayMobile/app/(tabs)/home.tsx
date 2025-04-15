import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Kelal Gateway</Text>
      <Text style={styles.subtitle}>Hello, {user?.email || 'User'}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
}); 