import type { ListarVehiculo, Vehiculo } from "../models/vehiculo";
import VehiculoRepository from "../repositories/Vehiculo";

const vehiculoRepository = new VehiculoRepository();

export default class VehiculoService {
  async select(): Promise<ListarVehiculo[] | null> {
    const vehiculos = await vehiculoRepository.select();
    // LÓGICA DE NEGOCIO
    // ...

    // MANEJO DE ERRORES
    // ...

    const transformData = vehiculos.map((vehiculo: Vehiculo) => ({
      idvehempresa: vehiculo.id,
      placa: vehiculo.placa,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      anioFabricacion: vehiculo.anioFabricacion,
      tipoVehiculo: vehiculo.tipoVehiculo,
      capacidadCarga: vehiculo.capacidadCarga
    } as ListarVehiculo));

    if (!vehiculos) {
      const error: any = new Error(`No hay vehiculos.`);
      error.status = 204;
      throw error;
    }
    return transformData;
  }
}