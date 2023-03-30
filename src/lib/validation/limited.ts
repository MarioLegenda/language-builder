import { string, ValidationError, object } from 'yup';
import ucFirst from '@/lib/helpers/ucFirst';

export function limited(name: string, value: unknown, min: number, max: number) {
	const viewName = ucFirst(name);
	const schema = object({
		[name]: string()
			.min(1, `${viewName} must have between ${min} and ${max} characters`)
			.max(200, `${viewName} must have between ${min} and ${max} characters`),
	});

	try {
		schema.validateSync({ [name]: value });
	} catch (e) {
		if (e instanceof ValidationError) {
			return e.errors[0];
		}

		return `${viewName} is invalid.`;
	}
}
