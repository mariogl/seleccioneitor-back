# Documentación API Swagger

## Generar especificación JSON para Copilot

Para generar un archivo JSON con la especificación completa de la API que puede ser utilizado por Copilot u otras herramientas:

```bash
npm run swagger:generate
```

Este comando:

1. Compila el proyecto TypeScript
2. Ejecuta el script de generación
3. Crea `swagger-spec.json` en la raíz del proyecto

## Usar con Copilot

El archivo `swagger-spec.json` contiene toda la especificación OpenAPI 3.0 de la API, incluyendo:

- **Schemas de datos**: Application, NewApplication, ApplicationsResponse, Error
- **Endpoints documentados**: GET, POST, DELETE para /applications
- **Ejemplos de request/response**
- **Códigos de estado HTTP**
- **Validaciones y tipos de datos**

Puedes proporcionar este archivo a GitHub Copilot para que tenga contexto completo sobre la estructura de tu API.

## Swagger UI

Para acceder a la documentación interactiva:

1. Iniciar el servidor: `npm run start:dev`
2. Abrir: http://localhost:4000/api-docs

## Actualizar documentación

Cuando modifiques los endpoints o schemas:

1. Actualiza las anotaciones JSDoc en `src/entities/application/routes/application.routes.ts`
2. Modifica los schemas en `src/server/swagger/index.ts` si es necesario
3. Regenera el JSON: `npm run swagger:generate`
