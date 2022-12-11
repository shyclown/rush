import { addMinutes, differenceInMinutes, isBefore } from "date-fns";
import { LocalTimeSensitiveTask, TimeRange } from "../index";

export const calculateAgainstRange = (
  { durationInMinutes, start }: LocalTimeSensitiveTask,
  [rangeStart, rangeEnd]: TimeRange
) => {
  if (start && isBefore(rangeEnd, start)) {
    // return same duration and empty range
    return { remainingTaskDuration: durationInMinutes, range: [] };
  }

  const availableMinutes = differenceInMinutes(rangeEnd, rangeStart);

  if (availableMinutes === durationInMinutes) {
    return { remainingTaskDuration: 0, taskRange: [rangeStart, rangeEnd] };
  } else if (availableMinutes < durationInMinutes) {
    // Task can't be done in this range
    const remainingTaskDuration = durationInMinutes - availableMinutes;

    return { remainingTaskDuration, taskRange: [rangeStart, rangeEnd] };
  } else {
    // Task can be done int this range
    // we need to calculate remaining range outside task
    const taskEndDate = addMinutes(rangeStart, durationInMinutes);
    const remainingTaskDuration = availableMinutes - durationInMinutes;
    const remainingRange = [taskEndDate, rangeEnd];

    return {
      remainingTaskDuration,
      taskRange: [rangeStart, taskEndDate],
      remainingRange,
    };
  }
};
