import type { Meta, StoryObj } from "@storybook/react"

import {
  Dropzone,
  DropzoneInput,
  DropzoneTrigger,
  DropzoneZone,
  DropzoneZoneDescription,
  DropzoneZoneIcon,
  DropzoneZoneTitle,
} from "@/registry/new-york/ui/dropzone"
import { Toaster } from "@/registry/new-york/ui/toaster"

import { DropzoneDefaultExample } from "./dropzone-default-example"
import { DropzoneFormExample } from "./dropzone-form-example"
import { DropzoneTriggerExample } from "./dropzone-trigger-example"

/**
 * Dropzone.
 *
 * ### Anatomy:
 *
 * ```tsx
 * <Dropzone.Root>
 *  <Dropzone.Zone>
 *    <Dropzone.Input />
 *  </Dropzone.Zone>
 *
 *  <Dropzone.Trigger />
 * </Dropzone.Root>
 * ```
 */
const meta = {
  title: "Components/new-york/Dropzone",
  component: Dropzone,
  subcomponents: {
    DropzoneInput,
    DropzoneTrigger,
    DropzoneZone,
    DropzoneZoneDescription,
    DropzoneZoneIcon,
    DropzoneZoneTitle,
  } as any,
  render: DropzoneDefaultExample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dropzone>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    children: "",
  },
} satisfies Story

export const Trigger = {
  args: {
    children: "",
  },
  render: DropzoneTriggerExample,
} satisfies Story

export const WithForm = {
  args: {
    children: "",
  },
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
  render: DropzoneFormExample,
} satisfies Story
