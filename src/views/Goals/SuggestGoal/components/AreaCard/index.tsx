import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { Button } from 'common/components';
import { FocusArea } from 'types/other';

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 0',
    margin: '10px 0'
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
    borderRadius: '2px',
    background: '#FFFFFF',
    padding: '20px',
    cursor: 'pointer'
  },
  bodyClicked: {
    border: '3px solid #C57D7D',
    boxSizing: 'border-box'
  },
  desc: {
    padding: '20px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#37474F',
    textAlign: 'justify'
  },
  name: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40'
  },
  nameColor: {
    color: '#C57D7D'
  },

  cardContainer: {
    display: 'flex',
    alignItems: 'center'
  }
}));

type Props = {
  area: FocusArea;
  selectedArea: string;
  clickable?: boolean;
  actionType: 'add' | 'remove';
  action: (id: string) => void;
  click: () => void;
};

export const AreaCard: React.FC<Props> = ({
  area,
  selectedArea,
  clickable,
  actionType,
  action,
  click
}) => {
  const classes = useStyles();

  // const removeIcon = (
  //   <IconButton>
  //     <RemoveCircleOutline
  //       fontSize="large"
  //       style={{
  //         fill: '#C57D7D'
  //       }}
  //     />
  //   </IconButton>
  // );

  // const addIcon = (
  //   <IconButton>
  //     <AddCircleOutline
  //       fontSize="large"
  //       style={{
  //         fill: '#C57D7D'
  //       }}
  //     />
  //   </IconButton>
  // );

  return (
    <div className={classes.cardContainer}>
      <div style={{ width: '100%' }}>
        <div className={classes.root}>
          <div
            className={clsx(
              classes.body,
              selectedArea === area.id && clickable && classes.bodyClicked
            )}
            onClick={click}>
            <span
              className={clsx(
                classes.name,
                !area.isSelected && classes.nameColor
              )}>
              {area.name}
            </span>
            <div style={{ width: '129px' }}>
              <Button type="primarySmall">
                <Add style={{ marginRight: '5px' }} />
                Add Goal
              </Button>
            </div>
          </div>
          {selectedArea === area.id && clickable && (
            <div className={classes.desc}>{area.description}</div>
          )}
        </div>
      </div>
      {/* {!area.isSelected ? (
        <div onClick={() => action(area.id)}>
          {actionType === 'add' && addIcon}
          {actionType === 'remove' && removeIcon}
        </div>
      ) : (
        <div style={{ width: '45px', marginLeft: '13px' }} />
      )} */}
    </div>
  );
};

export default AreaCard;
