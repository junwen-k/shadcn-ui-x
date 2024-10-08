import * as React from "react"

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/registry/new-york/ui/timeline"

export const TimelineDefaultExample = (
  props: React.ComponentProps<typeof Timeline>
) => (
  <Timeline {...props}>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <TimelineTitle>Eat</TimelineTitle>
        <TimelineDescription>Because you need strength</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <TimelineTitle>Code</TimelineTitle>
        <TimelineDescription>Because it's awesome!</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <TimelineTitle>Sleep</TimelineTitle>
        <TimelineDescription>Because you need rest</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
      </TimelineSeparator>
      <TimelineContent>
        <TimelineTitle>Repeat</TimelineTitle>
        <TimelineDescription>
          Because this is the life you love!
        </TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  </Timeline>
)
