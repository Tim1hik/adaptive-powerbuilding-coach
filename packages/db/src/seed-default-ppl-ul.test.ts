import { describe, expect, it } from "vitest";
import {
  defaultPplUlTrainingProgram,
  defaultPplUlTrainingProgramDays,
  defaultPplUlTrainingProgramExercises
} from "./seed-default-ppl-ul";

describe("default PPL x UL database seed", () => {
  it("contains the public template and all 7 days", () => {
    expect(defaultPplUlTrainingProgram.isPublicTemplate).toBe(true);
    expect(defaultPplUlTrainingProgramDays).toHaveLength(7);
  });

  it("contains all program exercises", () => {
    expect(defaultPplUlTrainingProgramExercises).toHaveLength(31);
  });
});
