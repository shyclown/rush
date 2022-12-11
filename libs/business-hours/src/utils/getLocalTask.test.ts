import { TimeSensitiveTask } from "../index";
import { getLocalTask } from "./getLocalTask";

describe("Get Local Task", () => {
  it("should transform task to local task", () => {
    const task: TimeSensitiveTask = {
      start: "2010-01-01T00:00:00.000Z",
      end: "2010-02-01T00:00:00.000Z",
      durationInMinutes: "100",
    };
    const localTask = getLocalTask(task);
    expect(localTask).toMatchInlineSnapshot(`
      {
        "durationInMinutes": 100,
        "end": 2010-02-01T00:00:00.000Z,
        "format": undefined,
        "start": 2010-01-01T00:00:00.000Z,
        "timeZone": undefined,
      }
    `);
  });
});
