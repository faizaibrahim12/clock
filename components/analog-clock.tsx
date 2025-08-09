"use client"

import { useEffect, useMemo, useState } from "react"

export type AnalogClockProps = {
  timeZone?: string
  size?: number
  showNumbers?: boolean
  className?: string
}

type Parts = { hours: number; minutes: number; seconds: number }

function getTimeParts(tz: string): Parts {
  const date = new Date()
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone: tz,
  }).formatToParts(date)
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value || 0)
  const hours = get("hour")
  const minutes = get("minute")
  const seconds = get("second")
  return { hours, minutes, seconds }
}

export function AnalogClock({
  timeZone = "Asia/Kolkata",
  size = 220,
  showNumbers = true,
  className = "",
}: AnalogClockProps) {
  const [parts, setParts] = useState<Parts>(() => getTimeParts(timeZone))

  useEffect(() => {
    const id = setInterval(() => setParts(getTimeParts(timeZone)), 1000)
    return () => clearInterval(id)
  }, [timeZone])

  const { hAngle, mAngle, sAngle } = useMemo(() => {
    const hoursOn12 = parts.hours % 12
    const hAngle = hoursOn12 * 30 + parts.minutes * 0.5 + parts.seconds * (0.5 / 60)
    const mAngle = parts.minutes * 6 + parts.seconds * 0.1
    const sAngle = parts.seconds * 6
    return { hAngle, mAngle, sAngle }
  }, [parts])

  const tickMarks = Array.from({ length: 60 })

  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      aria-label={`Analog clock showing ${parts.hours.toString().padStart(2, "0")}:${parts.minutes
        .toString()
        .padStart(2, "0")}:${parts.seconds.toString().padStart(2, "0")} in ${timeZone}`}
      role="img"
    >
      <div className="relative aspect-square rounded-full border bg-background shadow-sm">
        {/* ticks */}
        {tickMarks.map((_, i) => {
          const thick = i % 5 === 0
          const length = thick ? 10 : 6
          const width = thick ? 2 : 1
          const angle = (i / 60) * 360
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                width: width,
                height: length,
                background: "hsl(var(--foreground))",
                transform: `rotate(${angle}deg) translateY(${-(size / 2) + 8}px)`,
                transformOrigin: "center -" + (size / 2 - 8) + "px",
              }}
            />
          )
        })}

        {/* numbers */}
        {showNumbers &&
          Array.from({ length: 12 }).map((_, i) => {
            const num = i === 0 ? 12 : i
            const angle = (i / 12) * 360
            const radius = size / 2 - 26
            const x = Math.sin((angle * Math.PI) / 180) * radius
            const y = -Math.cos((angle * Math.PI) / 180) * radius
            return (
              <div
                key={i}
                className="absolute text-xs font-medium"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                {num}
              </div>
            )
          })}

        {/* center pin */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
          style={{ width: 8, height: 8 }}
        />

        {/* hour hand */}
        <div
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: 4,
            height: size * 0.25,
            background: "hsl(var(--foreground))",
            transform: `translate(-50%, -100%) rotate(${hAngle}deg)`,
            borderRadius: 999,
          }}
        />

        {/* minute hand */}
        <div
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: 3,
            height: size * 0.34,
            background: "hsl(var(--foreground))",
            transform: `translate(-50%, -100%) rotate(${mAngle}deg)`,
            borderRadius: 999,
          }}
        />

        {/* second hand */}
        <div
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: 2,
            height: size * 0.4,
            background: "hsl(var(--primary))",
            transform: `translate(-50%, -100%) rotate(${sAngle}deg)`,
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  )
}
