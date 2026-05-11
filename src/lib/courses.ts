export const COURSE_OPTIONS = [
  "T01",
  "T02",
  "T03",
  "T04",
  "T05",
  "T06",
  "T07",
  "T08",
  "T09",
] as const;

export type CourseCode = (typeof COURSE_OPTIONS)[number];

export function isCourseCode(value: unknown): value is CourseCode {
  return (
    typeof value === "string" &&
    (COURSE_OPTIONS as readonly string[]).includes(value)
  );
}
