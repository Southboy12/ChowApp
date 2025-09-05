import { Models } from "react-native-appwrite";


export interface Checkin extends Models.Row {
    user_id: string;
    action: string;
    completed_time: string;
    completed_date: string
}