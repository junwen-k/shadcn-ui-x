import { Button } from "@/registry/new-york/ui/button"
import {
  Dropzone,
  DropzoneInput,
  DropzoneTrigger,
  DropzoneZone,
  DropzoneZoneDescription,
  DropzoneZoneIcon,
  DropzoneZoneTitle,
} from "@/registry/new-york/ui/dropzone"

export const DropzoneTriggerExample = () => (
  <Dropzone noClick>
    <DropzoneZone>
      <DropzoneInput />
      <div className="flex flex-col items-center gap-4 text-center">
        <DropzoneZoneIcon />
        <div className="flex flex-col gap-1.5">
          <DropzoneZoneTitle>Drag 'n' drop some files here</DropzoneZoneTitle>
          <DropzoneZoneDescription>
            Please upload file with less than 4MB
          </DropzoneZoneDescription>
        </div>
        <DropzoneTrigger asChild>
          <Button variant="outline" className="w-full">
            Open
          </Button>
        </DropzoneTrigger>
      </div>
    </DropzoneZone>
  </Dropzone>
)
