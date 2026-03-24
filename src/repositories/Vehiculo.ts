import type { Vehiculo } from "../models/vehiculo";
// DEPENDENCIAS PARA LEER ARCHIVOS yaml
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import path from 'path';

export default class VehiculoRepository {
  async select(): Promise<Vehiculo[]> {
    try {
      const filePath = path.resolve(
        process.cwd(),
        'postman',
        'collections',
        'CHETS NUTS FOODS',
        'MOCK SERVER - EXAMPLE',
        'vehículos',
        '.resources',
        'listar vehiculos.resources',
        'examples',
        'ok - listar vehiculos.example.yaml'
      );

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const yamlData = yaml.load(fileContents) as {
        response?: {
          body?: {
            content?: unknown;
          };
        };
      };

      const content = yamlData?.response?.body?.content;

      if (typeof content !== 'string') {
        throw new Error('No se encontro response.body.content como texto en el YAML.');
      }

      const parsedBody = JSON.parse(content) as {
        data?: Array<{
          idvehempresa?: number;
          placa?: string;
          marca?: string;
          modelo?: string;
          anio?: number;
          tipoVehiculo?: string;
          capacidadCarga?: number;
        }>;
      };

      const vehiculos = Array.isArray(parsedBody.data)
        ? parsedBody.data.map((item): Vehiculo => ({
            id: item.idvehempresa ?? 0,
            placa: item.placa ?? '',
            marca: item.marca ?? '',
            modelo: item.modelo ?? '',
            anioFabricacion: item.anio ?? 0,
            tipoVehiculo: item.tipoVehiculo ?? '',
            capacidadCarga: item.capacidadCarga ?? 0,
          }))
        : [];

      return vehiculos;
    } catch (e) {
      console.error("Error leyendo el archivo YAML:", e);
      return [];
    }
  }
}