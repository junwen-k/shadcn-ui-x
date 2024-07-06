import type { Meta, StoryObj } from "@storybook/react"
import { Info } from "lucide-react"

import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseFlexWrapper,
  InputBaseInput,
} from "@/components/ui/input-base"

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
  title: "Components/InputBase",
  component: InputBase,
  subcomponents: {
    InputBaseAdornment,
    InputBaseAdornmentButton,
    InputBaseControl,
    InputBaseFlexWrapper,
    InputBaseInput,
  } as any,
  render: (args) => (
    <InputBase {...args}>
      <InputBaseControl>
        <InputBaseInput type="email" placeholder="Email" />
      </InputBaseControl>
    </InputBase>
  ),
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
 * Input base can have start / end adornment(s).
 */
export const Adornment = {
  render: (args) => (
    <InputBase {...args}>
      <InputBaseAdornment>₩</InputBaseAdornment>
      <InputBaseControl>
        <InputBaseInput type="number" placeholder="Amount" />
      </InputBaseControl>
      <InputBaseAdornment>WON</InputBaseAdornment>
    </InputBase>
  ),
} satisfies Story

/**
 * Input base can have action adornment.
 */
export const ActionAdornment = {
  render: (args) => (
    <InputBase {...args}>
      <InputBaseControl>
        <InputBaseInput placeholder="Name" />
      </InputBaseControl>
      <InputBaseAdornment>
        <InputBaseAdornmentButton>
          <Info />
        </InputBaseAdornmentButton>
      </InputBaseAdornment>
    </InputBase>
  ),
} satisfies Story
