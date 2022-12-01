import { differenceInMinutes, isBefore, addMinutes } from 'date-fns'

type TimeRange = [Date, Date];
type TimeRangeString = [string, string];
enum Days {
    monday ="monday",
    tuesday ="tuesday",
    wednesday  ="wednesday",
    thursday ="thursday",
    friday ="friday",
    saturday ="saturday",
    sunday ="sunday",
}

enum Extra {
    vacations = "vacations",
    holidays = "holidays"
}

type BusinessHours = {
    [key in Days]?: TimeRangeString[];
};
type StringTime = string;
type OneOf = {date: Date | string, start?: string, end?: string}

type ExtraExclueded = {
    [key in Extra]: OneOf[];
};

const ExampleExtraExcluded: ExtraExclueded = {
    [Extra.vacations]: [{date: "1.1.2002", start:"9:00:00", end:"17:00:00"}],
    [Extra.holidays]: [{date: "1.2.2022"}, {date: "22.4.2022"}]
}

const ExampleBusinessHours : BusinessHours = {
    [Days.monday]: [["9:00:00", "12:00:00"], ["14:00:00", "17:00:00"]],
    [Days.tuesday]: [["9:00:00", "12:00:00"], ["14:00:00", "17:00:00"]],
    [Days.wednesday]: [["9:00:00", "12:00:00"], ["14:00:00", "17:00:00"]],
    [Days.thursday]: [["9:00:00", "12:00:00"], ["14:00:00", "17:00:00"]],
    [Days.friday]: [["9:00:00", "12:00:00"], ["14:00:00", "17:00:00"]],
}


const BusinessHours = (businessHours: BusinessHours) => {
    return businessHours;
}

const GetNextFreeTime = (businessHours: BusinessHours, tasks: Task | TimeSensitiveTask[] ) => {

}

type Task = {duration: string, format: "HH:mm:ss"}
type TimeSensitiveTask = {start?: Date, end?: Date, durationInMinutes: number, format: "HH:mm:ss"}
const EstimateTask = (task: Task, businessHours: BusinessHours): TimeRange[] => {
    const currentTime = new Date();
    // get now
    // check date and time
    // get next free time
    // get available time ranges
    // if task duration is inside range return now until end
    // else log range and grab next range
    return [[new Date(), new Date()]]
}

const calculateAgainstRange = ({durationInMinutes, start, end}: TimeSensitiveTask, [rangeStart, rangeEnd]: TimeRange) => {

    if (isBefore(rangeEnd[0], start)) {
        // return same duration and empty range
        return {remainingDuration: durationInMinutes, range: []}
    }

    const availableMinutes = differenceInMinutes(rangeStart, rangeEnd);

    if (availableMinutes > durationInMinutes) {
        // Task can be done in this range
        // we need to calculate when it ends
        const taskEndDate = addMinutes(rangeStart, durationInMinutes);
        return {remainingDuration: 0, range: [rangeStart,taskEndDate]}
    } else {
        // Task is placed inside this range
        // and requires next ranges to be completed
        const remainingDuration = durationInMinutes - availableMinutes;
        return {remainingDuration: remainingDuration, range: [rangeStart,rangeEnd]}
    }

}

export default BusinessHours;