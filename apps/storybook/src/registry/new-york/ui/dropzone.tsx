"use client"

import * as React from "react"
import { UploadIcon } from "@radix-ui/react-icons"
import { Primitive } from "@radix-ui/react-primitive"

import { cn } from "@/lib/utils"
import * as DropzonePrimitive from "@/registry/new-york/ui/dropzone-primitive"

export const Dropzone = DropzonePrimitive.Dropzone

export const DropzoneInput = DropzonePrimitive.Input

export const DropzoneZone = React.forwardRef<
  React.ElementRef<typeof DropzonePrimitive.Zone>,
  React.ComponentPropsWithoutRef<typeof DropzonePrimitive.Zone>
>(({ className, ...props }, ref) => (
  <DropzonePrimitive.Zone
    ref={ref}
    className={cn(
      "cursor-pointer rounded border border-dashed border-input p-6 transition-colors hover:border-accent-foreground hover:bg-accent data-[disabled]:pointer-events-none data-[drag-reject]:cursor-no-drop data-[no-click]:cursor-default data-[drag-active]:border-accent-foreground data-[drag-reject]:border-destructive data-[drag-active]:bg-accent data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))
DropzoneZone.displayName = "DropzoneZone"

export const DropzoneZoneIcon = React.forwardRef<
  React.ElementRef<typeof UploadIcon>,
  React.ComponentPropsWithoutRef<typeof UploadIcon>
>(({ className, ...props }, ref) => (
  <UploadIcon ref={ref} className={cn("size-8", className)} {...props} />
))
DropzoneZoneIcon.displayName = "DropzoneZoneIcon"

export const DropzoneZoneTitle = React.forwardRef<
  React.ElementRef<typeof Primitive.h3>,
  React.ComponentPropsWithoutRef<typeof Primitive.h3>
>(({ className, ...props }, ref) => (
  <Primitive.h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DropzoneZoneTitle.displayName = "DropzoneZoneTitle"

export const DropzoneZoneDescription = React.forwardRef<
  React.ElementRef<typeof Primitive.p>,
  React.ComponentPropsWithoutRef<typeof Primitive.p>
>(({ className, ...props }, ref) => (
  <Primitive.p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DropzoneZoneDescription.displayName = "DropzoneZoneDescription"

export const DropzoneTrigger = DropzonePrimitive.Trigger
