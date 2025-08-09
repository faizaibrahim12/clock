"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AlarmClock, Globe, Smartphone, Zap, Github, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { LiveClock } from "@/components/live-clock"
import { AnalogClock } from "@/components/analog-clock"
import { TimezonePicker } from "@/components/timezone-picker"

export default function Page() {
  const [tz, setTz] = useState<string>("Asia/Kolkata")
  const [is24, setIs24] = useState<boolean>(true)
  const [showSeconds, setShowSeconds] = useState<boolean>(true)

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <AlarmClock className="size-5" aria-hidden="true" />
            <span className="text-base">Clockly</span>
            <span className="sr-only">{"Clockly Home"}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#features" className="hover:underline underline-offset-4">
              {"Features"}
            </Link>
            <Link href="#screens" className="hover:underline underline-offset-4">
              {"Screens"}
            </Link>
            <Link href="#cta" className="hover:underline underline-offset-4">
              {"Get Started"}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" aria-label="GitHub">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Github className="size-5" />
              </a>
            </Button>
            {/* Simple theme toggle using data-theme class on html if your layout uses next-themes */}
            <ThemeToggle />
            <Button asChild>
              <a href="#cta">{"Download"}</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="container py-16 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  {"Ultra-precise • Timezone Aware • 12/24 Hr"}
                </div>
                <h1 className="text-4xl/tight font-bold sm:text-5xl/tight md:text-6xl/tight">
                  {"Perfect Time, Every Time"}
                  <br />
                  <span className="text-muted-foreground">{"A beautiful and precise clock landing page"}</span>
                </h1>
                <p className="text-muted-foreground md:text-lg">
                  {
                    "Live digital and analog clock with timezone support, seconds, and smooth UI. Built with Next.js + shadcn/ui."
                  }
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button size="lg" asChild>
                    <a href="#cta">{"Get Clockly Free"}</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#features">{"See Features"}</a>
                  </Button>
                </div>

                {/* Controls */}
                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{"Clock Settings"}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="tz">{"Timezone"}</Label>
                      <TimezonePicker id="tz" value={tz} onChange={setTz} />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4 sm:justify-end">
                      <div className="flex items-center gap-3">
                        <Switch id="fmt" checked={is24} onCheckedChange={setIs24} />
                        <Label htmlFor="fmt" className="cursor-pointer">
                          {"24-hour"}
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch id="sec" checked={showSeconds} onCheckedChange={setShowSeconds} />
                        <Label htmlFor="sec" className="cursor-pointer">
                          {"Seconds"}
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Live Clocks */}
              <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border p-6 md:p-8">
                <div className="w-full">
                  <div className="text-center text-sm text-muted-foreground mb-2">
                    {tz} {is24 ? "(24h)" : "(12h)"}
                  </div>
                  <div className="rounded-xl border p-4 md:p-6">
                    <LiveClock
                      timeZone={tz}
                      is24Hour={is24}
                      showSeconds={showSeconds}
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums tracking-tight"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-center text-sm text-muted-foreground mb-3">{"Analog"}</div>
                  <AnalogClock timeZone={tz} size={220} showNumbers />
                </div>
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-80 bg-gradient-to-b from-primary/10 to-transparent"
            aria-hidden="true"
          />
        </section>

        {/* Screens/Preview */}
        <section id="screens" className="py-12 md:py-20">
          <div className="container">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <Image
                src="/clock-dashboard-preview.png"
                width={640}
                height={440}
                alt="Clockly dashboard preview"
                className="mx-auto rounded-xl border bg-muted object-cover"
                priority
              />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{"Elegant, Real‑Time UI"}</h2>
                <p className="text-muted-foreground">
                  {
                    "Smooth ticking seconds, timezone accuracy, and beautiful typography for a delightful experience on all devices."
                  }
                </p>
                <ul className="grid gap-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Zap className="size-4 text-primary" />
                    {"1s updates with precise formatting"}
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe className="size-4 text-primary" />
                    {"Timezone aware with common presets"}
                  </li>
                  <li className="flex items-center gap-2">
                    <Smartphone className="size-4 text-primary" />
                    {"Mobile-first, responsive layout"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-y bg-muted/30 py-12 md:py-20">
          <div className="container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{"Everything you need in a clock"}</h2>
              <p className="text-muted-foreground">{"Clean, fast, and customizable. No fluff."}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<AlarmClock className="size-5" aria-hidden="true" />}
                title="Digital + Analog"
                desc="Choose your style. Switch anytime."
              />
              <FeatureCard
                icon={<Globe className="size-5" aria-hidden="true" />}
                title="Timezone Presets"
                desc="Quick access to popular timezones."
              />
              <FeatureCard
                icon={<Smartphone className="size-5" aria-hidden="true" />}
                title="Responsive"
                desc="Looks great on phones, tablets, and desktops."
              />
              <FeatureCard
                icon={<Zap className="size-5" aria-hidden="true" />}
                title="Blazing Fast"
                desc="Optimized renders and smooth ticking."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-12 md:py-20">
          <div className="container">
            <div className="grid items-center gap-8 rounded-2xl border bg-card p-8 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold sm:text-3xl">{"Start using Clockly today"}</h3>
                <p className="text-muted-foreground">
                  {"Drop it into your Next.js project or use it as a beautiful landing page for your time tools."}
                </p>
                <div className="flex gap-3">
                  <Button asChild>
                    <a href="#">{"Download"}</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#features">{"Learn more"}</a>
                  </Button>
                </div>
              </div>
              <Image
                src="/install-instructions-ui.png"
                width={480}
                height={280}
                alt="Install preview"
                className="mx-auto rounded-xl border bg-muted object-cover"
                priority
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {"© "}
            {new Date().getFullYear()}
            {" Clockly. All rights reserved."}
          </p>
          <nav className="flex gap-4 text-xs text-muted-foreground">
            <Link className="hover:underline underline-offset-4" href="#">
              {"Privacy"}
            </Link>
            <Link className="hover:underline underline-offset-4" href="#">
              {"Terms"}
            </Link>
            <Link className="hover:underline underline-offset-4" href="#">
              {"Support"}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0">
        <div className={cn("rounded-md border bg-background p-2")}>{icon}</div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{desc}</CardContent>
    </Card>
  )
}

function ThemeToggle() {
  // Works if your layout uses next-themes' ThemeProvider; otherwise acts as a visual toggle only.
  const [dark, setDark] = useState<boolean>(false)
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => {
        setDark((d) => !d)
        if (typeof document !== "undefined") {
          const root = document.documentElement
          const isDark = root.classList.contains("dark")
          if (isDark) {
            root.classList.remove("dark")
          } else {
            root.classList.add("dark")
          }
        }
      }}
    >
      {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  )
}
