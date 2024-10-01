import * as React from "react"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"

import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-primitive"

export const DatePickerPrimitiveRangeExample = () => {
  const [value, setValue] = React.useState<DateRange | null>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <DatePickerPrimitive.Root
      mode="range"
      value={value}
      onValueChange={setValue}
      formatStr="P"
    >
      <DatePickerPrimitive.Anchor>
        <DatePickerPrimitive.Trigger>
          <DatePickerPrimitive.Value placeholder="Pick a date" />
        </DatePickerPrimitive.Trigger>
        <DatePickerPrimitive.Clear>&#215;</DatePickerPrimitive.Clear>
      </DatePickerPrimitive.Anchor>
      <DatePickerPrimitive.Portal>
        <DatePickerPrimitive.Content>
          <DatePickerPrimitive.Calendar />
        </DatePickerPrimitive.Content>
      </DatePickerPrimitive.Portal>
    </DatePickerPrimitive.Root>
  )
}
