import React from 'react';
import { FocusArea } from 'types/other';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { AreaBox, Button } from 'common/components';

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px'
  },
  rightSec: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  descText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#37474F',
    textAlign: 'justify',
    padding: '2px 0 10px'
  }
}));

type Props = {
  area: FocusArea;
};
export const AreaCard: React.FC<Props> = ({ area }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={4}>
          <AreaBox
            id={area.id}
            name={area.name}
            background={area.color}
            image={area.image}
          />
        </Grid>
        <Grid item xs={7}>
          <div className={classes.rightSec}>
            <div className={classes.descText}>{area.description}</div>
            <div style={{ width: '91px', marginRight: '20px' }}>
              <Button type="primarySmall">
                <Add style={{ marginRight: '5px' }} />
                Add
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AreaCard;
