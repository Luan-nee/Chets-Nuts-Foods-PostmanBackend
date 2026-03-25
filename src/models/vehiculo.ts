export type Vehiculo = {
  id: number;
  placa: string;
  marca: string;
  modelo: string;
  anioFabricacion: number;
  tipoVehiculo: string;
  capacidadCarga: number;
}

export type ListarVehiculo = Omit<
    Vehiculo, 'id'
  > & {
  idvehempresa: number;
};

export type DetallesVehiculo = Omit< Vehiculo, 'id'>;

export type RegistrarVehiculo = Omit< Vehiculo, 'id'>;

export type EditarVehiculo = Omit< Vehiculo, 'id'>;