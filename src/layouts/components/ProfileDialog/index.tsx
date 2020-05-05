import React, { useState } from 'react';
import useRouter from 'common/utils/useRouter';
import { useDispatch } from 'react-redux';
import { endSession } from 'slices/auth/action';

import {
  Avatar,
  Divider,
  IconButton,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Call } from '@material-ui/icons';
import { MyContacts, AddContact } from './components';

const useStyles = makeStyles(() => ({
  avatar: {
    height: '77px',
    width: '77px',
    cursor: 'pointer'
  },
  providerName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '48px',
    color: '#000000'
  },
  providerEmail: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '15px',
    color: '#000000'
  },
  divider: {
    margin: '20px 0',
    border: '1px solid #B7B7B8'
  },
  menuText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '48px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    margin: '10px 0'
  }
}));

export default function ProfileDialog() {
  const classes = useStyles();
  const { history } = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(endSession());
  };

  /** My contacts dialog */
  const [open, setOpen] = useState(false);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  const myContactsDialog = (
    <Dialog open={open} onClose={closeDialog}>
      <DialogContent>
        <MyContacts close={closeDialog} addContact={openAddContactDialog} />
      </DialogContent>
    </Dialog>
  );

  /** Add contact dialog */
  const [openAddContact, setOpenAddContact] = useState(false);

  function openAddContactDialog() {
    setOpenAddContact(true);
    closeDialog();
  }

  function closeAddContactDialog() {
    setOpenAddContact(false);
  }

  const addContactsDialog = (
    <Dialog open={openAddContact} onClose={closeAddContactDialog}>
      <DialogContent>
        <AddContact close={closeAddContactDialog} />
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onClick={() => history.push('/profile')}>
        <Avatar
          alt=""
          className={classes.avatar}
          src={sessionStorage.getItem('Provider_Avatar')!}
        />
        <div
          style={{
            width: '150px',
            display: 'flex',
            justifyContent: 'center',
            wordWrap: 'break-word'
          }}>
          <span className={classes.providerName}>
            {sessionStorage.getItem('Provider_FirstName')}
          </span>
        </div>
        <div
          style={{
            width: '170px',
            display: 'flex',
            justifyContent: 'center',
            wordWrap: 'break-word'
          }}>
          <span className={classes.providerEmail}>
            {sessionStorage.getItem('Provider_Email')}
          </span>
        </div>
      </div>
      <Divider className={classes.divider} />
      <div>
        <div className={classes.menu} onClick={openDialog}>
          <IconButton style={{ marginRight: '10px' }}>
            <Call style={{ fill: '#000000' }} />
          </IconButton>
          <span className={classes.menuText}>My Contacts</span>
        </div>
        <div className={classes.menu} onClick={handleLogout}>
          <IconButton style={{ padding: '15px', marginRight: '11px' }}>
            <img src="/images/topbar/logout_icon.svg" alt="" />
          </IconButton>
          <span className={classes.menuText}>Log out</span>
        </div>
      </div>
      {open && myContactsDialog}
      {openAddContact && addContactsDialog}
    </>
  );
}
