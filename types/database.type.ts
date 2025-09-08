import { Models } from "react-native-appwrite";


export interface Checkin extends Models.Row {
    user_id: string;
    action: string;
    completed_time: string;
    completed_date: string
}

export interface Meals extends Models.Row {
    user_id: string;
    category: string;
    meal_name: string;
    description: string;
    image?: string;
    price: string;
    price_description: string;
    pack: string;
    open_group?: string;
    in_stock?: boolean;
}