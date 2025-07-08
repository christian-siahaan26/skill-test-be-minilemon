import { Express } from "express";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";

const swaggerUICss =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

export function setupSwagger(app: Express) {
  const swaggerFilePath = path.join(process.cwd(), "src/docs/swagger.json");
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));

  const options = {
    customCssUrl: '/swagger-ui/swagger-ui.css',
    customJs: [
      '/swagger-ui/swagger-ui-bundle.js',
      '/swagger-ui/swagger-ui-standalone-preset.js'
    ],
  };
  
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );

  console.log("📚 Swagger docs available at /api-docs");
}
