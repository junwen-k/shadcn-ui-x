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
  ComboboxTag,
  ComboboxTagsInput,
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

const fruits = [
  {
    value: "apple",
    label: "Apple",
  },
  {
    value: "banana",
    label: "Banana",
  },
  {
    value: "blueberry",
    label: "Blueberry",
  },
  {
    value: "grapes",
    label: "Grapes",
  },
  {
    value: "pineapple",
    label: "Pineapple",
  },
]

/**
 * Autocomplete input and command palette with a list of suggestions.
 *
 * ### Anatomy
 *
 * ```tsx
 * <Combobox.Root>
 *
 *   <Combobox.ComboboxTagsInput>
 *     <Combobox.ComboboxTag />
 *   </Combobox.ComboboxTagsInput>
 *
 *   <Combobox.Input />
 *
 *   <Combobox.Content>
 *     <Combobox.Empty />
 *     <Combobox.Loading />
 *
 *     <Combobox.Item />
 *
 *     <Combobox.Group>
 *       <Combobox.Item />
 *     </Combobox.Group>
 *
 *     <Combobox.Separator />
 *   </Combobox.Content>
 * </Combobox.Root>
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

export const Default = {
  args: {},
} satisfies Story

const FormSchema = z.object({
  fruit: z.string().array(),
})

function ComboboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fruit: [],
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
              <Combobox
                type="multiple"
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <ComboboxTagsInput
                    className="w-[280px]"
                    placeholder="Search fruit..."
                  >
                    {field.value.map((value) => (
                      <ComboboxTag key={value} value={value}>
                        {fruits.find((fruit) => fruit.value === value)?.label}
                      </ComboboxTag>
                    ))}
                  </ComboboxTagsInput>
                </FormControl>
                <ComboboxContent>
                  <ComboboxEmpty>No fruit found.</ComboboxEmpty>
                  <ComboboxGroup heading="Fruits">
                    {fruits.map((fruit) => (
                      <ComboboxItem key={fruit.value} value={fruit.value}>
                        {fruit.label}
                      </ComboboxItem>
                    ))}
                  </ComboboxGroup>
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
  args: {},
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
  render: ComboboxForm,
} satisfies Story
