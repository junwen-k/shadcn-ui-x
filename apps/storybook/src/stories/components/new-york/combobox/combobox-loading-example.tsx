import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxLoading,
} from "@/registry/new-york/ui/combobox"

export const ComboboxLoadingExample = (
  props: React.ComponentProps<typeof Combobox>
) => (
  <Combobox {...props}>
    <ComboboxInput placeholder="Search fruit..." />
    <ComboboxContent>
      <ComboboxLoading />
    </ComboboxContent>
  </Combobox>
)
