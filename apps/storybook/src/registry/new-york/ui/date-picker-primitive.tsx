"use client"

import React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Primitive } from "@radix-ui/react-primitive"
import type * as Radix from "@radix-ui/react-primitive"
import { Slot } from "@radix-ui/react-slot"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { format } from "date-fns"
import type { DayPickerProps as DayPickerPrimitiveProps } from "react-day-picker"
import { DayPicker } from "react-day-picker"

import * as DateFieldPrimitive from "@/registry/new-york/ui/date-field-primitive"

interface DatePickerProps
  extends React.ComponentProps<typeof PopoverPrimitive.Root> {
  formatStr?: string
  inputFormatStr?: string
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  value?: Date | null
  defaultValue?: Date
  onValueChange?: (value: Date | null) => void
  disabled?: boolean
  required?: boolean
}

const DatePickerContext = React.createContext<
  Pick<DatePickerProps, "month" | "value" | "disabled" | "required"> &
    Required<
      Pick<
        DatePickerProps,
        "formatStr" | "inputFormatStr" | "onMonthChange" | "onValueChange"
      >
    >
>({
  formatStr: "PPP",
  inputFormatStr: "yyyy-MM-dd",
  month: undefined,
  onMonthChange: () => {},
  value: undefined,
  onValueChange: () => {},
  disabled: false,
  required: false,
})

export const useDatePickerContext = () => React.useContext(DatePickerContext)

export const DatePicker = ({
  formatStr = "PPP",
  inputFormatStr = "yyyy-MM-dd",
  open,
  onOpenChange,
  defaultOpen,
  modal,
  children,
  month: monthProp,
  defaultMonth,
  onMonthChange,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
  required,
}: DatePickerProps) => {
  // Use `null` as empty value when in controlled mode.
  const [value, setValue] = useControllableState<Date | null>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })
  const [month, setMonth] = useControllableState({
    prop: monthProp,
    defaultProp: defaultMonth,
    onChange: onMonthChange,
  })

  return (
    <DatePickerContext.Provider
      value={{
        formatStr,
        inputFormatStr,
        month,
        onMonthChange: setMonth,
        value,
        onValueChange: setValue,
        disabled,
        required,
      }}
    >
      <PopoverPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        modal={modal}
      >
        {children}
      </PopoverPrimitive.Root>
    </DatePickerContext.Provider>
  )
}

export const DatePickerTrigger = PopoverPrimitive.Trigger

export const DatePickerInput = React.forwardRef<
  React.ElementRef<typeof DateFieldPrimitive.Root>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DateFieldPrimitive.Root>,
    "inputFormatStr" | "onValueChange"
  >
>((props, ref) => {
  const { inputFormatStr, onMonthChange, value, onValueChange } =
    useDatePickerContext()

  return (
    <DateFieldPrimitive.Root
      ref={ref}
      inputFormatStr={inputFormatStr}
      value={value}
      onValueChange={(date) => {
        if (date) {
          onValueChange(date)
          onMonthChange(date)
        } else {
          onValueChange(null)
        }
      }}
      placeholder={inputFormatStr}
      {...props}
    />
  )
})
DatePickerInput.displayName = "DatePickerInput"

export const DatePickerAnchor = PopoverPrimitive.Anchor

export const DatePickerPortal = PopoverPrimitive.Portal

export const DatePickerClear = React.forwardRef<
  React.ElementRef<typeof Primitive.button>,
  React.ComponentPropsWithoutRef<typeof Primitive.button>
>(({ onClick, ...props }, ref) => {
  const { required, value, onValueChange } = useDatePickerContext()

  return (
    <Primitive.button
      ref={ref}
      disabled={required || !value}
      onClick={composeEventHandlers(onClick, () => onValueChange(null))}
      {...props}
    />
  )
})
DatePickerClear.displayName = "DatePickerClear"

interface DatePickerValueProps
  extends Radix.PrimitivePropsWithRef<typeof Primitive.span> {
  placeholder?: React.ReactNode
}

export const DatePickerValue = React.forwardRef<
  React.ElementRef<typeof Primitive.span>,
  DatePickerValueProps
>(({ placeholder, children, ...props }, ref) => {
  const { formatStr, value } = useDatePickerContext()

  return (
    <Primitive.span
      ref={ref}
      data-placeholder={!value ? true : undefined}
      {...props}
    >
      {!value ? placeholder : children ?? format(value, formatStr)}
    </Primitive.span>
  )
})
DatePickerValue.displayName = "DatePickerValue"

export const DatePickerContent = PopoverPrimitive.Content

interface DatePickerCalendarProps
  extends Omit<DayPickerPrimitiveProps, "mode"> {
  asChild?: boolean
  children?: React.ReactNode
}

// TODO: add range support

export const DatePickerCalendar = React.forwardRef<
  React.ElementRef<typeof DayPicker>,
  DatePickerCalendarProps
>(({ asChild, autoFocus = true, ...props }, ref) => {
  const { month, onMonthChange, value, onValueChange, disabled, required } =
    useDatePickerContext()

  const Comp = asChild ? Slot : DayPicker

  return (
    <Comp
      ref={ref}
      mode="single"
      selected={value === null ? undefined : value}
      onSelect={(date) => {
        if (!date) {
          onValueChange(null)
        } else {
          onValueChange(date)
        }
      }}
      month={month}
      onMonthChange={onMonthChange}
      disabled={disabled}
      required={required}
      autoFocus={autoFocus}
      {...props}
    />
  )
})
DatePickerCalendar.displayName = "DatePickerCalendar"

const Root = DatePicker
const Input = DatePickerInput
const Value = DatePickerValue
const Clear = DatePickerClear
const Trigger = DatePickerTrigger
const Anchor = DatePickerAnchor
const Portal = DatePickerPortal
const Content = DatePickerContent
const Calendar = DatePickerCalendar

export { Root, Input, Value, Clear, Trigger, Anchor, Portal, Content, Calendar }
