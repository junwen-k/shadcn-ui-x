import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Meta, StoryObj } from "@storybook/react"
import { Lock } from "lucide-react"
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
import {
  PasswordInput,
  PasswordInputAdornment,
  PasswordInputAdornmentRevealToggle,
  PasswordInputControl,
  PasswordInputInput,
} from "@/components/ui/password-input"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"

/**
 * Password Input provides a way for the user to securely enter a password, with the ability to toggle the visibility of the password.
 *
 * ### Anatomy
 *
 * ```tsx
 * <PasswordInput.Root>
 *  <PasswordInput.Control>
 *    <PasswordInput.Input />
 *  </PasswordInput.Control>
 *  <PasswordInput.AdornmentRevealToggle />
 * </PasswordInput.Root>
 * ```
 */
const meta = {
  title: "Components/PasswordInput",
  component: PasswordInput,
  render: (args) => (
    <PasswordInput {...args}>
      <PasswordInputControl>
        <PasswordInputInput placeholder="Password" />
      </PasswordInputControl>
      <PasswordInputAdornmentRevealToggle />
    </PasswordInput>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default variant of the password input.
 */
export const Default = {} satisfies Story

/**
 * Password input with start adornment.
 */
export const WithAdornment = {
  render: (args) => (
    <PasswordInput {...args}>
      <PasswordInputAdornment>
        <Lock />
      </PasswordInputAdornment>
      <PasswordInputControl>
        <PasswordInputInput placeholder="Password" />
      </PasswordInputControl>
      <PasswordInputAdornmentRevealToggle />
    </PasswordInput>
  ),
} satisfies Story

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

function PasswordForm() {
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
                  <Lock />
                </PasswordInputAdornment>
                <PasswordInputControl>
                  <FormControl>
                    <PasswordInputInput placeholder="Password" {...field} />
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
                  <Lock />
                </PasswordInputAdornment>
                <PasswordInputControl>
                  <FormControl>
                    <PasswordInputInput
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

/**
 * Use `<Form>` components to manage the state of the password input(s).
 */
export const WithForm = {
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
  render: PasswordForm,
} satisfies Story
