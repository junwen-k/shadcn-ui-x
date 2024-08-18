"use client"

import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { UploadIcon } from "@radix-ui/react-icons"
import { Primitive } from "@radix-ui/react-primitive"
import {
  useDropzone,
  type DropzoneOptions,
  type DropzoneState,
} from "react-dropzone"

import { cn } from "@/lib/utils"

type DropzoneContextProps = DropzoneState & DropzoneOptions

const DropzoneContext = React.createContext<DropzoneContextProps>(
  {} as DropzoneContextProps
)

export const useDropzoneContext = () => React.useContext(DropzoneContext)

interface DropzoneProps extends DropzoneOptions {
  children: React.ReactNode | ((state: DropzoneContextProps) => React.ReactNode)
}

export const Dropzone = ({ children, ...props }: DropzoneProps) => {
  const state = useDropzone(props)

  const context = { ...state, ...props }

  return (
    <DropzoneContext.Provider value={context}>
      {typeof children === "function" ? children(context) : children}
    </DropzoneContext.Provider>
  )
}

export const DropzoneInput = React.forwardRef<
  React.ElementRef<typeof Primitive.input>,
  React.ComponentPropsWithoutRef<typeof Primitive.input>
>((props, ref) => {
  const { getInputProps, disabled } = useDropzoneContext()

  return (
    <Primitive.input ref={ref} {...getInputProps({ disabled, ...props })} />
  )
})
DropzoneInput.displayName = "DropzoneInput"

export const DropzoneZone = React.forwardRef<
  React.ElementRef<typeof Primitive.div>,
  React.ComponentPropsWithoutRef<typeof Primitive.div>
>(({ className, ...props }, ref) => {
  const { getRootProps, isDragActive, isDragReject, disabled } =
    useDropzoneContext()

  return (
    <Primitive.div
      ref={ref}
      {...getRootProps({
        className: cn(
          "rounded border border-dashed border-input p-6 transition-colors",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          !disabled &&
            "cursor-pointer hover:border-accent-foreground hover:bg-accent",
          isDragActive && "bg-accent",
          isDragReject && "cursor-no-drop border-destructive",
          className
        ),
        ...props,
      })}
    />
  )
})
DropzoneZone.displayName = "DropzoneZone"

export const DropzoneZoneIcon = React.forwardRef<
  React.ElementRef<typeof UploadIcon>,
  React.ComponentPropsWithoutRef<typeof UploadIcon>
>(({ className, ...props }, ref) => (
  <UploadIcon ref={ref} className={cn("size-8", className)} {...props} />
))
DropzoneZoneIcon.displayName = "DropzoneZoneIcon"

export const DropzoneZoneTitle = React.forwardRef<
  React.ElementRef<typeof Primitive.h3>,
  React.ComponentPropsWithoutRef<typeof Primitive.h3>
>(({ className, ...props }, ref) => (
  <Primitive.h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DropzoneZoneTitle.displayName = "DropzoneZoneTitle"

export const DropzoneZoneDescription = React.forwardRef<
  React.ElementRef<typeof Primitive.p>,
  React.ComponentPropsWithoutRef<typeof Primitive.p>
>(({ className, ...props }, ref) => (
  <Primitive.p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DropzoneZoneDescription.displayName = "DropzoneZoneDescription"

export const DropzoneTrigger = React.forwardRef<
  React.ElementRef<typeof Primitive.button>,
  React.ComponentPropsWithoutRef<typeof Primitive.button>
>(({ onClick, ...props }, ref) => {
  const { open } = useDropzoneContext()

  return (
    <Primitive.button
      ref={ref}
      onClick={composeEventHandlers(onClick, open)}
      {...props}
    />
  )
})
