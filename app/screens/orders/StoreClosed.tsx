import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Snackbar, Text } from 'react-native-paper';
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const StoreClosed = () => {

  return (
   
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="food-fork-drink" size={40} color="gray" />
      </View>
      <View style={styles.textContainer}>
        <Text variant='headlineLarge' style={styles.contentTitle}>Store is closed</Text>
        <Text style={styles.contentSubtitle}>Open the store to receive orders</Text>
      </View>
    </View>
  )
}

export default StoreClosed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    padding: 50,
    backgroundColor: "#fff",
    borderRadius: 70,
    marginBlock: 16
  },
  textContainer: {
    
  },
  contentTitle: {
    textAlign: "center",
    fontWeight: "bold"
  },
  contentSubtitle: {
    textAlign: "center",
    color: "gray"
  },
 
})