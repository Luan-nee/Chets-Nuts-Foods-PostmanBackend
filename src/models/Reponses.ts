// src/models/api-response.model.ts

/**
 * Interfaz para estandarizar todas las respuestas exitosas de la API.
 * @template T El tipo de datos contenidos en el campo 'info'.
 */
export interface ApiResponse<T> {
  status: string; // Success, error o warning
  message: string;
  data: T | null; // Puede ser un objeto, un array de objetos, o null/undefined.
}

/**
 * Interfaz para estandarizar todas las respuestas exitosas de la API.
 * @template T El tipo de datos contenidos en el campo 'info'.
 */
export type ApiResponseWithPagination<T> = ApiResponse<T> & {
  pagination: {
      total_data: number;
      total_paginas: number;
      pagina_actual: number;
      datos_por_pagina: number;
  }
};

/**
 * Interfaz para estandarizar las respuestas de error.
 */
export interface ApiErrorResponse {
  status: string; // 'error' o 'warning'
  message: string;
  // 'data' puede omitirse o ser un objeto de detalles de error.
}
