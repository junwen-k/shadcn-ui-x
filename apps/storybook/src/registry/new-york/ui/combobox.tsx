"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons"
import { Slottable } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/registry/new-york/ui/badge"
import * as ComboboxPrimitive from "@/registry/new-york/ui/combobox-impl"
import {
  InputBase,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseFlexWrapper,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base"

export const Combobox = React.forwardRef<
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Root>,
  React.ElementRef<typeof ComboboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Root
    ref={ref}
    className={cn(
      "flex size-full flex-col overflow-hidden rounded-md bg-popover p-px text-popover-foreground",
      className
    )}
    {...props}
  />
))
Combobox.displayName = "Combobox"

export const ComboboxInput = React.forwardRef<
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input>,
  React.ElementRef<typeof ComboboxPrimitive.Input>
>((props, ref) => (
  <ComboboxPrimitive.Anchor asChild>
    <InputBase>
      <InputBaseControl>
        <ComboboxPrimitive.Input asChild>
          <InputBaseInput ref={ref} {...props} />
        </ComboboxPrimitive.Input>
      </InputBaseControl>
      <ComboboxPrimitive.Clear asChild>
        <InputBaseAdornmentButton>
          <Cross2Icon />
        </InputBaseAdornmentButton>
      </ComboboxPrimitive.Clear>
      <ComboboxPrimitive.Trigger asChild>
        <InputBaseAdornmentButton>
          <CaretSortIcon />
        </InputBaseAdornmentButton>
      </ComboboxPrimitive.Trigger>
    </InputBase>
  </ComboboxPrimitive.Anchor>
))
ComboboxInput.displayName = "ComboboxInput"

export const ComboboxTagsInput = React.forwardRef<
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input>,
  React.ElementRef<typeof ComboboxPrimitive.Input>
>(({ children, ...props }, ref) => (
  <ComboboxPrimitive.Anchor asChild>
    <InputBase>
      <ComboboxPrimitive.ComboboxTagGroup asChild>
        <InputBaseFlexWrapper className="flex items-center gap-2">
          {children}
          <InputBaseControl>
            <ComboboxPrimitive.Input asChild>
              <InputBaseInput ref={ref} {...props} />
            </ComboboxPrimitive.Input>
          </InputBaseControl>
        </InputBaseFlexWrapper>
      </ComboboxPrimitive.ComboboxTagGroup>
      <ComboboxPrimitive.Clear asChild>
        <InputBaseAdornmentButton>
          <Cross2Icon />
        </InputBaseAdornmentButton>
      </ComboboxPrimitive.Clear>
      <ComboboxPrimitive.Trigger asChild>
        <InputBaseAdornmentButton>
          <CaretSortIcon />
        </InputBaseAdornmentButton>
      </ComboboxPrimitive.Trigger>
    </InputBase>
  </ComboboxPrimitive.Anchor>
))
ComboboxTagsInput.displayName = "ComboboxTagsInput"

export const ComboboxTag = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.ComboboxTagGroupItem>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.ComboboxTagGroupItem>
>(({ children, className, ...props }, ref) => (
  <ComboboxPrimitive.ComboboxTagGroupItem
    ref={ref}
    className={cn(
      badgeVariants({ variant: "outline" }),
      "group gap-1 pr-1.5 data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <Slottable>{children}</Slottable>
    <ComboboxPrimitive.ComboboxTagGroupItemRemove className="group-data-[disabled]:pointer-events-none">
      <Cross2Icon className="size-4" />
      <span className="sr-only">Remove</span>
    </ComboboxPrimitive.ComboboxTagGroupItemRemove>
  </ComboboxPrimitive.ComboboxTagGroupItem>
))
ComboboxTag.displayName = "ComboboxTag"

export const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Content>
>(({ className, align = "center", alignOffset = 4, ...props }, ref) => (
  <ComboboxPrimitive.Portal>
    <ComboboxPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      className={cn(
        "relative z-50 max-h-96 w-[--radix-popover-trigger-width] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </ComboboxPrimitive.Portal>
))
ComboboxContent.displayName = "ComboboxContent"

export const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Empty>
>((props, ref) => (
  <ComboboxPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

export const ComboboxGroup = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Group>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Group
    ref={ref}
    className={cn(
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-semibold",
      className
    )}
    {...props}
  />
))
ComboboxGroup.displayName = "ComboboxGroup"

export const ComboboxItem = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <ComboboxPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
        className
      )}
      // TODO: how to implement text value?
      textValue={children as string}
      {...props}
    >
      {/* ComboboxText -> Children */}
      <Slottable>{children}</Slottable>
      <ComboboxPrimitive.ItemIndicator className="absolute right-2 flex size-3.5 items-center justify-center">
        <CheckIcon className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
})
ComboboxItem.displayName = "ComboboxItem"
