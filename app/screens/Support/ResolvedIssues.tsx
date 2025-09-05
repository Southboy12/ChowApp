import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import React from 'react'

const ResolvedIssues = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.Container}>
      <Card style={{backgroundColor: "#fff", padding: 15, marginBottom: 20}}>
        <View style={styles.header}>
          <Text variant='titleLarge' style={styles.resolvedText}>Resolved</Text>
          <Text variant='titleMedium' style={styles.orderText}>Order #21900908</Text>
          <Text variant='titleMedium' style={styles.orderText}>Tuesday, September 2nd 2025</Text>
        </View>
        
        <View style={styles.categories}>
          <Text variant='headlineSmall' style={{fontWeight: "700"}}>Issue Categories</Text>
          <Text variant='titleLarge'>Out of Stock</Text>
        </View>

        <View style={styles.changeTitle}>
          <Text variant='titleLarge' style={{fontWeight: "700", marginBottom: 10}}>Last Message</Text>
          <Text variant='titleMedium'>The customer has chosen the following:</Text>
          <Text variant='titleMedium'>Big Sauced Chicken</Text>
          <Text variant='titleMedium'>Choosen Replacement</Text>
          <Text variant='titleMedium'>Charcolite chicken - 1/4 x1</Text>
          <Text variant='titleMedium'>The customer has been refunded NGN1,110 for this item</Text>
        </View>
        
        <TouchableOpacity>
          <Text style={{color: "#02C27F", fontSize: 18, fontWeight: "bold"}}>View Order</Text>
        </TouchableOpacity>

        <Button 
          mode='contained' 
          buttonColor='#02C27F'
          labelStyle={{fontSize: 18, paddingVertical: 8}}
          style={{marginTop: 25, borderRadius: 10}}
        >
          View Chat
        </Button>
      </Card>
    </ScrollView>
  )
}

export default ResolvedIssues

const styles = StyleSheet.create({
    Container: {
    flex: 1,
    margin: 20,
    gap: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  resolvedText: {
    backgroundColor: "#02C27F",
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "#fff",
    borderRadius: 10
  },
  orderText: {
    color: "gray"
  },
  categories: {
    gap: 6,
    marginBottom: 20
  },
  changeTitle: {
    marginBottom: 20
  }
})