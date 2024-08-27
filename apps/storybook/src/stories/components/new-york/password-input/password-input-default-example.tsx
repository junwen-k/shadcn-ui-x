import * as React from "react"

import {
  PasswordInput,
  PasswordInputAdornmentRevealToggle,
  PasswordInputControl,
  PasswordInputInput,
} from "@/registry/new-york/ui/password-input"

export const PasswordInputDefaultExample = (
  props: React.ComponentProps<typeof PasswordInput>
) => (
  <PasswordInput {...props}>
    <PasswordInputControl>
      <PasswordInputInput autoComplete="new-password" placeholder="Password" />
    </PasswordInputControl>
    <PasswordInputAdornmentRevealToggle />
  </PasswordInput>
)
