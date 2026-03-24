import { db } from "../config/db.config"; 
import type { Vehiculo } from "../models/vehiculo";
import { 
  RowDataPacket, // Para resultados de seleccion 
  ResultSetHeader // Para resultados de inserción, actualización, eliminación
} from "mysql2";

const example: Vehiculo[] = [
  {
    id: 1,
    placa: "ABC-123",
    marca: "Volvo",
    modelo: "FH16",
    anioFabricacion: 2022,
    tipoVehiculo: "Tractor-remolque",
    capacidadCarga: 25000
  },
  {
    id: 2,
    placa: "XYZ-789",
    marca: "Hyundai",
    modelo: "H100",
    anioFabricacion: 2021,
    tipoVehiculo: "Furgón",
    capacidadCarga: 1500
  },
  {
    id: 3,
    placa: "LMN-456",
    marca: "Mercedes-Benz",
    modelo: "Actros",
    anioFabricacion: 2023,
    tipoVehiculo: "Camión de carga pesada",
    capacidadCarga: 18000
  },
  {
    id: 4,
    placa: "PQR-101",
    marca: "Toyota",
    modelo: "Hilux",
    anioFabricacion: 2020,
    tipoVehiculo: "Camioneta Pickup",
    capacidadCarga: 1000
  },
  {
    id: 5,
    placa: "DEF-202",
    marca: "Scania",
    modelo: "R450",
    anioFabricacion: 2019,
    tipoVehiculo: "Cisterna",
    capacidadCarga: 30000
  }
];


export default class VehiculoRepository {
  async select(): Promise<Vehiculo[]> {
    // const query = `SELECT * FROM vehiculo`;
    // const [rows] = await db.query<RowDataPacket[]>(query);
    // return (rows.length === 0 ? null : rows) as Vehiculo[];
    return example;
  }
}