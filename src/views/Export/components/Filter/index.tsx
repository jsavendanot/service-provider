import React, { Dispatch, SetStateAction } from 'react';
import {
  GoalFilter,
  JourneyFilter,
  StoryFilter,
  SafetyFilter,
  NetworkFilter
} from './components';
import { Export, ExportKeys } from 'views/Export';
import { Grid } from '@material-ui/core';
import { ExportFilterType } from 'types/export';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    boxSizing: 'border-box',
    borderBottom: '1px solid #C57D7D',
    borderBottomRightRadius: '12px',
    borderBottomLeftRadius: '12px'
  }
}));

type Props = {
  checks: Export;
  setChecks: (name: ExportKeys, value: boolean) => void;
  setFilters: Dispatch<SetStateAction<ExportFilterType>>;
};

export const Filter: React.FC<Props> = ({ checks, setChecks, setFilters }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={classes.filterContainer}>
          <GoalFilter
            checks={checks}
            setChecks={setChecks}
            setFilters={setFilters}
          />
          <JourneyFilter
            checks={checks}
            setChecks={setChecks}
            setFilters={setFilters}
          />
          <StoryFilter
            checks={checks}
            setChecks={setChecks}
            setFilters={setFilters}
          />
          <SafetyFilter
            checks={checks}
            setChecks={setChecks}
            setFilters={setFilters}
          />
          <NetworkFilter
            checks={checks}
            setChecks={setChecks}
            setFilters={setFilters}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Filter;
