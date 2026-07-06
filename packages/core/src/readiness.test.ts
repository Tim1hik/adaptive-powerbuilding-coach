import { describe, expect, it } from "vitest";
import { calculateReadinessScore } from "./index";

describe("calculateReadinessScore", () => {
  it("scores high readiness inputs", () => {
    expect(calculateReadinessScore({ sleepQuality: 5, soreness: 1, stress: 1, motivation: 5 })).toBe(100);
  });
});
