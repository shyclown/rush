import { calculateAgainstRange } from "./calculateAgainstRange";
import { addMinutes } from "date-fns";

describe("Calculate Against Range", () => {
    it("should test range that has more than required duration", () => {
        const testRangeStart = new Date("2010-01-01");
        const testRangeEnd = addMinutes(new Date("2010-01-01"), 130);
        const result = calculateAgainstRange(
            {
                durationInMinutes: 100,
                format: "HH:mm:ss"
            },
            [testRangeStart, testRangeEnd]
        );
        expect(result).toMatchInlineSnapshot(`
      {
        "remainingRange": [
          2010-01-01T01:40:00.000Z,
          2010-01-01T02:10:00.000Z,
        ],
        "remainingTaskDuration": 30,
        "taskRange": [
          2010-01-01T00:00:00.000Z,
          2010-01-01T01:40:00.000Z,
        ],
      }
    `);
    });
    it("should test range that has less than required duration", () => {
        const testRangeStart = new Date("2010-01-01");
        const testRangeEnd = addMinutes(new Date("2010-01-01"), 90);
        const result = calculateAgainstRange(
            {
                durationInMinutes: 100,
                format: "HH:mm:ss"
            },
            [testRangeStart, testRangeEnd]
        );
        expect(result).toMatchInlineSnapshot(`
      {
        "remainingTaskDuration": 10,
        "taskRange": [
          2010-01-01T00:00:00.000Z,
          2010-01-01T01:30:00.000Z,
        ],
      }
    `);
    });
    it("should test range that has same as required duration", () => {
        const testRangeStart = new Date("2010-01-01");
        const testRangeEnd = addMinutes(new Date("2010-01-01"), 100);
        const result = calculateAgainstRange(
            {
                durationInMinutes: 100,
                format: "HH:mm:ss"
            },
            [testRangeStart, testRangeEnd]
        );
        expect(result).toMatchInlineSnapshot(`
      {
        "remainingTaskDuration": 0,
        "taskRange": [
          2010-01-01T00:00:00.000Z,
          2010-01-01T01:40:00.000Z,
        ],
      }
    `);
    });
});
