import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql, { schema });

// Base-language (Indonesian) prompts for each vocab word, keyed by the
// English word the challenge options teach. Matches the pattern used by the
// Spanish course, but flipped: the question/prompt is shown in the
// learner's known language (Indonesian) and the answer options are in the
// target language (English).
const NOUN_ID: Record<string, string> = {
  "the man": "pria",
  "the woman": "wanita",
  "the boy": "anak laki-laki",
  "the zombie": "zombie",
  "the robot": "robot",
  "the girl": "anak perempuan",
};

const UNIT_DESCRIPTIONS_ID = [
  "Pelajari dasar-dasar Bahasa Inggris",
  "Pelajari Bahasa Inggris tingkat menengah",
];

const LESSON_TITLES_ID: Record<string, string> = {
  Nouns: "Kata Benda",
  Verbs: "Kata Kerja",
  Adjectives: "Kata Sifat",
  Phrases: "Frasa",
  Sentences: "Kalimat",
};

const CHALLENGE_QUESTIONS_ID: Record<number, (word: string) => string> = {
  1: (word) => `Yang mana yang berarti "${NOUN_ID[word]}"?`,
  2: (word) => `Yang mana yang berarti "${NOUN_ID[word]}"?`,
  3: (word) => `Yang mana yang berarti "${NOUN_ID[word]}"?`,
  4: (word) => `"${NOUN_ID[word]}"`,
  5: (word) => `Yang mana yang berarti "${NOUN_ID[word]}"?`,
  6: (word) => `Yang mana yang berarti "${NOUN_ID[word]}"?`,
  7: (word) => `Yang mana yang berarti "${NOUN_ID[word]}"?`,
  8: (word) => `"${NOUN_ID[word]}"`,
};

// order -> the English word the challenge is about (matches scripts/seed-english.ts)
const CHALLENGE_WORD_BY_ORDER: Record<number, string> = {
  1: "the man",
  2: "the woman",
  3: "the boy",
  4: "the man",
  5: "the zombie",
  6: "the robot",
  7: "the girl",
  8: "the zombie",
};

const main = async () => {
  try {
    console.log("Translating English course content to Indonesian");

    const course = await db.query.courses.findFirst({
      where: eq(schema.courses.title, "English"),
      with: {
        units: {
          orderBy: (units, { asc }) => [asc(units.order)],
          with: {
            lessons: {
              orderBy: (lessons, { asc }) => [asc(lessons.order)],
              with: { challenges: true },
            },
          },
        },
      },
    });

    if (!course) {
      console.log('No "English" course found, nothing to do');
      return;
    }

    for (const unit of course.units) {
      const description = UNIT_DESCRIPTIONS_ID[unit.order - 1];

      if (description) {
        await db
          .update(schema.units)
          .set({ description })
          .where(eq(schema.units.id, unit.id));
      }

      for (const lesson of unit.lessons) {
        const title = LESSON_TITLES_ID[lesson.title];

        if (title) {
          await db
            .update(schema.lessons)
            .set({ title })
            .where(eq(schema.lessons.id, lesson.id));
        }

        for (const challenge of lesson.challenges) {
          const word = CHALLENGE_WORD_BY_ORDER[challenge.order];
          const buildQuestion = CHALLENGE_QUESTIONS_ID[challenge.order];

          if (word && buildQuestion) {
            await db
              .update(schema.challenges)
              .set({ question: buildQuestion(word) })
              .where(eq(schema.challenges.id, challenge.id));
          }
        }
      }
    }

    console.log("English course content translated successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to translate English course content");
  }
};

void main();
