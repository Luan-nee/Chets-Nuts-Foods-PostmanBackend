import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/Reponses";
import type { Vehiculo } from "../models/vehiculo";
import VehiculoService from "../services/Vehiculo";

const vehiculoService = new VehiculoService();

export default class VehiculoController {
  async listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vehiculos = await vehiculoService.select();
      const responseBody: ApiResponse<Vehiculo[] | null> = {
        status: "success",
        message: "Lista de vehículos recuperada exitosamente.",
        info: vehiculos,
      };
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  }
}