import React from 'react';
import { Area } from 'types/story';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '160px',
    height: '144px',
    boxSizing: 'border-box',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    position: 'relative',
    textAlign: 'center'
  },
  imageContainer: {
    padding: '10px 0',
    boxSizing: 'border-box'
  },
  nameContainer: {
    background: '#FFFFFF',
    boxSizing: 'border-box',
    borderRadius: '12px',
    padding: '10px 5px',
    textAlign: 'center',
    position: 'absolute',
    bottom: '0',
    width: '100%'
  },
  areaNameText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    textAlign: 'center',
    color: '#692B40'
  }
}));

export const AreaBox: React.FC<Area> = ({ background, image, name }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ background: `${background}` }}>
      <div className={classes.imageContainer}>
        <img src={`${image}`} alt="" style={{ maxHeight: '140px' }} />
      </div>
      <div className={classes.nameContainer}>
        <span className={classes.areaNameText}>{name}</span>
      </div>
    </div>
  );
};

export default AreaBox;
