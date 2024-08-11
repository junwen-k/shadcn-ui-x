import * as React from "react"
import { composeEventHandlers } from "@radix-ui/primitive"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Slottable } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

interface TagProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  onRemove?: (
    event: React.MouseEvent | React.KeyboardEvent,
    reason: "closeClick" | "backspaceKeyDown" | "deleteKeyDown"
  ) => void
}

export const Tag = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  TagProps
>(({ className, children, onKeyDown, onRemove, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "group inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=checked]:border-transparent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[disabled]:opacity-50 data-[state=checked]:shadow data-[state=checked]:hover:bg-primary/80 data-[disabled]:disabled:pointer-events-none",
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
        aria-hidden
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
  </CheckboxPrimitive.Root>
))
Tag.displayName = "Tag"
