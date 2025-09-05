import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function TabsLayout() {
  return (
    <>
      <Tabs screenOptions={{
        tabBarActiveTintColor: "#0c513f", 
        // tabBarActiveBackgroundColor: "#0c513f",
        tabBarStyle: {
          height: 100,
          borderRadius: 8,
        },
        tabBarItemStyle: {
          height: 55,
          borderRadius: 8,
          marginHorizontal: 6,  // 👈 adds spacing between tabs
          marginVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 20
        }
        }}>
        <Tabs.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            // title: "Order",
            tabBarIcon: ({size, color}) => (
              <MaterialCommunityIcons name="pot-steam-outline" size={size} color={color} />
            ) }} 
          />
            
        <Tabs.Screen 
          name="Menu" 
          options={{ 
            headerShown: false,
            tabBarIcon: ({color}) => (
              <Ionicons name="document-text-outline" size={20} color={color} />
            ) }} 
          />

          <Tabs.Screen 
          name="Shifts"
          options={{ 
            headerShown: false,
            tabBarIcon: ({color}) => (
              <Ionicons name="calendar" size={20} color={color} />
            ) }} 
          />

          <Tabs.Screen 
          name="Support" 
          options={{ 
            headerShown: false,
            title: "Support",
            tabBarIcon: ({color}) => (
              <MaterialIcons name="chat" size={20} color={color} />
            ) }} 
          />

          <Tabs.Screen 
          name="Profile" 
          options={{ 
            headerShown: false,
            tabBarIcon: ({color}) => (
              <FontAwesome6 name="circle-user" size={20} color={color} />
            ) }} 
          />

      </Tabs>
    </>
  )
}