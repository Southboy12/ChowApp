import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Checkbox, FAB, List, Text } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { useMeals } from '@/lib/meal-context';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from 'react-native-paper';
import FilterDialog from '@/components/FilterDialog';




const MealsScreen = () => {

  const [inStock, setInStock] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [checkedMeals, setCheckedMeals] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [filterOptions, setFilterOptions] = useState<string>("All")
  const [dialogVisible, setDialogVisible] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<boolean>(false)
  


  const {upsertMeal, fetchMeals, meals} = useMeals()
  const optionList = ["Select", 'All', "Out of Stock", "In Stock"]

  const router = useRouter()
  const { user } = useAuth()

  const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0
  }).format(amount);
};

  const filteredMeals = meals.filter((meal) => {
    if (filterOptions === "All") return true;
    if (filterOptions === "Out of Stock") return meal.in_stock === false
    if (filterOptions === "In Stock") return meal.in_stock === true
  })

  const uniqueMeals = [...new Set(filteredMeals.map(meal => meal.category))]  

  const handleCheckbox = (id: string) => {
    setCheckedMeals((prev) => prev.includes(id) ? prev.filter((mealId) => mealId !==id) : [...prev, id])
    setChecked(!checked)
  }

  const handleSelect = (filter: string) => {
    if (filter === "Select") {
      setDialogVisible(false)
    } else {
    setFilterOptions(filter)
    setDialogVisible(false)
    }
  }

  const handleSelectAll = () => {
    if (!selectAll) {
      filteredMeals.map((meal) => {
        if (!checkedMeals.includes(meal.$id)) {
          setCheckedMeals((prev) => [...prev, meal.$id])
        }
      })
      setSelectAll(true)
    } else {
      setCheckedMeals([])
      setSelectAll(false)
    }
  }

  const handleMarkInStock = async () => {
    
     await Promise.all(
      filteredMeals.map(async (meal) => {
        if (checkedMeals.includes(meal.$id)) {
          
          await upsertMeal({
            ...meal,
            $id: meal.$id,
            in_stock: true
          })
          
        }
        
      }
      
    ))

    setInStock(true)
    setCheckedMeals([])
  }

  const handleMarkOutOfStock = async () => {
    
     await Promise.all(
      filteredMeals.map(async (meal) => {
        if (checkedMeals.includes(meal.$id)) {
          
          await upsertMeal({
            ...meal,
            $id: meal.$id,
            in_stock: false
          })
          
        }
        
      }
      
    ))

    setInStock(false)
    setCheckedMeals([])
  };

  const handleEditCategory = (category: string) => {
    router.push("/Profile")
  }

  const handleEditMeal = (id: string) => {
      router.push("/Profile")
  }

  const hasInStockSelected = filteredMeals.some(
    (meal) => checkedMeals.includes(meal.$id) && meal.in_stock
  );

  const hasOutOfStockSelected = filteredMeals.some(
    (meal) => checkedMeals.includes(meal.$id) && !meal.in_stock
  );

  useEffect(() => {
    fetchMeals()
  }, [user])

  return (
  
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.instockGroup}>
          <TouchableOpacity style={[styles.selectAll, styles.allStock]} onPress={handleSelectAll}>
            <Text variant='titleSmall'>{selectAll ? "Unselect All" : "Select All"}</Text>
          </TouchableOpacity>

          {hasOutOfStockSelected && checkedMeals.length > 0 && (
            <TouchableOpacity style={[styles.selectAll, styles.inStock]} onPress={handleMarkInStock}>
            <Text variant='titleSmall' style={{color: "#fff"}}>Mark in stock</Text>
          </TouchableOpacity>
          )}
          {hasInStockSelected && (
            <TouchableOpacity 
              style={[styles.selectAll, styles.outStock]} 
              onPress={handleMarkOutOfStock}  
            >
              <Text variant='titleSmall' style={{color: "#fff"}}>Mark out of stock</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filter} onPress={() => setDialogVisible(true)}>
          <Ionicons name="filter-sharp" size={16} color="black" />
          <Text variant='titleSmall'>{filterOptions}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
      <List.Section>
        {uniqueMeals.map((meal, key) => (

        <List.Accordion
          key={key}
          title={
            <View></View>
          }
          left={() => (
            <View style={[styles.accordion, ]}>
              <Text variant='titleMedium' style={{fontWeight: "bold"}}>{meal}</Text> 
              <TouchableOpacity 
                onPress={() => router.push({
                  pathname: "/screens/Menu/EditMeal",
                  params: {  }
                })} 
              >
                <Text variant='titleMedium' style={{fontWeight: "bold", color: "green"}}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
          
          right={(props) => (
            <View style={styles.accordion}>
              <TouchableOpacity style={{flexDirection: "row", gap: 2}}>
                <Text variant='titleMedium' style={{fontWeight: "bold"}}>View All</Text>
                <Text variant='titleMedium' style={{fontWeight: "bold", color: "green"}}>({filteredMeals.filter((q) => q.category === meal).length})</Text>
              </TouchableOpacity>
              <List.Icon {...props} icon={props.isExpanded ? "chevron-up" : "chevron-down"} />
            </View>
          )}
          style={{backgroundColor: "#f1f1f1", borderTopWidth: 1, borderColor: "rgba(0,0,0,0.1)"}}
        > 

        {filteredMeals.filter((m) => m.category === meal).map((k, i) => (
          <List.Item 
          key={i}
          title={
            <View style={styles.textContainer}>
              <Text variant='titleMedium' style={{fontWeight: "bold"}}>{k.meal_name}</Text>
              <View style={styles.price}>
                <Text variant='titleSmall'>{formatCurrency(Number(k.price))}</Text>
                <Text variant='titleSmall' style={[styles.outOfStock, k.in_stock && styles.inStockBtn]}>{k.in_stock ? "In Stock" : "Out of Stock"}</Text>
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
              <TouchableOpacity 
                style={styles.edit}
                onPress={() => router.push({
                  pathname: "/screens/Menu/EditMeal",
                  params: { updateMeal: JSON.stringify(k) }
                })}  
              >
                <MaterialCommunityIcons name="square-edit-outline" size={14} color="green" />
              </TouchableOpacity>
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

      <FilterDialog 
        filterOptions={optionList} 
        dialogVisible={dialogVisible} 
        onDismiss={() => setDialogVisible(false)}
        onSelectFilter={handleSelect}
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
    flexDirection: "row",
    alignItems: "center",
    gap: 4
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
    alignItems: "center",
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
  }, 
  inStockBtn: {
    backgroundColor: "green",
    color: "#fff",
    paddingVertical: 2,
    paddingHorizontal: 4
  }
})