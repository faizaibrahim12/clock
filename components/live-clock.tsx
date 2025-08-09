"use client"

import { useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"

export type LiveClockProps = {
  timeZone?: string
  is24Hour?: boolean
  showSeconds?: boolean
  className?: string
}

export function LiveClock({
  timeZone = "Asia/Kolkata",
  is24Hour = true,
  showSeconds = true,
  className,
}: LiveClockProps) {
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const formatted = useMemo(() => {
    const opts: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !is24Hour,
      timeZone,
    }
    if (showSeconds) {
      opts.second = "2-digit"
    }
    return new Intl.DateTimeFormat("en-GB", opts).format(now)
  }, [now, timeZone, is24Hour, showSeconds])

  return (
    <div
      className={cn("mx-auto text-center font-mono leading-none tabular-nums tracking-tight", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      {formatted}
    </div>
  )
}
