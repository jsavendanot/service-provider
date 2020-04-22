import React from 'react';
import clsx from 'clsx';
import { Unwell as UnwellType } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowUp } from '@material-ui/icons';

import PleaseDo from './PleaseDo';
import DontDo from './DontDo';
import { IconButton } from '@material-ui/core';
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
  descText: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#323F45',
    margin: '10px 0'
  },
  values: {
    display: 'flex',
    flexDirection: 'column'
  },
  value: {
    padding: '10px',
    backgroundColor: '#FFFAE9',
    borderRadius: '4px',
    margin: '10px 0'
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
    color: '#B7B7B8',
    marginRight: '5px'
  }
}));

type Props = {
  id: number;
  collapse: boolean;
  change: () => void;
};

export const Unwell: React.FC<Props> = ({ id, collapse, change }) => {
  const classes = useStyles();

  const pleaseDo: UnwellType[] = useSelector(
    (state: RootState) => state.safety.pleaseDo
  );

  const dontDo: UnwellType[] = useSelector(
    (state: RootState) => state.safety.doNotDo
  );

  return (
    <div className={classes.root}>
      <div style={{ margin: '5px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div
            className={
              classes.title
            }>{`${id}. If I become unwell, I would like others to...`}</div>
          <IconButton onClick={change}>
            <KeyboardArrowUp
              fontSize="large"
              style={{ fill: '#C57D7D' }}
              className={clsx(collapse && classes.collapseArrow)}
            />
          </IconButton>
        </div>
        {!collapse && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              className={
                classes.itemsText
              }>{`${pleaseDo.length} Please Dos,`}</span>
            <span
              className={
                classes.itemsText
              }>{`${dontDo.length} Don't Dos`}</span>
          </div>
        )}
        {collapse && <PleaseDo pleaseDo={pleaseDo} />}
      </div>
      {collapse && (
        <div style={{ borderTop: '2px dashed #C57D7D', margin: '10px 0' }} />
      )}
      <DontDo dontDo={dontDo} collapse={collapse} />
    </div>
  );
};

export default Unwell;
