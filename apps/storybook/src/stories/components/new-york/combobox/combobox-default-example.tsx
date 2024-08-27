import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
} from "@/registry/new-york/ui/combobox"

export const ComboboxDefaultExample = (
  props: React.ComponentProps<typeof Combobox>
) => (
  <Combobox {...props}>
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
)
