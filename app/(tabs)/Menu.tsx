import { StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Snackbar, Switch, Text, PaperProvider, Portal, Dialog, Button } from 'react-native-paper'
import FontAwesome from '@expo/vector-icons/FontAwesome';



import SnackBar from '@/components/Snackbar';
import New from '../screens/orders/New';
import StoreClosed from '../screens/orders/StoreClosed';
import AcceptedByMe from '../screens/orders/AcceptedByMe';
import AllOngoing from '../screens/orders/AllOngoing';
import AwaitingPickup from '../screens/orders/AwaitingPickup';
import InTransit from '../screens/orders/InTransit';
import Completed from '../screens/orders/Completed';
import Rejected from '../screens/orders/Rejected';
import Meals from '../screens/Menu/Meals';
import ChowsmartScreen from '../screens/Menu/Chowsmart';
import GroupScreen from '../screens/Menu/Groups';
import ItemsScreen from '../screens/Menu/Items';
import PacksScreen from '../screens/Menu/Packs';






export default function Index() {

  const [isStoreOpen, setIsStoreOpen] = useState<boolean>(false)
  const [activeStatus, setActiveStatus] = useState<number>(0)
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingValue, setPendingValue] = useState<boolean>(false);

  let ScreenToRender;

  const handleToggle = (value: boolean) => {
    setPendingValue(value);
    setShowConfirm(true);
  }

  const confirmToggle = () => {
    setIsStoreOpen(pendingValue);
    setShowConfirm(false);
  };

  if (activeStatus === 0) {
    ScreenToRender = <Meals />
    } else if (activeStatus === 1) {
      ScreenToRender = <ChowsmartScreen />
    } else if (activeStatus === 2) {
      ScreenToRender = <GroupScreen />
    } else if (activeStatus === 3) {
      ScreenToRender = <ItemsScreen />
    } else if (activeStatus === 4) {
      ScreenToRender = <PacksScreen />
    } 

  const orderStatuses = ["Meals", "Chowsmart New", "Option Groups", "Option Items", "Packs"]
  return (
    
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
              Menu
            </Text>
          </View>
          <View style={styles.head}>
            <FontAwesome name="search" size={24} color="black" />
          </View>
        </View>

        {/* Scrollable Tab */}
        <View style={styles.scrollContainer}>

          {/* Order Status */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.statusContainer}>
              {orderStatuses.map((s, key) => {
                const isActive = activeStatus === key;

                if (s === "Chowsmart New") {
                  return (
                    <TouchableOpacity
                    key={key}
                    style={[styles.statusText, isActive && styles.activestatus]}
                    onPress={() => setActiveStatus(key)}
                  >
                    <Text style={[isActive && styles.activeText, styles.text]}>
                      Chowsmart 
                      <View style={{backgroundColor: "red", paddingHorizontal: 8, borderRadius: 8, marginLeft: 8}}>
                        <Text style={[{color: "#fff", alignSelf: "center"}, isActive && styles.activeText]}>
                          New
                        </Text>
                      </View> 
                    </Text>
                  </TouchableOpacity>
                  )
                }
                return (

                  <TouchableOpacity
                    key={key}
                    style={[styles.statusText, isActive && styles.activestatus]}
                    onPress={() => setActiveStatus(key)}
                  >
                    <Text style={[isActive && styles.activeText, styles.text]}>{s}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Content */}
        <View style={styles.content}>{ScreenToRender}</View>

        {/* Confirmation Dialog */}
        
          <Dialog visible={showConfirm} onDismiss={() => setShowConfirm(false)}>
            <Dialog.Title>Confirm Action</Dialog.Title>
            <Dialog.Content>
              <Text>
                Are you sure you want to {pendingValue ? "open" : "close"} the store?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button textColor='#000' onPress={() => setShowConfirm(false)}>
                <Text style={styles.cancelText} variant='titleLarge'>Cancel</Text>
              </Button>

              <Button onPress={confirmToggle}>
                <Text style={[styles.statusContainer, styles.confirmText]} variant='titleLarge'>Confirm</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
      
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
    padding: 30
  },
  head: {
    flexDirection: "row",
    alignItems: "center"
  },
  closedText: {
    marginRight: 8
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
    marginHorizontal: 30,
    borderRadius: 8
  },
  searchButton: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 10,
  },
  statusContainer: {
    flexDirection: "row",
    
  },
  statusText: {
    marginHorizontal: 6,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 30,
    borderRadius: 8
  },
  activestatus: {
    backgroundColor: "#0c513f",
    
  },
  activeText: {
    color: "#f5f5f5",
    fontWeight: "bold"
  }, 
  text: {
    fontSize: 16
  },
  content: {
    flex: 1
  },
  confirmText: {
    color: "green",
    fontWeight: "bold"
  },
  cancelText: {
    fontWeight: "bold"
  }
})