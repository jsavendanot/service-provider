import React, { useState, useEffect, ChangeEvent } from 'react';
import useRouter from 'utils/useRouter';
import validate from 'validate.js';

import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft } from '@material-ui/icons';

import { Button } from 'components';
import { SharedItem } from './components';

const useStyles = makeStyles(() => ({
  root: {
    padding: '45px 95px'
  },
  navText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#692B40',
    textTransform: 'uppercase'
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000'
  },
  description: {
    ontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#37474F',
    textAlign: 'justify',
    margin: '30px 0'
  },
  name: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40'
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px'
  },
  inputNote: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '17px',
    textDecoration: 'underline',
    color: '#C57D7D'
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    textTransform: 'uppercase',
    color: '#FFFFFF'
  }
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  organisation: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  serviceType: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  },
  contact: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 80
    }
  }
};

type FormStateType = {
  isValid: boolean;
  values: {
    name?: string;
    organisation?: string;
    serviceType?: string;
    contact?: string;
  };
  touched: {
    name?: boolean;
    organisation?: boolean;
    serviceType?: boolean;
    contact?: boolean;
  };
  errors: {
    name?: string[];
    organisation?: string[];
    serviceType?: string[];
    contact?: string[];
  };
};

export const SuggestService: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();

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
            marginBottom: '20px',
            cursor: 'pointer'
          }}
          onClick={() => history.push('/network')}>
          <KeyboardArrowLeft style={{ fill: '#692B40' }} />
          <span className={classes.navText}>back</span>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={5}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 10px'
              }}>
              <span className={classes.title}>Suggest service provider</span>
              <div className={classes.description}>
                If you are suggesting a service provider who is already
                registered with Jiemba, you will find them by simply entering
                their first or last name, or even the name of the organisation.
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 10px'
              }}>
              <div className={classes.group}>
                <span className={classes.name}>Name</span>
                <div style={{ width: '100%', padding: '10px 0' }}>
                  <TextField
                    error={hasError('name')}
                    helperText={
                      hasError('name')
                        ? formState.errors.name && formState.errors.name[0]
                        : null
                    }
                    fullWidth
                    label=""
                    name="name"
                    autoComplete="off"
                    value={formState.values.name || ''}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </div>
                <span className={classes.inputNote}>
                  Select from all registered service providers.
                </span>
              </div>
              <div className={classes.group}>
                <span className={classes.name}>Organisation</span>
                <div style={{ width: '100%', padding: '10px 0' }}>
                  <TextField
                    error={hasError('organisation')}
                    helperText={
                      hasError('organisation')
                        ? formState.errors.organisation &&
                          formState.errors.organisation[0]
                        : null
                    }
                    fullWidth
                    label=""
                    name="organisation"
                    autoComplete="off"
                    value={formState.values.organisation || ''}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={classes.group}>
                <span className={classes.name}>Service Type</span>
                <div style={{ width: '100%', padding: '10px 0' }}>
                  <TextField
                    error={hasError('serviceType')}
                    helperText={
                      hasError('serviceType')
                        ? formState.errors.serviceType &&
                          formState.errors.serviceType[0]
                        : null
                    }
                    fullWidth
                    label=""
                    name="serviceType"
                    autoComplete="off"
                    value={formState.values.serviceType || ''}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={classes.group}>
                <span className={classes.name}>Contact</span>
                <div style={{ width: '100%', padding: '10px 0' }}>
                  <TextField
                    error={hasError('contact')}
                    helperText={
                      hasError('contact')
                        ? formState.errors.contact &&
                          formState.errors.contact[0]
                        : null
                    }
                    fullWidth
                    label=""
                    name="contact"
                    autoComplete="off"
                    value={formState.values.contact || ''}
                    variant="outlined"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '140px'
              }}>
              <span className={classes.name}>Information being shared</span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '20px',
                  borderBottom: '1px solid #C57D7D'
                }}>
                {[
                  { id: 1, name: 'My goals', text: 'goals' },
                  { id: 2, name: 'My journey', text: 'journals' },
                  { id: 3, name: 'My story', text: 'stories' },
                  { id: 4, name: 'My safety plan', text: 'safety plans' },
                  { id: 5, name: 'My network', text: 'networks' },
                  { id: 6, name: 'Other:', text: '' }
                ].map(element => {
                  return (
                    <SharedItem
                      key={element.id}
                      id={element.id}
                      name={element.name}
                      text={element.text}
                    />
                  );
                })}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '30px'
              }}>
              <div style={{ width: '162px' }}>
                <Button type="primary">
                  <span className={classes.buttonText}>Save service</span>
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuggestService;
