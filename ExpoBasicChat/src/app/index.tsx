import { StyleSheet, Text, View } from 'react-native';
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';

const API_KEY = '';
const SESSION_ID = '';
const TOKEN = '';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Basic Chat</Text>
      <Text style={styles.text}>Add API_KEY, SESSION_ID, and TOKEN to test video chat.</Text>

      <OTSession apiKey={API_KEY} sessionId={SESSION_ID} token={TOKEN}>
        <OTPublisher style={styles.publisher} />
        <OTSubscriber style={styles.subscriber} />
      </OTSession>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  text: {
    fontSize: 14,
    color: '#e5e7eb',
    textAlign: 'center',
  },
  publisher: {
    width: 320,
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  subscriber: {
    width: 320,
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
