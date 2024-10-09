"use client"

import React from "react"
import { CalendarIcon, Cross2Icon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/new-york/ui/button"
import { Calendar } from "@/registry/new-york/ui/calendar"
import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-primitive"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseFlexWrapper,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base"

export const DatePicker = DatePickerPrimitive.Root

export const DatePickerAnchor = DatePickerPrimitive.Anchor

const DatePickerInputBase = React.forwardRef<
  React.ElementRef<typeof InputBase>,
  React.ComponentPropsWithoutRef<typeof InputBase>
>(({ children, ...props }, ref) => (
  <DatePickerAnchor asChild>
    <InputBase ref={ref} {...props}>
      {children}
      <InputBaseAdornment>
        <InputBaseAdornmentButton asChild>
          <DatePickerPrimitive.Clear>
            <span className="sr-only">Clear date</span>
            <Cross2Icon />
          </DatePickerPrimitive.Clear>
        </InputBaseAdornmentButton>
      </InputBaseAdornment>
      <InputBaseAdornment>
        <InputBaseAdornmentButton asChild>
          <DatePickerPrimitive.Trigger>
            <CalendarIcon />
          </DatePickerPrimitive.Trigger>
        </InputBaseAdornmentButton>
      </InputBaseAdornment>
    </InputBase>
  </DatePickerAnchor>
))
DatePickerInputBase.displayName = "DatePickerInputBase"

export const DatePickerInput = React.forwardRef<
  React.ElementRef<typeof InputBaseInput>,
  React.ComponentPropsWithoutRef<typeof InputBaseInput>
>((props, ref) => {
  const { disabled } = DatePickerPrimitive.useDatePickerContext()

  return (
    <DatePickerInputBase disabled={disabled}>
      <InputBaseControl>
        <DatePickerPrimitive.Input asChild>
          <InputBaseInput ref={ref} {...props} />
        </DatePickerPrimitive.Input>
      </InputBaseControl>
    </DatePickerInputBase>
  )
})
DatePickerInput.displayName = "DatePickerInput"

export const DatePickerTrigger = React.forwardRef<
  React.ElementRef<typeof DatePickerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DatePickerPrimitive.Trigger>
>(({ children, className, ...props }, ref) => (
  <InputBase
    asChild
    className={cn(
      buttonVariants({ variant: "outline" }),
      "cursor-pointer font-normal",
      className
    )}
  >
    <DatePickerPrimitive.Trigger ref={ref} {...props}>
      <InputBaseFlexWrapper>{children}</InputBaseFlexWrapper>
      <InputBaseAdornment>
        <CalendarIcon />
      </InputBaseAdornment>
    </DatePickerPrimitive.Trigger>
  </InputBase>
))
DatePickerTrigger.displayName = "DatePickerTrigger"

export const DatePickerValue = React.forwardRef<
  React.ElementRef<typeof DatePickerPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof DatePickerPrimitive.Value>
>(({ className, ...props }, ref) => (
  <DatePickerPrimitive.Value
    ref={ref}
    className={cn("data-[placeholder]:text-muted-foreground/40", className)}
    {...props}
  />
))
DatePickerValue.displayName = "DatePickerValue"

export const DatePickerContent = React.forwardRef<
  React.ElementRef<typeof DatePickerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DatePickerPrimitive.Content>
>(({ className, align = "start", alignOffset = 4, ...props }, ref) => (
  <DatePickerPrimitive.Portal>
    <DatePickerPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      className={cn(
        "relative z-50 max-h-96 w-auto overflow-hidden rounded-md border bg-popover p-0 text-popover-foreground shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DatePickerPrimitive.Portal>
))
DatePickerContent.displayName = "DatePickerContent"

export const DatePickerCalendar = (
  props: React.ComponentPropsWithoutRef<typeof Calendar>
) => (
  <DatePickerPrimitive.Calendar asChild>
    <Calendar {...props} />
  </DatePickerPrimitive.Calendar>
)
