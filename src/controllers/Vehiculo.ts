import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/Reponses";
import type { Vehiculo } from "../models/vehiculo";
import VehiculoService from "../services/Vehiculo";
import YamlConvertJson from "./YamlConvertJson";
import { USEMOCKDATA } from "../config/db.config";

const vehiculoService = new VehiculoService();

export default class VehiculoController extends YamlConvertJson{
  async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if ( !USEMOCKDATA ) {
        const vehiculos = await vehiculoService.select();
        const responseBody: ApiResponse<Vehiculo[] | null> = {
          status: "success",
          message: "Lista de vehículos recuperada exitosamente.",
          info: vehiculos,
        };
        res.status(200).json(responseBody);
      } else {
        const vehiculos = this.convert<Vehiculo[]> ([
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
        const responseBody: ApiResponse<Vehiculo[] | null> = {
          status: "success",
          message: "Lista de vehículos recuperada exitosamente.",
          data: vehiculos.map((item: Vehiculo) => ({
            idvehempresa: item.id,
            placa: item.placa,
            marca: item.marca,
            modelo: item.modelo,
            anioFabricacion: item.anioFabricacion,
            tipoVehiculo: item.tipoVehiculo,
            capacidadCarga: item.capacidadCarga
          })),
        };
        res.status(200).json(responseBody);
      }
    } catch (error) {
      next(error);
    }
  }
}