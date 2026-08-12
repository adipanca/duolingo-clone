import { auth } from "@clerk/nextjs/server";

import { getCourses, getUserProgress } from "@/db/queries";
import { getLocaleFromCourse, t } from "@/lib/i18n";

import { List } from "./list";

const CoursesPage = async () => {
  await auth.protect();

  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  const locale = getLocaleFromCourse(userProgress?.activeCourse?.title);

  return (
    <div className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="text-2xl font-bold text-neutral-700">
        {t(locale, "languageCourses")}
      </h1>

      <List
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
        locale={locale}
      />
    </div>
  );
};

export default CoursesPage;
