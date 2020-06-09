import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FocusArea, OtherRootType } from 'types/other';

import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardArrowLeft, Delete } from '@material-ui/icons';

import { AreaBox, Loading } from 'common/components';
import { AreaCard } from './components';
import { StoryRootType } from 'types/story';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducer';
import {
  suggestFocusAreas,
  deleteSuggestionStoryFromList
} from 'slices/suggestion/action';
import { SubmitConfirmation } from 'common/components';
import { selectSuggestedFocusAreas } from 'selectors/safety';

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
  subTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '21px',
    color: '#C57D7D',
    margin: '20px 0 10px'
  },
  removeButton: {
    position: 'absolute',
    top: '0',
    right: '0'
  },
  confirmTitle: {
    fontFamily: 'Scada',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#692B40'
  }
}));

interface MatchParams {
  id: string;
}
type Props = RouteComponentProps<MatchParams>;

export const SuggestArea: React.FC<Props> = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loading: boolean = useSelector(
    (state: RootState) => state.story.loading
  );

  const storyStore: StoryRootType = useSelector(
    (state: RootState) => state.story
  );

  const other: OtherRootType = useSelector((state: RootState) => state.other);

  const suggestedValues: FocusArea[] = useSelector((state: RootState) =>
    selectSuggestedFocusAreas(state, 'FocusAreas')
  );

  const [value, setValue] = useState<FocusArea>();
  const [areas] = useState<FocusArea[]>(other.focusAreas);
  const [myAreas] = useState<FocusArea[]>(storyStore.focusAreas);

  const addToSuggestedAreas = (area: FocusArea) => {
    setValue(area);
    setOpen(true);
  };

  const removeFromSuggestedAreas = (id: string) => {
    dispatch(deleteSuggestionStoryFromList(id));
  };

  const submitSuggestion = () => {
    value && dispatch(suggestFocusAreas(value));
  };

  /** Dialog */
  const [open, setOpen] = useState(false);

  function closeDialog() {
    setOpen(false);
  }

  const confirmDialog = (
    <SubmitConfirmation
      open={open}
      close={closeDialog}
      action={submitSuggestion}
      donRedirect>
      <span className={classes.confirmTitle}>
        Are you sure you want to
        <br />
        suggest this focus area?
      </span>
    </SubmitConfirmation>
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
            onClick={() => history.push('/story')}>
            <KeyboardArrowLeft style={{ fill: '#692B40' }} />
            <span className={classes.navText}>back</span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={8}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0 20px'
                }}>
                <span className={classes.title}>Suggest focus areas</span>
                <span className={classes.subTitle}>Available areas</span>
                <div
                  style={{
                    borderRight: '2px dashed #C57D7D'
                  }}>
                  {areas
                    .filter(
                      item =>
                        !myAreas
                          .concat(suggestedValues)
                          .find(element => element.id === item.id)
                    )
                    .map(area => {
                      return (
                        <AreaCard
                          key={area.image}
                          area={area}
                          add={addToSuggestedAreas}
                        />
                      );
                    })}
                </div>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0 20px',
                  marginTop: '60px'
                }}>
                <span
                  className={classes.subTitle}
                  style={{ marginBottom: '5px' }}>
                  {sessionStorage.getItem('FirstName')}'s focus areas
                </span>
                <Grid container spacing={3} style={{ marginTop: '1px' }}>
                  {myAreas.concat(suggestedValues).map(area => {
                    return (
                      <Grid item xs={5} key={area.id}>
                        <div style={{ position: 'relative' }}>
                          <AreaBox
                            id={area.id}
                            name={area.name}
                            background={area.color}
                            image={area.image}
                          />
                          {area.isSuggested && (
                            <IconButton
                              className={classes.removeButton}
                              onClick={() =>
                                removeFromSuggestedAreas(area.SuggestionId!)
                              }>
                              <Delete
                                style={{
                                  fill: '#C57D7D'
                                }}
                              />
                            </IconButton>
                          )}
                        </div>
                      </Grid>
                    );
                  })}
                  <Grid item xs={5} />
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {open && confirmDialog}
    </>
  );
};

export default SuggestArea;
