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

export const TimelineAlternateExample = (
  props: React.ComponentProps<typeof Timeline>
) => (
  <Timeline {...props}>
    <TimelineItem className="before:flex-1">
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <TimelineTitle>Eat</TimelineTitle>
        <TimelineDescription>Because you need strength</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem className="after:flex-1">
      <TimelineContent>
        <TimelineTitle>Code</TimelineTitle>
        <TimelineDescription>Because it's awesome!</TimelineDescription>
      </TimelineContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
    </TimelineItem>
    <TimelineItem className="before:flex-1">
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <TimelineTitle>Sleep</TimelineTitle>
        <TimelineDescription>Because you need rest</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem className="after:flex-1">
      <TimelineContent>
        <TimelineTitle>Repeat</TimelineTitle>
        <TimelineDescription>
          Because this is the life you love!
        </TimelineDescription>
      </TimelineContent>
      <TimelineSeparator>
        <TimelineDot />
      </TimelineSeparator>
    </TimelineItem>
  </Timeline>
)
