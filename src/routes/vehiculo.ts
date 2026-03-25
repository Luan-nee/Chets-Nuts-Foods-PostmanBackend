// src/routes/vehiculo.routes.ts
import { Router } from 'express';
import VehiculoController from '../controllers/Vehiculo';

const router = Router();
const vehiculoController = new VehiculoController();

// 1. Rutas específicas PRIMERO
router.get('/', vehiculoController.listar.bind(vehiculoController));

export default router;