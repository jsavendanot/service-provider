import React from 'react';
import { Area } from 'types/story';

import { makeStyles } from '@material-ui/styles';

import { AreaCard } from './components';
import { RemoveCircleOutline, AddCircleOutline } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'column'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    margin: '20px 0 10px'
  },
  note: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  cardContainer: {
    display: 'flex',
    alignItems: 'center'
  }
}));

type Props = {
  name: string;
  areas: Area[];
  note: string;
  actionType: 'add' | 'remove';
  action: (id: number) => void;
};

export const AreaSection: React.FC<Props> = ({
  name,
  areas,
  note,
  actionType,
  action
}) => {
  const classes = useStyles();

  const removeIcon = (
    <RemoveCircleOutline
      fontSize="large"
      style={{
        fill: '#C57D7D',
        marginLeft: '10px',
        cursor: 'pointer'
      }}
    />
  );

  const addIcon = (
    <AddCircleOutline
      fontSize="large"
      style={{
        fill: '#C57D7D',
        marginLeft: '10px',
        cursor: 'pointer'
      }}
    />
  );

  return (
    <div className={classes.root}>
      <span className={classes.subTitle}>{name}</span>
      <span className={classes.note}>{note}</span>
      <div style={{ padding: '10px 0' }}>
        {areas.map(area => {
          return (
            <div className={classes.cardContainer} key={area.id}>
              <div style={{ flexGrow: 1 }}>
                {actionType === 'add' && (
                  <AreaCard area={area} clickable={false} />
                )}
                {actionType === 'remove' && <AreaCard area={area} clickable />}
              </div>
              <div onClick={() => action(area.id)}>
                {actionType === 'add' && addIcon}
                {actionType === 'remove' && removeIcon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AreaSection;
