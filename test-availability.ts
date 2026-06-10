import { checkAvailability } from "./src/app/(auth)/signup/employer/actions";

async function main() {
  const res = await checkAvailability("company", "Test Company");
  console.log("Result:", res);
}

main().catch(console.error);
