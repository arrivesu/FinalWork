/**
 * @file DateTimePicker.tsx
 * @description 日期时间选择器组件
 * @author rainbowx
 * @date 2025/5/18
 */

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateTimePickerProps {
  date: Date
  setDate: (date: Date) => void
  showTime?: boolean
  label?: string
  className?: string
}

export function DateTimePicker({ date, setDate, showTime = true, label, className }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date)
  const [time, setTime] = useState(format(date || new Date(), "HH:mm"))

  // 当外部日期变化时更新内部状态
  useEffect(() => {
    if (date) {
      setSelectedDate(date)
      setTime(format(date, "HH:mm"))
    }
  }, [date])

  // 当内部状态变化时更新外部日期
  useEffect(() => {
    if (selectedDate) {
      const [hours, minutes] = time.split(":").map(Number)
      const newDate = new Date(selectedDate)

      if (!isNaN(hours) && !isNaN(minutes)) {
        newDate.setHours(hours, minutes)
        setDate(newDate)
      }
    }
  }, [selectedDate, time, setDate])

  // 处理时间输入变化
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              showTime ? (
                format(selectedDate, "yyyy-MM-dd HH:mm")
              ) : (
                format(selectedDate, "yyyy-MM-dd")
              )
            ) : (
              <span>选择日期{showTime ? "和时间" : ""}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
          {showTime && (
            <div className="p-3 border-t border-border">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input type="time" value={time} onChange={handleTimeChange} className="w-full" />
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface DateRangePickerProps {
  startDate: Date
  endDate: Date
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
  className?: string
}

export function DateRangePicker({ startDate, endDate, setStartDate, setEndDate, className }: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-4", className)}>
      <DateTimePicker date={startDate} setDate={setStartDate} label="开始时间" />
      <DateTimePicker date={endDate} setDate={setEndDate} label="结束时间" />
    </div>
  )
}

// 保留原有的 DateRangePicker 组件以保持兼容性
export default function OriginalDateRangePicker({
  defaultDate,
  defaultTimeRange,
  onChange,
  dateHint,
  timeHint,
}: {
  defaultDate?: Date
  defaultTimeRange?: string
  onChange?: (start: Date, end: Date) => void
  dateHint?: string
  timeHint?: string
}) {
  const [date, setDate] = useState("")
  const [timeRange, setTimeRange] = useState("")

  useEffect(() => {
    if (defaultDate) {
      setDate(defaultDate.toISOString().slice(0, 10))
    }
    if (defaultTimeRange) {
      setTimeRange(defaultTimeRange)
    }
  }, [defaultDate, defaultTimeRange])

  useEffect(() => {
    if (!date || !timeRange) return

    const [startStr, endStr] = timeRange.split("-").map((t) => t.trim())
    if (!startStr || !endStr) return

    const start = new Date(`${date}T${startStr}:00`)
    const end = new Date(`${date}T${endStr}:00`)

    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      onChange?.(start, end)
    }
  }, [date, timeRange, onChange])

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="date">{dateHint}</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="time">{timeHint}</Label>
        <Input
          id="time"
          placeholder="例如：14:00-16:00"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        />
      </div>
    </div>
  )
}
