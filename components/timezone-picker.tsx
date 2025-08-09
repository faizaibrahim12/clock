"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type TimezonePickerProps = {
  id?: string
  value?: string
  onChange?: (tz: string) => void
}

const commonTimezones: string[] = [
  "UTC",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Tokyo",
  "Europe/London",
  "Europe/Berlin",
  "America/New_York",
  "America/Los_Angeles",
  "Australia/Sydney",
  "Africa/Johannesburg",
]

export function TimezonePicker({ id, value = "Asia/Kolkata", onChange = () => {} }: TimezonePickerProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue placeholder="Select timezone" />
      </SelectTrigger>
      <SelectContent>
        {commonTimezones.map((tz) => (
          <SelectItem key={tz} value={tz}>
            {tz}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
