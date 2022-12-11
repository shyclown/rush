import { calculateDayLocalRanges } from "./calculateDayLocalRanges";

describe("Calculate Day Ranges", () => {
  it("should change range to UTC date", () => {
    const calculated = calculateDayLocalRanges("July 1, 1999", [
      ["9:00:00", "10:00:00"],
      ["10:00:00", "11:00:00"],
      ["12:00:00", "16:00:00"]
    ]);
    expect(calculated).toMatchInlineSnapshot(`
      [
        [
          1999-07-01T09:00:00.000Z,
          1999-07-01T10:00:00.000Z,
        ],
        [
          1999-07-01T10:00:00.000Z,
          1999-07-01T11:00:00.000Z,
        ],
        [
          1999-07-01T12:00:00.000Z,
          1999-07-01T16:00:00.000Z,
        ],
      ]
    `);
  });
  it("should change range to EET date", () => {
    const calculated = calculateDayLocalRanges(
      "July 1, 1999",
      [
        ["9:00:00", "10:00:00"],
        ["10:00:00", "11:00:00"],
        ["12:00:00", "16:00:00"]
      ],
      "+7:00"
    );
    expect(calculated).toMatchInlineSnapshot(`
      [
        [
          1999-07-01T02:00:00.000Z,
          1999-07-01T03:00:00.000Z,
        ],
        [
          1999-07-01T03:00:00.000Z,
          1999-07-01T04:00:00.000Z,
        ],
        [
          1999-07-01T05:00:00.000Z,
          1999-07-01T09:00:00.000Z,
        ],
      ]
    `);
  });
});
