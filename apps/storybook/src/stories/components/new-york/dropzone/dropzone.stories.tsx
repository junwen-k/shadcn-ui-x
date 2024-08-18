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
 *    <Dropzone.DropzoneZoneIcon />
 *    <Dropzone.DropzoneZoneTitle />
 *    <Dropzone.DropzoneZoneDescription />
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
  args: {},
  render: DropzoneDefaultExample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dropzone>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {},
} satisfies Story

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story

export const Trigger = {
  args: {},
  render: DropzoneTriggerExample,
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
  render: DropzoneFormExample,
} satisfies Story
