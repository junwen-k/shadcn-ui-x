import * as React from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"

interface TimeProps
  extends Omit<React.ComponentPropsWithoutRef<"time">, "children"> {
  children: Parameters<typeof format>[0]
  dateTimeFormatStr?: string
  formatStr?: string
}

export const Time = React.forwardRef<React.ElementRef<"time">, TimeProps>(
  (
    {
      children,
      dateTimeFormatStr = "yyyy-MM-dd",
      formatStr = "dd/MM/yyyy",
      className,
      ...props
    },
    ref
  ) => {
    console.log(children)

    return (
      <time
        ref={ref}
        dateTime={format(children, dateTimeFormatStr)}
        className={cn("whitespace-nowrap", className)}
        {...props}
      >
        {format(children, formatStr)}
      </time>
    )
  }
)
Time.displayName = "Time"
