import * as React from "react"
import { CaretSortIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
} from "@/registry/new-york/ui/input-base"

export const NativeSelect = React.forwardRef<
  React.ElementRef<"select">,
  React.ComponentPropsWithoutRef<"select">
>(({ className, ...props }, ref) => (
  <InputBase className="relative p-0">
    <InputBaseControl>
      <select
        ref={ref}
        className={cn(
          "w-full min-w-40 flex-1 appearance-none bg-transparent px-3 py-1 text-sm text-muted-foreground focus:outline-none",
          className
        )}
        {...props}
      />
    </InputBaseControl>
    <InputBaseAdornment className="absolute right-0 top-1/2 -translate-y-1/2 pr-3">
      <CaretSortIcon />
    </InputBaseAdornment>
  </InputBase>
))
NativeSelect.displayName = "NativeSelect"

export const NativeSelectOption = React.forwardRef<
  React.ElementRef<"option">,
  React.ComponentPropsWithoutRef<"option">
>((props, ref) => <option ref={ref} {...props} />)
NativeSelectOption.displayName = "NativeSelectOption"
