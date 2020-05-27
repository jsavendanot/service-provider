import React from 'react';

import { IconButton, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Close } from '@material-ui/icons';

import { Button } from 'common/components';

const useStyles = makeStyles(() => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttonContainer: {
    margin: '10px'
  },
  cancelText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  },
  divider: {
    border: '1px solid #C57D7D',
    marginBottom: '5px'
  }
}));

type Props = {
  close: () => void;
  openEnterCode: () => void;
  openInvitePeople: () => void;
};

const AddPeople: React.FC<Props> = ({
  close,
  openEnterCode,
  openInvitePeople
}) => {
  const classes = useStyles();

  const handleClickEnterCode = () => {
    close();
    openEnterCode();
  };

  const handleClickInvitePeople = () => {
    close();
    openInvitePeople();
  };

  return (
    <div className={classes.dialogContent}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <span
          className={classes.cancelText}
          style={{ fontSize: '20px', lineHeight: '24px' }}>
          Add consumer
        </span>
        <IconButton onClick={close}>
          <Close fontSize="large" style={{ fill: '#C57D7D' }} />
        </IconButton>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.buttonContainer}>
        <Button type="tertiary" click={handleClickEnterCode}>
          Enter invitation code
        </Button>
      </div>
      <div className={classes.buttonContainer}>
        <Button type="tertiary" click={handleClickInvitePeople}>
          Invite people
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px'
        }}
        onClick={close}>
        <span className={classes.cancelText}>Cancel</span>
      </div>
    </div>
  );
};

export default AddPeople;
