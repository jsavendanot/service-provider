import React, { ChangeEvent, useState } from 'react';

import { Grid, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '30px'
  },
  stepName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '30px',
    lineHeight: '35px',
    color: '#000000'
  },
  textFieldContainer: {
    width: '40%',
    padding: '10px 0'
  },
  textField: {
    background: '#FFEAEA',
    boxShadow: 'inset 0px 0px 6px rgba(0, 0, 0, 0.2)',
    borderRadius: '3px',
    '& .MuiOutlinedInput-input': {
      padding: '10px'
    },
    '& .MuiFormLabel-root': {
      lineHeight: '0'
    },
    marginTop: '5px'
  },
  optionalText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '14px',
    color: '#C57D7D',
    marginLeft: '10px'
  },
  checkBox: {
    '& .MuiIconButton-label': {
      color: '#C57D7D'
    }
  },
  checkText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#692B40'
  },
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#000000',
    marginRight: '20px'
  }
}));

export const schema3 = {
  CountryOfBirth: {
    presence: false,
    length: {
      maximum: 100
    }
  },
  PreferredLanguage: {
    presence: false,
    length: {
      maximum: 100
    }
  },
  aborigianl: {
    presence: false,
    length: {
      maximum: 10
    }
  },
  torresIslander: {
    presence: false,
    length: {
      maximum: 10
    }
  }
};

export type FormStateType3 = {
  isValid: boolean;
  values: {
    CountryOfBirth?: string;
    PreferredLanguage?: string;
    aborigianl?: string;
    torresIslander?: string;
  };
  touched: {
    CountryOfBirth?: boolean;
    PreferredLanguage?: boolean;
    aborigianl?: boolean;
    torresIslander?: boolean;
  };
  errors: {
    CountryOfBirth?: string[];
    PreferredLanguage?: string[];
    aborigianl?: string[];
    torresIslander?: string[];
  };
};

type Props = {
  formState: FormStateType3;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hasError: (field: string) => boolean;
};

export const Background: React.FC<Props> = ({
  formState,
  handleChange,
  hasError
}) => {
  const classes = useStyles();

  const [aboriginalChecks, setAboriginalChecks] = useState({
    Yes: false,
    No: false,
    NotToDisclose: false
  });

  const handleAboriginalCheckBoxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setAboriginalChecks(oldValue => ({
      ...oldValue,
      [event.target.name]: event.target.checked
    }));
  };

  const [torresChecks, setTorresChecks] = useState({
    Yes: false,
    No: false,
    NotToDisclose: false
  });

  const handleTorresCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTorresChecks(oldValue => ({
      ...oldValue,
      [event.target.name]: event.target.checked
    }));
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
          <span className={classes.stepName}>3. Cultural background </span>
          <span className={classes.optionalText}>(Optional)</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.textFieldContainer}>
          <TextField
            error={hasError('CountryOfBirth')}
            fullWidth
            label="Country of birth"
            name="CountryOfBirth"
            autoComplete="off"
            value={formState.values.CountryOfBirth || ''}
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div className={classes.textFieldContainer}>
          <TextField
            error={hasError('PreferredLanguage')}
            fullWidth
            label="Preferred language"
            name="PreferredLanguage"
            autoComplete="off"
            value={formState.values.PreferredLanguage || ''}
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px'
          }}>
          <span className={classes.subTitle}>Aborigianl?</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={aboriginalChecks.Yes}
                  value="Yes"
                  color="primary"
                  name="Yes"
                  onChange={handleAboriginalCheckBoxChange}
                />
              }
              label={<span className={classes.checkText}>Yes</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={aboriginalChecks.No}
                  value="No"
                  color="primary"
                  name="No"
                  onChange={handleAboriginalCheckBoxChange}
                />
              }
              label={<span className={classes.checkText}>No</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={aboriginalChecks.NotToDisclose}
                  value="NotToDisclose"
                  name="NotToDisclose"
                  color="primary"
                  onChange={handleAboriginalCheckBoxChange}
                />
              }
              label={
                <span className={classes.checkText}>
                  Prefer not to disclose
                </span>
              }
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px'
          }}>
          <span className={classes.subTitle}>Torres Strait Islander?</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={torresChecks.Yes}
                  value="Yes"
                  color="primary"
                  name="Yes"
                  onChange={handleTorresCheckBoxChange}
                />
              }
              label={<span className={classes.checkText}>Yes</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={torresChecks.No}
                  value="No"
                  color="primary"
                  name="No"
                  onChange={handleTorresCheckBoxChange}
                />
              }
              label={<span className={classes.checkText}>No</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={torresChecks.NotToDisclose}
                  value="NotToDisclose"
                  name="NotToDisclose"
                  color="primary"
                  onChange={handleTorresCheckBoxChange}
                />
              }
              label={
                <span className={classes.checkText}>
                  Prefer not to disclose
                </span>
              }
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Background;
