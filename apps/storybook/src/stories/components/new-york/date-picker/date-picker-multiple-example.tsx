import * as React from "react"
import { format } from "date-fns"

import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerTrigger,
  DatePickerValue,
} from "@/registry/new-york/ui/date-picker"

const MAX_LENGTH = 2

export const DatePickerMultipleExample = () => {
  const [value, setValue] = React.useState<Date[] | null>([])

  return (
    <DatePicker
      mode="multiple"
      value={value}
      onValueChange={setValue}
      formatStr="P"
    >
      <DatePickerTrigger className="w-[280px]">
        <DatePickerValue placeholder="Pick a date">
          {value?.length &&
            [
              `${value
                .slice(0, MAX_LENGTH)
                .map((v) => format(v, "P"))
                .join(", ")}`,
              value.length > MAX_LENGTH && `+${value.length - MAX_LENGTH}`,
            ]
              .filter(Boolean)
              .join(" ")}
        </DatePickerValue>
      </DatePickerTrigger>
      <DatePickerContent>
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  )
}
