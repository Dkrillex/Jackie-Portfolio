"use client"

import Link from "next/link"
import { Github, Mail, ExternalLink, ArrowRight, ArrowDown, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClientMotion } from "@/components/client-animations"
import { useLanguage } from "@/components/language-provider"
import { NeuralNetworkGraphic } from "@/components/neural-network-graphic"
import { siteConfig } from "@/lib/site-config"

export function HeroSection() {
  const { t } = useLanguage()

  const socials = [
    { href: siteConfig.github, icon: Github, label: "GitHub", external: true },
    {
      href: siteConfig.wechat ? "wechat" : "",
      icon: MessageCircle,
      label: `${t.contact.wechat}: ${siteConfig.wechat}`,
      external: false,
      copyText: siteConfig.wechat,
    },
    { href: siteConfig.kaggle, icon: ExternalLink, label: "Kaggle", external: true },
    {
      href: siteConfig.email ? `mailto:${siteConfig.email}` : "",
      icon: Mail,
      label: "Email",
      external: false,
    },
  ].filter((s) => s.href)

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 pt-16 scroll-mt-16">
      <div className="absolute inset-0 z-0" aria-hidden>
        <div className="absolute top-20 left-10 h-72 w-72 animate-blob rounded-full bg-blue-200 opacity-40 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-2000 absolute top-40 right-10 h-72 w-72 animate-blob rounded-full bg-blue-200 opacity-40 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-4000 absolute bottom-20 left-1/3 h-72 w-72 animate-blob rounded-full bg-blue-100 opacity-40 mix-blend-multiply blur-3xl filter" />
      </div>

      <div className="container relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 py-12 lg:grid-cols-2">
        <div className="space-y-6 text-left">
          <ClientMotion initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-block">
              <div className="relative mb-2 mt-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm font-medium text-slate-600 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
                <span className="relative z-10">{t.hero.eyebrow}</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-300/20 animate-pulse" />
              </div>
            </div>
          </ClientMotion>

          <ClientMotion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <span className="block text-slate-800 dark:text-slate-100">{t.hero.greeting}</span>
              <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                {t.hero.name}
              </span>
            </h1>
          </ClientMotion>

          <ClientMotion
            className="max-w-[600px] text-xl text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {t.hero.description}
          </ClientMotion>

          <ClientMotion
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button
              asChild
              className="group relative overflow-hidden border-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white"
            >
              <Link href="#projects">
                <span className="relative z-10 flex items-center">
                  {t.hero.viewProjects}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-300 bg-white/60 text-blue-600 hover:border-blue-400 hover:text-blue-700 dark:border-slate-600 dark:bg-slate-900/40 dark:text-blue-400 dark:hover:border-blue-500"
            >
              <Link href="#contact">{t.hero.getInTouch}</Link>
            </Button>
          </ClientMotion>

          <ClientMotion
            className="flex gap-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            {socials.map(({ href, icon: Icon, label, copyText, external }) =>
              copyText ? (
                <Button
                  key={label}
                  type="button"
                  variant="ghost"
                  size="icon"
                  title={label}
                  onClick={() => navigator.clipboard?.writeText(copyText)}
                  className="rounded-full border border-slate-200 bg-white/80 text-slate-500 shadow-sm hover:bg-white hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Button>
              ) : (
                <Link
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full border border-slate-200 bg-white/80 text-slate-500 shadow-sm hover:bg-white hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Button>
                </Link>
              ),
            )}
          </ClientMotion>
        </div>

        <NeuralNetworkGraphic />
      </div>

      <ClientMotion
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <Link href="#about" className="text-slate-400 transition-colors hover:text-blue-600">
          <ArrowDown className="h-6 w-6" />
        </Link>
      </ClientMotion>
    </section>
  )
}
