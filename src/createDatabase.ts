import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as mysql from "mysql2/promise";

dotenv.config();

if (!process.env.DB_NAME) {
  console.warn(
    "⚠️  Atención: la variable DB_NAME no está definida en .env. Se usará el valor definido en 'config'."
  );
}

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ChetsNutsFoods",
  port: parseInt(process.env.DB_PORT || "3306", 10),
};

// 3. Ruta al archivo SQL
// Use process.cwd() as project root to avoid import.meta usage in TypeScript configs that don't allow it
const projectRoot = process.cwd();

let connection: mysql.Connection | null = null;

(async () => {
  try {
    try {
      const { database, ...tempConfig } = config;
      // habilitar multipleStatements para permitir ejecutar varios comandos (incluyendo USE)
      connection = await mysql.createConnection({
        ...tempConfig,
        multipleStatements: true,
      });
      console.log("✅ Conexión establecida con MySQL Server.");
    } catch (error) {
      console.error("Error al conectar a MySQL:", error);
      throw error; // Re-lanzar el error para que sea capturado en el bloque externo
    }

    const sqlFilePath = path.join(projectRoot, "sql", "schema.sql");
    const sqlSchema = fs.readFileSync(sqlFilePath, "utf-8");
    readSqlFile(
      //#1
      sqlSchema,
      connection,
      `✅ Base de datos '${config.database}' y tablas creadas exitosamente.`,
      `❌ Error al crear la base de datos o las tablas.`
    );

    /*
      EL SCRIPT PARA LEER LOS ARCHIVOS SQL NO SIRVE PARA CREAR FUNCIONES, PROCEDIMIENTOS 
      ALMACENADOS O VISTAS QUE CONTENGAN DELIMITADORES (como $$) O INSTRUCCIONES COMPLEJAS.
    */
    /*
      const createFunctionsPath = path.join(projectRoot, "sql", "functions.sql");
      const sqlFunctions = fs.readFileSync(createFunctionsPath, "utf-8");
      readSqlFile(
        //#1
        sqlFunctions,
        connection,
        `✅ Funciones en '${config.database}' creadas exitosamente.`,
        `❌ Error al crear las funciones.`
      );
    */

  } catch (error) {
    // Muestra el error de MySQL de forma más legible
    if (error instanceof Error && "sqlMessage" in error) {
      console.error(`\nDetalle del Error SQL: ${error.sqlMessage}`);
    }
  } finally {
    if (connection) {
      connection.end();
      console.log("⚠️ Cerrando la conexión a MySQL.");
    }
  }

  function readSqlFile(
    sql: string,
    connection: mysql.Connection,
    messageOk: string,
    messageError: string
  ) {
    try {
      // **PASO 2: Ejecutar los comandos SQL**
      // Separamos los comandos por punto y coma (;) y los filtramos
      const statements = sql
        .split(";")
        .map((stmt) => stmt.trim())
        .filter((stmt) => stmt.length > 0);

      // Ejecutar todo el script como una sola consulta (mysql2 con multipleStatements)
      try {
        connection.query(sql);
      } catch (err) {
        // Fallback: si por alguna razón falla, ejecutar cada sentencia con query (no prepared)
        for (const statement of statements) {
          if (statement.length === 0) continue;
          connection.query(statement);
        }
      }
      console.log(messageOk);
    } catch (error) {
      console.log(messageError);
    }
  }
})();
