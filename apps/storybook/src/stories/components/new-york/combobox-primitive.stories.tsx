import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import * as ComboboxPrimitive from "@/registry/new-york/ui/combobox-primitive"

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
 * Autocomplete input and command palette with a list of suggestions built on top of [Radix UI](https://www.radix-ui.com/primitives) and [cmdk](https://github.com/pacocoursey/cmdk).
 *
 * ### Anatomy
 *
 * ```tsx
 * <Combobox.Root>
 *   <Combobox.TagGroup>
 *     <Combobox.TagGroupItem>
 *       <Combobox.TagGroupItemRemove />
 *     </Combobox.TagGroupItem>
 *   </Combobox.TagGroup>
 *
 *   <Combobox.Input />
 *   <Combobox.Clear />
 *   <Combobox.Anchor />
 *   <Combobox.Trigger />
 *
 *   <Combobox.Portal>
 *     <Combobox.Content>
 *       <Combobox.Empty />
 *       <Combobox.Loading />
 *
 *       <Combobox.Item>
 *         <Combobox.ItemIndicator />
 *       </Combobox.Item>
 *
 *       <Combobox.Group>
 *         <Combobox.Item>
 *           <Combobox.ItemIndicator />
 *         </Combobox.Item>
 *       </Combobox.Group>
 *
 *       <Combobox.Separator />
 *     </Combobox.Content>
 *   </Combobox.Portal>
 * </Combobox.Root>
 * ```
 */
const meta = {
  title: "Components/new-york/ComboboxPrimitive",
  component: ComboboxPrimitive.Root,
  render: (args) => (
    <ComboboxPrimitive.Root {...args}>
      <ComboboxPrimitive.Anchor>
        <ComboboxPrimitive.Input placeholder="Search fruit..." />
        <ComboboxPrimitive.Clear>&#215;</ComboboxPrimitive.Clear>
        <ComboboxPrimitive.Trigger>&#8595;</ComboboxPrimitive.Trigger>
      </ComboboxPrimitive.Anchor>
      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Content>
          <ComboboxPrimitive.Empty>No fruit found.</ComboboxPrimitive.Empty>
          <ComboboxPrimitive.Group heading="Fruits">
            {fruits.map((fruit) => (
              <ComboboxPrimitive.Item
                key={fruit.value}
                textValue={fruit.label}
                value={fruit.value}
                className="data-[selected=true]:ring"
              >
                {fruit.label}
                <ComboboxPrimitive.ItemIndicator>
                  &#x2714;
                </ComboboxPrimitive.ItemIndicator>
              </ComboboxPrimitive.Item>
            ))}
          </ComboboxPrimitive.Group>
        </ComboboxPrimitive.Content>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  ),
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ComboboxPrimitive.Root>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic combobox implementation.
 */
export const Default = {
  args: {},
} satisfies Story

/**
 * Combobox can support multiple values, with full keyboard accessibility.
 */
export const Multiple = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState(fruits.map((fruit) => fruit.value))
    const [inputValue, setInputValue] = React.useState("")

    return (
      <ComboboxPrimitive.Root
        type="multiple"
        value={value}
        onValueChange={setValue}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
      >
        <ComboboxPrimitive.Anchor>
          <ComboboxPrimitive.TagGroup className="flex gap-2">
            {value.map((v) => (
              <ComboboxPrimitive.TagGroupItem key={v} value={v}>
                {fruits.find((fruit) => fruit.value === v)?.label}
                <ComboboxPrimitive.TagGroupItemRemove>
                  &#215;
                </ComboboxPrimitive.TagGroupItemRemove>
              </ComboboxPrimitive.TagGroupItem>
            ))}
          </ComboboxPrimitive.TagGroup>
          <ComboboxPrimitive.Input placeholder="Search fruit..." />
          <ComboboxPrimitive.Clear>&#215;</ComboboxPrimitive.Clear>
          <ComboboxPrimitive.Trigger>&#8595;</ComboboxPrimitive.Trigger>
        </ComboboxPrimitive.Anchor>
        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Content>
            <ComboboxPrimitive.Empty>No fruit found.</ComboboxPrimitive.Empty>
            <ComboboxPrimitive.Group heading="Fruits">
              {fruits.map((fruit) => (
                <ComboboxPrimitive.Item
                  key={fruit.value}
                  textValue={fruit.label}
                  value={fruit.value}
                  className="data-[selected=true]:ring"
                >
                  {fruit.label}
                  <ComboboxPrimitive.ItemIndicator>
                    &#x2714;
                  </ComboboxPrimitive.ItemIndicator>
                </ComboboxPrimitive.Item>
              ))}
            </ComboboxPrimitive.Group>
          </ComboboxPrimitive.Content>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    )
  },
} satisfies Story

/**
 * Combobox can be used as a multi-select.
 */
export const MultiSelect = {
  args: {},
  render: () => {
    const [value, setValue] = React.useState(fruits.map((fruit) => fruit.value))
    const [inputValue, setInputValue] = React.useState("")

    return (
      <ComboboxPrimitive.Root
        type="multiple"
        value={value}
        onValueChange={setValue}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
      >
        <ComboboxPrimitive.Anchor>
          <ComboboxPrimitive.Trigger>
            {value.length ? `${value.length} selected` : "Select fruit"}
          </ComboboxPrimitive.Trigger>
          <ComboboxPrimitive.Clear>&#215;</ComboboxPrimitive.Clear>
        </ComboboxPrimitive.Anchor>
        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Content>
            <ComboboxPrimitive.Empty>No fruit found.</ComboboxPrimitive.Empty>
            <ComboboxPrimitive.Group heading="Fruits">
              {fruits.map((fruit) => (
                <ComboboxPrimitive.Item
                  key={fruit.value}
                  textValue={fruit.label}
                  value={fruit.value}
                  className="data-[selected=true]:ring"
                >
                  {fruit.label}
                  <ComboboxPrimitive.ItemIndicator>
                    &#x2714;
                  </ComboboxPrimitive.ItemIndicator>
                </ComboboxPrimitive.Item>
              ))}
            </ComboboxPrimitive.Group>
          </ComboboxPrimitive.Content>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    )
  },
} satisfies Story
