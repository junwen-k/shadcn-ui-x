import type { Meta, StoryObj } from "@storybook/react"

import * as DateFieldPrimitive from "@/registry/new-york/ui/date-field-primitive"

/**
 * Date Field allows user to enter date value in specific format.
 *
 * ### Anatomy
 *
 * ```tsx
 * <DateField.Root />
 * ```
 */
const meta = {
  title: "Components/new-york/DateFieldPrimitive",
  component: DateFieldPrimitive.Root,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DateFieldPrimitive.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {},
} satisfies Story

export const CustomInputFormat = {
  args: {
    inputFormatStr: "MM-dd-yyyy",
  },
} satisfies Story
