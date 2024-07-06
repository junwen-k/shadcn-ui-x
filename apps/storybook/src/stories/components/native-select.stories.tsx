import type { Meta, StoryObj } from "@storybook/react"

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

/**
 * Native select element.
 *
 * ### Anatomy
 *
 * ```tsx
 * <NativeSelect.Root>
 *  <NativeSelect.Option />
 * </NativeSelect.Root>
 * ```
 */
const meta = {
  title: "Components/NativeSelect",
  component: NativeSelect,
  subcomponents: {
    NativeSelectOption,
  } as any,
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOption>Option 1</NativeSelectOption>
      <NativeSelectOption>Option 2</NativeSelectOption>
      <NativeSelectOption>Option 3</NativeSelectOption>
      <NativeSelectOption>Option 4</NativeSelectOption>
      <NativeSelectOption>Option 5</NativeSelectOption>
    </NativeSelect>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
