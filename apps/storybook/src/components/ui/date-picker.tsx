"use client"

import React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Primitive } from "@radix-ui/react-primitive"
import type * as Radix from "@radix-ui/react-primitive"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { format, isValid, parse } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import type { DayPickerSingleProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseFlexWrapper,
  InputBaseInput,
} from "@/components/ui/input-base"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps extends React.ComponentProps<typeof Popover> {
  formatStr?: string
  inputFormatStr?: string
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  value?: Date | null
  defaultValue?: Date
  onValueChange?: (value: Date | null) => void
  inputValue?: string
  defaultInputValue?: string
  onInputValueChange?: (inputValue: string) => void
  disabled?: boolean
  required?: boolean
}

const DatePickerContext = React.createContext<
  Pick<
    DatePickerProps,
    "month" | "value" | "disabled" | "required" | "inputValue"
  > &
    Required<
      Pick<
        DatePickerProps,
        | "formatStr"
        | "inputFormatStr"
        | "onMonthChange"
        | "onValueChange"
        | "onInputValueChange"
      >
    >
>({
  formatStr: "PPP",
  inputFormatStr: "yyyy-MM-dd",
  month: undefined,
  onMonthChange: () => {},
  value: undefined,
  onValueChange: () => {},
  inputValue: "",
  onInputValueChange: () => {},
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
  inputValue: inputValueProp,
  defaultInputValue,
  onInputValueChange,
  disabled,
  required,
}: DatePickerProps) => {
  // Use `null` as empty value when in controlled mode.
  const [value, setValue] = useControllableState<Date | null>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })
  const [inputValue = "", setInputValue] = useControllableState({
    prop: inputValueProp,
    defaultProp: defaultInputValue,
    onChange: onInputValueChange,
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
        inputValue,
        onInputValueChange: setInputValue,
        disabled,
        required,
      }}
    >
      <Popover
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        modal={modal}
      >
        {children}
      </Popover>
    </DatePickerContext.Provider>
  )
}

export const DatePickerInput = React.forwardRef<
  React.ElementRef<typeof InputBase>,
  Omit<React.ComponentPropsWithoutRef<typeof InputBase>, "children">
>((props, ref) => {
  const { required } = useDatePickerContext()

  return (
    <PopoverPrimitive.Anchor>
      <InputBase ref={ref} {...props}>
        <DatePickerInputBaseInput />
        {!required && <DatePickerInputAdornmentClear />}
        <InputBaseAdornment>
          <InputBaseAdornmentButton asChild>
            <PopoverTrigger>
              <CalendarIcon />
            </PopoverTrigger>
          </InputBaseAdornmentButton>
        </InputBaseAdornment>
      </InputBase>
    </PopoverPrimitive.Anchor>
  )
})
DatePickerInput.displayName = "DatePickerInput"

export const DatePickerInputAdornmentClear = React.forwardRef<
  React.ElementRef<typeof InputBaseAdornmentButton>,
  React.ComponentPropsWithoutRef<typeof InputBaseAdornmentButton>
>(({ className, onClick, ...props }, ref) => {
  const { value, inputValue, onValueChange, onInputValueChange } =
    useDatePickerContext()

  return (
    <InputBaseAdornment>
      <InputBaseAdornmentButton
        ref={ref}
        disabled={!value && !inputValue}
        onClick={composeEventHandlers(onClick, () => {
          onValueChange(null)
          onInputValueChange("")
        })}
        {...props}
      >
        <span className="sr-only">Clear date</span>
        <X />
      </InputBaseAdornmentButton>
    </InputBaseAdornment>
  )
})
DatePickerInputAdornmentClear.displayName = "DatePickerInputAdornmentClear"

export const DatePickerInputBaseInput = React.forwardRef<
  React.ElementRef<typeof InputBaseInput>,
  React.ComponentPropsWithoutRef<typeof InputBaseInput>
>(({ onChange, onBlur, ...props }, ref) => {
  const {
    inputFormatStr,
    onMonthChange,
    inputValue,
    onInputValueChange,
    onValueChange,
  } = useDatePickerContext()

  return (
    <InputBaseControl>
      <InputBaseInput
        ref={ref}
        value={inputValue}
        onBlur={composeEventHandlers(onBlur, (e) => {
          const parsedDate = parse(e.target.value, inputFormatStr, new Date())

          if (isValid(parsedDate)) {
            onValueChange(parsedDate)
            onMonthChange(parsedDate)
          } else {
            onInputValueChange("")
            onValueChange(null)
          }
        })}
        onChange={composeEventHandlers(onChange, (e) => {
          onInputValueChange(e.target.value)

          const parsedDate = parse(e.target.value, inputFormatStr, new Date())

          if (isValid(parsedDate)) {
            onValueChange(parsedDate)
            onMonthChange(parsedDate)
          } else {
            onValueChange(null)
          }
        })}
        placeholder={inputFormatStr}
        {...props}
      />
    </InputBaseControl>
  )
})
DatePickerInputBaseInput.displayName = "DatePickerInputBaseInput"

export const DatePickerTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  React.ComponentPropsWithoutRef<typeof PopoverTrigger>
>(({ children, className, ...props }, ref) => (
  <InputBase
    asChild
    className={cn(
      "hover:bg-accent hover:text-accent-foreground w-full items-center cursor-pointer",
      className
    )}
  >
    <PopoverTrigger ref={ref} {...props}>
      <InputBaseFlexWrapper>{children}</InputBaseFlexWrapper>
      <InputBaseAdornment>
        <CalendarIcon />
      </InputBaseAdornment>
    </PopoverTrigger>
  </InputBase>
))
DatePickerTrigger.displayName = "DatePickerTrigger"

interface DatePickerValueProps
  extends Radix.PrimitivePropsWithRef<typeof Primitive.span> {
  placeholder?: React.ReactNode
}

export const DatePickerValue = React.forwardRef<
  React.ElementRef<typeof Primitive.span>,
  DatePickerValueProps
>(({ placeholder, children, className, ...props }, ref) => {
  const { formatStr, value } = useDatePickerContext()

  return (
    <Primitive.span
      ref={ref}
      className={cn(!value && "text-muted-foreground/40", className)}
      {...props}
    >
      {!value ? placeholder : children ?? format(value, formatStr)}
    </Primitive.span>
  )
})
DatePickerValue.displayName = "DatePickerValue"

export const DatePickerContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent>
>(({ align = "start", className, ...props }, ref) => (
  <PopoverContent
    ref={ref}
    align={align}
    className={cn("w-auto p-0", className)}
    {...props}
  />
))
DatePickerContent.displayName = "DatePickerContent"

export const DatePickerCalendar = React.forwardRef<
  React.ElementRef<typeof Calendar>,
  Omit<DayPickerSingleProps, "mode">
>(({ initialFocus = true, ...props }, ref) => {
  const {
    inputFormatStr,
    month,
    onMonthChange,
    value,
    onValueChange,
    onInputValueChange,
    disabled,
    required,
  } = useDatePickerContext()

  return (
    <Calendar
      ref={ref}
      mode="single"
      selected={value === null ? undefined : value}
      onSelect={(date) => {
        if (!date) {
          onValueChange(null)
          onInputValueChange("")
        } else {
          onValueChange(date)
          onInputValueChange(format(date, inputFormatStr))
        }
      }}
      month={month}
      onMonthChange={onMonthChange}
      disabled={disabled}
      required={required}
      initialFocus={initialFocus}
      {...props}
    />
  )
})
DatePickerCalendar.displayName = "DatePickerCalendar"
