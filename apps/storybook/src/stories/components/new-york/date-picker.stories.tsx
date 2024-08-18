import { zodResolver } from "@hookform/resolvers/zod"
import type { Meta, StoryObj } from "@storybook/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/registry/new-york/ui/button"
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerValue,
} from "@/registry/new-york/ui/date-picker"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { Toaster } from "@/registry/new-york/ui/toaster"
import { toast } from "@/registry/new-york/ui/use-toast"

/**
 * The Date Picker is built using a composition of the `<Popover />` and the `<Calendar />` components.
 *
 * ### Anatomy:
 *
 * ```tsx
 * <DatePicker.Root>
 *  <DatePicker.Trigger>
 *    <DatePicker.Value />
 *  </DatePicker.Trigger>
 *
 *  <DatePicker.Input />
 *
 *  <DatePicker.Content>
 *    <DatePicker.Calendar />
 *  </DatePicker.Content>
 * </DatePicker.Root>
 * ```
 */
const meta = {
  title: "Components/new-york/DatePicker",
  component: DatePicker,
  subcomponents: {
    DatePickerInput,
    DatePickerTrigger,
    DatePickerValue,
    DatePickerContent,
    DatePickerCalendar,
  } as any,
  render: (args) => (
    <DatePicker {...args}>
      <DatePickerTrigger className="w-[280px]">
        <DatePickerValue placeholder="Pick a date" />
      </DatePickerTrigger>
      <DatePickerContent>
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Trigger = {} satisfies Story

export const Required = {
  args: {
    required: true,
  },
} satisfies Story

export const Input = {
  render: (args) => (
    <DatePicker {...args}>
      <DatePickerInput className="w-[280px]" />
      <DatePickerContent>
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  ),
} satisfies Story

const FormSchema = z.object({
  date: z.date().nullable(),
})

function DatePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: null,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <DatePicker value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <DatePickerInput className="w-[280px]" />
                </FormControl>
                <DatePickerContent>
                  <DatePickerCalendar />
                </DatePickerContent>
              </DatePicker>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export const WithForm = {
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
  render: DatePickerForm,
} satisfies Story
