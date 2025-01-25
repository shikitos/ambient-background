type FetchOptions = {
  retries?: number;
  timeout?: number;
};

type FetchError = Error & {
  status?: number;
  url?: string;
  response?: Response;
};

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: FetchError };

export class ApiService {
  private readonly baseUrl: string;
  private readonly authorization: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.authorization = apiKey ?? '';
  }

  private buildQueryParams(params?: Record<string, string | number>): string {
    return params
      ? `?${new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => ({ ...acc, [key]: String(value) }),
            {}
          )
        ).toString()}`
      : '';
  }

  private createFetchError(response: Response): FetchError {
    const error: FetchError = new Error(
      `HTTP Error: ${response.status} ${response.statusText}`
    );
    error.status = response.status;
    error.url = response.url;
    error.response = response;
    return error;
  }

  private async fetchWithRetries<T>(
    url: string,
    options: RequestInit,
    { retries = 3, timeout = 5000 }: FetchOptions = {}
  ): Promise<Result<T>> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        clearTimeout(timer);

        if (!response.ok) {
          throw this.createFetchError(response);
        }

        const data = (await response.json()) as T;
        return { success: true, data };
      } catch (error) {
        if (attempt === retries || (error as Error).name === 'AbortError') {
          const fetchError: FetchError =
            error instanceof Error
              ? error
              : (new Error('Unexpected fetch error') as FetchError);
          console.error(`Fetch attempt ${attempt + 1} failed:`, fetchError);
          return { success: false, error: fetchError };
        }
      }
    }

    return {
      success: false,
      error: new Error('Unexpected failure') as FetchError
    };
  }

  async post<T>(
    path: string,
    body: URLSearchParams | object,
    headers?: HeadersInit,
    params?: Record<string, string | number>,
    options?: FetchOptions
  ): Promise<Result<T>> {
    const query = this.buildQueryParams(params);
    const formattedBody =
      body instanceof URLSearchParams ? body.toString() : JSON.stringify(body);

    return await this.fetchWithRetries<T>(
      `${this.baseUrl}${path}${query}`,
      {
        method: 'POST',
        headers: {
          'Content-Type':
            body instanceof URLSearchParams
              ? 'application/x-www-form-urlencoded'
              : 'application/json',
          Authorization: this.authorization,
          ...headers
        },
        body: formattedBody
      },
      options
    );
  }

  async get<T>(
    path: string,
    params?: Record<string, string | number>,
    headers?: HeadersInit,
    options?: FetchOptions
  ): Promise<Result<T>> {
    const query = this.buildQueryParams(params);

    return await this.fetchWithRetries<T>(
      `${this.baseUrl}${path}${query}`,
      {
        method: 'GET',
        headers: {
          Authorization: this.authorization,
          ...headers
        }
      },
      options
    );
  }
}
