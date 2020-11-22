import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import { STATUS } from '../utils';
import { HISTORY } from '../connectors/api';

export default function HistoryButton({ movie, status, update }) {
  const toggleHistory = () => {
    update({
      ...movie,
      history:
        movie.history === HISTORY.WATCHED ? HISTORY.REMOVED : HISTORY.WATCHED,
    });
  };

  if (movie.status !== 'Released') {
    return null;
  }

  const isWatched = movie.history === HISTORY.WATCHED;
  const label = isWatched ? 'Remove from history' : 'Add to history';

  return (
    movie.status === 'Released' && (
      <Tooltip label={label}>
        <IconButton
          aria-label={label}
          icon={isWatched ? <CheckIcon /> : <AddIcon />}
          colorScheme='teal'
          variant={isWatched ? 'solid' : 'outline'}
          isLoading={status === STATUS.PENDING}
          onClick={toggleHistory}
        />
      </Tooltip>
    )
  );
}
