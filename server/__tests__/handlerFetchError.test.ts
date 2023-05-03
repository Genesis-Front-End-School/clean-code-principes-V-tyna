import throwAnErrorHandler from '../src/utils/handlerFetchError';

describe('throwAnErrorHandler', () => {
  it('should throw an error with correct params', () => {
    const expectingError = {
      status: 500,
      statusText: 'Some status text',
      success: false,
      message: 'Test error message',
      name: 'Error'
    };

    const result = () => throwAnErrorHandler(<Response>{ status: 500, statusText: 'Some status text' }, 'Test error message');

    expect(() => result()).toThrowError(expectingError);
  });
});