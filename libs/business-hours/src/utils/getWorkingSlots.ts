import type { CompleteBusinessHours, TimeRangeStringRaw } from "../index";
import { setHours, setMinutes, setSeconds, format, getDay } from "date-fns";

const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;
export const getWorkingSlots = (
  localDate: Date,
  businessHours: CompleteBusinessHours
) => {
  const day = getDay(localDate);

  const currentDayRanges = businessHours[DAYS[day]];

  const isoDate = format(localDate, "yyyy-MM-dd");

  const excludedHolidays = businessHours.holidays?.find(
    (holiday) => holiday.date === isoDate
  );

  const excludedVacation = businessHours.vacations?.find(
    (vacation) => vacation.date === isoDate
  );

  // Sits on top of holidays

  const overtimeWork = businessHours.overtime?.filter(
    (overtime) => overtime.date === isoDate
  );

  const movedWorkFromThisDate = businessHours.modify?.filter(
    (modified) => modified.replaced.date === isoDate
  );

  const movedWorkToThisDate = businessHours.modify?.filter(
    (modified) => modified.replacement.date === isoDate
  );

  const timeToDate = (utcTime: string, utcDate: Date) => {
    const [hours, minutes, seconds] = utcTime.split(":");

    return setSeconds(
      setMinutes(setHours(utcDate, parseInt(hours)), parseInt(minutes)),
      parseInt(seconds)
    );
  };

  if (excludedHolidays) {
    if (!overtimeWork && !movedWorkToThisDate) return [];

    const overtimeRange =
      overtimeWork?.map(
        (overtime) => [overtime.start, overtime.end] as TimeRangeStringRaw
      ) || [];

    const movedRange =
      movedWorkToThisDate?.map(
        (moved) =>
          [moved.replacement.start, moved.replacement.end] as TimeRangeStringRaw
      ) || [];

    return [...overtimeRange, ...movedRange].map((range) => {
      return (
        range[0] &&
        range[1] && [
          timeToDate(range[0], localDate),
          timeToDate(range[1], localDate),
        ]
      );
    });
  }

  if (movedWorkFromThisDate) {
    // movedWorkFromThisDate.forEach((movedRange) => {});
  }

  if (excludedVacation) {
    // excluded vacation days
  }

  return currentDayRanges?.map((range) => {
    return (
      range[0] &&
      range[1] && [
        timeToDate(range[0], localDate),
        timeToDate(range[1], localDate),
      ]
    );
  });
};
