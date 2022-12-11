import { getDateInTimezone } from "./timezone";

describe("Get timezone", () => {
  it("should get timezone", () => {
    const date = new Date("2010-02-02T00:00:00.000"); // Local

    const losAngelesDate = getDateInTimezone(date, "America/Los_Angeles");
    const newYorkDate = getDateInTimezone(date, "America/New_York");
    const helsinkiDate = getDateInTimezone(date, "Europe/Helsinki");

    expect(date).toMatchInlineSnapshot(`2010-02-02T00:00:00.000Z`);
    expect(losAngelesDate).toMatchInlineSnapshot(`2010-02-02T10:00:00.000Z`);
    expect(newYorkDate).toMatchInlineSnapshot(`2010-02-02T07:00:00.000Z`);
    expect(helsinkiDate).toMatchInlineSnapshot(`2010-02-02T00:00:00.000Z`);
  });
});
