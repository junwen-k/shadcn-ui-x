import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { Button } from "@/components/ui/button"
import { confirm, Confirmer } from "@/components/ui/confirmer"

/**
 * Imperative confirm implementation based on [use-ask](https://github.com/junwen-k/use-ask).
 */
const meta = {
  title: "Components/Confirmer",
  component: Confirmer,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Confirmer />
      </>
    ),
  ],
  args: {
    onConfirm: fn(),
    onReject: fn(),
  },
  render: (args) => (
    <Button
      variant="destructive"
      onClick={() =>
        confirm({
          title: "Are you absolutely sure?",
          description:
            "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
          ActionProps: {
            variant: "destructive",
          },
        })
          .then(args.onConfirm)
          .catch(args.onReject)
      }
    >
      Delete
    </Button>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Confirmer>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
