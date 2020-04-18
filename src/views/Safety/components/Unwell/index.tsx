import React from 'react';
import clsx from 'clsx';
import { Unwell as UnwellType } from 'types/safety';

import { makeStyles } from '@material-ui/styles';
import {
  KeyboardArrowUp,
  Add,
  CheckCircle,
  Block,
  People
} from '@material-ui/icons';

import { Button } from 'common/components';

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
  pleaseText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#41C04E'
  },
  dontDoText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#B50000'
  },
  support: {
    paddingLeft: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center'
  },
  supportText: {
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
  pleaseDo: UnwellType[];
  dontDo: UnwellType[];
  collapse: boolean;
  change: () => void;
};

export const Unwell: React.FC<Props> = ({
  id,
  title,
  description,
  pleaseDo,
  dontDo,
  collapse,
  change
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ margin: '5px 0' }}>
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
        {collapse && (
          <div>
            <span className={classes.descText}>{description}</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '10px 0 5px'
              }}>
              <CheckCircle style={{ fill: '#41C04E', marginRight: '5px' }} />
              <span className={classes.pleaseText}>Please do</span>
            </div>
            {pleaseDo.map((item, index) => {
              return (
                <div key={index} className={classes.values}>
                  {item.things.map(value => {
                    return (
                      <div key={value.id} className={classes.value}>
                        {value.name}
                      </div>
                    );
                  })}
                  {item.whos && (
                    <div className={classes.support}>
                      <People
                        style={{ fill: '#C57D7D', marginRight: '10px' }}
                      />
                      {item.whos.map(value => {
                        return (
                          <span key={value.id} className={classes.supportText}>
                            {/* {value.name}, */}
                          </span>
                        );
                      })}
                    </div>
                  )}
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '5px 0'
            }}>
            <Block style={{ fill: '#B50000', marginRight: '5px' }} />
            <span className={classes.dontDoText}>Don't do</span>
          </div>
        )}
        {collapse && (
          <div>
            {dontDo.map((item, index) => {
              return (
                <div key={index} className={classes.values}>
                  {item.things.map(value => {
                    return (
                      <div key={value.id} className={classes.value}>
                        {value.name}
                      </div>
                    );
                  })}
                  {item.whos && (
                    <div className={classes.support}>
                      <People
                        style={{ fill: '#C57D7D', marginRight: '10px' }}
                      />
                      {item.whos.map(value => {
                        return (
                          <span key={value.id} className={classes.supportText}>
                            {/* {value.name}, */}
                          </span>
                        );
                      })}
                    </div>
                  )}
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

export default Unwell;
