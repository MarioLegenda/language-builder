import { string, ValidationError, object } from 'yup';
import ucFirst from '@/lib/helpers/ucFirst';

export function required(name: string, value: unknown) {
	const viewName = ucFirst(name);
	const schema = object({
		[name]: string().required(`${viewName} is required`),
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
