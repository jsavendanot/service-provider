import React, { ChangeEvent } from 'react';

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

export const schema2 = {
  ContactName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 100
    }
  },
  RelationshipToConsumer: {
    presence: false,
    length: {
      maximum: 100
    }
  },
  EmergencyContactPhone: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true
    },
    length: {
      maximum: 20
    }
  },
  EmergencyAddress: {
    presence: false,
    length: {
      maximum: 200
    }
  },
  EmergencyWhenToContact: {
    presence: false,
    length: {
      maximum: 100
    }
  }
};

export type FormStateType2 = {
  isValid: boolean;
  values: {
    ContactName?: string;
    RelationshipToConsumer?: string;
    EmergencyContactPhone?: string;
    EmergencyAddress?: string;
    EmergencyWhenToContact?: string;
  };
  touched: {
    ContactName?: boolean;
    RelationshipToConsumer?: boolean;
    EmergencyContactPhone?: boolean;
    EmergencyAddress?: boolean;
    EmergencyWhenToContact?: boolean;
  };
  errors: {
    ContactName?: string[];
    RelationshipToConsumer?: string[];
    EmergencyContactPhone?: string[];
    EmergencyAddress?: string[];
    EmergencyWhenToContact?: string[];
  };
};

type Props = {
  formState: FormStateType2;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hasError: (field: string) => boolean;
};

export const Emergency: React.FC<Props> = ({
  formState,
  handleChange,
  hasError
}) => {
  const classes = useStyles();

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
            error={hasError('ContactName')}
            fullWidth
            label="Contact name*"
            name="ContactName"
            autoComplete="off"
            value={formState.values.ContactName || ''}
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div className={classes.textFieldContainer}>
          <TextField
            error={hasError('RelationshipToConsumer')}
            fullWidth
            label={
              <span className={classes.selectOptionLabel}>
                Relationship to consumer
              </span>
            }
            name="RelationshipToConsumer"
            select
            autoComplete="off"
            SelectProps={{ native: true }}
            value={formState.values.RelationshipToConsumer || ''}
            variant="outlined"
            onChange={handleChange}>
            {[
              '',
              'Parent',
              'Spouse',
              'Child',
              'Partner',
              'Grandparent',
              'Sibling',
              'Friend',
              'other'
            ].map(relationship => (
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
              error={hasError('EmergencyContactPhone')}
              fullWidth
              label="Phone*"
              name="EmergencyContactPhone"
              autoComplete="off"
              value={formState.values.EmergencyContactPhone || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '50%', padding: '10px 0' }}>
            <TextField
              error={hasError('EmergencyAddress')}
              fullWidth
              label="Address"
              name="EmergencyAddress"
              autoComplete="off"
              value={formState.values.EmergencyAddress || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
        </div>
        <div style={{ width: '50%', padding: '10px 0' }}>
          <TextField
            error={hasError('EmergencyWhenToContact')}
            fullWidth
            label="When to contact"
            name="EmergencyWhenToContact"
            autoComplete="off"
            value={formState.values.EmergencyWhenToContact || ''}
            variant="outlined"
            onChange={handleChange}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Emergency;
