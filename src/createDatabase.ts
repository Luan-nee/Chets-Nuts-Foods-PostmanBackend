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
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
};

const projectRoot = process.cwd();
let connection: mysql.Connection | null = null;

(async () => {
  try {
    const requiredFields: Array<keyof typeof config> = [
      "host",
      "user",
      "password",
      "database",
      "port",
    ];

    for (const field of requiredFields) {
      if (config[field] === undefined || config[field] === null || config[field] === "") {
        console.error(
          `no se pudo conectar a la base de datos porque se necesita el valor de "${field}".`
        );
        return;
      }
    }

    if (!Number.isInteger(config.port)) {
      console.error(
        '❌ no se pudo conectar a la base de datos porque se necesita el valor de "port".'
      );
      return;
    }

    const connectionConfig: mysql.ConnectionOptions = {
      host: config.host!,
      user: config.user!,
      password: config.password!,
      database: config.database!,
      port: config.port!,
      multipleStatements: true,
    };

    try {
      connection = await mysql.createConnection(connectionConfig);
      console.log("✅ Conexión establecida con MySQL Server.");
    } catch (error) {
      console.error("Error al conectar a MySQL:", error);
      throw error;
    }

    const sqlFilePath = path.join(projectRoot, "src", "sql", "tables.sql");
    const sqlSchema = fs.readFileSync(sqlFilePath, "utf-8");
    await readSqlFile(
      sqlSchema,
      connection,
      `✅ Base de datos '${config.database}' y tablas creadas exitosamente.`,
      `❌ Error al crear la base de datos o las tablas.`
    );
  } catch (error) {
    // Muestra el error de MySQL de forma más legible
    if (error instanceof Error && "sqlMessage" in error) {
      console.error(`\nDetalle del Error SQL: ${error.sqlMessage}`);
    } else {
      console.error("Error inesperado al crear la base de datos:", error);
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log("⚠️ Cerrando la conexión a MySQL.");
    }
  }

  async function readSqlFile(
    sql: string,
    connection: mysql.Connection,
    messageOk: string,
    messageError: string
  ) {
    try {
      await connection.query(sql);
      console.log(messageOk);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      console.log(messageError);
    }
  }
})();
