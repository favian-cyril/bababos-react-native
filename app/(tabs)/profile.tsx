import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Image } from 'expo-image';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/icon.png')} style={styles.image} />
      <Text>Company Name: Foo Bar</Text>
      <Text>Address: Jl. Foo bar baz</Text>
      <Text>Phone Number: 021123123123</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center'
  },
});
