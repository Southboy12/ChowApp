import { StyleSheet, View, TouchableOpacity, Pressable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Badge, Text, Card } from 'react-native-paper'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';



export default function Support() {

  const router = useRouter()

  return (
    
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
              Support
            </Text>
          </View>
          <View style={styles.head}>
            <MaterialIcons name="notifications-none" size={26} color="black" />
            <Badge style={styles.badge} size={12}></Badge>
          </View>
        </View>

        {/* Card */}
        
          <Card style={styles.card}>
            <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
              borderRadius: 15,
              transform: [{ scale: pressed ? 0.97 : 1}]
            }
          ]}
          onPress={() => router.push("/Issues")}
        >
            <Card.Content style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text variant='headlineSmall' style={{fontWeight: "bold"}}>Order Issues</Text>
                <Text variant='bodyLarge' style={{color: "gray"}}>Report anything wrong with an order</Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons name="fast-food-sharp" size={28} color="#ebb434" />
              </View>
            </Card.Content>
            </Pressable>
          </Card>
        

        {/* Content */}
       

        {/* Confirmation Dialog */}
        
          
      
      </SafeAreaView>
   
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  header: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000"
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2
  },
  card: {
    margin: 20,
    backgroundColor: "#fff"
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 30,
    paddingHorizontal: 30
  },
  textContainer: {
    justifyContent: "center",
    gap: 6
  },
  iconContainer: {
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 7,
    backgroundColor: "rgba(106, 237, 69, 0.1)",
  }
  
  
})