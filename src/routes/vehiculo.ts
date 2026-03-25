// src/routes/vehiculo.routes.ts
import { Router } from 'express';
import VehiculoController from '../controllers/Vehiculo';

const router = Router();
const vehiculoController = new VehiculoController();

// 1. Rutas específicas PRIMERO
router.get('/', vehiculoController.listar.bind(vehiculoController));
router.get('/:idVehiculo', vehiculoController.detalles.bind(vehiculoController));
router.post('/', vehiculoController.registrar.bind(vehiculoController));
router.patch('/:idVehiculo', vehiculoController.editar.bind(vehiculoController));
router.post('/inhabilitar/:idVehiculo', vehiculoController.inhabilitar.bind(vehiculoController));
export default router;