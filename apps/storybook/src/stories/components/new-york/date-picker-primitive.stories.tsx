import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { addDays } from "date-fns"

import * as DatePickerPrimitive from "@/registry/new-york/ui/date-picker-impl"

/**
 * Date Picker primitive built on top of [Radix UI](https://www.radix-ui.com/primitives) and [React DayPicker](https://daypicker.dev/).
 *
 * ### Anatomy
 *
 * ```tsx
 * <DatePicker.Root>
 *   <DatePicker.Trigger>
 *     <DatePicker.Value />
 *   </DatePicker.Trigger>
 *   <DatePicker.Input />
 *   <DatePicker.Clear />
 *   <DatePicker.Anchor />
 *
 *   <DatePicker.Portal>
 *     <DatePicker.Content>
 *       <DatePicker.Calendar />
 *     </DatePicker.Content>
 *   </DatePicker.Portal>
 * </DatePicker.Root>
 * ```
 */
const meta = {
  title: "Components/new-york/DatePickerPrimitive",
  component: DatePickerPrimitive.Root,
  render: (args) => (
    <DatePickerPrimitive.Root {...args}>
      <DatePickerPrimitive.Anchor>
        <DatePickerPrimitive.Trigger>
          <DatePickerPrimitive.Value placeholder="Pick a date" />
        </DatePickerPrimitive.Trigger>
        <DatePickerPrimitive.Clear>&#215;</DatePickerPrimitive.Clear>
      </DatePickerPrimitive.Anchor>
      <DatePickerPrimitive.Portal>
        <DatePickerPrimitive.Content>
          <DatePickerPrimitive.Calendar />
        </DatePickerPrimitive.Content>
      </DatePickerPrimitive.Portal>
    </DatePickerPrimitive.Root>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePickerPrimitive.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story

export const Required = {
  args: {
    required: true,
  },
} satisfies Story

// export const Multiple = {
//   args: {
//     mode: "multiple",
//   },
//   render: (args) => {
//     const [value, setValue] = React.useState([])

//     return (
//       <DatePickerPrimitive.Root
//         {...args}
//         value={value}
//         onValueChange={setValue}
//         formatStr="P"
//       >
//         <DatePickerPrimitive.Anchor>
//           <DatePickerPrimitive.Trigger>
//             asd
//             <DatePickerPrimitive.Value placeholder="Pick a date" />
//           </DatePickerPrimitive.Trigger>
//           <DatePickerPrimitive.Clear>&#215;</DatePickerPrimitive.Clear>
//         </DatePickerPrimitive.Anchor>
//         <DatePickerPrimitive.Portal>
//           <DatePickerPrimitive.Content>
//             <DatePickerPrimitive.Calendar />
//           </DatePickerPrimitive.Content>
//         </DatePickerPrimitive.Portal>
//       </DatePickerPrimitive.Root>
//     )
//   },
// } satisfies Story

// export const Range = {
//   args: {
//     mode: "range",
//   },
//   render: (args) => {
//     const [value, setValue] = React.useState({
//       from: new Date(),
//       to: addDays(new Date(), 7),
//     })

//     return (
//       <DatePickerPrimitive.Root
//         {...args}
//         value={value}
//         onValueChange={setValue}
//         formatStr="P"
//       >
//         <DatePickerPrimitive.Anchor>
//           <DatePickerPrimitive.Trigger>
//             asd
//             <DatePickerPrimitive.Value placeholder="Pick a date" />
//           </DatePickerPrimitive.Trigger>
//           <DatePickerPrimitive.Clear>&#215;</DatePickerPrimitive.Clear>
//         </DatePickerPrimitive.Anchor>
//         <DatePickerPrimitive.Portal>
//           <DatePickerPrimitive.Content>
//             <DatePickerPrimitive.Calendar />
//           </DatePickerPrimitive.Content>
//         </DatePickerPrimitive.Portal>
//       </DatePickerPrimitive.Root>
//     )
//   },
// } satisfies Story

export const Input = {
  render: (args) => (
    <DatePickerPrimitive.Root {...args}>
      <DatePickerPrimitive.Anchor>
        <DatePickerPrimitive.Input />
        <DatePickerPrimitive.Clear>&#215;</DatePickerPrimitive.Clear>
        <DatePickerPrimitive.Trigger>&#8595;</DatePickerPrimitive.Trigger>
      </DatePickerPrimitive.Anchor>
      <DatePickerPrimitive.Portal>
        <DatePickerPrimitive.Content>
          <DatePickerPrimitive.Calendar />
        </DatePickerPrimitive.Content>
      </DatePickerPrimitive.Portal>
    </DatePickerPrimitive.Root>
  ),
} satisfies Story
