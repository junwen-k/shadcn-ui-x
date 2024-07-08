import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { Slottable } from "@radix-ui/react-slot"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

import { badgeVariants } from "./badge"

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
>(({ children, className, onKeyDown, value: valueProp, ...props }, ref) => {
  const { type, onRemove, value } = useTagGroupContext()

  const selected =
    type === "single" ? value === valueProp : value.includes(valueProp)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      value={valueProp}
      className={cn(
        badgeVariants({
          variant: selected ? "default" : "outline",
        }),
        "group data-[disabled]:disabled:pointer-events-none data-[disabled]:opacity-50",
        onRemove && "gap-1 pr-1.5",
        className
      )}
      onKeyDown={composeEventHandlers(onKeyDown, (event) => {
        if (event.key === "Backspace" || event.key === "Delete") {
          if (type === "single") {
            onRemove?.(valueProp)
          }
          if (type === "multiple") {
            onRemove?.(value.includes(valueProp) ? value : [valueProp])
          }
        }
      })}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {onRemove && (
        <div
          aria-hidden="true"
          onClick={(event) => {
            event.stopPropagation()
            if (type === "single") {
              onRemove(valueProp)
            }
            if (type === "multiple") {
              onRemove([valueProp])
            }
          }}
          className="group-data-[disabled]:pointer-events-none cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="size-4" />
          <span className="sr-only">Remove</span>
        </div>
      )}
    </ToggleGroupPrimitive.Item>
  )
})
TagGroupItem.displayName = "TagGroupItem"
