import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Dialog } from 'react-native-paper'
import React from 'react'


export interface PackDialogProps {
  packs: string[];
  packDialogVisible: boolean;
  onDismiss: () => void;
  onSelectPack: (category: string) => void
}

const PackDialog: React.FC<PackDialogProps> = ({
  packs,
  packDialogVisible,
  onDismiss,
  onSelectPack,
}) => {
  return (
    <Dialog visible={packDialogVisible} onDismiss={onDismiss}>
      <Dialog.Content>

        <View style={styles.dialogContent}>
          {packs.length > 0 ? (
            packs.map((cat, key) => (
              <TouchableOpacity 
                key={key}
                onPress={() => onSelectPack(cat)} 
              >
                <Text 
                  variant='titleMedium'                         
                >
                  {cat}
                </Text>
              </TouchableOpacity>)
            ))
              : (
            <Text>Please add a category</Text>
          )}
          
        </View>
      </Dialog.Content>
    </Dialog>
  )
}

export default PackDialog

const styles = StyleSheet.create({
  dialogContent: {
    gap: 30
  },
})