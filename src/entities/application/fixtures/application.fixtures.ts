import { NewApplication } from "../types.js";

type NewApplicationJson = Omit<NewApplication, "availableStartDate"> & {
  availableStartDate?: string;
};

export const createApplicationFixture = (
  overrides: Partial<NewApplication> = {}
): NewApplication => {
  const baseApplication: NewApplication = {
    positionTitle: "Desarrollador Frontend",
    companyId: 1, // Asumimos que existe una company con ID 1
    status: "pending",
    coverLetter:
      "Estimados señores, me dirijo a ustedes para expresar mi interés en la posición de Desarrollador Frontend...",
    resumeUrl: "https://drive.google.com/file/d/mi-cv/view",
    expectedSalary: 4500000,
    availableStartDate: new Date("2025-08-01"),
    internalNotes: "Recordar mencionar experiencia con React en la entrevista",
  };

  return {
    ...baseApplication,
    ...overrides,
  };
};

export const createApplicationJsonFixture = (
  overrides: Partial<NewApplicationJson> = {}
): NewApplicationJson => {
  const baseApplication: NewApplicationJson = {
    positionTitle: "Desarrollador Frontend",
    companyId: 1, // Asumimos que existe una company con ID 1
    status: "pending",
    coverLetter:
      "Estimados señores, me dirijo a ustedes para expresar mi interés en la posición de Desarrollador Frontend...",
    resumeUrl: "https://drive.google.com/file/d/mi-cv/view",
    expectedSalary: 4500000,
    availableStartDate: "2025-08-01T00:00:00.000Z",
    internalNotes: "Recordar mencionar experiencia con React en la entrevista",
  };

  return {
    ...baseApplication,
    ...overrides,
  };
};

export const applicationFixtures = {
  pending: () =>
    createApplicationFixture({
      positionTitle: "Desarrollador Backend",
      companyId: 2, // Startup Madrid
      status: "pending",
      expectedSalary: 4200000,
      internalNotes: "Aplicado hace 2 días, esperando respuesta",
    }),

  reviewing: () =>
    createApplicationFixture({
      positionTitle: "Full Stack Developer",
      companyId: 3, // Iberdrola Digital
      status: "reviewing",
      expectedSalary: 5500000,
      internalNotes: "RRHH confirmó recepción, están revisando mi perfil",
    }),

  interviewScheduled: () =>
    createApplicationFixture({
      positionTitle: "Senior React Developer",
      companyId: 4, // Mercadona Tech
      status: "interview_scheduled",
      expectedSalary: 6000000,
      availableStartDate: new Date("2025-09-15"),
      internalNotes: "Entrevista técnica programada para el martes 10:00h",
    }),

  interviewed: () =>
    createApplicationFixture({
      positionTitle: "Ingeniero DevOps",
      companyId: 5, // BBVA Next
      status: "interviewed",
      expectedSalary: 5800000,
      internalNotes: "Entrevista técnica completada, esperando feedback",
    }),

  accepted: () =>
    createApplicationFixture({
      positionTitle: "Desarrollador UI/UX",
      companyId: 6, // Zara Tech
      status: "accepted",
      expectedSalary: 4800000,
      availableStartDate: new Date("2025-07-15"),
      internalNotes: "¡Oferta aceptada! Firmar contrato la próxima semana",
    }),

  rejected: () =>
    createApplicationFixture({
      positionTitle: "Desarrollador Mobile",
      companyId: 7, // Glovo
      status: "rejected",
      expectedSalary: 5200000,
      internalNotes: "No seguimos adelante, buscan más experiencia en Flutter",
    }),

  withdrawn: () =>
    createApplicationFixture({
      positionTitle: "Data Engineer",
      companyId: 8, // Cabify
      status: "withdrawn",
      expectedSalary: 6500000,
      internalNotes: "Retiré candidatura - acepté otra oferta mejor",
    }),
};

export const seedApplicationsData = [
  applicationFixtures.pending(),
  applicationFixtures.reviewing(),
  applicationFixtures.interviewScheduled(),
  applicationFixtures.interviewed(),
  applicationFixtures.accepted(),
  applicationFixtures.rejected(),
  applicationFixtures.withdrawn(),
];
