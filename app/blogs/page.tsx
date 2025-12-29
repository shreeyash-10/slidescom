import type { Metadata } from "next"
import { BlogsPage } from "./blogs-page"

export const metadata: Metadata = {
  title: "Slidesop Blog | slidesop Insights",
  description:
    "Practical guides and playbooks for AI slide narration, presentation voiceovers, and explainer workflows.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Slidesop Blog | slidesop Insights",
    description:
      "Practical guides and playbooks for AI slide narration, presentation voiceovers, and explainer workflows.",
    url: "/blogs",
    type: "website",
  },
}

export default function Blogs() {
  return <BlogsPage />
}
