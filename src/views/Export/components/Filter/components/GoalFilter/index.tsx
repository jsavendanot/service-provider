import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';
import produce from 'immer';
import { RadioGroup, FormControlLabel, Radio, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Export, { ExportKeys } from 'views/Export';
import { ExportFilterType } from 'types/export';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    border: '1px solid #C57D7D',
    borderBottom: 'none'
  },
  topBorder: {
    borderTopRightRadius: '12px',
    borderTopLeftRadius: '12px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 15px'
  },
  name: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40'
  },
  outline: {
    border: '1px solid #FFEAEA',
    boxShadow: 'inset 0px 0px 6px rgba(0, 0, 0, 0.2)',
    background: '#FFEAEA',
    borderRadius: '3px'
  },
  radioText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#37474F'
  }
}));

type Props = {
  checks: Export;
  setChecks: (name: ExportKeys, value: boolean) => void;
  setFilters: Dispatch<SetStateAction<ExportFilterType>>;
};
export const GoalFilter: React.FC<Props> = ({
  checks,
  setChecks,
  setFilters
}) => {
  const classes = useStyles();

  const [radioSelected, setRadioSelected] = useState<
    'all' | 'current' | 'completed'
  >('all');

  const handleSwitch = () => {
    setChecks('goal', !checks.goal);

    setFilters(
      produce((draft: ExportFilterType) => {
        draft.goal = !checks.goal ? radioSelected : '';
      })
    );
  };

  const handleRadioInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setRadioSelected(event.target.value as 'all' | 'current' | 'completed');
    setFilters(
      produce((draft: ExportFilterType) => {
        draft.goal = event.target.value as 'all' | 'current' | 'completed';
      })
    );
  };

  return (
    <div className={classes.root}>
      <div className={clsx(classes.group, classes.topBorder)}>
        <div className={classes.header}>
          <span className={classes.name}>Goals</span>
          <Switch
            checked={checks.goal}
            color="primary"
            value="goal"
            onChange={handleSwitch}
          />
        </div>
        {checks.goal && (
          <div style={{ paddingLeft: '22px' }}>
            <RadioGroup
              aria-label="share"
              name="share"
              style={{ paddingLeft: '10px' }}
              value={radioSelected}
              onChange={event => handleRadioInput(event)}>
              <FormControlLabel
                value="all"
                control={<Radio color="primary" />}
                label={<span className={classes.radioText}>All goals</span>}
              />
              <FormControlLabel
                value="current"
                control={<Radio color="primary" />}
                label={
                  <span className={classes.radioText}>Only current goals</span>
                }
              />
              <FormControlLabel
                value="completed"
                control={<Radio color="primary" />}
                label={
                  <span className={classes.radioText}>
                    Only completed goals
                  </span>
                }
              />
            </RadioGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalFilter;
