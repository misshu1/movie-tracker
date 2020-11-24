import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useFetchEffect from '../hooks/useFetchEffect';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { FAVORITES, HISTORY, HISTORY_URL } from '../connectors/api';
import { STATUS } from '../utils';
import { BadgeContainer } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function History() {
  const { status, data: movies, error } = useFetchEffect(`${HISTORY_URL}`);

  if (status === STATUS.IDLE) {
    return null;
  }
  if (status === STATUS.PENDING) {
    return (
      <Center minH='50vh'>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (status === STATUS.REJECTED) {
    return (
      <Container p={3}>
        <Text>Error fetching favorite movies: {JSON.stringify(error)}</Text>
      </Container>
    );
  }

  return (
    <Container p={3} maxW='80em'>
      <SimpleGrid minChildWidth={150} spacing={3}>
        {movies
          .sort((a, b) => new Date(b.historyDate) - new Date(a.historyDate))
          .map((movie) => {
            const isFavorite = movie.favorite === FAVORITES.LISTED;
            const isWatched = movie.history === HISTORY.WATCHED;

            return (
              <div key={movie.id} style={{ position: 'relative' }}>
                <BadgeContainer>
                  {movie.vote_average !== 0 && (
                    <Tooltip label={`${movie.vote_average / 2} Rating`}>
                      <div className='badge'>
                        <FontAwesomeIcon icon={['fas', 'star']} size='lg' />
                      </div>
                    </Tooltip>
                  )}
                  {isFavorite && (
                    <Tooltip label='Favorite'>
                      <div className='badge'>
                        <FontAwesomeIcon icon={['fas', 'heart']} size='lg' />
                      </div>
                    </Tooltip>
                  )}
                  {isWatched && (
                    <Tooltip label='Watched'>
                      <div className='badge'>
                        <FontAwesomeIcon icon={['far', 'clock']} size='lg' />
                      </div>
                    </Tooltip>
                  )}
                </BadgeContainer>
                <Box
                  as={Link}
                  to={`/movies/${movie.id}`}
                  pos='relative'
                  noOfLines={2}
                  style={{ maxWidth: '15rem' }}
                >
                  <Tooltip label={movie.title}>
                    <Image
                      src={buildImageUrl(movie.poster_path, 'w500')}
                      alt='Poster'
                      fallbackSrc={imageFallback}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        maxHeight: '80%',
                      }}
                    />
                  </Tooltip>
                  <Text>{movie.title}</Text>
                </Box>
              </div>
            );
          })}
      </SimpleGrid>
    </Container>
  );
}
