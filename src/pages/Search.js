import React from 'react';
import { useParams, useHistory, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Input,
  IconButton,
  UnorderedList,
  ListItem,
  Container,
  Link,
  Progress,
  Text,
  Image,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useFetchEffect from '../hooks/useFetchEffect';
import {
  buildImageUrl,
  buildSearchMovieUrl,
  imageFallback,
} from '../connectors/tmdb';
import { getYear, STATUS } from '../utils';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  ratingColorEmpty: {
    color: '#ccc',
  },
  ratingColor: {
    color: 'teal',
  },
});

export default function Search() {
  const { terms } = useParams();
  const history = useHistory();
  const searchRef = React.useRef(null);
  const classes = useStyles();

  const handleSearch = (event) => {
    event.preventDefault();
    const value = searchRef.current.value;
    if (value !== terms) {
      history.push(`/search/${value}`);
    }
  };

  const { status, data, error } = useFetchEffect(
    buildSearchMovieUrl(terms),
    !!terms
  );

  return (
    <Container p={3}>
      <Box as='form' onSubmit={handleSearch} w='100%' d='flex' mb={3}>
        <Input
          placeholder='Search for a movie...'
          defaultValue={terms}
          ref={searchRef}
          mr={3}
        />
        <IconButton
          aria-label='Search for a movie'
          icon={<SearchIcon />}
          type='submit'
          isLoading={status === STATUS.PENDING}
        />
      </Box>
      {status === STATUS.IDLE && (
        <Text>Type some terms and submit for a quick search</Text>
      )}
      {status === STATUS.PENDING && <Progress size='xs' isIndeterminate />}
      {status === STATUS.REJECTED && (
        <Text>
          Error fetching movies for {terms}: {JSON.stringify(error)}
        </Text>
      )}
      {status === STATUS.RESOLVED && (
        <UnorderedList style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {data.results.map(
            ({ id, title, release_date, vote_average, poster_path }) => {
              return (
                <ListItem key={id} style={{ height: '50px', margin: '0 4px' }}>
                  <Link
                    as={RouterLink}
                    to={`/movies/${id}`}
                    style={{ display: 'flex' }}
                  >
                    <Image
                      src={buildImageUrl(poster_path, 'w300')}
                      alt='Poster'
                      w='20px'
                      maxW='20px'
                      fallbackSrc={imageFallback}
                    />
                    <Text
                      as='span'
                      style={{
                        display: 'block',
                        marginLeft: '.5rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {title} ({getYear(release_date)})
                    </Text>
                    <Text
                      as='span'
                      color='GrayText'
                      style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Rating
                        name='average'
                        value={vote_average / 2}
                        disabled
                        classes={{
                          iconEmpty: classes.ratingColorEmpty,
                          iconFilled: classes.ratingColor,
                        }}
                      />
                    </Text>
                  </Link>
                </ListItem>
              );
            }
          )}
        </UnorderedList>
      )}
      {/* @todo: Display a message when no results */}
    </Container>
  );
}
