import React from 'react';
import clsx from 'clsx';
import { Value } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowDown } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import Difficulties from './Difficulties';
import Strategies from './Strategies';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  root: {
    padding: '15px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
    borderRadius: '2px'
  },
  title: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40',
    margin: '10px 0',
    flexGrow: 1
  },
  action: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  collapseArrow: {
    transform: 'rotate(180deg)'
  },
  itemsText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#B7B7B8'
  }
}));

type Props = {
  id: number;
  collapse: boolean;
  change: () => void;
};

export const Warning: React.FC<Props> = ({ id, collapse, change }) => {
  const classes = useStyles();

  const difficulties: Value[] = useSelector(
    (state: RootState) => state.safety.difficulties
  );

  const strategies: Value[] = useSelector(
    (state: RootState) => state.safety.strategies
  );

  return (
    <div className={classes.root}>
      <div style={{ margin: '5px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div
            className={
              classes.title
            }>{`${id}. Warning signs I may be having difficulty`}</div>
          <IconButton onClick={change}>
            <KeyboardArrowDown
              fontSize="large"
              style={{ fill: '#C57D7D' }}
              className={clsx(collapse && classes.collapseArrow)}
            />
          </IconButton>
        </div>
        {!collapse && (
          <span
            className={
              classes.itemsText
            }>{`${difficulties.length} items`}</span>
        )}
        {collapse && <Difficulties difficulties={difficulties} />}
      </div>
      <div style={{ borderTop: '2px dashed #C57D7D', margin: '10px 0' }} />
      <div style={{ margin: '5px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <img
            src="/images/safety/warning.svg"
            alt=""
            style={{ marginTop: '10px', marginRight: '5px' }}
          />
          <div className={classes.title}>
            If I start having difficulties, my plan will be to...
          </div>
        </div>
        {!collapse && (
          <span
            className={classes.itemsText}>{`${strategies.length} items`}</span>
        )}
        {collapse && <Strategies strategies={strategies} />}
      </div>
    </div>
  );
};

export default Warning;
