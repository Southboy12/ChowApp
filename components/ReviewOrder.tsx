import ReviewOrderBottomSheet from '@/components/AddBottomSheet';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { Meals } from './database.type';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


interface Props {
  visible: boolean;
  onClose: () => void;
  pack: {meal: Meals, quantity: number}[];
  totalPrice: number;
  totalQuantity: number;
}

const ReviewOrder: React.FC<Props> = ({ visible, onClose, pack, totalPrice, totalQuantity}) => {

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const serviceFee = 880;
  const deliveryFee = 500;


  return (
    <ReviewOrderBottomSheet  visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20, marginBottom: 30}}>
          <Text variant='titleLarge' style={{color: "gray"}}>Review Order</Text>
          <TouchableOpacity>
            <MaterialIcons name="cancel" size={24} color="gray" />
          </TouchableOpacity>
          
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 30 }}>
          <Text variant='titleMedium' style={{fontWeight: "bold"}}>Pack 1</Text>
          <MaterialIcons name="delete-outline" size={20} color="red" />
        </View>

        <View style={{backgroundColor: "#f1f1f1", padding: 20, borderRadius: 10, gap: 15, marginBottom: 20}}>
          <Text variant='titleMedium'>"Fried Rice" is no longer available. Please replace or remove items</Text>
          <View style={{flexDirection: "row"}}>
            <Button mode='contained' buttonColor='#0c513f'>Replace items</Button>
            <Button icon="delete-outline" textColor='red'>Remove items</Button>            
          </View>
        </View>

        <View>
          <View>
            {pack.map((item, key) => (
              <View key={key} style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 30 }}>
                <View style={{ flex: 3, flexDirection: "row", gap: 10}}>
                  <MaterialCommunityIcons name="star-four-points" size={14} color="black" />
                  <View style={{  }}>
                    <Text variant='titleMedium' style={{fontWeight: "bold"}}>{item.meal.meal_name}</Text>
                    <Text variant='titleMedium' style={{color: "gray"}}>{formatCurrency(Number(item.meal.price))}</Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between",backgroundColor: "#f1f1f1", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20}}>
                  <Text variant='headlineMedium' style={{fontWeight: "bold"}}>-</Text>
                  <Text variant='titleMedium' style={{fontWeight: "bold"}}>{item.quantity}</Text>
                  <Text variant='headlineSmall' style={{fontWeight: "bold"}}>+</Text>
                </View>
              </View>
            ))}
            
          </View>
          <Button mode='contained' icon="plus" compact style={{alignSelf: "flex-start", paddingHorizontal: 20, marginBottom: 80}} buttonColor='#E6F4EA' textColor='#0c513f' labelStyle={{fontWeight: "bold"}}>Add Another Pack</Button>
        </View>

        <Divider style={{marginBottom: 20}} />

        <View style={{gap: 30}}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <Text variant='titleMedium'>Sub-total ({totalQuantity} item{totalQuantity > 1 ? "s" : ""})</Text>
            <Text variant='titleMedium'>{formatCurrency(totalPrice)}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <Text variant='titleMedium'>Delivery Fee</Text>
            <Text variant='titleMedium'>{formatCurrency(deliveryFee)}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <Text variant='titleMedium'>Service Fee</Text>
            <Text variant='titleMedium'>{formatCurrency(serviceFee)}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <Text variant='titleMedium'>Total</Text>
            <Text variant='titleMedium'>{formatCurrency(totalPrice + deliveryFee + serviceFee)}</Text>
          </View>
        </View>

        <Button mode='contained' buttonColor='#0c513f' style={{marginTop: 30, paddingVertical: 8, borderRadius: 10}}>Place order</Button>
        
      </View>
    </ReviewOrderBottomSheet>
  )
}

export default ReviewOrder

const styles = StyleSheet.create({
  container: {}
})