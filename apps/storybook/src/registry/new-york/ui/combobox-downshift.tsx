import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import {
  useCombobox,
  UseComboboxProps,
  UseComboboxReturnValue,
} from "downshift"

import { cn } from "@/lib/utils"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/registry/new-york/ui/popover"

interface ComboboxContextProps
  extends UseComboboxReturnValue<ComboboxItemValue> {
  filtered: ComboboxItemValue[]
  items: ComboboxItemValue[]
  onItemsChange: (items: ComboboxItemValue[]) => void
}

const ComboboxContext = React.createContext<ComboboxContextProps>({
  filtered: [],
  items: [],
  onItemsChange: () => {},
} as ComboboxContextProps)

const useComboboxContext = () => React.useContext(ComboboxContext)

interface ComboboxProps
  extends React.ComponentProps<typeof Popover>,
    Omit<
      UseComboboxProps<ComboboxItemValue>,
      "isOpen" | "onIsOpenChange" | "inputValue" | "onInputValueChange"
    > {
  inputValue?: string
  defaultInputValue?: string
  onInputValueChange?: (inputValue: string) => void
  disableFilter?: boolean
  filter?: (
    inputValue: string,
    item: ComboboxItemValue,
    index: number,
    items: ComboboxItemValue[]
  ) => boolean
}

interface ComboboxItemValue {
  value: string
  label: string
  disabled?: boolean
}

// TODO:
// filtered: { count: number; items: Map<string, number>; groups: Set<string> }

// interface SelectItemProps extends React.ComponentPropsWithoutRef<"div"> {
//   value: string
//   disabled?: boolean
//   textValue?: string
// }

export const defaultFilter = (inputValue: string, item: ComboboxItemValue) =>
  !inputValue || item.label.toLowerCase().includes(inputValue.toLowerCase())

export const Combobox = ({
  open: openProp,
  onOpenChange,
  defaultOpen,
  modal,
  children,
  inputValue: inputValueProp,
  defaultInputValue,
  onInputValueChange,
  disableFilter,
  filter = defaultFilter,
}: ComboboxProps) => {
  const [items, setItems] = React.useState<ComboboxItemValue[]>([])

  // const [value, setValue] = useControllableState({});

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

  const filtered = React.useMemo(
    () =>
      items.filter((...args) =>
        disableFilter ? true : filter(inputValue, ...args)
      ),
    [items, disableFilter, filter, inputValue]
  )

  const state = useCombobox({
    items: filtered,
    itemToString: (item) => item?.label ?? "",
    isItemDisabled: (item) => item.disabled ?? false,
    isOpen: open,
    onIsOpenChange: ({ isOpen }) => setOpen(isOpen),
    inputValue,
    onInputValueChange: ({ inputValue }) => setInputValue(inputValue),
  })

  return (
    <ComboboxContext.Provider
      value={{
        items,
        onItemsChange: setItems,
        filtered,
        ...state,
      }}
    >
      <Popover open={open} onOpenChange={setOpen} modal={modal}>
        {children}
      </Popover>
    </ComboboxContext.Provider>
  )
}
export const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof InputBaseInput>,
  React.ComponentPropsWithoutRef<typeof InputBaseInput>
>((props, ref) => {
  const { getInputProps, getToggleButtonProps } = useComboboxContext()

  return (
    <PopoverAnchor asChild>
      <InputBase>
        <InputBaseControl>
          <InputBaseInput ref={ref} {...getInputProps()} {...props} />
        </InputBaseControl>
        <InputBaseAdornment>
          <InputBaseAdornmentButton {...getToggleButtonProps()}>
            <CaretSortIcon />
          </InputBaseAdornmentButton>
        </InputBaseAdornment>
      </InputBase>
    </PopoverAnchor>
  )
})
ComboboxInput.displayName = "ComboboxInput"

export const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent>
>(({ className, onOpenAutoFocus, children, ...props }, ref) => {
  const { onItemsChange, getMenuProps } = useComboboxContext()

  const childItems = React.useMemo(
    () =>
      // TODO: recursive find all ComboboxItem children?
      React.Children.toArray(children).filter(
        (child): child is React.ReactElement<ComboboxItemProps> =>
          React.isValidElement(child) && child.type === ComboboxItem
      ),
    [children]
  )

  React.useEffect(() => {
    onItemsChange(
      childItems.map((child) => ({
        value: child.props.value,
        label: child.props.children,
        disabled: child.props.disabled,
      }))
    )
  }, [children])

  return (
    <PopoverContent
      {...getMenuProps({ ref }, { suppressRefError: true })}
      onOpenAutoFocus={composeEventHandlers(onOpenAutoFocus, (event) =>
        event.preventDefault()
      )}
      className={cn("w-[--radix-popover-trigger-width] p-1", className)}
      {...props}
    >
      {children}
    </PopoverContent>
  )
})
ComboboxContent.displayName = "ComboboxContent"

export const ComboboxEmpty = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  const { filtered = [] } = useComboboxContext()

  const render = filtered.length === 0
  if (!render) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  )
})
ComboboxEmpty.displayName = "ComboboxEmpty"

interface ComboboxItemProps extends React.ComponentPropsWithoutRef<"li"> {
  value: string
  disabled?: boolean
  textValue?: string
}

export const ComboboxItem = React.forwardRef<
  React.ElementRef<"li">,
  ComboboxItemProps
>(({ value, disabled, textValue, ...props }, ref) => {
  const {
    filtered = [],
    selectedItem,
    highlightedIndex,
    getItemProps,
  } = useComboboxContext()

  const index = filtered.findIndex(
    (item) => item.value.toLowerCase() === value.toLowerCase()
  )
  if (index === -1) {
    return null
  }

  const isSelected = selectedItem?.value === value
  const isHighlighted = highlightedIndex === index

  const item = React.useMemo(
    () => ({
      disabled,
      label: textValue,
      value,
    }),
    [disabled, textValue, value]
  )

  return (
    <li
      ref={ref}
      data-disabled={disabled}
      data-selected={isSelected}
      data-highlighted={isHighlighted}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled=true]:pointer-events-none data-[highlighted=true]:bg-accent data-[highlighted=true]:text-accent-foreground data-[disabled=true]:opacity-50"
      )}
      {...getItemProps({ item, index })}
      {...props}
    />
  )
})

export const ComboboxGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>((props, ref) => <div ref={ref} {...props} />)
ComboboxGroup.displayName = "ComboboxGroup"

export const ComboboxLabel = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
ComboboxLabel.displayName = "ComboboxLabel"
