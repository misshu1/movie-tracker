import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { STATUS } from '../utils';
import { FAVORITES } from '../connectors/api';

export default function FavoriteButton({ movie, status, update }) {
  const toglleAddToFavorites = () => {
    update({
      ...movie,
      favorite:
        movie.favorite === FAVORITES.LISTED
          ? FAVORITES.REMOVED
          : FAVORITES.LISTED,
    });
  };

  const isFavorite = movie.favorite === FAVORITES.LISTED; // we don't care if watchlist is REMOVED or undefined, both means it's not listed
  const label = isFavorite ? 'Remove from favorites' : 'Add to favorites';
  return (
    <Tooltip label={label}>
      <IconButton
        aria-label={label}
        icon={<StarIcon />}
        colorScheme='teal'
        variant={isFavorite ? 'solid' : 'outline'}
        isLoading={status === STATUS.PENDING}
        onClick={toglleAddToFavorites}
      />
    </Tooltip>
  );
}
