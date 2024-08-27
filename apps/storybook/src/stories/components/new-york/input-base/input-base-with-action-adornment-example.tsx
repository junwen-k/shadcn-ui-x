import * as React from "react"
import { InfoCircledIcon } from "@radix-ui/react-icons"

import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base"

export const InputBaseWithActionAdornmentExample = (
  props: React.ComponentProps<typeof InputBase>
) => (
  <InputBase {...props}>
    <InputBaseControl>
      <InputBaseInput placeholder="Name" />
    </InputBaseControl>
    <InputBaseAdornment>
      <InputBaseAdornmentButton>
        <InfoCircledIcon />
      </InputBaseAdornmentButton>
    </InputBaseAdornment>
  </InputBase>
)
