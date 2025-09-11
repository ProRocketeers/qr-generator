const url = "url";

const FORMS_MAP = {
	Url: url,
};

type Props<T extends keyof typeof FORMS_MAP> = {
	type: T;
};

export const getFormsMap = <T extends keyof typeof FORMS_MAP>({ type }: Props<T>) => {
	return FORMS_MAP[type];
};
