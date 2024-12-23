import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
export const dburl = process.env.MONGO_URL