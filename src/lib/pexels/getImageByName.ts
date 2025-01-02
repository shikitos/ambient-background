import { PexelsImageOrientation, PexelsSearchResponse } from 'types';
const Authorization = process.env.NEXT_PUBLIC_PEXELS_API_KEY!;
const BASE_URL = 'https://api.pexels.com/v1/search';

export type GetByNameOptions = {
  page?: number;
  per_page?: number;
  orientation?: PexelsImageOrientation;
};

export const getImageByName = async (
  name: string,
  options?: GetByNameOptions
): Promise<PexelsSearchResponse> => {
  const params = options
    ? Object.entries(options)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    : '';
  const response = await fetch(`${BASE_URL}?query=${name}${params}`, {
    headers: { Authorization }
  });
  const data = await response.json();
  return data;
};
