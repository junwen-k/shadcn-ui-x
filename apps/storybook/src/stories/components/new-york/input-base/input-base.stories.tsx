import type { Meta, StoryObj } from "@storybook/react"

import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseFlexWrapper,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base"

import { InputBaseDefaultExample } from "./input-base-default-example"
import { InputBaseDisabledExample } from "./input-base-disabled-example"
import { InputBaseWithActionAdornmentExample } from "./input-base-with-action-adornment-example"
import { InputBaseWithAdornmentExample } from "./input-base-with-adornment-example"

/**
 * Base component to create custom inputs.
 *
 * ### Anatomy
 *
 * ```tsx
 * <InputBase.Root>
 *  <InputBase.Adornment />
 *  <InputBase.Control>
 *    <InputBase.Input />
 *  </InputBase.Control>
 *  <InputBase.Adornment>
 *    <InputBase.AdornmentButton />
 *  </InputBase.Adornment>
 * </InputBase.Root>
 * ```
 */
const meta = {
  title: "Components/new-york/InputBase",
  component: InputBase,
  subcomponents: {
    InputBaseAdornment,
    InputBaseAdornmentButton,
    InputBaseControl,
    InputBaseFlexWrapper,
    InputBaseInput,
  } as any,
  render: InputBaseDefaultExample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputBase>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Input base without adornment(s).
 */
export const Default = {} satisfies Story

/**
 * Disabled input.
 */
export const Disabled = {
  args: { disabled: true },
  render: InputBaseDisabledExample,
} satisfies Story

/**
 * Input base can have start / end adornment(s).
 */
export const WithAdornment = {
  render: InputBaseWithAdornmentExample,
} satisfies Story

/**
 * Input base can have action adornment.
 */
export const WithActionAdornment = {
  render: InputBaseWithActionAdornmentExample,
} satisfies Story
