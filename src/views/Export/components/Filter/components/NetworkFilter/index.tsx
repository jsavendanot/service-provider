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
  bottomBorder: {
    borderBottomRightRadius: '12px',
    borderBottomLeftRadius: '12px'
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
export const NetworkFilter: React.FC<Props> = ({
  checks,
  setChecks,
  setFilters
}) => {
  const classes = useStyles();

  const [radioSelected, setRadioSelected] = useState<
    'all' | 'people' | 'services'
  >('all');

  const handleSwitch = () => {
    setChecks('network', !checks.network);

    setFilters(
      produce((draft: ExportFilterType) => {
        draft.network = !checks.network ? radioSelected : '';
      })
    );
  };

  const handleRadioInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setRadioSelected(event.target.value as 'all' | 'people' | 'services');
    setFilters(
      produce((draft: ExportFilterType) => {
        draft.network = event.target.value as 'all' | 'people' | 'services';
      })
    );
  };

  return (
    <div className={classes.root}>
      <div className={clsx(classes.group, classes.bottomBorder)}>
        <div className={classes.header}>
          <span className={classes.name}>Network</span>
          <Switch
            checked={checks.network}
            color="primary"
            value="network"
            onChange={handleSwitch}
          />
        </div>
        {checks.network && (
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
                label={<span className={classes.radioText}>All network</span>}
              />
              <FormControlLabel
                value="people"
                control={<Radio color="primary" />}
                label={<span className={classes.radioText}>People</span>}
              />
              <FormControlLabel
                value="services"
                control={<Radio color="primary" />}
                label={<span className={classes.radioText}>Services</span>}
              />
            </RadioGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkFilter;
