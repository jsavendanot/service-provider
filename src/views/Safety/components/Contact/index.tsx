import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowDown } from '@material-ui/icons';

import { Network } from 'types/network';
import { IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { People } from './People';
import { Services } from './Services';

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
    color: '#B7B7B8',
    marginRight: '5px'
  }
}));

type Props = {
  id: number;
  collapse: boolean;
  change: () => void;
};

export const Contact: React.FC<Props> = ({ id, collapse, change }) => {
  const classes = useStyles();

  const people: Network[] = useSelector(
    (state: RootState) => state.safety.people
  );

  const services: Network[] = useSelector(
    (state: RootState) => state.safety.organisations
  );

  return (
    <div className={classes.root}>
      <div style={{ margin: '5px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div
            className={
              classes.title
            }>{`${id}. People or services who I can contact`}</div>
          <IconButton onClick={change}>
            <KeyboardArrowDown
              fontSize="large"
              style={{ fill: '#C57D7D' }}
              className={clsx(collapse && classes.collapseArrow)}
            />
          </IconButton>
        </div>
        {!collapse && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              className={classes.itemsText}>{`${people.length} People,`}</span>
            <span
              className={
                classes.itemsText
              }>{`${services.length} Services`}</span>
          </div>
        )}
        {collapse && <People people={people} />}
      </div>
      {collapse && (
        <div style={{ borderTop: '2px dashed #C57D7D', margin: '10px 0' }} />
      )}
      <Services services={services} collapse={collapse} />
    </div>
  );
};

export default Contact;
