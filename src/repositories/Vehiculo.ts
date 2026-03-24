import { db } from "../config/db.config"; 
import { 
  RowDataPacket, // Para resultados de seleccion 
  ResultSetHeader // Para resultados de inserción, actualización, eliminación
} from "mysql2";
import YamlConvertJson from "./YamlConvertJson";
import type { Vehiculo } from "../models/vehiculo";
import { USEMOCKDATA } from "../config/db.config";

export default class VehiculoRepository extends YamlConvertJson {

  async select(): Promise<Vehiculo[]> {
    if (!USEMOCKDATA) {
      const query = `SELECT * FROM vehiculo`;
      const [rows] = await db.query<RowDataPacket[]>(query);
      return (rows.length === 0 ? null : rows) as Vehiculo[];
    } else {
      return this.convert<Vehiculo[]> (
        [
          'postman',
          'collections',
          'CHETS NUTS FOODS',
          'MOCK SERVER - EXAMPLE',
          'vehículos',
          '.resources',
          'listar vehiculos.resources',
          'examples',
          'ok - listar vehiculos.example.yaml'
        ], (body: any): Vehiculo[] => {
        if (!Array.isArray(body?.data)) return [];
        return body.data.map((item: any) => ({
          id: item.idvehempresa ?? 0,
          placa: item.placa ?? '',
          marca: item.marca ?? '',
          modelo: item.modelo ?? '',
          anioFabricacion: item.anio ?? 0,
          tipoVehiculo: item.tipoVehiculo ?? '',
          capacidadCarga: item.capacidadCarga ?? 0,
        } as Vehiculo));
      });
    }
  }
}