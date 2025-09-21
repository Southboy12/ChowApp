import { StyleSheet, Text, View } from 'react-native'
import { FAB } from 'react-native-paper'
import React from 'react'
import { useRouter } from 'expo-router'

const New = () => {

  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text>New</Text>

      <FAB 
        icon="plus"
        size='small'
        color="#0c513f"
        style={styles.fab}
        mode='elevated'
        customSize={70}
        onPress={() => router.push("/screens/orders/SelectOrder")}
      />
    </View>
  )
}

export default New

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  fab: { 
    position: "absolute",
    bottom: 0,
    right: 30,
    backgroundColor: "#fff", 
    width: 60, 
    height: 60, 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: 50,
  },
})