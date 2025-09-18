import { StyleSheet, View } from 'react-native'
import React from 'react'
import { List, Text, Button } from 'react-native-paper'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';


const AcceptedByMe = () => {
  return (
    <List.Section style={styles.container}>
      <List.Accordion
        title={<View></View>}
        left={() => (
          <View>
            <Text variant='titleMedium' style={{ fontWeight: "bold" }}>Instant Order (1)</Text>
          </View>
        )}
        right={(props) => (
          <List.Icon {...props} icon={props.isExpanded ? "chevron-up" : "chevron-down"} />
        )}
        style={styles.accordion}
      >
        <List.Item
          title={
            <View style={styles.container}>
                <View style={styles.mealInfo}>
                  <Text variant='titleMedium' style={{ paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#f1f1f1", borderRadius: 8}}>Ongoing</Text>
                  <Text variant='titleMedium' style={{ color:"gray"}}>Order #224567</Text>
                  <Text variant='titleMedium' style={{ color: "gray"}}>2 minutes ago</Text>
                </View>
                <View style={styles.packContainer}>
                  <View style={styles.packPrice}>
                    <Text variant='titleMedium' style={{ color: "gray"}}>Pack 1</Text>
                    <Text variant='titleMedium' style={{ fontWeight: "bold"}}>#2500</Text>
                  </View>
                  
                  <View style={styles.meal}>
                    <Text variant='titleMedium' style={{ fontWeight: "bold"}}>Meat pie x3</Text>
                  </View>
                </View>

                <View style={styles.riderContainer}>
                  <View style={styles.riderProfile}>
                    <EvilIcons name="user" size={30} color="gray" />
                    <Text variant='titleMedium'>Essien is on his way</Text>
                  </View>
                  <View style={styles.riderProfile}>
                    <Ionicons name="call-outline" size={20} color="red" />
                    <Text variant='titleMedium' style={{ color: "red"}}>Call rider</Text>
                  </View>

                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    mode='contained'
                    buttonColor='#fff0f5'
                    textColor='#d32f2f'
                    style={styles.button}
                    labelStyle={{ fontSize: 18 }}
                  >
                    Reject Order
                  </Button>
                  <Button
                    mode='contained'
                    buttonColor='#02C27F'
                    textColor='#fff'
                    style={styles.button}
                    labelStyle={{ fontSize: 18 }}
                  >
                    Mark as Ready
                  </Button>
                </View>
              
            </View>
          }
          style={styles.orderBody}
          left={() => null}
          right={() => null}
        
        >

        </List.Item>
      </List.Accordion>
    </List.Section>
  )
}

export default AcceptedByMe

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30
  },
  accordion: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 20,
  },
  orderBody: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    borderRadius: 8,
    paddingHorizontal: 0
  },
  mealInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10
  },
  packContainer: {
    marginBottom: 30
  },
  packPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginRight: 0,
    marginBottom: 10
  }, 
  buttonContainer: {
    flexDirection: "row",
    gap: 30
  },
  button: {
    borderRadius: 10, 
    paddingHorizontal:30, 
    paddingVertical: 20
  },
  riderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30
  },
  riderProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  }
})