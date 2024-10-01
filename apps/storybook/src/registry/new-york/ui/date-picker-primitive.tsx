"use client"

import React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Primitive } from "@radix-ui/react-primitive"
import type * as Radix from "@radix-ui/react-primitive"
import { Slot } from "@radix-ui/react-slot"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { format } from "date-fns"
import {
  DayPicker,
  type Mode as DatePickerMode,
  type DateRange,
  type DayPickerProps as DayPickerPrimitiveProps,
} from "react-day-picker"

import * as DateFieldPrimitive from "@/registry/new-york/ui/date-field-primitive"

type DatePickerContextProps = {
  formatStr: string
  inputFormatStr: string
  month?: Date
  onMonthChange: (month: Date) => void
  disabled?: boolean
} & (
  | Required<
      Pick<
        DatePickerSingleProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
  | Required<
      Pick<
        DatePickerSingleRequiredProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
  | Required<
      Pick<
        DatePickerMultipleProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
  | Required<
      Pick<
        DatePickerMultipleRequiredProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
  | Required<
      Pick<
        DatePickerRangeProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
  | Required<
      Pick<
        DatePickerRangeRequiredProps,
        "mode" | "required" | "value" | "onValueChange"
      >
    >
)

const DatePickerContext = React.createContext<DatePickerContextProps>({
  mode: "single",
  formatStr: "PPP",
  inputFormatStr: "yyyy-MM-dd",
  month: undefined,
  onMonthChange: () => {},
  value: null,
  onValueChange: () => {},
  disabled: false,
  required: false,
})

export const useDatePickerContext = () => React.useContext(DatePickerContext)

interface DatePickerBaseProps
  extends React.ComponentProps<typeof PopoverPrimitive.Root> {
  mode?: DatePickerMode | undefined
  required?: boolean
  formatStr?: string
  inputFormatStr?: string
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  disabled?: boolean
}

type DatePickerValue<T extends DatePickerMode = "single"> = T extends "single"
  ? Date
  : T extends "multiple"
    ? Date[]
    : T extends "range"
      ? DateRange
      : never

interface DatePickerSingleProps {
  mode: "single"
  required?: false | undefined
  value?: Date | null
  defaultValue?: Date
  onValueChange?: (value: Date | null) => void
}

interface DatePickerSingleRequiredProps {
  mode: "single"
  required: true
  value?: Date
  defaultValue?: Date
  onValueChange?: (value: Date) => void
}

interface DatePickerMultipleProps {
  mode: "multiple"
  required?: false | undefined
  value?: Date[] | null
  defaultValue?: Date[]
  onValueChange?: (value: Date[] | null) => void
}

interface DatePickerMultipleRequiredProps {
  mode: "multiple"
  required: true
  value?: Date[]
  defaultValue?: Date[]
  onValueChange?: (value: Date[]) => void
}

interface DatePickerRangeProps {
  mode: "range"
  required?: false | undefined
  value?: DateRange | null
  defaultValue?: DateRange
  onValueChange?: (value: DateRange | null) => void
}

interface DatePickerRangeRequiredProps {
  mode: "range"
  required: true
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (value: DateRange) => void
}

type DatePickerProps = DatePickerBaseProps &
  (
    | DatePickerSingleProps
    | DatePickerSingleRequiredProps
    | DatePickerMultipleProps
    | DatePickerMultipleRequiredProps
    | DatePickerRangeProps
    | DatePickerRangeRequiredProps
  )

export const DatePicker = <T extends DatePickerMode = "single">({
  mode = "single" as T,
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
  required = false,
}: DatePickerProps) => {
  // Use `null` as empty value when in controlled mode.
  const [value, setValue] = useControllableState<DatePickerValue<T>>({
    prop: valueProp as DatePickerValue<T>,
    defaultProp: defaultValue as DatePickerValue<T>,
    onChange: onValueChange as (value: DatePickerValue<T>) => void,
  })
  const [month, setMonth] = useControllableState({
    prop: monthProp,
    defaultProp: defaultMonth,
    onChange: onMonthChange,
  })

  return (
    <DatePickerContext.Provider
      value={
        {
          mode,
          required,
          formatStr,
          inputFormatStr,
          month,
          onMonthChange: setMonth,
          value,
          onValueChange: setValue,
          disabled,
        } as DatePickerContextProps
      }
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
  const {
    mode,
    inputFormatStr,
    onMonthChange,
    value,
    onValueChange,
    required,
  } = useDatePickerContext()

  if (mode !== "single") {
    throw new Error(
      '<DatePickerInput> should only be used when mode is "single"'
    )
  }

  return (
    <DateFieldPrimitive.Root
      ref={ref}
      inputFormatStr={inputFormatStr}
      value={value}
      onValueChange={(date) => {
        if (date) {
          onValueChange(date)
          onMonthChange(date)
        } else if (!required) {
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
      onClick={composeEventHandlers(
        onClick,
        () => !required && onValueChange(null)
      )}
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
  const { mode, formatStr, value } = useDatePickerContext()

  const isValueEmpty = React.useMemo(() => {
    if (mode === "single") {
      return !value
    }
    if (mode === "multiple") {
      return !value?.length
    }
    return !value?.from
  }, [mode, value])

  const formattedValue = React.useMemo(() => {
    if (!value) {
      return null
    }
    if (mode === "single") {
      return format(value, formatStr)
    }
    if (mode === "multiple") {
      return value.map((v) => format(v, formatStr)).join(", ")
    }
    return `${value.from ? format(value.from, formatStr) : "Select a date"} - ${value.to ? format(value.to, formatStr) : "Select a date"}`
  }, [mode, value, formatStr])

  return (
    <Primitive.span
      ref={ref}
      data-placeholder={isValueEmpty ? true : undefined}
      {...props}
    >
      {isValueEmpty ? placeholder : children ?? formattedValue}
    </Primitive.span>
  )
})
DatePickerValue.displayName = "DatePickerValue"

export const DatePickerContent = PopoverPrimitive.Content

interface DatePickerCalendarProps
  extends Omit<
    DayPickerPrimitiveProps,
    | "mode"
    | "selected"
    | "onSelect"
    | "month"
    | "onMonthChange"
    | "disabled"
    | "required"
  > {
  asChild?: boolean
  children?: React.ReactNode
}

export const DatePickerCalendar = ({
  asChild,
  autoFocus = true,
  ...props
}: DatePickerCalendarProps) => {
  const {
    mode,
    month,
    onMonthChange,
    value,
    onValueChange,
    disabled,
    required,
  } = useDatePickerContext()

  const Comp = asChild ? (Slot as typeof DayPicker) : DayPicker

  return (
    <Comp
      mode={mode}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selected={value === null ? undefined : (value as any)}
      onSelect={(value: Date | Date[] | DateRange | undefined) => {
        if (!value && !required) {
          onValueChange(null)
        }
        if (mode === "single") {
          onValueChange(value as Date)
        }
        if (mode === "multiple") {
          onValueChange(value as Date[])
        }
        if (mode === "range") {
          onValueChange(value as DateRange)
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
}

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
