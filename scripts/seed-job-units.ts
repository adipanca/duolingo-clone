import { and, eq, inArray } from "drizzle-orm";
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

type UnitDef = {
  title: string; // "Unit 1", "Unit 2", "Unit 3" — replaces the existing unit with this title
  description: string;
  order: number;
  lessons: LessonDef[];
};

// Icons sourced from Twemoji (https://github.com/twitter/twemoji, CC-BY 4.0),
// downloaded into /public so the app doesn't depend on an external host.
// Each unit is themed around a different job category so questions don't
// repeat verbatim across units (the old seed reused the same 6 words for
// every unit and every lesson within a unit).
const unitDefs: UnitDef[] = [
  {
    title: "Unit 1",
    description: "Pelajari istilah-istilah pekerjaan kantor",
    order: 1,
    lessons: [
      {
        title: "Staf & Peran Kantor",
        groupA: [
          { word: "manager", meaning: "manajer", icon: "/office-worker.svg" },
          { word: "secretary", meaning: "sekretaris", icon: "/clipboard.svg" },
          { word: "receptionist", meaning: "resepsionis", icon: "/bell.svg" },
        ],
        groupB: [
          { word: "accountant", meaning: "akuntan", icon: "/abacus.svg" },
          { word: "cashier", meaning: "kasir", icon: "/credit-card.svg" },
          { word: "cleaner", meaning: "petugas kebersihan", icon: "/broom.svg" },
        ],
      },
      {
        title: "Rekan & Atasan",
        groupA: [
          { word: "director", meaning: "direktur", icon: "/necktie.svg" },
          { word: "employee", meaning: "karyawan", icon: "/id-card.svg" },
          { word: "intern", meaning: "peserta magang", icon: "/graduation-cap.svg" },
        ],
        groupB: [
          { word: "colleague", meaning: "rekan kerja", icon: "/busts.svg" },
          { word: "client", meaning: "klien", icon: "/handshake.svg" },
          { word: "supervisor", meaning: "atasan", icon: "/announcement.svg" },
        ],
      },
      {
        title: "Dokumen & Rutinitas Kantor",
        groupA: [
          { word: "contract", meaning: "kontrak", icon: "/scroll.svg" },
          { word: "signature", meaning: "tanda tangan", icon: "/writing-hand.svg" },
          { word: "promotion", meaning: "promosi", icon: "/profit.svg" },
        ],
        groupB: [
          { word: "schedule", meaning: "jadwal", icon: "/schedule.svg" },
          { word: "overtime", meaning: "lembur", icon: "/deadline.svg" },
          { word: "resignation", meaning: "pengunduran diri", icon: "/door.svg" },
        ],
      },
    ],
  },
  {
    title: "Unit 2",
    description: "Pelajari istilah-istilah profesi",
    order: 2,
    lessons: [
      {
        title: "Profesi Kesehatan & Pendidikan",
        groupA: [
          { word: "doctor", meaning: "dokter", icon: "/health-worker.svg" },
          { word: "teacher", meaning: "guru", icon: "/teacher.svg" },
          { word: "scientist", meaning: "ilmuwan", icon: "/scientist.svg" },
        ],
        groupB: [
          { word: "farmer", meaning: "petani", icon: "/farmer.svg" },
          { word: "chef", meaning: "koki", icon: "/cook.svg" },
          { word: "artist", meaning: "seniman", icon: "/artist.svg" },
        ],
      },
      {
        title: "Profesi Hukum & Keamanan",
        groupA: [
          { word: "police officer", meaning: "polisi", icon: "/police.svg" },
          { word: "judge", meaning: "hakim", icon: "/judge.svg" },
          { word: "firefighter", meaning: "pemadam kebakaran", icon: "/firefighter.svg" },
        ],
        groupB: [
          { word: "guard", meaning: "penjaga", icon: "/guard.svg" },
          { word: "detective", meaning: "detektif", icon: "/detective.svg" },
          { word: "pilot", meaning: "pilot", icon: "/pilot.svg" },
        ],
      },
      {
        title: "Profesi Kreatif & Layanan",
        groupA: [
          { word: "singer", meaning: "penyanyi", icon: "/singer.svg" },
          { word: "hairdresser", meaning: "penata rambut", icon: "/hairdresser.svg" },
          { word: "astronaut", meaning: "astronot", icon: "/astronaut.svg" },
        ],
        groupB: [
          { word: "banker", meaning: "bankir", icon: "/bank.svg" },
          { word: "entrepreneur", meaning: "pengusaha", icon: "/business.svg" },
          { word: "trainer", meaning: "pelatih", icon: "/training.svg" },
        ],
      },
    ],
  },
  {
    title: "Unit 3",
    description: "Pelajari istilah-istilah pekerjaan teknik",
    order: 3,
    lessons: [
      {
        title: "Teknisi & Insinyur",
        groupA: [
          { word: "mechanic", meaning: "montir", icon: "/mechanic.svg" },
          { word: "engineer", meaning: "insinyur", icon: "/gear.svg" },
          { word: "electrician", meaning: "tukang listrik", icon: "/plug.svg" },
        ],
        groupB: [
          { word: "technician", meaning: "teknisi", icon: "/toolbox.svg" },
          { word: "programmer", meaning: "programmer", icon: "/technologist.svg" },
          { word: "factory worker", meaning: "pekerja pabrik", icon: "/factory-worker.svg" },
        ],
      },
      {
        title: "Industri & Konstruksi",
        groupA: [
          { word: "construction worker", meaning: "pekerja bangunan", icon: "/construction.svg" },
          { word: "machine operator", meaning: "operator mesin", icon: "/factory.svg" },
          { word: "warehouse staff", meaning: "staf gudang", icon: "/warehouse.svg" },
        ],
        groupB: [
          { word: "battery technician", meaning: "teknisi baterai", icon: "/battery.svg" },
          { word: "computer technician", meaning: "teknisi komputer", icon: "/computer.svg" },
          { word: "quality inspector", meaning: "pemeriksa kualitas", icon: "/checkmark.svg" },
        ],
      },
      {
        title: "Alat & Aktivitas Teknik",
        groupA: [
          { word: "repair", meaning: "reparasi", icon: "/wrench.svg" },
          { word: "blueprint", meaning: "cetak biru", icon: "/ruler.svg" },
          { word: "safety helmet", meaning: "helm keselamatan", icon: "/helmet.svg" },
        ],
        groupB: [
          { word: "maintenance", meaning: "perawatan", icon: "/gear.svg" },
          { word: "installation", meaning: "instalasi", icon: "/toolbox.svg" },
          { word: "inspection", meaning: "inspeksi", icon: "/checkmark.svg" },
        ],
      },
    ],
  },
];

const main = async () => {
  try {
    console.log("Seeding job-themed units (replaces existing Unit 1/2/3)");

    const course = await db.query.courses.findFirst({
      where: eq(schema.courses.title, "English"),
    });

    if (!course) {
      throw new Error('English course not found — run "seed-english" first');
    }

    const titles = unitDefs.map((u) => u.title);
    const oldUnits = await db.query.units.findMany({
      // Scoped to this course only — unit titles ("Unit 1", "Unit 2", ...)
      // are not unique across courses (e.g. the Spanish course reuses them).
      where: and(
        eq(schema.units.courseId, course.id),
        inArray(schema.units.title, titles)
      ),
    });

    if (oldUnits.length > 0) {
      console.log(
        `Removing ${oldUnits.length} existing unit(s) (cascades to their lessons/challenges/options/progress): ${oldUnits
          .map((u) => u.title)
          .join(", ")}`
      );
      await db.delete(schema.units).where(
        inArray(
          schema.units.id,
          oldUnits.map((u) => u.id)
        )
      );
    }

    for (const unitDef of unitDefs) {
      const [unit] = await db
        .insert(schema.units)
        .values({
          courseId: course.id,
          title: unitDef.title,
          description: unitDef.description,
          order: unitDef.order,
        })
        .returning();

      const lessons = await db
        .insert(schema.lessons)
        .values(
          unitDef.lessons.map((def, index) => ({
            unitId: unit.id,
            title: def.title,
            order: index + 1,
          }))
        )
        .returning();

      for (let i = 0; i < lessons.length; i++) {
        const lesson = lessons[i];
        const def = unitDef.lessons[i];

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

      console.log(`Seeded "${unitDef.title}" (${unitDef.description})`);
    }

    console.log("Job-themed units seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed job-themed units");
  }
};

void main();
