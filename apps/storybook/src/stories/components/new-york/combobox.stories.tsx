import { zodResolver } from "@hookform/resolvers/zod"
import type { Meta, StoryObj } from "@storybook/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/registry/new-york/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
} from "@/registry/new-york/ui/combobox"
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
 * Combobox element.
 *
 * ### Anatomy
 *
 * ```tsx
 * <Combobox>
 *  <ComboboxInput />
 * </Combobox>
 * ```
 */
const meta = {
  title: "Components/new-york/Combobox",
  component: Combobox,
  render: (args) => (
    <Combobox {...args}>
      <ComboboxInput placeholder="Search fruit..." />
      <ComboboxContent>
        <ComboboxEmpty>No fruit found.</ComboboxEmpty>
        <ComboboxGroup heading="Fruits">
          <ComboboxItem value="apple">Apple</ComboboxItem>
          <ComboboxItem value="banana">Banana</ComboboxItem>
          <ComboboxItem value="blueberry">Blueberry</ComboboxItem>
          <ComboboxItem value="grapes">Grapes</ComboboxItem>
          <ComboboxItem value="pineapple">Pineapple</ComboboxItem>
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story

const FormSchema = z.object({
  fruit: z.string(),
})

function DatePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fruit: "",
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
          name="fruit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fruit</FormLabel>
              <Combobox value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <ComboboxInput
                    className="w-[280px]"
                    placeholder="Search fruit..."
                  />
                </FormControl>
                <ComboboxContent>
                  <ComboboxEmpty>No fruit found.</ComboboxEmpty>
                  <ComboboxItem value="apple">Apple</ComboboxItem>
                  <ComboboxItem value="banana">Banana</ComboboxItem>
                  <ComboboxItem value="blueberry">Blueberry</ComboboxItem>
                  <ComboboxItem value="grapes">Grapes</ComboboxItem>
                  <ComboboxItem value="pineapple">Pineapple</ComboboxItem>
                </ComboboxContent>
              </Combobox>
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
