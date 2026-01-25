import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT || 3000
export const DB_URI = process.env.DB_URI
export const DB_NAME = process.env.DB_NAME