"use client"

import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { useComposedRefs } from "@radix-ui/react-compose-refs"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import * as RovingFocusGroupPrimitive from "@radix-ui/react-roving-focus"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandList,
} from "@/registry/new-york/ui/command"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/registry/new-york/ui/popover"

type ComboboxContextProps = {
  inputValue: string
  onInputValueChange: (inputValue: string) => void
  onInputBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  currentTabStopId: string | null
  onCurrentTabStopIdChange: (currentTabStopId: string | null) => void
  inputRef: React.RefObject<HTMLInputElement>
  tagGroupRef: React.RefObject<
    React.ElementRef<typeof RovingFocusGroupPrimitive.Root>
  >
  disabled?: boolean
  required?: boolean
} & (
  | {
      type: "multiple"
      value: string[]
      onValueChange: (value: string[]) => void
    }
  | {
      type: "single"
      value: string
      onValueChange: (value: string) => void
    }
)

const ComboboxContext = React.createContext<ComboboxContextProps>({
  type: "single",
  value: "",
  onValueChange: () => {},
  inputValue: "",
  onInputValueChange: () => {},
  onInputBlur: () => {},
  open: false,
  onOpenChange: () => {},
  currentTabStopId: null,
  onCurrentTabStopIdChange: () => {},
  inputRef: { current: null },
  tagGroupRef: { current: null },
  disabled: false,
  required: false,
})

export const useComboboxContext = () => React.useContext(ComboboxContext)

type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps

interface ComboboxBaseProps
  extends React.ComponentProps<typeof Popover>,
    Omit<
      React.ComponentProps<typeof Command>,
      "value" | "defaultValue" | "onValueChange" | "onSelect"
    > {
  inputValue?: string
  defaultInputValue?: string
  onInputValueChange?: (inputValue: string) => void
  onInputBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  disabled?: boolean
  required?: boolean
}

interface ComboboxSingleProps extends ComboboxBaseProps {
  type: "single"
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

interface ComboboxMultipleProps extends ComboboxBaseProps {
  type: "multiple"
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export const Combobox = React.forwardRef<
  React.ElementRef<typeof Command>,
  ComboboxProps
>(
  (
    {
      type = "single",
      className,
      open: openProp,
      onOpenChange,
      defaultOpen,
      modal,
      children,
      value: valueProp,
      defaultValue,
      onValueChange,
      inputValue: inputValueProp,
      defaultInputValue,
      onInputValueChange,
      onInputBlur,
      onSelect,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const [value = type === "multiple" ? [] : "", setValue] =
      useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange,
      })
    const [inputValue = "", setInputValue] = useControllableState({
      prop: inputValueProp,
      defaultProp: defaultInputValue,
      onChange: onInputValueChange,
    })
    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    })
    const [currentTabStopId, setCurrentTabStopId] = React.useState<
      string | null
    >(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const tagGroupRef =
      React.useRef<React.ElementRef<typeof RovingFocusGroupPrimitive.Root>>(
        null
      )

    return (
      <ComboboxContext.Provider
        value={
          {
            type,
            value,
            onValueChange: setValue,
            inputValue,
            onInputValueChange: setInputValue,
            onInputBlur,
            open,
            onOpenChange: setOpen,
            onSelect,
            currentTabStopId,
            onCurrentTabStopIdChange: setCurrentTabStopId,
            inputRef,
            tagGroupRef,
            disabled,
            required,
          } as ComboboxContextProps
        }
      >
        <Popover open={open} onOpenChange={setOpen} modal={modal}>
          <Command ref={ref} className={cn("p-px", className)} {...props}>
            {children}
            {!open && <CommandList aria-hidden="true" className="hidden" />}
          </Command>
        </Popover>
      </ComboboxContext.Provider>
    )
  }
)
Combobox.displayName = "Combobox"

/**
 * Connected <CommandInput /> with Autocomplete Context.
 */
export const ComboboxInputBaseInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  Omit<
    React.ComponentProps<typeof CommandPrimitive.Input>,
    "value" | "onValueChange"
  >
>(({ onKeyDown, onMouseDown, onFocus, onBlur, ...props }, ref) => {
  const {
    type,
    inputValue,
    onInputValueChange,
    onInputBlur,
    open,
    onOpenChange,
    value,
    onValueChange,
    inputRef,
    disabled,
    required,
    tagGroupRef,
  } = useComboboxContext()

  const composedRefs = useComposedRefs(ref, inputRef)

  return (
    <InputBaseControl>
      <CommandPrimitive.Input
        asChild
        ref={composedRefs}
        disabled={disabled}
        required={required}
        value={inputValue}
        onValueChange={(search) => {
          onInputValueChange(search)
          if (!search && type === "single") {
            onValueChange("")
          }
        }}
        onKeyDown={composeEventHandlers(onKeyDown, (e) => {
          // TODO: check onChange interaction should open
          onOpenChange(e.key !== "Escape")
          if (type !== "multiple") {
            return
          }
          if (e.key === "ArrowLeft" && !inputValue && value.length) {
            tagGroupRef.current?.focus()
          }
          if (e.key === "Backspace" && !inputValue) {
            onValueChange(value.slice(0, -1))
          }
        })}
        onMouseDown={composeEventHandlers(onMouseDown, () =>
          onOpenChange(!!inputValue || !open)
        )}
        onFocus={composeEventHandlers(onFocus, () => onOpenChange(true))}
        onBlur={composeEventHandlers(onBlur, (e) => {
          if (!e.relatedTarget?.hasAttribute("cmdk-list")) {
            onInputBlur?.(e)
          }
        })}
        {...props}
      >
        <InputBaseInput />
      </CommandPrimitive.Input>
    </InputBaseControl>
  )
})
ComboboxInputBaseInput.displayName = "ComboboxInputBaseInput"

export const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof ComboboxInputBaseInput>,
  React.ComponentPropsWithoutRef<typeof ComboboxInputBaseInput>
>((props, ref) => (
  <PopoverAnchor asChild>
    <InputBase ref={ref} {...props}>
      <ComboboxInputBaseInput ref={ref} {...props} />
      <InputBaseAdornment>
        <CaretSortIcon />
      </InputBaseAdornment>
    </InputBase>
  </PopoverAnchor>
))
ComboboxInput.displayName = "ComboboxInput"

export const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent>
>(
  (
    { className, children, onOpenAutoFocus, onInteractOutside, ...props },
    ref
  ) => (
    <PopoverContent
      asChild
      ref={ref}
      onOpenAutoFocus={composeEventHandlers(onOpenAutoFocus, (e) =>
        e.preventDefault()
      )}
      onInteractOutside={composeEventHandlers(onInteractOutside, (e) => {
        if (
          e.target instanceof Element &&
          e.target.hasAttribute("cmdk-input")
        ) {
          e.preventDefault()
        }
      })}
      className={cn("w-[--radix-popover-trigger-width] p-1", className)}
      {...props}
    >
      <CommandList>{children}</CommandList>
    </PopoverContent>
  )
)
ComboboxContent.displayName = "ComboboxContent"

export const ComboboxEmpty = CommandEmpty

export const ComboboxGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-semibold",
      className
    )}
    {...props}
  />
))

interface ComboboxItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
    "value"
  > {
  /**
   * The value given as data when submitted with a name.
   */
  value: string
  textValue?: string
}

export const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  ComboboxItemProps
>(({ textValue, value: valueProp, children, onMouseDown, ...props }, ref) => {
  const { type, value, onValueChange, onInputValueChange, onOpenChange } =
    useComboboxContext()

  const itemRef =
    React.useRef<React.ElementRef<typeof CommandPrimitive.Item>>(null)

  const composedRefs = useComposedRefs(ref, itemRef)

  const inputValue = React.useMemo(() => {
    if (textValue) {
      return textValue
    }

    if (typeof children === "string") {
      return children.trim()
    }

    return itemRef.current?.textContent?.trim() ?? ""
  }, [textValue, children, itemRef.current])

  return (
    <CommandPrimitive.Item
      ref={composedRefs}
      onMouseDown={composeEventHandlers(onMouseDown, (e) => e.preventDefault())}
      onSelect={() => {
        if (type === "multiple") {
          onValueChange(
            value.includes(valueProp)
              ? value.filter((v) => v !== valueProp)
              : [...value, valueProp]
          )
        } else {
          onValueChange(valueProp)
        }
        onInputValueChange(inputValue)
        onOpenChange(false)
      }}
      value={inputValue}
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
      {...props}
    >
      {value === valueProp && (
        <span className="absolute right-2 flex size-3.5 items-center justify-center">
          <CheckIcon className="size-4" />
        </span>
      )}
      {children}
    </CommandPrimitive.Item>
  )
})
ComboboxItem.displayName = "ComboboxItem"
