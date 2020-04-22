import React from 'react';
import { Unwell } from 'types/safety';
import { CheckCircle, People, Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { Button } from 'common/components';

const useStyles = makeStyles(() => ({
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
  pleaseText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#41C04E'
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
  pleaseDo: Unwell[];
};

export const PleaseDo: React.FC<Props> = ({ pleaseDo }) => {
  const classes = useStyles();

  return (
    <div>
      <span className={classes.descText}>
        If I become unwell I would like these to happen or not happen.
      </span>
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
                <People style={{ fill: '#C57D7D', marginRight: '10px' }} />
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
  );
};

export default PleaseDo;
