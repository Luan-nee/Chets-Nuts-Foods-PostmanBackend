import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/Reponses";
import type { ListarVehiculo, DetallesVehiculo, RegistrarVehiculo, EditarVehiculo} from "../models/vehiculo";
import VehiculoService from "../services/Vehiculo";
import YamlConvertJson from "./YamlConvertJson";
import { USEMOCKDATA } from "../config/db.config";

const vehiculoService = new VehiculoService();

export default class VehiculoController extends YamlConvertJson{
  async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if ( !USEMOCKDATA ) {
        const vehiculos = await vehiculoService.select();
        const responseBody: ApiResponse<ListarVehiculo[]> = {
          status: "success",
          message: "Lista de vehículos recuperada exitosamente.",
          data: vehiculos,
        };
        res.status(200).json(responseBody);
      } else {
        const vehiculos = this.convert<ListarVehiculo[]> ([
          'postman',
          'collections',
          'CHETS NUTS FOODS',
          'MOCK SERVER - EXAMPLE',
          'vehículos',
          '.resources',
          'listar vehiculos.resources',
          'examples',
          'ok - listar vehiculos.example.yaml'
        ], (body: any) => {
        if (!Array.isArray(body?.data)) return [];
        return body.data.map((item: any) => ({
            idvehempresa: item.idvehempresa ?? 0,
            placa: item.placa ?? '',
            marca: item.marca ?? '',
            modelo: item.modelo ?? '',
            anioFabricacion: item.anio ?? 0,
            tipoVehiculo: item.tipoVehiculo ?? '',
            capacidadCarga: item.capacidadCarga ?? 0,
          } as ListarVehiculo));
        });
        const responseBody: ApiResponse<ListarVehiculo[]> = {
          status: "success",
          message: "Lista de vehículos recuperada exitosamente.",
          data: vehiculos
        };
        res.status(200).json(responseBody);
      }
    } catch (error) {
      next(error);
    }
  }

  async detalles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if ( !USEMOCKDATA ) {
        // Lógica para obtener detalles de un vehículo específico
      } else {
        const detallesVehiculo = this.convert<DetallesVehiculo, any> ([
          'postman',
          'collections',
          'CHETS NUTS FOODS',
          'MOCK SERVER - EXAMPLE',
          'vehículos',
          '.resources',
          'obtener detalles de un vehiculo.resources',
          'examples',
          'ok - obtener detalles de un vehiculo.example.yaml'
        ], (body: any) => {
        if (!body?.data) return {} as DetallesVehiculo;
        return {
            placa: body.data.placa ?? '',
            marca: body.data.marca ?? '',
            modelo: body.data.modelo ?? '',
            anioFabricacion: body.data.anio ?? 0,
            tipoVehiculo: body.data.tipoVehiculo ?? '',
            capacidadCarga: body.data.capacidadCarga ?? 0,
          } as DetallesVehiculo
        });
        const responseBody: ApiResponse<DetallesVehiculo> = {
          status: "success",
          message: "Detalles del vehículo recuperados exitosamente.",
          data: detallesVehiculo
        };
        res.status(200).json(responseBody);
      }
    } catch (error) {
      next(error);
    }
  }

  async registrar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if ( !USEMOCKDATA ) {
        // Lógica para registrar un nuevo vehículo
      } else {
        const response = this.convert<null, any> ([
          'postman',
          'collections',
          'CHETS NUTS FOODS',
          'MOCK SERVER - EXAMPLE',
          'vehículos',
          '.resources',
          'registrar vehiculo.resources',
          'examples',
          'ok - registrar vehiculo.example.yaml'
        ], (body: any) => {
          return body?.data;
        });
        const responseBody: ApiResponse<null> = {
          status: "success",
          message: "Vehículo registrado exitosamente.",
          data: response
        };
        res.status(200).json(responseBody);
      }
    } catch (error) {
      next(error);
    }
  }

  async editar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if ( !USEMOCKDATA ) {
        // Lógica para editar un vehículo existente
      } else {
        const response = this.convert<null, any> ([
          'postman',
          'collections',
          'CHETS NUTS FOODS',
          'MOCK SERVER - EXAMPLE',
          'vehículos',
          '.resources',
          'editar vehiculo.resources',
          'examples',
          'ok - editar vehiculo.example.yaml'
        ], (body: any) => {
          return body?.data;
        });
        const responseBody: ApiResponse<null> = {
          status: "success",
          message: "Vehículo editado exitosamente.",
          data: response
        };
        res.status(200).json(responseBody);
      }
    } catch (error) {
      next(error);
    }
  }

  async inhabilitar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if ( !USEMOCKDATA ) {
        // Lógica para inhabilitar un vehículo
      } else {
        const response = this.convert<null, any> ([
          'postman',
          'collections',
          'CHETS NUTS FOODS',
          'MOCK SERVER - EXAMPLE',
          'vehículos',
          '.resources',
          'inhabilitar vehiculo.resources',
          'examples',
          'ok - inhabilitar vehiculo.example.yaml'
        ], (body: any) => {
          return body?.data;
        });
        const responseBody: ApiResponse<null> = {
          status: "success",
          message: "Vehículo inhabilitado exitosamente.",
          data: response
        };
        res.status(200).json(responseBody);
      }
    } catch (error) {
      next(error);
    }
  }
}