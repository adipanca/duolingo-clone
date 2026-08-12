import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
  name: "Lingo",
  short_name: "Lingo",
  description:
    "Interactive platform for language learning with lessons, quizzes, and progress tracking.",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#6366F1",
  icons: [
    {
      src: "/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
  ],
});

export default manifest;
