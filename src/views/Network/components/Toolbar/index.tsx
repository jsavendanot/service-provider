import React from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '20px',
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
  searchField: {
    width: '540px',
    margin: '5px 0',
    backgroundColor: '#F0F8FF',
    borderRadius: '5px',
    '& .MuiOutlinedInput-input': {
      padding: '10px'
    },
    '& .MuiOutlinedInput-input:focus': {
      outline: 'none'
    }
  }
}));

export const Toolbar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <TextField
            id="input-with-icon-textfield"
            placeholder="Search people or services"
            variant="outlined"
            className={classes.searchField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search style={{ fill: '#323C47' }} />
                </InputAdornment>
              )
            }}
          />
        </div>
        <span className={classes.sortText}>Sort by</span>
        <div style={{ display: 'flex' }}>
          <div className={classes.navPanel}>
            <span className={classes.navText}>Added date</span>
            <KeyboardArrowDown
              style={{ fill: '#692B40', marginLeft: '30px', cursor: 'pointer' }}
            />
          </div>
          <div className={classes.navPanel}>
            <span className={classes.navText}>New to old</span>
            <KeyboardArrowDown
              style={{ fill: '#692B40', marginLeft: '30px', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Toolbar;
