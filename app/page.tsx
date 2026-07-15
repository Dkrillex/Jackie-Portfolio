"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Mail, ExternalLink, ChevronRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/contact-form"
import { Navbar } from "@/components/navbar"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { SmoothScroll } from "@/components/smooth-scroll"
import { HeroSection } from "@/components/hero-section"
import {
  AnimatedSection,
  AnimatedCard,
} from "@/components/client-animations"
import { useLanguage } from "@/components/language-provider"
import { siteConfig } from "@/lib/site-config"

const projectImages = [
  { src: "/placeholder.svg?height=240&width=400", alt: "AI Agent" },
  { src: "/placeholder.svg?height=240&width=400", alt: "LLM Fine-tuning Platform" },
  { src: "/placeholder.svg?height=240&width=400", alt: "AIGC Marketing Platform" },
  { src: "/placeholder.svg?height=240&width=400", alt: "AI-Workflow Builder" },
  { src: "/placeholder.svg?height=240&width=400", alt: "AIGC Infinite Canvas" },
  { src: "/placeholder.svg?height=240&width=400", alt: "ALL-ERP System" },
]

const additionalTech = [
  { name: "GPT", className: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40" },
  { name: "Gemini", className: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800 hover:bg-sky-100 dark:hover:bg-sky-900/40" },
  { name: "Claude", className: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/40" },
  { name: "LangChain", className: "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/40" },
  { name: "LlamaIndex", className: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40" },
  { name: "Hugging Face", className: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/40" },
  { name: "Dify", className: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/40" },
  { name: "Coze", className: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900/40" },
  { name: "PostgreSQL", className: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800 hover:bg-sky-100 dark:hover:bg-sky-900/40" },
  { name: "MongoDB", className: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40" },
  { name: "Redis", className: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40" },
  { name: "Docker", className: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40" },
  { name: "REST APIs", className: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40" },
  { name: "WebSocket", className: "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/40" },
]

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      <ScrollIndicator />
      <SmoothScroll />

      <Navbar />
      <HeroSection />

      <section id="about" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden py-20 px-4 scroll-mt-16">
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-200 opacity-25 mix-blend-multiply blur-3xl filter" />
          <div className="absolute bottom-1/3 left-1/3 h-64 w-64 rounded-full bg-blue-200 opacity-25 mix-blend-multiply blur-3xl filter" />
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-10 text-center">{t.about.title}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[auto_1fr] md:gap-12">
            <AnimatedSection direction="left" delay={0.15}>
              <div className="mx-auto md:mx-0 relative h-48 w-48 md:h-56 md:w-56 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-xl ring-4 ring-blue-100 dark:border-gray-800 dark:ring-blue-900/40">
                <Image src="/images/profile.png" alt={t.hero.name} fill className="object-cover" priority />
              </div>
            </AnimatedSection>

            <div className="space-y-8">
              <AnimatedSection direction="right" delay={0.25}>
                <div className="space-y-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300">{t.about.p1}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{t.about.p2}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{t.about.p3}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{t.about.p4}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.35}>
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t.about.expertiseTitle}</h3>
                  <ul className="space-y-2">
                    {t.about.expertise.map((item) => (
                      <li key={item} className="flex items-start group">
                        <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden py-20 px-4 scroll-mt-16">
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-3xl filter" />
          <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-3xl filter" />
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">{t.experience.title}</h2>
          </AnimatedSection>

          <div className="space-y-8">
            {t.experience.items.map((job, index) => (
              <AnimatedSection key={`${job.company}-${job.role}`} delay={0.2 + index * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{job.role}</h3>
                      <p className="text-blue-600 dark:text-blue-500 font-medium">{job.company}</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">{job.period}</p>
                  </div>
                  <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden py-20 px-4 scroll-mt-16">
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="absolute top-1/4 left-1/3 h-64 w-64 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-3xl filter" />
          <div className="absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-3xl filter" />
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">{t.projects.title}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.projects.items.map((project, index) => (
              <AnimatedCard key={project.title} delay={0.2 + index * 0.1}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative rounded-md overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 transform transition-transform duration-500 hover:scale-[1.02]">
                      <Image
                        src={projectImages[index]?.src ?? "/placeholder.svg?height=240&width=400"}
                        alt={projectImages[index]?.alt ?? project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-blue-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{project.body}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-200 transition-colors duration-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full relative overflow-hidden group" disabled>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <span className="relative z-10">{t.projects.viewProject}</span>
                      <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </Button>
                  </CardFooter>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-blue-50/50 py-20 px-4 scroll-mt-16 dark:bg-blue-950/20">
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-blue-200 opacity-25 mix-blend-multiply blur-3xl filter" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-200 opacity-25 mix-blend-multiply blur-3xl filter" />
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">{t.skills.title}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <AnimatedSection direction="up" delay={0.2}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                      <span className="text-blue-600 dark:text-blue-500 text-sm font-bold">AI</span>
                    </span>
                    {t.skills.aiTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {t.skills.ai.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                      <span className="text-blue-600 dark:text-blue-500 text-sm font-bold">DEV</span>
                    </span>
                    {t.skills.devTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {t.skills.dev.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="justify-center py-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection direction="up" delay={0.4}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2">
                      <span className="text-green-600 dark:text-green-300 text-sm font-bold">PLT</span>
                    </span>
                    {t.skills.dataTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {t.skills.data.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="justify-center py-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.5}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-2">
                      <span className="text-orange-600 dark:text-orange-300 text-sm font-bold">OPS</span>
                    </span>
                    {t.skills.opsTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {t.skills.ops.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="justify-center py-2 hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.6}>
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-6">{t.skills.additionalTitle}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {additionalTech.map((tech) => (
                  <Badge
                    key={tech.name}
                    variant="outline"
                    className={`px-4 py-2 text-sm transition-colors ${tech.className}`}
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="education" className="relative flex flex-col justify-center overflow-hidden py-20 px-4 scroll-mt-16">
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-3xl filter" />
          <div className="absolute bottom-1/3 left-1/3 h-64 w-64 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-3xl filter" />
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">{t.education.title}</h2>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.education.certs.map((cert) => (
                <div
                  key={cert.title}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transition-transform duration-300"
                >
                  <h3 className="font-semibold">{cert.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{cert.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section id="contact" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden py-20 px-4 scroll-mt-16">
        <div className="absolute inset-0 z-0" aria-hidden>
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-3xl filter" />
          <div className="absolute bottom-1/3 right-1/3 h-64 w-64 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-3xl filter" />
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8 text-center">{t.contact.title}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">{t.contact.infoTitle}</h3>
                <div className="space-y-4">
                  {siteConfig.email && (
                    <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                      <Mail className="w-5 h-5 text-blue-600 mr-3" />
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  )}
                  {siteConfig.wechat && (
                    <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                      <MessageCircle className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {t.contact.wechat}：{siteConfig.wechat}
                      </span>
                    </div>
                  )}
                  {siteConfig.github && (
                    <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                      <Github className="w-5 h-5 text-blue-600 mr-3" />
                      <a
                        href={siteConfig.github}
                        target="_blank"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                        rel="noreferrer"
                      >
                        {t.contact.github}
                      </a>
                    </div>
                  )}
                  {siteConfig.kaggle && (
                    <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                      <ExternalLink className="w-5 h-5 text-blue-600 mr-3" />
                      <a
                        href={siteConfig.kaggle}
                        target="_blank"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                        rel="noreferrer"
                      >
                        {t.contact.kaggle}
                      </a>
                    </div>
                  )}
                </div>
                <div className="pt-4">
                  <p className="text-gray-700 dark:text-gray-300">{t.contact.note}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-slate-200 bg-white/50 py-12 dark:border-slate-800 dark:bg-slate-950/50">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div>
            <Link href="/" className="text-xl font-bold">
              <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                {t.hero.name}
              </span>
            </Link>
            <p className="mt-2 text-sm text-slate-400">
              © {new Date().getFullYear()} {t.hero.name}. {t.footer.rights}
            </p>
          </div>
          <div className="flex gap-4">
            {siteConfig.wechat && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                title={`${t.contact.wechat}: ${siteConfig.wechat}`}
                onClick={() => navigator.clipboard?.writeText(siteConfig.wechat)}
                className="rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">{t.contact.wechat}</span>
              </Button>
            )}
            {siteConfig.github && (
              <Link href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
            )}
            {siteConfig.kaggle && (
              <Link href={siteConfig.kaggle} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span className="sr-only">Kaggle</span>
                </Button>
              </Link>
            )}
            {siteConfig.email && (
              <Link href={`mailto:${siteConfig.email}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
