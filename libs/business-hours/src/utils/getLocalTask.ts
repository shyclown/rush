import { LocalTimeSensitiveTask, TimeSensitiveTask } from "../index";
import { parseISO } from "date-fns";

export const getLocalTask = (
  task: TimeSensitiveTask
): LocalTimeSensitiveTask => {
  return {
    start: (task.start && parseISO(task.start)) || undefined,
    end: (task.end && parseISO(task.end)) || undefined,
    durationInMinutes: parseInt(task.durationInMinutes),
    format: task.format,
    timeZone: (task.timeZone && parseInt(task.timeZone)) || undefined,
  };
};
