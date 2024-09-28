import * as React from "react"

import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
} from "@/registry/new-york/ui/date-picker"

export const DatePickerInputExample = (
  props: React.ComponentProps<typeof DatePicker>
) => (
  <DatePicker {...props}>
    <DatePickerInput className="w-[280px]" />
    <DatePickerContent>
      <DatePickerCalendar />
    </DatePickerContent>
  </DatePicker>
)
