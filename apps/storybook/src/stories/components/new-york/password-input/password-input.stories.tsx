import type { Meta, StoryObj } from "@storybook/react"

import { PasswordInput } from "@/registry/new-york/ui/password-input"
import { Toaster } from "@/registry/new-york/ui/toaster"

import { PasswordInputDefaultExample } from "./password-input-default-example"
import { PasswordInputFormExample } from "./password-input-form-example"
import { PasswordInputWithAdornmentExample } from "./password-input-with-adornment-example"

/**
 * Password Input provides a way for the user to securely enter a password, with the ability to toggle the visibility of the password.
 *
 * ### Anatomy
 *
 * ```tsx
 * <PasswordInput.Root>
 *  <PasswordInput.Control>
 *    <PasswordInput.Input />
 *  </PasswordInput.Control>
 *  <PasswordInput.AdornmentRevealToggle />
 * </PasswordInput.Root>
 * ```
 */
const meta = {
  title: "Components/new-york/PasswordInput",
  component: PasswordInput,
  render: PasswordInputDefaultExample,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default variant of the password input.
 */
export const Default = {} satisfies Story

/**
 * Password input with start adornment.
 */
export const WithAdornment = {
  render: PasswordInputWithAdornmentExample,
} satisfies Story

/**
 * Use `<Form>` components to manage the state of the password input(s).
 */
export const WithForm = {
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
  render: PasswordInputFormExample,
} satisfies Story
