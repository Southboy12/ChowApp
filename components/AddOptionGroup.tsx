import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, TextInput, Switch } from 'react-native-paper';
import React, { useState } from 'react'
import AddCategoryBottomSheet from '@/components/AddCategoryBottomShet';



interface Props {
  visible: boolean;
  onClose: () => void;
}

const AddShowOptionGroup: React.FC<Props> = ({ visible, onClose}) => {

  const [categoryName, setCategoryName] = useState("");
  const [publishNow, setPublishNow] = useState(false);
  

  return (
    <AddCategoryBottomSheet  visible={visible} onClose={onClose}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleSheet}>Add Category</Text>

        <Text style={styles.label}>Category name</Text>
        <TextInput
          placeholder="e.g Main meals"
          value={categoryName}
          onChangeText={setCategoryName}
          style={styles.input}
        />

        <View style={styles.switchRow}>
          <Text style={styles.label}>Publish Now</Text>
          <Switch value={publishNow} onValueChange={setPublishNow} />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity>
            <Text style={styles.cancel}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.add}>ADD OPTION GROUP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AddCategoryBottomSheet>
  )
}

export default AddShowOptionGroup

const styles = StyleSheet.create({
  titleSheet: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#222",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F4F6F5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cancel: {
    color: "#000",
    fontWeight: "500",
    fontSize: 15,
  },
  add: {
    color: "#008000",
    fontWeight: "600",
    fontSize: 15,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
})