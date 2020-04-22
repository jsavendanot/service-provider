import React from 'react';
import { Network } from 'types/network';
import { makeStyles } from '@material-ui/styles';
import { Phone, Add } from '@material-ui/icons';
import { Button } from 'common/components';

const useStyles = makeStyles(() => ({
  values: {
    width: '85%'
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
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
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
  services: Network[];
  collapse: boolean;
};

export const Services: React.FC<Props> = ({ services, collapse }) => {
  const classes = useStyles();
  return (
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
  );
};

export default Services;
