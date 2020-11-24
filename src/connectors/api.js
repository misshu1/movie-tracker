// Server API connector
// `/server` folder

const URL = '/api';

export const FAVORITES = {
  LISTED: 'listed',
  REMOVED: 'removed',
};
export const HISTORY = {
  WATCHED: 'watched',
  REMOVED: 'removed',
};

export const MOVIES_URL = `${URL}/movies`;
export const FAVORITES_URL = `${URL}/favorites`;
export const HISTORY_URL = `${URL}/history`;
