import type { Meta, StoryObj } from "@storybook/react"

import * as ComboboxPrimitive from "@/registry/new-york/ui/combobox-primitive"

import { ComboboxPrimitiveDefaultExample } from "./combobox-primitive-default-example"
import { ComboboxPrimitiveMultiSelectExample } from "./combobox-primitive-multi-select-example"
import { ComboboxPrimitiveMultipleExample } from "./combobox-primitive-multiple-example"

/**
 * Autocomplete input and command palette with a list of suggestions built on top of [Radix UI](https://www.radix-ui.com/primitives) and [cmdk](https://github.com/pacocoursey/cmdk).
 *
 * ### Anatomy
 *
 * ```tsx
 * <Combobox.Root>
 *   <Combobox.TagGroup>
 *     <Combobox.TagGroupItem>
 *       <Combobox.TagGroupItemRemove />
 *     </Combobox.TagGroupItem>
 *   </Combobox.TagGroup>
 *
 *   <Combobox.Input />
 *   <Combobox.Clear />
 *   <Combobox.Anchor />
 *   <Combobox.Trigger />
 *
 *   <Combobox.Portal>
 *     <Combobox.Content>
 *       <Combobox.Empty />
 *       <Combobox.Loading />
 *
 *       <Combobox.Item>
 *         <Combobox.ItemIndicator />
 *       </Combobox.Item>
 *
 *       <Combobox.Group>
 *         <Combobox.Item>
 *           <Combobox.ItemIndicator />
 *         </Combobox.Item>
 *       </Combobox.Group>
 *
 *       <Combobox.Separator />
 *     </Combobox.Content>
 *   </Combobox.Portal>
 * </Combobox.Root>
 * ```
 */
const meta = {
  title: "Components/new-york/ComboboxPrimitive",
  component: ComboboxPrimitive.Root,
  render: ComboboxPrimitiveDefaultExample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ComboboxPrimitive.Root>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic combobox implementation.
 */
export const Default = {
  args: {},
} satisfies Story

/**
 * Combobox can support multiple values, with full keyboard accessibility.
 */
export const Multiple = {
  args: {},
  render: ComboboxPrimitiveMultipleExample,
} satisfies Story

/**
 * Combobox can be used as a multi-select.
 */
export const MultiSelect = {
  args: {},
  render: ComboboxPrimitiveMultiSelectExample,
} satisfies Story
