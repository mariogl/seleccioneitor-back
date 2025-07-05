import { Router } from "express";
import { applicationController } from "../controller/application.controller.js";

const applicationRouter = Router();

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Obtener todas las aplicaciones
 *     description: Devuelve una lista de todas las aplicaciones ordenadas por fecha de solicitud (más recientes primero)
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: Lista de aplicaciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationsResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
applicationRouter.get(
  "/",
  applicationController.getAllApplications.bind(applicationController)
);

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Crear una nueva aplicación
 *     description: Crea una nueva candidatura de trabajo
 *     tags:
 *       - Applications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewApplication'
 *     responses:
 *       201:
 *         description: Aplicación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
applicationRouter.post(
  "/",
  applicationController.createApplication.bind(applicationController)
);

/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: Eliminar una aplicación
 *     description: Elimina una candidatura específica por su ID
 *     tags:
 *       - Applications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la aplicación a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Aplicación eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Application deleted successfully"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Aplicación no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
applicationRouter.delete(
  "/:id",
  applicationController.deleteApplication.bind(applicationController)
);

export { applicationRouter };
