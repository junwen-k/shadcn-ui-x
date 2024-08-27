import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { LockClosedIcon } from "@radix-ui/react-icons"
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
  PasswordInput,
  PasswordInputAdornment,
  PasswordInputAdornmentRevealToggle,
  PasswordInputControl,
  PasswordInputInput,
} from "@/registry/new-york/ui/password-input"
import { toast } from "@/registry/new-york/ui/use-toast"

const FormSchema = z
  .object({
    password: z.string().min(12, {
      message: "Password must be at least 12 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export const PasswordInputFormExample = () => {
  const [revealPassword, setRevealPassword] = React.useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <PasswordInput
                revealPassword={revealPassword}
                onRevealPasswordChange={setRevealPassword}
              >
                <PasswordInputAdornment>
                  <LockClosedIcon />
                </PasswordInputAdornment>
                <PasswordInputControl>
                  <FormControl>
                    <PasswordInputInput
                      autoComplete="new-password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                </PasswordInputControl>
                <PasswordInputAdornmentRevealToggle />
              </PasswordInput>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <PasswordInput
                revealPassword={revealPassword}
                onRevealPasswordChange={setRevealPassword}
              >
                <PasswordInputAdornment>
                  <LockClosedIcon />
                </PasswordInputAdornment>
                <PasswordInputControl>
                  <FormControl>
                    <PasswordInputInput
                      autoComplete="new-password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                </PasswordInputControl>
                <PasswordInputAdornmentRevealToggle />
              </PasswordInput>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
