import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/registry/new-york/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/new-york/ui/native-select"
import { toast } from "@/registry/new-york/ui/use-toast"

const FormSchema = z.object({
  fruit: z.string().min(1, { message: "Please select a fruit" }),
})

export const NativeSelectFormExample = () => {
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
              <FormControl>
                <NativeSelect {...field}>
                  <NativeSelectOption value="apple">Apple</NativeSelectOption>
                  <NativeSelectOption value="banana">Banana</NativeSelectOption>
                  <NativeSelectOption value="blueberry">
                    Blueberry
                  </NativeSelectOption>
                  <NativeSelectOption value="grapes">Grapes</NativeSelectOption>
                  <NativeSelectOption value="pineapple">
                    Pineapple
                  </NativeSelectOption>
                </NativeSelect>
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
