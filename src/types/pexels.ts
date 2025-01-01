type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
};

export type PexelsImageOrientation = 'landscape' | 'portrait' | 'square';

export type PexelsSearchResponse = {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  photos: PexelsPhoto[];
};
