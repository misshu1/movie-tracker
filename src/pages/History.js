import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  SimpleGrid,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useFetchEffect from '../hooks/useFetchEffect';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { FAVORITES, HISTORY, HISTORY_URL } from '../connectors/api';
import { STATUS } from '../utils';
import { BadgeContainer } from './style';
import { StarIcon, TimeIcon } from '@chakra-ui/icons';

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
        {movies.map((movie) => {
          const isFavorite = movie.favorite === FAVORITES.LISTED;
          const isWatched = movie.history === HISTORY.WATCHED;

          return (
            <div key={movie.id} style={{ position: 'relative' }}>
              <BadgeContainer>
                {isFavorite && (
                  <Tooltip label='Favorite'>
                    <div className='badge'>
                      <StarIcon w={5} h={5} color='white' />
                    </div>
                  </Tooltip>
                )}
                {isWatched && (
                  <Tooltip label='Watched'>
                    <div className='badge'>
                      <TimeIcon w={5} h={5} color='white' />
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
                <Badge
                  variant='solid'
                  colorScheme='teal'
                  pos='absolute'
                  top={1}
                  right={1}
                  textTransform='lowercase'
                >
                  {movie.vote_average !== 0
                    ? `${movie.vote_average / 2} of 5`
                    : 0}
                </Badge>
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
