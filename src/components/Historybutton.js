import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { STATUS } from '../utils';
import { HISTORY } from '../connectors/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function HistoryButton({ movie, status, update }) {
  const [startDate, setStartDate] = useState(new Date());
  const isWatched = movie.history === HISTORY.WATCHED;
  const label = isWatched ? 'Remove from history' : 'Add to history';

  useEffect(() => {
    // Keep the old date for reference when updating the date
    isWatched && setStartDate(new Date(movie.historyDate));
  }, [isWatched, movie.historyDate]);

  function addToHistory(date) {
    update({
      ...movie,
      history: HISTORY.WATCHED,
      historyDate: new Date(date),
    });
  }

  const removeFromHistory = () => {
    update({
      ...movie,
      history: HISTORY.REMOVED,
      historyDate: null,
    });
  };

  return (
    movie.status === 'Released' && (
      <Tooltip label={label}>
        {/* Tooltip is not working without this div wrapper*/}
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => addToHistory(date)}
            // This button is already hidden if movie is not released
            minDate={new Date(movie.release_date)}
            maxDate={new Date()}
            onFocus={isWatched && removeFromHistory}
            readOnly={isWatched}
            withPortal
            showMonthDropdown
            showYearDropdown
            customInput={
              <IconButton
                aria-label={label}
                icon={
                  <FontAwesomeIcon
                    icon={[isWatched ? 'fas' : 'far', 'clock']}
                    size='lg'
                  />
                }
                colorScheme='teal'
                variant={isWatched ? 'solid' : 'outline'}
                isLoading={status === STATUS.PENDING}
              />
            }
          />
        </div>
      </Tooltip>
    )
  );
}
