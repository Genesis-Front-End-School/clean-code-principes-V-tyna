import { errorLinkHandler } from './error-link.handler';
import fetchMock from 'fetch-mock-jest';

describe('errorLinkHandler', () => {
  const validLink = 'https://www.youtube.com/';
  const invalidLink = 'https://invalidLink';

  afterEach(() => {
    fetchMock.restore();
  });

  it('should return TRUE, if link is VALID', async () => {
    fetchMock.mock(validLink, 200);

    const result = await errorLinkHandler(validLink);

    expect(result).toBe(true);
  });

  it('should return FALSE, if link is INVALID', async () => {
    fetchMock.mock(invalidLink, 500);

    const result = await errorLinkHandler(invalidLink);

    expect(result).toBe(false);
  });
});
