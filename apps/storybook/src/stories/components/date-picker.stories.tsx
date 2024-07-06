import { zodResolver } from "@hookform/resolvers/zod"
import type { Meta, StoryObj } from "@storybook/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerClear,
  DatePickerContent,
  DatePickerTrigger,
  DatePickerValue,
} from "@/components/ui/date-picker"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"

/**
 * The Date Picker is built using a composition of the <Popover /> and the <Calendar /> components.
 *
 * ### Anatomy:
 *
 * ```tsx
 * <DatePicker.Root>
 *  <DatePicker.Trigger>
 *    <DatePicker.Value />
 *  </DatePicker.Trigger>
 *  <DatePicker.Content>
 *    <DatePicker.Calendar />
 *  </DatePicker.Content>
 * </DatePicker.Root>
 * ```
 */
const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  subcomponents: {
    DatePickerCalendar,
    DatePickerClear,
    DatePickerContent,
    DatePickerTrigger,
    DatePickerValue,
  } as any,
  render: (args) => (
    <DatePicker {...args}>
      <DatePickerTrigger>
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

export const Default = {} satisfies Story

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
                  <DatePickerTrigger>
                    <DatePickerValue placeholder="Pick a date" />
                  </DatePickerTrigger>
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
