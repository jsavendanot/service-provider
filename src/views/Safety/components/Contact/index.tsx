import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowUp, Add, Phone } from '@material-ui/icons';

import { Button } from 'common/components';
import { Network } from 'types/network';
import { IconButton } from '@material-ui/core';

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
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  },
  dontDoText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#B50000'
  },
  phone: {
    paddingLeft: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  phoneText: {
    fontFamily: 'Thasadith',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '23px',
    color: '#C57D7D',
    marginRight: '5px'
  }
}));

type Props = {
  id: number;
  title: string;
  description: string;
  people: Network[];
  services: Network[];
  collapse: boolean;
  change: () => void;
};

export const Contact: React.FC<Props> = ({
  id,
  title,
  description,
  people,
  services,
  collapse,
  change
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ margin: '5px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div className={classes.title}>{`${id}. ${title}`}</div>
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
              className={classes.itemsText}>{`${people.length} People,`}</span>
            <span
              className={
                classes.itemsText
              }>{`${services.length} Services`}</span>
          </div>
        )}
        {collapse && (
          <div>
            <span className={classes.descText}>{description}</span>
            <div style={{ margin: '10px 0 5px' }}>
              <span className={classes.subTitle}>People</span>
            </div>
            {people.map((item, index) => {
              return (
                <div key={index} className={classes.values}>
                  <div className={classes.value}>{item.Name}</div>
                  <div className={classes.phone}>
                    <Phone style={{ fill: '#C57D7D', marginRight: '10px' }} />
                    <span className={classes.phoneText}>{item.Phone},</span>
                  </div>
                </div>
              );
            })}
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
      {collapse && (
        <div style={{ borderTop: '2px dashed #C57D7D', margin: '10px 0' }} />
      )}
      <div style={{ margin: '5px 0' }}>
        {collapse && (
          <div style={{ margin: '5px 0' }}>
            <span className={classes.subTitle}>Services</span>
          </div>
        )}
        {collapse && (
          <div>
            {services.map((item, index) => {
              return (
                <div key={index} className={classes.values}>
                  <div className={classes.value}>{item.Name}</div>
                  <div className={classes.phone}>
                    <Phone style={{ fill: '#C57D7D', marginRight: '10px' }} />
                    <span className={classes.phoneText}>{item.Phone},</span>
                  </div>
                </div>
              );
            })}
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
    </div>
  );
};

export default Contact;
