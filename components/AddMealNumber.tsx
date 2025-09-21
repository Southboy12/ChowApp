import AddMealBottomSheet from '@/components/AddBottomSheet';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Meals } from './database.type';



interface Props {
  visible: boolean;
  onClose: () => void;
  onAddMeal: (meal: {meal: Meals, quantity: number}) => void;
  meal: Meals | null
}

interface AddMealProps {
  list: string[]
}

const AddMealNumber: React.FC<Props> = ({ visible, onClose, onAddMeal, meal}) => {

  const [quantity, setQuantity] = useState<number>(1);

  if (!meal) return;

  const add = () => setQuantity((prev) => prev + 1 )    
  
  const minus = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev) )  

  const handleAddToList = () => {
    onAddMeal({ meal, quantity })
    onClose()
    setQuantity(1)
  }

  const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};


  return (
    <AddMealBottomSheet  visible={visible} onClose={onClose}>
      <View style={styles.contentContainer}>
        <View style={{ backgroundColor: "#f1f1f1", paddingVertical: 90, borderRadius: 8}}></View>
        <View style={{ gap: 10, marginBottom: 30 }}>
          <Text variant='titleMedium'>{meal.meal_name}</Text>
          <Text style={{ color: "gray"}}>{meal.description}</Text>
          <Text variant='titleMedium'>{formatCurrency(Number(meal.price))}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", gap: 30 }}>
          <View style={{ 
            flex: 1, 
            flexDirection: "row", 
            justifyContent: "space-between", 
            alignItems: "center", 
            paddingHorizontal: 15, 
            paddingVertical: 15, 
            borderWidth: 1,
            borderColor: "green",
            borderRadius: 10
          }}>
            <TouchableOpacity 
              onPress={minus}
              style={{ padding: 8 }}
              >
              <Text variant='titleSmall'>-</Text>
            </TouchableOpacity>
            <Text variant='titleMedium'>{quantity}</Text>
            <TouchableOpacity 
              onPress={add}
              style={{ paddingHorizontal: 8}}  
            >
              <Text variant='titleSmall'>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={{ 
              flex: 3, 
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0c513f",
              paddingHorizontal: 15, 
              paddingVertical: 15, 
              borderColor: "green",
              borderRadius: 10
            }}
            onPress={handleAddToList}
          >
            <Text variant='titleMedium' style={{ color: "#fff"}}>Add {formatCurrency(Number(meal.price) * quantity)}</Text>
          </TouchableOpacity>

        </View>
      </View>
    </AddMealBottomSheet>
  )
}

export default AddMealNumber

const styles = StyleSheet.create({
  add: {
    color: "#008000",
    fontWeight: "600",
    fontSize: 15,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    gap: 12  
  },
})