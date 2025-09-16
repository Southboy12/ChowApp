import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Switch, Text, TextInput } from 'react-native-paper';
// import { TextInput as RNTextInput } from 'react-native';
import AddCategory from '@/components/AddCategory';
import AddShowOptionGroup from '@/components/AddOptionGroup';
import AddPack from '@/components/AddPack';
import CategoryDialog, { CategoryDialogProps } from '@/components/CategoryDialog';
import CreateMealSnackbar from '@/components/CreateMealSnackbar';
import PackDialog, { PackDialogProps } from '@/components/PackDialog';
import { useAuth } from '@/lib/auth-context';
import { useMeals } from '@/lib/meal-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';




type FormData = {
  category: string;
  meal_name: string;
  description: string;
  image?: string;
  price: string;
  price_description: string;
  pack: string;
  option_group?: string;
  in_stock: boolean;
}

const AddMeal = () => {

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [packDialogVisible, setPackDialogVisible] = useState<boolean>(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddPack, setShowAddPack] = useState(false);
  const [showAddoption_group, setShowAddoption_group] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false); 
  const [categories, setCategories] = useState<string[]>([])
  const [formData, setFormData] = useState<FormData>({
    category: "",
    meal_name: "",
    description: "",
    image: "",
    price: "",
    price_description: "",
    pack: "",
    option_group: "",
    in_stock: false
  }); 

  // const inputRef = useRef<RNTextInput | null>(null)
  const { user } = useAuth()
  const {upsertMeal, setError, error, meals, loading} = useMeals()
  const theme = useTheme()



  useEffect(() => {
    
    const uniqueCategories = [...new Set(meals.map(meal => meal.category))]
    setCategories(uniqueCategories)
  },[user, meals])


  

  const packs = [...new Set(meals.map(meal => meal.pack))]
  

  const handleCreateMeal = async () => {

    if (
        !formData.category || 
        !formData.meal_name || 
        !formData.description || 
        !formData.price || 
        !formData.price_description
    ) {
        setError("Please fill all fields")
        return;
    }

    setError(null)
    try {
      upsertMeal(formData)
      setShowSnackbar(true)
      clearInputs()

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        return;
      }

      setError("There was an error creating the meal")
    }
  }


  const clearInputs = () => {
    setFormData((prev: FormData) => ({ 
      ...prev, 
      category: "",
      meal_name: "",
      description: "",
      image: "",
      price: "",
      price_description: "",
      pack: "",
      option_group: "",
      in_stock: false
    }))
    
  }

  const handleCategoryDialogDismiss = () => {
    setDialogVisible(false);
    // inputRef.current?.blur()
  }

  const handlePackDialogDismiss = () => {
    setPackDialogVisible(false);
    // inputRef.current?.blur()
  }

  const handleSelectCategory: CategoryDialogProps["onSelectCategory"] = (category: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      category: category
    }));
    handleCategoryDialogDismiss()
  }

  const handleSelectPack: PackDialogProps["onSelectPack"] = (pack: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      pack: pack
    }));
    handlePackDialogDismiss()
  }

  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => router.back()} 
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.bold} variant='headlineSmall' >Add Meal</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 100 }} 
          showsVerticalScrollIndicator={false}
        >
          {/* Category */}
          <View style={styles.category}>
            <Text variant='titleLarge'>Category</Text>
          
            <TextInput 
              value={formData.category}
              
              // ref={inputRef}
              placeholder="Select Category"
              caretHidden={true}
              showSoftInputOnFocus={false}
              right={<TextInput.Icon icon="chevron-up" />}
              onFocus={() => setDialogVisible(true)}
              style={styles.input}
            />
          
            <TouchableOpacity onPress={() => setShowAddCategory(true)}> 
              <Text style={styles.addCategory}>+ Add Category</Text>
              {showAddCategory && 
                <AddCategory 
                  visible={showAddCategory} 
                  onClose={() => setShowAddCategory(false)} 
                  onAddCategory={(newCategory, publishNow) => {
                    setFormData((prev: FormData) => ({ ...prev, category: newCategory}))
                    console.log(publishNow);
                    
                  }}
                />}
            </TouchableOpacity>
          </View>

          {/* Meal Name */}
          <View style={styles.category}>
            <Text variant='titleLarge'>Meal Name</Text>
            <TextInput 
              mode='flat' 
              placeholder="e.g. Yamarita" 
              value={formData.meal_name}
              onChangeText={(text) =>  
                setFormData((prev: FormData) => ({ ...prev, meal_name: text})
              )}
              style={styles.input}
            />
            
          </View>

          {/* Description */}
          <View style={styles.category}>
            <Text variant='titleLarge'>Description</Text>
            <TextInput 
              mode='flat' 
              placeholder="e.g. Yam with egg sauce" 
              value={formData.description}
              onChangeText={(text) =>  
                setFormData((prev: FormData) => ({ ...prev, description: text})
              )}
              style={styles.input}
            />
            
          </View>

          {/* Price */}
          <View style={[styles.price, styles.category]}>
            <View style={{flex: 1}}>
              <Text variant='titleLarge'>Price</Text>
              <TextInput 
                mode='flat' 
                left={<TextInput.Icon icon="currency-ngn" />} 
                keyboardType='numeric'
                value={formData.price}
                onChangeText={(text) =>  
                  setFormData((prev: FormData) => ({ ...prev, price: text})
                )}
                style={styles.input}
              />
            </View>
            <View style={{flex: 2}}>
              <Text variant='titleLarge'>Price Description</Text>
              <TextInput 
                mode='flat' 
                placeholder="e.g. per portion" 
                value={formData.price_description}
                onChangeText={(text) =>  
                  setFormData((prev: FormData) => ({ ...prev, price_description: text})
                )}
                style={styles.input}
              />
            </View>
            
          </View>

          {/* Pack */}
          <View style={styles.category}>
            <Text variant='titleLarge'>Pack 
              <View>
                <Text variant='titleSmall' style={{borderWidth: 1, borderStyle: "dashed", paddingHorizontal: 10, borderRadius: 10, marginLeft: 12, color: "gray"}}>Optional</Text>
              </View>
            </Text>
          
            <TextInput 
              // ref={inputRef}
              placeholder="Select pack" 
              caretHidden={true}
              showSoftInputOnFocus={false}
              right={<TextInput.Icon icon="chevron-up" />}
              value={formData.pack}
              onFocus={() => setPackDialogVisible(true)}
              style={styles.input}
            />
          
            <TouchableOpacity onPress={() => setShowAddPack(true)}> 
              <Text style={styles.addCategory}>+ Add Pack</Text>
              {showAddPack && 
                <AddPack 
                  visible={showAddPack} 
                  onClose={() => setShowAddPack(false)} 
                  onAddPack={(newPack, publishNow) => {
                    setFormData((prev: FormData) => ({ ...prev, pack: newPack}))
                    console.log(publishNow); 
                  }}
                />}

            </TouchableOpacity>
          </View>

          {/* Option group */}
          <View style={styles.category}>
            <Text variant='titleLarge'>Option Group 
              <View>
                <Text variant='titleSmall' style={{borderWidth: 1, borderStyle: "dashed", paddingHorizontal: 10, borderRadius: 10, marginLeft: 12, color: "gray"}}>Optional</Text>
              </View>
            </Text>
          
            <TextInput 
              placeholder="Select group"
              caretHidden={true}
              showSoftInputOnFocus={false}
              right={<TextInput.Icon icon="chevron-up" />}
              value={formData.option_group}
              onChangeText={(text) =>  
                setFormData((prev: FormData) => ({ ...prev, meal_name: text})
              )}
              style={styles.input}
            />
          
            <TouchableOpacity onPress={() => setShowAddoption_group(true)}> 
              <Text style={styles.addCategory}>+ Add option group</Text>
              {showAddoption_group && <AddShowOptionGroup visible={showAddoption_group} onClose={() => setShowAddoption_group(false)} />}
            </TouchableOpacity>
          </View>

          {/* Switch */}
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30}}>
            <Text variant='titleLarge' style={{fontWeight: "bold"}}>Mark Item in Stock</Text>
            <Switch
              value={formData.in_stock}
              onValueChange={(newValue) => 
                setFormData((prev) => ({
                  ...prev,
                  in_stock: newValue
                }))
              }
            />
          </View>

          <Button 
            mode='contained'
            buttonColor='#0c513f'
            labelStyle={{fontSize: 18, paddingVertical: 8}}
            style={styles.button}
            onPress={handleCreateMeal}
          >
            {loading ? "Loading..." : "Add menu"}
          </Button>
          {error && <Text variant='titleMedium' style={{ color: theme.colors.error }}>{error}</Text> }
        </ScrollView>

        
      </KeyboardAvoidingView>

      {/* Category Dialogs */}
      <CategoryDialog
        categories={categories}
        dialogVisible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Pack Dialog */}
      <PackDialog
        packs={packs}
        packDialogVisible={packDialogVisible}
        onDismiss={() => setPackDialogVisible(false)}
        onSelectPack={handleSelectPack}
      />

      {/* Snackbar */}
      <CreateMealSnackbar visible={showSnackbar} onDismissSnackbar={() => setShowSnackbar(false)} />
      
    </SafeAreaView>
  )
}

export default AddMeal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: "#fff"

  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15, 
    marginBottom: 30
  },
  bold: {
    fontWeight: "bold"
  },
  backArrow: {
    padding: 8
  },
  category: {
    gap: 8,
    marginBottom: 20
  }, 
  addCategory: {
    fontSize: 18,
    color: "green"
  }, 
  price: {
    flexDirection: "row",
    gap: 10
  },
   button: {
    marginTop: 25, 
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F4F6F5",
    borderRadius: 8,
    padding: 12,
    // marginBottom: 20,
  },
})