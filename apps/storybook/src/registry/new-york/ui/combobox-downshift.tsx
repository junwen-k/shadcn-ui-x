import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
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
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
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

export const defaultFilter = (inputValue: string, item: ComboboxItemValue) =>
  !inputValue || item.label.toLowerCase().includes(inputValue.toLowerCase())

export const Combobox = ({
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
  disableFilter,
  filter = defaultFilter,
}: ComboboxProps) => {
  const [items, setItems] = React.useState<ComboboxItemValue[]>([])

  const [value = "", setValue] = useControllableState({
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

  const filtered = React.useMemo(
    () =>
      items.filter((...args) =>
        disableFilter ? true : filter(inputValue, ...args)
      ),
    [items, disableFilter, filter, inputValue]
  )

  const selectedItem = React.useMemo(
    () => items.find((item) => item.value === value) ?? null,
    [items, value]
  )

  // NOTE: value should be unqiue?

  const state = useCombobox({
    items: filtered,
    // Required to prevent controlled selectedItem to repetitively call `ControlledPropUpdatedSelectedItem` event
    // on every keystroke.
    itemToKey: (item) => item?.value ?? "",
    itemToString: (item) => item?.label ?? "",
    isItemDisabled: (item) => item.disabled ?? false,
    isOpen: open,
    onIsOpenChange: ({ isOpen }) => setOpen(isOpen),
    inputValue,
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue)
      if (!inputValue) {
        setValue("")
      }
    },
    selectedItem,
    onSelectedItemChange: ({ selectedItem }) =>
      setValue(selectedItem?.value ?? null),
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
      <pre className="font-mono text-sm">
        {JSON.stringify(
          {
            internal: true,
            value,
            inputValue,
          },
          "\t",
          2
        )}
      </pre>
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
          <InputBaseInput ref={ref} {...getInputProps(props)} />
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

  const isComboboxItem = (
    child: React.ReactElement
  ): child is React.ReactElement<ComboboxItemProps> =>
    child.type === ComboboxItem

  const getComboboxItems = (
    c: React.ReactNode
  ): React.ReactElement<ComboboxItemProps>[] =>
    React.Children.toArray(c).reduce<ReturnType<typeof getComboboxItems>>(
      (result, child) => {
        if (React.isValidElement<React.PropsWithChildren>(child)) {
          return result.concat(
            isComboboxItem(child)
              ? child
              : getComboboxItems(child.props.children)
          )
        }
        return result
      },
      []
    )

  const childItems = React.useMemo(() => getComboboxItems(children), [children])

  React.useEffect(() => {
    console.log("inside useeffect", childItems)

    // 1. textValue
    // 2. children
    // 3. textContent

    onItemsChange(
      childItems.map((child) => ({
        value: child.props.value,
        label: child.props.children as string,
        disabled: child.props.disabled,
      }))
    )
  }, [children])

  return (
    <PopoverContent
      onOpenAutoFocus={composeEventHandlers(onOpenAutoFocus, (event) =>
        event.preventDefault()
      )}
      className={cn("w-[--radix-popover-trigger-width] p-1", className)}
      {...getMenuProps({ ref, ...props }, { suppressRefError: true })}
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
  const { filtered = [], selectedItem, getItemProps } = useComboboxContext()

  const index = filtered.findIndex(
    (item) => item.value.toLowerCase() === value.toLowerCase()
  )
  if (index === -1) {
    return null
  }

  const selected = selectedItem?.value === value

  const item = React.useMemo(
    () => ({
      disabled,
      label: textValue,
      value,
    }),
    [disabled, textValue, value]
  )

  const { children, ...p } = getItemProps({ item, index, ...props })

  return (
    <li
      ref={ref}
      data-disabled={disabled}
      className={cn(
        "group relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground"
      )}
      {...p}
    >
      {children}
      {selected && (
        <span className="absolute right-2 flex size-3.5 items-center justify-center">
          <CheckIcon className="size-4" />
        </span>
      )}
    </li>
  )
})

// const ComboboxItemText = () => {}

// const ComboboxItemIndicator = () => {}

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
