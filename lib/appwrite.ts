import { Account, Client, Databases, TablesDB } from "react-native-appwrite"


export const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!)

export const account = new Account(client)
export const databases = new Databases(client)
export const tablesDB = new TablesDB(client)

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID!
export const CHECKIN_ID = process.env.EXPO_PUBLIC_CHECKIN_TABLE_ID!
export const MEALS_ID = process.env.EXPO_PUBLIC_MEALS_TABLE_ID!
export const ORDER_ID = process.env.EXPO_PUBLIC_ORDER_TABLE_ID!
export const PACK_ID = process.env.EXPO_PUBLIC_PACK_TABLE_ID!
export const ITEMS_ID = process.env.EXPO_PUBLIC_ITEMS_TABLE_ID!
export const PACKITEMS_ID = process.env.EXPO_PUBLIC_PACKITEMS_TABLE_ID!