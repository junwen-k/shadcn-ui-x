import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Tag } from "@/registry/new-york/ui/tag"

/**
 * A tag can be toggled on or off.
 *
 * ### Anatomy
 *
 * ```tsx
 * <Tag.Root />
 * ```
 */
const meta = {
  title: "Components/new-york/Tag",
  component: Tag,
  args: {
    children: "Tag",
  },
  render: (args) => <Tag {...args} />,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Selected = {
  args: {
    selected: true,
  },
} satisfies Story

export const Removable = {
  args: {
    onRemove: fn(),
  },
} satisfies Story
