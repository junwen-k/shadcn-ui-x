"use client"

import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { composeRefs, useComposedRefs } from "@radix-ui/react-compose-refs"
import { CaretSortIcon } from "@radix-ui/react-icons"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import * as RovingFocusGroupPrimitive from "@radix-ui/react-roving-focus"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/registry/new-york/ui/command"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseFlexWrapper,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base"
import { Popover, PopoverContent } from "@/registry/new-york/ui/popover"
import { Tag } from "@/registry/new-york/ui/tag"

type AutocompleteContextProps = {
  multiple: boolean
  inputValue: string
  onInputValueChange: (inputValue: string) => void
  onInputBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  currentTabStopId: string | null
  onCurrentTabStopIdChange: (currentTabStopId: string | null) => void
  onSelect: React.ComponentProps<typeof CommandItem>["onSelect"]
  inputRef: React.RefObject<HTMLInputElement>
  tagGroupRef: React.RefObject<
    React.ElementRef<typeof RovingFocusGroupPrimitive.Root>
  >
  disabled?: boolean
  required?: boolean
} & (
  | {
      multiple: true
      value: string[]
      onValueChange: (value: string[]) => void
    }
  | {
      multiple: false
      value: string
      onValueChange: (value: string) => void
    }
)

const AutocompleteContext = React.createContext<AutocompleteContextProps>({
  multiple: false,
  value: "",
  onValueChange: () => {},
  inputValue: "",
  onInputValueChange: () => {},
  onInputBlur: () => {},
  onSelect: () => {},
  open: false,
  onOpenChange: () => {},
  currentTabStopId: null,
  onCurrentTabStopIdChange: () => {},
  inputRef: { current: null },
  tagGroupRef: { current: null },
  disabled: false,
  required: false,
})

export const useAutocompleteContext = () =>
  React.useContext(AutocompleteContext)

export type AutocompleteValue<
  Multiple extends boolean | undefined,
  TValue = string,
> = Multiple extends true ? Array<TValue> : TValue

type AutocompleteProps<Multiple extends boolean | undefined> = {
  multiple?: Multiple
  value?: AutocompleteValue<Multiple>
  defaultValue?: AutocompleteValue<Multiple>
  onValueChange?: (value: AutocompleteValue<Multiple>) => void
  inputValue?: string
  defaultInputValue?: string
  onInputValueChange?: (inputValue: string) => void
  onInputBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  onSelect?: React.ComponentProps<typeof CommandItem>["onSelect"]
  disabled?: boolean
  required?: boolean
} & React.ComponentProps<typeof Popover> &
  Omit<
    React.ComponentProps<typeof Command>,
    "value" | "onValueChange" | "onSelect"
  >

/**
 * The Autocomplete is built using a composition of the <Popover />, <Chip /> and <Command /> components.
 * Set `shouldFilter` to false if you need server side filtering.
 */
export const Autocomplete = <Multiple extends boolean | undefined = false>({
  multiple,
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
}: AutocompleteProps<Multiple>) => {
  const [value = multiple ? [] : "", setValue] = useControllableState({
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
  const [currentTabStopId, setCurrentTabStopId] = React.useState<string | null>(
    null
  )
  const inputRef = React.useRef<HTMLInputElement>(null)
  const tagGroupRef =
    React.useRef<React.ElementRef<typeof RovingFocusGroupPrimitive.Root>>(null)

  return (
    <AutocompleteContext.Provider
      value={
        {
          multiple: multiple ?? false,
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
        } as AutocompleteContextProps
      }
    >
      <Popover open={open} onOpenChange={setOpen} modal={modal}>
        <Command className={cn("p-px", className)} {...props}>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          {children}
        </Command>
      </Popover>
    </AutocompleteContext.Provider>
  )
}

export const AutocompleteAnchor = PopoverPrimitive.Anchor

export const AutocompleteLoading = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Loading>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Loading
    ref={ref}
    className={cn("flex items-center justify-center py-2", className)}
    {...props}
  >
    Loading...
    {/* <Loader className="size-5" /> */}
  </CommandPrimitive.Loading>
))
AutocompleteLoading.displayName = "AutocompleteLoading"

/**
 * Connected <CommandInput /> with Autocomplete Context.
 */
export const AutocompleteInputBaseInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  Omit<
    React.ComponentProps<typeof CommandPrimitive.Input>,
    "value" | "onValueChange"
  >
>(
  (
    { asChild, children, onKeyDown, onMouseDown, onFocus, onBlur, ...props },
    ref
  ) => {
    const {
      multiple,
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
    } = useAutocompleteContext()

    return (
      <InputBaseControl>
        <CommandPrimitive.Input
          asChild
          ref={composeRefs(inputRef, ref)}
          disabled={disabled}
          required={required}
          value={inputValue}
          onValueChange={(search) => {
            onInputValueChange(search)
            if (!open) {
              onOpenChange(true)
            }
          }}
          onKeyDown={composeEventHandlers(onKeyDown, (e) => {
            onOpenChange(e.key === "ArrowDown" || e.key === "ArrowUp")
            if (!multiple) {
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
          {/* cmdk automatically generates inputId which overwrites FormItem's id */}
          <InputBaseInput />
        </CommandPrimitive.Input>
      </InputBaseControl>
    )
  }
)
AutocompleteInputBaseInput.displayName = "AutocompleteInputBaseInput"

/**
 * Higher level of abstraction around their primitive counterparts for ease of usage.
 */
export const AutocompleteInput = React.forwardRef<
  React.ElementRef<typeof AutocompleteInputBaseInput>,
  React.ComponentPropsWithoutRef<typeof AutocompleteInputBaseInput>
>((props, ref) => (
  <AutocompleteInputBase>
    <AutocompleteInputBaseInput ref={ref} {...props} />
  </AutocompleteInputBase>
))
AutocompleteInput.displayName = "AutocompleteInput"

const AutocompleteChipGroup = React.forwardRef<
  React.ElementRef<typeof RovingFocusGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RovingFocusGroupPrimitive.Root>
>((props, ref) => {
  const { value, currentTabStopId, onCurrentTabStopIdChange, tagGroupRef } =
    useAutocompleteContext()

  const composedRefs = useComposedRefs(ref, tagGroupRef)

  return (
    <RovingFocusGroupPrimitive.Root
      ref={composedRefs}
      tabIndex={-1}
      currentTabStopId={currentTabStopId}
      onCurrentTabStopIdChange={onCurrentTabStopIdChange}
      onEntryFocus={() => onCurrentTabStopIdChange(value.at(-1) ?? "")}
      onBlur={() => onCurrentTabStopIdChange(null)}
      {...props}
    />
  )
})
AutocompleteChipGroup.displayName = "AutocompleteChipGroup"

interface AutocompleteChipGroupItemProps<TValue = string>
  extends React.ComponentPropsWithoutRef<typeof Tag> {
  value: TValue
}

const AutocompleteChipGroupItem = <TValue extends string = string>({
  onClick,
  onKeyDown,
  value: valueProp,
  disabled,
  ...props
}: AutocompleteChipGroupItemProps<TValue>) => {
  const { value, onValueChange, inputRef, currentTabStopId, multiple } =
    useAutocompleteContext()
  if (!multiple) {
    throw new Error(
      "Unable to use `<AutocompleteChipGroupItem>` when value mode is not multiple."
    )
  }

  return (
    <RovingFocusGroupPrimitive.Item
      asChild
      onKeyDown={composeEventHandlers(onKeyDown, (e) => {
        if (!multiple) {
          return
        }
        if (e.key === "Escape") {
          inputRef.current?.focus()
        }
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault()
          inputRef.current?.focus()
        }
        if (e.key === "ArrowRight" && currentTabStopId === value.at(-1)) {
          inputRef.current?.focus()
        }
      })}
      tabIndex={-1}
      tabStopId={valueProp}
      active={valueProp === value.at(-1)}
    >
      <Tag
        // disabled={disabled}
        onClick={composeEventHandlers(
          onClick,
          () => disabled && inputRef.current?.focus()
        )}
        onRemove={() => {
          onValueChange(value.filter((v) => v !== currentTabStopId))
          inputRef.current?.focus()
        }}
        {...props}
      />
    </RovingFocusGroupPrimitive.Item>
  )
}

interface AutocompleteInputMultipleProps<TValue = string>
  extends React.ComponentPropsWithoutRef<typeof AutocompleteInputBaseInput> {
  getChipLabel?: (value: TValue) => React.ReactNode
  getChipDisabled?: (value: TValue) => boolean
}

/**
 * Higher level of abstraction around their primitive counterparts for ease of usage.
 */
export const AutocompleteInputMultiple = React.forwardRef<
  React.ElementRef<typeof AutocompleteInputBaseInput>,
  AutocompleteInputMultipleProps
>(
  (
    {
      children,
      getChipLabel = (value) => value,
      getChipDisabled = () => false,
      ...props
    },
    ref
  ) => {
    const { multiple, value, onValueChange, inputRef } =
      useAutocompleteContext()
    if (!multiple) {
      throw new Error(
        "Unable to use `<AutocompleteInputMultiple>` when value mode is not multiple."
      )
    }

    return (
      <AutocompleteInputBase>
        <AutocompleteChipGroup asChild>
          <InputBaseFlexWrapper className="items-center gap-2">
            {value.map((v) => (
              <AutocompleteChipGroupItem
                key={v}
                value={v}
                disabled={getChipDisabled(v)}
                onRemove={() => {
                  onValueChange(value.filter((_v) => _v !== v))
                  inputRef.current?.focus()
                }}
              >
                {getChipLabel(v)}
              </AutocompleteChipGroupItem>
            ))}
            <AutocompleteInputBaseInput ref={ref} {...props} />
          </InputBaseFlexWrapper>
        </AutocompleteChipGroup>
      </AutocompleteInputBase>
    )
  }
)
AutocompleteInputMultiple.displayName = "AutocompleteInputMultiple"

export const AutocompleteInputBase = React.forwardRef<
  React.ElementRef<typeof InputBase>,
  React.ComponentProps<typeof InputBase>
>(({ children, ...props }, ref) => (
  <AutocompleteAnchor asChild>
    <InputBase ref={ref} {...props}>
      {children}
      <InputBaseAdornment>
        <CaretSortIcon />
      </InputBaseAdornment>
    </InputBase>
  </AutocompleteAnchor>
))
AutocompleteInputBase.displayName = "AutocompleteInputBase"

export const AutocompleteContent = React.forwardRef<
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
      className={cn("w-[--radix-popover-trigger-width] p-0", className)}
      {...props}
    >
      <CommandList>{children}</CommandList>
    </PopoverContent>
  )
)
AutocompleteContent.displayName = "AutocompleteContent"

export const AutocompleteEmpty = CommandEmpty

export const AutocompleteItem = React.forwardRef<
  React.ElementRef<typeof CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandItem>
>(({ onMouseDown, ...props }, ref) => {
  const { multiple, onSelect, value, onValueChange, onOpenChange } =
    useAutocompleteContext()

  return (
    <CommandItem
      ref={ref}
      onMouseDown={composeEventHandlers(onMouseDown, (e) => e.preventDefault())}
      onSelect={composeEventHandlers(onSelect, (currentValue) => {
        if (multiple) {
          onValueChange(
            value.includes(currentValue)
              ? value.filter((v) => v !== currentValue)
              : [...value, currentValue]
          )
        } else {
          onValueChange(currentValue)
        }
        onOpenChange(false)
      })}
      {...props}
    />
  )
})
AutocompleteItem.displayName = "AutocompleteItem"
