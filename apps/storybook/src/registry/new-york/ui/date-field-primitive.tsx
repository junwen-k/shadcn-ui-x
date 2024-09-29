import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { Primitive } from "@radix-ui/react-primitive"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { format, isValid, parse } from "date-fns"

interface DateFieldProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Primitive.input>,
    "value" | "defaultValue"
  > {
  inputFormatStr: string
  value?: Date | null
  defaultValue?: Date
  onValueChange?: (value: Date | null) => void
  /**
   * If true, the input's text is cleared on blur if date string is invalid.
   */
  clearOnBlur?: boolean
}

const DateField = React.forwardRef<
  React.ElementRef<typeof Primitive.input>,
  DateFieldProps
>(
  (
    {
      value: valueProp,
      defaultValue,
      onValueChange,
      onBlur,
      inputFormatStr = "yyyy-MM-dd",
      clearOnBlur,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange,
    })

    const [inputValue, setInputValue] = React.useState(
      value ? format(value, inputFormatStr) : ""
    )
    React.useEffect(() => {
      setInputValue(value ? format(value, inputFormatStr) : "")
    }, [value])

    return (
      <Primitive.input
        ref={ref}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onBlur={composeEventHandlers(onBlur, (event) => {
          const parsedDate = parse(
            event.target.value,
            inputFormatStr,
            new Date()
          )

          if (!isValid(parsedDate)) {
            if (clearOnBlur) {
              setValue(null)
              setInputValue("")
            } else {
              setInputValue(value ? format(value, inputFormatStr) : "")
            }
            return
          }

          setValue(parsedDate)
          setInputValue(format(parsedDate, inputFormatStr))
        })}
        placeholder={inputFormatStr}
        {...props}
      />
    )
  }
)
DateField.displayName = "DateField"

const Root = DateField

export { Root }
