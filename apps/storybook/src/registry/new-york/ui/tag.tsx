import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Slot, Slottable } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/registry/new-york/ui/badge"

interface TagProps extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean
  selected?: boolean
  onRemove?: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason: "closeClick" | "backspaceKeyDown" | "deleteKeyDown"
  ) => void
}

// TODO: should this be checkbox primitive?

export const Tag = React.forwardRef<React.ElementRef<"button">, TagProps>(
  (
    {
      asChild,
      disabled,
      children,
      className,
      selected,
      onKeyDown,
      onRemove,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        disabled={disabled}
        data-disabled={disabled}
        className={cn(
          badgeVariants({ variant: selected ? "default" : "outline" }),
          "group data-[disabled]:opacity-50 data-[disabled]:disabled:pointer-events-none",
          onRemove && "gap-1 pr-1.5",
          className
        )}
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Backspace" || event.key === "Delete") {
            onRemove?.(
              event,
              event.key === "Backspace" ? "backspaceKeyDown" : "deleteKeyDown"
            )
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
              onRemove(event, "closeClick")
            }}
            className="cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100 group-data-[disabled]:pointer-events-none"
          >
            <Cross2Icon className="size-4" />
            <span className="sr-only">Remove</span>
          </div>
        )}
      </Comp>
    )
  }
)
