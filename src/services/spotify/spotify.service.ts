import appConfig from 'config/config.json';
import { ApiService } from 'services/api';
import { SpotifyAuthResponse, SpotifyUserProfile } from './spotify.types';

export class SpotifyService {
  private readonly config = appConfig.api.spotify;
  private readonly api: ApiService;

  constructor(authorization?: string) {
    const apiKey = authorization ? `Bearer ${authorization}` : '';
    this.api = new ApiService(this.config.base, apiKey);
  }

  async getProfile() {
    const response = await this.api.get<SpotifyUserProfile>(
      this.config.paths.profile
    );
    return response;
  }

  async authorize(code: string) {
    const apiWithAccountBase = new ApiService(this.config.account.base);

    const response = await apiWithAccountBase.post<SpotifyAuthResponse>(
      this.config.account.paths.token,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!,
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
        client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!
      }),
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    );

    return response;
  }
}
