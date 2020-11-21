import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  HStack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, AddIcon, CheckIcon } from '@chakra-ui/icons';
import { useParams, useHistory } from 'react-router-dom';
import useMovie from '../hooks/useMovie';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { getYear, STATUS } from '../utils';
import WatchlistButton from '../components/WatchlistButton';
import { Rating } from '@material-ui/lab';
import { MovieGenre } from './style';

export default function Movie() {
  const { movieId } = useParams();
  const history = useHistory();
  const [isHistoryActive, setHistoryActive] = React.useState(false); // temp state, for UI only, should be removed when implemented properly

  const { movie, status, error, updateStatus, updateMovie } = useMovie(movieId);

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
        <Text>
          Error fetching movie with ID {movieId}: {JSON.stringify(error)}
        </Text>
      </Container>
    );
  }

  const renderMovieGenre = () => {
    return movie.genres.map(({ name }) => {
      return <MovieGenre>{name}</MovieGenre>;
    });
  };

  return (
    <Container p={3} maxW='80em'>
      <HStack mb={3} justify='space-between'>
        <IconButton
          aria-label='Back'
          icon={<ChevronLeftIcon />}
          variant='outline'
          fontSize={36}
          colorScheme='teal'
          onClick={history.goBack}
        />
        <HStack>
          <WatchlistButton
            movie={movie}
            status={updateStatus}
            update={updateMovie}
          />
          <IconButton
            aria-label={
              isHistoryActive ? 'Remove from history' : 'Mark as watched'
            }
            icon={isHistoryActive ? <CheckIcon /> : <AddIcon />}
            colorScheme='teal'
            variant={isHistoryActive ? 'solid' : 'outline'}
            onClick={() => setHistoryActive((a) => !a)}
          />
        </HStack>
      </HStack>
      <HStack spacing={3} align='flex-start'>
        <Box>
          <Image
            src={buildImageUrl(movie.poster_path, 'w300')}
            alt='Poster'
            w='35vw'
            maxW={300}
            fallbackSrc={imageFallback}
          />
        </Box>
        <Box w='100%'>
          <HStack justify='space-between'>
            <Heading
              as='h2'
              style={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              {movie.title} ({getYear(movie.release_date)})
              <Rating
                name='average'
                value={movie.vote_average / 2}
                disabled
                style={{ marginLeft: '1rem' }}
              />
              <Text
                as='span'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '.5rem',
                  fontSize: '1rem',
                  fontWeight: 400,
                }}
              >
                ({movie.vote_count})
              </Text>
              <Text
                as='span'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '.5rem',
                  flex: 1,
                  fontSize: '1rem',
                  fontWeight: 400,
                  justifyContent: 'flex-end',
                }}
              >
                {renderMovieGenre()}
              </Text>
            </Heading>
          </HStack>
          <Text>{movie.overview}</Text>
        </Box>
      </HStack>
    </Container>
  );
}
