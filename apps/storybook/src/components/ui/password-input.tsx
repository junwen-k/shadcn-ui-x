"use client"

import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { Eye, EyeOff } from "lucide-react"

import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseInput,
} from "@/components/ui/input-base"

interface PasswordInputContextProps {
  revealPassword: boolean
  onRevealPasswordChange: (revealPassword: boolean) => void
}

const PasswordInputContext = React.createContext<PasswordInputContextProps>(
  {} as PasswordInputContextProps
)

const usePasswordInputContext = () => React.useContext(PasswordInputContext)

interface PasswordInputProps extends React.ComponentProps<typeof InputBase> {
  revealPassword?: boolean
  defaultRevealPassword?: boolean
  onRevealPasswordChange?: (revealPassword: boolean) => void
}

export const PasswordInput = ({
  revealPassword: revealPasswordProp,
  defaultRevealPassword,
  onRevealPasswordChange,
  ...props
}: PasswordInputProps) => {
  const [revealPassword = false, setRevealPassword] = useControllableState({
    prop: revealPasswordProp,
    defaultProp: defaultRevealPassword,
    onChange: onRevealPasswordChange,
  })

  return (
    <PasswordInputContext.Provider
      value={{
        revealPassword,
        onRevealPasswordChange: setRevealPassword,
      }}
    >
      <InputBase {...props} />
    </PasswordInputContext.Provider>
  )
}

export const PasswordInputControl = InputBaseControl

export const PasswordInputAdornment = InputBaseAdornment

export const PasswordInputAdornmentButton = InputBaseAdornmentButton

export const PasswordInputAdornmentRevealToggle = React.forwardRef<
  React.ElementRef<typeof InputBaseAdornmentButton>,
  React.ComponentPropsWithoutRef<typeof InputBaseAdornmentButton>
>(({ onClick, ...props }, ref) => {
  const { revealPassword, onRevealPasswordChange } = usePasswordInputContext()

  return (
    <InputBaseAdornment>
      <InputBaseAdornmentButton
        ref={ref}
        onClick={composeEventHandlers(onClick, () =>
          onRevealPasswordChange(!revealPassword)
        )}
        {...props}
      >
        {revealPassword ? <Eye /> : <EyeOff />}
      </InputBaseAdornmentButton>
    </InputBaseAdornment>
  )
})
PasswordInputAdornmentRevealToggle.displayName =
  "PasswordInputAdornmentRevealToggle"

export const PasswordInputInput = React.forwardRef<
  React.ElementRef<typeof InputBaseInput>,
  React.ComponentPropsWithoutRef<typeof InputBaseInput>
>((props, ref) => {
  const { revealPassword } = usePasswordInputContext()

  return (
    <InputBaseInput
      ref={ref}
      type={revealPassword ? "text" : "password"}
      {...props}
    />
  )
})
PasswordInputInput.displayName = "PasswordInputInput"
