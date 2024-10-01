import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerTrigger,
  DatePickerValue,
} from "@/registry/new-york/ui/date-picker"

export const DatePickerRangeExample = () => (
  <DatePicker mode="range" required formatStr="P">
    <DatePickerTrigger className="w-[280px]">
      <DatePickerValue placeholder="Pick a date" />
    </DatePickerTrigger>
    <DatePickerContent>
      <DatePickerCalendar />
    </DatePickerContent>
  </DatePicker>
)
