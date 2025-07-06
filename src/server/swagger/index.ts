import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";
import environment from "../../environment/environment.js";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Seleccioneitor API",
      version: "1.0.0",
      description: "API para gestión de candidaturas de trabajo",
    },
    servers: [
      {
        url: `http://localhost:${environment.port}`,
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      schemas: {
        Application: {
          type: "object",
          required: [
            "id",
            "positionTitle",
            "company",
            "status",
            "appliedAt",
            "updatedAt",
          ],
          properties: {
            id: {
              type: "integer",
              description: "ID único de la aplicación",
              example: 1,
            },
            positionTitle: {
              type: "string",
              description: "Título del puesto",
              example: "Desarrollador Frontend",
            },
            company: {
              $ref: "#/components/schemas/Company",
            },
            status: {
              type: "string",
              enum: [
                "pending",
                "reviewing",
                "interview_scheduled",
                "interviewed",
                "accepted",
                "rejected",
                "withdrawn",
              ],
              description: "Estado de la aplicación",
              example: "pending",
            },
            coverLetter: {
              type: "string",
              description: "Carta de presentación",
              example: "Estimados señores, me dirijo a ustedes...",
            },
            resumeUrl: {
              type: "string",
              description: "URL del currículum",
              example: "https://drive.google.com/file/d/mi-cv/view",
            },
            expectedSalary: {
              type: "integer",
              description: "Salario esperado en centavos",
              example: 4500000,
            },
            availableStartDate: {
              type: "string",
              format: "date-time",
              description: "Fecha de disponibilidad",
              example: "2025-08-01T00:00:00.000Z",
            },
            appliedAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de solicitud",
              example: "2025-07-05T10:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de última actualización",
              example: "2025-07-05T10:30:00.000Z",
            },
            internalNotes: {
              type: "string",
              description: "Notas internas",
              example: "Recordar mencionar experiencia con React",
            },
          },
        },
        NewApplication: {
          type: "object",
          required: ["positionTitle", "companyId"],
          properties: {
            positionTitle: {
              type: "string",
              description: "Título del puesto",
              example: "Desarrollador Frontend",
            },
            companyId: {
              type: "integer",
              description: "ID de la empresa",
              example: 1,
            },
            status: {
              type: "string",
              enum: [
                "pending",
                "reviewing",
                "interview_scheduled",
                "interviewed",
                "accepted",
                "rejected",
                "withdrawn",
              ],
              description: "Estado de la aplicación",
              example: "pending",
              default: "pending",
            },
            coverLetter: {
              type: "string",
              description: "Carta de presentación",
              example: "Estimados señores, me dirijo a ustedes...",
            },
            resumeUrl: {
              type: "string",
              description: "URL del currículum",
              example: "https://drive.google.com/file/d/mi-cv/view",
            },
            expectedSalary: {
              type: "integer",
              description: "Salario esperado en centavos",
              example: 4500000,
            },
            availableStartDate: {
              type: "string",
              format: "date-time",
              description: "Fecha de disponibilidad",
              example: "2025-08-01T00:00:00.000Z",
            },
            internalNotes: {
              type: "string",
              description: "Notas internas",
              example: "Recordar mencionar experiencia con React",
            },
          },
        },
        Company: {
          type: "object",
          required: ["id", "name"],
          properties: {
            id: {
              type: "integer",
              description: "ID único de la empresa",
              example: 1,
            },
            name: {
              type: "string",
              description: "Nombre de la empresa",
              example: "TechCorp España",
            },
            description: {
              type: "string",
              description: "Descripción de la empresa",
              example: "Empresa líder en tecnología",
            },
            industry: {
              type: "string",
              description: "Industria de la empresa",
              example: "Technology",
            },
            location: {
              type: "string",
              description: "Ubicación de la empresa",
              example: "Madrid, España",
            },
            website: {
              type: "string",
              description: "Sitio web de la empresa",
              example: "https://techcorp.es",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
              example: "2025-07-05T10:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de última actualización",
              example: "2025-07-05T10:30:00.000Z",
            },
          },
        },
        ApplicationsResponse: {
          type: "object",
          required: ["applications", "count"],
          properties: {
            applications: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Application",
              },
              description: "Lista de aplicaciones",
            },
            count: {
              type: "integer",
              description: "Número total de aplicaciones",
              example: 5,
            },
          },
        },
        Error: {
          type: "object",
          required: ["status", "message"],
          properties: {
            status: {
              type: "string",
              example: "error",
            },
            message: {
              type: "string",
              example: "Error message description",
            },
            field: {
              type: "string",
              description:
                "Campo que causó el error (para errores de validación)",
              example: "id",
            },
          },
        },
      },
    },
  },
  apis: ["./src/entities/application/routes/*.ts"],
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
    })
  );
};

export default specs;
