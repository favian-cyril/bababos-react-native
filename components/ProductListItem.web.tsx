import React, { useContext } from 'react'
import { Text, View } from './Themed';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { FontAwesome } from '@expo/vector-icons';
import { StorageContext } from '@/utils/storageContext';
import toast, { Toaster } from 'react-hot-toast';

function ProductListItem({
  title,
  image,
  price,
  id,
}: { title: string, image: string, price: number, id: number }) {
  const storage = useContext(StorageContext)
  const onPressAddToCart = async () => {
    const product = { title, image, price, id }
    await storage.set('cart', product);
    toast.success('Succesfully added to cart')
  };
  return (
    <Link href={`/product/${id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{uri: image}} style={styles.image} contentFit='contain' />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.cartContainer}>
            <Pressable onPress={onPressAddToCart} style={styles.cartButton}>
              <FontAwesome
                name="cart-plus"
                size={20}
              />
            </Pressable>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{`$${price}`}</Text>
          </View>
        </View>
        <Toaster />
      </Pressable>
    </Link>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  infoContainer: {
    flex: 2,
    paddingBottom: 35,
  },
  image: {
    width: Platform.OS === 'android' ? 150 : 300,
    height: Platform.OS === 'android' ? 150 : 300,
  },
  title: {
    fontSize: 15,
    width: 150
  },
  priceContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 10,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  cartButton: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#a6a6a6',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 5
  }
});
export default ProductListItem;
