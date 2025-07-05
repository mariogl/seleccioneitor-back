import fs from "fs";
import path from "path";
import specs from "../server/swagger/index.js";

const generateSwaggerJson = () => {
  const outputPath = path.join(process.cwd(), "swagger-spec.json");

  try {
    fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));
    console.log(`✅ Swagger JSON generated successfully at: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error generating Swagger JSON:", error);
    process.exit(1);
  }
};

generateSwaggerJson();
