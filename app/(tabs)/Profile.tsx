import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Text, useTheme, Button } from 'react-native-paper'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



const Shifts = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant='headlineLarge' style={{fontWeight: "bold"}}>Profile</Text>
        <View style={styles.share}>
          <Text variant='titleLarge'>Share</Text>
          <FontAwesome name="share-square-o" size={18} color="black" />
        </View>
      </View>
      
      <View style={styles.subhead}>
        <FontAwesome5 name="user-circle" size={44} color="black" />
        <View>
          <Text>Welcome back</Text>
          <Text>Oluchi Adibue</Text>
        </View>
        <View>
          <Text>Vendor Agent</Text>
        </View>
      </View>
      
        
    </SafeAreaView>
  )
}

export default Shifts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 30
  },
  share: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  subhead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
})