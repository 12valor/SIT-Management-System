export const COURSES = [
  { code: "T01", name: "Automotive Engineering Technology" },
  { code: "T02", name: "Chemical Engineering Technology" },
  { code: "T04", name: "Electrical Engineering Technology" },
  { code: "T05", name: "Electronics Engineering Technology" },
  { code: "T06", name: "Manufacturing Engineering Technology" },
  { code: "T07", name: "HVACR Engineering Technology" },
  { code: "T08", name: "Electromechanical Engineering Technology" },
  { code: "T09", name: "Computer Engineering Technology" },
] as const;

export const COURSE_OPTIONS = COURSES.map(c => c.code);

export type CourseCode = (typeof COURSE_OPTIONS)[number];

export function isCourseCode(value: unknown): value is CourseCode {
  return (
    typeof value === "string" &&
    (COURSE_OPTIONS as readonly string[]).includes(value)
  );
}

export function getCourseName(code: string) {
  return COURSES.find(c => c.code === code)?.name || code;
}
