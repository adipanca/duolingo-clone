import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding English course");

    const existing = await db.query.courses.findFirst({
      where: eq(schema.courses.title, "English"),
    });

    if (existing) {
      console.log("English course already exists, skipping");
      return;
    }

    // Insert course (additive, does not touch existing courses/progress)
    const [course] = await db
      .insert(schema.courses)
      .values({ title: "English", imageSrc: "/en.svg" })
      .returning();

    // The question/prompt is shown in the learner's known language
    // (Indonesian) and the answer options are in the target language
    // (English) — see app/lesson/quiz.tsx's locale handling, which switches
    // the rest of the app's UI to Indonesian whenever this course is active.
    const units = await db
      .insert(schema.units)
      .values([
        {
          courseId: course.id,
          title: "Unit 1",
          description: "Pelajari dasar-dasar Bahasa Inggris",
          order: 1,
        },
        {
          courseId: course.id,
          title: "Unit 2",
          description: "Pelajari Bahasa Inggris tingkat menengah",
          order: 2,
        },
      ])
      .returning();

    for (const unit of units) {
      const lessons = await db
        .insert(schema.lessons)
        .values([
          { unitId: unit.id, title: "Kata Benda", order: 1 },
          { unitId: unit.id, title: "Kata Kerja", order: 2 },
          { unitId: unit.id, title: "Kata Sifat", order: 3 },
          { unitId: unit.id, title: "Frasa", order: 4 },
          { unitId: unit.id, title: "Kalimat", order: 5 },
        ])
        .returning();

      for (const lesson of lessons) {
        const challenges = await db
          .insert(schema.challenges)
          .values([
            {
              lessonId: lesson.id,
              type: "SELECT",
              question: 'Yang mana yang berarti "pria"?',
              order: 1,
            },
            {
              lessonId: lesson.id,
              type: "SELECT",
              question: 'Yang mana yang berarti "wanita"?',
              order: 2,
            },
            {
              lessonId: lesson.id,
              type: "SELECT",
              question: 'Yang mana yang berarti "anak laki-laki"?',
              order: 3,
            },
            {
              lessonId: lesson.id,
              type: "ASSIST",
              question: '"pria"',
              order: 4,
            },
            {
              lessonId: lesson.id,
              type: "SELECT",
              question: 'Yang mana yang berarti "zombie"?',
              order: 5,
            },
            {
              lessonId: lesson.id,
              type: "SELECT",
              question: 'Yang mana yang berarti "robot"?',
              order: 6,
            },
            {
              lessonId: lesson.id,
              type: "SELECT",
              question: 'Yang mana yang berarti "anak perempuan"?',
              order: 7,
            },
            {
              lessonId: lesson.id,
              type: "ASSIST",
              question: '"zombie"',
              order: 8,
            },
          ])
          .returning();

        for (const challenge of challenges) {
          if (challenge.order === 1) {
            await db.insert(schema.challengeOptions).values([
              { challengeId: challenge.id, correct: true, text: "the man", imageSrc: "/man.svg" },
              { challengeId: challenge.id, correct: false, text: "the woman", imageSrc: "/woman.svg" },
              { challengeId: challenge.id, correct: false, text: "the boy", imageSrc: "/boy.svg" },
            ]);
          }

          if (challenge.order === 2) {
            await db.insert(schema.challengeOptions).values([
              { challengeId: challenge.id, correct: true, text: "the woman", imageSrc: "/woman.svg" },
              { challengeId: challenge.id, correct: false, text: "the boy", imageSrc: "/boy.svg" },
              { challengeId: challenge.id, correct: false, text: "the man", imageSrc: "/man.svg" },
            ]);
          }

          if (challenge.order === 3) {
            await db.insert(schema.challengeOptions).values([
              { challengeId: challenge.id, correct: false, text: "the woman", imageSrc: "/woman.svg" },
              { challengeId: challenge.id, correct: false, text: "the man", imageSrc: "/man.svg" },
              { challengeId: challenge.id, correct: true, text: "the boy", imageSrc: "/boy.svg" },
            ]);
          }

          if (challenge.order === 4) {
            await db.insert(schema.challengeOptions).values([
              { challengeId: challenge.id, correct: false, text: "the woman" },
              { challengeId: challenge.id, correct: true, text: "the man" },
              { challengeId: challenge.id, correct: false, text: "the boy" },
            ]);
          }

          if (challenge.order === 5) {
            await db.insert(schema.challengeOptions).values([
              { challengeId: challenge.id, correct: false, text: "the man", imageSrc: "/man.svg" },
              { challengeId: challenge.id, correct: false, text: "the woman", imageSrc: "/woman.svg" },
              { challengeId: challenge.id, correct: true, text: "the zombie", imageSrc: "/zombie.svg" },
            ]);
          }

          if (challenge.order === 6) {
            await db.insert(schema.challengeOptions).values([
              { challengeId: challenge.id, correct: true, text: "the robot", imageSrc: "/robot.svg" },
              { challengeId: challenge.id, correct: false, text: "the zombie", imageSrc: "/zombie.svg" },
              { challengeId: challenge.id, correct: false, text: "the boy", imageSrc: "/boy.svg" },
            ]);
          }

          if (challenge.order === 7) {
            await db.insert(schema.challengeOptions).values([
              { challengeId: challenge.id, correct: true, text: "the girl", imageSrc: "/girl.svg" },
              { challengeId: challenge.id, correct: false, text: "the zombie", imageSrc: "/zombie.svg" },
              { challengeId: challenge.id, correct: false, text: "the man", imageSrc: "/man.svg" },
            ]);
          }

          if (challenge.order === 8) {
            await db.insert(schema.challengeOptions).values([
              { challengeId: challenge.id, correct: false, text: "the woman" },
              { challengeId: challenge.id, correct: true, text: "the zombie" },
              { challengeId: challenge.id, correct: false, text: "the boy" },
            ]);
          }
        }
      }
    }

    console.log("English course seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed English course");
  }
};

void main();
