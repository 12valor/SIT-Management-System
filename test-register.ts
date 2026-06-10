import { registerStudent } from "./src/app/(auth)/signup/student/actions";

async function main() {
  const formData = new FormData();
  formData.append("name", "Test User");
  formData.append("email", "test@tupv.edu.ph");
  formData.append("password", "password123");
  formData.append("confirmPassword", "password123");
  formData.append("course", "T01");

  const result = await registerStudent(formData);
  console.log("Result:", result);
}

main().catch(console.error);
