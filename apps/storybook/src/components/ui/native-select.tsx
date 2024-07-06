import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
} from "@/components/ui/input-base"

export const NativeSelect = React.forwardRef<
  React.ElementRef<"select">,
  React.ComponentPropsWithoutRef<"select">
>(({ className, ...props }, ref) => (
  <InputBase className="p-0 relative">
    <InputBaseControl>
      <select
        ref={ref}
        className={cn(
          "px-3 py-1 text-sm w-full flex-1 bg-transparent focus:outline-none min-w-40 text-muted-foreground appearance-none",
          className
        )}
        {...props}
      />
    </InputBaseControl>
    <InputBaseAdornment className="pr-3 absolute right-0 -translate-y-1/2 top-1/2">
      <ChevronDown />
    </InputBaseAdornment>
  </InputBase>
))
NativeSelect.displayName = "NativeSelect"

export const NativeSelectOption = React.forwardRef<
  React.ElementRef<"option">,
  React.ComponentPropsWithoutRef<"option">
>((props, ref) => <option ref={ref} {...props} />)
NativeSelectOption.displayName = "NativeSelectOption"
