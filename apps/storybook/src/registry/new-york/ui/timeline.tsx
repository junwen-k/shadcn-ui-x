import * as React from "react"

import { cn } from "@/lib/utils"

export const Timeline = React.forwardRef<
  React.ElementRef<"ol">,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    role="list"
    ref={ref}
    className={cn("flex flex-col", className)}
    {...props}
  />
))
Timeline.displayName = "Timeline"

export const TimelineItem = React.forwardRef<
  React.ElementRef<"li">,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("flex gap-4", className)} {...props} />
))
TimelineItem.displayName = "TimelineItem"

export const TimelineSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col items-center", className)}
    {...props}
  />
))
TimelineSeparator.displayName = "TimelineSeparator"

interface TimelineDotProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "outline"
}

export const TimelineDot = React.forwardRef<
  React.ElementRef<"div">,
  TimelineDotProps
>(({ variant = "default", className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-1 flex size-5 items-center justify-center empty:after:block empty:after:rounded-full empty:after:outline-current [&>svg]:size-5",
      variant === "default" && "empty:after:size-2.5 empty:after:bg-current",
      variant === "outline" && "empty:after:size-2 empty:after:outline",
      className
    )}
    {...props}
  />
))
TimelineDot.displayName = "TimelineDot"

export const TimelineConnector = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("my-2 w-0.5 flex-1 bg-border", className)}
    {...props}
  />
))
TimelineConnector.displayName = "TimelineConnector"

export const TimelineContent = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 pb-8 first:text-right last:text-left", className)}
    {...props}
  />
))
TimelineContent.displayName = "TimelineContent"

export const TimelineTitle = React.forwardRef<
  React.ElementRef<"h3">,
  React.ComponentPropsWithoutRef<"h3">
>((props, ref) => <h3 ref={ref} {...props} />)
TimelineTitle.displayName = "TimelineTitle"

export const TimelineDescription = React.forwardRef<
  React.ElementRef<"p">,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
TimelineDescription.displayName = "TimelineDescription"
