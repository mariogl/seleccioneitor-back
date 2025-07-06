import { Router } from "express";
import { companyController } from "../controller/company.controller.js";

const companyRouter = Router();

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Crear una nueva empresa
 *     description: Crea una nueva empresa en el sistema
 *     tags:
 *       - Companies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la empresa
 *                 example: "TechCorp España"
 *               description:
 *                 type: string
 *                 description: Descripción de la empresa
 *                 example: "Empresa líder en desarrollo de software"
 *               website:
 *                 type: string
 *                 description: Sitio web de la empresa
 *                 example: "https://techcorp.es"
 *               location:
 *                 type: string
 *                 description: Ubicación de la empresa
 *                 example: "Madrid, España"
 *               email:
 *                 type: string
 *                 description: Email de contacto
 *                 example: "rrhh@techcorp.es"
 *               phone:
 *                 type: string
 *                 description: Teléfono de contacto
 *                 example: "+34 910 123 456"
 *               notes:
 *                 type: string
 *                 description: Notas internas
 *                 example: "Empresa con buen ambiente de trabajo"
 *     responses:
 *       201:
 *         description: Empresa creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       400:
 *         description: Error de validación
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
companyRouter.post(
  "/",
  companyController.createCompany.bind(companyController)
);

export default companyRouter;
