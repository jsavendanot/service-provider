import React, { useState } from 'react';
import { GoalProps } from 'types/goals';

import { LinearProgress, Dialog, DialogContent } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/styles';

import { GoalCard } from 'components';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px 0'
  },
  progressText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '14px',
    color: '#F79221'
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 17,
    backgroundColor: '#EDEDED'
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#FCC501'
  }
})(LinearProgress);

type Props = {
  goal: GoalProps;
};

export const CustomLinearProgress: React.FC<Props> = ({ goal }) => {
  const classes = useStyles();

  /** Goal Card Dialog */
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <div className={classes.root} onClick={handleOpen}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <span className={classes.progressText} style={{ flexGrow: 1 }}>
            {goal.goalName}
          </span>
          <KeyboardArrowRight style={{ fill: '#F79221' }} />
        </div>
        <div style={{ padding: '10px 0px' }}>
          <BorderLinearProgress
            variant="determinate"
            color="secondary"
            value={goal.percent}
          />
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogContent style={{ padding: '0' }}>
          <GoalCard goal={goal} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomLinearProgress;
