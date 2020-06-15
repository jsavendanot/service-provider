import React, { useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { Button, InvitePeople, AddPeople, EnterCode } from 'common/components';
import { OptionsPopup } from './components';
import { Dialog, DialogContent, Theme } from '@material-ui/core';

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
      width: '450px',
      height: '400px',
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
  }
}));

export const Toolbar: React.FC = () => {
  const classes = useStyles();

  const [option, setOption] = useState(false);
  const [invitation, setInvitation] = useState(false);
  const [addPeople, setAddPeople] = useState(false);
  const [enterCode, setEnterCode] = useState(false);

  const invitePeopleDialog = (
    <Dialog open={invitation} keepMounted onClose={() => setInvitation(false)}>
      <DialogContent className={classes.invitePeople}>
        <InvitePeople close={() => setInvitation(false)} />
      </DialogContent>
    </Dialog>
  );

  const addPeopleDialog = (
    <Dialog open={addPeople} keepMounted onClose={() => setAddPeople(false)}>
      <DialogContent className={classes.addPeople}>
        <AddPeople
          close={() => setAddPeople(false)}
          openEnterCode={() => setEnterCode(true)}
          openInvitePeople={() => setInvitation(true)}
        />
      </DialogContent>
    </Dialog>
  );

  const enterCodeDialog = (
    <Dialog open={enterCode} keepMounted onClose={() => setEnterCode(false)}>
      <DialogContent className={classes.enterCode}>
        <EnterCode close={() => setEnterCode(false)} />
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
          <Button type="primary" click={() => setOption(true)}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Add style={{ fill: '#FFFFFF', marginRight: '10px' }} />
              <span className={classes.buttonText}>Add client</span>
            </div>
          </Button>
        </div>
      </div>
      {option && (
        <OptionsPopup
          open={option}
          close={() => setOption(false)}
          openInvitation={() => setInvitation(true)}
          openEnterCode={() => setEnterCode(true)}
        />
      )}
      {invitation && invitePeopleDialog}
      {addPeople && addPeopleDialog}
      {enterCode && enterCodeDialog}
    </>
  );
};

export default Toolbar;
