import React from 'react';
import moment from 'moment';
import useRouter from 'common/utils/useRouter';

import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Person } from 'types/people';
import { useSelector, useDispatch } from 'react-redux';
import { selectPerson } from 'slices/people/action';
import { RootState } from 'reducer';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  avatar: {
    width: 40,
    height: 40,
    margin: '0 25px 10px 10px'
  },
  consumerName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '30px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  consumerDob: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginRight: '5px'
  }
}));

type Props = {
  person: Person;
};

export const Consumer: React.FC<Props> = ({ person }) => {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const people: Person[] = useSelector(
    (state: RootState) => state.people.people
  );

  const clickHandler = () => {
    dispatch(selectPerson(people.find(item => item.UserId === person.UserId)!));
    history.push('/dashboard');
  };

  return (
    <div className={classes.root} onClick={clickHandler}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '10px'
        }}>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-start' }}>
          <Avatar
            alt=""
            className={classes.avatar}
            src={
              person.ImageUrl
                ? person.ImageUrl
                : '/images/avatar/jiembaDefaultAvatar.svg'
            }
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className={classes.consumerName}>{person.Name}</span>
            <span className={classes.consumerDob}>
              {moment(person.DateOfBirth).format('L')}
            </span>
          </div>
        </div>
        {person.HasUpdate && <img src="/images/home/flash_icon.svg" alt="" />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
        <span className={classes.subTitle}>Last active:</span>
        <span className={classes.subTitle}>
          {moment(person.LastRecPlanUpdate).format('LLL')}
        </span>
      </div>
    </div>
  );
};

export default Consumer;
