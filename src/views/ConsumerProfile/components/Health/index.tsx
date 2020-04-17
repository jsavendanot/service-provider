import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import {
  Grid,
  TextField,
  Divider,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  formGroup: {
    padding: '20px 0'
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
  formGroupTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#000000'
  },
  divider: {
    border: '1px solid #C57D7D'
  },
  selectOptionLabel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    color: '#692B40'
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
  /** Outlines */
  outline: {
    border: '1px solid #FFEAEA',
    boxShadow: 'inset 0px 0px 6px rgba(0, 0, 0, 0.2)',
    background: '#FFEAEA',
    borderRadius: '3px'
  }
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  phone: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 20
    }
  },
  address: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  currentPlan: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  },
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
    name?: string;
    phone?: number;
    address?: string;
    currentPlan?: string;
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
    name?: boolean;
    phone?: boolean;
    address?: boolean;
    currentPlan?: boolean;
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
    name?: string[];
    phone?: number[];
    address?: string[];
    currentPlan?: string[];
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

export const Health: React.FC = () => {
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
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.formGroup}>
          <span className={classes.formGroupTitle}>General Practitioner</span>
          <div className={classes.textFieldContainer}>
            <TextField
              error={hasError('name')}
              helperText={
                hasError('name')
                  ? formState.errors.name && formState.errors.name[0]
                  : null
              }
              fullWidth
              label="Name"
              name="name"
              autoComplete="off"
              value={formState.values.name || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <div className={classes.textFieldContainer}>
            <TextField
              error={hasError('phone')}
              helperText={
                hasError('phone')
                  ? formState.errors.phone && formState.errors.phone[0]
                  : null
              }
              fullWidth
              label="Phone"
              name="phone"
              autoComplete="off"
              value={formState.values.phone || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '60%', padding: '10px 0' }}>
            <TextField
              error={hasError('address')}
              helperText={
                hasError('address')
                  ? formState.errors.address && formState.errors.address[0]
                  : null
              }
              fullWidth
              label="Address"
              name="address"
              autoComplete="off"
              value={formState.values.address || ''}
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
            <span className={classes.subTitle}>
              A current GP Mental Health Treatment Plan?
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}>
              <FormControlLabel
                style={{ marginRight: '40px' }}
                control={<Checkbox checked={false} value="1" color="primary" />}
                label={<span className={classes.checkText}>Yes</span>}
              />
              <FormControlLabel
                style={{ marginRight: '40px' }}
                control={<Checkbox checked={true} value="1" color="primary" />}
                label={<span className={classes.checkText}>No</span>}
              />
            </div>
          </div>
        </div>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.formGroup}>
          <span className={classes.formGroupTitle}>Health care</span>
          <div className={classes.textFieldContainer}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}>
              <FormControlLabel
                control={<Checkbox checked={false} value="1" color="primary" />}
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
                control={<Checkbox checked={true} value="1" color="primary" />}
                label={
                  <span className={classes.checkText}>
                    Medicare Card holder
                  </span>
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
                control={<Checkbox checked={false} value="1" color="primary" />}
                label={
                  <span className={classes.checkText}>DVA card holder</span>
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
                control={<Checkbox checked={false} value="1" color="primary" />}
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
                control={<Checkbox checked={false} value="1" color="primary" />}
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
                control={<Checkbox checked={false} value="1" color="primary" />}
                label={<span className={classes.checkText}>Yes</span>}
              />
              <FormControlLabel
                style={{ marginRight: '40px' }}
                control={<Checkbox checked={true} value="1" color="primary" />}
                label={<span className={classes.checkText}>No</span>}
              />
            </div>
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

export default Health;
