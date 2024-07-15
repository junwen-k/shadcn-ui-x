import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { LockClosedIcon } from "@radix-ui/react-icons"
import type { Meta, StoryObj } from "@storybook/react"
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
import { Toaster } from "@/registry/new-york/ui/toaster"
import { toast } from "@/registry/new-york/ui/use-toast"

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
  title: "Components/new-york/PasswordInput",
  component: PasswordInput,
  render: (args) => (
    <PasswordInput {...args}>
      <PasswordInputControl>
        <PasswordInputInput
          autoComplete="new-password"
          placeholder="Password"
        />
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
        <LockClosedIcon />
      </PasswordInputAdornment>
      <PasswordInputControl>
        <PasswordInputInput
          autoComplete="new-password"
          placeholder="Password"
        />
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
