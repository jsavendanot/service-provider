import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'utils/axios';
import {
  SafetyCardType,
  WarningType,
  UnwellType,
  ContactType
} from 'types/safety';

import { Grid, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { SafetyCard, Warning, Unwell, Contact } from './components';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px 80px'
  },
  menuText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '36px',
    lineHeight: '42px',
    color: '#000000'
  },
  content: {
    marginTop: '20px'
  },
  switchText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '23px',
    color: '#37474F',
    marginRight: '10px'
  }
}));

export const Safety: React.FC = () => {
  const classes = useStyles();

  const [state, setState] = useState(false);

  const [collapses, setCollapses] = useState({
    staywell: false,
    stress: false,
    warning: false,
    unwell: false,
    contact: false
  });

  const handleCollapse = (name: string, value: boolean) => {
    setCollapses(collapses => ({
      ...collapses,
      [name]: value
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.checked);
    state
      ? setCollapses({
          staywell: false,
          stress: false,
          warning: false,
          unwell: false,
          contact: false
        })
      : setCollapses({
          staywell: true,
          stress: true,
          warning: true,
          unwell: true,
          contact: true
        });
  };

  /** Fetch mock data */

  const [staywell, setStaywell] = useState<SafetyCardType[]>([]);
  const [stress, setStress] = useState<SafetyCardType[]>([]);
  const [warning, setWarning] = useState<WarningType[]>([]);
  const [unwell, setUnwell] = useState<UnwellType[]>([]);
  const [contact, setContact] = useState<ContactType[]>([]);

  useEffect(() => {
    let mounted = true;

    const fetchStaywell = () => {
      axios.get('/api/staywell').then(response => {
        if (mounted) {
          setStaywell(response.data.staywell);
        }
      });
    };

    const fetchStress = () => {
      axios.get('/api/stress').then(response => {
        if (mounted) {
          setStress(response.data.stress);
        }
      });
    };

    const fetchWarning = () => {
      axios.get('/api/warning').then(response => {
        if (mounted) {
          setWarning(response.data.warning);
        }
      });
    };

    const fetchUnwell = () => {
      axios.get('/api/unwell').then(response => {
        if (mounted) {
          setUnwell(response.data.unwell);
        }
      });
    };

    const fetchContact = () => {
      axios.get('/api/contact').then(response => {
        if (mounted) {
          setContact(response.data.contact);
        }
      });
    };

    fetchStaywell();
    fetchStress();
    fetchWarning();
    fetchUnwell();
    fetchContact();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <div
          style={{ marginTop: '37px', display: 'flex', alignItems: 'center' }}>
          <span className={classes.menuText}>Safety Plan</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '50px'
            }}>
            <span className={classes.switchText}>Collapse all</span>
            <Switch
              checked={state}
              color="primary"
              value={state}
              onChange={event => handleChange(event)}
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={5}>
            {staywell.map(value => {
              return (
                <SafetyCard
                  key={value.id}
                  title={value.title}
                  id={value.id}
                  description={value.description}
                  values={value.values}
                  collapse={collapses.staywell}
                  change={() => handleCollapse('staywell', !collapses.staywell)}
                />
              );
            })}
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            {stress.map(value => {
              return (
                <SafetyCard
                  key={value.id}
                  title={value.title}
                  id={value.id}
                  description={value.description}
                  values={value.values}
                  collapse={collapses.stress}
                  change={() => handleCollapse('stress', !collapses.stress)}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={5}>
            {warning.map(value => {
              return (
                <Warning
                  key={value.id}
                  id={value.id}
                  difficulty={value.difficulty}
                  plan={value.plan}
                  collapse={collapses.warning}
                  change={() => handleCollapse('warning', !collapses.warning)}
                />
              );
            })}
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <div style={{ marginBottom: '20px' }}>
              {unwell.map(value => {
                return (
                  <Unwell
                    key={value.id}
                    id={value.id}
                    title={value.title}
                    description={value.description}
                    pleaseDo={value.pleaseDo}
                    dontDo={value.dontDo}
                    collapse={collapses.unwell}
                    change={() => handleCollapse('unwell', !collapses.unwell)}
                  />
                );
              })}
            </div>
            {contact.map(value => {
              return (
                <Contact
                  key={value.id}
                  id={value.id}
                  title={value.title}
                  description={value.description}
                  people={value.people}
                  services={value.services}
                  collapse={collapses.contact}
                  change={() => handleCollapse('contact', !collapses.contact)}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Safety;
