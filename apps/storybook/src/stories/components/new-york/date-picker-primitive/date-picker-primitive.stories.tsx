import type { Meta, StoryObj } from "@storybook/react"

import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-primitive"

import { DatePickerPrimitiveDefaultExample } from "./date-picker-primitive-default-example"
import { DatePickerPrimitiveInputExample } from "./date-picker-primitive-input-example"
import { DatePickerPrimitiveMultipleExample } from "./date-picker-primitive-multiple-example"
import { DatePickerPrimitiveRangeExample } from "./date-picker-primitive-range-example"

/**
 * Date Picker primitive built on top of [Radix UI](https://www.radix-ui.com/primitives) and [React DayPicker](https://daypicker.dev/).
 *
 * ### Anatomy
 *
 * ```tsx
 * <DatePicker.Root>
 *   <DatePicker.Trigger>
 *     <DatePicker.Value />
 *   </DatePicker.Trigger>
 *   <DatePicker.Input />
 *   <DatePicker.Clear />
 *   <DatePicker.Anchor />
 *
 *   <DatePicker.Portal>
 *     <DatePicker.Content>
 *       <DatePicker.Calendar />
 *     </DatePicker.Content>
 *   </DatePicker.Portal>
 * </DatePicker.Root>
 * ```
 */
const meta = {
  title: "Components/new-york/DatePickerPrimitive",
  component: DatePickerPrimitive.Root,
  render: DatePickerPrimitiveDefaultExample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePickerPrimitive.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story

export const Required = {
  args: {
    required: true,
  },
} satisfies Story

export const Multiple = {
  render: DatePickerPrimitiveMultipleExample,
} satisfies Story

export const Range = {
  render: DatePickerPrimitiveRangeExample,
} satisfies Story

export const Input = {
  render: DatePickerPrimitiveInputExample,
} satisfies Story
