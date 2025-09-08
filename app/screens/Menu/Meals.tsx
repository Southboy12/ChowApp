import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Checkbox, FAB, List, Text } from 'react-native-paper';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';



const MealsScreen = () => {

  const router = useRouter()

  return (
  
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.selectAll}>
          <Text variant='titleSmall'>Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filter}>
          <Ionicons name="filter-sharp" size={16} color="black" />
          <Text variant='titleSmall'>All</Text>
        </TouchableOpacity>
      </View>

      <List.Section>
        <List.Accordion
          title={
            <View style={styles.accordion}>
              <Text variant='titleMedium' style={{fontWeight: "bold"}}>Main Meals</Text> 
              <Text variant='titleMedium' style={{fontWeight: "bold", color: "green"}}>Edit</Text>
            </View>
          }
          right={(props) => (
            <View style={styles.accordion}>
              <TouchableOpacity style={{flexDirection: "row", gap: 2}}>
                <Text variant='titleMedium' style={{fontWeight: "bold"}}>View All</Text>
                <Text variant='titleMedium' style={{fontWeight: "bold", color: "green"}}>(20)</Text>
              </TouchableOpacity>
              <List.Icon {...props} icon={props.isExpanded ? "chevron-up" : "chevron-down"} />
            </View>
          )}
          style={{backgroundColor: "#f1f1f1", borderTopWidth: 1, borderColor: "rgba(0,0,0,0.1)"}}
        >
         <List.Item 
          title={
            <View style={styles.textContainer}>
              <Text variant='titleMedium' style={{fontWeight: "bold"}}>Bunma Fried Rice + Breaded Chicken + Coleslaw</Text>
              <View style={styles.price}>
                <Text variant='titleSmall'>₦3,800</Text>
                <Text variant='titleSmall' style={styles.outOfStock}>Out of Stock</Text>
              </View>
            </View>
          }
          style={styles.item}
          left={() => (
            <View style={styles.image}>
              <Text>h</Text>
            </View>
          )}
          right={() => (
            <View style={styles.rightSide}>
              <View style={styles.edit}>
                <MaterialCommunityIcons name="square-edit-outline" size={14} color="green" />
              </View>
              <View>
                <Checkbox status='unchecked'/>
              </View>
            </View>
          )}
          />
        </List.Accordion>
      </List.Section>

    

      <FAB 
        icon="plus"
        size='small'
        color="#0c513f"
        style={styles.fab}
        mode='elevated'
        customSize={70}
        onPress={() => router.push("/screens/Menu/AddMeal")}
      />
     
    </View>
  )
}

export default MealsScreen

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    padding: 30

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30
  },
  filter: {
    flexDirection: "row"
  },
  selectAll: {
    borderWidth: 1,
    borderStyle: "dashed",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16
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
  accordion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
    borderWidth: 1,
    borderRadius: 10
  },
  rightSide: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  price: {
    flexDirection: "row",
    gap: 14
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 75
  },
  item: {
    backgroundColor: "#fff", 
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 20
  },
  edit: {
    padding: 6,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 50
  },
  outOfStock: {
    paddingHorizontal: 4,
    borderRadius: 4,
    color: "gray"
  }
})