"use client"

import React from "react"
import { Primitive } from "@radix-ui/react-primitive"
import type * as Radix from "@radix-ui/react-primitive"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { format } from "date-fns"
import { CalendarIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseFlexWrapper,
} from "@/components/ui/input-base"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps extends React.ComponentProps<typeof Popover> {
  value?: Date | null
  defaultValue?: Date
  onValueChange?: (value: Date | null) => void
  disabled?: boolean
  required?: boolean
}

const DatePickerContext = React.createContext<
  Pick<DatePickerProps, "value" | "disabled" | "required"> &
    Required<Pick<DatePickerProps, "onValueChange">>
>({
  value: undefined,
  onValueChange: () => {},
  disabled: false,
  required: false,
})

export const useDatePickerContext = () => React.useContext(DatePickerContext)

export const DatePicker = ({
  open,
  onOpenChange,
  defaultOpen,
  modal,
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
  required,
}: DatePickerProps) => {
  // Use `null` as the empty value when in controlled mode.
  const [value, setValue] = useControllableState<Date | null>({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  return (
    <DatePickerContext.Provider
      value={{
        value,
        onValueChange: setValue,
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

export const DatePickerTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  React.ComponentPropsWithoutRef<typeof PopoverTrigger>
>(({ children, className, ...props }, ref) => {
  const { required } = useDatePickerContext()

  // NOTE: potential use of `useInput` to build an input date field

  return (
    <PopoverTrigger className={cn("w-full", className)} ref={ref} {...props}>
      <InputBase className="items-center">
        <InputBaseAdornment>
          <CalendarIcon />
        </InputBaseAdornment>
        <InputBaseFlexWrapper>{children}</InputBaseFlexWrapper>
        {!required && <DatePickerClear />}
      </InputBase>
    </PopoverTrigger>
  )
})
DatePickerTrigger.displayName = "DatePickerTrigger"

interface DatePickerValueProps
  extends Radix.PrimitivePropsWithRef<typeof Primitive.span> {
  placeholder?: React.ReactNode
  formatStr?: string
}

export const DatePickerValue = React.forwardRef<
  React.ElementRef<typeof Primitive.span>,
  DatePickerValueProps
>(({ placeholder, children, className, formatStr = "PPP", ...props }, ref) => {
  const { value } = useDatePickerContext()

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

export const DatePickerClear = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  const { onValueChange } = useDatePickerContext()

  return (
    <InputBaseAdornment>
      {/* Button cannot be nested within Button. */}
      <InputBaseAdornmentButton asChild>
        <div
          ref={ref}
          role="button"
          onClick={(e) => {
            e.stopPropagation()
            onValueChange(null)
          }}
          {...props}
        >
          <span className="sr-only">Clear date</span>
          <XIcon />
        </div>
      </InputBaseAdornmentButton>
    </InputBaseAdornment>
  )
})
DatePickerClear.displayName = "DatePickerClear"

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
  React.ComponentPropsWithoutRef<typeof Calendar>
>(({ initialFocus = true, ...props }, ref) => {
  const { value, onValueChange, disabled, required } = useDatePickerContext()

  return (
    <Calendar
      ref={ref}
      mode="single"
      selected={value === null ? undefined : value}
      onSelect={(date) => onValueChange(date === undefined ? null : date)}
      disabled={disabled}
      required={required}
      initialFocus={initialFocus}
    />
  )
})
DatePickerCalendar.displayName = "DatePickerCalendar"
