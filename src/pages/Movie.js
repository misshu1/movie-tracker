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
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useParams, useHistory } from 'react-router-dom';
import useMovie from '../hooks/useMovie';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { getYear, STATUS } from '../utils';
import WatchlistButton from '../components/WatchlistButton';
import { Rating } from '@material-ui/lab';
import { MovieGenre } from './style';
import { makeStyles } from '@material-ui/core';
import HistoryButton from '../components/Historybutton';

const useStyles = makeStyles({
  ratingColorEmpty: {
    color: '#ccc',
  },
  ratingColor: {
    color: 'teal',
  },
});

export default function Movie() {
  const { movieId } = useParams();
  const history = useHistory();
  const classes = useStyles();

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
    return movie?.genres.map(({ name }) => (
      <MovieGenre key={name}>{name}</MovieGenre>
    ));
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
          <HistoryButton
            movie={movie}
            status={updateStatus}
            update={updateMovie}
          />
        </HStack>
      </HStack>
      <HStack
        spacing={3}
        align='flex-start'
        flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
        style={{ gap: '1rem' }}
      >
        <Box>
          <Image
            src={buildImageUrl(movie.poster_path, 'w300')}
            alt='Poster'
            w='35vw'
            maxW={300}
            fallbackSrc={imageFallback}
          />
        </Box>
        <Box w='100%' marginLeft='0 !important'>
          <HStack
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Heading
              as='h2'
              style={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              {movie.title} ({getYear(movie.release_date)})
            </Heading>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                margin: '1rem 0 0.5rem 0',
                fontWeight: 400,
              }}
            >
              {renderMovieGenre()}
            </div>
            <Text
              as='span'
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '1rem',
                fontWeight: 400,
                margin: 0,
              }}
            >
              <Rating
                name='average'
                value={movie.vote_average / 2}
                disabled
                classes={{
                  iconEmpty: classes.ratingColorEmpty,
                  iconFilled: classes.ratingColor,
                }}
              />
              ({movie.vote_count})
            </Text>
          </HStack>
          <Text marginTop='1rem'>{movie.overview}</Text>
        </Box>
      </HStack>
    </Container>
  );
}
