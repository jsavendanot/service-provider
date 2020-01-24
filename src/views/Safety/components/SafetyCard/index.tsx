import React from 'react';
import clsx from 'clsx';
import { SafetyCardType } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowUp, Add } from '@material-ui/icons';

import { Button } from 'components';

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
    color: '#B7B7B8'
  }
}));

export const SafetyCard: React.FC<SafetyCardType> = ({
  id,
  title,
  description,
  values,
  collapse,
  change
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div className={classes.title}>{`${id}. ${title}`}</div>
        <KeyboardArrowUp
          fontSize="large"
          style={{ fill: '#C57D7D', cursor: 'pointer' }}
          className={clsx(collapse && classes.collapseArrow)}
          onClick={change}
        />
      </div>
      {!collapse && (
        <span className={classes.itemsText}>{`${values.length} items`}</span>
      )}
      {collapse && (
        <div>
          <span className={classes.descText}>{description}</span>
          <div className={classes.values}>
            {values.map(value => {
              return (
                <div key={value.id} className={classes.value}>
                  {value.value}
                </div>
              );
            })}
          </div>
          <div className={classes.action}>
            <div style={{ width: '91px', marginRight: '20px' }}>
              <Button type="primarySmall">
                <Add style={{ marginRight: '5px' }} />
                Add
              </Button>
            </div>
            <div style={{ width: '155px' }}>
              <Button type="tertiarySmall">
                <img
                  src="/images/safety/suggestion.svg"
                  alt=""
                  style={{ marginRight: '5px' }}
                />
                Suggestions
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyCard;
