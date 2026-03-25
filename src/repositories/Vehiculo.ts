import { db } from "../config/db.config"; 
import { 
  RowDataPacket, // Para resultados de seleccion 
  ResultSetHeader // Para resultados de inserción, actualización, eliminación
} from "mysql2";
import type { Vehiculo } from "../models/vehiculo";

export default class VehiculoRepository {

  async select(): Promise<Vehiculo[]> {
    const query = `SELECT * FROM vehiculo`;
    const [rows] = await db.query<RowDataPacket[]>(query);
    return (rows.length === 0 ? null : rows) as Vehiculo[];
  }
}