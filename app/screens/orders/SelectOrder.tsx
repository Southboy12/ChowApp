import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Divider, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { useMeals } from '@/lib/meal-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from "react";
import AddMealNumber from '@/components/AddMealNumber';
import { Meals } from '@/components/database.type';
import ReviewOrder from '@/components/ReviewOrder';



const SelectOrderScreen = () => {

  const [filterOptions, setFilterOption] = useState<string>("All")
  const [selectedMeal, setSelectedMeal] = useState<Meals | null>(null)
  const [orderPacks, setorderPacks] = useState<{meal: Meals, quantity: number}[]>([])
  const [showAddMealNumber, setShowAddMealNumber] = useState<boolean>(false)
  const [showReviewOrder, setShowReviewOrder] = useState<boolean>(false)


  const router = useRouter()
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const { meals } = useMeals()

  const uniqueCategories = [...new Set(meals.map(meal => meal.category))]

  const proceedStyle = [
    styles.proceed,
  ]

  // useEffect(() => {
  //   console.log("orderPacks changed. Current items:", orderPacks.length, orderPacks);
    
  // }, [orderPacks])

  const filteredMeals = meals.filter((meal) => {
    if (filterOptions === "All") return true;
    if (filterOptions === "Main Meals") return meal.category === "Main Meals"
    if (filterOptions === "Drinks") return meal.category === "Drinks"
    if (filterOptions === "Promo") return meal.category === "Promo"
    if (filterOptions === "Combo") return meal.category === "Combo"
    if (filterOptions === "Soup and Swallow") return meal.category === "Soup and Swallow"
  })

  filteredMeals.sort((a, b) => Number(b.in_stock) - Number(a.in_stock))

  const handleFilter = (filter: string) => {
    setFilterOption(filter)
  }

  const handleSelectMeal = (meal: Meals) => {
    setSelectedMeal(meal)
    setShowAddMealNumber(true)
  }

  const handleAddSelectMeal = ({ meal, quantity}: {meal: Meals, quantity: number}) => {    
    if (!meal) return;

    setorderPacks((prev) => {
      // check if meal already exist
      const exists = prev.find(item => item.meal.$id === meal.$id);
      if (exists) {
        // Update quantity
        return prev.map(item => 
          item.meal.$id === meal.$id
            ? { ...item, quantity: item.quantity + quantity}
            : item
        )
      }

      return [...prev, { meal: meal, quantity}]
    })

    setShowAddMealNumber(false)
    console.log(orderPacks.length);
    
  }

  const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};


  const totalQuantity = orderPacks.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = orderPacks.reduce((sum, item) => sum + (Number(item.meal.price) * item.quantity), 0)
  
  
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.title}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => router.back()} 
            >
              <Ionicons 
                name="arrow-back" 
                size={18} 
                color="black"
              />
            </TouchableOpacity>
            <Text variant='titleMedium' >Add Meal</Text>
          </View>
          <View style={styles.iconsContainer}>
            <View style={styles.iconContainer}>
              <EvilIcons name="share-google" size={24} color="black" />
            </View>
            <View style={styles.iconContainer}>
              <EvilIcons name="heart" size={24} color="black" />
            </View>
            <View style={styles.iconContainer}>
              <EvilIcons name="search" size={24} color="black" />
            </View>
          </View>

          
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filter}>
          <TouchableOpacity 
            style={filterOptions === "All" && styles.filterContainer}
            onPress={() => handleFilter("All")}
          >
            <Text variant='titleMedium' style={{ color: filterOptions === "All" ? "green" : "gray"}}>All</Text>
          </TouchableOpacity>
          {uniqueCategories.map((cat, key) => (
            <TouchableOpacity 
              key={key}
              style={filterOptions === cat && styles.filterContainer}
              onPress={() => handleFilter(cat)}
            >
              <Text variant='titleMedium' style={{ color: filterOptions === cat ? "green" : "gray"}}>{cat}</Text>
            </TouchableOpacity>
          ))}  
        </View>
        </ScrollView>
        
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 140
          }}
        >
          {filteredMeals.map((meal, key) => (
            <TouchableOpacity 
              key={key}
              onPress={() => handleSelectMeal(meal)}
              disabled={!meal.in_stock}
            >
              <View style={styles.mealContainer}>
                <View style={styles.mealInfo}>
                  <View>
                    <Text variant='titleMedium'>{meal.meal_name}</Text>
                    <Text style={{ color: "gray"}}>{meal.description}</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: "bold"}}>{formatCurrency(Number(meal.price))}</Text>
                  </View>
                </View>
                <View style={styles.imageContainer}></View>
              </View>
              {!meal.in_stock && <Text style={{ color: theme.colors.error}}>Out of stock</Text>}
              <Divider />
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>

      <TouchableOpacity 
        style={[proceedStyle, orderPacks.length === 0 && styles.hidden]} 
        onPress={() => setShowReviewOrder(true)}
      >
        <Text variant='titleMedium' style={{ color: "#fff", fontWeight: "bold"}}>Proceed to order {totalQuantity} item{totalQuantity > 1 ? "s" : ""}</Text>
        <Text variant='titleMedium' style={{ color: "#fff", fontWeight: "bold"}}>{formatCurrency(Number(totalPrice))}</Text>
      </TouchableOpacity>

      <AddMealNumber 
        visible={showAddMealNumber} 
        onClose={() => setShowAddMealNumber(false)} 
        onAddMeal={handleAddSelectMeal}
        meal={selectedMeal}
      />

      <ReviewOrder 
        visible={showReviewOrder} 
        onClose={() => setShowReviewOrder(false)} 
        pack={orderPacks}
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
      />

    </SafeAreaView>
  )
}

export default SelectOrderScreen

const styles = StyleSheet.create({
  container: {
    position: "relative",
    // flex: 1,
    marginHorizontal: 20,
    paddingBottom: 20
  },
  headerContainer: {
    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 30
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    width: 32,
    height: 32,
    borderRadius: 16
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, 
  },
  bold: {
    fontWeight: "bold"
  },
  backArrow: {
    // padding: 8
  },
  filter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginBottom: 20
  },
  filterContainer: {
    
    paddingVertical: 5, 
    paddingHorizontal: 10,
    backgroundColor: "#d4edda",
    borderRadius: 4
  },
  mealContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 20
  },
  imageContainer: {
    backgroundColor: "gray",
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 6
  },
  mealInfo: {
    justifyContent: "space-between",
    paddingVertical: 10
  },
  proceed: {
    position: "absolute",
    bottom: 30,    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0c513f",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
    // width: 470
    left: 20,
    right: 20
  },
  hidden: {
    display: "none"
  }
})