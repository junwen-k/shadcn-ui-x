import * as React from "react"
import { Slottable } from "@radix-ui/react-slot"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { useControllableState } from "@radix-ui/react-use-controllable-state"

import { cn } from "@/lib/utils"
import { Tag } from "@/registry/new-york/ui/tag"

type TagGroupContextProps =
  | {
      type: "single"
      value: string
      onValueChange: (value: string) => void
      onRemove?: (value: string) => void
    }
  | {
      type: "multiple"
      value: string[]
      onValueChange: (value: string[]) => void
      onRemove: (value: string[]) => void
    }

const TagGroupContext = React.createContext<TagGroupContextProps>({
  type: "single",
  value: "",
  onValueChange: () => {},
  onRemove: undefined,
})

const useTagGroupContext = () => React.useContext(TagGroupContext)

type TagGroupProps = TagGroupSingleProps | TagGroupMultipleProps

type TagGroupSingleProps = ToggleGroupPrimitive.ToggleGroupSingleProps & {
  onRemove?: (value: string) => void
}

type TagGroupMultipleProps = ToggleGroupPrimitive.ToggleGroupMultipleProps & {
  onRemove?: (value: string[]) => void
}

export const TagGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  TagGroupProps
>(
  (
    {
      className,
      children,
      onRemove,
      type,
      value: valueProp,
      defaultValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [value = type === "single" ? "" : [], setValue] =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useControllableState<any>({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange,
      })

    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        type={type}
        value={value}
        onValueChange={setValue}
        className={cn("flex gap-2", className)}
        {...props}
      >
        <TagGroupContext.Provider
          value={
            {
              type,
              onRemove,
              value,
              onValueChange: setValue,
            } as TagGroupContextProps
          }
        >
          <Slottable>{children}</Slottable>
        </TagGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    )
  }
)
TagGroup.displayName = "TagGroup"

export const TagGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ children, value: valueProp, ...props }, ref) => {
  const { type, onRemove, value } = useTagGroupContext()

  const selected =
    type === "single" ? value === valueProp : value.includes(valueProp)

  return (
    <ToggleGroupPrimitive.Item asChild ref={ref} value={valueProp} {...props}>
      <Tag
        selected={selected}
        onRemove={
          onRemove &&
          ((_, reason) => {
            if (reason === "closeClick") {
              if (type === "single") {
                onRemove(valueProp)
              }
              if (type === "multiple") {
                onRemove([valueProp])
              }
            } else {
              if (type === "single") {
                onRemove?.(valueProp)
              }
              if (type === "multiple") {
                onRemove?.(value.includes(valueProp) ? value : [valueProp])
              }
            }
          })
        }
      >
        {children}
      </Tag>
    </ToggleGroupPrimitive.Item>
  )
})
TagGroupItem.displayName = "TagGroupItem"
