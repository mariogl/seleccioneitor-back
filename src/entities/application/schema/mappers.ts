import {
  Application,
  ApplicationSchema,
  ApplicationApiResponse,
} from "./application.schema.js";

export function mapApplicationSchemaToApplication(
  dbRecord: ApplicationSchema
): Application {
  const {
    id,
    positionTitle,
    company,
    status,
    appliedAt,
    updatedAt,
    coverLetter,
    resumeUrl,
    expectedSalary,
    availableStartDate,
    internalNotes,
  } = dbRecord;

  const application: Application = {
    id,
    positionTitle,
    company,
    status,
    appliedAt,
    updatedAt,
  };

  if (coverLetter !== null) {
    application.coverLetter = coverLetter;
  }
  if (resumeUrl !== null) {
    application.resumeUrl = resumeUrl;
  }
  if (expectedSalary !== null) {
    application.expectedSalary = expectedSalary;
  }
  if (availableStartDate !== null) {
    application.availableStartDate = availableStartDate;
  }
  if (internalNotes !== null) {
    application.internalNotes = internalNotes;
  }

  return application;
}

export function mapApplicationToApplicationSchema(
  application: Application
): ApplicationSchema {
  const applicationSchema: ApplicationSchema = {
    id: application.id,
    positionTitle: application.positionTitle,
    company: application.company,
    status: application.status,
    appliedAt: application.appliedAt,
    updatedAt: application.updatedAt,
    coverLetter: application.coverLetter ?? null,
    resumeUrl: application.resumeUrl ?? null,
    expectedSalary: application.expectedSalary ?? null,
    availableStartDate: application.availableStartDate ?? null,
    internalNotes: application.internalNotes ?? null,
  };

  return applicationSchema;
}

export function mapApplicationToApiResponse(
  application: Application
): ApplicationApiResponse {
  return {
    id: application.id,
    positionTitle: application.positionTitle,
    company: application.company,
    status: application.status,
    appliedAt: application.appliedAt.toISOString(),
    updatedAt: application.updatedAt.toISOString(),
    ...(application.coverLetter !== undefined && {
      coverLetter: application.coverLetter,
    }),
    ...(application.resumeUrl !== undefined && {
      resumeUrl: application.resumeUrl,
    }),
    ...(application.expectedSalary !== undefined && {
      expectedSalary: application.expectedSalary,
    }),
    ...(application.availableStartDate !== undefined && {
      availableStartDate: application.availableStartDate.toISOString(),
    }),
    ...(application.internalNotes !== undefined && {
      internalNotes: application.internalNotes,
    }),
  };
}
