import { View } from '@/components/Themed';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react'
import { Button, StyleSheet, TextInput } from 'react-native';

function Login() {
  const login = () => {
    router.replace('/products')
  }
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/icon.png')} style={styles.image} />
      <TextInput style={styles.textInput} placeholder='Username' />
      <TextInput style={styles.textInput} placeholder='Password' />
      <Button title='Login' onPress={login} />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    alignSelf: 'center'
  },
  container: {
    justifyContent: 'center',
    paddingVertical: 'auto',
    paddingHorizontal: 30,
    height: '100%',
    gap: 15,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center'
  },
  textInput: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5
  }
})

export default Login;