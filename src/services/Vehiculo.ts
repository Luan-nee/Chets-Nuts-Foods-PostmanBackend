import type { Vehiculo } from "../models/vehiculo";
import VehiculoRepository from "../repositories/Vehiculo";

const vehiculoRepository = new VehiculoRepository();

export default class VehiculoService {
  async select(): Promise<Vehiculo[] | null> {
    const vehiculos = await vehiculoRepository.select();
    // LÓGICA DE NEGOCIO
    // ...
    
    if (!vehiculos) {
      const error: any = new Error(`No hay vehiculos.`);
      error.status = 204;
      throw error;
    }
    return vehiculos;
  }
}