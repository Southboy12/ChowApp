import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react'

const NoIssue = () => {
  return (
    <View style={styles.contentContainer}>
        <View style={styles.icon}>
            <MaterialCommunityIcons name="food-fork-drink" size={40} color="gray" />
        </View>
        <View style={styles.textContainer}>
            <Text variant='headlineLarge' style={styles.contentTitle}>No order issues</Text>
            <Text style={styles.contentSubtitle}>Your order issues will appear here</Text>
        </View>
    </View>
  )
}

export default NoIssue

const styles = StyleSheet.create({
    contentContainer: {
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