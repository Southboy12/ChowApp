import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Dialog } from 'react-native-paper'
import React from 'react'


export interface FilterDialogProps {
  filterOptions: string[];
  dialogVisible: boolean;
  onDismiss: () => void;
  onSelectFilter: (category: string) => void
}

const FilterDialog: React.FC<FilterDialogProps> = ({
  filterOptions,
  dialogVisible,
  onDismiss,
  onSelectFilter,
}) => {
  return (
    <Dialog visible={dialogVisible} onDismiss={onDismiss}>
            <Dialog.Content>
    
              <View style={styles.dialogContent}>
                {filterOptions.length > 0 ? (
                  filterOptions.map((cat, key) => (
                    <TouchableOpacity 
                      key={key}
                      onPress={() => onSelectFilter(cat)} 
                    >
                      <Text 
                        variant='titleMedium'                         
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>)
                  ))
                   : (
                  <Text>Please add a filter</Text>
                )}
               
              </View>
            </Dialog.Content>
          </Dialog>
  )
}

export default FilterDialog

const styles = StyleSheet.create({
  dialogContent: {
    gap: 30
  },
})