import AddCategoryBottomSheet from '@/components/AddCategoryBottomShet';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Switch, Text, TextInput } from 'react-native-paper';



interface Props {
  visible: boolean;
  onClose: () => void;
  onAddPack: (newPack: string, publishNow: boolean) => void
}

interface AddPackProps {
  list: string[]
}

const AddPack: React.FC<Props> = ({ visible, onClose, onAddPack}) => {

  const [packName, setPackName] = useState("");
  const [publishNow, setPublishNow] = useState(false);

  const handleAddPack = () => {
    if (!packName.trim()) return;

    console.log("complete1");
    
    onAddPack(packName, publishNow)
    setPackName("")
    setPublishNow(false)
    onClose()
    console.log("complete2");
    
  }
  

  return (
    <AddCategoryBottomSheet  visible={visible} onClose={onClose}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleSheet}>Add Pack</Text>

        <Text style={styles.label}>Pack name</Text>
        <TextInput
          placeholder="e.g Main meals"
          value={packName}
          onChangeText={setPackName}
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
          <TouchableOpacity onPress={handleAddPack}>
            <Text style={styles.add}>ADD Pack</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AddCategoryBottomSheet>
  )
}

export default AddPack

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