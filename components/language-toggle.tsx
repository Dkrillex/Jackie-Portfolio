"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLocale}
      aria-label={t.lang.aria}
      className="min-w-[3rem] font-medium"
    >
      {locale === "en" ? "中文" : "EN"}
    </Button>
  )
}
