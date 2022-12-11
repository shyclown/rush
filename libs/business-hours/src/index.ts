export type TimeRange = [Date, Date];
export type TimeRangeString = [string, string];
export type TimeRangeStringRaw = [string | undefined, string | undefined];
enum Days {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

enum ExtraExcluded {
  vacations = "vacations",
  holidays = "holidays",
}

enum ExtraIncluded {
  overtime = "overtime",
  modify = "modify",
}

type BusinessHours = {
  [key in Days]?: TimeRangeString[];
};

export type OneOf = { date: string; start?: string; end?: string };

type ExtraExcludedGroup = {
  [key in ExtraExcluded]?: OneOf[];
};

type ExtraIncludedGroup = {
  [ExtraIncluded.overtime]?: OneOf[];
  [ExtraIncluded.modify]?: { replaced: OneOf; replacement: OneOf }[];
};

export type CompleteBusinessHours = BusinessHours &
  ExtraIncludedGroup &
  ExtraExcludedGroup & { ownerTimezone?: string };
export const ExampleExtraExcluded: ExtraExcludedGroup = {
  [ExtraExcluded.vacations]: [
    { date: "1.1.2002", start: "9:00:00", end: "17:00:00" },
  ],
  [ExtraExcluded.holidays]: [{ date: "1.2.2022" }, { date: "22.4.2022" }],
};

export const ExampleExtraIncluded: ExtraIncludedGroup = {
  [ExtraIncluded.overtime]: [
    { date: "1.1.2002", start: "9:00:00", end: "17:00:00" },
  ],
  [ExtraIncluded.modify]: [
    {
      replaced: { date: "1.1.2002", start: "9:00:00", end: "17:00:00" },
      replacement: { date: "1.1.2002", start: "9:00:00", end: "17:00:00" },
    },
  ],
};

export const ExampleBusinessHours: BusinessHours = {
  [Days.monday]: [
    ["09:00:00", "12:00:00"],
    ["14:00:00", "17:00:00"],
  ],
  [Days.tuesday]: [
    ["09:00:00", "12:00:00"],
    ["14:00:00", "17:00:00"],
  ],
  [Days.wednesday]: [
    ["09:00:00", "12:00:00"],
    ["14:00:00", "17:00:00"],
  ],
  [Days.thursday]: [
    ["09:00:00", "12:00:00"],
    ["14:00:00", "17:00:00"],
  ],
  [Days.friday]: [
    ["09:00:00", "12:00:00"],
    ["14:00:00", "17:00:00"],
  ],
};

const BusinessHours = (businessHours: BusinessHours) => {
  return businessHours;
};

export const GetNextFreeTime = (
  businessHours: BusinessHours,
  tasks: Task | TimeSensitiveTask[]
) => {
  console.log(tasks, businessHours);
};

export type Task = { duration: string };

export type TimeSensitiveTask = {
  start?: string;
  end?: string;
  durationInMinutes: string;
  timeZone?: string;
  format?: string;
};

export type LocalTimeSensitiveTask = {
  start?: Date;
  end?: Date;
  durationInMinutes: number;
  timeZone?: number;
  format?: string;
};
export const EstimateTask = (
  task: Task,
  businessHours: BusinessHours
): TimeRange[] => {
  console.log(task, businessHours);
  // const currentTime = new Date();
  // get now
  // check date and time
  // get next free time
  // get available time ranges
  // if task duration is inside range return now until end
  // else log range and grab next range
  return [[new Date(), new Date()]];
};

export default BusinessHours;
