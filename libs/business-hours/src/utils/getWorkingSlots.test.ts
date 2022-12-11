import { CompleteBusinessHours } from "../index";
import { getWorkingSlots } from "./getWorkingSlots";
import { getDay, parseISO } from "date-fns";

describe("Get Local Working Slots", () => {
  it("should get local working slots", () => {
    const businessHours: CompleteBusinessHours = {
      monday: [
        ["9:00:00", "12:00:00"],
        ["14:00:00", "17:00:00"],
      ],
      tuesday: [["9:00:00", "12:00:00"]],
      ownerTimezone: "+3",
    };
    const checkedDay = parseISO("2022-10-11T00:00:00.000Z");
    expect(checkedDay).toMatchInlineSnapshot(`2022-10-11T00:00:00.000Z`);
    expect(getDay(checkedDay)).toMatchInlineSnapshot(`2`); // Tuesday

    const localTask = getWorkingSlots(checkedDay, businessHours);
    expect(localTask).toMatchInlineSnapshot(`
      [
        [
          2022-10-11T09:00:00.000Z,
          2022-10-11T12:00:00.000Z,
        ],
      ]
    `);
  });

  it("should test holiday date", () => {
    const businessHours: CompleteBusinessHours = {
      monday: [
        ["9:00:00", "12:00:00"],
        ["14:00:00", "17:00:00"],
      ],
      tuesday: [["9:00:00", "12:00:00"]],
      ownerTimezone: "+3",
      holidays: [{ date: "2022-10-11" }],
    };
    const checkedDay = parseISO("2022-10-11"); // Local
    expect(getDay(checkedDay)).toMatchInlineSnapshot(`2`); // Tuesday

    const localTask = getWorkingSlots(checkedDay, businessHours);
    expect(localTask).toMatchInlineSnapshot(`[]`);
  });

  it("should test overtime on holiday date", () => {
    const businessHours: CompleteBusinessHours = {
      monday: [
        ["9:00:00", "12:00:00"],
        ["14:00:00", "17:00:00"],
      ],
      tuesday: [["9:00:00", "12:00:00"]],
      ownerTimezone: "+3",
      holidays: [{ date: "2022-10-11" }],
      overtime: [{ date: "2022-10-11", start: "09:00:00", end: "09:00:01" }],
    };
    const checkedDay = parseISO("2022-10-11T00:00:00.000Z");
    expect(checkedDay).toMatchInlineSnapshot(`2022-10-11T00:00:00.000Z`);
    expect(getDay(checkedDay)).toMatchInlineSnapshot(`2`); // Tuesday

    const localTask = getWorkingSlots(checkedDay, businessHours);
    expect(localTask).toMatchInlineSnapshot(`
      [
        [
          2022-10-11T09:00:00.000Z,
          2022-10-11T09:00:01.000Z,
        ],
      ]
    `);
  });
});
