export const fetchUserProfile = async (accessToken: string) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return {
      username: data.display_name,
      avatar: data.images[0]?.url
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};
