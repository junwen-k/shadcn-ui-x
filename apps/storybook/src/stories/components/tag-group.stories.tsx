import { zodResolver } from "@hookform/resolvers/zod"
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { TagGroup, TagGroupItem } from "@/components/ui/tag-group"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"

/**
 * A tag group is a focusable list of labels, categories, keywords, filters, or other items, with support for keyboard navigation, selection, and removal.
 *
 * ### Anatomy
 *
 * ```tsx
 * <TagGroup.Root>
 *  <TagGroup.Item />
 * </TagGroup.Root>
 * ```
 */
const meta = {
  title: "Components/TagGroup",
  component: TagGroup,
  args: {
    type: "multiple",
    className: "flex gap-2",
  },
  render: (args) => (
    <TagGroup {...args}>
      <TagGroupItem value="Chocolate">Chocolate</TagGroupItem>
      <TagGroupItem value="Mint">Mint</TagGroupItem>
      <TagGroupItem value="Strawberry">Strawberry</TagGroupItem>
      <TagGroupItem value="Vanilla">Vanilla</TagGroupItem>
    </TagGroup>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TagGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Single = {
  args: {
    type: "single",
  },
} satisfies Story

export const Multiple = {
  args: {
    type: "multiple",
  },
} satisfies Story

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story

export const Removable = {
  args: {
    onRemove: fn<any>(),
  },
} satisfies Story

const FormSchema = z.object({
  options: z.string().array(),
  selected: z.string().array(),
})

function TagGroupForm() {
  const items = ["Chocolate", "Mint", "Strawberry", "Vanilla"]

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      options: items,
      selected: items.slice(0, 2),
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

  const options = form.watch("options")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="selected"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ice cream flavor</FormLabel>
              <FormControl>
                <TagGroup
                  type="multiple"
                  value={field.value}
                  onValueChange={field.onChange}
                  onRemove={(value) => {
                    form.setValue(
                      "options",
                      options.filter((option) => !value.includes(option))
                    )
                    field.onChange(
                      field.value.filter(
                        (selected) => !value.includes(selected)
                      )
                    )
                  }}
                >
                  {options.map((value) => (
                    <TagGroupItem key={value} value={value}>
                      {value}
                    </TagGroupItem>
                  ))}
                </TagGroup>
              </FormControl>
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
  render: TagGroupForm,
} satisfies Story
