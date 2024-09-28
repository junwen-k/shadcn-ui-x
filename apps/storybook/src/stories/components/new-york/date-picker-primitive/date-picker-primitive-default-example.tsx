import React from "react"

import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-primitive"

export const DatePickerPrimitiveDefaultExample = (
  props: React.ComponentProps<typeof DatePickerPrimitive.Root>
) => (
  <DatePickerPrimitive.Root {...props}>
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
