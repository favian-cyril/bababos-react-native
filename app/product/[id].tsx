import { Text, View, ScrollView } from '@/components/Themed';
import { Product } from '@/constants/Types';
import { StorageContext } from '@/utils/storageContext';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Platform, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';

function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product>()
  const storage = useContext(StorageContext)

  useEffect(() => {
    async function fetchProductDetails() {
      const data = await fetch(`https://fakestoreapi.com/products/${id}`)
      const res = await data.json()
      setProduct(res)
    }
    if (id) {
      fetchProductDetails()
    }
  }, [])
  const onPressAddToCart = async () => {
    const productNormalized = {...product, rating: product?.rating.rate, ratingCount: product?.rating.count}
    await storage.set('cart', productNormalized);
    Toast.show('Succesfully added to cart', {
      duration: 500
    })
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingVertical: 25 }}>
      <Stack.Screen options={{ title: product?.title }} />
      <Image source={{ uri: product?.image }} style={styles.image} contentFit='contain' />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.price}>${product?.price}</Text>
        <Text style={styles.description}>{product?.description}</Text>
        <Text style={styles.rating}>Rating: {product?.rating.rate} / 5 ({product?.rating.count})</Text>
        <Text style={styles.category}>Category: {product?.category}</Text>
        <Button title='Add to Cart' onPress={onPressAddToCart} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    maxWidth: 700,
    alignSelf: 'center'
  },
  image: {
    width: '100%',
    height: 350,
    marginBottom: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    marginBottom: 10
  },
});

export default ProductDetails;