import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

type Yaml = {
  response: {
    body: {
      content: unknown;
    };
  };
}

/**
 * Lee un archivo YAML y lo transforma dinámicamente.
 * @param pathSegments Fragmentos de la ruta (ej: 'postman', 'collections', 'archivo.yaml')
 * @param mapper Función opcional para transformar el JSON parseado al formato deseado
 */

export default class YamlConvertJson {
  public convert = <T, R = any>(
    pathSegments: string[],
    mapper?: (data: R) => T
  ): T => {
    try {
      const filePath = path.resolve(process.cwd(), ...pathSegments);
      
      if (!fs.existsSync(filePath)) {
        throw new Error(`El archivo no existe en la ruta: ${filePath}`);
      }

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const yamlData = yaml.load(fileContents) as Yaml;

      // Extraemos el contenido del body (según tu estructura de Postman)
      const content = yamlData?.response.body.content;

      if (typeof content !== 'string') {
        throw new Error('No se encontró "response.body.content" como string en el YAML.');
      }

      const parsedBody = JSON.parse(content);

      // Si hay un mapper, transformamos los datos; si no, devolvemos el parseo directo
      return mapper ? mapper(parsedBody) : (parsedBody as T);
    } catch (error) {
      console.error("Error leyendo YAML:", error);
      throw error;
    }
  };
}