import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { Snackbar, Text } from 'react-native-paper';

const SnackBar = () => {

    const [visible, setVisible] = useState<boolean>(true)
    
    const onDismissSnackBar = () => setVisible(false);

  return (
    <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={17000}
        wrapperStyle={{
          bottom: -100
        }}
        style={{
          backgroundColor: "#fff"
        }}
        contentStyle={{
          backgroundColor: "#fff"
        }}
      >
        <View style={styles.snackbarContainer}>
          <Text variant='headlineSmall' style={styles.snackbarTitle}>Are you sure you want to close the store?</Text>
          <Text variant='titleMedium'>Once the store is closed you won't receive any new orders</Text>
          <View style={styles.snackbarButtonContainer}>
            <TouchableOpacity>
              <Text variant='headlineSmall' style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text variant='headlineSmall' style={styles.confirmText}>CONFIRM</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Snackbar>
  )
}

export default SnackBar

const styles = StyleSheet.create({
snackbarContainer: {
        paddingTop: 40,
        paddingBottom: 60
  },
  snackbarButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 40
  },
  snackbarTitle: {
    fontWeight: "bold",
    marginBottom: 10
  },
  confirmText: {
    color: "green",
    fontWeight: "bold"
  },
  cancelText: {
    fontWeight: "bold"
  }
})