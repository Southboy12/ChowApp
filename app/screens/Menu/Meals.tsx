import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Checkbox, FAB, List, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useMeals } from '@/lib/meal-context';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from 'react-native-paper';



const MealsScreen = () => {

  const [inStock, setInStock] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [checkedMeals, setCheckedMeals] = useState<string[]>([])


  const {updateMeal, fetchMeals, meals} = useMeals()

  const router = useRouter()
  const { user } = useAuth()
  const theme = useTheme()

  const uniqueMeals = [...new Set(meals.map(meal => meal.category))]

  const handleCheckbox = (id: string) => {
    setCheckedMeals((prev) => prev.includes(id) ? prev.filter((mealId) => mealId !==id) : [...prev, id])
    setChecked(!checked)
  }

  const handleMarkInStock = (inStock: boolean) => {
    
    

    setCheckedMeals([])
  }
  

  useEffect(() => {
    fetchMeals()
  }, [user])

  return (
  
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.instockGroup}>
          <TouchableOpacity style={[styles.selectAll, styles.allStock]}>
            <Text variant='titleSmall'>Select All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.selectAll, styles.inStock, checkedMeals.length === 0 &&  styles.hide]} onPress={() => {handleMarkInStock(true)}}>
            <Text variant='titleSmall' style={{color: "#fff"}}>Mark in stock</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.selectAll, styles.outStock, styles.hide]}>
            <Text variant='titleSmall' style={{color: "#fff"}}>Mark out of stock</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filter}>
          <Ionicons name="filter-sharp" size={16} color="black" />
          <Text variant='titleSmall'>All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
      <List.Section>
        {uniqueMeals.map((meal, key) => (

        <List.Accordion
          key={key}
          title={
            <View style={styles.accordion}>
              <Text variant='titleMedium' style={{fontWeight: "bold"}}>{meal}</Text> 
              <Text variant='titleMedium' style={{fontWeight: "bold", color: "green"}}>Edit</Text>
            </View>
          }
          right={(props) => (
            <View style={styles.accordion}>
              <TouchableOpacity style={{flexDirection: "row", gap: 2}}>
                <Text variant='titleMedium' style={{fontWeight: "bold"}}>View All</Text>
                <Text variant='titleMedium' style={{fontWeight: "bold", color: "green"}}>({meals.filter((q) => q.category === meal).length})</Text>
              </TouchableOpacity>
              <List.Icon {...props} icon={props.isExpanded ? "chevron-up" : "chevron-down"} />
            </View>
          )}
          style={{backgroundColor: "#f1f1f1", borderTopWidth: 1, borderColor: "rgba(0,0,0,0.1)"}}
        > 

        {meals.filter((m) => m.category === meal).map((k, i) => (
          <List.Item 
          key={i}
          title={
            <View style={styles.textContainer}>
              <Text variant='titleMedium' style={{fontWeight: "bold"}}>{k.meal_name}</Text>
              <View style={styles.price}>
                <Text variant='titleSmall'>₦{k.price}</Text>
                <Text variant='titleSmall' style={styles.outOfStock}>{k.in_stock ? "in stock" : "out of stock"}</Text>
              </View>
            </View>
          }
          style={styles.item}
          left={() => (
            <View style={styles.image}>
              <Text>🖼️</Text>
            </View>
          )}
          right={() => (
            <View style={styles.rightSide}>
              <View style={styles.edit}>
                <MaterialCommunityIcons name="square-edit-outline" size={14} color="green" />
              </View>
              <View>
                <Checkbox 
                  status={checkedMeals.includes(k.$id) ? 'checked' : "unchecked"}
                  color='green'
                  onPress={() => handleCheckbox(k.$id)}
                />
              </View>
            </View>
          )}
        />
        ))
        
        }
        </List.Accordion>))}
      </List.Section>
      </ScrollView>


    

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
    paddingLeft: 20, 
    marginBottom: 20
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
  },
  instockGroup: {
    flexDirection: "row",
    gap: 8
  },
  allStock: {
    borderWidth: 1,
    borderStyle: "dashed"
  },
  inStock: {
    backgroundColor: "#02C27F",
    
  },
  outStock: {
    backgroundColor: "#ff0000",
    
  },
  hide:{
    display: "none"
  }
})