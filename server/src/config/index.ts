import dotenv from "dotenv";

dotenv.config();

const { PORT, JWT_SECRET, MONGO_URI } = process.env;

export const port: number = Number(PORT) || 5000;
export const jwtSecret: string = JWT_SECRET || '';
export const mongoUri: string = MONGO_URI || '';
