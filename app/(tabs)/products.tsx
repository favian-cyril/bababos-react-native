import { FlatList, Platform, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import ProductListItem from '@/components/ProductListItem';
import { Product } from '@/constants/Types';

export default function TabOneScreen() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const data = await fetch('https://fakestoreapi.com/products/');
      const res = await data.json();
      setProducts(res);
    }
    if (!products.length) {
      fetchProducts()
    }
  }, [])
  
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductListItem title={item.title} image={item.image} price={item.price} id={item.id} />}
        horizontal={false}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.wrapper}
        numColumns={Platform.OS === 'web' ? 4 : 2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  wrapper: {
    gap: 30,
  },
});
