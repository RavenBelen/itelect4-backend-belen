import "dotenv/config";
import { reviewProject } from "./ai/gemini";

async function main() {
  const result = await reviewProject(
    "Betta Manager tracks betta fish and aquarium care. The tank is heated and filtered, and the owner checks the water regularly."
  );

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error: unknown) => {
  console.error("Gemini test failed:", error);
  process.exit(1);
});