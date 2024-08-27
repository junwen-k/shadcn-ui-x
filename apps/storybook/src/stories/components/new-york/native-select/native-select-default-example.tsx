import * as React from "react"

import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/new-york/ui/native-select"

export const NativeSelectDefaultExample = (
  props: React.ComponentProps<typeof NativeSelect>
) => (
  <NativeSelect {...props}>
    <NativeSelectOption value="apple">Apple</NativeSelectOption>
    <NativeSelectOption value="banana">Banana</NativeSelectOption>
    <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    <NativeSelectOption value="grapes">Grapes</NativeSelectOption>
    <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
  </NativeSelect>
)
