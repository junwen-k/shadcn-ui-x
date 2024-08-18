"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Cross2Icon, FileIcon } from "@radix-ui/react-icons"
import prettyBytes from "pretty-bytes"
import { ErrorCode } from "react-dropzone"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/registry/new-york/ui/button"
import {
  Dropzone,
  DropzoneInput,
  DropzoneZone,
  DropzoneZoneDescription,
  DropzoneZoneIcon,
  DropzoneZoneTitle,
} from "@/registry/new-york/ui/dropzone"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base"
import { toast } from "@/registry/new-york/ui/use-toast"

// 100 kB
const MAX_FILE_SIZE = 100000

export const DropzoneFormExample = () => {
  const FormSchema = z.object({
    files: z
      .array(
        z.object({
          file: z
            .instanceof(File)
            .refine(
              (file) => file.size <= MAX_FILE_SIZE,
              "File exceed max file size"
            ),
        })
      )
      .min(1, { message: "Minimum one file is required" }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      files: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "files",
  })

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[40rem] space-y-6"
      >
        <Dropzone
          maxSize={MAX_FILE_SIZE}
          onDropAccepted={(acceptedFiles) =>
            append(acceptedFiles.map((file) => ({ file })))
          }
          onDropRejected={(fileRejections) => {
            fileRejections.forEach((fileRejection) => {
              if (
                fileRejection.errors.some(
                  (err) => err.code === ErrorCode.FileTooLarge
                )
              ) {
                toast({
                  variant: "destructive",
                  title: "File size too large.",
                  description: `File '${fileRejection.file.name}' is too large.`,
                })
              }
            })
          }}
        >
          {({ maxSize }) => (
            <FormField
              control={form.control}
              name="files"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>File upload</FormLabel>
                  <DropzoneZone className="flex justify-center">
                    <FormControl>
                      <DropzoneInput {...field} />
                    </FormControl>
                    <div className="flex items-center gap-6">
                      <DropzoneZoneIcon />
                      <div className="grid gap-0.5">
                        <DropzoneZoneTitle>
                          Browse to upload your file
                        </DropzoneZoneTitle>
                        <DropzoneZoneDescription>
                          {`Maximum file size: ${prettyBytes(maxSize ?? 0)}`}
                        </DropzoneZoneDescription>
                      </div>
                    </div>
                  </DropzoneZone>
                  <FormDescription>Drag and drop is supported.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </Dropzone>
        {!!fields.length && (
          <div className="grid gap-4">
            <h6 className="font-semibold leading-none tracking-tight">
              File name
            </h6>
            <ul className="grid gap-2">
              {fields.map((field, index) => (
                <InputBase asChild>
                  <li>
                    <InputBaseAdornment>
                      <FileIcon />
                    </InputBaseAdornment>
                    <InputBaseControl>
                      <InputBaseInput readOnly value={field.file.name} />
                    </InputBaseControl>
                    <InputBaseAdornmentButton onClick={() => remove(index)}>
                      <Cross2Icon />
                    </InputBaseAdornmentButton>
                  </li>
                </InputBase>
              ))}
            </ul>
          </div>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
