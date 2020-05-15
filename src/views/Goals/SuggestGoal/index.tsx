import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft } from '@material-ui/icons';

import { AreaSection, GoalForm, AreaCard } from './components';
import { FocusArea } from 'types/other';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import { Loading } from 'common/components';
import { YesNoConfirmation } from 'common/components';

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
    color: '#000000',
    margin: '10px 0'
  },
  confirmTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#73BA9B'
  }
}));

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

export const SuggestGoal: React.FC<Props> = ({ history }) => {
  const classes = useStyles();

  const loading: boolean = useSelector(
    (state: RootState) => state.suggestion.loading
  );

  const [focusAreas] = useState<FocusArea[]>(
    JSON.parse(sessionStorage.getItem('focusAreas')!)
  );

  const myFocusAreas: FocusArea[] = useSelector(
    (state: RootState) => state.story.focusAreas
  );

  const [selectedArea, setSelectedArea] = useState('');
  const [areas] = useState<FocusArea[]>(focusAreas);
  const [myAreas, setMyAreas] = useState<FocusArea[]>([...myFocusAreas]);

  const handleRemove = (id: string) => {
    myAreas.splice(
      myAreas.findIndex(area => area.id === id),
      1
    );
    setMyAreas([...myAreas]);
  };

  const handleAdd = (id: string) => {
    const addedArea: FocusArea[] = areas.filter(area => area.id === id);
    setMyAreas(value => [...value].concat(addedArea));
  };

  /** Confirm Dialog */
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

  function openCancelConfirmHandler() {
    setOpenCancelConfirm(true);
  }

  function closeCancelConfirmHandler() {
    setOpenCancelConfirm(false);
  }

  const confirmCancelDialog = (
    <YesNoConfirmation
      open={openCancelConfirm}
      close={closeCancelConfirmHandler}
      action={() => history.push('/goals/current')}
      donRedirect>
      <span className={classes.confirmTitle}>
        Are you sure you want to
        <br />
        leave this page?
      </span>
    </YesNoConfirmation>
  );

  return (
    <>
      {loading && <Loading />}
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
            onClick={openCancelConfirmHandler}>
            <KeyboardArrowLeft style={{ fill: '#692B40' }} />
            <span className={classes.navText}>back</span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={6}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0 20px'
                }}>
                <span className={classes.title}>Suggest goal</span>
                <div style={{ borderBottom: '2px dashed #C57D7D' }}>
                  <AreaSection
                    name="Focus areas"
                    note="These areas can be modified by the consumer in ‘My Story’.">
                    {myAreas.map(area => {
                      return (
                        <AreaCard
                          area={area}
                          clickable
                          selectedArea={selectedArea}
                          click={() => setSelectedArea(area.id)}
                          actionType="remove"
                          action={id => handleRemove(id)}
                        />
                      );
                    })}
                  </AreaSection>
                </div>
                <AreaSection
                  name="Other areas"
                  note="A service provider can suggest new focus areas using.">
                  {areas
                    .filter(area => !myAreas.find(item => item.id === area.id))
                    .map(area => {
                      return (
                        <AreaCard
                          area={area}
                          selectedArea={selectedArea}
                          click={() => setSelectedArea(area.id)}
                          actionType="add"
                          action={id => handleAdd(id)}
                        />
                      );
                    })}
                </AreaSection>
              </div>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5}>
              {selectedArea !== '' && <GoalForm areaId={selectedArea} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openCancelConfirm && confirmCancelDialog}
    </>
  );
};

export default SuggestGoal;
