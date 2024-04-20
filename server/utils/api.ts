import { ofetch, type FetchOptions, FetchError } from 'ofetch';
import { ServerError } from '../errors';

const RUNTIME_CONFIG = useRuntimeConfig();

const apiFetch = ofetch.create({
  baseURL: RUNTIME_CONFIG.restApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// We need this because HeadersInit is somehow broken and doesn't include Authorization
type RequestHeaders = HeadersInit & { Authorization?: string };

type RequestOptions<B extends FetchOptions<'json'>['body'] = undefined> = Omit<FetchOptions<'json'>, 'body'> & {
  method?: 'PUT' | 'POST' | 'GET' | 'DELETE';
  headers?: RequestHeaders;
} & (B extends undefined ? {} : { body: B });

export const useApi = async <T = undefined, B extends FetchOptions<'json'>['body'] = undefined>(
  path: string,
  token?: string,
  options?: RequestOptions<B>,
) => {
  try {
    const headers: RequestHeaders = {
      ...options?.headers,
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    console.log('REQUEST::', path, {
      ...options,
      headers,
    });
    return await apiFetch<T>(path, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error('ERROR::', error);
    if (error instanceof FetchError) {
      if (error.statusCode) {
        console.log('ERROR::', error.statusCode, error.cause);
        throw ServerError.fromCode(error.statusCode, error.message);
      } else {
        throw ServerError.unavailable();
      }
    } else {
      // This is a generic error, we don't know what happened.

      // eslint-disable-next-line no-console
      console.error(error);
      throw ServerError.internalServerError('Something went wrong');
    }
  }
};
