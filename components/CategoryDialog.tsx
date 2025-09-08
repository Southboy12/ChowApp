import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Dialog } from 'react-native-paper'
import React from 'react'


export interface CategoryDialogProps {
  categories: string[];
  dialogVisible: boolean;
  onDismiss: () => void;
  onSelectCategory: (category: string) => void
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  categories,
  dialogVisible,
  onDismiss,
  onSelectCategory,
}) => {
  return (
    <Dialog visible={dialogVisible} onDismiss={onDismiss}>
            <Dialog.Content>
    
              <View style={styles.dialogContent}>
                {categories.length > 0 ? (
                  categories.map((cat, key) => (
                    <TouchableOpacity 
                      key={key}
                      onPress={() => onSelectCategory(cat)} 
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

export default CategoryDialog

const styles = StyleSheet.create({
  dialogContent: {
    gap: 30
  },
})