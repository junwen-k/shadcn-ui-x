import type { Meta, StoryObj } from "@storybook/react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxTag,
  ComboboxTagsInput,
} from "@/registry/new-york/ui/combobox"
import { Toaster } from "@/registry/new-york/ui/toaster"

import { ComboboxDefaultExample } from "./combobox-default-example"
import { ComboboxFormExample } from "./combobox-form-example"

/**
 * Autocomplete input and command palette with a list of suggestions.
 *
 * ### Anatomy
 *
 * ```tsx
 * <Combobox.Root>
 *
 *   <Combobox.ComboboxTagsInput>
 *     <Combobox.ComboboxTag />
 *   </Combobox.ComboboxTagsInput>
 *
 *   <Combobox.Input />
 *
 *   <Combobox.Content>
 *     <Combobox.Empty />
 *     <Combobox.Loading />
 *
 *     <Combobox.Item />
 *
 *     <Combobox.Group>
 *       <Combobox.Item />
 *     </Combobox.Group>
 *
 *     <Combobox.Separator />
 *   </Combobox.Content>
 * </Combobox.Root>
 * ```
 */
const meta = {
  title: "Components/new-york/Combobox",
  component: Combobox,
  subcomponents: {
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxTag,
    ComboboxTagsInput,
  } as any,
  render: ComboboxDefaultExample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {},
} satisfies Story

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
  render: ComboboxFormExample,
} satisfies Story
