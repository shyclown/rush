import { TimeRangeString } from "../index";

export const calculateDayLocalRanges = (
  date: string,
  ranges: TimeRangeString[],
  timeZone: string = "UTC"
) => {
  // Hours : Minutes : Seconds
  return ranges.map(([startTime, endTime]) => [
    new Date(date + ", " + startTime + ".000" + timeZone),
    new Date(date + ", " + endTime + ".000" + timeZone),
  ]);
};
