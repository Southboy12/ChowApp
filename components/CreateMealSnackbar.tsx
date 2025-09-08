import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper';
import React from 'react'
import { Snackbar } from 'react-native-paper'

export interface CreateSnackbarProps {
  visible: boolean;
  onDismissSnackbar: () => void
} 

const CreateMealSnackbar: React.FC<CreateSnackbarProps> = ({ visible, onDismissSnackbar }) => {

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackbar}
      duration={2000}
      style={styles.snackbar}
    >
      <Text variant="titleLarge" style={{ color: "green", textAlign: "center"}} >Meal created succesfully</Text>
    </Snackbar>
  )
}

export default CreateMealSnackbar

const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    bottom: 10,
    left: 100,
    right: 0,
    backgroundColor: "#fff", 
    alignSelf: "center",
    width: '60%'
  }
  
})