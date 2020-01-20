import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider
} from '@material-ui/core';
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
  },
  divider: {
    border: '1px solid #B7B7B8',
    margin: '10px 0'
  },
  /** Outlines */
  outline: {
    border: '1px solid #FFEAEA',
    boxShadow: 'inset 0px 0px 6px rgba(0, 0, 0, 0.2)',
    background: '#FFEAEA',
    borderRadius: '3px'
  },
  formGroupTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#000000'
  },
  formGroup: {
    padding: '20px 0'
  }
}));

const schema = {
  healthCardHolder: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  },
  medicareCardHolder: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  },
  cardNumber: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  },
  cardExpiry: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  },
  dvaCardHolder: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  },
  healthInsurance: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  },
  governmentPension: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  },
  ndisPackage: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  },
  additionalInfo: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 500
    }
  }
};
type FormStateType = {
  isValid: boolean;
  values: {
    healthCardHolder?: string;
    medicareCardHolder?: string;
    cardNumber?: string;
    cardExpiry?: string;
    dvaCardHolder?: string;
    healthInsurance?: string;
    governmentPension?: string;
    ndisPackage?: string;
    additionalInfo?: string;
  };
  touched: {
    healthCardHolder?: boolean;
    medicareCardHolder?: boolean;
    cardNumber?: boolean;
    cardExpiry?: boolean;
    dvaCardHolder?: boolean;
    healthInsurance?: boolean;
    governmentPension?: boolean;
    ndisPackage?: boolean;
    additionalInfo?: boolean;
  };
  errors: {
    healthCardHolder?: string;
    medicareCardHolder?: string[];
    cardNumber?: string[];
    cardExpiry?: string[];
    dvaCardHolder?: string[];
    healthInsurance?: string[];
    governmentPension?: string[];
    ndisPackage?: string[];
    additionalInfo?: string[];
  };
};

export const HealthCare: React.FC = () => {
  const classes = useStyles();

  /** Handle Fields */
  const [formState, setFormState] = useState<FormStateType>({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = (field: string): boolean =>
    field in formState.touched && field in formState.errors ? true : false;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
          <span className={classes.stepName}>5. Health care</span>
          <span className={classes.optionalText}>(Optional)</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.textFieldContainer}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={
                <span className={classes.checkText}>
                  Health Care Card holder
                </span>
              }
            />
          </div>
        </div>
        <div className={classes.textFieldContainer}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={
                <span className={classes.checkText}>Medicare Card holder</span>
              }
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '30px'
          }}>
          <div
            className={classes.textFieldContainer}
            style={{ marginRight: '50px' }}>
            <TextField
              error={hasError('cardNumber')}
              helperText={
                hasError('cardNumber')
                  ? formState.errors.cardNumber &&
                    formState.errors.cardNumber[0]
                  : null
              }
              fullWidth
              label="Card number"
              name="cardNumber"
              autoComplete="off"
              value={formState.values.cardNumber || ''}
              variant="outlined"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '20%', padding: '10px 0' }}>
            <TextField
              error={hasError('cardExpiry')}
              helperText={
                hasError('cardExpiry')
                  ? formState.errors.cardExpiry &&
                    formState.errors.cardExpiry[0]
                  : null
              }
              fullWidth
              label="Expiry"
              name="cardExpiry"
              autoComplete="off"
              value={formState.values.cardExpiry || ''}
              variant="outlined"
              className={classes.textField}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={classes.textFieldContainer}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={<span className={classes.checkText}>DVA card holder</span>}
            />
          </div>
        </div>
        <div className={classes.textFieldContainer}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={
                <span className={classes.checkText}>
                  Private Health Insurance
                </span>
              }
            />
          </div>
        </div>
        <div className={classes.textFieldContainer}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={
                <span className={classes.checkText}>Government pension</span>
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
          <span className={classes.subTitle}>
            Currently supported by an NDIS package?
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={<span className={classes.checkText}>Yes</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={false}
                  value="1"
                  className={classes.checkBox}
                />
              }
              label={<span className={classes.checkText}>No</span>}
            />
          </div>
        </div>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.formGroup}>
          <span className={classes.formGroupTitle}>Additional information</span>
          <div style={{ width: '100%' }}>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              placeholder=""
              fullWidth
              multiline
              value={formState.values.additionalInfo || ''}
              disabled
              autoComplete="off"
              rows="4"
              style={{ marginTop: '15px' }}
              className={classes.outline}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default HealthCare;
