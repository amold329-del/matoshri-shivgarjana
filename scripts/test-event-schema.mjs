/**
 * Unit tests for src/lib/event-schema.ts.
 *
 *     npm run test:events
 *
 * Uses node:test and Node's built-in TypeScript stripping — no test framework
 * added to the project. Covers the cases that produced the Search Console
 * "Missing field 'endDate'" issue and the ones that could reintroduce it: a
 * missing end must yield no key at all, and no input may ever produce an
 * invented, inverted or malformed date.
 */

import assert from "node:assert/strict";
import test from "node:test";
import { buildEvent } from "../src/lib/event-schema.ts";

const base = {
  id: "t1",
  path: "/events/",
  name: "चाचणी कार्यक्रम",
  description: "test",
  date: "2026-09-14",
};

test("single-day event with a start and end time", () => {
  const e = buildEvent({ ...base, startTime: "6:00 AM", endTime: "9:30 AM" });
  assert.equal(e.startDate, "2026-09-14T06:00:00+05:30");
  assert.equal(e.endDate, "2026-09-14T09:30:00+05:30");
  assert.ok(Date.parse(e.endDate) > Date.parse(e.startDate));
});

test("multi-day event ends on the later day", () => {
  const e = buildEvent({
    ...base,
    startTime: "6:00 AM",
    endDate: "2026-09-25",
    endTime: "9:00 PM",
  });
  assert.equal(e.endDate, "2026-09-25T21:00:00+05:30");
});

test("times carry the IST offset", () => {
  const e = buildEvent({ ...base, startTime: "7:30 PM" });
  assert.ok(e.startDate.endsWith("+05:30"));
  assert.equal(e.startDate, "2026-09-14T19:30:00+05:30");
});

test("midnight and noon cross over correctly", () => {
  assert.equal(
    buildEvent({ ...base, startTime: "12:00 AM" }).startDate,
    "2026-09-14T00:00:00+05:30",
  );
  assert.equal(
    buildEvent({ ...base, startTime: "12:00 PM" }).startDate,
    "2026-09-14T12:00:00+05:30",
  );
});

test("no end time means no endDate key at all — never an invented value", () => {
  const e = buildEvent({ ...base, startTime: "6:00 AM" });
  assert.equal("endDate" in e, false);
  assert.equal(e.endDate, undefined);
});

test("date-only event when no clock time is known", () => {
  const e = buildEvent(base);
  assert.equal(e.startDate, "2026-09-14");
  assert.equal("endDate" in e, false);
});

test("an end before its start is rejected", () => {
  assert.throws(
    () => buildEvent({ ...base, startTime: "9:00 PM", endTime: "4:00 PM" }),
    /not after startDate/,
  );
});

test("an end equal to its start is rejected", () => {
  assert.throws(
    () => buildEvent({ ...base, startTime: "9:00 PM", endTime: "9:00 PM" }),
    /not after startDate/,
  );
});

test("malformed dates and times throw instead of emitting bad markup", () => {
  assert.throws(() => buildEvent({ ...base, date: "14-09-2026" }), /YYYY-MM-DD/);
  assert.throws(() => buildEvent({ ...base, startTime: "19:00" }), /cannot parse/);
  assert.throws(() => buildEvent({ ...base, startTime: "25:00 PM" }), /not a real time/);
});

test("every event carries the fields Google requires", () => {
  const e = buildEvent({ ...base, startTime: "6:00 AM", venueName: "मंडळ सभागृह" });
  for (const field of ["name", "startDate", "location", "organizer", "@id", "url"]) {
    assert.ok(e[field], `missing ${field}`);
  }
  assert.equal(e["@type"], "Event");
  assert.equal(e.location.name, "मंडळ सभागृह");
});

test("distinct events get distinct @ids", () => {
  const a = buildEvent({ ...base, id: "e1" });
  const b = buildEvent({ ...base, id: "e2" });
  assert.notEqual(a["@id"], b["@id"]);
  assert.ok(a["@id"].endsWith("/events/#e1"));
});
