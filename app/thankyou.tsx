import { Text, View } from '@/components/Themed';
import { Image } from 'expo-image';
import { Stack, router } from 'expo-router';
import React from 'react'
import { Button, StyleSheet } from 'react-native';

function ThankYou() {
  const handleClose = () => {
    router.dismissAll()
  }
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/icon.png')} style={styles.image} />
      <Text style={styles.text}>Thank you for your purchase</Text>
      <Button title='Close' onPress={handleClose} />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center'
  },
  container: {
    justifyContent: 'center',
    paddingVertical: 'auto',
    paddingHorizontal: 50,
    height: '100%',
    gap: 15,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center'
  },
  text: {
    textAlign: 'center'
  }
})
export default ThankYou;