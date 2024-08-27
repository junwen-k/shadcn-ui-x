import type { Meta, StoryObj } from "@storybook/react"

import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/new-york/ui/native-select"
import { Toaster } from "@/registry/new-york/ui/toaster"

import { NativeSelectDefaultExample } from "./native-select-default-example"
import { NativeSelectFormExample } from "./native-select-form-example"

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
  title: "Components/new-york/NativeSelect",
  component: NativeSelect,
  subcomponents: {
    NativeSelectOption,
  } as any,
  render: NativeSelectDefaultExample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story

export const WithForm = {
  args: {},
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
  render: NativeSelectFormExample,
} satisfies Story
