import { Suspense } from "react";
import { StudentLoginForm } from "./StudentLoginForm";

export default function StudentLoginPage() {
  return (
    <Suspense>
      <StudentLoginForm />
    </Suspense>
  );
}
