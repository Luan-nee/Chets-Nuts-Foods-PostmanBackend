import express from "express";
import type { Connection } from "mysql2/promise";
import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const corsOptions = {
  origin: process.env.CORS_DOMINIO_FRONTEND || "http://localhost:5173", // Reemplaza con el origen de tu frontend
};

const PORT = 3001;
const app = express();

app.use(cors(corsOptions)); // 2. Usa el middleware de CORS con las opciones definidas
app.use(express.json());
let connection: Connection;

(async () => {
  try {
    connection = await createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      // Aseguramos que password y database sean strings (mysql2 TS exige string)
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "ChetsNutsFoods", // Usamos la DB por defecto si no está en .env
      port: parseInt(process.env.DB_PORT || "3306", 10),
    });
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
    // Re-lanzar el error original para depuración
    throw error as Error;
  }
})();

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
