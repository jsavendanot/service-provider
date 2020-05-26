import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startSession } from 'slices/auth/action';
import { RouteComponentProps } from 'react-router-dom';
import { Theme, Dialog, DialogContent, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { css } from '@emotion/core';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const override = css`
  display: block;
  margin: 0 auto;
`;

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    minHeight: '100%',
    paddingTop: 20,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    },
    background: '#FFEAEA'
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEAEA'
  }
}));

interface MatchParams {
  tab: string;
}
type Props = RouteComponentProps<MatchParams>;

const Auth: React.FC<Props> = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  /** Theme */
  const theme: Theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.up('xs'));

  useEffect(() => {
    dispatch(startSession(history));
  }, [dispatch, history]);

  return (
    <main className={classes.content}>
      <Dialog open keepMounted fullScreen={fullScreen}>
        <DialogContent className={classes.loadingContainer}>
          <ClimbingBoxLoader
            css={override}
            size={20}
            color={'#692B40'}
            loading
          />
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Auth;
