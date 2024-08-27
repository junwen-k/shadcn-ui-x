import * as React from "react"

import {
  InputBase,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base"

export const InputBaseDefaultExample = (
  props: React.ComponentProps<typeof InputBase>
) => (
  <InputBase {...props}>
    <InputBaseControl>
      <InputBaseInput type="email" placeholder="Email" />
    </InputBaseControl>
  </InputBase>
)
