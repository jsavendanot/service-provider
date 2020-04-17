import React, { useState, useEffect, ChangeEvent } from 'react';
import validate from 'validate.js';

import { Grid, TextField } from '@material-ui/core';
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
  selectOptionLabel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    color: '#692B40'
  }
}));

const schema = {
  contactName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100
    }
  },
  relationship: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100
    }
  },
  contactPhone: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 20
    }
  },
  contactAddress: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 200
    }
  },
  whenToContact: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    contactName?: string;
    relationship?: string;
    contactPhone?: number;
    contactAddress?: string;
    whenToContact?: string;
  };
  touched: {
    contactName?: boolean;
    relationship?: boolean;
    contactPhone?: boolean;
    contactAddress?: boolean;
  };
  errors: {
    contactName?: string[];
    relationship?: string[];
    contactPhone?: number[];
    contactAddress?: string[];
    whenToContact?: string[];
  };
};

export const Emergency: React.FC = () => {
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
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '30px'
          }}>
          <span className={classes.stepName}>2. Emergency contact</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.textFieldContainer}>
          <TextField
            error={hasError('contactName')}
            helperText={
              hasError('contactName')
                ? formState.errors.contactName &&
                  formState.errors.contactName[0]
                : null
            }
            fullWidth
            label="Contact name*"
            name="contactName"
            autoComplete="off"
            value={formState.values.contactName || ''}
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div className={classes.textFieldContainer}>
          <TextField
            error={hasError('relationship')}
            helperText={
              hasError('relationship')
                ? formState.errors.relationship &&
                  formState.errors.relationship[0]
                : null
            }
            fullWidth
            label={
              <span className={classes.selectOptionLabel}>
                Relationship to consumer
              </span>
            }
            name="relationship"
            select
            autoComplete="off"
            SelectProps={{ native: true }}
            value={formState.values.relationship || ''}
            variant="outlined"
            onChange={handleChange}>
            {['', 'Uncle'].map(relationship => (
              <option key={relationship} value={relationship}>
                {relationship}
              </option>
            ))}
          </TextField>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <div className={classes.textFieldContainer}>
            <TextField
              error={hasError('contactPhone')}
              helperText={
                hasError('contactPhone')
                  ? formState.errors.contactPhone &&
                    formState.errors.contactPhone[0]
                  : null
              }
              fullWidth
              label="Phone*"
              name="contactPhone"
              autoComplete="off"
              value={formState.values.contactPhone || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '50%', padding: '10px 0' }}>
            <TextField
              error={hasError('contactAddress')}
              helperText={
                hasError('contactAddress')
                  ? formState.errors.contactAddress &&
                    formState.errors.contactAddress[0]
                  : null
              }
              fullWidth
              label="Address"
              name="contactAddress"
              autoComplete="off"
              value={formState.values.contactAddress || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
        </div>
        <div style={{ width: '50%', padding: '10px 0' }}>
          <TextField
            error={hasError('whenToContact')}
            helperText={
              hasError('whenToContact')
                ? formState.errors.whenToContact &&
                  formState.errors.whenToContact[0]
                : null
            }
            fullWidth
            label="When to contact"
            name="whenToContact"
            autoComplete="off"
            value={formState.values.whenToContact || ''}
            variant="outlined"
            onChange={handleChange}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Emergency;
