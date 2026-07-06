import { getDb, schema } from "./index";
import {
  defaultPplUlExercises,
  defaultPplUlTrainingProgram,
  defaultPplUlTrainingProgramDays,
  defaultPplUlTrainingProgramExercises
} from "./seed-default-ppl-ul";

export async function seedDefaultPplUlProgram() {
  const db = getDb();

  await db.insert(schema.trainingPrograms).values(defaultPplUlTrainingProgram).onConflictDoNothing();
  await db.insert(schema.trainingProgramDays).values(defaultPplUlTrainingProgramDays).onConflictDoNothing();
  await db.insert(schema.exercises).values(defaultPplUlExercises).onConflictDoNothing();
  await db.insert(schema.trainingProgramExercises).values(defaultPplUlTrainingProgramExercises).onConflictDoNothing();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await seedDefaultPplUlProgram();
}
