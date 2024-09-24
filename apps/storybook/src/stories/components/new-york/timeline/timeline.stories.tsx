import type { Meta, StoryObj } from "@storybook/react"

import { Timeline } from "@/registry/new-york/ui/timeline"

import { TimelineDefaultExample } from "./timeline-default-example"

/**
 * Timeline displays a list of events in chronological order.
 *
 * ### Anatomy
 *
 * ```tsx
 * <Timeline.Root>
 *   <Timeline.Item>
 *     <Timeline.Separator>
 *       <Timeline.Dot/>
 *       <Timeline.Connector />
 *     </Timeline.Separator>
 *     <Timeline.Content>
 *       <Timeline.Title />
 *       <Timeline.Description />
 *     </Timeline.Content>
 *   </Timeline.Item>
 * </Timeline.Root>
 * ```
 */
const meta = {
  title: "Components/new-york/Timeline",
  component: Timeline,
  render: TimelineDefaultExample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default variant of the timeline.
 */
export const Default = {} satisfies Story
