import React, { useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchStoryData,
  fetchStrenghtsData,
  fetchMyAreas
} from 'slices/story/action';
import { fetchAllFocusAreas } from 'slices/other/action';

import { Gallery, MyStory, Strenghts, FocusAreas } from './components';
import { StoryRootType } from 'types/story';
import { RootState } from 'reducer';
import { Loading } from 'common/components';
import { fetchGalleryImages } from 'slices/gallery/action';
import { fetchAllSuggestions } from 'slices/suggestion/action';

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
  }
}));

export const Story: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const storyStore: StoryRootType = useSelector(
    (state: RootState) => state.story
  );

  useEffect(() => {
    dispatch(fetchAllFocusAreas());
    dispatch(fetchAllSuggestions());
    dispatch(fetchGalleryImages());
    dispatch(fetchStoryData());
    dispatch(fetchStrenghtsData());
    dispatch(fetchMyAreas());
  }, [dispatch]);

  return (
    <>
      {storyStore.loading && <Loading />}
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <div
            style={{
              marginTop: '37px',
              display: 'flex',
              alignItems: 'center'
            }}>
            <span className={classes.menuText}>Story</span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Gallery story={storyStore.story} />
        </Grid>
        <Grid item xs={12}>
          <MyStory storyText={storyStore.story.Story} />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={5}>
              <Strenghts strengths={storyStore.strengths} />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5}>
              <FocusAreas myAreas={storyStore.focusAreas} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Story;
