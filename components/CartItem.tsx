import React from 'react'
import { Text, View } from './Themed';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

function CartItem({
  image,
  title,
  price
}: {image: string, title: string, price: number}) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} contentFit="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  image: {
    height: 150,
    width: 150,
  },
  title: {
    width: 100
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
  }
})


export default CartItem;