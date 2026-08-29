import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL);

const db = drizzle(sql, { schema });

type Word = { word: string; meaning: string; icon: string };

type LessonDef = {
  title: string;
  groupA: [Word, Word, Word];
  groupB: [Word, Word, Word];
};

// Icons sourced from Twemoji (https://github.com/twitter/twemoji, CC-BY 4.0),
// downloaded into /public so the app doesn't depend on an external host.
const lessonDefs: LessonDef[] = [
  {
    title: "Peralatan Kantor",
    groupA: [
      { word: "computer", meaning: "komputer", icon: "/computer.svg" },
      { word: "telephone", meaning: "telepon", icon: "/telephone.svg" },
      { word: "fax", meaning: "mesin faks", icon: "/fax.svg" },
    ],
    groupB: [
      { word: "calendar", meaning: "kalender", icon: "/calendar.svg" },
      { word: "paperclip", meaning: "klip kertas", icon: "/paperclip.svg" },
      { word: "clipboard", meaning: "papan jepit", icon: "/clipboard.svg" },
    ],
  },
  {
    title: "Dokumen & Tulisan",
    groupA: [
      { word: "memo", meaning: "memo", icon: "/memo.svg" },
      { word: "file", meaning: "berkas", icon: "/file.svg" },
      { word: "folder", meaning: "folder", icon: "/folder.svg" },
    ],
    groupB: [
      { word: "report", meaning: "laporan", icon: "/report.svg" },
      { word: "receipt", meaning: "kwitansi", icon: "/receipt.svg" },
      { word: "note", meaning: "catatan", icon: "/note.svg" },
    ],
  },
  {
    title: "Uang & Bisnis",
    groupA: [
      { word: "money", meaning: "uang", icon: "/money.svg" },
      { word: "salary", meaning: "gaji", icon: "/salary.svg" },
      { word: "statistics", meaning: "statistik", icon: "/statistics.svg" },
    ],
    groupB: [
      { word: "bank", meaning: "bank", icon: "/bank.svg" },
      { word: "profit", meaning: "keuntungan", icon: "/profit.svg" },
      { word: "business", meaning: "bisnis", icon: "/business.svg" },
    ],
  },
  {
    title: "Tempat Kerja",
    groupA: [
      { word: "office", meaning: "kantor", icon: "/office.svg" },
      { word: "factory", meaning: "pabrik", icon: "/factory.svg" },
      { word: "warehouse", meaning: "gudang", icon: "/warehouse.svg" },
    ],
    groupB: [
      { word: "door", meaning: "pintu", icon: "/door.svg" },
      { word: "chair", meaning: "kursi", icon: "/chair.svg" },
      { word: "training", meaning: "pelatihan", icon: "/training.svg" },
    ],
  },
  {
    title: "Waktu & Aktivitas Kerja",
    groupA: [
      { word: "meeting", meaning: "rapat", icon: "/meeting.svg" },
      { word: "deadline", meaning: "tenggat waktu", icon: "/deadline.svg" },
      { word: "schedule", meaning: "jadwal", icon: "/schedule.svg" },
    ],
    groupB: [
      { word: "email", meaning: "email", icon: "/email.svg" },
      { word: "announcement", meaning: "pengumuman", icon: "/announcement.svg" },
      { word: "target", meaning: "target", icon: "/target.svg" },
    ],
  },
];

const main = async () => {
  try {
    console.log("Seeding workplace terminology unit");

    const course = await db.query.courses.findFirst({
      where: eq(schema.courses.title, "English"),
    });

    if (!course) {
      throw new Error('English course not found — run "seed-english" first');
    }

    const existing = await db.query.units.findFirst({
      where: eq(schema.units.title, "Unit 3"),
    });

    if (existing) {
      console.log("Unit 3 already exists, skipping");
      return;
    }

    // Insert unit (additive, does not touch existing units/progress)
    const [unit] = await db
      .insert(schema.units)
      .values({
        courseId: course.id,
        title: "Unit 3",
        description: "Pelajari istilah-istilah dalam dunia pekerjaan",
        order: 3,
      })
      .returning();

    const lessons = await db
      .insert(schema.lessons)
      .values(
        lessonDefs.map((def, index) => ({
          unitId: unit.id,
          title: def.title,
          order: index + 1,
        }))
      )
      .returning();

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      const def = lessonDefs[i];

      const challenges = await db
        .insert(schema.challenges)
        .values([
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: `Yang mana yang berarti "${def.groupA[0].meaning}"?`,
            order: 1,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: `Yang mana yang berarti "${def.groupA[1].meaning}"?`,
            order: 2,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: `Yang mana yang berarti "${def.groupA[2].meaning}"?`,
            order: 3,
          },
          {
            lessonId: lesson.id,
            type: "ASSIST",
            question: `"${def.groupA[0].word}"`,
            order: 4,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: `Yang mana yang berarti "${def.groupB[0].meaning}"?`,
            order: 5,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: `Yang mana yang berarti "${def.groupB[1].meaning}"?`,
            order: 6,
          },
          {
            lessonId: lesson.id,
            type: "SELECT",
            question: `Yang mana yang berarti "${def.groupB[2].meaning}"?`,
            order: 7,
          },
          {
            lessonId: lesson.id,
            type: "ASSIST",
            question: `"${def.groupB[0].word}"`,
            order: 8,
          },
        ])
        .returning();

      for (const challenge of challenges) {
        const inGroupA = challenge.order <= 4;
        const group = inGroupA ? def.groupA : def.groupB;
        const isAssist = challenge.order === 4 || challenge.order === 8;
        const targetIndex = isAssist
          ? 0
          : inGroupA
            ? challenge.order - 1
            : challenge.order - 5;

        await db.insert(schema.challengeOptions).values(
          group.map((w, index) => ({
            challengeId: challenge.id,
            correct: index === targetIndex,
            text: `the ${w.word}`,
            imageSrc: isAssist ? undefined : w.icon,
          }))
        );
      }
    }

    console.log("Workplace terminology unit seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed workplace terminology unit");
  }
};

void main();
