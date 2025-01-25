import { ApiService } from './api';
import appConfig from 'config/config.json';

type GptResponse = {
  choices: {
    text: string;
  }[];
};

export class GptService {
  private readonly config = appConfig.api.gpt;
  private readonly api: ApiService;

  constructor() {
    const apiKey = `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`;
    this.api = new ApiService(this.config.base, apiKey);
  }

  async ask(content: string) {
    const response = await this.api.post<GptResponse>(this.config.model, {
      model: this.config.model,
      messages: [
        {
          role: 'user',
          content
        }
      ]
    });
    return response;
  }
}
