import { Request, Response } from 'express';
import { json } from 'stream/consumers';
import { errorHandler } from '../src/middleware/errorHandler';
import { CommonError } from '../src/models/errors';

describe('errorHandler', () => {
  const req = <Request>{};
  const res = {} as unknown as Response;
  res.json = jest.fn();
  res.status = jest.fn(() => res);
  let err: CommonError = {
    statusCode: 404,
    name: 'Some name',
    message: 'Error test'
  };

  it('should call status() and json() with correct params', () => {
    const expectedResult = { success: false, status: err.statusCode, statusText: err.message };

    errorHandler(err, req, res);

    expect(res.status).toBeCalledWith(err.statusCode);
    expect(res.json).toBeCalledWith(expectedResult);
  });

  it('should call json() with default params if err input has no data', () => {
    err = <CommonError>{};
    const expectedResult = { success: false, status: 500, statusText: 'Something went wrong.' };

    errorHandler(err, req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith(expectedResult);
  });
});