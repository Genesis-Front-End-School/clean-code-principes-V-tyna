import { ErrorHandler } from '../models/errors';

const throwAnErrorHandler = (resp: Response, msg: string) => {
	const e: ErrorHandler = new Error(msg);

	e.status = resp.status;
	e.statusText = resp.statusText;
	e.success = false;

	throw e;
};

export default throwAnErrorHandler;
