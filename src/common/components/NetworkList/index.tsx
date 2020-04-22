import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Network } from 'types/network';

import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  InputAdornment,
  Theme
} from '@material-ui/core';
import { Search, PersonAdd } from '@material-ui/icons';

import { Button } from 'common/components';

const useStyles = makeStyles((theme: Theme) => ({
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '30px',
    lineHeight: '35px',
    color: '#692B40'
  },
  cancelText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#003E1F'
  },
  tableContainer: {
    overflowY: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      height: '63vh',
      maxHeight: '63vh'
    },
    [theme.breakpoints.up('sm')]: {
      width: '60%',
      height: '63vh',
      maxHeight: '63vh'
    },
    [theme.breakpoints.up('md')]: {
      width: '55vw',
      height: '55vh',
      maxHeight: '55vh'
    },
    [theme.breakpoints.up('lg')]: {
      width: '40vw',
      height: '40vh',
      maxHeight: '40vh'
    }
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    [theme.breakpoints.up('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '60%'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%'
    }
  },
  searchContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: '15px'
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '15px'
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '50px'
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start'
    }
  },
  textField: {
    [theme.breakpoints.up('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '60%'
    },
    [theme.breakpoints.up('md')]: {
      width: '60%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%'
    }
  }
}));

type Props = {
  close: () => void;
  callback?: (networks: Network[]) => void;
  title: string;
};

const NetworkList: React.FC<Props> = ({ close, callback, title }) => {
  const classes = useStyles();

  const networks: Network[] = useSelector(
    (state: RootState) => state.network.networks
  );

  const [selectedNetwork, setSelectedNetwork] = useState<Network[]>([]);
  const [rowsPerPage] = useState(10);

  const handleSelectOne = (network: Network) => {
    setSelectedNetwork([network]);
  };

  const handleCallBack = () => {
    const networkWithData: Network[] = networks.filter(element =>
      selectedNetwork.includes(element)
    );
    if (callback) {
      callback(networkWithData);
    }
    close();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <div style={{ margin: '10px 0', padding: '10px' }}>
        <span className={classes.title}>{title}</span>
      </div>
      <div className={classes.searchContainer}>
        <TextField
          className={classes.textField}
          id="input-with-icon-textfield"
          label=""
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
        <PersonAdd
          fontSize="large"
          style={{ fill: '#692B40', marginLeft: '20px' }}
        />
      </div>
      <div
        style={{
          margin: '20px 0',
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
        <div className={classes.tableContainer}>
          <Table>
            <TableBody>
              {networks &&
                networks.slice(0, rowsPerPage).map(network => (
                  <TableRow
                    hover
                    key={network.Id}
                    selected={selectedNetwork.indexOf(network) !== -1}
                    onClick={event => handleSelectOne(network)}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedNetwork.indexOf(network) !== -1}
                        color="primary"
                        value={selectedNetwork.indexOf(network) !== -1}
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameCell}>
                        <Avatar
                          className={classes.avatar}
                          src={'data:image/png;base64,' + network.Image}>
                          {network.Name}
                        </Avatar>
                        <div>
                          <div>{network.Name}</div>
                          <div>{network.Email}</div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <span className={classes.cancelText} onClick={close}>
            Cancel
          </span>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" click={handleCallBack}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NetworkList;
