const form_types = ["url", "email"] as const;

export type FORM_TYPE = (typeof form_types)[number];
