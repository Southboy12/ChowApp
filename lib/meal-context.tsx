// src/context/MealContext.tsx
import { Meals } from "@/components/database.type";
import { DATABASE_ID, MEALS_ID, tablesDB } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ID } from "react-native-appwrite";



export type FormData = {
  $id?: string
  category: string;
  meal_name: string;
  description: string;
  image?: string;
  price: string;
  price_description: string;
  pack: string;
  option_group?: string;
  in_stock: boolean;
};

// export type Meals = FormData & { id: string}

type MealContextType = {
  meals: Meals[];
  categories: string[];
  packs: string[];
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  setMeals: (meals: Meals[]) => void;
  fetchMeals: () => Promise<void>;
  upsertMeal: (formData: FormData) => Promise<Meals>;
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

  const upsertMeal = async (formData: FormData): Promise<Meals> => {
    
    if (!user) throw new Error("No user");
    const rowId = formData.$id ?? ID.unique()

    setError(null)

    try {
      setLoading(true);
      const res = await tablesDB.upsertRow(DATABASE_ID, MEALS_ID, rowId, {
        user_id: user.$id,
        category: formData.category,
        meal_name: formData.meal_name,
        description: formData.description,
        image: formData.image,
        price: formData.price,
        price_description: formData.price_description,
        pack: formData.pack,
        option_group: formData.option_group,
        in_stock: formData.in_stock,
      });
      
      setMeals((prev) => {
        const exists = prev.find((m) => m.$id === rowId);
        if (exists) {
            return prev.map((m) =>
                m.$id === rowId ? (res as unknown as Meals) : m
            );
        } else {
            return [...prev, res as unknown as Meals];
        }
      })

      return res as unknown as Meals

    } catch (err) {
      console.error(err);
      setError("Error creating meal");
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
        setMeals,
        fetchMeals,
        clearError,
        setError,
        upsertMeal
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
