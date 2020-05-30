import React, { ChangeEvent } from 'react';

import {
  Grid,
  TextField,
  Divider,
  FormControlLabel,
  Checkbox
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
  note: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '127.69%',
    color: '#C57D7D',
    marginRight: '40px'
  },
  formGroup: {
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
  },
  divider: {
    border: '1px solid #B7B7B8',
    margin: '15px 0'
  },
  textFieldContainer: {
    width: '40%',
    padding: '10px 0'
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

export const schema1 = {
  FirstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  Surname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  PreferredName: {
    presence: false,
    length: {
      maximum: 80
    }
  },
  DateOfBirth: {
    format: {
      pattern: `^([0-2]?[1-9]|[1-3][01])/(0?[1-9]|1[0-2])/((19|20)[0-9][0-9]$)`
    }
  },
  Gender: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 20
    }
  },
  HomeAddress: {
    presence: false,
    length: {
      maximum: 300
    }
  },
  HomePostCode: {
    presence: false,
    length: {
      maximum: 10
    }
  },
  PostalAddress: {
    presence: false,
    length: {
      maximum: 300
    }
  },
  PostalPostCode: {
    presence: false,
    length: {
      maximum: 10
    }
  },
  MobilePhone: {
    presence: { allowEmpty: true, message: 'is required' },
    numericality: true,
    length: {
      maximum: 10,
      minimum: 5
    }
  },
  PrimaryEmail: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 80
    }
  },
  PreferredContactMethod: {
    presence: false,
    length: {
      maximum: 20
    }
  }
};

export type FormStateType1 = {
  isValid: boolean;
  values: {
    FirstName?: string;
    Surname?: string;
    PreferredName?: string;
    DateOfBirth?: string;
    Gender?: string;
    HomeAddress?: string;
    HomePostCode?: string;
    PostalAddress?: string;
    PostalPostCode?: string;
    MobilePhone?: string;
    PrimaryEmail?: string;
    PreferredContactMethod?: string;
  };
  touched: {
    FirstName?: boolean;
    Surname?: boolean;
    PreferredName?: boolean;
    DateOfBirth?: boolean;
    Gender?: boolean;
    HomeAddress?: boolean;
    HomePostCode?: boolean;
    PostalAddress?: boolean;
    PostalPostCode?: boolean;
    MobilePhone?: boolean;
    PrimaryEmail?: boolean;
    PreferredContactMethod?: boolean;
  };
  errors: {
    FirstName?: string[];
    Surname?: string[];
    PreferredName?: string[];
    DateOfBirth?: string[];
    Gender?: string[];
    HomeAddress?: string[];
    HomePostCode?: string[];
    PostalAddress?: string[];
    PostalPostCode?: string[];
    MobilePhone?: string[];
    PrimaryEmail?: string[];
    PreferredContactMethod?: string[];
  };
};

type Props = {
  formState: FormStateType1;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hasError: (field: string) => boolean;
  contactMethods: {
    Phone: boolean;
    Text: boolean;
    Email: boolean;
  };
  handleCheckBoxChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Personal: React.FC<Props> = ({
  formState,
  handleChange,
  hasError,
  contactMethods,
  handleCheckBoxChange
}) => {
  const classes = useStyles();

  const genders = [
    { name: '', value: '' },
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' },
    { name: 'Non-binary', value: 'Other' },
    { name: 'Prefer not to say', value: 'Unknown' }
  ];

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
          <span className={classes.stepName}>1. Personal information</span>
          <span className={classes.note}>
            “*” = Required fields to connect on Jiemba
          </span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '30%', padding: '10px 0', marginRight: '50px' }}>
            <TextField
              error={hasError('FirstName')}
              fullWidth
              label="First name*"
              name="FirstName"
              autoComplete="off"
              value={formState.values.FirstName || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '30%', padding: '10px 0' }}>
            <TextField
              error={hasError('Surname')}
              fullWidth
              label="Surname*"
              name="Surname"
              autoComplete="off"
              value={formState.values.Surname || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
        </div>
        <div style={{ width: '30%', padding: '10px 0' }}>
          <TextField
            error={hasError('PreferredName')}
            fullWidth
            label="Preferred name"
            name="PreferredName"
            autoComplete="off"
            value={formState.values.PreferredName || ''}
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '30%', padding: '10px 0', marginRight: '50px' }}>
            <TextField
              error={hasError('DateOfBirth')}
              fullWidth
              label="Date of birth*"
              placeholder="DD/MM/YYYY"
              name="DateOfBirth"
              autoComplete="off"
              value={formState.values.DateOfBirth || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '30%', padding: '10px 0' }}>
            <TextField
              error={hasError('Gender')}
              fullWidth
              label="Select gender*"
              name="Gender"
              select
              autoComplete="off"
              SelectProps={{ native: true }}
              value={formState.values.Gender || ''}
              variant="outlined"
              onChange={handleChange}>
              {genders.map(gender => (
                <option key={gender.value} value={gender.value}>
                  {gender.name}
                </option>
              ))}
            </TextField>
          </div>
        </div>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '65%', padding: '10px 0' }}>
            <TextField
              error={hasError('HomeAddress')}
              fullWidth
              label="Home address"
              name="HomeAddress"
              autoComplete="off"
              value={formState.values.HomeAddress || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '20%', padding: '10px 0' }}>
            <TextField
              error={hasError('HomePostCode')}
              fullWidth
              label="Post Code"
              name="HomePostCode"
              autoComplete="off"
              value={formState.values.HomePostCode || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
        </div> */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '65%', padding: '10px 0' }}>
            <TextField
              error={hasError('PostalAddress')}
              fullWidth
              label="Postal address"
              name="PostalAddress"
              autoComplete="off"
              value={formState.values.PostalAddress || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
          {/* <div style={{ width: '20%', padding: '10px 0' }}>
            <TextField
              error={hasError('PostalPostCode')}
              fullWidth
              label="Post Code"
              name="PostalPostCode"
              autoComplete="off"
              value={formState.values.PostalPostCode || ''}
              variant="outlined"
              onChange={handleChange}
            />
          </div> */}
        </div>
        <div className={classes.textFieldContainer}>
          <TextField
            error={hasError('MobilePhone')}
            fullWidth
            label="Mobile Phone*"
            name="MobilePhone"
            autoComplete="off"
            value={formState.values.MobilePhone || ''}
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div style={{ width: '50%', padding: '10px 0' }}>
          <TextField
            error={hasError('PrimaryEmail')}
            fullWidth
            label="Email*"
            name="PrimaryEmail"
            autoComplete="off"
            value={formState.values.PrimaryEmail || ''}
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
          <span className={classes.subTitle}>Preferred method of contact:</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={contactMethods.Phone}
                  value="Phone"
                  color="primary"
                  name="Phone"
                  onChange={handleCheckBoxChange}
                />
              }
              label={<span className={classes.checkText}>Phone</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={contactMethods.Text}
                  value="Text"
                  color="primary"
                  name="Text"
                  onChange={handleCheckBoxChange}
                />
              }
              label={<span className={classes.checkText}>Text</span>}
            />
            <FormControlLabel
              style={{ marginRight: '40px' }}
              control={
                <Checkbox
                  checked={contactMethods.Email}
                  value="Email"
                  color="primary"
                  name="Email"
                  onChange={handleCheckBoxChange}
                />
              }
              label={<span className={classes.checkText}>Email</span>}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Personal;
