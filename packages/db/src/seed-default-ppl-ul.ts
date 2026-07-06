import { getDefaultPplUlProgram } from "@adaptive-powerbuilding-coach/core";

export const defaultPplUlProgramSeed = getDefaultPplUlProgram();

export const defaultPplUlTrainingProgram = {
  id: defaultPplUlProgramSeed.id,
  name: defaultPplUlProgramSeed.name,
  goal: "aesthetic_cut",
  isPublicTemplate: true,
  progressionNotes: defaultPplUlProgramSeed.progressionRules
};

export const defaultPplUlTrainingProgramDays = defaultPplUlProgramSeed.days.map((day) => ({
  id: `${defaultPplUlProgramSeed.id}-day-${day.day}`,
  programId: defaultPplUlProgramSeed.id,
  dayNumber: day.day,
  dayType: day.type,
  isRestDay: day.type === "rest",
  notes: day.notes ?? []
}));

export const defaultPplUlTrainingProgramExercises = defaultPplUlProgramSeed.days.flatMap((day) =>
  day.exercises.map((exercise, index) => ({
    id: `${defaultPplUlProgramSeed.id}-day-${day.day}-${exercise.id}`,
    programDayId: `${defaultPplUlProgramSeed.id}-day-${day.day}`,
    exerciseOrder: index + 1,
    muscleGroup: exercise.muscleGroup,
    exerciseName: exercise.exerciseName,
    exerciseCategory: exercise.category,
    sets: exercise.sets,
    minReps: exercise.minReps,
    maxReps: exercise.maxReps,
    targetRpeMin: exercise.targetRpeMin.toString(),
    targetRpeMax: exercise.targetRpeMax.toString(),
    restSecondsMin: exercise.restSecondsMin,
    restSecondsMax: exercise.restSecondsMax,
    techniqueNotes: exercise.techniqueNotes,
    progressionNotes: defaultPplUlProgramSeed.progressionRules
  }))
);

export const defaultPplUlExercises = defaultPplUlProgramSeed.days.flatMap((day) =>
  day.exercises.map((exercise) => ({
    id: exercise.id,
    muscleGroup: exercise.muscleGroup,
    exerciseName: exercise.exerciseName,
    exerciseCategory: exercise.category,
    isPublic: true
  }))
);
