import { StyleSheet, View, TouchableOpacity, Pressable } from 'react-native'
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

  const [filterOptions, setFilterOptions] = useState<string>("All")
  const [selectedMeal, setSelectedMeal] = useState<Meals | null>(null)
  const [orderPacks, setOrderPacks] = useState<{ packIndex: number; items: { meal: Meals; quantity: number }[]}[]>([{ packIndex: 0, items: []}])
  const [showAddMealNumber, setShowAddMealNumber] = useState<boolean>(false)
  const [showReviewOrder, setShowReviewOrder] = useState<boolean>(false)
  const [activePackIndex, setActivePackIndex] = useState<number>(0)


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

  const hasOrder = orderPacks.some(pack => pack.items.length > 0 )

  const handleFilter = (filter: string) => {
    setFilterOptions(filter)
  }

  const handleSelectMeal = (meal: Meals) => {
    setSelectedMeal(meal)
    setShowAddMealNumber(true)
  }

  const handleAddPack = () => {
    
    setActivePackIndex((prev) => prev + 1)
    setShowReviewOrder(false)    
  };

  const handleAddMealToPack = (packIndex: number, meal: Meals, quantity: number) => {    
    if (!meal) return null;

    setOrderPacks((prev) => {
      if (prev.length === 0) return prev;

      const lastPack = prev[prev.length - 1];

      if (!lastPack.items || lastPack.items.length === 0) {
        console.log("Please select a meal");
        return prev
      }

      return [
        ...prev,
        { packIndex: prev.length, items: []}
      ]
    })

    setOrderPacks((prev) => {
      // check if meal already exist
      const packs = [...prev]

      if (!packs[packIndex]) {

      }
      
      const exists = prev[packIndex].items.find(item => item.meal.$id === meal.$id);
      
      if (exists) {
        packs[packIndex].items = packs[packIndex].items.map((item) => (
          item.meal.$id === meal.$id
            ? { ...item, quantity: item.quantity + quantity}
            : item
        ))
      } else {
        packs[packIndex].items = [
          ...packs[packIndex].items,
          { meal, quantity }
        ]
      }
      
      return packs;
    })

    console.log(orderPacks);
    
    setShowAddMealNumber(false)    
  }

  const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};


  const totalQuantity = orderPacks.reduce((packAcc, pack) => {
  return (
    packAcc +
    pack.items.reduce((mealAcc, m) => mealAcc + m.quantity, 0)
  );
}, 0);

  const totalPrice = orderPacks.reduce((packAcc, pack) => {
  return (
    packAcc +
    pack.items.reduce(
      (itemAcc, item) => itemAcc + item.quantity * Number(item.meal.price),
      0
    )
  );
}, 0);

  
  
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

      {hasOrder && <TouchableOpacity 
        style={[proceedStyle]} 
        onPress={() => setShowReviewOrder(true)}
      >
        <Text variant='titleMedium' style={{ color: "#fff", fontWeight: "bold"}}>
          Proceed to order {totalQuantity} item{totalQuantity > 1 ? "s" : ""}
        </Text>
        <Text variant='titleMedium' style={{ color: "#fff", fontWeight: "bold"}}>
          {formatCurrency(Number(totalPrice))}
        </Text>
      </TouchableOpacity>}

      <AddMealNumber 
        visible={showAddMealNumber} 
        onClose={() => setShowAddMealNumber(false)} 
        onAddMeal={handleAddMealToPack}
        meal={selectedMeal}
        packIndex={activePackIndex}
      />

      <ReviewOrder 
        visible={showReviewOrder} 
        onClose={() => setShowReviewOrder(false)} 
        pack={orderPacks}
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
        onAddPack={handleAddPack}
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