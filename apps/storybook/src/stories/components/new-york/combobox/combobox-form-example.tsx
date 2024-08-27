import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/registry/new-york/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
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

const FormSchema = z.object({
  fruit: z
    .string()
    .array()
    .min(1, { message: "Please select at least 1 fruit" }),
})

export const ComboboxFormExample = () => {
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
