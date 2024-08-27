import * as React from "react"
import { LockClosedIcon } from "@radix-ui/react-icons"

import {
  PasswordInput,
  PasswordInputAdornment,
  PasswordInputAdornmentRevealToggle,
  PasswordInputControl,
  PasswordInputInput,
} from "@/registry/new-york/ui/password-input"

export const PasswordInputWithAdornmentExample = (
  props: React.ComponentProps<typeof PasswordInput>
) => (
  <PasswordInput {...props}>
    <PasswordInputAdornment>
      <LockClosedIcon />
    </PasswordInputAdornment>
    <PasswordInputControl>
      <PasswordInputInput autoComplete="new-password" placeholder="Password" />
    </PasswordInputControl>
    <PasswordInputAdornmentRevealToggle />
  </PasswordInput>
)
