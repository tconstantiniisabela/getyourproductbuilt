import { site } from "@/lib/site";

export const legal = {
  privacyUpdated: site.privacyUpdated,
  termsUpdated: site.termsUpdated,
  dataController: site.companyName,
  contactEmail: site.email,
} as const;
