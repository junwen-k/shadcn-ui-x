"use client"

import type * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/new-york/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        caption_label: "text-sm font-medium",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 font-normal"
        ),
        day: "rounded-md p-0 text-center text-sm aria-selected:bg-accent",
        disabled: "*:text-muted-foreground *:opacity-50",
        hidden: "invisible",
        month_caption: "flex items-center justify-center pt-1",
        month_grid: "w-full border-collapse space-y-1",
        month: "space-y-4",
        months:
          "relative flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0",
        nav: "absolute flex w-full items-center justify-between space-x-1",
        outside:
          "*:text-muted-foreground *:opacity-50 *:aria-selected:bg-accent/50 *:aria-selected:text-muted-foreground *:aria-selected:opacity-30",
        range_end: "rounded-l-none",
        range_middle:
          "rounded-none *:aria-selected:bg-accent *:aria-selected:text-accent-foreground",
        range_start: "rounded-r-none",
        selected:
          "*:bg-primary *:text-primary-foreground *:hover:bg-primary *:hover:text-primary-foreground *:focus:bg-primary *:focus:text-primary-foreground",
        today: "*:bg-accent *:text-accent-foreground",
        week: "mt-2 flex w-full",
        weekday:
          "w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground",
        weekdays: "flex",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          switch (orientation) {
            case "up":
              return <ChevronUpIcon className="size-4" />
            case "down":
              return <ChevronDownIcon className="size-4" />
            case "left":
              return <ChevronLeftIcon className="size-4" />
            case "right":
            default:
              return <ChevronRightIcon className="size-4" />
          }
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
