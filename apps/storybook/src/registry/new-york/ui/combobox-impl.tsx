"use client"

import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { useComposedRefs } from "@radix-ui/react-compose-refs"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Primitive } from "@radix-ui/react-primitive"
import * as RovingFocusGroupPrimitive from "@radix-ui/react-roving-focus"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { Command as CommandPrimitive } from "cmdk"

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
  extends React.ComponentProps<typeof PopoverPrimitive.Root>,
    Omit<
      React.ComponentProps<typeof CommandPrimitive>,
      "value" | "defaultValue" | "onValueChange"
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
  React.ElementRef<typeof CommandPrimitive>,
  ComboboxProps
>(
  (
    {
      type = "single",
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
            currentTabStopId,
            onCurrentTabStopIdChange: setCurrentTabStopId,
            inputRef,
            tagGroupRef,
            disabled,
            required,
          } as ComboboxContextProps
        }
      >
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen} modal={modal}>
          <CommandPrimitive ref={ref} {...props}>
            {children}
            <CommandPrimitive.List aria-hidden="true" hidden />
          </CommandPrimitive>
        </PopoverPrimitive.Root>
      </ComboboxContext.Provider>
    )
  }
)
Combobox.displayName = "Combobox"

export const ComboboxTagGroup = React.forwardRef<
  React.ElementRef<typeof RovingFocusGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RovingFocusGroupPrimitive.Root>
>((props, ref) => {
  const { currentTabStopId, onCurrentTabStopIdChange, tagGroupRef, type } =
    useComboboxContext()

  if (type !== "multiple") {
    throw new Error(
      '<ComboboxTagGroup> should only be used when type is "multiple"'
    )
  }

  const composedRefs = useComposedRefs(ref, tagGroupRef)

  return (
    <RovingFocusGroupPrimitive.Root
      ref={composedRefs}
      tabIndex={-1}
      currentTabStopId={currentTabStopId}
      onCurrentTabStopIdChange={onCurrentTabStopIdChange}
      onBlur={() => onCurrentTabStopIdChange(null)}
      {...props}
    />
  )
})
ComboboxTagGroup.displayName = "ComboboxTagGroup"

interface ComboboxTagGroupItemProps<TValue = string>
  extends React.ComponentPropsWithoutRef<"div"> {
  value: TValue
  disabled?: boolean
}

export const ComboboxTagGroupItem = <TValue extends string = string>({
  onClick,
  onKeyDown,
  value: valueProp,
  disabled,
  ...props
}: ComboboxTagGroupItemProps<TValue>) => {
  const { value, onValueChange, inputRef, currentTabStopId, type } =
    useComboboxContext()

  if (type !== "multiple") {
    throw new Error(
      '<ComboboxTagGroupItem> should only be used when type is "multiple"'
    )
  }

  const lastItemValue = value.at(-1)

  return (
    <RovingFocusGroupPrimitive.Item
      onKeyDown={composeEventHandlers(onKeyDown, (event) => {
        if (event.key === "Escape") {
          inputRef.current?.focus()
        }
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault()
          inputRef.current?.focus()
        }
        if (event.key === "ArrowRight" && currentTabStopId === lastItemValue) {
          inputRef.current?.focus()
        }
        if (event.key === "Backspace" || event.key === "Delete") {
          onValueChange(value.filter((v) => v !== currentTabStopId))
          inputRef.current?.focus()
        }
      })}
      onClick={composeEventHandlers(
        onClick,
        () => disabled && inputRef.current?.focus()
      )}
      tabStopId={valueProp}
      focusable={!disabled}
      active={valueProp === lastItemValue}
      {...props}
    />
  )
}

export const ComboboxInput = React.forwardRef<
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
    <CommandPrimitive.Input
      ref={composedRefs}
      disabled={disabled}
      required={required}
      value={inputValue}
      onValueChange={(search) => {
        onOpenChange(true)
        onInputValueChange(search)
        if (!search && type === "single") {
          onValueChange("")
        }
      }}
      onKeyDown={composeEventHandlers(onKeyDown, (event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          // NOTE: why this break?
          onOpenChange(true)
        }
        if (type !== "multiple") {
          return
        }
        if (event.key === "ArrowLeft" && !inputValue && value.length) {
          tagGroupRef.current?.focus()
        }
        if (event.key === "Backspace" && !inputValue) {
          onValueChange(value.slice(0, -1))
        }
      })}
      onMouseDown={composeEventHandlers(onMouseDown, () =>
        onOpenChange(!!inputValue || !open)
      )}
      onFocus={composeEventHandlers(onFocus, () => onOpenChange(true))}
      onBlur={composeEventHandlers(onBlur, (event) => {
        if (!event.relatedTarget?.hasAttribute("cmdk-list")) {
          onInputBlur?.(event)
        }
      })}
      {...props}
    />
  )
})
ComboboxInput.displayName = "ComboboxInput"

export const ComboboxTrigger = PopoverPrimitive.Trigger

export const ComboboxAnchor = PopoverPrimitive.Anchor

export const ComboboxPortal = PopoverPrimitive.Portal

export const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ children, onOpenAutoFocus, onInteractOutside, ...props }, ref) => (
  <PopoverPrimitive.Content
    asChild
    ref={ref}
    onOpenAutoFocus={composeEventHandlers(onOpenAutoFocus, (event) =>
      event.preventDefault()
    )}
    onCloseAutoFocus={composeEventHandlers(onOpenAutoFocus, (event) =>
      event.preventDefault()
    )}
    onInteractOutside={composeEventHandlers(onInteractOutside, (event) => {
      if (
        event.target instanceof Element &&
        event.target.hasAttribute("cmdk-input")
      ) {
        event.preventDefault()
      }
    })}
    {...props}
  >
    <CommandPrimitive.List>{children}</CommandPrimitive.List>
  </PopoverPrimitive.Content>
))
ComboboxContent.displayName = "ComboboxContent"

export const ComboboxEmpty = CommandPrimitive.Empty

export const ComboboxLoading = CommandPrimitive.Loading

interface ComboboxItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
    "value"
  > {
  value: string
  textValue?: string
}

const ComboboxItemContext = React.createContext({ isSelected: false })

const useComboboxItemContext = () => React.useContext(ComboboxItemContext)

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

  const isSelected =
    type === "single" ? value === valueProp : value.includes(valueProp)

  return (
    <ComboboxItemContext.Provider value={{ isSelected }}>
      <CommandPrimitive.Item
        ref={composedRefs}
        onMouseDown={composeEventHandlers(onMouseDown, (event) =>
          event.preventDefault()
        )}
        onSelect={() => {
          if (type === "multiple") {
            onValueChange(
              value.includes(valueProp)
                ? value.filter((v) => v !== valueProp)
                : [...value, valueProp]
            )
          } else {
            onValueChange(valueProp)
            onInputValueChange(inputValue)
          }
          setTimeout(() => onOpenChange(type === "multiple"))
        }}
        value={inputValue}
        {...props}
      >
        {children}
      </CommandPrimitive.Item>
    </ComboboxItemContext.Provider>
  )
})
ComboboxItem.displayName = "ComboboxItem"

export const ComboboxItemIndicator = React.forwardRef<
  React.ElementRef<typeof Primitive.span>,
  React.ComponentPropsWithoutRef<typeof Primitive.span>
>((props, ref) => {
  const { isSelected } = useComboboxItemContext()

  if (!isSelected) {
    return null
  }

  return <Primitive.span aria-hidden {...props} ref={ref} />
})

export const ComboboxGroup = CommandPrimitive.Group

export const ComboboxSeparator = CommandPrimitive.Separator

const Root = Combobox
const Input = ComboboxInput
const TagGroup = ComboboxTagGroup
const TagGroupItem = ComboboxTagGroupItem
const Trigger = ComboboxTrigger
const Anchor = ComboboxAnchor
const Portal = ComboboxPortal
const Content = ComboboxContent
const Empty = ComboboxEmpty
const Loading = ComboboxLoading
const Item = ComboboxItem
const ItemIndicator = ComboboxItemIndicator
const Group = ComboboxGroup
const Separator = ComboboxSeparator

export {
  Root,
  Input,
  TagGroup,
  TagGroupItem,
  Trigger,
  Anchor,
  Portal,
  Content,
  Empty,
  Loading,
  Item,
  ItemIndicator,
  Group,
  Separator,
}
