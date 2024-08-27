import * as React from "react"

import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base"

export const InputBaseAdornmentExample = (
  props: React.ComponentProps<typeof InputBase>
) => (
  <InputBase {...props}>
    <InputBaseAdornment>₩</InputBaseAdornment>
    <InputBaseControl>
      <InputBaseInput type="number" placeholder="Amount" />
    </InputBaseControl>
    <InputBaseAdornment>WON</InputBaseAdornment>
  </InputBase>
)
