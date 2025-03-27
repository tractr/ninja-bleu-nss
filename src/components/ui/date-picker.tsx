"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  setDate: (date: Date | undefined) => void
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="number"
              placeholder="DD"
              min={1}
              max={31}
              value={date ? date.getDate() : ""}
              onChange={(e) => {
                const day = parseInt(e.target.value)
                if (isNaN(day)) return
                const newDate = date ? new Date(date) : new Date()
                newDate.setDate(day)
                setDate(newDate)
              }}
              className="w-full"
            />
            <Input
              type="number"
              placeholder="MM"
              min={1}
              max={12}
              value={date ? date.getMonth() + 1 : ""}
              onChange={(e) => {
                const month = parseInt(e.target.value)
                if (isNaN(month)) return
                const newDate = date ? new Date(date) : new Date()
                newDate.setMonth(month - 1)
                setDate(newDate)
              }}
              className="w-full"
            />
            <Input
              type="number"
              placeholder="YYYY"
              min={1900}
              max={2100}
              value={date ? date.getFullYear() : ""}
              onChange={(e) => {
                const year = parseInt(e.target.value)
                if (isNaN(year)) return
                const newDate = date ? new Date(date) : new Date()
                newDate.setFullYear(year)
                setDate(newDate)
              }}
              className="w-full"
            />
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDate(new Date())
              }}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDate(undefined)
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
