import { StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Snackbar, Switch, Text, PaperProvider, Portal, Dialog, Button } from 'react-native-paper'
import EvilIcons from '@expo/vector-icons/EvilIcons';



import SnackBar from '@/components/Snackbar';
import New from '../screens/orders/New';
import StoreClosed from '../screens/orders/StoreClosed';
import AcceptedByMe from '../screens/orders/AcceptedByMe';
import AllOngoing from '../screens/orders/AllOngoing';
import AwaitingPickup from '../screens/orders/AwaitingPickup';
import InTransit from '../screens/orders/InTransit';
import Completed from '../screens/orders/Completed';
import Rejected from '../screens/orders/Rejected';





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

  if (!isStoreOpen) {
    ScreenToRender = <StoreClosed />
  } else if (isStoreOpen && activeStatus === 0) {
    ScreenToRender = <New />
  } else if (isStoreOpen && activeStatus === 1) {
    ScreenToRender = <AcceptedByMe />
  } else if (isStoreOpen && activeStatus === 2) {
    ScreenToRender = <AllOngoing />
  } else if (isStoreOpen && activeStatus === 3) {
    ScreenToRender = <AwaitingPickup />
  } else if (isStoreOpen && activeStatus === 4) {
    ScreenToRender = <InTransit />
  } else if (isStoreOpen && activeStatus === 5) {
    ScreenToRender = <Completed />
  } else if (isStoreOpen && activeStatus === 6) {
    ScreenToRender = <Rejected />
  }

  const orderStatuses = ["New (0)", "Accepted by me (0)", "All ongoing (0)", "Awaiting pickup (0)", "In transit (0)", "Completed (0)", "Rejected (0)"]
  return (
    
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
              Orders
            </Text>
          </View>
          <View style={styles.head}>
            <Text variant="headlineSmall" style={styles.closedText}>
             { isStoreOpen ? "Open" : "Closed"}
            </Text>
            <Switch value={isStoreOpen} onValueChange={handleToggle} color="#0c513f" />
          </View>
        </View>

        {/* Scrollable Tab */}
        <View style={styles.scrollContainer}>
          <TouchableOpacity style={styles.searchButton}>
            <EvilIcons name="search" size={25} color="#fff" />
          </TouchableOpacity>

          {/* Order Status */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.statusContainer}>
              {orderStatuses.map((s, key) => {
                const isActive = activeStatus === key;
                return (
                  <TouchableOpacity
                    key={key}
                    style={[styles.statusText, isActive && styles.activestatus]}
                    onPress={() => setActiveStatus(key)}
                  >
                    <Text style={isActive && styles.activeText}>{s}</Text>
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
    padding: 20
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
    paddingVertical: 23,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  searchButton: {
    padding: 10,
    backgroundColor: "#02C27F",
    borderRadius: 10,
  },
  statusContainer: {
    flexDirection: "row",
    
  },
  statusText: {
    marginHorizontal: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    borderRadius: 8
  },
  activestatus: {
    backgroundColor: "#0c513f",
    
  },
  activeText: {
    color: "#f5f5f5",
    fontWeight: "bold"
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