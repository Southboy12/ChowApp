// src/context/MealContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { DATABASE_ID, MEALS_ID, tablesDB } from "@/lib/appwrite";
import { ID } from "react-native-appwrite";
import { Meals } from "@/types/database.type";
import { useAuth } from "@/lib/auth-context";

export type FormData = {
  category: string;
  mealName: string;
  description: string;
  image?: string;
  price: string;
  priceDescription: string;
  pack: string;
  optionGroup?: string;
  inStock: boolean;
};

type MealContextType = {
  meals: Meals[];
  categories: string[];
  packs: string[];
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  fetchMeals: () => Promise<void>;
  createMeal: (formData: FormData) => Promise<void>;
  updateMeal: (formData: FormData) => Promise<void>;
  clearError: () => void;
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meals, setMeals] = useState<Meals[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  // Derived values
  const categories = [...new Set(meals.map((meal) => meal.category))];
  const packs = [...new Set(meals.map((meal) => meal.pack))];

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await tablesDB.listRows(DATABASE_ID, MEALS_ID);
      setMeals(response.rows as unknown as Meals[]);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch meals");
    } finally {
      setLoading(false);
    }
  };

  const createMeal = async (formData: FormData) => {

    if (!user) return;

    setError(null)

    try {
      setLoading(true);
      await tablesDB.createRow(DATABASE_ID, MEALS_ID, ID.unique(), {
        user_id: user.$id,
        category: formData.category,
        meal_name: formData.mealName,
        description: formData.description,
        image: formData.image,
        price: formData.price,
        price_description: formData.priceDescription,
        pack: formData.pack,
        option_group: formData.optionGroup,
        in_stock: formData.inStock,
      });

    } catch (err) {
      console.error(err);
      setError("Error creating meal");
    } finally {
      setLoading(false);
    }
  };

  const updateMeal = async (formData: FormData) => {
    if (!user) return;

    try {
        await tablesDB.upsertRow(
            DATABASE_ID, 
            MEALS_ID, 
            ID.unique(),
            {
                formData
            }
        )
    } catch (error) {
        
    }
  }

  const clearError = () => setError(null);

  useEffect(() => {
    fetchMeals();
  }, [user]);

  return (
    <MealContext.Provider
      value={{
        meals,
        categories,
        packs,
        loading,
        error,
        fetchMeals,
        createMeal,
        clearError,
        setError,
        updateMeal
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMeals = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error("useMeals must be used within a MealProvider");
  }
  return context;
};
