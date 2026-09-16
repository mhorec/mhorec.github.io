// src/data/services.ts
export const serviceKeys = ['software', 'server', 'network', 'security', 'consult', 'apps'] as const;
export type ServiceKey = (typeof serviceKeys)[number];
