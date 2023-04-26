export interface CommonError extends Error {
  statusCode: number;
};

export interface ErrorHandler extends Error {
  status?: number;
  statusText?: string;
  success?: boolean;
}