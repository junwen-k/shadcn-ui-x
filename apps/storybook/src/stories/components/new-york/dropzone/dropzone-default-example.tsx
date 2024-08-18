import * as React from "react"

import {
  Dropzone,
  DropzoneInput,
  DropzoneZone,
  DropzoneZoneDescription,
  DropzoneZoneIcon,
  DropzoneZoneTitle,
} from "@/registry/new-york/ui/dropzone"

export const DropzoneDefaultExample = (
  props: React.ComponentProps<typeof Dropzone>
) => (
  <Dropzone {...props}>
    <DropzoneZone>
      <DropzoneInput />
      <div className="flex flex-col items-center gap-4 text-center">
        <DropzoneZoneIcon />
        <div className="flex flex-col gap-1.5">
          <DropzoneZoneTitle>
            Drag 'n' drop some files here, or click to select files
          </DropzoneZoneTitle>
          <DropzoneZoneDescription>
            Please upload file with less than 4MB
          </DropzoneZoneDescription>
        </div>
      </div>
    </DropzoneZone>
  </Dropzone>
)
