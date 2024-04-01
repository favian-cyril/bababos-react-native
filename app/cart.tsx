import CartItem from '@/components/CartItem';
import { Text, View } from '@/components/Themed';
import { Product } from '@/constants/Types';
import { StorageContext } from '@/utils/storageContext';
import { Stack, router } from 'expo-router';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

function Cart() {
  const [cart, setCart] = useState<Product[]>([])
  const storage = useContext(StorageContext);
  useEffect(() => {
    async function getCart() {
      const data = await storage.get('cart');
      setCart(data)
    }
    getCart()
  }, [])
  const totalPrice = useMemo(() => cart && cart.reduce((prev, curr) => Math.round(prev + curr.price), 0),[cart])
  const onCheckoutPress = () => {
    router.replace('/thankyou');
  }
  return (
    <View style={{height: '100%'}}>
      <FlatList
        data={cart}
        renderItem={({item}) => (
          <CartItem title={item.title} image={item.image} price={item.price} />
        )}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => <Text style={styles.emptyText}>Cart is empty</Text>}
      />
      {cart && cart.length ? <View style={styles.floatContainer}>
        <View style={styles.content}>
          <Text style={styles.totalPriceText}>Total Price: ${totalPrice}</Text>
          <TouchableOpacity onPress={onCheckoutPress} style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View> : <View />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#a6a6a6'
  },
  emptyText: {
    textAlign: 'center'
  },
  floatContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;