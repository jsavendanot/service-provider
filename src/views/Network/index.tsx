import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import { TabMenu, Button } from 'common/components';
import { Toolbar, People, Services } from './components';

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px 100px'
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
  footerImage: {
    position: 'relative',
    bottom: '0',
    right: '-101px'
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '1.25px',
    color: '#FFFFFF',
    textTransform: 'uppercase'
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

export const Network: React.FC<Props> = ({ match, history }) => {
  const classes = useStyles();
  const { tab } = match.params;

  return (
    <Grid container justify="center" spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Grid container style={{ paddingTop: '20px' }} alignItems="center">
          <Grid item xs={2}>
            <span className={classes.menuText}>Network</span>
          </Grid>
          <Grid item xs={7}>
            <div style={{ width: '100%', display: 'flex' }}>
              <div style={{ width: '350px' }}>
                <TabMenu menus={['people', 'services']} tab={tab} />
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            {tab === 'services' && (
              <div style={{ width: '218px' }}>
                <Button
                  type="primary"
                  click={() => history.push('/suggest/network')}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Add style={{ fill: '#FFFFFF', marginRight: '10px' }} />
                    <span className={classes.buttonText}>Suggest service</span>
                  </div>
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
        <Toolbar />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.content}>
          {tab === 'people' && <People />}
          {tab === 'services' && <Services />}
        </div>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
          <img
            src="/images/network/footer_image.svg"
            alt=""
            className={classes.footerImage}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Network;
