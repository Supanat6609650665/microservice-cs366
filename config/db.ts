
import mysql from 'mysql2/promise'
import { checkENV } from '../config/env'

export const db = mysql.createPool({
  host: checkENV(process.env.DB_HOST),
  user: checkENV(process.env.DB_USER),
  password: checkENV(process.env.DB_PASSWORD),
  database: checkENV(process.env.DB_DATABASE),
});