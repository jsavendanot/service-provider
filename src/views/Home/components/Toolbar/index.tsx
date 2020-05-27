import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { Button, EnterCode, InvitePeople, AddPeople } from 'common/components';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import {
  Slide,
  Dialog,
  DialogContent,
  useMediaQuery,
  Theme
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 80px',
    justifyContent: 'space-between'
  },
  sortText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.1px',
    color: '#323C47'
  },
  navText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '0.1px',
    color: '#692B40'
  },
  navPanel: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '60px',
    marginTop: '10px'
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  enterCode: {
    [theme.breakpoints.up('xs')]: {
      bottom: '0',
      right: '0',
      width: '100%',
      position: 'fixed',
      background: '#FFFFFF',
      borderRadius: '12px 12px 0px 0px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px',
      width: '400px',
      height: '240px',
      position: 'relative',
      background: '#FFFFFF',
      borderRadius: '12px 12px 0px 0px'
    }
  },
  invitePeople: {
    [theme.breakpoints.up('xs')]: {
      bottom: '0',
      right: '0',
      width: '100%',
      height: '100%',
      position: 'fixed',
      background: '#FFFFFF',
      padding: '0'
    },
    [theme.breakpoints.up('sm')]: {
      bottom: '0',
      right: '0',
      width: '100%',
      height: '100%',
      position: 'fixed',
      background: '#FFFFFF',
      padding: '0'
    },
    [theme.breakpoints.up('md')]: {
      width: '500px',
      height: '600px',
      position: 'relative',
      background: '#FFFFFF',
      padding: '0'
    }
  },
  addPeople: {
    [theme.breakpoints.up('xs')]: {
      bottom: '0',
      right: '0',
      width: '100%',
      position: 'fixed',
      background: '#FFFFFF',
      borderRadius: '12px 12px 0px 0px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '20px 30px',
      width: '400px',
      height: '290px',
      position: 'relative',
      background: '#FFFFFF',
      borderRadius: '12px 12px 0px 0px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '20px 30px',
      width: '400px',
      height: '290px',
      position: 'relative',
      background: '#FFFFFF',
      borderRadius: '12px 12px 0px 0px'
    }
  }
}));

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export const Toolbar: React.FC = () => {
  const classes = useStyles();

  const [open2, setOpen2] = useState(false);
  const enterCodeDialog = (
    <Dialog
      open={open2}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen2(false)}>
      <DialogContent className={classes.enterCode}>
        <EnterCode close={() => setOpen2(false)} />
      </DialogContent>
    </Dialog>
  );

  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open3, setOpen3] = useState(false);
  const invitePeopleDialog = (
    <Dialog
      open={open3}
      TransitionComponent={Transition}
      fullScreen={fullScreen}
      keepMounted
      onClose={() => setOpen3(false)}>
      <DialogContent className={classes.invitePeople}>
        <InvitePeople close={() => setOpen3(false)} />
      </DialogContent>
    </Dialog>
  );

  const [open4, setOpen4] = useState(false);
  const addPeopleDialog = (
    <Dialog
      open={open4}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen4(false)}>
      <DialogContent className={classes.addPeople}>
        <AddPeople
          close={() => setOpen4(false)}
          openEnterCode={() => setOpen2(true)}
          openInvitePeople={() => setOpen3(true)}
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <div className={classes.root}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* <span className={classes.sortText}>Sort by</span>
          <div style={{ display: 'flex' }}>
            <div className={classes.navPanel}>
              <span className={classes.navText}>Last active date</span>
              <KeyboardArrowDown
                style={{
                  fill: '#692B40',
                  marginLeft: '30px',
                  cursor: 'pointer'
                }}
              />
            </div>
            <div className={classes.navPanel}>
              <span className={classes.navText}>New to old</span>
              <KeyboardArrowDown
                style={{
                  fill: '#692B40',
                  marginLeft: '30px',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div> */}
        </div>
        <div style={{ width: '186px' }}>
          <Button type="primary" click={() => setOpen4(true)}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Add style={{ fill: '#FFFFFF', marginRight: '10px' }} />
              <span className={classes.buttonText}>Add consumer</span>
            </div>
          </Button>
        </div>
      </div>
      {open2 && enterCodeDialog}
      {open3 && invitePeopleDialog}
      {open4 && addPeopleDialog}
    </>
  );
};

export default Toolbar;
