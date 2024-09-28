import type { Meta, StoryObj } from "@storybook/react"

import {
  DatePicker,
  DatePickerAnchor,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerValue,
} from "@/registry/new-york/ui/date-picker"
import { Toaster } from "@/registry/new-york/ui/toaster"

import { DatePickerDefaultExample } from "./date-picker-default-example"
import { DatePickerFormExample } from "./date-picker-form-example"
import { DatePickerInputExample } from "./date-picker-input-example"

/**
 * Date picker allow users to enter or select a date value.
 *
 * ### Anatomy:
 *
 * ```tsx
 * <DatePicker.Root>
 *  <DatePicker.Trigger>
 *    <DatePicker.Value />
 *  </DatePicker.Trigger>
 *
 *  <DatePicker.Input />
 *
 *  <DatePicker.Content>
 *    <DatePicker.Calendar />
 *  </DatePicker.Content>
 * </DatePicker.Root>
 * ```
 */
const meta = {
  title: "Components/new-york/DatePicker",
  component: DatePicker,
  subcomponents: {
    DatePickerAnchor,
    DatePickerInput,
    DatePickerTrigger,
    DatePickerValue,
    DatePickerContent,
    DatePickerCalendar,
  } as any,
  render: DatePickerDefaultExample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Trigger = {} satisfies Story

export const Required = {
  args: {
    required: true,
  },
} satisfies Story

export const Input = {
  render: DatePickerInputExample,
} satisfies Story

export const WithForm = {
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
  render: DatePickerFormExample,
} satisfies Story
