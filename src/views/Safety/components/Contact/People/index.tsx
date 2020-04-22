import React from 'react';
import { Network } from 'types/network';
import { makeStyles } from '@material-ui/styles';
import { Phone, Add } from '@material-ui/icons';
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
  people: Network[];
};

export const People: React.FC<Props> = ({ people }) => {
  const classes = useStyles();
  return (
    <div>
      <span className={classes.descText}>
        People or services who I can contact for support if I need immediate
        help.
      </span>
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
  );
};

export default People;
