import React from "react"

import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-primitive"

export const DatePickerPrimitiveInputExample = (
  props: React.ComponentProps<typeof DatePickerPrimitive.Root>
) => (
  <DatePickerPrimitive.Root {...props}>
    <DatePickerPrimitive.Anchor>
      <DatePickerPrimitive.Input />
      <DatePickerPrimitive.Clear>&#215;</DatePickerPrimitive.Clear>
      <DatePickerPrimitive.Trigger>&#8595;</DatePickerPrimitive.Trigger>
    </DatePickerPrimitive.Anchor>
    <DatePickerPrimitive.Portal>
      <DatePickerPrimitive.Content>
        <DatePickerPrimitive.Calendar />
      </DatePickerPrimitive.Content>
    </DatePickerPrimitive.Portal>
  </DatePickerPrimitive.Root>
)
