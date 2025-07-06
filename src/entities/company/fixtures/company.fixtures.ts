import { NewCompany } from "../types.js";

export const createCompanyFixture = (
  overrides: Partial<NewCompany> = {}
): NewCompany => {
  const baseCompany: NewCompany = {
    name: "TechCorp España",
    description: "Empresa líder en desarrollo de software",
    website: "https://techcorp.es",
    location: "Madrid, España",
    email: "rrhh@techcorp.es",
    phone: "+34 910 123 456",
    notes: "Empresa con buen ambiente de trabajo",
  };

  return {
    ...baseCompany,
    ...overrides,
  };
};

export const companyFixtures = {
  techCorp: () => createCompanyFixture({ id: 1, name: "TechCorp España" }),
  startupMadrid: () => createCompanyFixture({ id: 2, name: "Startup Madrid" }),
  iberdrolaDigital: () =>
    createCompanyFixture({ id: 3, name: "Iberdrola Digital" }),
  mercadonaTech: () => createCompanyFixture({ id: 4, name: "Mercadona Tech" }),
  bbvaNext: () => createCompanyFixture({ id: 5, name: "BBVA Next" }),
  zaraTech: () => createCompanyFixture({ id: 6, name: "Zara Tech" }),
  glovo: () => createCompanyFixture({ id: 7, name: "Glovo" }),
  cabify: () => createCompanyFixture({ id: 8, name: "Cabify" }),
};

export const seedCompaniesData = [
  companyFixtures.techCorp(),
  companyFixtures.startupMadrid(),
  companyFixtures.iberdrolaDigital(),
  companyFixtures.mercadonaTech(),
  companyFixtures.bbvaNext(),
  companyFixtures.zaraTech(),
  companyFixtures.glovo(),
  companyFixtures.cabify(),
];
