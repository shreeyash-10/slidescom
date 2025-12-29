"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { useEffect, useState } from "react"

const posts = [
  {
    title: "AI slide narration: a 10 minute workflow for instructors",
    summary:
      "Upload a lecture deck, auto-extract the outline, and generate a clear voiceover per slide. This guide covers pacing, emphasis, and how to add timed pauses for questions.",
    content: [
      "Start by trimming each slide to one idea and a single headline. SlidesOne reads clear structure better than dense paragraphs, so move supporting text into speaker notes and let the narration explain it.",
      "Next, decide your pacing. For lecture slides, aim for 18 to 28 seconds per slide. If a slide needs more time, split it into two and keep the narration crisp. The listener should never feel rushed.",
      "Finally, insert a pause after every section break. A short prompt like \"Take a moment to write this down\" makes the experience feel guided and improves retention without extra editing.",
    ],
    author: "Aaryan Regmi",
    date: "2025-01-05",
    displayDate: "Jan 5, 2025",
    readTime: "6 min read",
    category: "Education",
  },
  {
    title: "Corporate training that scales with slide voiceovers",
    summary:
      "Turn internal decks into consistent training modules with AI narration and slide level checkpoints. Learn how teams keep compliance and onboarding aligned without re-recording audio.",
    content: [
      "Standardize your decks with a single template and define the voice you want the system to use. Consistent phrasing across slides means fewer edits and less confusion for learners.",
      "Use slide level checkpoints at the end of each module. A quick recap slide with a question or summary keeps the narration aligned to the learning goal and makes updates easier.",
      "For compliance training, publish a versioned deck and lock the narration. When policies change, swap only the impacted slides instead of re-recording the entire module.",
    ],
    author: "Shreeyash Kanwade",
    date: "2025-01-08",
    displayDate: "Jan 8, 2025",
    readTime: "7 min read",
    category: "Training",
  },
  {
    title: "Accessible presentations: captions, transcripts, and slide timing",
    summary:
      "Build inclusive learning experiences with auto captions, searchable transcripts, and predictable pacing. We break down the slide by slide workflow for ADA friendly delivery.",
    content: [
      "Accessibility starts with predictable timing. Keep each slide narration under 30 seconds and avoid rapid transitions. The listener should have time to read visuals and listen at the same time.",
      "Generate transcripts for every deck and keep them attached to the slide order. That structure makes the content searchable and helps screen readers follow along.",
      "Caption accuracy improves when you remove filler words. Tightening the narration script also makes the spoken output sound more confident and reduces rework.",
    ],
    author: "Aaryan Regmi",
    date: "2025-01-12",
    displayDate: "Jan 12, 2025",
    readTime: "5 min read",
    category: "Accessibility",
  },
  {
    title: "Optimize slide copy for clear AI narration",
    summary:
      "Well structured slide text leads to better voiceovers and fewer edits. Use these copy patterns to improve clarity, reduce filler words, and keep explanations tight.",
    content: [
      "Write slide titles as verbs, not nouns. \"Compare two approaches\" cues an explanation, while \"Approaches\" often leads to vague narration.",
      "Keep bullets short and parallel. If one bullet is a sentence and another is a word, the pacing becomes uneven and harder to follow.",
      "End each slide with a transition sentence like \"Next, we'll look at…\". It creates a natural bridge between sections and improves flow for listeners.",
    ],
    author: "Shreeyash Kanwade",
    date: "2025-01-15",
    displayDate: "Jan 15, 2025",
    readTime: "6 min read",
    category: "Content",
  },
  {
    title: "From research deck to audio summary in one pass",
    summary:
      "Summarize complex findings with automatic slide narration and a closing recap. Perfect for lab updates, investor briefings, and async research reviews.",
    content: [
      "Start with a three slide summary: problem, method, key result. This gives the narration a backbone and helps listeners orient before the details.",
      "Move tables into appendix slides and narrate the takeaway instead of every number. The goal is clarity, not exhaustive reading.",
      "Close with a recap slide that restates the outcome and what changes as a result. It reinforces the main point and improves recall.",
    ],
    author: "Aaryan Regmi",
    date: "2025-01-18",
    displayDate: "Jan 18, 2025",
    readTime: "5 min read",
    category: "Research",
  },
  {
    title: "Timed pauses and Q and A prompts that improve retention",
    summary:
      "Add natural breaks for questions and knowledge checks while the narration runs. Learn how spacing and prompts raise completion rates in slide based learning.",
    content: [
      "Place pauses after every major concept. A two to three second pause is enough to let a listener think without losing momentum.",
      "Use quick prompts like \"What would you do next?\" or \"Think of an example.\" The narration feels more interactive and less like a one way lecture.",
      "For assessments, add a recap slide after three to five concepts. This creates a rhythm and keeps attention high even in long decks.",
    ],
    author: "Shreeyash Kanwade",
    date: "2025-01-21",
    displayDate: "Jan 21, 2025",
    readTime: "6 min read",
    category: "Learning",
  },
  {
    title: "Product demos from sales decks: faster explainers",
    summary:
      "Convert pitch decks into product walk-throughs with clean narration and slide highlights. This playbook helps sales and marketing teams ship explainers fast.",
    content: [
      "Start with the problem slide and narrate it in one sentence. Then show the product in context on the next slide. The demo should feel like a conversation.",
      "Use short slide callouts instead of long paragraphs. The narration can explain details while the viewer sees a clean visual focus.",
      "End with a single slide that lists the outcomes. That keeps the explainer concise and makes follow up conversations easier for sales teams.",
    ],
    author: "Aaryan Regmi",
    date: "2025-01-24",
    displayDate: "Jan 24, 2025",
    readTime: "6 min read",
    category: "Marketing",
  },
  {
    title: "Building an explainer library with searchable transcripts",
    summary:
      "Transcripts make slide content indexable and easy to repurpose. Learn how to organize explainers for SEO and internal knowledge sharing.",
    content: [
      "Store transcripts in the same order as your slides and include keywords in the opening lines. This helps search engines and internal tools understand the content.",
      "Tag each deck by audience and intent: onboarding, product updates, or training. Clear taxonomy improves discovery and reuse.",
      "When you update a deck, update the transcript, too. Consistency between the audio and text is the key to trustworthy search results.",
    ],
    author: "Shreeyash Kanwade",
    date: "2025-01-27",
    displayDate: "Jan 27, 2025",
    readTime: "5 min read",
    category: "SEO",
  },
  {
    title: "Multilingual slide explainers for global teams",
    summary:
      "Use AI narration to localize presentations across regions without re-recording. Tips on tone matching, glossary control, and review loops.",
    content: [
      "Start with a glossary of product terms and keep it consistent across languages. This avoids awkward translations that confuse international teams.",
      "Match tone to region by choosing a voice that fits local expectations. A neutral tone works well for most business presentations.",
      "Always review a sample of slides with native speakers before rolling out to the full audience. It saves time and avoids costly misunderstandings.",
    ],
    author: "Aaryan Regmi",
    date: "2025-01-30",
    displayDate: "Jan 30, 2025",
    readTime: "7 min read",
    category: "Localization",
  },
  {
    title: "Metrics that matter for narrated presentations",
    summary:
      "Track completion rates, replay segments, and slide drop-offs to improve clarity. Use these analytics to refine narration and slide structure over time.",
    content: [
      "Look at slide drop-off patterns to find confusing sections. If a slide consistently loses listeners, shorten the narration or split the slide.",
      "Replay heatmaps show where viewers seek clarity. Use those signals to add a short clarification slide or a brief recap.",
      "Monitor completion rates by audience. When executives finish a deck but new hires don't, adjust the pacing and simplify the language.",
    ],
    author: "Shreeyash Kanwade",
    date: "2025-02-02",
    displayDate: "Feb 2, 2025",
    readTime: "6 min read",
    category: "Analytics",
  },
]

export function BlogsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#020202"
            colorB="#141414"
            speed={0.7}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#000000"
            upColor="#808080"
            downColor="#0f0f0f"
            leftColor="#4a4a4a"
            rightColor="#5a5a5a"
            intensity={0.95}
            radius={1.6}
            momentum={25}
            maskType="alpha"
            opacity={0.95}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <a href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            <picture className="block h-7 w-7">
              <source srcSet="/1.png" media="(prefers-color-scheme: light)" />
              <img src="/2.png" alt="Slidesop logo" className="h-7 w-7 object-contain" />
            </picture>
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">slidesop</span>
        </a>

        <MagneticButton variant="secondary" onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </MagneticButton>
      </nav>

      <section className="relative z-10 px-6 pb-16 pt-28 md:px-12 md:pb-24 md:pt-32 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-12 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
            <div>
              <h1 className="mb-3 font-sans text-4xl font-light leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                SlidesOne blog
                <br />
                for narrated decks
              </h1>
              <p className="font-mono text-sm text-foreground/60 md:text-base">/ Guides, playbooks, and SEO fuel</p>
            </div>
            <div className="flex items-end">
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Practical writing on AI slide narration, presentation voiceovers, and how to turn decks into clear
                explainers. Every post is written to help your content rank and your slides teach better.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, index) => (
              <article
                key={`${post.title}-${index}`}
                role="button"
                tabIndex={0}
                aria-expanded={expandedIndex === index}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                }}
                className={`group flex h-full cursor-pointer flex-col justify-between rounded-2xl border bg-foreground/5 p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  expandedIndex === index
                    ? "border-foreground/40 bg-foreground/10 shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
                    : "border-foreground/10 hover:border-foreground/30 hover:bg-foreground/10"
                }`}
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground/50">
                      {post.category}
                    </span>
                    <span className="font-mono text-xs text-foreground/40">{post.readTime}</span>
                  </div>
                  <h2 className="mb-3 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-foreground/80 md:text-base">{post.summary}</p>
                  <div
                    className={`overflow-hidden transition-[max-height,opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      expandedIndex === index
                        ? "mt-5 max-h-[800px] translate-y-0 opacity-100"
                        : "max-h-0 -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="space-y-3 text-sm leading-relaxed text-foreground/80 md:text-base">
                      {post.content.map((paragraph, paragraphIndex) => (
                        <p key={`${post.title}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="font-mono text-xs text-foreground/60">{post.author}</span>
                  <time className="font-mono text-xs text-foreground/40" dateTime={post.date}>
                    {post.displayDate}
                  </time>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton variant="primary" size="lg" onClick={() => (window.location.href = "/")}
            >
              Get started
            </MagneticButton>
            <MagneticButton variant="ghost" size="lg" onClick={() => (window.location.href = "/")}
            >
              View product
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  )
}
