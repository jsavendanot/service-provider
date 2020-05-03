import React, { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';
import produce from 'immer';
import { Switch } from '@material-ui/core';
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
export const StoryFilter: React.FC<Props> = ({
  checks,
  setChecks,
  setFilters
}) => {
  const classes = useStyles();

  const handleSwitch = () => {
    setChecks('story', !checks.story);

    setFilters(
      produce((draft: ExportFilterType) => {
        draft.story = !checks.story;
      })
    );
  };

  return (
    <div className={classes.root}>
      <div className={clsx(classes.group)}>
        <div className={classes.header}>
          <span className={classes.name}>Story</span>
          <Switch
            checked={checks.story}
            color="primary"
            value="story"
            onChange={handleSwitch}
          />
        </div>
      </div>
    </div>
  );
};

export default StoryFilter;
