"use client"

import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { composeRefs } from "@radix-ui/react-compose-refs"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface InputBaseContextProps {
  controlRef: React.RefObject<HTMLInputElement>
  onFocusChange: (focused: boolean) => void
}

const InputBaseContext = React.createContext<InputBaseContextProps>(
  {} as InputBaseContextProps
)

const useInputBaseContext = () => React.useContext(InputBaseContext)

interface InputBaseProps extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean
}

export const InputBase = React.forwardRef<
  React.ElementRef<"div">,
  InputBaseProps
>(({ asChild, className, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  const [focused, setFocused] = React.useState(false)

  const controlRef = React.useRef<HTMLInputElement>(null)

  return (
    <InputBaseContext.Provider
      value={{ controlRef, onFocusChange: setFocused }}
    >
      <Comp
        ref={ref}
        onClick={composeEventHandlers(onClick, (e) => {
          // Based on MUI's <InputBase /> implementation.
          // https://github.com/mui/material-ui/blob/next/packages/mui-material/src/InputBase/InputBase.js#L452
          if (controlRef.current && e.currentTarget === e.target) {
            controlRef.current.focus()
          }
        })}
        className={cn(
          "group flex min-h-9 cursor-text gap-3 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
          // isInvalid && "border-error",
          controlRef.current?.disabled && "cursor-not-allowed opacity-50",
          focused && "ring-1 ring-ring",
          className
        )}
        {...props}
      />
    </InputBaseContext.Provider>
  )
})
InputBase.displayName = "InputBase"

export const InputBaseFlexWrapper = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-wrap", className)}
    {...props}
  />
))
InputBaseFlexWrapper.displayName = "InputBaseFlexWrapper"

export const InputBaseControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ onFocus, onBlur, ...props }, ref) => {
  const { controlRef, onFocusChange } = useInputBaseContext()

  return (
    <Slot
      ref={composeRefs(controlRef, ref)}
      onFocus={composeEventHandlers(onFocus, () => onFocusChange(true))}
      onBlur={composeEventHandlers(onBlur, () => onFocusChange(false))}
      {...props}
    />
  )
})
InputBaseControl.displayName = "InputBaseControl"

interface InputBaseAdornmentProps
  extends React.ComponentPropsWithoutRef<"div"> {
  asChild?: boolean
  disablePointerEvents?: boolean
}

export const InputBaseAdornment = React.forwardRef<
  React.ElementRef<"div">,
  InputBaseAdornmentProps
>(({ className, disablePointerEvents, asChild, children, ...props }, ref) => {
  const Comp = asChild ? Slot : typeof children === "string" ? "p" : "div"

  const isAction =
    React.isValidElement(children) && children.type === InputBaseAdornmentButton

  return (
    <Comp
      ref={ref}
      className={cn(
        "flex items-center text-muted-foreground [&_svg]:size-4",
        (!isAction || disablePointerEvents) && "pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
})
InputBaseAdornment.displayName = "InputBaseAdornment"

export const InputBaseAdornmentButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(
  (
    { type = "button", variant = "ghost", size = "icon", className, ...props },
    ref
  ) => (
    <Button
      ref={ref}
      type={type}
      variant={variant}
      size={size}
      className={cn("size-6", className)}
      {...props}
    />
  )
)
InputBaseAdornmentButton.displayName = "InputBaseAdornmentButton"

export const InputBaseInput = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full flex-1 bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none",
      className
    )}
    {...props}
  />
))
InputBaseInput.displayName = "InputBaseInput"
