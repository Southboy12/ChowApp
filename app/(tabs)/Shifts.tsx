import { Checkin } from '@/components/database.type'
import { CHECKIN_ID, client, DATABASE_ID, tablesDB } from '@/lib/appwrite'
import { useAuth } from '@/lib/auth-context'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import type { RealtimeResponseEvent } from 'react-native-appwrite'
import { ID, Query } from 'react-native-appwrite'
import { Button, Card, Text, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'




const Shifts = () => {

  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false)
  const [logInfo, setLogInfo] = useState<Checkin[]>()
  const [error, setError] = useState<string>("")

  const { user } = useAuth() 

  useEffect(() => {
    if (user) {
      const shiftChannel = `databases.${DATABASE_ID}.tables.${CHECKIN_ID}.rows`
      const shiftSubscription = client.subscribe(
        shiftChannel, 
        (response: RealtimeResponseEvent<any>) => {
          if (
            response.events.includes(
              "databases.*.tables.*.rows.*.create"
            )
          ) {
            fetchShifts()
          }
        }
      )

      fetchShifts()

      return () => {
        shiftSubscription()
      }
      
    }
  }, [user])

  const handleCheckIn = async() => {
    if (!user) return;

    const date = new Date()
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric"
    })
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
    const newStatus = isCheckedIn ? "Check out" : "Checked In"

    try {
      await tablesDB.createRow(
        DATABASE_ID,
        CHECKIN_ID,
        ID.unique(),
        {
          user_id: user.$id,
          completed_date: formattedDate,
          completed_time: formattedTime,
          action: newStatus
        }
      )

      setIsCheckedIn(!isCheckedIn)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        return;
      }

      setError("There was an error creating the shift")
    }
  }

  const fetchShifts = async () => {
    try {
      const now = new Date()

      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      const response = await tablesDB.listRows(
        DATABASE_ID,
        CHECKIN_ID,
        [
          Query.equal("user_id", user?.$id ?? ""),
          Query.greaterThanEqual("$createdAt", firstDayOfMonth.toISOString()),
          Query.lessThan("$createdAt", firstDayOfNextMonth.toISOString()),
          Query.orderDesc("$createdAt")
        ]
      )

      setLogInfo(response.rows as unknown as Checkin[]);
      
    } catch (error) {
      console.error(error);
      
    }
  }


  const theme = useTheme()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant='headlineLarge' style={{fontWeight: "bold"}}>Check In</Text>
      </View>
      <View style={styles.cards}>
        <Card style={styles.card}>
          <Text variant='titleSmall' style={{color: "gray", marginBottom: 20}}>Working hours</Text>
          <Text variant='titleLarge' style={{fontWeight: "bold"}}>07:30am - 07:00pm</Text>
        </Card>
        <Card style={styles.card}>
          <Text variant='titleSmall' style={{color: "gray", marginBottom: 20}}>Shift status</Text>
        <Text variant='titleLarge' style={{fontWeight: "bold", color: theme.colors.error }}>{isCheckedIn ? "Checked In" : "Not Checked In"}</Text>
        </Card>
      </View>
      
      <Button 
        mode='contained'
        buttonColor='#0c513f'
        labelStyle={{fontSize: 18, paddingVertical: 8}}
        style={styles.button}
        onPress={handleCheckIn}
      >
        {isCheckedIn ? "Check Out" : "Check In"}
      </Button>
      {error && <Text style={{color: theme.colors.error}}>{error}</Text>}
      <View style={styles.history}>
        <Text variant='titleMedium'>Shift History</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.dateText, styles.tableContentText]}>Date</Text>
          <Text style={[styles.tableContentText]}>Action</Text>
          <Text style={[styles.timeText, styles.tableContentText]}>Time</Text>
        </View>

        <ScrollView 
          style={{ maxHeight: 550 }}
          showsVerticalScrollIndicator={false}>
          {logInfo && logInfo.map((log, key) => (
            <View key={key} style={styles.tableContent}>
              <Text style={styles.tableContentText}>{log.completed_date}</Text>
              <Text style={[styles.tableContentText, log.action === "Checked In" ? styles.checkIn : styles.checkOut ]}>{log.action}</Text>
              <Text style={styles.tableContentText}>{log.completed_time}</Text>
            </View>
          ))}
        </ScrollView>
        
      </View>
      
    </SafeAreaView>
  )
}

export default Shifts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 40,
    paddingHorizontal: 30
  },
  cards: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 30
  },
  card: {
    flex: 1,
    padding: 20,
    gap: 18
  },
  button: {
    marginTop: 25, 
    borderRadius: 10,
    marginBottom: 30,
    marginHorizontal: 30
  },
  history: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30
  },
  table: {
    // flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 30
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  tableContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginBottom: 10, 
    paddingHorizontal:15,
    paddingVertical: 20,
    borderRadius: 8
  },
  tableContentText: {
    fontSize: 18,
  }, 
  dateText: {
    paddingLeft: 30
  }, 
  timeText: {
    paddingRight: 30
  },
  checkIn: {
    color: "green"
  },
  checkOut: {
    color: "red"
  }
})