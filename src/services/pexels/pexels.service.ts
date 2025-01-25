import appConfig from 'config/config.json';
import { ApiService } from 'services/api';
import { PexelsSearchParams, PexelsSearchResponse } from './pexels.type';

export class PexelsService {
  private readonly config = appConfig.api.pexels;
  private readonly api: ApiService;

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
    this.api = new ApiService(this.config.base, apiKey);
  }

  async search(name: string, options?: PexelsSearchParams) {
    const params = options
      ? Object.entries(options)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')
      : '';
    const response = await this.api.get<PexelsSearchResponse>(
      `${this.config.paths.search}?query=${name}${params}`
    );
    return response;
  }
}
