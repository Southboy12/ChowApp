import { StyleSheet, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { Button, Switch, Text, TextInput } from 'react-native-paper';
// import { TextInput as RNTextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { DATABASE_ID, MEALS_ID, tablesDB } from '@/lib/appwrite';
import { ID, Query } from 'react-native-appwrite';
import { Meals } from '@/types/database.type';
import { useAuth } from '@/lib/auth-context';
import AddCategory from '@/components/AddCategory';
import AddPack from '@/components/AddPack';
import AddShowOptionGroup from '@/components/AddOptionGroup';
import CategoryDialog, {CategoryDialogProps} from '@/components/CategoryDialog';
import PackDialog, { PackDialogProps } from '@/components/PackDialog';
import CreateMealSnackbar from '@/components/CreateMealSnackbar';
import { useTheme } from 'react-native-paper';




type FormData = {
  category: string;
  mealName: string;
  description: string;
  image?: string;
  price: string;
  priceDescription: string;
  pack: string;
  optionGroup?: string;
  inStock: boolean;
}

const AddMeal = () => {

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [packDialogVisible, setPackDialogVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("")
  const [meals, setMeals] = useState<Meals[]>([])
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddPack, setShowAddPack] = useState(false);
  const [showAddOptionGroup, setShowAddOptionGroup] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false); 
  const [categories, setCategories] = useState<string[]>([])
  const [formData, setFormData] = useState<FormData>({
    category: "",
    mealName: "",
    description: "",
    image: "",
    price: "",
    priceDescription: "",
    pack: "",
    optionGroup: "",
    inStock: false
  }); 

  // const inputRef = useRef<RNTextInput | null>(null)
  const { user } = useAuth()
  const theme = useTheme()



  useEffect(() => {
    fetchMeal()
    const uniqueCategories = [...new Set(meals.map(meal => meal.category))]
    setCategories(uniqueCategories)
  },[user, meals])


  

  const packs = [...new Set(meals.map(meal => meal.pack))]
  

  const createMeal = async () => {

    if (!user) return;
    if (
      !formData.category || 
      !formData.mealName || 
      !formData.description || 
      !formData.price || 
      !formData.priceDescription
    ) {
      setError("Please fill all fields")
      return;
    }

    setError(null)
    try {
      
      await tablesDB.createRow(
        
        DATABASE_ID,
        MEALS_ID,
        ID.unique(),
        {
          user_id: user.$id,
          category: formData.category,
          meal_name: formData.mealName,
          description: formData.description,
          image: formData.image,
          price: formData.price,
          price_description: formData.priceDescription,
          pack: formData.pack,
          option_group: formData.optionGroup,
          in_stock: formData.inStock
        }
      );
      
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

  const fetchMeal = async () => {
    try {
      const response = await tablesDB.listRows(
        DATABASE_ID,
        MEALS_ID
      )
      
      setMeals(response.rows as unknown as Meals[])

    } catch (error) {
      console.error(error);
      
    }
  }

  const clearInputs = () => {
    setFormData((prev: FormData) => ({ 
      ...prev, 
      category: "",
      mealName: "",
      description: "",
      image: "",
      price: "",
      priceDescription: "",
      pack: "",
      optionGroup: "",
      inStock: false
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
              value={formData.mealName}
              onChangeText={(text) =>  
                setFormData((prev: FormData) => ({ ...prev, mealName: text})
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
                value={formData.priceDescription}
                onChangeText={(text) =>  
                  setFormData((prev: FormData) => ({ ...prev, priceDescription: text})
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
              value={formData.optionGroup}
              onChangeText={(text) =>  
                setFormData((prev: FormData) => ({ ...prev, mealName: text})
              )}
              style={styles.input}
            />
          
            <TouchableOpacity onPress={() => setShowAddOptionGroup(true)}> 
              <Text style={styles.addCategory}>+ Add option group</Text>
              {showAddOptionGroup && <AddShowOptionGroup visible={showAddOptionGroup} onClose={() => setShowAddOptionGroup(false)} />}
            </TouchableOpacity>
          </View>

          {/* Switch */}
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30}}>
            <Text variant='titleLarge' style={{fontWeight: "bold"}}>Mark Item in Stock</Text>
            <Switch
              value={formData.inStock}
              onValueChange={(newValue) => 
                setFormData((prev) => ({
                  ...prev,
                  inStock: newValue
                }))
              }
            />
          </View>

          <Button 
            mode='contained'
            buttonColor='#0c513f'
            labelStyle={{fontSize: 18, paddingVertical: 8}}
            style={styles.button}
            onPress={createMeal}
          >
            Add meal to menu
          </Button>
          {error && <Text style={{ marginLeft: 30, color: theme.colors.error }}>{error}</Text> }
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