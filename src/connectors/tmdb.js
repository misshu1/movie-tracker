// TheMovieDB connector
// Documentation: https://developers.themoviedb.org/3

const buildUrl = (path, query = '') =>
  `https://api.themoviedb.org/3/${path}?api_key=${process.env.REACT_APP_TMDB_API}&${query}`;

export const buildSearchMovieUrl = (terms) =>
  buildUrl('search/movie', `query=${terms}`);
export const buildImageUrl = (path, size = 'original') =>
  `https://image.tmdb.org/t/p/${size}${path}`;
export const imageFallback =
  'https://popcornsg.s3.amazonaws.com/gallery/1576022757-covers.png';
