export type Locale = "en" | "id";

/**
 * The app's UI locale is derived from the user's active course: learners who
 * picked "English" already know Indonesian and are learning English, so the
 * chrome around the lessons (buttons, captions, modals) switches to
 * Indonesian for them. Every other course keeps the default English chrome.
 */
export const getLocaleFromCourse = (courseTitle?: string | null): Locale =>
  courseTitle === "English" ? "id" : "en";

const dictionaries = {
  en: {
    learn: "Learn",
    leaderboard: "Leaderboard",
    quests: "Quests",
    shop: "Shop",
    continue: "Continue",
    start: "Start",
    languageCourses: "Language Courses",
    leaderboardHeading: "Leaderboard",
    leaderboardSubtitle:
      "See where you stand among other learners in the community.",
    questsHeading: "Quests",
    questsSubtitle: "Complete quests by earning points.",
    shopHeading: "Shop",
    shopSubtitle: "Spend your points on cool stuff.",
    refillHearts: "Refill hearts",
    full: "full",
    unlimitedHearts: "Unlimited hearts",
    settings: "settings",
    upgrade: "upgrade",
    somethingWentWrong: "Something went wrong.",
    somethingWentWrongRetry: "Something went wrong. Please try again.",
    redirectingToCheckout: "Redirecting to checkout...",
    upgradeToPro: "Upgrade to Pro",
    getUnlimitedHeartsAndMore: "Get unlimited hearts and more!",
    upgradeTodayCta: "Upgrade today",
    viewAll: "View all",
    exitTitle: "Wait, don't go!",
    exitDescription: "You're about to leave the lesson. Are you sure?",
    keepLearning: "Keep learning",
    endSession: "End session",
    outOfHeartsTitle: "You ran out of hearts!",
    outOfHeartsDescription:
      "Get Pro for unlimited hearts, or purchase them in the store.",
    getUnlimitedHeartsCta: "Get unlimited hearts",
    noThanks: "No thanks",
    practiceLessonTitle: "Practice lesson",
    practiceLessonDescription:
      "Use practice lessons to regain hearts and points. You cannot loose hearts or points in practice lessons.",
    iUnderstand: "I understand",
    nicelyDone: "Nicely done!",
    tryAgain: "Try again.",
    practiceAgain: "Practice again",
    check: "Check",
    next: "Next",
    retry: "Retry",
    heartsLeft: "Hears Left",
    totalXp: "Total XP",
    selectCorrectMeaning: "Select the correct meaning",
    lessonCompleteTitle: "Great job!",
    lessonCompleteSubtitle: "You've completed the lesson.",
  },
  id: {
    learn: "Belajar",
    leaderboard: "Peringkat",
    quests: "Misi",
    shop: "Toko",
    continue: "Lanjutkan",
    start: "Mulai",
    languageCourses: "Kursus Bahasa",
    leaderboardHeading: "Peringkat",
    leaderboardSubtitle:
      "Lihat posisi kamu di antara pembelajar lain di komunitas.",
    questsHeading: "Misi",
    questsSubtitle: "Selesaikan misi dengan mengumpulkan poin.",
    shopHeading: "Toko",
    shopSubtitle: "Belanjakan poin kamu untuk barang-barang keren.",
    refillHearts: "Isi ulang hati",
    full: "penuh",
    unlimitedHearts: "Hati tak terbatas",
    settings: "pengaturan",
    upgrade: "tingkatkan",
    somethingWentWrong: "Terjadi kesalahan.",
    somethingWentWrongRetry: "Terjadi kesalahan. Silakan coba lagi.",
    redirectingToCheckout: "Mengalihkan ke checkout...",
    upgradeToPro: "Tingkatkan ke Pro",
    getUnlimitedHeartsAndMore: "Dapatkan hati tak terbatas dan lainnya!",
    upgradeTodayCta: "Tingkatkan sekarang",
    viewAll: "Lihat semua",
    exitTitle: "Tunggu, jangan pergi!",
    exitDescription: "Kamu akan meninggalkan pelajaran ini. Yakin?",
    keepLearning: "Lanjut belajar",
    endSession: "Akhiri sesi",
    outOfHeartsTitle: "Hati kamu habis!",
    outOfHeartsDescription:
      "Dapatkan Pro untuk hati tak terbatas, atau beli di toko.",
    getUnlimitedHeartsCta: "Dapatkan hati tak terbatas",
    noThanks: "Tidak, terima kasih",
    practiceLessonTitle: "Latihan pelajaran",
    practiceLessonDescription:
      "Gunakan pelajaran latihan untuk mendapatkan kembali hati dan poin. Kamu tidak akan kehilangan hati atau poin di pelajaran latihan.",
    iUnderstand: "Saya mengerti",
    nicelyDone: "Kerja bagus!",
    tryAgain: "Coba lagi.",
    practiceAgain: "Latihan lagi",
    check: "Periksa",
    next: "Lanjut",
    retry: "Ulangi",
    heartsLeft: "Sisa Hati",
    totalXp: "Total XP",
    selectCorrectMeaning: "Pilih arti yang benar",
    lessonCompleteTitle: "Kerja bagus!",
    lessonCompleteSubtitle: "Kamu telah menyelesaikan pelajaran.",
  },
} as const;

export type TranslationKey = keyof typeof dictionaries.en;

export const t = (locale: Locale, key: TranslationKey): string =>
  dictionaries[locale][key];

export const questTitle = (value: number, locale: Locale): string =>
  locale === "id" ? `Dapatkan ${value} XP` : `Earn ${value} XP`;
