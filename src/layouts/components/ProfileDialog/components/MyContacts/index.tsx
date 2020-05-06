import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Divider } from '@material-ui/core';
import { Close, AddCircleOutline, Delete } from '@material-ui/icons';
import {
  callNetworkContactListApi,
  deleteNetwork
} from 'slices/network/action';
import { Network } from 'types/network';

const useStyles = makeStyles(() => ({
  root: {
    width: '458px'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D'
  },
  divider: {
    border: '1px solid #C57D7D',
    margin: '5px 0'
  },
  note: {
    padding: '15px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#37474F'
  },
  addText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '16px',
    color: '#C57D7D'
  },
  phoneContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0'
  },
  contact: {
    padding: '10px 20px',
    margin: '10px 0',
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700
  },
  nameText: {
    fontSize: '18px',
    lineHeight: '2px',
    color: '#C57D7D',
    margin: '5px 0'
  },
  phoneText: {
    fontSize: '30px',
    lineHeight: '35px',
    color: '#692B40'
  }
}));

type Props = {
  close: () => void;
  addContact: () => void;
};
export const MyContacts: React.FC<Props> = ({ close, addContact }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteHandler = (id: string) => {
    dispatch(deleteNetwork(id));
    close();
  };

  const [networks, setNetworks] = useState<Network[]>([]);

  useEffect(() => {
    (async function fetchNetworks() {
      const networks = await callNetworkContactListApi();
      setNetworks(networks);
    })();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} container alignItems="center">
          <div className={classes.title} style={{ flexGrow: 1 }}>
            My contacts
          </div>
          <div>
            <IconButton onClick={close}>
              <Close style={{ fill: '#C57D7D' }} />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.note}>
            Add contacts here and suggest them to your consumer’s Safety Plan.
          </div>
        </Grid>
        <Grid item xs={12} style={{ height: '340px', overflowY: 'auto' }}>
          {networks.map(network => {
            return (
              <div className={classes.contact} key={network.Id}>
                <div className={classes.nameText}>{network.Name}</div>
                <div className={classes.phoneContainer}>
                  <div className={classes.phoneText} style={{ flexGrow: 1 }}>
                    {network.Phone}
                  </div>
                  <IconButton onClick={() => deleteHandler(network.Id)}>
                    <Delete style={{ fill: '#C57D7D' }} />
                  </IconButton>
                </div>
              </div>
            );
          })}
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justify="center"
          style={{ marginBottom: '20px' }}>
          <IconButton onClick={addContact}>
            <AddCircleOutline style={{ fill: '#C57D7D' }} />
          </IconButton>
          <span className={classes.addText}>Add</span>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyContacts;
