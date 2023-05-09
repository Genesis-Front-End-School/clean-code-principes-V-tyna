import { Request, Response } from 'express';
import { CommonError } from '../models/errors';

export const errorHandler = (err: CommonError, req: Request, res: Response) => {
	const errStatus = err.statusCode || 500;
	const errMsg = err.message || 'Something went wrong.';
	res
		.status(errStatus)
		.json({ success: false, status: errStatus, statusText: errMsg });
};
